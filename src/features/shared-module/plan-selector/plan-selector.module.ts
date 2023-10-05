import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { PlanSelectorComponent } from './plan-selector.component';

@NgModule({
  declarations: [PlanSelectorComponent],
  imports: [CommonModule, NzGridModule],
  exports: [PlanSelectorComponent],
})
export class PlanSelectorModule {}
