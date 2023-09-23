import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth-service.service';
import { SessionService } from 'src/app/session-store/domain-state/session.service';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { SpinnerService } from 'src/features/shared-module/spinner/spinner.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'swp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  destroy$ = new Subject();
  loggedUsername: string;

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private router: Router,
    private session: SessionService,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.spinner.show();
    const { username, password, rememberMe } = this.form.getRawValue();
    this.loggedUsername = username;
    this.authService.handleLogIn({ username, password })
      .pipe(
        takeUntil(this.destroy$),
        take(1)
      )
      .subscribe(
        loginRes => {
          this.session.setSession(this.mapLoginResToSession(loginRes));
          this.messageService.success(`Welcome, ${loginRes?.attributes?.name}!`);
          this.cd.detectChanges();
        },
        error => {
          console.log(error)
          this.handleErrorResponse(error?.name);
          this.spinner.hide();
          this.messageService.error(error.message);
        },
        () => {
          this.router.navigate(['/dashboard']);
          this.spinner.hide();
        });

  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null)
    });
  }

  handleErrorResponse(errorCode: string) {
    if (!errorCode) {
      //TODO write logic to handle userUnauthExcep
    }

    switch (errorCode) {
      case 'AuthError':
        this.handleAuthError();
        break;
      case 'UserNotFoundException':
        this.handleUserNotFoundError();
        this.form.setErrors({})
        break;
      case 'NotAuthorizedException':
        this.handleNotAuthError();
        break;
      case 'UserNotConfirmedException':
        this.handleUserNotConfirmedError();
        break;
      default:
        this.handleLoginFail();
        break;
    }
  }

  //TODO Write logic to handle various login errors
  handleAuthError() {
    console.log('authError')
  }

  handleUserNotFoundError() {
    console.log('userNotFound')
  }

  handleNotAuthError() {
    console.log('notAuth')
  }

  handleUserNotConfirmedError() {
    this.router.navigate(['confirm-account'], { queryParams: { userId: this.loggedUsername.trim().toLowerCase() }, relativeTo: this.activatedRoute });
  }

  handleForgotPassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.activatedRoute });
  }

  handleLoginFail() {
    console.log('Login Failed IDK')
  }

  public mapLoginResToSession(loginRes: any): SessionState {
    return {
      id: loginRes?.attributes?.sub,
      name: loginRes?.attributes?.name,
      email: loginRes?.attributes?.email,
      phone_number: loginRes?.attributes?.phone_number,
      emailVerified: loginRes?.attributes?.email_verified,
      phoneVerified: loginRes?.attributes?.phone_number_verified,
      address: loginRes?.attributes?.address,
      isAuthenticated: true,
      'custom:avatarUrl': loginRes?.attributes['custom:avatarUrl'],
      'custom:companyName': loginRes?.attributes['custom:companyName'],
      role: loginRes?.attributes['custom:role']
    }
  }

  handleTermsConditionsClicked() {
    this.modalService.create({
      nzTitle: 'Terms and Conditions',
      nzStyle: {top: '20px'},
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
      nzCancelDisabled: true
    })
  }
}
