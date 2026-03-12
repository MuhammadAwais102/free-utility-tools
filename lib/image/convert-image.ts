import { resizeImage } from "@/lib/image/resize-image";
import {
  getDefaultOutputFormat,
  isSvgFormat,
} from "@/lib/image/output-format";
import { exportOptimizedSvg, isSvgFile } from "@/lib/image/svg";
import type { ImageOutputFormat, ProcessedImageResult, SelectedImage } from "@/types/image";

export function getDefaultConverterOutputFormat(file: File): ImageOutputFormat {
  return getDefaultOutputFormat(file);
}

export function canConvertToFormat(file: File, format: ImageOutputFormat) {
  if (isSvgFormat(format)) {
    return isSvgFile(file);
  }

  return true;
}

export async function convertImage({
  selectedImage,
  type,
}: {
  selectedImage: SelectedImage;
  type: ImageOutputFormat;
}): Promise<ProcessedImageResult> {
  if (!canConvertToFormat(selectedImage.file, type)) {
    throw new Error("SVG output is only supported for uploaded SVG files.");
  }

  if (isSvgFormat(type)) {
    return exportOptimizedSvg({
      selectedImage,
    });
  }

  return resizeImage({
    selectedImage,
    width: selectedImage.width,
    height: selectedImage.height,
    type,
    quality: type === "image/png" ? undefined : 0.92,
  });
}
