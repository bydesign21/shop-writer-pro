import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { BehaviorSubject, map, Subject, take, takeUntil, tap } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { AuthService } from 'src/features/auth-module/auth-service.service';
import { Breadcrumb } from 'src/features/shared-module/breadcrumb/breadcrumb.component';
@Component({
  selector: 'swp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('nameEl') nameElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('companyNameEl')
  companyNameElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('phoneNumberEl') phoneElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('emailEl') emailElement: ElementRef<HTMLParagraphElement>;
  @ViewChild('addressEl') addressElement: ElementRef<HTMLParagraphElement>;
  editing = false;
  loading$ = new BehaviorSubject<boolean>(true);
  isTextTruncated = false;
  userForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  user: SessionState;
  breadcrumbs: Breadcrumb[] = [
    {
      label: 'Dashboard',
      url: '/dashboard',
    },
    {
      label: 'Profile',
    },
  ];

  destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private sessionQuery: SessionQuery,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.loading$.next(true);
    this.sessionQuery.allState$
      .pipe(
        takeUntil(this.destroy$),
        map((session) => {
          this.user = session;
          this.initForm();
        }),
      )
      .subscribe();
    this.loading$.next(false);
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone_number: [this.user.phone_number, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      'custom:companyName': [this.user['custom:companyName'], null],
      'custom:avatarUrl': [this.user['custom:avatarUrl'], null],
    });
    this.userForm.get('email').disable();
    this.userForm.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  saveUserDetails(params: any): void {
    this.authService
      .handleUpdateProfile({ ...params })
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        tap((_) => {
          this.editing = false;
          this.fileList = [];
          this.messageService.success('Profile updated successfully');
          this.cd.detectChanges();
        }),
      )
      .subscribe();
  }

  handleAddressChange(address: any): void {
    this.userForm.patchValue({
      address: address.formatted_address,
    });
  }
}
