import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAccountComponent } from './confirm-account.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SwpButtonModule } from 'src/features/shared-module/swp-button/swp-button.module';



@NgModule({
  declarations: [ConfirmAccountComponent],
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    SwpButtonModule
  ],
  exports: [ConfirmAccountComponent]
})
export class ConfirmAccountModule { }
