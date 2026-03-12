"use client";

import { ErrorMessage } from "@/components/shared/error-message";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type DataToolClientShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  inputValue: string;
  outputValue: string;
  error: string | null;
  helperText?: string;
  actionLabel: string;
  isWorking?: boolean;
  copyLabel?: string;
  copied?: boolean;
  onInputChange: (value: string) => void;
  onAction: () => void;
  onCopy: () => void;
  onClear: () => void;
};

export function DataToolClientShell({
  eyebrow = "Data Tool",
  title,
  description,
  inputLabel,
  outputLabel,
  inputValue,
  outputValue,
  error,
  helperText,
  actionLabel,
  isWorking = false,
  copyLabel = "Copy output",
  copied = false,
  onInputChange,
  onAction,
  onCopy,
  onClear,
}: DataToolClientShellProps) {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <Card className="space-y-6">
        {helperText ? (
          <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
            {helperText}
          </p>
        ) : null}

        <ErrorMessage message={error} />

        <div className="grid gap-6 xl:grid-cols-2">
          <label className="space-y-3">
            <span className="text-sm font-semibold text-[var(--color-foreground)]">{inputLabel}</span>
            <Textarea
              value={inputValue}
              onChange={(event) => onInputChange(event.target.value)}
              className="min-h-80 font-mono text-sm"
              spellCheck={false}
            />
          </label>

          <label className="space-y-3">
            <span className="text-sm font-semibold text-[var(--color-foreground)]">{outputLabel}</span>
            <Textarea
              value={outputValue}
              readOnly
              className="min-h-80 font-mono text-sm"
              spellCheck={false}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={onAction}>{isWorking ? "Working..." : actionLabel}</Button>
          <Button variant="secondary" onClick={onCopy} disabled={!outputValue}>
            {copied ? "Copied" : copyLabel}
          </Button>
          <Button variant="ghost" onClick={onClear}>
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}
