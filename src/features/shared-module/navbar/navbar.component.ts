import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  isMobile = false;
  isMenuVisible = false;

  private defaultNavLinks: { path: string, label: string }[] = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  @Input()
  displayedNavLinks: { path: string, label: string }[] = this.defaultNavLinks;

}
