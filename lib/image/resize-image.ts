import {
  ensureRasterOutputType,
  exportCanvasResult,
  loadImageElement,
  validateSvgOutputEligibility,
} from "@/lib/image/export-image";
import { isSvgFormat } from "@/lib/image/output-format";
import { exportResizedSvg } from "@/lib/image/svg";
import type {
  ImageOutputFormat,
  ProcessedImageResult,
  ResizeMode,
  SelectedImage,
} from "@/types/image";

export function calculateTargetDimensions({
  sourceWidth,
  sourceHeight,
  width,
  height,
  percentage,
  mode,
  keepAspectRatio,
  noUpscale,
}: {
  sourceWidth: number;
  sourceHeight: number;
  width?: number;
  height?: number;
  percentage?: number;
  mode: "dimensions" | "percentage";
  keepAspectRatio: boolean;
  noUpscale: boolean;
}) {
  let targetWidth = width ?? sourceWidth;
  let targetHeight = height ?? sourceHeight;

  if (mode === "percentage") {
    const scale = (percentage ?? 100) / 100;
    targetWidth = Math.max(1, Math.round(sourceWidth * scale));
    targetHeight = Math.max(1, Math.round(sourceHeight * scale));
  } else if (keepAspectRatio) {
    const aspectRatio = sourceWidth / sourceHeight;

    if (width && !height) {
      targetHeight = Math.max(1, Math.round(width / aspectRatio));
    } else if (!width && height) {
      targetWidth = Math.max(1, Math.round(height * aspectRatio));
    } else if (!width && !height) {
      targetWidth = sourceWidth;
      targetHeight = sourceHeight;
    }
  }

  if (noUpscale) {
    targetWidth = Math.min(targetWidth, sourceWidth);
    targetHeight = Math.min(targetHeight, sourceHeight);

    if (keepAspectRatio && mode === "dimensions") {
      const widthScale = targetWidth / sourceWidth;
      const heightScale = targetHeight / sourceHeight;
      const scale = Math.min(widthScale || 1, heightScale || 1, 1);
      targetWidth = Math.max(1, Math.round(sourceWidth * scale));
      targetHeight = Math.max(1, Math.round(sourceHeight * scale));
    }
  }

  return {
    width: Math.max(1, targetWidth),
    height: Math.max(1, targetHeight),
  };
}

export async function resizeImage({
  selectedImage,
  width,
  height,
  type,
  quality,
  suffix,
  mode = "stretch",
}: {
  selectedImage: SelectedImage;
  width: number;
  height: number;
  type: ImageOutputFormat;
  quality?: number;
  suffix?: string;
  mode?: ResizeMode;
}): Promise<ProcessedImageResult> {
  validateSvgOutputEligibility(selectedImage, type);

  if (isSvgFormat(type)) {
    return exportResizedSvg({
      selectedImage,
      width,
      height,
      suffix,
    });
  }

  const rasterType = ensureRasterOutputType(type);
  const image = await loadImageElement(selectedImage.file);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  if (rasterType === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  } else {
    context.clearRect(0, 0, width, height);
  }

  if (mode === "stretch") {
    context.drawImage(image, 0, 0, width, height);
  } else {
    const sourceRatio = image.width / image.height;
    const targetRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (mode === "contain") {
      if (sourceRatio > targetRatio) {
        drawHeight = width / sourceRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * sourceRatio;
        offsetX = (width - drawWidth) / 2;
      }
    } else if (sourceRatio > targetRatio) {
      drawWidth = height * sourceRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / sourceRatio;
      offsetY = (height - drawHeight) / 2;
    }

    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  return exportCanvasResult({
    canvas,
    type: rasterType,
    quality,
    width,
    height,
    originalFilename: selectedImage.file.name,
    suffix,
  });
}
