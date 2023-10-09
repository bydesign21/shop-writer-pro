import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuard } from '../auth-module/dashboard.guard';

import { DashboardContainerComponent } from './dashboard-container.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { TransactionContainerComponent } from './transaction-container/transaction-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardContainerComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'transactions',
        component: TransactionContainerComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'profile/data',
        component: ProfileDataComponent,
        canActivate: [DashboardGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
