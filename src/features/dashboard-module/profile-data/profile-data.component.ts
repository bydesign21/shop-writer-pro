import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  loading$ = new BehaviorSubject<boolean>(null);
  dataLoading$ = new BehaviorSubject<boolean>(false);
  profileRole$ = new BehaviorSubject<string>(null);
  tableLimit = 10;
  email: string;
  userProfile$ = new BehaviorSubject<any>(null);
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
  ) {}

  ngOnInit(): void {
    this.sessionQuery.allState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((session) => {
        this.userSession = session;
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
        this.userProfile$.next(res);
        this.loading$.next(false);
      });
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
