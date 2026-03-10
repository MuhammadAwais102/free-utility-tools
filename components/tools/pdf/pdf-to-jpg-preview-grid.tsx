"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import type { GeneratedFile } from "@/types/pdf";

type PreviewFile = GeneratedFile & {
  previewUrl: string;
};

export function PdfToJpgPreviewGrid({ files }: { files: GeneratedFile[] }) {
  const previewFiles = useMemo<PreviewFile[]>(
    () =>
      files.map((file) => ({
        ...file,
        previewUrl: URL.createObjectURL(file.blob),
      })),
    [files],
  );

  useEffect(() => {
    return () => {
      previewFiles.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    };
  }, [previewFiles]);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {previewFiles.map((file, index) => (
        <Card key={file.filename} className="p-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-[var(--color-surface)]">
            <Image
              src={file.previewUrl}
              alt={`PDF page ${index + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-[var(--color-foreground)]">
                Page {index + 1}
              </p>
              <p className="truncate text-sm text-[var(--color-muted-foreground)]">
                {file.filename}
              </p>
            </div>
            <Button
              onClick={() => downloadBlob(file.blob, file.filename)}
              className="min-h-0 px-4 py-2"
            >
              Download
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
