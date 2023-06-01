import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketService } from '../ticketing/ticket.service';
import { TicketingComponent } from '../ticketing/ticketing.component';
import { UserRole } from 'src/models/model';

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
    private ticketQuery: TicketQuery
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

  loadData(): void {
    this.dataLoading$.next(true);
    this.ticketService.getUserTickets(this.userSession).then(() => {
      this.dataLoading$.next(false);
    });
    this.tickets$ = this.ticketQuery.selectAll();
    this.tickets$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tickets) => {
        this.recentOrders$.next(tickets.filter(ticket => ticket.status === 'resolved'))
        this.openOrders$.next(tickets.filter(ticket => ticket.status !== 'resolved'));
      });
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
