import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../shared-module/navbar/navbar.module';
import { TicketingComponent } from './ticketing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SwpButtonModule } from '../../shared-module/swp-button/swp-button.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'
import { SpinnerModule } from '../../shared-module/spinner/spinner.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

@NgModule({
  declarations: [
    TicketingComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    NzStepsModule,
    NzProgressModule,
    SwpButtonModule,
    NzRadioModule,
    NzUploadModule,
    NzInputModule,
    NzCollapseModule,
    NzImageModule,
    NzCardModule,
    SpinnerModule,
    NgxSpinnerModule,
    RouterModule,
    NzIconModule,
    NzAutocompleteModule
  ],
  exports: [TicketingComponent],
  providers: [SharedUtilsService]
})
export class TicketingModule { }
