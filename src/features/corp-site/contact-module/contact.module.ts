import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ContactFormModule } from 'src/features/shared-module/contact-form/contact-form.module';
import { ContactInfoModule } from 'src/features/shared-module/contact-info/contact-info.module';
import { FaqViewerModule } from 'src/features/shared-module/faq-viewer/faq-viewer.module';
import { FormControlErrorModule } from 'src/features/shared-module/form-control-error/form-control-error.module';

import { NavbarModule } from '../../shared-module/navbar/navbar.module';

import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    NavbarModule,
    FaqViewerModule,
    ContactFormModule,
    ContactInfoModule,
    FormControlErrorModule,
    NzLayoutModule,
    NzGridModule,
  ],
  exports: [ContactComponent],
})
export class ContactModule {}
