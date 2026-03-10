"use client";

import { useEffect, useRef, useState } from "react";
import { ImageToolLayout } from "@/components/tools/image/image-tool-layout";
import { ImageResizerControls } from "@/components/tools/image/image-resizer-controls";
import { downloadBlob, getBaseName } from "@/lib/file";
import { isSupportedImageType, releaseSelectedImage } from "@/lib/image/image-file";
import { readImageFile } from "@/lib/image/read-image-file";
import { resizeImage } from "@/lib/image/resize-image";
import type { ProcessedImageResult, ResizeMode, SelectedImage } from "@/types/image";

export function ImageResizerClient() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [resizeMode, setResizeMode] = useState<ResizeMode>("contain");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const aspectRatioRef = useRef(1);
  const isSyncingDimensionRef = useRef(false);

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
      aspectRatioRef.current = nextImage.width / nextImage.height;
      setSelectedImage(nextImage);
      setWidth(nextImage.width);
      setHeight(nextImage.height);
      setKeepAspectRatio(true);
      setResizeMode("contain");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the image.");
    }
  }

  function validateDimensions(nextWidth: number, nextHeight: number) {
    if (!nextWidth || !nextHeight || nextWidth < 1 || nextHeight < 1) {
      return "Width and height must both be greater than 0.";
    }

    if (nextWidth > 12000 || nextHeight > 12000) {
      return "For browser safety, width and height must stay at or below 12000 px.";
    }

    return null;
  }

  function handleWidthChange(nextWidth: number) {
    setWidth(nextWidth);
    setResult(null);

    if (!selectedImage || !keepAspectRatio || isSyncingDimensionRef.current) {
      return;
    }

    isSyncingDimensionRef.current = true;
    setHeight(Math.max(1, Math.round(nextWidth / aspectRatioRef.current)));
    isSyncingDimensionRef.current = false;
  }

  function handleHeightChange(nextHeight: number) {
    setHeight(nextHeight);
    setResult(null);

    if (!selectedImage || !keepAspectRatio || isSyncingDimensionRef.current) {
      return;
    }

    isSyncingDimensionRef.current = true;
    setWidth(Math.max(1, Math.round(nextHeight * aspectRatioRef.current)));
    isSyncingDimensionRef.current = false;
  }

  function handleReset() {
    releaseSelectedImage(selectedImage);
    setSelectedImage(null);
    setResult(null);
    setWidth(0);
    setHeight(0);
    setKeepAspectRatio(true);
    setResizeMode("contain");
    setError(null);
  }

  async function handleProcess() {
    if (!selectedImage) {
      setError("Upload an image before resizing.");
      return;
    }

    const validationError = validateDimensions(width, height);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const extension =
        selectedImage.file.type === "image/png"
          ? "png"
          : selectedImage.file.type === "image/webp"
            ? "webp"
            : "jpg";

      const processed = await resizeImage({
        file: selectedImage.file,
        width,
        height,
        type: selectedImage.file.type as "image/jpeg" | "image/png" | "image/webp",
        quality: selectedImage.file.type === "image/png" ? undefined : 0.92,
        filename: `${getBaseName(selectedImage.file.name)}-${width}x${height}-${resizeMode}.${extension}`,
        mode: resizeMode,
      });

      setResult(processed);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Resizing failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <ImageToolLayout
      title="Image Resizer"
      description="Upload a JPG, PNG, or WebP image, choose exact dimensions, and resize it in your browser with contain, cover, or stretch behavior."
      error={error}
      onFilesChange={handleFilesChange}
      selectedImage={selectedImage}
      result={result}
      emptyTitle="No image selected yet"
      emptyDescription="Upload a JPG, PNG, or WebP image to preview its details and generate a resized version locally."
      controls={
        <ImageResizerControls
          width={width}
          height={height}
          keepAspectRatio={keepAspectRatio}
          resizeMode={resizeMode}
          isProcessing={isProcessing}
          hasImage={Boolean(selectedImage)}
          hasResult={Boolean(result)}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onKeepAspectRatioChange={setKeepAspectRatio}
          onResizeModeChange={(nextMode) => {
            setResizeMode(nextMode);
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
