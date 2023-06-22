import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwpButtonModule } from '../../shared-module/swp-button/swp-button.module';
import { ContactComponent } from './contact.component';
import { NavbarModule } from '../../shared-module/navbar/navbar.module';
import { CardModule } from '../../shared-module/card/card.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FaqViewerModule } from 'src/features/shared-module/faq-viewer/faq-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwpButtonModule,
    CardModule,
    NzLayoutModule,
    NzGridModule,
    NzTableModule,
    NzFormModule,
    NavbarModule,
    NzInputModule,
    NzCardModule,
    NzIconModule,
    NavbarModule,
    FaqViewerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ContactComponent,
  ]
})
export class ContactModule { }
