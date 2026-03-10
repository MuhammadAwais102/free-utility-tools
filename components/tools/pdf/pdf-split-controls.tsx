"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SplitMode = "all" | "range";

type PdfSplitControlsProps = {
  totalPages: number | null;
  splitMode: SplitMode;
  rangeValue: string;
  isProcessing: boolean;
  hasFile: boolean;
  hasOutput: boolean;
  onSplitModeChange: (value: SplitMode) => void;
  onRangeValueChange: (value: string) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function PdfSplitControls({
  totalPages,
  splitMode,
  rangeValue,
  isProcessing,
  hasFile,
  hasOutput,
  onSplitModeChange,
  onRangeValueChange,
  onProcess,
  onDownload,
  onReset,
}: PdfSplitControlsProps) {
  return (
    <div className="space-y-6">
      {totalPages ? (
        <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-4">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Total pages
          </p>
          <p className="mt-2 text-2xl font-bold text-[var(--color-foreground)]">{totalPages}</p>
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => onSplitModeChange("all")}
          className={`rounded-2xl border px-4 py-4 text-left transition ${
            splitMode === "all"
              ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
              : "border-[var(--color-border)] bg-white"
          }`}
        >
          <p className="font-semibold text-[var(--color-foreground)]">Extract all pages</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
            Create one separate PDF for every page in the uploaded file.
          </p>
        </button>
        <button
          type="button"
          onClick={() => onSplitModeChange("range")}
          className={`rounded-2xl border px-4 py-4 text-left transition ${
            splitMode === "range"
              ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
              : "border-[var(--color-border)] bg-white"
          }`}
        >
          <p className="font-semibold text-[var(--color-foreground)]">Extract custom range</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
            Choose specific pages like 1-3, 5, 7-9 and export only those pages.
          </p>
        </button>
      </div>

      {splitMode === "range" ? (
        <label className="block space-y-2 text-sm font-medium text-[var(--color-foreground)]">
          Page range
          <Input
            value={rangeValue}
            onChange={(event) => onRangeValueChange(event.target.value)}
            placeholder="Example: 1-3, 5, 7-9"
          />
        </label>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasFile || isProcessing}>
          {isProcessing ? "Splitting..." : "Split PDF"}
        </Button>
        <Button variant="secondary" onClick={onDownload} disabled={!hasOutput}>
          Download results
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
