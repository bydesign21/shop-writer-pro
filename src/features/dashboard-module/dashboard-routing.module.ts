import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardContainerComponent } from "./dashboard-container.component";
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";
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
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent,
      },
      {
        path: 'transactions',
        component: TransactionContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
