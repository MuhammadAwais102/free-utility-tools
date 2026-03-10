"use client";

import { FileList } from "@/components/shared/file-list";

export function PdfFileList({
  files,
  onRemove,
}: {
  files: File[];
  onRemove?: (index: number) => void;
}) {
  return <FileList files={files} onRemove={onRemove} />;
}
