import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardGuard } from "../auth-module/dashboard.guard";
import { DashboardContainerComponent } from "./dashboard-container.component";
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";
import { ProfileComponent } from "./profile/profile.component";
import { TransactionContainerComponent } from "./transaction-container/transaction-container.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardContainerComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent,
      },
      {
        path: 'transactions',
        component: TransactionContainerComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
