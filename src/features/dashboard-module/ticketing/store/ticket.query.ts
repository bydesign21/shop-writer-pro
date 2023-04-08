import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TicketStore, TicketState } from './tickets.store';
import { Ticket } from './ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketQuery extends QueryEntity<TicketState, Ticket> {
  constructor(protected override store: TicketStore) {
    super(store);
  }
}
