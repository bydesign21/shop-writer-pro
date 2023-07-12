import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketViewerComponent } from './ticket-viewer.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';



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
    NzModalModule
  ],
  exports: [TicketViewerComponent],
})
export class TicketViewerModule { }
