import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, from, Observable, Subject, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { TicketViewerComponent } from 'src/features/shared-module/ticket-viewer/ticket-viewer.component';
import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'app-transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.scss']
})
export class TransactionContainerComponent implements OnInit {
  @ViewChild('nzModalContent')
  nzModalContent: TemplateRef<TicketViewerComponent>;
  destroy$ = new Subject();
  openOrders: Ticket[];
  openOrderPagedData: Ticket[];
  openOrderTableLimit = 10;
  openOrderPageIndex = 1;
  recentOrderPagedData: Ticket[];
  recentOrderTableLimit = 10;
  recentOrders: Ticket[];
  recentOrderPageIndex = 1;
  selectedTicket: Ticket;
  tickets$: Observable<Ticket[]>;
  userSession: SessionState;
  dataLoading$ = new BehaviorSubject<boolean>(false);
  constructor(
    private modalService: NzModalService,
    private ticketService: TicketService,
    private cd: ChangeDetectorRef,
    private ticketQuery: TicketQuery,
    private sessionQuery: SessionQuery
  ) {}

  ngOnInit(): void {
    this.sessionQuery.allState$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(userState => {
        this.userSession = userState;
      })
    this.loadData();
  }

  loadData(): void {
    this.dataLoading$.next(true);
    this.ticketService.getTicketsByUserId(this.userSession.email).then(() => {
      this.dataLoading$.next(false);
    });
    this.tickets$ = this.ticketQuery.selectAll();

    this.tickets$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tickets) => {
        console.log(tickets)
        this.openOrders = tickets.filter(ticket => ticket.status !== 'resolved');
        this.openOrderPagedData = this.updatePagedData(this.openOrders, this.openOrderPageIndex, this.openOrderTableLimit);
        this.cd.detectChanges();
      });
  }

  handleOpenOrderPageChange(index: number) {
    this.openOrderPageIndex = index;
    this.openOrderPagedData = this.updatePagedData(this.openOrders, this.openOrderPageIndex, this.openOrderTableLimit);
  }

  handleRecentOrderPageChange(index: number) {
    this.recentOrderPageIndex = index;
    this.recentOrderPagedData = this.updatePagedData(this.recentOrders, this.recentOrderPageIndex, this.recentOrderTableLimit);
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
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
