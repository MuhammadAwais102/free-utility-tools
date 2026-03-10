export function ErrorMessage({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      <p className="font-semibold">Something needs attention</p>
      <p className="mt-1 leading-6">{message}</p>
    </div>
  );
}
