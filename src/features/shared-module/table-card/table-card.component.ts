import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TicketViewerComponent } from '../ticket-viewer/ticket-viewer.component';

@Component({
  selector: 'swp-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent implements OnInit {
  @ViewChild('viewTicketModal')
  viewRowRef: TemplateRef<TicketViewerComponent>;
  @Input() data: any[];
  @Input() pageLimit: number;
  @Input() noResultRef: TemplateRef<any> | string;
  @Input() loadingIndicatorRef: TemplateRef<any>;
  @Input() isLoading: boolean;
  @Input() cardTitle: string;
  pageIndex = 1;
  pagedData: any[];
  selectedItem: any;

  constructor(
    private modalService: NzModalService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.pagedData = this.updatePagedData(this.data, this.pageIndex, this.pageLimit);
    console.log(this.pagedData, this.data)
  }

  updatePagedData(data: any[], pageIndex: number, tableLimit: number) {
    const startIndex = (pageIndex - 1) * tableLimit;
    const endIndex = startIndex + tableLimit;
    return data.slice(startIndex, endIndex);
  }

  handlePageChange(index: number) {
    this.pageIndex = index;
    this.pagedData = this.updatePagedData(this.data, this.pageIndex, this.pageLimit);
  }

  viewTableRow(item: any) {
    this.selectedItem = item;
    this.cd.detectChanges();
    const ticketDate = new Date(item.date).toLocaleDateString();
    console.log(item, ticketDate)
    this.modalService.create({
      nzTitle: `Ticket Details - ${ticketDate}`,
      nzContent: this.viewRowRef,
      nzClassName: 'ticket-viewer-modal',
      nzFooter: [{ label: 'Close', type: 'default', onClick: () => this.modalService.closeAll() }]
    })
  }
}
