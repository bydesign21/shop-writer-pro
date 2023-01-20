import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/features/home-module/home.component';
import { ContactComponent } from 'src/features/contact-module/contact.component';
import { TicketingContainerComponent } from 'src/features/ticketing-module/ticketing-container/ticketing-container.component';
import { SignInComponent, SignUpComponent } from '@aws-amplify/ui-angular';
import { AuthModuleModule } from 'src/features/auth-module/auth-module.module';
import { AuthRoutingModule } from 'src/features/auth-module/auth-routing.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'tickets',
    component: TicketingContainerComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('src/features/auth-module/auth-module.module').then(m => m.AuthModuleModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
