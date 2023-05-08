import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricingpageComponent } from './pricingpage.component';

const routes: Routes = [
  {
    path: '',
    component: PricingpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingPageRoutingModule { }
