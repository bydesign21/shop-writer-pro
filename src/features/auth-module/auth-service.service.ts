import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { catchError, from, iif, map, Observable, of, switchMap } from 'rxjs';
import awsmobile from 'src/aws-exports';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get loggedInUser$(): Observable<any> {
    if (!Auth) {
      return of(false);
    }
    return from(
      Auth
        .currentAuthenticatedUser()
        .then(res => res)
        .catch(e => false)
    ).pipe(catchError(_ => of(false)));
  }

  public get currentSession$(): Observable<any> {
    return this.loggedInUser$.pipe(
      switchMap(user => iif(() => Boolean(user), from(Auth.currentSession()), of(false))),
      catchError(_ => of(false))
    );
  }

  constructor(
  ) {
    Auth.configure(awsmobile);
  }

  public handleSignUp(params: {
    email: string,
    password: string,
    attributes: { email: string, phone_number: string, address: string, name: string }
  }) {
    let { email, password, attributes } = params;
    email = email.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return from(Auth.signUp({
      username: email,
      password,
      attributes
    }));
  };

  public handleSignOut() {
    return from(Auth.signOut()).pipe(map(res => res));
  }

  public handleLogIn(params: { username: string, password: string }) {
    const { username, password } = params;
    return from(Auth.signIn({
      username,
      password
    }));
  }

  public handleConfimAccount(params: { username: string, code: string }) {
    const { username, code } = params;
    try {
      return from(Auth.confirmSignUp(username, code));
    } catch (error) {
      return null;
    }
  }

  public handleResendCode(username: string) {
    try {
      return from(Auth.resendSignUp(username));
    }
    catch {
      return null;
    }
  }

  public async checkSession() {
    try {
      const result = await Auth.currentSession();
      // Session is still valid, return the user
      console.log('result', result);
      return result.getIdToken().payload['cognito:username'];
    } catch (error) {
      // Session has expired, log the user out
      this.handleSignOut();
      return null;
    }
  }

  ngOnInit() {

  }
}
