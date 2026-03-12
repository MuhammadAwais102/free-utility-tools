"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GifCropOptions } from "@/types/animation";

type GifResizerControlsProps = {
  width: number;
  height: number;
  crop: GifCropOptions;
  speedMultiplier: number;
  isProcessing: boolean;
  hasSource: boolean;
  hasResult: boolean;
  helperText?: string | null;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onCropChange: (value: GifCropOptions) => void;
  onSpeedMultiplierChange: (value: number) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function GifResizerControls({
  width,
  height,
  crop,
  speedMultiplier,
  isProcessing,
  hasSource,
  hasResult,
  helperText,
  onWidthChange,
  onHeightChange,
  onCropChange,
  onSpeedMultiplierChange,
  onProcess,
  onDownload,
  onReset,
}: GifResizerControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
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

      <label className="flex items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input
          type="checkbox"
          checked={crop.enabled}
          onChange={(event) => onCropChange({ ...crop, enabled: event.target.checked })}
          className="h-4 w-4 accent-[var(--color-accent)]"
        />
        <span className="font-medium">Crop before resizing</span>
      </label>

      {crop.enabled ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Crop X
            <Input type="number" min={0} value={crop.x || ""} onChange={(event) => onCropChange({ ...crop, x: Number(event.target.value) })} />
          </label>
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Crop Y
            <Input type="number" min={0} value={crop.y || ""} onChange={(event) => onCropChange({ ...crop, y: Number(event.target.value) })} />
          </label>
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Crop width
            <Input type="number" min={1} value={crop.width || ""} onChange={(event) => onCropChange({ ...crop, width: Number(event.target.value) })} />
          </label>
          <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
            Crop height
            <Input type="number" min={1} value={crop.height || ""} onChange={(event) => onCropChange({ ...crop, height: Number(event.target.value) })} />
          </label>
        </div>
      ) : null}

      <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
        Playback speed multiplier
        <Input
          type="number"
          min={0.25}
          max={4}
          step={0.05}
          value={speedMultiplier || ""}
          onChange={(event) => onSpeedMultiplierChange(Number(event.target.value))}
        />
      </label>

      {helperText ? (
        <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasSource || isProcessing}>
          {isProcessing ? "Processing..." : "Resize GIF"}
        </Button>
        <Button variant="secondary" onClick={onDownload} disabled={!hasResult}>
          Download resized GIF
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
