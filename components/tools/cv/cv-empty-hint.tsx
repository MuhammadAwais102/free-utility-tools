export function CvEmptyHint({
  title,
  description,
  actionLabel,
}: {
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(244,249,252,0.95),rgba(255,255,255,0.98))] px-5 py-9 text-center sm:px-6">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">
        {description}
      </p>
      {actionLabel ? (
        <p className="mt-4 text-sm font-semibold text-[var(--color-foreground)]">{actionLabel}</p>
      ) : null}
    </div>
  );
}
