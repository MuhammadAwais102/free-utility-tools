"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import type { ProcessedImageResult } from "@/types/image";

export type BulkImageResizeResult = {
  sourceName: string;
  status: "success" | "error";
  error?: string;
  output?: ProcessedImageResult;
};

export function BulkImageResultList({
  results,
  onDownload,
}: {
  results: BulkImageResizeResult[];
  onDownload: (result: BulkImageResizeResult) => void;
}) {
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={`${result.sourceName}-${result.status}`} className="bg-white/95">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <p className="truncate font-semibold text-[var(--color-foreground)]">{result.sourceName}</p>
              {result.status === "success" && result.output ? (
                <>
                  <p className="text-sm text-emerald-700">Ready</p>
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {result.output.filename} • {result.output.width} x {result.output.height} px • {formatBytes(result.output.size)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-rose-700">Failed</p>
                  <p className="text-sm text-[var(--color-muted-foreground)]">{result.error}</p>
                </>
              )}
            </div>
            {result.status === "success" ? (
              <Button variant="secondary" onClick={() => onDownload(result)}>
                Download
              </Button>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
