import { useTickets } from './hooks/useTickets';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { TicketTable } from './components/TicketTable';
import { useState } from 'react';
import type { TicketStatus } from './types/ticket';
import { TicketFilters } from './components/TicketFilters';

function App() {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | undefined>(undefined);
  const [searchText, setSearchText] = useState('');

  const { tickets, isLoading, error, reload } = useTickets(statusFilter);

  const term = searchText.trim().toLowerCase();

  const visibleTickets = term
    ? tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(term)
    )
    : tickets;

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={reload} />;
  } else if (tickets.length === 0) {
    content = (
      <p className="py-6 text-center text-gray-500">
        No tickets found
      </p>
    );
  } else if (visibleTickets.length === 0) {
    content = (
      <p className="py-6 text-center text-gray-500">
        No tickets match your search
      </p>
    );
  } else {
    content = <TicketTable tickets={visibleTickets} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Support Tickets
        </h1>

        <TicketFilters
          status={statusFilter}
          onStatusChange={setStatusFilter}
          searchText={searchText}
          onSearchChange={setSearchText}
        />

        <div className="rounded-lg bg-white p-4 shadow">
          {content}
        </div>
      </main>
    </div>
  );
}

export default App;