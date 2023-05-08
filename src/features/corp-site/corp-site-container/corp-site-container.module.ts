import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorpSiteContainerComponent } from './corp-site-container.component';
import { NavbarModule } from 'src/features/shared-module/navbar/navbar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CorpSiteContainerComponent],
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule
  ],
  exports: [CorpSiteContainerComponent]
})
export class CorpSiteContainerModule { }
