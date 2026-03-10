import type { ReactNode } from "react";

export function CvField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-[var(--color-foreground)]">{label}</span>
        {hint ? (
          <span className="text-xs text-[var(--color-muted-foreground)]">{hint}</span>
        ) : null}
      </div>
      {children}
    </label>
  );
}
