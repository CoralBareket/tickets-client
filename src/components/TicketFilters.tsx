import { TICKET_STATUSES, type TicketStatus } from '../types/ticket';
import { STATUS_LABELS } from '../utils/labels';

interface TicketFiltersProps {
  status: TicketStatus | undefined;
  onStatusChange: (status: TicketStatus | undefined) => void;
  searchText: string;
  onSearchChange: (searchText: string) => void;
}

export function TicketFilters({
  status,
  onStatusChange,
  searchText,
  onSearchChange,
}: TicketFiltersProps) {
  return (
    <div className="mb-4 flex gap-4">
      <div>
        <label htmlFor="status-filter" className="sr-only">
          Status
        </label>

        <select
          id="status-filter"
          value={status ?? ''}
          onChange={e =>
            onStatusChange(
              e.target.value === ''
                ? undefined
                : (e.target.value as TicketStatus)
            )
          }
          className="rounded border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">All statuses</option>

          {TICKET_STATUSES.map(option => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title-search" className="sr-only">
          Search by title
        </label>

        <input
          id="title-search"
          type="search"
          value={searchText}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search by title..."
          className="w-full rounded border border-gray-300 bg-white px-3 py-2"
        />
      </div>
    </div>
  );
}