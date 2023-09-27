import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionContainerComponent } from './transaction-container.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { TicketViewerModule } from 'src/features/shared-module/ticket-viewer/ticket-viewer.module';
import { TicketStore } from '../ticketing/store/tickets.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableCardModule } from 'src/features/shared-module/table-card/table-card.module';
import { BreadcrumbModule } from 'src/features/shared-module/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [TransactionContainerComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzTagModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    RouterModule,
    TicketViewerModule,
    NzIconModule,
    TableCardModule,
    BreadcrumbModule
  ],
  exports: [TransactionContainerComponent]
})
export class TransactionContainerModule { }
