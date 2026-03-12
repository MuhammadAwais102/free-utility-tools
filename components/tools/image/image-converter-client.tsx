"use client";

import { useEffect, useState } from "react";
import { ImageConversionSummary } from "@/components/tools/image/image-conversion-summary";
import { ImageConverterControls } from "@/components/tools/image/image-converter-controls";
import { ImageToolLayout } from "@/components/tools/image/image-tool-layout";
import { downloadBlob } from "@/lib/file";
import {
  canConvertToFormat,
  convertImage,
  getDefaultConverterOutputFormat,
} from "@/lib/image/convert-image";
import { isSupportedImageUpload, isSvgUpload, releaseSelectedImage } from "@/lib/image/image-file";
import { getImageFormatLabel } from "@/lib/image/output-format";
import { readImageFile } from "@/lib/image/read-image-file";
import type { ImageOutputFormat, ProcessedImageResult, SelectedImage } from "@/types/image";

export function ImageConverterClient() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [outputType, setOutputType] = useState<ImageOutputFormat>("image/jpeg");
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

      releaseSelectedImage(selectedImage);

      const nextImage = await readImageFile(file);
      setSelectedImage(nextImage);
      setOutputType(getDefaultConverterOutputFormat(file));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the image.");
    }
  }

  async function handleProcess() {
    if (!selectedImage) {
      setError("Upload an image before converting.");
      return;
    }

    if (!canConvertToFormat(selectedImage.file, outputType)) {
      setError("SVG output is only supported for uploaded SVG files.");
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

  const helperText = selectedImage
    ? outputType === "image/svg+xml"
      ? isSvgUpload(selectedImage.file)
        ? "SVG to SVG uses a lightweight cleanup path and keeps the file as true SVG."
        : "SVG output is only supported for uploaded SVG files."
      : isSvgUpload(selectedImage.file)
        ? `This will rasterize the uploaded SVG to ${getImageFormatLabel(outputType)}.`
        : `The converted file will be exported as ${getImageFormatLabel(outputType)} with a matching extension.`
    : null;

  const previewExtras = selectedImage ? (
    <ImageConversionSummary
      originalType={selectedImage.file.type}
      outputType={result?.type ?? outputType}
    />
  ) : null;

  return (
    <ImageToolLayout
      title="Image Converter"
      description="Upload a JPG, PNG, WebP, or SVG image, choose the output format, and generate a correctly typed browser-side file."
      error={error}
      onFilesChange={handleFilesChange}
      selectedImage={selectedImage}
      result={result}
      emptyTitle="No image selected yet"
      emptyDescription="Upload a JPG, PNG, WebP, or SVG image to preview it and convert it into another browser-generated format."
      uploadAccept="image/jpeg,image/png,image/webp,image/svg+xml"
      uploadHelpText="Supported formats: JPG, PNG, WebP, and SVG. True SVG output is available only for uploaded SVG files."
      previewExtras={previewExtras}
      controls={
        <ImageConverterControls
          outputType={outputType}
          isProcessing={isProcessing}
          hasImage={Boolean(selectedImage)}
          hasResult={Boolean(result)}
          svgOutputDisabled={Boolean(selectedImage && !isSvgUpload(selectedImage.file))}
          helperText={helperText}
          onOutputTypeChange={(nextType) => {
            setOutputType(nextType);
            setResult(null);
            setError(null);
          }}
          onProcess={handleProcess}
          onDownload={() => result && downloadBlob(result.blob, result.filename)}
          onReset={handleReset}
        />
      }
    />
  );
}
