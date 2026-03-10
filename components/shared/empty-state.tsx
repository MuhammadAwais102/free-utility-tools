export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(238,247,247,0.75),rgba(255,255,255,0.9))] px-6 py-12 text-center sm:px-8">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg text-[var(--color-accent)] shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
        •
      </div>
      <h3 className="text-lg font-bold text-[var(--color-foreground)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">{description}</p>
    </div>
  );
}
