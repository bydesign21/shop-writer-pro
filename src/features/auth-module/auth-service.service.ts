import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { catchError, from, iif, map, Observable, of, switchMap } from 'rxjs';
import awsmobile from 'src/aws-exports';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState = AuthState.SignUp;

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

  public handleSignUp(formData: {
    email: string,
    password: string,
    attributes: { email: string, phoneNumber: string, address: string, name: string }
  }) {
    let { email, password, attributes } = formData;
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

  public handleLogIn(formData: { username: string, password: string }) {
    const { username, password } = formData;
    return from(Auth.signIn({
      username,
      password
    })).pipe(map(res => res));
  }

  ngOnInit() {

  }
}
