import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { Ticket } from './ticket.model';
import { TicketStore, TicketState } from './tickets.store';

@Injectable({ providedIn: 'root' })
export class TicketQuery extends QueryEntity<TicketState, Ticket> {
  constructor(protected override store: TicketStore) {
    super(store);
  }
}
