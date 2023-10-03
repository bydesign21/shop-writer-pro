import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { SpinnerModule } from '../spinner/spinner.module';
import { SwpButtonModule } from '../swp-button/swp-button.module';

import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    NzIconModule,
    SpinnerModule,
    SwpButtonModule,
    NzFormModule,
    NzRadioModule,
  ],
  exports: [PaymentComponent],
})
export class PaymentModule {}
