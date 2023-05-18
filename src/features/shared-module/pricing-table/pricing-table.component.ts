import { Component, Input } from '@angular/core';
import { NzJustify } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent {
  @Input() justify: NzJustify = 'center';
  plans = [
    {
      name: 'Basic',
      price: 10,
      features: ['1 user', '10GB storage', '24/7 support']
    },
    {
      name: 'Pro',
      price: 20,
      features: ['5 users', '50GB storage', '24/7 support']
    },
    {
      name: 'Enterprise',
      price: 50,
      features: ['Unlimited users', 'Unlimited storage', '24/7 support']
    }
  ];
}
