"use client";

import { ImageFormatSelector } from "@/components/tools/image/image-format-selector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { ImageCompressionOutputFormat } from "@/types/image";

type ImageCompressorControlsProps = {
  outputFormat: ImageCompressionOutputFormat;
  quality: number;
  isProcessing: boolean;
  hasImage: boolean;
  hasResult: boolean;
  usesQualityControl: boolean;
  svgOptionDisabled: boolean;
  onOutputFormatChange: (value: ImageCompressionOutputFormat) => void;
  onQualityChange: (value: number) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
  helperText?: string | null;
};

export function ImageCompressorControls({
  outputFormat,
  quality,
  isProcessing,
  hasImage,
  hasResult,
  usesQualityControl,
  svgOptionDisabled,
  onOutputFormatChange,
  onQualityChange,
  onProcess,
  onDownload,
  onReset,
  helperText,
}: ImageCompressorControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Output format</p>
        <ImageFormatSelector
          value={outputFormat}
          onChange={(value) => onOutputFormatChange(value as ImageCompressionOutputFormat)}
          disabledFormats={svgOptionDisabled ? ["image/svg+xml"] : []}
          descriptions={{
            "image/webp": "Smaller modern raster output with quality control.",
            "image/png": "Lossless raster output without a quality slider.",
            "image/jpeg": "Widely supported raster output with quality control.",
            "image/svg+xml": "Only available as true SVG optimization for uploaded SVG files.",
          }}
        />
      </div>

      {usesQualityControl ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm font-medium text-[var(--color-foreground)]">
            <span>Compression quality</span>
            <span>{Math.round(quality * 100)}%</span>
          </div>
          <Slider value={quality * 100} min={10} max={100} onChange={(value) => onQualityChange(value / 100)} />
          <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
            Lower quality usually creates a smaller file, while higher quality keeps more image detail.
          </p>
        </div>
      ) : null}

      {helperText ? (
        <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      ) : null}

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
