import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, of, Subject, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketService } from '../ticketing/ticket.service';
import { TicketingComponent } from '../ticketing/ticketing.component';
import { closedTicketStatuses, TicketStatus, UserRole, NonAdminRoles } from 'src/models/model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'swp-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  @ViewChild('submitTicketModal')
  submitTicket: TemplateRef<TicketingComponent>;
  openOrders$ = new BehaviorSubject(null);
  tableLimit = 5;
  recentOrders$ = new BehaviorSubject(null);
  userSession: SessionState
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
    private messageService: NzMessageService,
  ) {}

  handleSubmitTicketClicked() {
    this.modalService.create({
      nzContent: this.submitTicket,
      nzWidth: 580,
      nzFooter: null,
      nzCentered: true,
      nzMask: true,
      nzClassName: 'ticketing-modal',
    })
  }

  ngOnInit(): void {
    this.sessionQuery.allState$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(session => {
        this.userSession = session;
      });
    this.loadData();
    this.cd.detectChanges();
  }

  async loadData(): Promise<void> {
    this.dataLoading$.next(true);
    await this.ticketService.getUserTickets(this.userSession);
    this.tickets$ = this.ticketQuery.selectAll();
    this.tickets$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tickets) => {
        const openOrders = [];
        const recentOrders = [];
        if (NonAdminRoles.includes(this.userSession.role as UserRole)) {
          tickets.forEach((ticket) => {
            closedTicketStatuses.includes(ticket.status as TicketStatus)
              ? recentOrders.push(ticket)
              : openOrders.push(ticket)
          })
        } else {
          tickets.forEach((data: any) => {
            openOrders.push(data.ticket);
            recentOrders.push(data.assignment);
          })
        }
        this.openOrders$.next([...openOrders])
        this.recentOrders$.next([...recentOrders])
        this.dataLoading$.next(false);
        this.cd.detectChanges();
      });
  }

  handleTicketUpdated(ticket: Ticket): void {
    of(this.ticketService.updateTicket(ticket, this.userSession))
      .pipe(
        takeUntil(this.destroy$),
        take(1)
      )
      .subscribe({
        next: () => {
          this.messageService.remove();
          this.messageService.success('Ticket updated successfully');
        },
        error: (err) => {
          this.messageService.error(err.message);
        }
      });
      this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
