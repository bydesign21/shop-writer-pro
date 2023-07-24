import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [
    ProfileCardComponent
  ],
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
    NzButtonModule
  ],
  exports: [
    ProfileCardComponent
  ]
})
export class ProfileCardModule { }
