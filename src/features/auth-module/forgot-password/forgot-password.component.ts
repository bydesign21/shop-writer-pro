import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth-service.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'swp-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public isPasswordResetRequested = false;
  public emailForm: FormGroup = new FormGroup({});
  public resetForm: FormGroup = new FormGroup({});
  private destroy$ = new Subject();
  private userEmail: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: NzMessageService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initEmailForm();
  }

  private initEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private initResetForm() {
    this.resetForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  public onEmailFormSubmit() {
    if (this.emailForm.valid) {
      this.authService.handleForgotPassword(this.emailForm.value.email)
        .pipe(
          takeUntil(this.destroy$),
          take(1)
        )
        .subscribe({
          next: _ => {
            this.isPasswordResetRequested = true;
            this.messageService.success('Password reset email sent');
          },
          error: err => {
            this.messageService.error(err.message);
          },
          complete: () => {
            this.userEmail = this.emailForm.value.email;
            this.emailForm.reset();
            this.initResetForm();
          }
        });
    }
  }

  public onResetFormSubmit() {
    if (this.resetForm.valid) {
      const { code, password, confirmPassword } = this.resetForm.value;
      if (password !== confirmPassword) {
        this.messageService.error('Passwords do not match');
        return;
      }
      this.authService.forgotPasswordSubmit(this.userEmail, code, password)
        .pipe(
          takeUntil(this.destroy$),
          take(1)
        )
        .subscribe({
          next: _ => {
            this.messageService.success('Password reset successful');
            this.router.navigate(['/login']);
          },
          error: err => {
            this.messageService.error(err.message);
          },
          complete: () => {
            this.resetForm.reset();
          }
        });
    }
  }
}
