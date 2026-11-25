import { useState, useEffect } from 'react';

import {
  getTickets,
  createTicket,
  updateTicketStatus,
  deleteTicket,
} from '../api/ticketsApi';

import type {
  Ticket,
  TicketStatus,
  CreateTicketRequest,
} from '../types/ticket';

export function useTickets(status?: TicketStatus) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTickets() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getTickets(status, controller.signal);

        if (!controller.signal.aborted) {
          setTickets(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Failed to load tickets.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTickets();

    return () => controller.abort();
  }, [status, reloadCounter]);

  function reload(): void {
    setReloadCounter(prev => prev + 1);
  }

  async function addTicket(
    data: CreateTicketRequest
  ): Promise<void> {
    const newTicket = await createTicket(data);

    if (!status || newTicket.status === status) {
      setTickets(prev => [newTicket, ...prev]);
    }
  }

  async function changeStatus(
    id: number,
    newStatus: TicketStatus
  ): Promise<void> {
    const updatedTicket = await updateTicketStatus(id, newStatus);

    setTickets(prev => {
      if (status && updatedTicket.status !== status) {
        return prev.filter(ticket => ticket.id !== id);
      }

      return prev.map(ticket =>
        ticket.id === id ? updatedTicket : ticket
      );
    });
  }

  async function removeTicket(id: number): Promise<void> {
    await deleteTicket(id);

    setTickets(prev =>
      prev.filter(ticket => ticket.id !== id)
    );
  }

  return {
    tickets,
    isLoading,
    error,
    reload,
    addTicket,
    changeStatus,
    removeTicket,
  };
}