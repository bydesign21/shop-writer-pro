import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { AboutPageComponent } from './about-page.component';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NzAvatarModule,
  ],
  exports: [AboutPageComponent],
})
export class AboutPageModule {}
