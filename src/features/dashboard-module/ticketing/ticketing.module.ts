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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PlanSelectorModule } from 'src/features/shared-module/plan-selector/plan-selector.module';
import { VehicleDetailsModule } from 'src/features/shared-module/vehicle-details/vehicle-details.module';
import { UploadDocumentsModule } from 'src/features/shared-module/upload-documents/upload-documents.module';
import { VehicleDetailsDamageModule } from 'src/features/shared-module/vehicle-details-damage/vehicle-details-damage.module';
import { ReviewOrderModule } from 'src/features/shared-module/review-order/review-order.module';
import { PaymentModule } from 'src/features/shared-module/payment/payment.module';

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
    NzButtonModule,
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
    NzAutocompleteModule,
    InlineSVGModule,
    NzToolTipModule,
    PlanSelectorModule,
    VehicleDetailsModule,
    UploadDocumentsModule,
    VehicleDetailsDamageModule,
    ReviewOrderModule,
    PaymentModule
  ],
  exports: [TicketingComponent],
  providers: [SharedUtilsService]
})
export class TicketingModule { }
