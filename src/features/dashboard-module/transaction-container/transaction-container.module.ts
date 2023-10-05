import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BreadcrumbModule } from 'src/features/shared-module/breadcrumb/breadcrumb.module';
import { TableCardModule } from 'src/features/shared-module/table-card/table-card.module';
import { TicketViewerModule } from 'src/features/shared-module/ticket-viewer/ticket-viewer.module';

import { TransactionContainerComponent } from './transaction-container.component';

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
    BreadcrumbModule,
  ],
  exports: [TransactionContainerComponent],
})
export class TransactionContainerModule {}
