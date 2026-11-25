import type { TicketStatus } from '../types/ticket';

export const STATUS_LABELS: Record<TicketStatus, string> = {
  Open: 'Open',
  InProgress: 'In progress',
  Closed: 'Closed',
};