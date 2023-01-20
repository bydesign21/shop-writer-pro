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
import { NzFormModule } from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input'
import { SwpButtonComponent } from '../shared-module/swp-button/swp-button.component';
import { SwpButtonModule } from '../shared-module/swp-button/swp-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

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
    SwpButtonModule,
    NzInputModule,
    SignInModule,
    SignUpModule,
  ],
  providers: [
    AuthenticatorService,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModuleModule { }
