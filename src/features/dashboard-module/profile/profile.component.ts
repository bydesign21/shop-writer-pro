import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { from, map, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { AuthService } from 'src/features/auth-module/auth-service.service';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('nameEl') nameElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('companyNameEl') companyNameElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('phoneNumberEl') phoneElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('emailEl') emailElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('addressEl') addressElement: ElementRef<HTMLParagraphElement>;
  editing = false;
  loading = false;
  isTextTruncated = false;
  userForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  user: SessionState;

  destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private sessionQuery: SessionQuery,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private messageService: NzMessageService,
    private ticketService: TicketService,
    private router: Router
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
    this.sessionQuery.allState$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.user = {
        ...res,
        name: res.name,
        email: res.email,
        phone_number: res.phone_number,
        address: res.address,
        'custom:avatarUrl': res['custom:avatarUrl'],
        'custom:companyName': res['custom:companyName']
      }
    });
    console.log(this.user, 'User init')
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone_number: [this.user.phone_number, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      'custom:companyName': [this.user['custom:companyName'], null],
      'custom:avatarUrl': [this.user['custom:avatarUrl'], null]
    });
    this.userForm.get('email').disable();
    this.userForm.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing) {
      this.fileList = [];
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone_number: this.user.phone_number,
        address: this.user.address,
        'custom:companyName': this.user['custom:companyName'],
        'custom:avatarUrl': this.user['custom:avatarUrl']
      });
      this.userForm.markAsUntouched();
      this.cd.detectChanges();
    }
  }

  saveUserDetails(): void {
    // const oldUsername = this.user.email;
    // const newUsername = this.userForm.get('email').value;
    this.authService.handleUpdateProfile({ ...this.userForm.value })
      .pipe(
        take(1),
        tap(_ => {
          this.editing = false;
          this.fileList = [];
          this.messageService.success('Profile updated successfully');
          this.cd.detectChanges();
          console.log('success callback executed')
        }),
        // switchMap(_ => {
        //   return from(this.ticketService.updateUserRecordEntryId(oldUsername, newUsername)).pipe(
        //     map(res => {
        //       this.router.navigate(['../auth/login/confirm-account'], { queryParams: { userId: oldUsername } })
        //     },
        //     err => {
        //       console.log(err)
        //     })
        //   )
        // })
      ).subscribe(res => console.log(res))
  }

  handleAddressChange(address: any): void {
    this.userForm.patchValue({
      address: address.formatted_address
    });
  }

  handleChange({ file }: NzUploadChangeParam): void {
    const status = file.status;
    console.log('file', file)
    if (status === 'done') {
      this.userForm.get('custom:avatarUrl').patchValue(file.response.Location);
      this.cd.detectChanges();
    } else if (status === 'error') {
      this.messageService.error('There Was An Error Uploading Your Profile Picture')
    }
  }

  handleFileListChange($event: NzUploadFile[]) {
    this.fileList = $event;
    const uploadEl = document.getElementsByClassName('ant-upload-select')[0] as HTMLElement;
    uploadEl.hidden = !uploadEl.hidden;
  }

  public customReq = (item: NzUploadXHRArgs) => {
    return this.ticketService.uploadPhotos(item).pipe(takeUntil(this.destroy$))
      .subscribe();
  };


  setActiveTooltips() {
    const elementArr: HTMLParagraphElement[] = [
      this.nameElement?.nativeElement,
      this.emailElement?.nativeElement,
      this.phoneElement?.nativeElement,
      this.companyNameElement?.nativeElement,
      this.addressElement?.nativeElement
    ];
    this.isTextTruncated = elementArr.some(el => {
      console.log(el?.offsetWidth, el?.scrollWidth);
      return el?.offsetWidth < el?.scrollWidth;
    });
    this.cd.detectChanges();
    console.log('isTextTruncated', this.isTextTruncated)
  }
}
