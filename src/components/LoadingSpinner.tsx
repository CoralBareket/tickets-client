export function LoadingSpinner() {
  return (
    <div role="status" className="flex items-center justify-center gap-3 p-6">
      <div className="h-6 w-6 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
      <span>Loading tickets...</span>
    </div>
  );
}