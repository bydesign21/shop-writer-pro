import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwpButtonModule } from '../shared-module/swp-button/swp-button.module';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../shared-module/navbar/navbar.module';
import { CardModule } from '../shared-module/card/card.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SpinnerModule } from '../shared-module/spinner/spinner.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwpButtonModule,
    CardModule,
    NzLayoutModule,
    NzGridModule,
    NzTableModule,
    NavbarModule,
    SpinnerModule
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
