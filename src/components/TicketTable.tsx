import type { Ticket, TicketStatus } from '../types/ticket';
import { TicketRow } from './TicketRow';

interface TicketTableProps {
    tickets: Ticket[];
    onStatusChange: (
        id: number,
        status: TicketStatus
    ) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export function TicketTable({ tickets, onStatusChange, onDelete }: TicketTableProps) {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-gray-200">
                    <th scope="col" className="p-3">Title</th>
                    <th scope="col" className="p-3">Priority</th>
                    <th scope="col" className="p-3">Status</th>
                    <th scope="col" className="p-3">Created</th>
                    <th scope="col" className="p-3">Actions</th>
                </tr>
            </thead>

            <tbody>
                {tickets.map(ticket => (
                    <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}