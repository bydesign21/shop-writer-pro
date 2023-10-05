import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { VehicleDetailsDamageComponent } from './vehicle-details-damage.component';

@NgModule({
  declarations: [VehicleDetailsDamageComponent],
  imports: [CommonModule, NzFormModule, NzInputModule, ReactiveFormsModule],
  exports: [VehicleDetailsDamageComponent],
})
export class VehicleDetailsDamageModule {}
