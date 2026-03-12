import { IMAGE_INPUT_FORMATS, isSvgFormat } from "@/lib/image/output-format";
import type { SelectedImage } from "@/types/image";

export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function isSupportedImageType(file: File) {
  return SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number]);
}

export function isSupportedImageUpload(file: File, allowSvg = false) {
  if (allowSvg) {
    return IMAGE_INPUT_FORMATS.includes(file.type as (typeof IMAGE_INPUT_FORMATS)[number]);
  }

  return isSupportedImageType(file);
}

export function isSvgUpload(file: File) {
  return isSvgFormat(file.type);
}

export function releaseSelectedImage(selectedImage: SelectedImage | null) {
  if (selectedImage) {
    URL.revokeObjectURL(selectedImage.previewUrl);
  }
}
