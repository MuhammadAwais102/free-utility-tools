"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/file";
import type { ThumbnailVariant } from "@/types/youtube";

export function ThumbnailGrid({ thumbnails }: { thumbnails: ThumbnailVariant[] }) {
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);

  async function handleDownload(thumbnail: ThumbnailVariant) {
    try {
      setDownloadingUrl(thumbnail.url);
      const response = await fetch(thumbnail.url);

      if (!response.ok) {
        throw new Error("Unable to download this thumbnail.");
      }

      const blob = await response.blob();
      downloadBlob(blob, thumbnail.filename);
    } finally {
      setDownloadingUrl(null);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {thumbnails.map((thumbnail) => (
        <div
          key={thumbnail.filename}
          className="rounded-[28px] border border-[var(--color-border)] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
        >
          <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[var(--color-surface)]">
            <Image src={thumbnail.url} alt={thumbnail.label} fill className="object-cover" unoptimized />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-[var(--color-foreground)]">{thumbnail.label}</p>
              <p className="text-sm text-[var(--color-muted-foreground)]">{thumbnail.filename}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={thumbnail.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Open
              </a>
              <Button
                onClick={() => handleDownload(thumbnail)}
                disabled={downloadingUrl === thumbnail.url}
                className="px-4 py-2"
              >
                {downloadingUrl === thumbnail.url ? "Downloading..." : "Download"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
