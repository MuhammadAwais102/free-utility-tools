import { getBaseName } from "@/lib/file";
import { resizeImage } from "@/lib/image/resize-image";
import type { ImageFormat, ProcessedImageResult, SelectedImage } from "@/types/image";

const extensionMap: Record<ImageFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function convertImage({
  selectedImage,
  type,
}: {
  selectedImage: SelectedImage;
  type: ImageFormat;
}): Promise<ProcessedImageResult> {
  return resizeImage({
    file: selectedImage.file,
    width: selectedImage.width,
    height: selectedImage.height,
    type,
    quality: type === "image/png" ? undefined : 0.92,
    filename: `${getBaseName(selectedImage.file.name)}.${extensionMap[type]}`,
  });
}
