import type { TicketPriority, TicketStatus } from '../types/ticket';

export const STATUS_LABELS: Record<TicketStatus, string> = {
    Open: 'Open',
    InProgress: 'In progress',
    Closed: 'Closed',
};

export const PRIORITY_COLORS: Record<TicketPriority, string> = {
  Low: 'bg-gray-100 text-gray-800',
  Medium: 'bg-amber-100 text-amber-800',
  High: 'bg-red-100 text-red-800',
};