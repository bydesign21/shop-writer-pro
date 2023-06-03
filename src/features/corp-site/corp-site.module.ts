import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwpButtonModule } from '../shared-module/swp-button/swp-button.module';
import { HomepageComponent } from './homepage.component';
import { NavbarModule } from '../shared-module/navbar/navbar.module';
import { CardModule } from '../shared-module/card/card.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SpinnerModule } from '../shared-module/spinner/spinner.module';
import { PricingPageModule } from './pricing-page/pricing-page.module';
import { CorpSiteRoutingModule } from './corp-site-routing.module';
import { ContactModule } from './contact-module/contact.module';
import { CorpSiteContainerModule } from './corp-site-container/corp-site-container.module';



@NgModule({
  declarations: [
    HomepageComponent,
  ],
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
    CorpSiteContainerModule
  ],
  exports: [
    HomepageComponent,
  ]
})
export class CorpSiteModule { }
