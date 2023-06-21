import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'swp-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  constructor(
    private router: Router
  ) {}

  onLearnMoreClick() {
    this.router.navigate(['/pricing']);
  }
}
