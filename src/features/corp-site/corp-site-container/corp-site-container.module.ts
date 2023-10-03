import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/features/shared-module/navbar/navbar.module';

import { CorpSiteContainerComponent } from './corp-site-container.component';

@NgModule({
  declarations: [CorpSiteContainerComponent],
  imports: [CommonModule, NavbarModule, RouterModule],
  exports: [CorpSiteContainerComponent],
})
export class CorpSiteContainerModule {}
