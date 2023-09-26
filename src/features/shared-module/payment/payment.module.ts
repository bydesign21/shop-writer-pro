import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SpinnerModule } from '../spinner/spinner.module';
import { SwpButtonModule } from '../swp-button/swp-button.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    SpinnerModule,
    SwpButtonModule,
    NzFormModule,
    NzRadioModule
  ],
  exports: [
    PaymentComponent
  ]
})
export class PaymentModule { }
