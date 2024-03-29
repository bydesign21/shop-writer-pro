import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { TicketViewerModule } from '../ticket-viewer/ticket-viewer.module';

import { TableCardComponent } from './table-card.component';

@NgModule({
  declarations: [TableCardComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    TicketViewerModule,
    NzTableModule,
    NzToolTipModule,
  ],
  exports: [TableCardComponent],
})
export class TableCardModule {}
