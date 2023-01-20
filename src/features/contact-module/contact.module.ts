import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwpButtonModule } from '../shared-module/swp-button/swp-button.module';
import { ContactComponent } from './contact.component';
import { NavbarModule } from '../shared-module/navbar/navbar.module';
import { CardModule } from '../shared-module/card/card.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NavbarComponent } from '../shared-module/navbar/navbar.component';
import { NzInputModule } from 'ng-zorro-antd/input';



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
    NzInputModule
  ],
  exports: [
    ContactComponent,
  ]
})
export class ContactModule { }
