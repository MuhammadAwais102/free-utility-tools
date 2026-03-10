import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CvSectionCard({
  title,
  description,
  actionLabel,
  onAction,
  children,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
}) {
  return (
    <Card className="space-y-5 bg-white/95">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2.5">
          <h2 className="text-xl font-black tracking-tight text-[var(--color-foreground)]">
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)]">
            {description}
          </p>
        </div>
        {actionLabel && onAction ? (
          <Button variant="secondary" onClick={onAction} className="sm:shrink-0">
            {actionLabel}
          </Button>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}
