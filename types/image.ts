export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export type ImageToolMode = "resize" | "compress" | "convert";

export type ResizeMode = "contain" | "cover" | "stretch";

export type ProcessedImageResult = {
  blob: Blob;
  dataUrl: string;
  filename: string;
  width: number;
  height: number;
  size: number;
  type: string;
};

export type SelectedImage = {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
};
