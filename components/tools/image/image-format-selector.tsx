"use client";

import {
  getImageFormatLabel,
  IMAGE_OUTPUT_FORMATS,
  isSvgFormat,
} from "@/lib/image/output-format";
import type { ImageOutputFormat } from "@/types/image";

type ImageFormatSelectorProps = {
  value: ImageOutputFormat;
  onChange: (value: ImageOutputFormat) => void;
  formats?: ImageOutputFormat[];
  disabledFormats?: ImageOutputFormat[];
  descriptions?: Partial<Record<ImageOutputFormat, string>>;
};

export function ImageFormatSelector({
  value,
  onChange,
  formats = IMAGE_OUTPUT_FORMATS,
  disabledFormats = [],
  descriptions,
}: ImageFormatSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {formats.map((format) => {
        const isDisabled = disabledFormats.includes(format);

        return (
          <button
            key={format}
            type="button"
            onClick={() => onChange(format)}
            disabled={isDisabled}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              value === format
                ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                : "border-[var(--color-border)] bg-white"
            } ${isDisabled ? "cursor-not-allowed opacity-55" : ""}`}
          >
            <p className="font-semibold text-[var(--color-foreground)]">
              {getImageFormatLabel(format)}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
              {descriptions?.[format] ??
                (isSvgFormat(format)
                  ? "True vector SVG output."
                  : `Export as ${getImageFormatLabel(format)}.`)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
