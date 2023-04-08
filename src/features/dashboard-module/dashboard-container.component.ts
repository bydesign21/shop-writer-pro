import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { from, of, Subject, take, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/session-store/domain-state/session.service';
import { AuthService } from '../auth-module/auth-service.service';
import { SpinnerService } from '../shared-module/spinner/spinner.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainerComponent implements OnInit {
  menuIsVisible: boolean = false;
  destroy$ = new Subject();
  constructor(
    private authService: AuthService,
    private spinner: SpinnerService,
    private messageService: NzMessageService,
    private sessionService: SessionService,
    private router: Router,
    private location: Location
  ) {}

  handleMenuButtonClicked() {
    this.menuIsVisible = !this.menuIsVisible;
  }

  handleLogoutClicked(event: any) {
    this.spinner.show();
    this.authService.handleSignOut()
      .pipe(
        take(1)
      )
      .subscribe(
        signOutRes => {
          this.messageService.success('Successfully Signed Out')
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

  ngOnInit(): void {
    this.location.onUrlChange(url => {
      this.menuIsVisible = false;
    });
    from(this.authService.checkSession()).subscribe(res => console.log(res, 'session checked'))
  }
}
