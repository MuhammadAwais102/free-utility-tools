"use client";

import { useEffect, useState } from "react";
import { ImageConversionSummary } from "@/components/tools/image/image-conversion-summary";
import { ImageConverterControls } from "@/components/tools/image/image-converter-controls";
import { ImageToolLayout } from "@/components/tools/image/image-tool-layout";
import { downloadBlob } from "@/lib/file";
import { convertImage } from "@/lib/image/convert-image";
import { isSupportedImageType, releaseSelectedImage } from "@/lib/image/image-file";
import { readImageFile } from "@/lib/image/read-image-file";
import type { ImageFormat, ProcessedImageResult, SelectedImage } from "@/types/image";

export function ImageConverterClient() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [outputType, setOutputType] = useState<ImageFormat>("image/jpeg");
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

      releaseSelectedImage(selectedImage);

      const nextImage = await readImageFile(file);
      setSelectedImage(nextImage);
      setOutputType(file.type as ImageFormat);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the image.");
    }
  }

  async function handleProcess() {
    if (!selectedImage) {
      setError("Upload an image before converting.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const converted = await convertImage({ selectedImage, type: outputType });
      setResult(converted);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    releaseSelectedImage(selectedImage);
    setSelectedImage(null);
    setResult(null);
    setOutputType("image/jpeg");
    setError(null);
  }

  const previewExtras = selectedImage ? (
    <ImageConversionSummary
      originalType={selectedImage.file.type}
      outputType={result?.type ?? outputType}
    />
  ) : null;

  return (
    <ImageToolLayout
      title="Image Converter"
      description="Upload a JPG, PNG, or WebP image, choose the output format, and generate a converted file directly in your browser."
      error={error}
      onFilesChange={handleFilesChange}
      selectedImage={selectedImage}
      result={result}
      emptyTitle="No image selected yet"
      emptyDescription="Upload a JPG, PNG, or WebP image to preview it and convert it into another browser-generated format."
      previewExtras={previewExtras}
      controls={
        <ImageConverterControls
          outputType={outputType}
          isProcessing={isProcessing}
          hasImage={Boolean(selectedImage)}
          hasResult={Boolean(result)}
          onOutputTypeChange={(nextType) => {
            setOutputType(nextType);
            setResult(null);
          }}
          onProcess={handleProcess}
          onDownload={() => result && downloadBlob(result.blob, result.filename)}
          onReset={handleReset}
        />
      }
    />
  );
}
