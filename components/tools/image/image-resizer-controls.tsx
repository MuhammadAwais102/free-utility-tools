"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ResizeMode } from "@/types/image";

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
  keepAspectRatio: boolean;
  resizeMode: ResizeMode;
  isProcessing: boolean;
  hasImage: boolean;
  hasResult: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onKeepAspectRatioChange: (value: boolean) => void;
  onResizeModeChange: (value: ResizeMode) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function ImageResizerControls({
  width,
  height,
  keepAspectRatio,
  resizeMode,
  isProcessing,
  hasImage,
  hasResult,
  onWidthChange,
  onHeightChange,
  onKeepAspectRatioChange,
  onResizeModeChange,
  onProcess,
  onDownload,
  onReset,
}: ImageResizerControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
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

      <label className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input
          type="checkbox"
          checked={keepAspectRatio}
          onChange={(event) => onKeepAspectRatioChange(event.target.checked)}
          className="h-4 w-4 accent-[var(--color-accent)]"
        />
        <span className="font-medium">Keep aspect ratio</span>
      </label>

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
