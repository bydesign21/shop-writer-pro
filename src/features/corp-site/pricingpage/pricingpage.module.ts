import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTableModule } from 'src/features/shared-module/pricing-table/pricing-table.module';
import { PricingpageComponent } from './pricingpage.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [PricingpageComponent],
  imports: [
    CommonModule,
    PricingTableModule,
    NzLayoutModule,
    NzGridModule
  ],
  exports: [PricingpageComponent]
})
export class PricingpageModule { }
