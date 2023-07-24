import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, of, Subject, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { TicketViewerComponent } from 'src/features/shared-module/ticket-viewer/ticket-viewer.component';
import { UserRole } from 'src/models/model';
import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'swp-transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.scss']
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
  constructor(
    private modalService: NzModalService,
    private ticketService: TicketService,
    private cd: ChangeDetectorRef,
    private ticketQuery: TicketQuery,
    private sessionQuery: SessionQuery,
    private messageService: NzMessageService
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

  async loadData(role = UserRole.USER): Promise<void> {
    this.dataLoading$.next(true);
    await this.ticketService.getUserTickets(this.userSession);
    this.tickets$ = this.ticketQuery.selectAll();
    this.tickets$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tickets) => {
        console.log(tickets);
        this.openOrders$.next(tickets);
        this.dataLoading$.next(false);
        this.cd.detectChanges();
      });
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
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
