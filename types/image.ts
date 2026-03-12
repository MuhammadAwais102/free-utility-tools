export type RasterImageFormat = "image/jpeg" | "image/png" | "image/webp";

export type VectorImageFormat = "image/svg+xml";

export type ImageOutputFormat = RasterImageFormat | VectorImageFormat;

export type ImageFormat = RasterImageFormat;

export type ImageCompressionOutputFormat = ImageOutputFormat;

export type ImageToolMode = "resize" | "compress" | "convert";

export type ResizeMode = "contain" | "cover" | "stretch";

export type ResizeValueMode = "dimensions" | "percentage";

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
