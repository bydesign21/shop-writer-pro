export interface Ticket {
  plan: string;
  totalUSD: number;
  description: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  mileage: number;
  images: string[];
  status: string;
  date: string;
  entryId: string;
  userId: string;
  ticketId: string;
  lastUpdated: string;
  insurance: string;
  documents: string[];
  assignedTo: string;
  ticket?: Ticket;
}
