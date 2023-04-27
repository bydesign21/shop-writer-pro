import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private messageService: NzMessageService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.authService.handleSignOut();
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
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const {
      email,
      phoneNumber,
      address,
      name,
      password,
      passwordConfirm
    } = this.form.getRawValue();
    //TODO Form Validation before sign up
    if (password === passwordConfirm) {
      this.authService.handleSignUp({
        email,
        password,
        attributes: {
          email,
          phone_number: phoneNumber,
          address,
          name
        }
      })
        .pipe(
          take(1),
          takeUntil(this.destroy$)
        )
        .subscribe(signUpRes => {
          this.messageService.success(`A code has been sent to ${signUpRes?.user['username']}`);
          this.router.navigate(['auth/login/confirm-account'], { queryParams: { userId: signUpRes.user['username'] } });
        },
          err => {
            this.messageService.error(err.message)
            // this.handleErrorResponse(err.code);
          })
    }
  }

  // handleErrorResponse(errorCode: string) {
  //   if (!errorCode) {
  //     //TODO write logic to handle userUnauthExcep
  //   }

  //   switch (errorCode) {
  //     case 'AuthError':
  //       // this.handleAuthError();
  //       break;
  //     case 'UserNotFoundException':
  //       // this.handleUserNotFoundError();
  //       this.form.setErrors({})
  //       break;
  //     case 'InvalidParameterException':
  //       console.log(errorCode);
  //       break;
  //     case 'UserNotConfirmedException':
  //       // this.handleUserNotConfirmedError();
  //       break;
  //     default:
  //       // this.handleLoginFail();
  //       break;
  //   }
  // }
}
