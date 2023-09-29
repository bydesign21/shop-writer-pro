import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
  SignInComponent,
} from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import awsmobile from 'src/aws-exports';

import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmAccountModule } from './confirm-account/confirm-account.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';

Auth.configure(awsmobile);

@NgModule({
  declarations: [AuthContainerComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    AuthRoutingModule,
    NzLayoutModule,
    NzGridModule,
    AmplifyAuthenticatorModule,
    NzInputModule,
    SignInModule,
    SignUpModule,
    ConfirmAccountModule,
    ForgotPasswordModule,
  ],
  providers: [AuthenticatorService],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
