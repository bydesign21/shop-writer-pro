import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzImageModule } from 'ng-zorro-antd/image';

import { ReviewOrderComponent } from './review-order.component';

@NgModule({
  declarations: [ReviewOrderComponent],
  imports: [CommonModule, NzCollapseModule, NzCardModule, NzImageModule],
  exports: [ReviewOrderComponent],
})
export class ReviewOrderModule {}
