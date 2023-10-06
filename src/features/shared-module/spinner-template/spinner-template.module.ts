import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SpinnerTemplateComponent } from './spinner-template.component';



@NgModule({
  declarations: [
    SpinnerTemplateComponent
  ],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports: [
    SpinnerTemplateComponent
  ]
})
export class SpinnerTemplateModule { }
