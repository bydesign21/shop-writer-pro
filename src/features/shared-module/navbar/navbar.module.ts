import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { SwpButtonComponent } from '../swp-button/swp-button.component';
import { SwpButtonModule } from '../swp-button/swp-button.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NzGridModule,
    RouterModule,
    SwpButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzIconModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
