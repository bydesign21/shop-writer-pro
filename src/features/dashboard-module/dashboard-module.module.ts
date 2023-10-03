import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { AuthModule } from '../auth-module/auth-module.module';
import { SpinnerModule } from '../shared-module/spinner/spinner.module';

import { DashboardContainerComponent } from './dashboard-container.component';
import { DashboardHomeModule } from './dashboard-home/dashboard-home.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileDataModule } from './profile-data/profile-data.module';
import { TransactionContainerModule } from './transaction-container/transaction-container.module';

@NgModule({
  declarations: [DashboardContainerComponent],
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
    ProfileDataModule,
    AuthModule,
  ],
})
export class DashboardModule {}
