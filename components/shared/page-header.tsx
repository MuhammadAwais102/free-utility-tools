import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      {eyebrow ? (
        <span className="inline-flex w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {eyebrow}
        </span>
      ) : null}
      <div className="flex flex-col gap-4 md:gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-foreground)] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-muted-foreground)] sm:text-lg">
            {description}
          </p>
        </div>
        {actions}
      </div>
    </div>
  );
}
