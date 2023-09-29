import { Inject, Injectable, NgZone } from '@angular/core';
import { PersistState } from '@datorama/akita';

import { SessionStore, SessionState } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private sessionStore: SessionStore,
    @Inject('persistStorage') private persistStorage: PersistState,
  ) {}

  setSession(session: SessionState) {
    this.sessionStore.update((state) => {
      return { ...state, ...session };
    });
  }

  endSession(): void {
    this.sessionStore.endSession();
  }

  startSession() {
    this.sessionStore.startSession();
  }

  updateSession(session: SessionState) {
    this.sessionStore.updateSession(session);
  }
}
