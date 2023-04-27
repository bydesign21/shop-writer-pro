import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table'
import { TicketingModule } from '../ticketing/ticketing.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzTagModule} from 'ng-zorro-antd/tag'
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { TicketViewerModule } from 'src/features/shared-module/ticket-viewer/ticket-viewer.module';
import { TicketStore } from '../ticketing/store/tickets.store';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    DashboardHomeComponent,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    RouterModule,
    NzModalModule,
    TicketingModule,
    NzTableModule,
    NzDividerModule,
    SpinnerModule,
    NzTagModule,
    TicketViewerModule,
    NzSpinModule
  ],
  providers: [TicketStore]
})
export class DashboardHomeModule { }
