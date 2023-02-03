import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionService } from 'src/app/session-store/domain-state/session.service';
import { AuthServiceService } from 'src/features/auth-module/auth-service.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnDestroy {

  private destroy$ = new Subject();
  isAuthenticated: boolean = false;
  sessionUserName$: Observable<string>;

  private defaultNavLinks: { path: string, label: string }[] = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  private navLinksAuth: { path: string, label: string }[] = [
    { path: '/home', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/contact', label: 'Contact' },
    { path: '/tickets', label: 'Tickets' }
  ];

  @Input()
  displayedNavLinks: { path: string, label: string }[] = this.defaultNavLinks;

  constructor(
    private sessionQuery: SessionQuery,
    private authService: AuthServiceService,
    private messageService: NzMessageService,
    private sessionService: SessionService,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService,
    private router: Router
  ) {
    this.sessionUserName$ = this.sessionQuery.name$;
    this.sessionQuery.isAuthenticated$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.isAuthenticated = res;
        if (this.isAuthenticated === true) {
          this.displayedNavLinks = this.navLinksAuth;
        } else {
          this.displayedNavLinks = this.defaultNavLinks;
        }
      });
  }


  handleSignOut() {
    this.spinner.show();
    this.authService.handleSignOut()
      .pipe(
        take(1)
      )
      .subscribe(
        signOutRes => {
        },
        error => {
          return this.messageService.error(error.message)
        },
        () => {
          this.sessionService.endSession();
          this.router.navigate(['/home']);
          setTimeout(() => this.spinner.hide(), 2000)
        }
      )

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
