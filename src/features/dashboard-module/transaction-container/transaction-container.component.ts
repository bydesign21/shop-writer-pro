import {
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
import { Breadcrumb } from 'src/features/shared-module/breadcrumb/breadcrumb.component';
import { TicketViewerComponent } from 'src/features/shared-module/ticket-viewer/ticket-viewer.component';
import { UserRole } from 'src/models/model';

import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketStore } from '../ticketing/store/tickets.store';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'swp-transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.scss'],
})
export class TransactionContainerComponent implements OnInit, OnDestroy {
  @ViewChild('nzModalContent')
  nzModalContent: TemplateRef<TicketViewerComponent>;
  destroy$ = new Subject();
  openOrders$ = new BehaviorSubject<Ticket[]>(null);
  openOrderTableLimit = 10;
  recentOrderPagedData: Ticket[];
  recentOrderTableLimit = 10;
  recentOrders: Ticket[];
  recentOrderPageIndex = 1;
  selectedTicket: Ticket;
  tickets$: Observable<Ticket[]>;
  userSession: SessionState;
  dataLoading$ = new BehaviorSubject<boolean>(false);
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Dashboard',
      url: '/dashboard',
    },
    {
      label: 'Transactions',
    },
  ];
  constructor(
    private modalService: NzModalService,
    private ticketService: TicketService,
    private cd: ChangeDetectorRef,
    private ticketQuery: TicketQuery,
    private sessionQuery: SessionQuery,
    private ticketStore: TicketStore,
    private messageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.sessionQuery.allState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userState) => {
        this.userSession = userState;
      });
    this.tickets$ = this.ticketQuery.selectAll();
    this.loadData(this.userSession.role as UserRole);
  }

  loadData(role = UserRole.USER) {
    this.dataLoading$.next(true);
    this.tickets$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((tickets) => {
          if (!tickets.length) {
            return this.ticketService
              .getUserTickets(this.userSession)
              .pipe(tap((tickets) => this.openOrders$.next(tickets)));
          } else {
            this.openOrders$.next(tickets);
            return of(tickets);
          }
        }),
      )
      .subscribe();
    this.dataLoading$.next(false);
    this.cd.detectChanges();
  }

  handleRecentOrderPageChange(index: number) {
    this.recentOrderPageIndex = index;
    this.recentOrderPagedData = this.updatePagedData(
      this.recentOrders,
      this.recentOrderPageIndex,
      this.recentOrderTableLimit,
    );
  }

  updatePagedData(data: Ticket[], pageIndex: number, tableLimit: number) {
    const startIndex = (pageIndex - 1) * tableLimit;
    const endIndex = startIndex + tableLimit;
    return data.slice(startIndex, endIndex);
  }

  handleViewTicket(item: Ticket) {
    this.selectedTicket = item;
    const ticketDate = new Date(item.date).toLocaleDateString();
    this.modalService.create({
      nzTitle: `Ticket Details - ${ticketDate} `,
      nzContent: this.nzModalContent,
      nzClassName: 'ticket-viewer-modal',
    });
  }

  handleTicketUpdated(ticket: Ticket): void {
    of(this.ticketService.updateTicket(ticket, this.userSession))
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe({
        next: () => {
          this.ticketStore.update(ticket.ticketId, ticket);
          this.messageService.remove();
          this.messageService.success('Ticket updated successfully');
        },
        error: (err) => {
          this.messageService.error(err.message);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
