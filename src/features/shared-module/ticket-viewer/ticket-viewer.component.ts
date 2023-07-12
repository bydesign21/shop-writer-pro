import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { take, takeUntil } from 'rxjs';
import { Ticket } from 'src/features/dashboard-module/ticketing/store/ticket.model';
import { TicketService } from 'src/features/dashboard-module/ticketing/ticket.service';
import { TicketStatus, UploadFileStatus, UserRole } from 'src/models/model';
import { insuranceList } from '../shared-utils/shared.model';

@Component({
  selector: 'swp-ticket-viewer',
  templateUrl: './ticket-viewer.component.html',
  styleUrls: ['./ticket-viewer.component.scss'],
  providers: [DecimalPipe]
})
export class TicketViewerComponent implements OnInit, OnDestroy {
  @Output() ticketSubmitted = new EventEmitter<boolean>(false);
  @Input() rules: UserRole | string;
  userRole = UserRole;

  constructor(
    private messageService: NzMessageService,
    private ticketService: TicketService,
    private http: HttpClient,
    private modalService: NzModalService
  ) {}
  @Input() ticket: Ticket;
  @Output() ticketUpdated = new EventEmitter<Ticket>();
  destroy$ = new EventEmitter();
  updatedTicket: Ticket;
  editVehicleInfo = false;
  insuranceList = insuranceList;
  fileStatus = UploadFileStatus;
  documentList: string[] = [];
  selectedFiles: NzUploadFile[] = [];
  ticketStatus: TicketStatus = TicketStatus.PENDING;
  itemMatchUrlRegex = /[^/]*$/;
  ticketStatusEnum = TicketStatus;
  ticketStatusOptions = [
    {
      label: 'Pending',
      value: TicketStatus.PENDING
    },
    {
      label: 'In Progress',
      value: TicketStatus.IN_PROGRESS
    },
    {
      label: 'Completed',
      value: TicketStatus.COMPLETED
    },
    {
      label: 'Cancelled',
      value: TicketStatus.CANCELLED
    },
    {
      label: 'Refunded',
      value: TicketStatus.REFUNDED
    }
  ];
  panels = [
    {
      active: false,
      disabled: false,
      name: 'Vehicle Details',
      id: 2
    },
    {
      active: false,
      disabled: false,
      name: 'Damage Description',
      id: 3
    },
    {
      active: false,
      disabled: false,
      name: 'Uploaded Images',
      id: 4
    }
  ];

  ngOnInit(): void {
    this.ticketStatus = this.ticket.status as TicketStatus || TicketStatus.PENDING;
    this.updatedTicket = { ...this.ticket };
    this.updatedTicket?.documents?.forEach((image, index) => {
      this.selectedFiles = [
        ...this.selectedFiles,
        {
          name: image?.match(this.itemMatchUrlRegex)[0],
          uid: index.toString(),
          linkProps: { download: image },
          status: this.fileStatus.DONE,
          response: {
            Location: image
          }
        }
      ];
    });
    console.log(this.rules, 'role')
    if (this.rules === UserRole.EMPLOYEE || this.rules === this.userRole.ADMIN) {
      this.panels = [
        ...this.panels,
        {
          active: false,
          disabled: false,
          name: 'Review Ticket',
          id: 5
        }
      ]
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleEditButtonTrigger(event: any) {
    this.editVehicleInfo = !this.editVehicleInfo;
  }

  handleEditVehicleInfo(event: any) {
    if (this.updatedTicket.status === TicketStatus.PENDING) {
      const vehicleInfo: Ticket = {
        ...this.updatedTicket,
        lastUpdated: new Date().toISOString(),
        insurance: this.updatedTicket.insurance['value'] ? this.updatedTicket.insurance['value'] : this.updatedTicket.insurance
      };
      this.ticketUpdated.emit(vehicleInfo);
    } else {
      this.messageService.error('Ticket must be in a pending state to edit');
    }
  }

  public customReq = (item: NzUploadXHRArgs) => {
    return this.ticketService.uploadMedia(item).pipe(takeUntil(this.destroy$)).subscribe({
      error: (err: any) => {
        this.messageService.error(err);
      }
    });
  };

  public handleUploadChange({ file, fileList, type }: NzUploadChangeParam): void {
    const status = file.status;
    this.selectedFiles = fileList;
    if (status === 'done' && type === 'success') {
      this.documentList = [];
      this.selectedFiles.forEach(file => this.documentList.push(file?.response?.Location));
      this.updatedTicket = {
        ...this.updatedTicket,
        documents: this.documentList
      };
      this.ticketUpdated.emit(this.updatedTicket);
    } else if (status === 'error' && type === 'success') {
      this.messageService.error(`${file.name} file upload failed.`);
    }
  }

  handleFileRemove = (file: NzUploadFile) => {
    const removedFile = file.response.Location;
    this.documentList = [];
    this.selectedFiles.forEach(file => file.response.Location !== removedFile ? this.documentList.push(file?.response?.Location) : null);
    this.updatedTicket = {
      ...this.updatedTicket,
      documents: this.documentList
    };
    this.ticketUpdated.emit(this.updatedTicket);
    return true;
  };

  handleTicketStatusChange(event: any) {
    this.ticketStatus = event;
    this.updatedTicket = {
      ...this.updatedTicket,
      status: this.ticketStatus,
    };
    this.ticketUpdated.emit(this.updatedTicket);
  }

  handleFileDownload = (url: NzUploadFile) => {
    console.log(url.response.Location, 'url');
    if (url.response.Location) {
      this.http.get(url.response.Location, { responseType: 'blob' }).subscribe(response => {
        console.log(response, 'response')
        const blob = new Blob([response], { type: 'application/pdf' });
        const urlCreator = window.URL || window.webkitURL;
        const downloadUrl = urlCreator.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = url.name;
        anchor.click();
        anchor.remove();
      });
    }
  }

  handleUserProfileClick(item: any, role: string) {
    this.modalService.closeAll();
    this.modalService.afterAllClose
      .pipe(
        take(1)
      )
      .subscribe(() => {
        return this.modalService.create({
          nzTitle: role === 'employee' ? 'Employee Profile' : 'Customer Profile',
          nzComponentParams: {
            employeeId: item
          },
        });
      });
  }

  handleTicketStatusOpenChange(isOpen: boolean) {
    // if (isOpen) {
    //   setTimeout( () => {
    //   const nzSelectEl = document.querySelector('.ant-select');
    //   const nzSelectDropdownEl = document.querySelector('.ticket-status-dropdown');
    //   nzSelectEl.append(nzSelectDropdownEl)
    // }, 0)
    // }
  }
}
