"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type ImageCompressorControlsProps = {
  quality: number;
  isProcessing: boolean;
  hasImage: boolean;
  hasResult: boolean;
  onQualityChange: (value: number) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
  helperText?: string | null;
};

export function ImageCompressorControls({
  quality,
  isProcessing,
  hasImage,
  hasResult,
  onQualityChange,
  onProcess,
  onDownload,
  onReset,
  helperText,
}: ImageCompressorControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 text-sm font-medium text-[var(--color-foreground)]">
          <span>Compression quality</span>
          <span>{Math.round(quality * 100)}%</span>
        </div>
        <Slider value={quality * 100} min={10} max={100} onChange={(value) => onQualityChange(value / 100)} />
        <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
          Lower quality usually creates a smaller file, while higher quality keeps more image detail.
        </p>
        {helperText ? (
          <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
            {helperText}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasImage || isProcessing}>
          {isProcessing ? "Compressing..." : "Compress image"}
        </Button>
        <Button variant="secondary" onClick={onDownload} disabled={!hasResult}>
          Download compressed image
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
