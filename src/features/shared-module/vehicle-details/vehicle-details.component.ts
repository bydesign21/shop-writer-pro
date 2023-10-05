import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  Subject,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  map,
} from 'rxjs';
import { insuranceList } from 'src/features/shared-module/shared-utils/shared.model';

import { SharedUtilsService } from '../shared-utils/shared-utils.service';

@Component({
  selector: 'swp-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetailsComponent implements OnDestroy, OnInit {
  @Input() vehicleDetails: any = null;
  @Output() vehicleDetailsOutput = new EventEmitter<any>();

  vehicleDetailsForm = new FormGroup({
    insurance: new FormControl('', [Validators.required]),
    vin: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    mileage: new FormControl('', [Validators.required]),
  });

  public insuranceList = insuranceList;
  private destroy$ = new Subject();
  private vinSubject$ = new Subject<string>();

  constructor(
    private utilService: SharedUtilsService,
    private messageService: NzMessageService,
  ) {
    this.vehicleDetailsForm
      .get('vin')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((vin) => {
        this.vinSubject$.next(vin);
      });

    this.vehicleDetailsForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((res: any) => {
          return { ...res, insurance: res.insurance.label };
        }),
      )
      .subscribe((res: any) => {
        this.vehicleDetailsOutput.emit(res);
      });

    this.handleVehicleDetailsAutoFill();
  }

  ngOnInit(): void {
    if (this.vehicleDetails) {
      this.vehicleDetailsForm.patchValue(this.vehicleDetails);
      this.vehicleDetailsOutput.emit(this.vehicleDetails);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  formatNumberWithCommas(value: string): string {
    const onlyDigits = this.formatInputToNumericalOnlyValue(value);
    const withCommas = onlyDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return withCommas;
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a valid value';
    } else if (control.hasError('email')) {
      return 'Not a valid email';
    }
    return 'Invalid input';
  }

  isInvalidAndDirty(name: string): boolean {
    const control = this.vehicleDetailsForm.get(name);
    return control.invalid && (control.dirty || control.touched);
  }

  formatInputToNumericalOnlyValue(value: string) {
    const onlyDigits = value.replace(/\D/g, '');
    return onlyDigits;
  }

  handleVehicleDetailsAutoFill() {
    this.vinSubject$
      .pipe(
        debounceTime(500),
        filter((vin) => vin.length > 4 && vin.length < 25),
        distinctUntilChanged(),
        switchMap((vin: string) => this.utilService.getVehichleByVin(vin)),
        takeUntil(this.destroy$),
      )
      .subscribe((res: any) => {
        const { year, make, model } = res;
        if (year && make && model) {
          this.messageService.success('VIN Successfully Validated');
          this.vehicleDetailsForm.get('year').patchValue(year);
          this.vehicleDetailsForm.get('make').patchValue(make);
          this.vehicleDetailsForm.get('model').patchValue(model);
        } else {
          this.messageService.error('Please enter a valid VIN');
        }
      });
  }
}
