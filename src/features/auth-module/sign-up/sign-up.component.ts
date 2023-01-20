import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { map, Subject, take, takeUntil } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

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
    private authService: AuthServiceService
  ) {

  }
  ngOnInit(): void {
    this.initForm();
    this.authService.handleSignOut();
    this.authService.loggedInUser$.subscribe(res => console.log(res))
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
        attributes: { email, phoneNumber, address, name }
      })
        .pipe(
          take(1),
          takeUntil(this.destroy$)
        )
        .subscribe(res => console.log(res))
    }
  }
}
