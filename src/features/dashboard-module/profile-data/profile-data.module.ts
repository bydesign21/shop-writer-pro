import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataComponent } from './profile-data.component';
import { TableCardModule } from 'src/features/shared-module/table-card/table-card.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { TicketViewerModule } from 'src/features/shared-module/ticket-viewer/ticket-viewer.module';

@NgModule({
  declarations: [ProfileDataComponent],
  imports: [
    CommonModule,
    TableCardModule,
    NzGridModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    RouterModule,
    TicketViewerModule
  ],
  exports: [ProfileDataComponent],
})
export class ProfileDataModule { }
