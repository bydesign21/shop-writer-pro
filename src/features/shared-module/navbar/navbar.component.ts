import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'swp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  constructor(private location: Location) {}

  isMobile = false;
  isMenuVisible = false;

  private defaultNavLinks: { path: string; label: string }[] = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/pricing', label: 'Pricing' },
  ];

  @Input()
  displayedNavLinks: { path: string; label: string }[] = this.defaultNavLinks;

  ngOnInit(): void {
    this.location.onUrlChange((_) => {
      this.isMenuVisible = false;
    });
  }
}
