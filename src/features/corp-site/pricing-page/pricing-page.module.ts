import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTableModule } from 'src/features/shared-module/pricing-table/pricing-table.module';
import { PricingPageComponent } from './pricing-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [PricingPageComponent],
  imports: [
    CommonModule,
    PricingTableModule,
    NzLayoutModule,
    NzGridModule
  ],
  exports: [PricingPageComponent]
})
export class PricingPageModule { }
