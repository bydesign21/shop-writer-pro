import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { FaqViewerComponent } from './faq-viewer.component';

@NgModule({
  declarations: [FaqViewerComponent],
  imports: [CommonModule, NzGridModule, NzLayoutModule, NzCollapseModule],
  exports: [FaqViewerComponent],
})
export class FaqViewerModule {}
