import { useState } from 'react';
import { TICKET_STATUSES, type Ticket, type TicketStatus } from '../types/ticket';
import { STATUS_LABELS, PRIORITY_COLORS } from '../utils/labels';

interface TicketRowProps {
    ticket: Ticket;
    onStatusChange: (
        id: number,
        status: TicketStatus
    ) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export function TicketRow({
    ticket,
    onStatusChange,
    onDelete,
}: TicketRowProps) {
    const [isBusy, setIsBusy] = useState(false);
    const [rowError, setRowError] = useState<string | null>(null);

    async function handleStatusChange(
        newStatus: TicketStatus
    ): Promise<void> {
        setIsBusy(true);
        setRowError(null);

        try {
            await onStatusChange(ticket.id, newStatus);
        } catch (error) {
            setRowError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update ticket status.'
            );
        } finally {
            setIsBusy(false);
        }
    }

    async function handleDelete(): Promise<void> {
        if (!window.confirm('Delete this ticket?')) {
            return;
        }

        setIsBusy(true);
        setRowError(null);

        try {
            await onDelete(ticket.id);
        } catch (error) {
            setRowError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete ticket.'
            );

            setIsBusy(false);
        }
    }

    return (
        <tr
            className={`border-b border-gray-200 ${isBusy ? 'opacity-50' : ''
                }`}
        >
            <td className="p-3">
                <div className="font-medium">{ticket.title}</div>
                <div className="text-sm text-gray-500">
                    {ticket.description}
                </div>
            </td>

            <td className="p-3">
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[ticket.priority]
                        }`}
                >{ticket.priority}</span>
            </td>

            <td className="p-3">
                <select
                    value={ticket.status}
                    onChange={e =>
                        handleStatusChange(e.target.value as TicketStatus)
                    }
                    disabled={isBusy}
                    aria-label={`Status of ${ticket.title}`}
                    className="field-sizing-content rounded-lg border-transparent bg-transparent px-2 py-2 focus:outline-none hover:text-gray-500"                >
                    {TICKET_STATUSES.map(option => (
                        <option key={option} value={option}>
                            {STATUS_LABELS[option]}
                        </option>
                    ))}
                </select>
            </td>

            <td className="p-3">
                {new Date(ticket.createdAt).toLocaleString()}
            </td>

            <td className="p-3">
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isBusy}
                    className="rounded border-none px-3 py-2 text-red-600 hover:text-red-700 focus:outline-none"
                >
                    Delete
                </button>

                {rowError && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                        {rowError}
                    </p>
                )}
            </td>
        </tr>
    );
}