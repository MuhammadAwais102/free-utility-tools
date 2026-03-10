"use client";

import { useEffect, useRef, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { FileUpload } from "@/components/shared/file-upload";
import { PageHeader } from "@/components/shared/page-header";
import { PdfActions } from "@/components/tools/pdf/pdf-actions";
import { JpgToPdfImageList } from "@/components/tools/pdf/jpg-to-pdf-image-list";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import { isSupportedImageType, releaseSelectedImage } from "@/lib/image/image-file";
import { readImageFile } from "@/lib/image/read-image-file";
import { imagesToPdf } from "@/lib/pdf/images-to-pdf";
import { reorderItems } from "@/lib/utils";
import type { GeneratedFile } from "@/types/pdf";
import type { SelectedImage } from "@/types/image";

export function JpgToPdfClient() {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [generatedFile, setGeneratedFile] = useState<GeneratedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imagesRef = useRef<SelectedImage[]>([]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => releaseSelectedImage(image));
    };
  }, []);

  async function handleFilesChange(files: File[]) {
    if (files.some((file) => !isSupportedImageType(file))) {
      setError("Please upload only JPG, PNG, or WebP images.");
      return;
    }

    try {
      setError(null);
      setGeneratedFile(null);
      images.forEach((image) => releaseSelectedImage(image));
      const nextImages = await Promise.all(files.map((file) => readImageFile(file)));
      setImages(nextImages);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the images.");
    }
  }

  async function handleProcess() {
    if (!images.length) {
      setError("Upload at least one image before creating the PDF.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const blob = await imagesToPdf(images.map((image) => image.file));
      setGeneratedFile({ filename: "images-to-pdf.pdf", blob });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Image to PDF conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="PDF Tool"
        title="JPG to PDF"
        description="Upload one or more JPG, PNG, or WebP images, arrange them in order, and convert them into a single browser-generated PDF."
      />

      <Card className="space-y-6">
        <FileUpload
          accept="image/jpeg,image/png,image/webp"
          multiple
          buttonText="Choose images"
          helpText="Upload one or more JPG, PNG, or WebP images. Their order becomes the PDF page order."
          onFilesChange={handleFilesChange}
        />
        <ErrorMessage message={error} />
        {images.length ? (
          <JpgToPdfImageList
            images={images}
            onMoveUp={(index) => {
              if (index === 0) {
                return;
              }

              setImages((currentImages) => reorderItems(currentImages, index, index - 1));
              setGeneratedFile(null);
            }}
            onMoveDown={(index) => {
              if (index === images.length - 1) {
                return;
              }

              setImages((currentImages) => reorderItems(currentImages, index, index + 1));
              setGeneratedFile(null);
            }}
            onRemove={(index) => {
              setImages((currentImages) => {
                const removed = currentImages[index];
                releaseSelectedImage(removed);
                return currentImages.filter((_, itemIndex) => itemIndex !== index);
              });
              setGeneratedFile(null);
            }}
          />
        ) : null}
        <PdfActions
          isProcessing={isProcessing}
          hasFiles={images.length > 0}
          hasOutput={Boolean(generatedFile)}
          processLabel="Create PDF"
          downloadLabel="Download PDF"
          onProcess={handleProcess}
          onDownload={() => generatedFile && downloadBlob(generatedFile.blob, generatedFile.filename)}
          onReset={() => {
            images.forEach((image) => releaseSelectedImage(image));
            setImages([]);
            setGeneratedFile(null);
            setError(null);
          }}
        />
      </Card>

      {generatedFile ? (
        <Card>
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">Generated PDF</h2>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-medium text-[var(--color-foreground)]">{generatedFile.filename}</p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                The images have been converted into one PDF in the selected order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => downloadBlob(generatedFile.blob, generatedFile.filename)}
              className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
            >
              Download
            </button>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No PDF generated yet"
          description="Upload one or more images, arrange them in order, and create a single downloadable PDF."
        />
      )}
    </div>
  );
}
