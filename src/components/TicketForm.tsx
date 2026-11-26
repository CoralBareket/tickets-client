import { useState, type FormEvent } from 'react';
import { TICKET_PRIORITIES, type TicketPriority, type CreateTicketRequest } from '../types/ticket';
import { ErrorMessage } from './ErrorMessage';

interface TicketFormProps {
    onCreate: (data: CreateTicketRequest) => Promise<void>;
}

export function TicketForm({ onCreate }: TicketFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TicketPriority>('Medium');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ): Promise<void> {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedDescription) {
            setFormError('Title and description are required.');
            return;
        }

        setIsSubmitting(true);
        setFormError(null);

        try {
            await onCreate({
                title: trimmedTitle,
                description: trimmedDescription,
                priority,
            });

            setTitle('');
            setDescription('');
            setPriority('Medium');
        } catch (error) {
            setFormError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create ticket.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 space-y-4 rounded-lg bg-white p-4 shadow"
        >
            <h2 className="text-xl font-semibold">Create a ticket</h2>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="title" className="mb-1 block font-medium">
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength={200}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="priority" className="mb-1 block font-medium">
                        Priority
                    </label>

                    <select
                        id="priority"
                        value={priority}
                        onChange={e => setPriority(e.target.value as TicketPriority)}
                        className="rounded border border-gray-300 bg-white px-3 py-2"
                    >
                        {TICKET_PRIORITIES.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="mb-1 block font-medium">
                    Description
                </label>

                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    maxLength={2000}
                    rows={3}
                    className="w-full rounded border border-gray-300 px-3 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? 'Creating...' : 'Create ticket'}
            </button>

            {formError && <ErrorMessage message={formError} />}
        </form>
    );
}