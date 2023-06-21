import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SignUpComponent } from './sign-up.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzFormModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzFormModule,
    NzAutocompleteModule,
    NzIconModule,
    GooglePlaceModule
  ],
  exports: [SignUpComponent]
})
export class SignUpModule { }
