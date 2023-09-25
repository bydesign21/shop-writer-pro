import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './contact-info.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    ContactInfoComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzIconModule
  ],
  exports: [
    ContactInfoComponent
  ]
})
export class ContactInfoModule { }
