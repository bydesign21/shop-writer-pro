import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AuthContainerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  isAuthenticated$ = this.sessionQuery.isAuthenticated$;
  emailVerified$ = this.sessionQuery.emailVerified$;

  constructor(private sessionQuery: SessionQuery) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.destroy$.next(false);
  }
}
