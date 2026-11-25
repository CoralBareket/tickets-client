interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="bg-red-50 text-red-700 border border-red-200 rounded p-4"
    >
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}