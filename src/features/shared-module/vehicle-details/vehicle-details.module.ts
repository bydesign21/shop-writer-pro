import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { VehicleDetailsComponent } from './vehicle-details.component';

@NgModule({
  declarations: [VehicleDetailsComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
  ],
  exports: [VehicleDetailsComponent],
})
export class VehicleDetailsModule {}
