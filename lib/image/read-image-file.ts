import type { SelectedImage } from "@/types/image";

export async function readImageFile(file: File): Promise<SelectedImage> {
  const previewUrl = URL.createObjectURL(file);

  try {
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.src = previewUrl;
      image.onload = () => resolve({ width: image.width, height: image.height });
      image.onerror = () => reject(new Error(`Failed to load ${file.name}.`));
    });

    return {
      file,
      previewUrl,
      width: dimensions.width,
      height: dimensions.height,
    };
  } catch (error) {
    URL.revokeObjectURL(previewUrl);
    throw error;
  }
}
