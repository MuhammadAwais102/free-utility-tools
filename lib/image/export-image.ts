import {
  buildImageFilename,
  canUseSvgOutput,
  getImageFormatLabel,
  isRasterFormat,
  isSvgFormat,
} from "@/lib/image/output-format";
import type {
  ImageOutputFormat,
  ProcessedImageResult,
  RasterImageFormat,
  SelectedImage,
} from "@/types/image";

export async function loadImageElement(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error(`Failed to load ${file.name}.`));
    });

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function canCanvasExportType(type: RasterImageFormat) {
  const canvas = document.createElement("canvas");
  const dataUrl = canvas.toDataURL(type);
  return dataUrl.startsWith(`data:${type}`);
}

export function validateActualExportType(
  requestedType: ImageOutputFormat,
  actualType: string,
) {
  if (requestedType !== actualType) {
    throw new Error(
      `The browser could not export a true ${getImageFormatLabel(requestedType)} file.`,
    );
  }
}

export async function exportCanvasToBlob(
  canvas: HTMLCanvasElement,
  type: RasterImageFormat,
  quality?: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("The browser could not export the image."));
          return;
        }

        try {
          validateActualExportType(type, blob.type);
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      },
      type,
      quality,
    );
  });
}

export async function exportCanvasResult({
  canvas,
  type,
  quality,
  width,
  height,
  originalFilename,
  suffix,
}: {
  canvas: HTMLCanvasElement;
  type: RasterImageFormat;
  quality?: number;
  width: number;
  height: number;
  originalFilename: string;
  suffix?: string;
}): Promise<ProcessedImageResult> {
  if (!canCanvasExportType(type)) {
    throw new Error(
      `${getImageFormatLabel(type)} export is not supported in this browser.`,
    );
  }

  const blob = await exportCanvasToBlob(canvas, type, quality);
  const actualType = blob.type as RasterImageFormat;

  return {
    blob,
    dataUrl: canvas.toDataURL(actualType, quality),
    filename: buildImageFilename({
      originalFilename,
      format: actualType,
      suffix,
    }),
    width,
    height,
    size: blob.size,
    type: actualType,
  };
}

export function validateSvgOutputEligibility(
  selectedImage: SelectedImage,
  requestedType: ImageOutputFormat,
) {
  if (isSvgFormat(requestedType) && !canUseSvgOutput(selectedImage)) {
    throw new Error("SVG output is only supported for uploaded SVG files.");
  }
}

export function ensureRasterOutputType(type: ImageOutputFormat): RasterImageFormat {
  if (!isRasterFormat(type)) {
    throw new Error("A raster image output format is required for canvas export.");
  }

  return type;
}
