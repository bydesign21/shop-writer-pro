import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailsDamageComponent } from './vehicle-details-damage.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [VehicleDetailsDamageComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  exports: [VehicleDetailsDamageComponent]
})
export class VehicleDetailsDamageModule { }
