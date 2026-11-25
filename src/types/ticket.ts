export type TicketStatus = 'Open' | 'InProgress' | 'Closed';

export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateStatusRequest {
  status: TicketStatus;
}

export const TICKET_STATUSES: readonly TicketStatus[] = [
  'Open',
  'InProgress',
  'Closed',
];

export const TICKET_PRIORITIES: readonly TicketPriority[] = [
  'Low',
  'Medium',
  'High',
];