import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqViewerComponent } from './faq-viewer.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';



@NgModule({
  declarations: [FaqViewerComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzLayoutModule,
    NzCollapseModule
  ],
  exports: [FaqViewerComponent]
})
export class FaqViewerModule { }
