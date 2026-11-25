import type { Ticket } from '../types/ticket';
import { STATUS_LABELS } from '../utils/labels';

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-200">
          <th scope="col" className="p-3">Title</th>
          <th scope="col" className="p-3">Priority</th>
          <th scope="col" className="p-3">Status</th>
          <th scope="col" className="p-3">Created</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map(ticket => (
          <tr
            key={ticket.id}
            className="border-b border-gray-200"
          >
            <td className="p-3">
              <div className="font-medium">{ticket.title}</div>
              <div className="text-sm text-gray-500">
                {ticket.description}
              </div>
            </td>

            <td className="p-3">{ticket.priority}</td>

            <td className="p-3">
              {STATUS_LABELS[ticket.status]}
            </td>

            <td className="p-3">
              {new Date(ticket.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}