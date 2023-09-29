import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FaqViewerModule } from 'src/features/shared-module/faq-viewer/faq-viewer.module';
import { PricingTableModule } from 'src/features/shared-module/pricing-table/pricing-table.module';

import { PricingPageComponent } from './pricing-page.component';

@NgModule({
  declarations: [PricingPageComponent],
  imports: [
    CommonModule,
    PricingTableModule,
    NzLayoutModule,
    NzGridModule,
    FaqViewerModule,
  ],
  exports: [PricingPageComponent],
})
export class PricingPageModule {}
