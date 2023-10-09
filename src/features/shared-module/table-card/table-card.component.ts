import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { Ticket } from 'src/features/dashboard-module/ticketing/store/ticket.model';
import { TicketStatus, UserRole } from 'src/models/model';

import { SharedUtilsService } from '../shared-utils/shared-utils.service';
import { TicketViewerComponent } from '../ticket-viewer/ticket-viewer.component';

@Component({
  selector: 'swp-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCardComponent implements OnInit, OnDestroy {
  @ViewChild('viewTicketModal')
  viewRowRef: TemplateRef<TicketViewerComponent>;
  @Input() data$: BehaviorSubject<any[]>;
  @Input() pageLimit: number;
  @Input() isLoading$: BehaviorSubject<boolean>;
  @Input() cardTitle: string;
  @Input() rules: UserRole | string = UserRole.USER;
  @Input() assignmentTable = false;
  @Output() ticketUpdated = new EventEmitter<Ticket>();
  pageIndex = 1;
  pagedData: any[];
  userRoles = UserRole;
  selectedItem: any;
  ticketStatus = TicketStatus;
  destroy$ = new Subject();
  tableHeadersDefault = [
    {
      title: 'Date',
      key: 'date',
      sortFn: (a: any, b: any) => a.date.localeCompare(b.date),
      width: '100px',
    },
    {
      title: 'Status',
      key: 'status',
      sortFn: (a: any, b: any) => a.status.localeCompare(b.status),
      nzFilters: [
        { text: 'Open', value: 'open' },
        { text: 'Closed', value: 'closed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Completed', value: 'completed' || 'resolved' },
        { text: 'Cancelled', value: 'cancelled' },
        { text: 'In Progress', value: 'in progress' || 'in_progress' },
      ],
      width: '35px',
      nzFilterFn: (status: string[], item: any) => {
        return status.some((status) => item.status.indexOf(status) !== -1);
      },
    },
    {
      title: 'Vin',
      key: 'vin',
      sortFn: (a: any, b: any) => a.vin.localeCompare(b.vin),
      width: '100px',
    },
    {
      title: 'Model',
      key: 'model',
      sortFn: (a: any, b: any) => a.model.localeCompare(b.model),
      width: '100px',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '35px',
    },
  ];
  tableHeadersAdmin = [
    {
      title: 'Date',
      key: 'date',
      sortFn: (a: any, b: any) => a.date.localeCompare(b.date),
      width: '100px',
    },
    {
      title: 'Status',
      key: 'status',
      sortFn: (a: any, b: any) => a.status.localeCompare(b.status),
      nzFilters: [
        { text: 'Open', value: 'open' },
        { text: 'Closed', value: 'closed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Completed', value: 'completed' || 'resolved' },
        { text: 'Cancelled', value: 'cancelled' },
        { text: 'In Progress', value: 'in progress' || 'in_progress' },
      ],
      width: '35px',
      nzFilterFn: (status: string[], item: any) => {
        return status.some((status) => item.status.indexOf(status) !== -1);
      },
    },
    {
      title: 'Assigned To',
      key: 'assignedTo',
      sortFn: (a: any, b: any) => a.assignedTo.localeCompare(b.assignedTo),
      width: '100px',
    },
  ];

  constructor(
    private modalService: NzModalService,
    private cd: ChangeDetectorRef,
    private utilService: SharedUtilsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((isLoading) => {
      this.pagedData = !isLoading
        ? this.updatePagedData(
          this.data$.getValue(),
          this.pageIndex,
          this.pageLimit,
        )
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
    this.pagedData = this.updatePagedData(
      this.data$.getValue(),
      this.pageIndex,
      this.pageLimit,
    );
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
      nzFooter: [
        {
          label: 'Close',
          type: 'default',
          onClick: () => this.modalService.closeAll(),
        },
      ],
    });
  }

  getTicketStatusPillColor(status: TicketStatus) {
    return this.utilService.getTicketStatusPillColor(status);
  }

  handleAssignedToClick(assignedToEmail: any) {
    this.modalService.closeAll();
    this.router.navigate(['/dashboard/profile/data'], {
      queryParams: { email: assignedToEmail, role: UserRole.EMPLOYEE },
    });
  }

  sortFn = (a: any, b: any) => {
    return a.localCompare(b);
  };
}
