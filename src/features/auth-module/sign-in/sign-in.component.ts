import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth-service.service';
import { SessionService } from 'src/app/session-store/domain-state/session.service';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { SpinnerService } from 'src/features/shared-module/spinner/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
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
    private activatedRoute: ActivatedRoute
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
    this.router.navigate(['confirm-account'], { queryParams: {userId: this.loggedUsername.trim().toLowerCase()}, relativeTo: this.activatedRoute });
  }

  handleLoginFail() {
    console.log('Login Failed IDK')
  }

  public mapLoginResToSession(loginRes: any): SessionState {
    console.log(loginRes)
    return {
      id: loginRes?.attributes?.sub,
      name: loginRes?.attributes?.name,
      email: loginRes?.attributes?.email,
      phone_number: loginRes?.attributes?.phone_number,
      emailVerified: loginRes?.attributes?.email_verified,
      phoneVerified: loginRes?.attributes?.phone_number_verified,
      address: loginRes?.attributes?.address,
      isAuthenticated: true,
      'custom:avatarUrl': loginRes.attributes['custom:avatarUrl'],
      'custom:companyName': loginRes.attributes['custom:companyName']
    }
  }
}
