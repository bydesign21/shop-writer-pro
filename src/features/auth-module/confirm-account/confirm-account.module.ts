import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SwpButtonModule } from 'src/features/shared-module/swp-button/swp-button.module';

import { ConfirmAccountComponent } from './confirm-account.component';

@NgModule({
  declarations: [ConfirmAccountComponent],
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    SwpButtonModule,
  ],
  exports: [ConfirmAccountComponent],
})
export class ConfirmAccountModule {}
