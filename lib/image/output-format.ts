import { getBaseName } from "@/lib/file";
import type {
  ImageOutputFormat,
  RasterImageFormat,
  SelectedImage,
  VectorImageFormat,
} from "@/types/image";

export const RASTER_IMAGE_FORMATS: RasterImageFormat[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const IMAGE_OUTPUT_FORMATS: ImageOutputFormat[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
];

export const IMAGE_INPUT_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
] as const;

export const imageFormatLabels: Record<ImageOutputFormat, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG / JPEG",
  "image/webp": "WebP",
  "image/svg+xml": "SVG",
};

export const imageFormatExtensions: Record<ImageOutputFormat, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

export function isRasterFormat(format: ImageOutputFormat): format is RasterImageFormat {
  return RASTER_IMAGE_FORMATS.includes(format as RasterImageFormat);
}

export function isSvgFormat(format: string): format is VectorImageFormat {
  return format === "image/svg+xml";
}

export function getImageFormatLabel(format: string) {
  if (isSvgFormat(format) || isRasterFormat(format as ImageOutputFormat)) {
    return imageFormatLabels[format as ImageOutputFormat];
  }

  return format;
}

export function getImageExtension(format: ImageOutputFormat) {
  return imageFormatExtensions[format];
}

export function buildImageFilename({
  originalFilename,
  format,
  suffix,
}: {
  originalFilename: string;
  format: ImageOutputFormat;
  suffix?: string;
}) {
  const baseName = getBaseName(originalFilename);
  const extension = getImageExtension(format);
  return `${baseName}${suffix ? `-${suffix}` : ""}.${extension}`;
}

export function outputFormatSupportsQuality(format: ImageOutputFormat) {
  return format === "image/jpeg" || format === "image/webp";
}

export function isSvgSelectedImage(selectedImage: SelectedImage | null) {
  return Boolean(selectedImage && isSvgFormat(selectedImage.file.type));
}

export function canUseSvgOutput(selectedImage: SelectedImage | null) {
  return isSvgSelectedImage(selectedImage);
}

export function getDefaultRasterOutputFormat(file: File): RasterImageFormat {
  if (file.type === "image/png") {
    return "image/png";
  }

  if (file.type === "image/webp") {
    return "image/webp";
  }

  return "image/jpeg";
}

export function getDefaultOutputFormat(file: File): ImageOutputFormat {
  if (isSvgFormat(file.type)) {
    return "image/svg+xml";
  }

  return getDefaultRasterOutputFormat(file);
}
