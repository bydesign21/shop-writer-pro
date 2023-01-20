import { Inject, Injectable, NgZone } from '@angular/core';
import { SessionStore, SessionState } from './session.store';
import { PersistState } from '@datorama/akita';


@Injectable({
    providedIn: 'root'
  })

export class SessionService {
    constructor(
        private sessionStore: SessionStore,
        private zone: NgZone,
        @Inject('persistStorage') private persistStorage: PersistState
        ) { }

    setSession(session: SessionState) {
        this.sessionStore.update((state) => {
            return {...state, ...session};
        });
    }

    endSession() {
        this.sessionStore.endSession()
    }

    startSession() {
        this.sessionStore.startSession();
    }
}