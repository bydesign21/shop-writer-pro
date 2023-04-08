import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest, Observable, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  userId: string;
  confirmForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.destroy$.next(false);
    this.activatedRoute.queryParams
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(params => {
        if (!params['userId']) {
          this.router.navigate(['auth/login'])
        } else {
          this.userId = params['userId']
        }
      });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initForm() {
    this.confirmForm = new FormGroup({
      code: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.authService.handleConfimAccount({ username: this.userId, code: this.confirmForm.get('code').value })
      .subscribe(_ => {
        this.messageService.success('Account successfully confirmed.');
        this.router.navigate(['auth/login']);
      },
        err => {
          this.messageService.error(err.message);
        }
      );
  }

  handleResendCode() {
    this.authService
      .handleResendCode(this.userId)
      .pipe(take(1))
      .subscribe(res => this.messageService.success('Code sent successfully', res));
  }
}
