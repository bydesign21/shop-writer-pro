import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { ProfileComponent } from './profile.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzColDirective, NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    GooglePlaceModule,
    NzAutocompleteModule,
    NzIconModule,
    NzToolTipModule,
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
