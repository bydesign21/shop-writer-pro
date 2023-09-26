import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UploadDocumentsComponent } from './upload-documents.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NzFormModule } from 'ng-zorro-antd/form';



@NgModule({
  declarations: [UploadDocumentsComponent],
  imports: [
    CommonModule,
    NzUploadModule,
    NzToolTipModule,
    NzMessageModule,
    InlineSVGModule,
    NzFormModule
  ],
  exports: [UploadDocumentsComponent]
})
export class UploadDocumentsModule {}
