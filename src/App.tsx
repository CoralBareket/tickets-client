import { useTickets } from './hooks/useTickets';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { TicketTable } from './components/TicketTable';

function App() {
  const { tickets, isLoading, error, reload } = useTickets();

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
  } else {
    content = <TicketTable tickets={tickets} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Support Tickets
        </h1>

        <div className="rounded-lg bg-white p-4 shadow">
          {content}
        </div>
      </main>
    </div>
  );
}

export default App;