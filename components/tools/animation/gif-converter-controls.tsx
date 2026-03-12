"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AnimationConversionMode } from "@/types/animation";

type GifConverterControlsProps = {
  mode: AnimationConversionMode | null;
  speedMultiplier: number;
  stillFrameDuration: number;
  isProcessing: boolean;
  hasSource: boolean;
  hasResult: boolean;
  helperText?: string | null;
  onSpeedMultiplierChange: (value: number) => void;
  onStillFrameDurationChange: (value: number) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function GifConverterControls({
  mode,
  speedMultiplier,
  stillFrameDuration,
  isProcessing,
  hasSource,
  hasResult,
  helperText,
  onSpeedMultiplierChange,
  onStillFrameDurationChange,
  onProcess,
  onDownload,
  onReset,
}: GifConverterControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
        <p className="font-semibold text-[var(--color-foreground)]">Supported conversions</p>
        <p className="mt-2">
          GIF to GIF rebuilding, plus static JPG/PNG/WebP/SVG to single-frame GIF.
        </p>
      </div>

      {mode === "gif-to-gif" ? (
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
      ) : (
        <label className="space-y-2 text-sm font-medium text-[var(--color-foreground)]">
          Frame duration for static image (ms)
          <Input
            type="number"
            min={100}
            max={10000}
            step={50}
            value={stillFrameDuration || ""}
            onChange={(event) => onStillFrameDurationChange(Number(event.target.value))}
          />
        </label>
      )}

      {helperText ? (
        <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={onProcess} disabled={!hasSource || isProcessing}>
          {isProcessing ? "Converting..." : "Convert to GIF"}
        </Button>
        <Button variant="secondary" onClick={onDownload} disabled={!hasResult}>
          Download GIF
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
