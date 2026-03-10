"use client";

import { Button } from "@/components/ui/button";

export function PdfActions({
  isProcessing,
  hasFiles,
  hasOutput,
  processLabel,
  downloadLabel,
  onProcess,
  onDownload,
  onReset,
}: {
  isProcessing: boolean;
  hasFiles: boolean;
  hasOutput: boolean;
  processLabel: string;
  downloadLabel: string;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={onProcess} disabled={!hasFiles || isProcessing}>
        {isProcessing ? "Processing..." : processLabel}
      </Button>
      <Button variant="secondary" onClick={onDownload} disabled={!hasOutput}>
        {downloadLabel}
      </Button>
      <Button variant="ghost" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
