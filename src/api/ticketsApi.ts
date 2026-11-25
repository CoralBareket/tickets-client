import type {
    Ticket,
    TicketStatus,
    CreateTicketRequest,
    UpdateStatusRequest,
} from '../types/ticket';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    let response: Response;

    try {
        response = await fetch(`${BASE_URL}${path}`, options);
    } catch (error) {
        throw new Error(
            "Can't reach the server. Please check that the API is running and try again."
        );
    }

    if (!response.ok) {
        let message = 'Something went wrong. Please try again.';

        if (response.status === 400) {
            message = 'Invalid request. Please check your input.';

            try {
                const problem = await response.json();

                if (problem.errors) {
                    message = Object.values(problem.errors)
                        .flat()
                        .join(' ');
                }
            } catch { }
        } else if (response.status === 404) {
            message = 'This ticket no longer exists.';
        } else if (response.status >= 500) {
            message =
                'Something went wrong on the server. Please try again later.';
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export function getTickets(
    status?: TicketStatus
): Promise<Ticket[]> {
    const params = new URLSearchParams();

    if (status) {
        params.set('status', status);
    }

    const query = params.toString();

    const path = query
        ? `/api/tickets?${query}`
        : '/api/tickets';

    return request<Ticket[]>(path);
}

export function createTicket(
    data: CreateTicketRequest
): Promise<Ticket> {
    return request<Ticket>('/api/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export function updateTicketStatus(
    id: number,
    status: TicketStatus
): Promise<Ticket> {
    const data: UpdateStatusRequest = { status };

    return request<Ticket>(
        `/api/tickets/${id}/status`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
}

export function deleteTicket(
    id: number
): Promise<void> {
    return request<void>(`/api/tickets/${id}`, {
        method: 'DELETE',
    });
}