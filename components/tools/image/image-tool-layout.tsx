"use client";

import type { ReactNode } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { PageHeader } from "@/components/shared/page-header";
import { ImagePreview } from "@/components/tools/image/image-preview";
import { ImageUploadPanel } from "@/components/tools/image/image-upload-panel";
import { Card } from "@/components/ui/card";
import type { ProcessedImageResult, SelectedImage } from "@/types/image";

type ImageToolLayoutProps = {
  title: string;
  description: string;
  error: string | null;
  onFilesChange: (files: File[]) => void;
  controls: ReactNode;
  selectedImage: SelectedImage | null;
  result: ProcessedImageResult | null;
  emptyTitle: string;
  emptyDescription: string;
  previewExtras?: ReactNode;
  uploadAccept?: string;
  uploadHelpText?: string;
};

export function ImageToolLayout({
  title,
  description,
  error,
  onFilesChange,
  controls,
  selectedImage,
  result,
  emptyTitle,
  emptyDescription,
  previewExtras,
  uploadAccept,
  uploadHelpText,
}: ImageToolLayoutProps) {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Image Tool" title={title} description={description} />

      <Card className="space-y-6">
        <ImageUploadPanel
          onFilesChange={onFilesChange}
          accept={uploadAccept}
          helpText={uploadHelpText}
        />
        <ErrorMessage message={error} />
        {controls}
      </Card>

      {selectedImage ? (
        <div className="space-y-6">
          {previewExtras}
          <ImagePreview source={selectedImage} result={result} />
        </div>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
    </div>
  );
}
