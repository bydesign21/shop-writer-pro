import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
  pageIndex = 1;
  pagedData: any[];
  selectedItem: any;

  destroy$ = new Subject();

  constructor(
    private modalService: NzModalService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((isLoading) => {
        !isLoading
        ? this.pagedData = this.updatePagedData(this.data$.getValue(), this.pageIndex, this.pageLimit)
        : this.pagedData = [];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  updatePagedData(data: any[], pageIndex: number, tableLimit: number) {
    const startIndex = (pageIndex - 1) * tableLimit;
    const endIndex = startIndex + tableLimit;
    return data.slice(startIndex, endIndex);
  }

  handlePageChange(index: number) {
    this.pageIndex = index;
    this.pagedData = this.updatePagedData(this.data$.getValue(), this.pageIndex, this.pageLimit);
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
}
