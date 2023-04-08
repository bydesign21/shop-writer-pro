import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/features/home-module/home.component';
import { ContactComponent } from 'src/features/contact-module/contact.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
    path: 'dashboard',
    loadChildren: () => import('src/features/dashboard-module/dashboard-module.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('src/features/auth-module/auth-module.module').then(m => m.AuthModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
