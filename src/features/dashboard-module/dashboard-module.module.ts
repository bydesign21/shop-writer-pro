import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './dashboard-container.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DashboardHomeModule } from './dashboard-home/dashboard-home.module';
import {NzDrawerModule} from 'ng-zorro-antd/drawer'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TransactionContainerModule } from './transaction-container/transaction-container.module';
import { SpinnerModule } from '../shared-module/spinner/spinner.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from '../auth-module/auth-module.module';



@NgModule({
  declarations: [
    DashboardContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    DashboardHomeModule,
    NzDrawerModule,
    NzButtonModule,
    TransactionContainerModule,
    SpinnerModule,
    ProfileModule,
    AuthModule
  ],
})
export class DashboardModule { }
