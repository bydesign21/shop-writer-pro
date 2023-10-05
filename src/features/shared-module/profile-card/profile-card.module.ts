import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { ProfileCardComponent } from './profile-card.component';

@NgModule({
  declarations: [ProfileCardComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule,
    NzLayoutModule,
    NzUploadModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    NzInputModule,
    NzButtonModule,
  ],
  exports: [ProfileCardComponent],
})
export class ProfileCardModule {}
