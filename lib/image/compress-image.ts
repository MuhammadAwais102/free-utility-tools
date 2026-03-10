import { getBaseName } from "@/lib/file";
import { resizeImage } from "@/lib/image/resize-image";
import type { ProcessedImageResult, SelectedImage } from "@/types/image";

export async function compressImage({
  selectedImage,
  quality,
}: {
  selectedImage: SelectedImage;
  quality: number;
}): Promise<ProcessedImageResult> {
  const outputType =
    selectedImage.file.type === "image/png"
      ? "image/webp"
      : selectedImage.file.type === "image/webp"
        ? "image/webp"
        : "image/jpeg";

  const extension = outputType === "image/webp" ? "webp" : "jpg";

  return resizeImage({
    file: selectedImage.file,
    width: selectedImage.width,
    height: selectedImage.height,
    type: outputType,
    quality,
    filename: `${getBaseName(selectedImage.file.name)}-compressed.${extension}`,
  });
}
