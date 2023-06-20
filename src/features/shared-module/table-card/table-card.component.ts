import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Ticket } from 'src/features/dashboard-module/ticketing/store/ticket.model';
import { TicketStatus, UserRole } from 'src/models/model';
import { SharedUtilsService } from '../shared-utils/shared-utils.service';
import { TicketViewerComponent } from '../ticket-viewer/ticket-viewer.component';

@Component({
  selector: 'swp-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCardComponent implements OnInit, OnDestroy {
  @ViewChild('viewTicketModal')
  viewRowRef: TemplateRef<TicketViewerComponent>;
  @Input() data$: BehaviorSubject<any[]>;
  @Input() pageLimit: number;
  @Input() noResultRef: TemplateRef<any> | string;
  @Input() loadingIndicatorRef: TemplateRef<any>;
  @Input() isLoading$: BehaviorSubject<boolean>;
  @Input() cardTitle: string;
  @Input() rules: UserRole | string = UserRole.USER;
  @Output() ticketUpdated = new EventEmitter<Ticket>();
  pageIndex = 1;
  pagedData: any[];
  selectedItem: any;
  ticketStatus = TicketStatus;
  destroy$ = new Subject();

  constructor(
    private modalService: NzModalService,
    private cd: ChangeDetectorRef,
    private utilService: SharedUtilsService
  ) {}

  ngOnInit() {
    this.isLoading$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((isLoading) => {
        this.pagedData =
          !isLoading
            ? this.updatePagedData(this.data$.getValue(), this.pageIndex, this.pageLimit)
            : [];
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  updatePagedData(data: any[], pageIndex: number, tableLimit: number) {
    const startIndex = (pageIndex - 1) * tableLimit;
    const endIndex = startIndex + tableLimit;
    return data?.slice(startIndex, endIndex);
  }

  handlePageChange(index: number) {
    this.pageIndex = index;
    this.pagedData = this.updatePagedData(this.data$.getValue(), this.pageIndex, this.pageLimit);
  }

  handleUpdateTicket(ticket: Ticket) {
    this.ticketUpdated.emit(ticket);
  }

  viewTableRow(item: any) {
    this.selectedItem = item;
    this.cd.detectChanges();
    const ticketDate = new Date(item.date).toLocaleDateString();
    this.modalService.create({
      nzTitle: `Ticket Details - ${ticketDate}`,
      nzContent: this.viewRowRef,
      nzClassName: 'ticket-viewer-modal',
      nzFooter: [{ label: 'Close', type: 'default', onClick: () => this.modalService.closeAll() }]
    })
  }

  getTicketStatusPillColor(status: TicketStatus) {
    return this.utilService.getTicketStatusPillColor(status);
  }
}
