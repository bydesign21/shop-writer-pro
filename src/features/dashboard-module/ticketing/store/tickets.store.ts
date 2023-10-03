import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Ticket } from './ticket.model';

export type TicketState = EntityState<Ticket, string>;
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tickets', idKey: 'ticketId' })
export class TicketStore extends EntityStore<TicketState> {
  constructor() {
    super();
  }
}
