import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'swp-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss'],
})
export class ReviewOrderComponent implements OnInit {
  @Input() panels: any[] = [
    {
      active: true,
      name: 'Plan',
      disabled: false,
      id: 1,
    },
    {
      active: false,
      disabled: false,
      name: 'Vehicle Details',
      id: 2,
    },
    {
      active: false,
      disabled: false,
      name: 'Damage Description',
      id: 3,
    },
    {
      active: false,
      disabled: false,
      name: 'Uploaded Images',
      id: 4,
    },
  ];
  @Input() formValues: any;
  @Output() addVehicle = new EventEmitter<void>();

  addAdditionalVehicle() {
    this.addVehicle.emit();
  }

  ngOnInit(): void {
    console.log('formValues', this.formValues);
  }
}
