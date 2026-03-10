"use client";

import { FileUpload } from "@/components/shared/file-upload";

export function ImageUploadPanel({
  multiple = false,
  onFilesChange,
}: {
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
}) {
  return (
    <FileUpload
      accept="image/jpeg,image/png,image/webp"
      multiple={multiple}
      onFilesChange={onFilesChange}
      buttonText={multiple ? "Choose images" : "Choose image"}
      helpText="Supported formats: JPG, PNG, and WebP."
    />
  );
}
