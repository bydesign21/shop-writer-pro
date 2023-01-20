import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SwpButtonComponent } from './swp-button.component';



@NgModule({
  declarations: [SwpButtonComponent],
  imports: [
    CommonModule,
    NzButtonModule
  ],
  exports: [SwpButtonComponent]
})
export class SwpButtonModule { }
