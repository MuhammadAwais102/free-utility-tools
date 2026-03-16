import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl rounded-[32px] border border-[var(--color-border)] bg-white/95 p-8 text-center shadow-[var(--shadow-card)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--color-foreground)]">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-muted-foreground)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/#tools"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
          >
            Browse all tools
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
