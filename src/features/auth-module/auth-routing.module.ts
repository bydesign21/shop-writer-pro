import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'login/confirm-account',
        component: ConfirmAccountComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
