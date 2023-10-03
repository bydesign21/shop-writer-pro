import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { UploadDocumentsComponent } from './upload-documents.component';

@NgModule({
  declarations: [UploadDocumentsComponent],
  imports: [
    CommonModule,
    NzUploadModule,
    NzToolTipModule,
    NzMessageModule,
    InlineSVGModule,
    NzFormModule,
  ],
  exports: [UploadDocumentsComponent],
})
export class UploadDocumentsModule {}
