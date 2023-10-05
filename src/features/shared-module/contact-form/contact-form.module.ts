import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { FormControlErrorModule } from '../form-control-error/form-control-error.module';
import { SwpButtonModule } from '../swp-button/swp-button.module';

import { ContactFormComponent } from './contact-form.component';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    FormControlErrorModule,
    SwpButtonModule,
  ],
  exports: [ContactFormComponent],
})
export class ContactFormModule {}
