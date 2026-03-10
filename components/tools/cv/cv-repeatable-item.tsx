import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function CvRepeatableItem({
  index,
  label,
  description,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: {
  index: number;
  label: string;
  description: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-[24px] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(244,249,252,0.95),rgba(255,255,255,0.98))] p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {label} {index + 1}
          </p>
          <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={onMoveUp} disabled={!canMoveUp}>
            Move up
          </Button>
          <Button variant="ghost" onClick={onMoveDown} disabled={!canMoveDown}>
            Move down
          </Button>
          <Button variant="secondary" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
