import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export interface SessionState {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  address: string;
  isAuthenticated: boolean;
  'custom:avatarUrl': string;
  'custom:companyName': string;

}

export function createInitialState(): SessionState {
  return {
    id: '',
    name: '',
    email: '',
    phone_number: '',
    emailVerified: false,
    phoneVerified: false,
    address: '',
    isAuthenticated: false,
    'custom:avatarUrl': '',
    'custom:companyName': ''
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  endSession(): void {
    this.startSession();
    setTimeout(() => localStorage.removeItem('AkitaStores'), 50)
  }

  startSession(): void {
    this.update(createInitialState());
  }

  updateSession(session: SessionState): void {
    this.update((state) => {
      return { ...state, ...session };
    });
  }
}
