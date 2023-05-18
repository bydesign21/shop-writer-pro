import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { RouterModule } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    ReactiveFormsModule,
    SpinnerModule,
    NgxSpinnerModule,
    RouterModule
  ],
  exports: [
    SignInComponent
  ],
  providers: [NzModalService]
})
export class SignInModule { }
