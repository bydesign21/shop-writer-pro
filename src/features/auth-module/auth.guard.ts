import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loggedInUser$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['../dashboard/home']);
          return false;
        } else {
          return true;
        }
      }),
    );
  }
}
