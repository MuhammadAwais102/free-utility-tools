"use client";

import { ImageFormatSelector } from "@/components/tools/image/image-format-selector";
import { Button } from "@/components/ui/button";
import type { ImageOutputFormat } from "@/types/image";

type ImageConverterControlsProps = {
  outputType: ImageOutputFormat;
  isProcessing: boolean;
  hasImage: boolean;
  hasResult: boolean;
  svgOutputDisabled: boolean;
  helperText?: string | null;
  onOutputTypeChange: (value: ImageOutputFormat) => void;
  onProcess: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function ImageConverterControls({
  outputType,
  isProcessing,
  hasImage,
  hasResult,
  svgOutputDisabled,
  helperText,
  onOutputTypeChange,
  onProcess,
  onDownload,
  onReset,
}: ImageConverterControlsProps) {
  return (
    <div className="space-y-6 rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--color-foreground)]">Output format</p>
        <ImageFormatSelector
          value={outputType}
          onChange={onOutputTypeChange}
          disabledFormats={svgOutputDisabled ? ["image/svg+xml"] : []}
          descriptions={{
            "image/png": "Export as lossless PNG.",
            "image/jpeg": "Export as JPG / JPEG.",
            "image/webp": "Export as modern WebP.",
            "image/svg+xml": "Only available for uploaded SVG files.",
          }}
        />
      </div>

      {helperText ? (
        <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
          {helperText}
        </p>
      ) : null}

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
