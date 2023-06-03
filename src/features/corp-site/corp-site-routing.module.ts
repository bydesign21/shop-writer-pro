import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-module/auth.guard';
import { ContactComponent } from './contact-module/contact.component';
import { CorpSiteContainerComponent } from './corp-site-container/corp-site-container.component';
import { HomepageComponent } from './homepage.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CorpSiteContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'pricing',
        component: PricingPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpSiteRoutingModule {}
