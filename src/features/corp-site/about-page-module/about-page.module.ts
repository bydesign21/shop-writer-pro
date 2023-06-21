import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';



@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzAvatarModule
  ],
  exports: [AboutPageComponent]
})
export class AboutPageModule { }
