"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import type { SelectedImage } from "@/types/image";

export function BulkImageFileList({
  images,
  onRemove,
}: {
  images: SelectedImage[];
  onRemove: (index: number) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image, index) => (
        <Card key={image.previewUrl} className="space-y-4 bg-white/95">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[var(--color-surface)]">
            <Image src={image.previewUrl} alt={image.file.name} fill className="object-contain" unoptimized />
          </div>
          <div className="space-y-1 text-sm text-[var(--color-muted-foreground)]">
            <p className="truncate font-medium text-[var(--color-foreground)]">{image.file.name}</p>
            <p>{image.width} x {image.height} px</p>
            <p>{formatBytes(image.file.size)}</p>
          </div>
          <Button variant="ghost" onClick={() => onRemove(index)}>
            Remove
          </Button>
        </Card>
      ))}
    </div>
  );
}
