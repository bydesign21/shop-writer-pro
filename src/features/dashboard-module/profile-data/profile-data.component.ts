import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  BehaviorSubject,
  Subject,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

import { Ticket } from '../ticketing/store/ticket.model';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'swp-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent implements OnInit, OnDestroy {
  public data$ = new BehaviorSubject<Ticket[]>(null);
  private destroy$ = new Subject();
  private userSession: SessionState;
  loading$ = new BehaviorSubject<boolean>(true);
  dataLoading$ = new BehaviorSubject<boolean>(false);
  profileRole$ = new BehaviorSubject<string>(null);
  tableLimit = 10;
  email: string;
  userProfile: any;
  userForm: FormGroup;
  breadcrumbs = [
    {
      label: 'Dashboard',
      url: '/dashboard',
    },
    {
      label: 'User Profile',
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private utilService: SharedUtilsService,
    private messageService: NzMessageService,
    private sessionQuery: SessionQuery,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sessionQuery.allState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((session) => {
        this.userSession = session;
        // if (this.userSession.role !== UserRole.ADMIN) {
        //   this.router.navigate(['/dashboard']);
        // }
      });

    this.activatedRoute.queryParams
      .pipe(
        tap(() => this.dataLoading$.next(true)),
        takeUntil(this.destroy$),
        take(1),
        switchMap((params: any) => {
          const { email, role } = params;
          this.profileRole$.next(role);
          this.email = email;
          return this.ticketService.getUserTickets({
            email,
            role,
          } as SessionState);
        }),
      )
      .subscribe({
        next: (tickets) => {
          this.data$.next(tickets);
          this.dataLoading$.next(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.getProfileDetails(this.email);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getProfileDetails(userId: string) {
    this.utilService
      .getUserProfileData(userId)
      .pipe(
        tap(() => this.loading$.next(true)),
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        this.userProfile = res;
        this.loading$.next(false);
      });
  }

  handleUserInfoUpdated(payload: any): void {
    this.utilService
      .adminUpdateUserProfile(payload, this.email)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          if (res.success) {
            this.handleSuccessResponse(res);
          } else {
            this.handleErrorResponse(res);
          }
        },
        (err) => {
          this.messageService.error('Unexpected error occurred.');
        },
      );
  }

  private handleSuccessResponse(res: any) {
    this.messageService.success(res.message);
    this.cd.detectChanges();
  }

  private handleErrorResponse(res: any) {
    this.messageService.error(res.message);
  }

  handleTicketUpdated(ticket: Ticket): void {
    of(this.ticketService.updateTicket(ticket, this.userSession))
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe({
        next: () => {
          this.data$.next(
            this.data$.value.map((t) =>
              t.ticketId === ticket.ticketId ? ticket : t,
            ),
          );
          this.messageService.remove();
          this.messageService.success('Ticket updated successfully');
        },
        error: (err) => {
          this.messageService.error(err.message);
        },
      });
    this.cd.detectChanges();
  }
}
