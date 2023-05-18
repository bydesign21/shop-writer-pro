import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PricingTableComponent } from './pricing-table.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [PricingTableComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule
  ],
  exports: [PricingTableComponent]
})
export class PricingTableModule { }
