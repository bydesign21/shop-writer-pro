import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthContainerComponent } from './auth-container/auth-container.component';
import { AuthGuard } from './auth.guard';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'login/forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'login/confirm-account',
        component: ConfirmAccountComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
