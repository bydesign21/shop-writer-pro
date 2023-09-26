import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TableCardComponent } from './table-card.component'
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TicketViewerModule } from '../ticket-viewer/ticket-viewer.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';



@NgModule({
  declarations: [TableCardComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    TicketViewerModule,
    NzTableModule,
    NzToolTipModule
  ],
  exports: [TableCardComponent]
})
export class TableCardModule { }
