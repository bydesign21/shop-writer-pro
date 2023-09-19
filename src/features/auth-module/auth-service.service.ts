import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { SessionService } from 'src/app/session-store/domain-state/session.service';
import awsmobile from 'src/aws-exports';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public get loggedInUser$(): Observable<any> {
    if (!Auth) {
      this.sessionService.endSession();
      return of(false);
    }
    return from(
      Auth
        .currentAuthenticatedUser()
        .then(res => {
          console.log(res)
          return res
        })
        .catch(e => {
          console.log(e)
          this.sessionService.endSession();
          return false
        })
    ).pipe(catchError(_ => {
      console.log(_)
      return of(false);
    }));
  }

  // public get currentSession$(): Observable<any> {
  //   return this.loggedInUser$.pipe(
  //     switchMap(user => iif(() => Boolean(user), from(Auth.currentSession()), of(false))),
  //     catchError(_ => of(false))
  //   );
  // }

  constructor(
    private sessionService: SessionService
  ) {
    Auth.configure(awsmobile);
  }

  public handleSignUp(params: {
    email: string,
    password: string,
    attributes: { email: string, phone_number: string, address: string, name: string, "custom:companyName": string, "custom:role": string }
  }) {
    let { email } = params;
    const { password, attributes } = params;
    email = email.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return from(Auth.signUp({
      username: email,
      password,
      attributes
    }));
  }

  public handleSignOut() {
    return from(Auth.signOut()).pipe(tap(_ => {
      this.sessionService.endSession();
    }
    ));
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
      return result.getIdToken().payload['cognito:username'];
    } catch (error) {
      // Session has expired, log the user out
      this.handleSignOut();
      return null;
    }
  }

  public handleUpdateProfile(params: any): Observable<any> {
    const user = from(Auth.currentAuthenticatedUser());
    return user.pipe(switchMap(user => {
      return from(Auth.updateUserAttributes(user, {
        ...params
      })).pipe(map(res => {
        this.sessionService.updateSession({ ...params });
        return res;
      },
        catchError(err => {
          return of(err);
        })));
    }));
  }

  public async getCurrentUserCognitoKey() {
    try {
      return await Auth?.currentAuthenticatedUser()?.then(creds => {
        return creds?.signInUserSession?.idToken?.jwtToken || null;
      });
    } catch (error) {
      console.log('Failed to get User Cognito Key', error)
      return null;
    }
  }
}
