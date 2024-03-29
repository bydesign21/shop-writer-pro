import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, take, takeUntil } from 'rxjs';

import { AuthService } from '../auth-service.service';

@Component({
  selector: 'swp-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  destroy$ = new Subject();
  isPasswordVisible = false;
  isPasswordConfirmVisible = false;

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
      address: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      company: new FormControl(null, null),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const isFormValid = this.form.valid;
    const {
      email,
      phoneNumber,
      address,
      name,
      company,
      password,
      passwordConfirm,
    } = this.form.getRawValue();
    //TODO Do Not HardCode Country Code
    const formattedPhoneNumber = '+1' + phoneNumber;
    //TODO Form Validation before sign up
    if (password === passwordConfirm && isFormValid) {
      this.authService
        .handleSignUp({
          email,
          password,
          attributes: {
            email,
            phone_number: formattedPhoneNumber,
            address,
            name,
            'custom:companyName': company,
            'custom:role': 'user',
          },
        })
        .pipe(take(1), takeUntil(this.destroy$))
        .subscribe(
          (signUpRes) => {
            this.messageService.success(
              `A code has been sent to ${signUpRes?.user['username']}`,
            );
            this.router.navigate(['auth/login/confirm-account'], {
              queryParams: { userId: signUpRes.user['username'] },
            });
          },
          (err) => {
            this.messageService.error(err.message);
            // this.handleErrorResponse(err.code);
          },
        );
    } else {
      this.messageService.error('Please fill all the required fields');
    }
  }

  handlePasswordViewClick(isConfirm = false) {
    if (isConfirm) {
      this.isPasswordConfirmVisible = !this.isPasswordConfirmVisible;
    } else {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
    this.cd.detectChanges();
  }

  handleTermsConditionsClicked() {
    this.modalService.create({
      nzTitle: 'Terms and Conditions',
      nzStyle: { top: '20px' },
      nzContent: `<p><em>Virtual Appraiser Corp. d/b/a Shop Writer Pro (hereafter “Shop Writer Pro”) provides virtual estimates to individuals and auto body repair shops for informational purposes only. These virtual estimates are based on visual video inspections of damage to motor vehicles conducted by automobile collision damage experts. The calculations are based on local labor and materials/parts pricing.</em></p>
      <p><em>The virtual estimate provided is limited to the visible damage and any damage that is concealed, not exposed to view, or inaccessible is not reflected in the virtual estimate. Therefore, the user must assume all risk for any concealed damage and accept the calculations provided in the virtual estimate as a guideline and resource for preparing a final estimate.</em></p>
      <p><strong>Accuracy and Reliability</strong></p>
      <p><em>Shop Writer Pro makes no warranty of any kind, express or implied, as to the accuracy, reliability, or completeness of the virtual estimate. The user is solely responsible for verifying the accuracy of the virtual estimate, including any calculations or conclusions contained therein, and for determining whether to rely on the virtual estimate. Shop Writer Pro is not responsible for any variations in pricing for labor and materials/parts due to region, vendor, supplier, repair shop, or installer.</em></p>
      <p><strong>Waiver and Release</strong></p>
      <p><em>The user hereby waives and releases Shop Writer Pro, its officers, directors, affiliates, employees, and agents from any and all liability, damage, or claims of every kind or nature, known or unknown, suspected or unsuspected, disclosed or undisclosed, that may arise from the virtual estimate or its use.</em></p>
      <p><strong>Limitation of Liability</strong></p>
      <p><em>If, notwithstanding the above provisions, there is any liability on the part of Shop Writer Pro, such liability is limited to the price charged for the virtual estimate. Such liability is liquidated damages and not a penalty. This liability is complete and exclusive.</em></p>
      <p><strong>Marketing Use</strong></p>
      <p><em>Shop Writer Pro reserves the right to use the user’s company name, project name, individual name, testimonial, estimate, documentation, PDFs, drawings, images, client logos, or any other information for marketing purposes unless a written agreement in the form of a Non-Disclosure Agreement has been executed between Shop Writer Pro and the User.</em></p>
      <p><strong>Agreement to Terms and Conditions</strong></p>
      <p><em>By using Shop Writer Pro's services, the user acknowledges that they have read and understood these terms and conditions, and agree to be bound by them.</em></p>`,
      nzWidth: 900,
      nzCancelDisabled: true,
    });
  }
}
