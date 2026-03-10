"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import type { SelectedImage } from "@/types/image";

type JpgToPdfImageListProps = {
  images: SelectedImage[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
};

export function JpgToPdfImageList({
  images,
  onMoveUp,
  onMoveDown,
  onRemove,
}: JpgToPdfImageListProps) {
  return (
    <div className="space-y-3">
      {images.map((image, index) => (
        <Card key={`${image.file.name}-${index}`} className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative h-24 w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] sm:w-36">
              <Image src={image.previewUrl} alt={image.file.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--color-foreground)]">
                  {index + 1}. {image.file.name}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  {image.width} x {image.height} px, {formatBytes(image.file.size)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  className="min-h-0 px-3 py-2"
                >
                  Move up
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onMoveDown(index)}
                  disabled={index === images.length - 1}
                  className="min-h-0 px-3 py-2"
                >
                  Move down
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onRemove(index)}
                  className="min-h-0 bg-rose-50 px-3 py-2 text-rose-700 hover:bg-rose-100 hover:text-rose-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
