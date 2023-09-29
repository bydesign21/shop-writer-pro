import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

import { CardModule } from '../shared-module/card/card.module';
import { NavbarModule } from '../shared-module/navbar/navbar.module';
import { SpinnerModule } from '../shared-module/spinner/spinner.module';
import { SwpButtonModule } from '../shared-module/swp-button/swp-button.module';

import { AboutPageModule } from './about-page-module/about-page.module';
import { ContactModule } from './contact-module/contact.module';
import { CorpSiteContainerModule } from './corp-site-container/corp-site-container.module';
import { CorpSiteRoutingModule } from './corp-site-routing.module';
import { HomepageComponent } from './homepage.component';
import { PricingPageModule } from './pricing-page-module/pricing-page.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule,
    SwpButtonModule,
    CardModule,
    NzLayoutModule,
    NzGridModule,
    NzTableModule,
    NavbarModule,
    SpinnerModule,
    PricingPageModule,
    CorpSiteRoutingModule,
    ContactModule,
    CorpSiteContainerModule,
    AboutPageModule,
  ],
  exports: [HomepageComponent],
})
export class CorpSiteModule {}
