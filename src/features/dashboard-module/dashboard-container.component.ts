import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, take, takeUntil } from 'rxjs';

import { AuthService } from '../auth-module/auth-service.service';
import { SpinnerService } from '../shared-module/spinner/spinner.service';

@Component({
  selector: 'swp-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  menuIsVisible = false;
  destroy$ = new Subject();
  constructor(
    private authService: AuthService,
    private spinner: SpinnerService,
    private messageService: NzMessageService,
    private router: Router,
    private location: Location,
  ) {}

  handleMenuButtonClicked() {
    this.menuIsVisible = !this.menuIsVisible;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleSignOutClicked(event: any) {
    this.spinner.show();
    this.authService
      .handleSignOut()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (_) => this.messageService.success('Successfully Signed Out'),
        error: (err) => this.messageService.error(err.message),
        complete: () => {
          this.router.navigate(['/home']);
          setTimeout(() => this.spinner.hide(), 2000);
        },
      });
  }

  ngOnInit(): void {
    this.location.onUrlChange((_) => {
      this.menuIsVisible = false;
    });
  }
}
