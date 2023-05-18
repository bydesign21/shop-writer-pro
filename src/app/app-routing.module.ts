import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/features/corp-site/corp-site.module').then(m => m.CorpSiteModule)
  },
  {
    path: 'home',
    loadChildren: () => import('src/features/corp-site/corp-site.module').then(m => m.CorpSiteModule)
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
