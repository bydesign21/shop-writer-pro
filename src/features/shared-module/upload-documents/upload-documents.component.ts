import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Subject, takeUntil } from 'rxjs';
import { TicketService } from 'src/features/dashboard-module/ticketing/ticket.service';

@Component({
  selector: 'swp-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  @Input() selectedFiles: NzUploadFile[] = [];
  @Output() filesUploaded = new EventEmitter<NzUploadFile[]>();
  imageList: string[] = [];
  destroy$ = new Subject();

  constructor(
    private ticketService: TicketService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.selectedFiles.length) {
      this.filesUploaded.emit(this.selectedFiles);
    }
  }

  customReq = (item: NzUploadXHRArgs) => {
    return this.ticketService.uploadMedia(item).pipe(takeUntil(this.destroy$)).subscribe();
  };

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    this.selectedFiles = fileList;
    if (status === 'done') {
      // this.imageList = [];
      // fileList.forEach(file => this.imageList.push(file.response.Location));
      this.filesUploaded.emit(this.selectedFiles);
      this.messageService.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.messageService.error(`${file.name} file upload failed. File too large.`);
    }
  }

  handleImageRemove = (file: NzUploadFile) => {
    this.selectedFiles = this.selectedFiles.filter(item => file !== item);
    return true;
  }
}
