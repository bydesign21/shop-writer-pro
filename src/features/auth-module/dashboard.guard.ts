import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, map } from 'rxjs';

import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.loggedInUser$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['../home'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      }),
    );
  }
}
