import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, first, from, Observable, of, shareReplay, Subject, take, takeUntil, tap } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SpinnerService } from 'src/features/shared-module/spinner/spinner.service';
import { TicketViewerComponent } from 'src/features/shared-module/ticket-viewer/ticket-viewer.component';
import { Ticket } from '../ticketing/store/ticket.model';
import { TicketQuery } from '../ticketing/store/ticket.query';
import { TicketStore } from '../ticketing/store/tickets.store';
import { TicketService } from '../ticketing/ticket.service';
import { TicketingComponent } from '../ticketing/ticketing.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  @ViewChild('submitTicketModal')
  submitTicket: TemplateRef<TicketingComponent>;
  @ViewChild('viewTicketModal')
  viewTicket: TemplateRef<TicketViewerComponent>;
  openOrders: any[];
  openOrderPagedData: any[];
  openOrderTableLimit = 5;
  openOrderPageIndex = 1;
  recentOrderPagedData: any[];
  recentOrderTableLimit = 5;
  recentOrders: any[];
  recentOrderPageIndex = 1;
  userName$: Observable<string>;
  destroy$ = new Subject();
  tickets$: Observable<Ticket[]>;
  selectedTicket: any;
  dataLoading$ = new BehaviorSubject<boolean>(false);
  constructor(
    private modalService: NzModalService,
    private ticketService: TicketService,
    private cd: ChangeDetectorRef,
    private spinnerService: SpinnerService,
    private sessionQuery: SessionQuery,
    private ticketQuery: TicketQuery
  ) {}

  handleSubmitTicketClicked() {
    this.modalService.create({
      nzContent: this.submitTicket,
      nzWidth: 580,
      nzFooter: null,
      nzClassName: 'ticketing-modal',
    })
  }

  ngOnInit(): void {
    this.destroy$.next(false);
    this.loadData();
    this.userName$ = this.sessionQuery.name$;
  }

  loadData(): void {
    this.dataLoading$.next(true);
    this.ticketService.getTicketsByUserId('gvasquez@centralmethodist.edu').then(() => {
      this.dataLoading$.next(false);
    });
      this.tickets$ = this.ticketQuery.selectAll();

      this.tickets$
        .pipe(takeUntil(this.destroy$))
        .subscribe((tickets) => {
          this.recentOrders = tickets.filter(ticket => ticket.status === 'resolved');
          this.recentOrderPagedData = this.updatePagedData(this.recentOrders, this.recentOrderPageIndex, this.recentOrderTableLimit);
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

  updatePagedData(data: any[], pageIndex: number, tableLimit: number) {
    const startIndex = (pageIndex - 1) * tableLimit;
    const endIndex = startIndex + tableLimit;
    return data.slice(startIndex, endIndex);
  }

  handleViewTicket(item: any) {
    this.selectedTicket = item;
    const ticketDate = new Date(item.date).toLocaleDateString();
    this.modalService.create({
      nzTitle: `Ticket Details - ${ticketDate}`,
      nzContent: this.viewTicket,
      nzClassName: 'ticket-viewer-modal',
      nzFooter: [{label: 'Close', type: 'default', onClick: () => this.modalService.closeAll() }]
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
