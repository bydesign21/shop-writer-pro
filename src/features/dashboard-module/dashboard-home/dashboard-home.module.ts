import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SessionStore } from 'src/app/session-store/domain-state/session.store';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { TableCardModule } from 'src/features/shared-module/table-card/table-card.module';
import { TicketViewerModule } from 'src/features/shared-module/ticket-viewer/ticket-viewer.module';

import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketStore } from '../ticketing/store/tickets.store';
import { TicketingModule } from '../ticketing/ticketing.module';

import { DashboardHomeComponent } from './dashboard-home.component';

@NgModule({
  declarations: [DashboardHomeComponent],
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
    NzSpinModule,
    TableCardModule,
  ],
})
export class DashboardHomeModule {}
