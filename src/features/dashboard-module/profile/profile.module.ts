import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { BreadcrumbModule } from 'src/features/shared-module/breadcrumb/breadcrumb.module';
import { ProfileCardModule } from 'src/features/shared-module/profile-card/profile-card.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzGridModule,
    FormsModule,
    NzUploadModule,
    NzAutocompleteModule,
    NzIconModule,
    NzToolTipModule,
    RouterModule,
    BreadcrumbModule,
    ProfileCardModule
  ],
  exports: [ProfileComponent],
})
export class ProfileModule { }
