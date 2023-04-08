import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { Subject, takeUntil } from 'rxjs';
import awsmobile from 'src/aws-exports';
import { AuthService } from 'src/features/auth-module/auth-service.service';

Amplify.configure(awsmobile);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
private destroy$ = new Subject();
  constructor(
    private authService: AuthService,
    private router: Router
     ) {}

  ngOnInit(): void {
    this.authService.loggedInUser$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      isLoggedIn => {
        this.router.navigate([isLoggedIn ? '/dashboard/home' : '/home'])
      },
      error => {
        console.log(error)
      },
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  title = 'ShopWriterPro';
}
