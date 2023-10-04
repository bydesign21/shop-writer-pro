import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { TicketViewerComponent } from './ticket-viewer.component';

@NgModule({
  declarations: [TicketViewerComponent],
  imports: [
    CommonModule,
    NzCollapseModule,
    NzCardModule,
    NzImageModule,
    NzInputModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzAutocompleteModule,
    NzUploadModule,
    NzSelectModule,
    PdfViewerModule,
    HttpClientModule,
    NzTagModule,
    NzModalModule,
    NzTableModule,
    NzToolTipModule,
  ],
  exports: [TicketViewerComponent],
})
export class TicketViewerModule { }
