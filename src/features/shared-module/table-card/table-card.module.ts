import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TableCardComponent } from './table-card.component'
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TicketViewerModule } from '../ticket-viewer/ticket-viewer.module';



@NgModule({
  declarations: [TableCardComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzTagModule,
    NzSpinModule,
    TicketViewerModule
  ],
  exports: [TableCardComponent]
})
export class TableCardModule { }
