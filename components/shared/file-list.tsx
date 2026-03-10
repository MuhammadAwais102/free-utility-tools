"use client";

import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type FileListProps = {
  files: File[];
  onRemove?: (index: number) => void;
};

export function FileList({ files, onRemove }: FileListProps) {
  return (
    <ul className="space-y-3">
      {files.map((file, index) => (
        <li
          key={`${file.name}-${index}`}
          className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-[var(--color-foreground)]">{file.name}</p>
            <p className="text-sm text-[var(--color-muted-foreground)]">{formatBytes(file.size)}</p>
          </div>
          {onRemove ? (
            <Button
              variant="ghost"
              onClick={() => onRemove(index)}
              className="min-h-0 px-3 py-2 text-sm text-[var(--color-accent)]"
            >
              Remove
            </Button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
