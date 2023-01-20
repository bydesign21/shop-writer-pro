import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export interface SessionState {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    address: string;
    isAuthenticated: boolean
}

export function createInitialState(): SessionState {
    return {
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        emailVerified: false,
        phoneVerified: false,
        address: '',
        isAuthenticated: false
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

    endSession() {
        this.update(createInitialState());
        setTimeout(() => {
            localStorage.removeItem('AkitaStores');
        }, 250);
    }

    startSession() {
        this.update(createInitialState());
    }
}