import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';

@Injectable({
    providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {

    allState$ = this.select();
    isAuthenticated$ = this.select('isAuthenticated');
    emailVerified$ = this.select('emailVerified');
    name$ = this.select('name');
    email$ = this.select('email');

  constructor(protected sessionStore: SessionStore) {
    super(sessionStore);
  }
}
