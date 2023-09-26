import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { VehicleDetailsComponent } from './vehicle-details.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';



@NgModule({
  declarations: [VehicleDetailsComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzAutocompleteModule
  ],
  exports: [VehicleDetailsComponent]
})
export class VehicleDetailsModule { }
