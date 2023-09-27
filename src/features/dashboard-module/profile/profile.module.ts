import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { ProfileComponent } from './profile.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/features/shared-module/breadcrumb/breadcrumb.module';

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
    GooglePlaceModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
