import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionStore } from 'src/app/session-store/domain-state/session.store';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AuthContainerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  isAuthenticated$ = this.sessionQuery.isAuthenticated$;
  emailVerified$ = this.sessionQuery.emailVerified$;

  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) {
    combineLatest([this.isAuthenticated$, this.emailVerified$])
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(([isAuth, isVerified]) => {
        if (isAuth || isVerified) {
          this.router.navigate(['/home']);
        }
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.destroy$.next(false);
  }

}
