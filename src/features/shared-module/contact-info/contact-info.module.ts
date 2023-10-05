import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ContactInfoComponent } from './contact-info.component';

@NgModule({
  declarations: [ContactInfoComponent],
  imports: [CommonModule, NzCardModule, NzIconModule],
  exports: [ContactInfoComponent],
})
export class ContactInfoModule {}
