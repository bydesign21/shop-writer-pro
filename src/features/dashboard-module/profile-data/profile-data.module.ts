import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ProfileCardModule } from 'src/features/shared-module/profile-card/profile-card.module';
import { TableCardModule } from 'src/features/shared-module/table-card/table-card.module';
import { TicketViewerModule } from 'src/features/shared-module/ticket-viewer/ticket-viewer.module';

import { ProfileDataComponent } from './profile-data.component';

@NgModule({
  declarations: [ProfileDataComponent],
  imports: [
    CommonModule,
    TableCardModule,
    NzGridModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    RouterModule,
    TicketViewerModule,
    ProfileCardModule,
  ],
  exports: [ProfileDataComponent],
})
export class ProfileDataModule {}
