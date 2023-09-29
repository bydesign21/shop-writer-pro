import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'swp-vehicle-details-damage',
  templateUrl: './vehicle-details-damage.component.html',
  styleUrls: ['./vehicle-details-damage.component.scss'],
})
export class VehicleDetailsDamageComponent implements OnDestroy {
  public additionalDetailsForm = new FormGroup({
    damage: new FormControl('', [Validators.required]),
  });
  private destroy$ = new Subject();

  @Output() additionalDetailsOutput = new EventEmitter<string>();

  constructor() {
    this.additionalDetailsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.additionalDetailsOutput.emit(val?.damage);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
