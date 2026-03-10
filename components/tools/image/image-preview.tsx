"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import type { ProcessedImageResult, SelectedImage } from "@/types/image";

export function ImagePreview({
  source,
  result,
}: {
  source: SelectedImage | null;
  result: ProcessedImageResult | null;
}) {
  if (!source) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Original
        </p>
        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[24px] bg-[var(--color-surface)]">
          <Image src={source.previewUrl} alt={source.file.name} fill className="object-contain" unoptimized />
        </div>
        <div className="mt-4 space-y-1 text-sm text-[var(--color-muted-foreground)]">
          <p className="font-medium text-[var(--color-foreground)]">{source.file.name}</p>
          <p>
            {source.width} x {source.height} px
          </p>
          <p>{formatBytes(source.file.size)}</p>
          <p>{source.file.type || "Unknown type"}</p>
        </div>
      </Card>
      <Card>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Output
        </p>
        {result ? (
          <>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[24px] bg-[var(--color-surface)]">
              <Image src={result.dataUrl} alt={result.filename} fill className="object-contain" unoptimized />
            </div>
            <div className="mt-4 space-y-1 text-sm text-[var(--color-muted-foreground)]">
              <p className="font-medium text-[var(--color-foreground)]">{result.filename}</p>
              <p>
                {result.width} x {result.height} px
              </p>
              <p>{formatBytes(result.size)}</p>
              <p>{result.type || "Unknown type"}</p>
            </div>
          </>
        ) : (
          <div className="mt-4 rounded-[24px] border border-dashed border-[var(--color-border)] px-4 py-12 text-sm text-[var(--color-muted-foreground)]">
            Process the image to preview the result here.
          </div>
        )}
      </Card>
    </div>
  );
}
