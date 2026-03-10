import type { SelectedImage } from "@/types/image";

export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function isSupportedImageType(file: File) {
  return SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number]);
}

export function releaseSelectedImage(selectedImage: SelectedImage | null) {
  if (selectedImage) {
    URL.revokeObjectURL(selectedImage.previewUrl);
  }
}
