"use client";

import { FileUpload } from "@/components/shared/file-upload";

export function ImageUploadPanel({
  multiple = false,
  accept = "image/jpeg,image/png,image/webp",
  helpText = "Supported formats: JPG, PNG, and WebP.",
  onFilesChange,
}: {
  multiple?: boolean;
  accept?: string;
  helpText?: string;
  onFilesChange: (files: File[]) => void;
}) {
  return (
    <FileUpload
      accept={accept}
      multiple={multiple}
      onFilesChange={onFilesChange}
      buttonText={multiple ? "Choose images" : "Choose image"}
      helpText={helpText}
    />
  );
}
