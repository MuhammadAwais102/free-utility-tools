"use client";

import { useEffect, useState } from "react";
import { ImageCompressionSummary } from "@/components/tools/image/image-compression-summary";
import { ImageCompressorControls } from "@/components/tools/image/image-compressor-controls";
import { ImageToolLayout } from "@/components/tools/image/image-tool-layout";
import { downloadBlob } from "@/lib/file";
import { compressImage } from "@/lib/image/compress-image";
import { isSupportedImageType, releaseSelectedImage } from "@/lib/image/image-file";
import { readImageFile } from "@/lib/image/read-image-file";
import type { ProcessedImageResult, SelectedImage } from "@/types/image";

export function ImageCompressorClient() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => releaseSelectedImage(selectedImage);
  }, [selectedImage]);

  async function handleFilesChange(files: File[]) {
    const file = files[0];
    if (!file) {
      return;
    }

    if (!isSupportedImageType(file)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    try {
      setError(null);
      setResult(null);
      setQuality(0.8);

      releaseSelectedImage(selectedImage);

      const nextImage = await readImageFile(file);
      setSelectedImage(nextImage);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the image.");
    }
  }

  async function handleProcess() {
    if (!selectedImage) {
      setError("Upload an image before compressing.");
      return;
    }

    if (quality <= 0 || quality > 1) {
      setError("Choose a valid quality between 10% and 100%.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const compressed = await compressImage({ selectedImage, quality });
      setResult(compressed);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Compression failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    releaseSelectedImage(selectedImage);
    setSelectedImage(null);
    setResult(null);
    setQuality(0.8);
    setError(null);
  }

  const helperText =
    selectedImage?.file.type === "image/png"
      ? "PNG uploads are exported as WebP for stronger browser-based compression and better control over quality."
      : null;
  const previewExtras =
    selectedImage && result ? (
      <ImageCompressionSummary
        originalSize={selectedImage.file.size}
        compressedSize={result.size}
      />
    ) : null;

  return (
    <ImageToolLayout
      title="Image Compressor"
      description="Upload a JPG, PNG, or WebP file, tune the quality slider, and generate a smaller downloadable image directly in your browser."
      error={error}
      onFilesChange={handleFilesChange}
      selectedImage={selectedImage}
      result={result}
      emptyTitle="No image selected yet"
      emptyDescription="Upload a JPG, PNG, or WebP file to compare the original size with a compressed browser-generated version."
      previewExtras={previewExtras}
      controls={
        <ImageCompressorControls
          quality={quality}
          isProcessing={isProcessing}
          hasImage={Boolean(selectedImage)}
          hasResult={Boolean(result)}
          onQualityChange={(nextQuality) => {
            setQuality(nextQuality);
            setResult(null);
          }}
          onProcess={handleProcess}
          onDownload={() => result && downloadBlob(result.blob, result.filename)}
          onReset={handleReset}
          helperText={helperText}
        />
      }
    />
  );
}
