import { Component, Input } from '@angular/core';
import { NzJustify } from 'ng-zorro-antd/grid';

@Component({
  selector: 'swp-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent {
  @Input() justify: NzJustify = 'center';
  plans = [
    {
      name: 'Basic',
      price: 10,
      description: 'Most popular',
      features: ['1 user', '10GB storage', '24/7 support']
    },
    {
      name: 'Pro',
      price: 20,
      description: 'Best for teams',
      features: ['5 users', '50GB storage', '24/7 support']
    },
    {
      name: 'Enterprise',
      price: 50,
      description: 'Best value for large teams',
      features: ['Unlimited users', 'Unlimited storage', '24/7 support']
    }
  ];
}
