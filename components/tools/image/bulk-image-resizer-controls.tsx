"use client";

import { ImageFormatSelector } from "@/components/tools/image/image-format-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RASTER_IMAGE_FORMATS } from "@/lib/image/output-format";
import type { RasterImageFormat, ResizeValueMode } from "@/types/image";

type BulkImageResizerControlsProps = {
  width: number;
  height: number;
  percentage: number;
  resizeValueMode: ResizeValueMode;
  keepAspectRatio: boolean;
  noUpscale: boolean;
  outputFormat: RasterImageFormat;
  helperText?: string | null;
  progressLabel?: string | null;
  isProcessing: boolean;
  hasFiles: boolean;
  hasResults: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onPercentageChange: (value: number) => void;
  onResizeValueModeChange: (value: ResizeValueMode) => void;
  onKeepAspectRatioChange: (value: boolean) => void;
  onNoUpscaleChange: (value: boolean) => void;
  onOutputFormatChange: (value: RasterImageFormat) => void;
  onProcess: () => void;
  onDownloadAll: () => void;
  onReset: () => void;
};

export function BulkImageResizerControls({
  width,
  height,
  percentage,
  resizeValueMode,
  keepAspectRatio,
  noUpscale,
  outputFormat,
  helperText,
  progressLabel,
  isProcessing,
  hasFiles,
  hasResults,
  onWidthChange,
  onHeightChange,
  onPercentageChange,
  onResizeValueModeChange,
  onKeepAspectRatioChange,
  onNoUpscaleChange,
  onOutputFormatChange,
  onProcess,
  onDownloadAll,
  onReset,
}: BulkImageResizerControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Resize by</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { value: "dimensions" as const, label: "Width / height", description: "Apply exact pixel dimensions to every file." },
            { value: "percentage" as const, label: "Percentage", description: "Scale every file relative to its original size." },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onResizeValueModeChange(option.value)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                resizeValueMode === option.value
                  ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-white"
              }`}
            >
              <p className="font-semibold text-[var(--color-foreground)]">{option.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {resizeValueMode === "dimensions" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Width (px)
            <Input type="number" min={1} value={width || ""} onChange={(event) => onWidthChange(Number(event.target.value))} />
          </label>
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Height (px)
            <Input type="number" min={1} value={height || ""} onChange={(event) => onHeightChange(Number(event.target.value))} />
          </label>
        </div>
      ) : (
        <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
          Percentage
          <Input type="number" min={1} max={1000} value={percentage || ""} onChange={(event) => onPercentageChange(Number(event.target.value))} />
        </label>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-foreground)]">
          <input type="checkbox" checked={keepAspectRatio} onChange={(event) => onKeepAspectRatioChange(event.target.checked)} className="h-4 w-4 accent-[var(--color-accent)]" />
          <span className="font-medium">Keep aspect ratio</span>
        </label>
        <label className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-foreground)]">
          <input type="checkbox" checked={noUpscale} onChange={(event) => onNoUpscaleChange(event.target.checked)} className="h-4 w-4 accent-[var(--color-accent)]" />
          <span className="font-medium">Do not upscale</span>
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Output format</p>
        <ImageFormatSelector
          value={outputFormat}
          onChange={(value) => onOutputFormatChange(value as RasterImageFormat)}
          formats={RASTER_IMAGE_FORMATS}
          descriptions={{
            "image/png": "Lossless raster output.",
            "image/jpeg": "Widely supported JPG / JPEG output.",
            "image/webp": "Smaller modern raster output.",
          }}
        />
      </div>

      {helperText ? (
        <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      ) : null}

      {progressLabel ? (
        <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-foreground)]">
          {progressLabel}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasFiles || isProcessing}>
          {isProcessing ? "Processing..." : "Resize all images"}
        </Button>
        <Button variant="secondary" onClick={onDownloadAll} disabled={!hasResults}>
          Download all successful files
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
