"use client";

import { useEffect, useState } from "react";
import { ImageCompressionSummary } from "@/components/tools/image/image-compression-summary";
import { ImageCompressorControls } from "@/components/tools/image/image-compressor-controls";
import { ImageToolLayout } from "@/components/tools/image/image-tool-layout";
import { downloadBlob } from "@/lib/file";
import {
  canCompressToFormat,
  compressImage,
  getCompressionFormatHelpText,
  getDefaultCompressionOutputFormat,
} from "@/lib/image/compress-image";
import {
  isSupportedImageUpload,
  isSvgUpload,
  releaseSelectedImage,
} from "@/lib/image/image-file";
import { outputFormatSupportsQuality } from "@/lib/image/output-format";
import { readImageFile } from "@/lib/image/read-image-file";
import type {
  ImageCompressionOutputFormat,
  ProcessedImageResult,
  SelectedImage,
} from "@/types/image";

export function ImageCompressorClient() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [outputFormat, setOutputFormat] = useState<ImageCompressionOutputFormat>("image/webp");
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

    if (!isSupportedImageUpload(file, true)) {
      setError("Please upload a JPG, PNG, WebP, or SVG image.");
      return;
    }

    try {
      setError(null);
      setResult(null);
      setQuality(0.8);
      setOutputFormat(getDefaultCompressionOutputFormat(file));

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

    if (outputFormatSupportsQuality(outputFormat) && (quality <= 0 || quality > 1)) {
      setError("Choose a valid quality between 10% and 100%.");
      return;
    }

    if (!canCompressToFormat(selectedImage.file, outputFormat)) {
      setError("SVG output is only supported for SVG uploads.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const compressed = await compressImage({ selectedImage, quality, outputFormat });
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
    setOutputFormat("image/webp");
    setError(null);
  }

  const usesQualityControl = outputFormatSupportsQuality(outputFormat);
  const helperText = getCompressionFormatHelpText(selectedImage?.file ?? null, outputFormat);
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
      description="Upload a JPG, PNG, WebP, or SVG file, choose an output format, and generate a browser-side compressed download with honest format handling."
      error={error}
      onFilesChange={handleFilesChange}
      selectedImage={selectedImage}
      result={result}
      emptyTitle="No image selected yet"
      emptyDescription="Upload a JPG, PNG, WebP, or SVG file to compare the original size with a compressed browser-generated version."
      uploadAccept="image/jpeg,image/png,image/webp,image/svg+xml"
      uploadHelpText="Supported formats: JPG, PNG, WebP, and SVG. SVG output is only available for uploaded SVG files."
      previewExtras={previewExtras}
      controls={
        <ImageCompressorControls
          outputFormat={outputFormat}
          quality={quality}
          isProcessing={isProcessing}
          hasImage={Boolean(selectedImage)}
          hasResult={Boolean(result)}
          usesQualityControl={usesQualityControl}
          svgOptionDisabled={Boolean(selectedImage && !isSvgUpload(selectedImage.file))}
          onOutputFormatChange={(nextOutputFormat) => {
            setOutputFormat(nextOutputFormat);
            setResult(null);
            setError(null);
          }}
          onQualityChange={(nextQuality) => {
            setQuality(nextQuality);
            setResult(null);
            setError(null);
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
