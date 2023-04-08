import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionService } from 'src/app/session-store/domain-state/session.service';
import { AuthService } from 'src/features/auth-module/auth-service.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  private defaultNavLinks: { path: string, label: string }[] = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  @Input()
  displayedNavLinks: { path: string, label: string }[] = this.defaultNavLinks;

  constructor(
  ) {}

}
