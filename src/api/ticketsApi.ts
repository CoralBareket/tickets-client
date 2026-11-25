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
        if (error instanceof Error && error.name === 'AbortError') {
            throw error;
        }

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

