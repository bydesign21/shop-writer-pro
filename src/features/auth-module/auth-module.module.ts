import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule, AuthenticatorService, SignInComponent  } from '@aws-amplify/ui-angular';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Auth } from 'aws-amplify';
import awsmobile from 'src/aws-exports';
import {NzInputModule} from 'ng-zorro-antd/input'
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { ConfirmAccountModule } from './confirm-account/confirm-account.module';

Auth.configure(awsmobile);

@NgModule({
  declarations: [
    AuthContainerComponent,
  ],
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
    ConfirmAccountModule
  ],
  providers: [
    AuthenticatorService,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
