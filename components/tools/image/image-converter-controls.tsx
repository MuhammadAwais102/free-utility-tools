"use client";

import { Button } from "@/components/ui/button";
import type { ImageFormat } from "@/types/image";

const outputOptions: Array<{ label: string; value: ImageFormat }> = [
  { label: "JPG", value: "image/jpeg" },
  { label: "PNG", value: "image/png" },
  { label: "WebP", value: "image/webp" },
];

type ImageConverterControlsProps = {
  outputType: ImageFormat;
  isProcessing: boolean;
  hasImage: boolean;
  hasResult: boolean;
  onOutputTypeChange: (value: ImageFormat) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function ImageConverterControls({
  outputType,
  isProcessing,
  hasImage,
  hasResult,
  onOutputTypeChange,
  onProcess,
  onDownload,
  onReset,
}: ImageConverterControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Output format</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {outputOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onOutputTypeChange(option.value)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                outputType === option.value
                  ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-white"
              }`}
            >
              <p className="font-semibold text-[var(--color-foreground)]">{option.label}</p>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                Convert the uploaded image into {option.label}.
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasImage || isProcessing}>
          {isProcessing ? "Converting..." : "Convert image"}
        </Button>
        <Button variant="secondary" onClick={onDownload} disabled={!hasResult}>
          Download converted image
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
