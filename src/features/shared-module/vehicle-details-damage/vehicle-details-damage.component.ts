import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'swp-vehicle-details-damage',
  templateUrl: './vehicle-details-damage.component.html',
  styleUrls: ['./vehicle-details-damage.component.scss'],
})
export class VehicleDetailsDamageComponent implements OnDestroy, OnInit {
  @Output() additionalDetailsOutput = new EventEmitter<string>();
  @Input() damage: string;
  public additionalDetailsForm = new FormGroup({
    damage: new FormControl('', [Validators.required]),
  });
  private destroy$ = new Subject();

  constructor() {
    this.additionalDetailsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.additionalDetailsOutput.emit(val?.damage);
      });
  }

  ngOnInit(): void {
    if (this.damage) {
      this.additionalDetailsForm.patchValue({ damage: this.damage });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
