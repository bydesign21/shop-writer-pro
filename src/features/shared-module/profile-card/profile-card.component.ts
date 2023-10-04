import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { takeUntil, Subject } from 'rxjs';
import { TicketService } from 'src/features/dashboard-module/ticketing/ticket.service';
@Component({
  selector: 'swp-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('nameEl') nameElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('companyNameEl')
  companyNameElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('phoneNumberEl') phoneElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('emailEl') emailElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('addressEl') addressElement: ElementRef<HTMLParagraphElement>;
  @Input() user: any;
  @Input() loading$: Subject<boolean>;
  @Output() userUpdated = new EventEmitter<any>();
  editing = false;
  isTextTruncated = false;
  fileList = [];
  userForm;
  destroy$ = new Subject();

  constructor(
    private messageService: NzMessageService,
    private cd: ChangeDetectorRef,
    private ticketService: TicketService,
    private fb: FormBuilder,
  ) { }

  @HostListener('window:resize')
  onResize() {
    setTimeout(() => {
      this.setActiveTooltips();
    });
  }

  ngAfterViewInit() {
    this.setActiveTooltips();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      'custom:companyName': [null],
      'custom:avatarUrl': [null]
    });

    this.userForm.get('email').disable();
  }

  private updateFormValues(user: any): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      'custom:companyName': user['custom:companyName'],
      'custom:avatarUrl': user['custom:avatarUrl']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    this.updateFormValues(this.user);
    if (!this.editing) {
      this.fileList = [];
      this.userForm.markAsUntouched();
      this.cd.detectChanges();
    }
  }

  saveUserDetails(): void {
    if (this.userForm.invalid) {
      return;
    }

    const payload = this.preparePayload();
    this.userUpdated.next(payload);
    this.editing = false;
    this.fileList = [];
    this.user = { ...payload, email: this.user.email };
  }

  private preparePayload() {
    return {
      ...this.userForm.value,
      'custom:avatarUrl': this.userForm.get('custom:avatarUrl').value || this.user['custom:avatarUrl'] || ''
    };
  }

  handleAddressChange(address: any): void {
    this.userForm.patchValue({
      address: address.formatted_address,
    });
  }

  handleChange({ file }: NzUploadChangeParam): void {
    const status = file.status;
    if (status === 'done') {
      this.userForm.get('custom:avatarUrl').patchValue(file.response.Location);
      this.cd.detectChanges();
    } else if (status === 'error') {
      this.messageService.error(
        'There Was An Error Uploading Your Profile Picture',
      );
    }
  }

  handleFileListChange($event: NzUploadFile[]) {
    this.fileList = $event;
    const uploadEl = document.getElementsByClassName(
      'ant-upload-select',
    )[0] as HTMLElement;
    uploadEl.hidden = !uploadEl.hidden;
  }

  public customReq = (item: NzUploadXHRArgs) => {
    return this.ticketService
      .uploadMedia(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  };

  setActiveTooltips() {
    const elementArr: HTMLParagraphElement[] = [
      this.nameElement?.nativeElement,
      this.emailElement?.nativeElement,
      this.phoneElement?.nativeElement,
      this.companyNameElement?.nativeElement,
      this.addressElement?.nativeElement,
    ];
    this.isTextTruncated = elementArr.some((el) => {
      return el?.offsetWidth < el?.scrollWidth;
    });
    this.cd.detectChanges();
  }
}
