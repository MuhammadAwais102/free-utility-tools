export type AnimationOutputFormat = "image/gif";

export type AnimationConversionMode = "gif-to-gif" | "image-to-gif";

export type GifCropOptions = {
  enabled: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GifResizeOptions = {
  width: number;
  height: number;
};

export type GifSpeedOptions = {
  multiplier: number;
};

export type GifFrameData = {
  index: number;
  width: number;
  height: number;
  delay: number;
  rgba: Uint8ClampedArray;
};

export type AnimationInputMetadata = {
  filename: string;
  mimeType: string;
  width: number;
  height: number;
  size: number;
  frameCount: number;
  totalDuration: number;
  isAnimated: boolean;
  kind: "gif" | "image";
};

export type AnimationSource = {
  metadata: AnimationInputMetadata;
  frames: GifFrameData[];
  previewUrl: string;
  file: File;
};

export type AnimationResultState = {
  blob: Blob;
  dataUrl: string;
  filename: string;
  type: string;
  width: number;
  height: number;
  size: number;
  frameCount: number;
  totalDuration: number;
};
