"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";

type PdfMergeFileListProps = {
  files: File[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
};

export function PdfMergeFileList({
  files,
  onMoveUp,
  onMoveDown,
  onRemove,
}: PdfMergeFileListProps) {
  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <Card key={`${file.name}-${index}`} className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-medium text-[var(--color-foreground)]">
                {index + 1}. {file.name}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                {formatBytes(file.size)}
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
                disabled={index === files.length - 1}
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
        </Card>
      ))}
    </div>
  );
}
