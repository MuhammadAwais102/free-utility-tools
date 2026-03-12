"use client";

import { useEffect, useRef, useState } from "react";
import { ImageToolLayout } from "@/components/tools/image/image-tool-layout";
import { ImageResizerControls } from "@/components/tools/image/image-resizer-controls";
import { downloadBlob } from "@/lib/file";
import { isSupportedImageUpload, isSvgUpload, releaseSelectedImage } from "@/lib/image/image-file";
import {
  getDefaultOutputFormat,
  getImageFormatLabel,
  outputFormatSupportsQuality,
} from "@/lib/image/output-format";
import { readImageFile } from "@/lib/image/read-image-file";
import { calculateTargetDimensions, resizeImage } from "@/lib/image/resize-image";
import type {
  ImageOutputFormat,
  ProcessedImageResult,
  ResizeMode,
  ResizeValueMode,
  SelectedImage,
} from "@/types/image";

export function ImageResizerClient() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [result, setResult] = useState<ProcessedImageResult | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [resizeValueMode, setResizeValueMode] = useState<ResizeValueMode>("dimensions");
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [noUpscale, setNoUpscale] = useState(false);
  const [outputFormat, setOutputFormat] = useState<ImageOutputFormat>("image/jpeg");
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

    if (!isSupportedImageUpload(file, true)) {
      setError("Please upload a JPG, PNG, WebP, or SVG image.");
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
      setPercentage(100);
      setResizeValueMode("dimensions");
      setKeepAspectRatio(true);
      setNoUpscale(false);
      setResizeMode("contain");
      setOutputFormat(getDefaultOutputFormat(file));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the image.");
    }
  }

  function validateResizeInput() {
    if (!selectedImage) {
      return "Upload an image before resizing.";
    }

    if (resizeValueMode === "percentage") {
      if (!percentage || percentage < 1 || percentage > 1000) {
        return "Percentage must be between 1% and 1000%.";
      }
    } else {
      if (!width || !height || width < 1 || height < 1) {
        return "Width and height must both be greater than 0.";
      }
    }

    return null;
  }

  function syncHeightFromWidth(nextWidth: number) {
    if (!selectedImage || !keepAspectRatio || isSyncingDimensionRef.current) {
      return;
    }

    isSyncingDimensionRef.current = true;
    setHeight(Math.max(1, Math.round(nextWidth / aspectRatioRef.current)));
    isSyncingDimensionRef.current = false;
  }

  function syncWidthFromHeight(nextHeight: number) {
    if (!selectedImage || !keepAspectRatio || isSyncingDimensionRef.current) {
      return;
    }

    isSyncingDimensionRef.current = true;
    setWidth(Math.max(1, Math.round(nextHeight * aspectRatioRef.current)));
    isSyncingDimensionRef.current = false;
  }

  function handleWidthChange(nextWidth: number) {
    setWidth(nextWidth);
    setResult(null);
    syncHeightFromWidth(nextWidth);
  }

  function handleHeightChange(nextHeight: number) {
    setHeight(nextHeight);
    setResult(null);
    syncWidthFromHeight(nextHeight);
  }

  function handleReset() {
    releaseSelectedImage(selectedImage);
    setSelectedImage(null);
    setResult(null);
    setWidth(0);
    setHeight(0);
    setPercentage(100);
    setResizeValueMode("dimensions");
    setKeepAspectRatio(true);
    setNoUpscale(false);
    setOutputFormat("image/jpeg");
    setResizeMode("contain");
    setError(null);
  }

  async function handleProcess() {
    const validationError = validateResizeInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!selectedImage) {
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const target = calculateTargetDimensions({
        sourceWidth: selectedImage.width,
        sourceHeight: selectedImage.height,
        width,
        height,
        percentage,
        mode: resizeValueMode,
        keepAspectRatio,
        noUpscale,
      });

      if (outputFormat === "image/svg+xml" && !isSvgUpload(selectedImage.file)) {
        setError("SVG output is only supported for uploaded SVG files.");
        return;
      }

      const processed = await resizeImage({
        selectedImage,
        width: target.width,
        height: target.height,
        type: outputFormat,
        quality: outputFormatSupportsQuality(outputFormat) ? 0.92 : undefined,
        suffix:
          resizeValueMode === "percentage"
            ? `${percentage}pct${noUpscale ? "-no-upscale" : ""}`
            : `${target.width}x${target.height}-${resizeMode}${noUpscale ? "-no-upscale" : ""}`,
        mode: resizeMode,
      });

      setResult(processed);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Resizing failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  const helperText = selectedImage
    ? outputFormat === "image/svg+xml"
      ? isSvgUpload(selectedImage.file)
        ? "SVG output keeps the file as real vector markup and updates the rendered size without faking a raster export."
        : "SVG output is only supported for uploaded SVG files."
      : resizeValueMode === "percentage"
        ? `The current output will be generated as ${getImageFormatLabel(outputFormat)} at ${percentage}% of the original size.`
        : noUpscale
          ? "No-upscale is enabled, so the output will never exceed the original image dimensions."
          : `The current output will be generated as ${getImageFormatLabel(outputFormat)} using ${resizeMode} fit behavior.`
    : null;

  return (
    <ImageToolLayout
      title="Image Resizer"
      description="Upload a JPG, PNG, WebP, or SVG image, resize by dimensions or percentage, and export a browser-generated result with honest format handling."
      error={error}
      onFilesChange={handleFilesChange}
      selectedImage={selectedImage}
      result={result}
      emptyTitle="No image selected yet"
      emptyDescription="Upload a JPG, PNG, WebP, or SVG image to preview its details and generate a resized version locally."
      uploadAccept="image/jpeg,image/png,image/webp,image/svg+xml"
      uploadHelpText="Supported formats: JPG, PNG, WebP, and SVG. SVG output stays available only for uploaded SVG files."
      controls={
        <ImageResizerControls
          width={width}
          height={height}
          percentage={percentage}
          resizeValueMode={resizeValueMode}
          keepAspectRatio={keepAspectRatio}
          noUpscale={noUpscale}
          resizeMode={resizeMode}
          outputFormat={outputFormat}
          svgOutputDisabled={Boolean(selectedImage && !isSvgUpload(selectedImage.file))}
          isProcessing={isProcessing}
          hasImage={Boolean(selectedImage)}
          hasResult={Boolean(result)}
          helperText={helperText}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onPercentageChange={(nextPercentage) => {
            setPercentage(nextPercentage);
            setResult(null);
          }}
          onResizeValueModeChange={(nextMode) => {
            setResizeValueMode(nextMode);
            setResult(null);
          }}
          onKeepAspectRatioChange={setKeepAspectRatio}
          onNoUpscaleChange={(nextValue) => {
            setNoUpscale(nextValue);
            setResult(null);
          }}
          onResizeModeChange={(nextMode) => {
            setResizeMode(nextMode);
            setResult(null);
          }}
          onOutputFormatChange={(nextFormat) => {
            setOutputFormat(nextFormat);
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
