import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'swp-plan-selector',
  templateUrl: './plan-selector.component.html',
  styleUrls: ['./plan-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanSelectorComponent implements OnInit {
  @Input() selectedPlan: any;
  @Output() planSelected = new EventEmitter<any>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.selectedPlan) {
      this.planSelected.emit(this.selectedPlan);
      this.cd.detectChanges();
    }
  }

  plans = [
    {
      name: 'Standard Supplement',
      id: 0,
      description:
        'Send us the insurance estimate, VIN, damage photos, and a brief description. We`ll review everything and provide an accurate supplement. After a final accuracy check, we`ll send it to you.',
      image: '../../../assets/images/barcode-icon.png',
      cost: 150,
    },
    {
      name: 'Standard Estimate',
      id: 1,
      description:
        'Our estimators use the VIN, damage photos, and description to create an estimate for insurance negotiations. It undergoes a final accuracy review before being sent to you.',
      image: '../../../assets/images/barcode-icon.png',
      cost: 200,
    },
  ];

  selectPlan(plan: any) {
    this.selectedPlan = plan;
    this.planSelected.emit(plan);
  }
}
