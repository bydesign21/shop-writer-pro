import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { takeUntil, take, tap, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/features/auth-module/auth-service.service';
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
  @Input() user$: BehaviorSubject<any>;
  @Input() loading$: Subject<boolean>;
  editing = false;
  isTextTruncated = false;
  fileList = [];
  userForm;
  destroy$ = new Subject();

  constructor(
    private authService: AuthService,
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
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.userForm = this.fb.group({
        name: [user?.name, [Validators.required]],
        email: [user?.email, [Validators.required, Validators.email]],
        phone_number: [user?.phone_number, [Validators.required]],
        address: [user?.address, [Validators.required]],
        'custom:companyName': [user['custom:companyName'], null],
        'custom:avatarUrl': [user['custom:avatarUrl'], null],
      });
      this.userForm.get('email').disable();
      this.userForm.markAsUntouched();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    const user = this.user$.getValue();
    console.log('user', user);
    if (!this.editing) {
      this.fileList = [];
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        'custom:companyName': user['custom:companyName'],
        'custom:avatarUrl': user['custom:avatarUrl'],
      });
      this.userForm.markAsUntouched();
      this.cd.detectChanges();
    }
  }

  saveUserDetails(): void {
    this.authService
      .handleUpdateProfile({ ...this.userForm.value, 'custom:avatarUrl': this.userForm.get('custom:avatarUrl').value || this.user$.getValue()['custom:avatarUrl'] })
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        tap((_) => {
          this.editing = false;
          this.fileList = [];
          this.messageService.success('Profile updated successfully');
          this.cd.detectChanges();
          console.log('success callback executed');
        }),
      )
      .subscribe((res) => console.log(res));
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
