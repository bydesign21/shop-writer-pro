import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Ticket } from './ticket.model';

export interface TicketState extends EntityState<Ticket, string> { }

@StoreConfig({ name: 'tickets', idKey: 'ticketId' })
export class TicketStore extends EntityStore<TicketState> {
  constructor() {
    super() ;
  }
}