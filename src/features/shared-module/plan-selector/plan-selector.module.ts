import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSelectorComponent } from './plan-selector.component';
import { NzGridModule } from 'ng-zorro-antd/grid';



@NgModule({
  declarations: [PlanSelectorComponent],
  imports: [
    CommonModule,
    NzGridModule
  ],
  exports: [PlanSelectorComponent]
})
export class PlanSelectorModule { }
