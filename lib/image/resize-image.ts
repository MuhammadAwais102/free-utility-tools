import type { ImageFormat, ProcessedImageResult, ResizeMode } from "@/types/image";

async function loadImage(file: File) {
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

async function canvasToBlob(canvas: HTMLCanvasElement, type: ImageFormat, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("The browser could not export the image."));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

export async function resizeImage({
  file,
  width,
  height,
  type,
  quality,
  filename,
  mode = "stretch",
}: {
  file: File;
  width: number;
  height: number;
  type: ImageFormat;
  quality?: number;
  filename: string;
  mode?: ResizeMode;
}): Promise<ProcessedImageResult> {
  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  if (type === "image/jpeg") {
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
    } else {
      if (sourceRatio > targetRatio) {
        drawWidth = height * sourceRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawHeight = width / sourceRatio;
        offsetY = (height - drawHeight) / 2;
      }
    }

    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  const blob = await canvasToBlob(canvas, type, quality);

  return {
    blob,
    dataUrl: canvas.toDataURL(type, quality),
    filename,
    width,
    height,
    size: blob.size,
    type: blob.type,
  };
}
