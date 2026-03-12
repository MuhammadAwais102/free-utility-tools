import { resizeImage } from "@/lib/image/resize-image";
import {
  getDefaultOutputFormat,
  getImageFormatLabel,
  isSvgFormat,
  outputFormatSupportsQuality,
} from "@/lib/image/output-format";
import { exportOptimizedSvg, isSvgFile } from "@/lib/image/svg";
import type {
  ImageCompressionOutputFormat,
  ProcessedImageResult,
  SelectedImage,
} from "@/types/image";

export function getDefaultCompressionOutputFormat(file: File): ImageCompressionOutputFormat {
  if (isSvgFile(file)) {
    return "image/svg+xml";
  }

  if (file.type === "image/png" || file.type === "image/webp") {
    return "image/webp";
  }

  return getDefaultOutputFormat(file);
}

export function canCompressToFormat(file: File, format: ImageCompressionOutputFormat) {
  if (isSvgFormat(format)) {
    return isSvgFile(file);
  }

  return true;
}

export function getCompressionFormatHelpText(
  file: File | null,
  format: ImageCompressionOutputFormat,
) {
  if (!file) {
    return "Choose an output format, then export a browser-generated compressed file.";
  }

  if (isSvgFormat(format)) {
    return isSvgFile(file)
      ? "SVG optimization removes comments, metadata, and extra whitespace while keeping the file as true SVG."
      : "SVG output is only supported for SVG uploads. Raster images are not converted to true vector SVG.";
  }

  if (isSvgFile(file)) {
    return `This rasterizes the uploaded SVG to ${getImageFormatLabel(format)} using browser rendering.`;
  }

  if (format === "image/png") {
    return "PNG export is lossless. The quality slider is hidden because browsers do not use quality the same way for PNG output.";
  }

  if (format === "image/jpeg") {
    return "JPEG compression uses the quality slider. Transparent areas are flattened against a white background.";
  }

  return "WebP compression uses the quality slider and usually provides strong file-size reduction for browser-generated output.";
}

export async function compressImage({
  selectedImage,
  quality,
  outputFormat,
}: {
  selectedImage: SelectedImage;
  quality: number;
  outputFormat: ImageCompressionOutputFormat;
}): Promise<ProcessedImageResult> {
  if (!canCompressToFormat(selectedImage.file, outputFormat)) {
    throw new Error("SVG output is only supported for SVG uploads.");
  }

  if (isSvgFormat(outputFormat)) {
    return exportOptimizedSvg({
      selectedImage,
      suffix: "compressed",
    });
  }

  return resizeImage({
    selectedImage,
    width: selectedImage.width,
    height: selectedImage.height,
    type: outputFormat,
    quality: outputFormatSupportsQuality(outputFormat) ? quality : undefined,
    suffix: "compressed",
  });
}
