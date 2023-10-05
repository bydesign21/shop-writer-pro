import { Component, Input } from '@angular/core';
import { NzJustify } from 'ng-zorro-antd/grid';

@Component({
  selector: 'swp-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss'],
})
export class PricingTableComponent {
  @Input() justify: NzJustify = 'center';
  plans = [
    {
      name: 'Standard Supplement',
      price: 150,
      description:
        'Send us the insurance estimate, VIN, damage photos, and a brief description. We`ll review everything and provide an accurate supplement. After a final accuracy check, we`ll send it to you.',
      features: [],
    },
    {
      name: 'Standard Estimate',
      price: 200,
      description:
        'Our estimators use the VIN, damage photos, and description to create an estimate for insurance negotiations. It undergoes a final accuracy review before being sent to you.',
      features: [],
    },
  ];
}
