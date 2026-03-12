"use client";

import { ImageFormatSelector } from "@/components/tools/image/image-format-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ImageOutputFormat, ResizeMode, ResizeValueMode } from "@/types/image";

const resizeModes: Array<{ value: ResizeMode; label: string; description: string }> = [
  {
    value: "contain",
    label: "Contain",
    description: "Fits the image inside the target size without cropping.",
  },
  {
    value: "cover",
    label: "Cover",
    description: "Fills the target size and crops excess edges as needed.",
  },
  {
    value: "stretch",
    label: "Stretch",
    description: "Forces the image into the exact size, even if it distorts.",
  },
];

type ImageResizerControlsProps = {
  width: number;
  height: number;
  percentage: number;
  resizeValueMode: ResizeValueMode;
  keepAspectRatio: boolean;
  noUpscale: boolean;
  resizeMode: ResizeMode;
  outputFormat: ImageOutputFormat;
  svgOutputDisabled: boolean;
  isProcessing: boolean;
  hasImage: boolean;
  hasResult: boolean;
  helperText?: string | null;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onPercentageChange: (value: number) => void;
  onResizeValueModeChange: (value: ResizeValueMode) => void;
  onKeepAspectRatioChange: (value: boolean) => void;
  onNoUpscaleChange: (value: boolean) => void;
  onResizeModeChange: (value: ResizeMode) => void;
  onOutputFormatChange: (value: ImageOutputFormat) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function ImageResizerControls({
  width,
  height,
  percentage,
  resizeValueMode,
  keepAspectRatio,
  noUpscale,
  resizeMode,
  outputFormat,
  svgOutputDisabled,
  isProcessing,
  hasImage,
  hasResult,
  helperText,
  onWidthChange,
  onHeightChange,
  onPercentageChange,
  onResizeValueModeChange,
  onKeepAspectRatioChange,
  onNoUpscaleChange,
  onResizeModeChange,
  onOutputFormatChange,
  onProcess,
  onDownload,
  onReset,
}: ImageResizerControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Resize by</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              value: "dimensions" as const,
              label: "Width / height",
              description: "Set exact pixel dimensions.",
            },
            {
              value: "percentage" as const,
              label: "Percentage",
              description: "Scale relative to the original size.",
            },
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
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {resizeValueMode === "dimensions" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Width (px)
            <Input
              type="number"
              min={1}
              value={width || ""}
              onChange={(event) => onWidthChange(Number(event.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Height (px)
            <Input
              type="number"
              min={1}
              value={height || ""}
              onChange={(event) => onHeightChange(Number(event.target.value))}
            />
          </label>
        </div>
      ) : (
        <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
          Percentage
          <Input
            type="number"
            min={1}
            max={1000}
            value={percentage || ""}
            onChange={(event) => onPercentageChange(Number(event.target.value))}
          />
        </label>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-foreground)]">
          <input
            type="checkbox"
            checked={keepAspectRatio}
            onChange={(event) => onKeepAspectRatioChange(event.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="font-medium">Keep aspect ratio</span>
        </label>

        <label className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-foreground)]">
          <input
            type="checkbox"
            checked={noUpscale}
            onChange={(event) => onNoUpscaleChange(event.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="font-medium">Do not upscale</span>
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Output format</p>
        <ImageFormatSelector
          value={outputFormat}
          onChange={onOutputFormatChange}
          disabledFormats={svgOutputDisabled ? ["image/svg+xml"] : []}
          descriptions={{
            "image/png": "Lossless raster output.",
            "image/jpeg": "Smaller JPG output with a white background for transparency.",
            "image/webp": "Modern raster output with good compression.",
            "image/svg+xml": "Only available for uploaded SVG files.",
          }}
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Resize mode</p>
        <div className="grid gap-3 md:grid-cols-3">
          {resizeModes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => onResizeModeChange(mode.value)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                resizeMode === mode.value
                  ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-white"
              }`}
            >
              <p className="font-semibold text-[var(--color-foreground)]">{mode.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
                {mode.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {helperText ? (
        <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasImage || isProcessing}>
          {isProcessing ? "Resizing..." : "Resize image"}
        </Button>
        <Button variant="secondary" onClick={onDownload} disabled={!hasResult}>
          Download resized image
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
