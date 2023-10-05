import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import {
  closedTicketStatuses,
  TicketStatus,
  UserRole,
  NonAdminRoles,
} from 'src/models/model';

import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketStore } from '../ticketing/store/tickets.store';
import { TicketService } from '../ticketing/ticket.service';
import { TicketingComponent } from '../ticketing/ticketing.component';

@Component({
  selector: 'swp-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  @ViewChild('submitTicketModal')
  submitTicket: TemplateRef<TicketingComponent>;
  openOrders$ = new BehaviorSubject(null);
  tableLimit = 5;
  recentOrders$ = new BehaviorSubject(null);
  userSession: SessionState;
  destroy$ = new Subject();
  tickets$: Observable<Ticket[]>;
  dataLoading$ = new BehaviorSubject<boolean>(false);
  userRoles = UserRole;
  constructor(
    private modalService: NzModalService,
    private ticketService: TicketService,
    private cd: ChangeDetectorRef,
    private sessionQuery: SessionQuery,
    private ticketQuery: TicketQuery,
    private ticketStore: TicketStore,
    private messageService: NzMessageService,
  ) { }

  handleSubmitTicketClicked() {
    this.modalService.create({
      nzContent: this.submitTicket,
      nzWidth: 580,
      nzFooter: null,
      nzCentered: true,
      nzMask: true,
      nzClassName: 'ticketing-modal',
    });
  }

  ngOnInit(): void {
    this.sessionQuery.allState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((session) => {
        this.userSession = session;
      });
    this.tickets$ = this.ticketQuery.selectAll();
    this.loadData();
    this.cd.detectChanges();
  }

  loadData() {
    this.dataLoading$.next(true);

    this.tickets$
      .pipe(
        take(1),
        switchMap((tickets) => {
          if (!tickets.length) {
            return this.ticketService.getUserTickets(this.userSession);
          } else {
            return of(tickets);
          }
        }),
        tap((tickets) => {
          this.ticketStore.set(tickets);
          this.updateData(tickets);
          this.dataLoading$.next(false);
          this.cd.detectChanges();
        }),
      )
      .subscribe();
  }

  handleTicketSubmitted(): void {
    this.dataLoading$.next(true);
    this.ticketService.getUserTickets(this.userSession)
      .pipe(take(1))
      .subscribe((tickets) => {
        this.ticketStore.set(tickets);
        this.updateData(tickets);
        this.cd.detectChanges();
        this.dataLoading$.next(false);
      });
  }

  updateData(tickets: Ticket[]) {
    const openOrders = [];
    const recentOrders = [];
    if (NonAdminRoles.includes(this.userSession.role as UserRole)) {
      tickets.forEach((ticket) => {
        closedTicketStatuses.includes(ticket.status as TicketStatus)
          ? recentOrders.push(ticket)
          : openOrders.push(ticket);
      });
    } else {
      tickets.forEach((ticket) => {
        openOrders.push(ticket);
      });
    }
    this.openOrders$.next([...openOrders]);
    this.recentOrders$.next([...recentOrders]);
  }

  handleTicketUpdated(ticket: Ticket): void {
    from(this.ticketService.updateTicket(ticket, this.userSession))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedTicket) => {
          this.ticketStore.update(ticket.ticketId, updatedTicket);
          this.messageService.remove();
          this.messageService.success('Ticket updated successfully');
          this.loadData();
        },
        error: (err) => {
          this.messageService.error(err.message);
        },
      });
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
