"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { PageHeader } from "@/components/shared/page-header";
import { ImageUploadPanel } from "@/components/tools/image/image-upload-panel";
import { BulkImageFileList } from "@/components/tools/image/bulk-image-file-list";
import {
  BulkImageResizeResult,
  BulkImageResultList,
} from "@/components/tools/image/bulk-image-result-list";
import { BulkImageResizerControls } from "@/components/tools/image/bulk-image-resizer-controls";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import { isSupportedImageUpload, releaseSelectedImage } from "@/lib/image/image-file";
import {
  getImageFormatLabel,
  outputFormatSupportsQuality,
} from "@/lib/image/output-format";
import { readImageFile } from "@/lib/image/read-image-file";
import { calculateTargetDimensions, resizeImage } from "@/lib/image/resize-image";
import type { RasterImageFormat, ResizeValueMode, SelectedImage } from "@/types/image";

export function BulkImageResizerClient() {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [results, setResults] = useState<BulkImageResizeResult[]>([]);
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(900);
  const [percentage, setPercentage] = useState(100);
  const [resizeValueMode, setResizeValueMode] = useState<ResizeValueMode>("dimensions");
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [noUpscale, setNoUpscale] = useState(false);
  const [outputFormat, setOutputFormat] = useState<RasterImageFormat>("image/jpeg");
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

  const successfulResults = useMemo(
    () => results.filter((result) => result.status === "success" && result.output),
    [results],
  );

  async function handleFilesChange(files: File[]) {
    if (!files.length) {
      return;
    }

    const invalidFile = files.find((file) => !isSupportedImageUpload(file, true));
    if (invalidFile) {
      setError("Only JPG, PNG, WebP, or SVG files can be added.");
      return;
    }

    try {
      setError(null);
      setResults([]);
      images.forEach((image) => releaseSelectedImage(image));
      const nextImages = await Promise.all(files.map((file) => readImageFile(file)));
      setImages(nextImages);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the selected images.");
    }
  }

  async function handleProcess() {
    if (!images.length) {
      setError("Upload images before starting the bulk resize.");
      return;
    }

    if (resizeValueMode === "percentage" && (!percentage || percentage < 1 || percentage > 1000)) {
      setError("Percentage must be between 1% and 1000%.");
      return;
    }

    if (resizeValueMode === "dimensions" && (!width || !height || width < 1 || height < 1)) {
      setError("Width and height must both be greater than 0.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const nextResults: BulkImageResizeResult[] = [];

      for (const image of images) {
        try {
          const target = calculateTargetDimensions({
            sourceWidth: image.width,
            sourceHeight: image.height,
            width,
            height,
            percentage,
            mode: resizeValueMode,
            keepAspectRatio,
            noUpscale,
          });

          const output = await resizeImage({
            selectedImage: image,
            width: target.width,
            height: target.height,
            type: outputFormat,
            quality: outputFormatSupportsQuality(outputFormat) ? 0.92 : undefined,
            suffix:
              resizeValueMode === "percentage"
                ? `${percentage}pct-bulk`
                : `${target.width}x${target.height}-bulk`,
          });

          nextResults.push({
            sourceName: image.file.name,
            status: "success",
            output,
          });
        } catch (nextError) {
          nextResults.push({
            sourceName: image.file.name,
            status: "error",
            error: nextError instanceof Error ? nextError.message : "Resize failed.",
          });
        }
      }

      setResults(nextResults);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    images.forEach((image) => releaseSelectedImage(image));
    setImages([]);
    setResults([]);
    setWidth(1600);
    setHeight(900);
    setPercentage(100);
    setResizeValueMode("dimensions");
    setKeepAspectRatio(true);
    setNoUpscale(false);
    setOutputFormat("image/jpeg");
    setError(null);
  }

  async function handleDownloadAll() {
    for (const result of successfulResults) {
      if (result.output) {
        downloadBlob(result.output.blob, result.output.filename);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
    }
  }

  const helperText =
    resizeValueMode === "percentage"
      ? `Each file will be resized to ${percentage}% of its original size and exported as ${getImageFormatLabel(outputFormat)}.`
      : `The same ${width} x ${height} settings will be applied to every file and exported as ${getImageFormatLabel(outputFormat)}.`;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Image Tool"
        title="Bulk Image Resizer"
        description="Upload multiple images, apply one shared resize setting, and generate browser-side results with isolated per-file success and failure states."
      />

      <Card className="space-y-6">
        <ImageUploadPanel
          multiple
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          helpText="Supported formats: JPG, PNG, WebP, and SVG. One shared resize setting will be applied to the whole batch."
          onFilesChange={handleFilesChange}
        />
        <ErrorMessage message={error} />
        <BulkImageResizerControls
          width={width}
          height={height}
          percentage={percentage}
          resizeValueMode={resizeValueMode}
          keepAspectRatio={keepAspectRatio}
          noUpscale={noUpscale}
          outputFormat={outputFormat}
          helperText={helperText}
          isProcessing={isProcessing}
          hasFiles={images.length > 0}
          hasResults={successfulResults.length > 0}
          onWidthChange={(value) => {
            setWidth(value);
            setResults([]);
          }}
          onHeightChange={(value) => {
            setHeight(value);
            setResults([]);
          }}
          onPercentageChange={(value) => {
            setPercentage(value);
            setResults([]);
          }}
          onResizeValueModeChange={(value) => {
            setResizeValueMode(value);
            setResults([]);
          }}
          onKeepAspectRatioChange={(value) => {
            setKeepAspectRatio(value);
            setResults([]);
          }}
          onNoUpscaleChange={(value) => {
            setNoUpscale(value);
            setResults([]);
          }}
          onOutputFormatChange={(value) => {
            setOutputFormat(value);
            setResults([]);
          }}
          onProcess={handleProcess}
          onDownloadAll={handleDownloadAll}
          onReset={handleReset}
        />
      </Card>

      {images.length ? (
        <div className="space-y-6">
          <BulkImageFileList
            images={images}
            onRemove={(index) => {
              setImages((currentImages) => {
                const image = currentImages[index];
                if (image) {
                  releaseSelectedImage(image);
                }

                return currentImages.filter((_, currentIndex) => currentIndex !== index);
              });
              setResults([]);
            }}
          />
          {results.length ? (
            <BulkImageResultList
              results={results}
              onDownload={(result) => {
                if (result.output) {
                  downloadBlob(result.output.blob, result.output.filename);
                }
              }}
            />
          ) : null}
        </div>
      ) : (
        <EmptyState
          title="No batch loaded yet"
          description="Upload multiple images to review them as a group, apply one shared resize setting, and generate per-file results."
        />
      )}
    </div>
  );
}
