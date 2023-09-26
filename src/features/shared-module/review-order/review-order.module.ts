import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewOrderComponent } from './review-order.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';



@NgModule({
  declarations: [
    ReviewOrderComponent
  ],
  imports: [
    CommonModule,
    NzCollapseModule,
    NzCardModule,
    NzImageModule
  ],
  exports: [
    ReviewOrderComponent
  ]
})
export class ReviewOrderModule { }
