import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'swp-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  cards = [
    {
      title: 'Enter VIN',
      photo: '../../assets/images/barcode-icon.png',
      description: 'Enter the VIN number of your vehicle to help us accurately diagnose any issues.'
    },
    {
      title: 'Describe Issues',
      photo: '../../assets/images/notepad-icon.png',
      description: 'Describe the issues you are experiencing in detail to help us better understand the problem.'
    },
    {
      title: 'Submit Photos',
      photo: '../../assets/images/upload-icon.png',
      description: 'Easily submit photos of any issues you are experiencing with your vehicle.'
    },
    {
      title: 'Make Payment',
      photo: '../../assets/images/payment-icon.png',
      description: 'Easily make a payment to finalize the submission of your ticket.'
    }
  ];

  constructor(
    private router: Router
  ) { }

  onLearnMoreClick() {
    this.router.navigate(['/pricing']);
  }
}
