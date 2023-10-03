import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { PricingTableComponent } from './pricing-table.component';

@NgModule({
  declarations: [PricingTableComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
  ],
  exports: [PricingTableComponent],
})
export class PricingTableModule {}
