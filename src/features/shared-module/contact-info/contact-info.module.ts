import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './contact-info.component';
import { NzCardModule } from 'ng-zorro-antd/card';



@NgModule({
  declarations: [
    ContactInfoComponent
  ],
  imports: [
    CommonModule,
    NzCardModule
  ],
  exports: [
    ContactInfoComponent
  ]
})
export class ContactInfoModule { }
