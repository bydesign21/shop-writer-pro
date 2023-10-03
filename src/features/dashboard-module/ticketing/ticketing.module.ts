import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaymentModule } from 'src/features/shared-module/payment/payment.module';
import { PlanSelectorModule } from 'src/features/shared-module/plan-selector/plan-selector.module';
import { ReviewOrderModule } from 'src/features/shared-module/review-order/review-order.module';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';
import { UploadDocumentsModule } from 'src/features/shared-module/upload-documents/upload-documents.module';
import { VehicleDetailsModule } from 'src/features/shared-module/vehicle-details/vehicle-details.module';
import { VehicleDetailsDamageModule } from 'src/features/shared-module/vehicle-details-damage/vehicle-details-damage.module';

import { NavbarModule } from '../../shared-module/navbar/navbar.module';
import { SpinnerModule } from '../../shared-module/spinner/spinner.module';
import { SwpButtonModule } from '../../shared-module/swp-button/swp-button.module';

import { TicketingComponent } from './ticketing.component';
@NgModule({
  declarations: [TicketingComponent],
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
    PaymentModule,
    NzModalModule,
  ],
  exports: [TicketingComponent],
  providers: [SharedUtilsService, DecimalPipe],
})
export class TicketingModule {}
