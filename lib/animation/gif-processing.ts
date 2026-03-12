import { decompressFrames, parseGIF } from "gifuct-js";
import type { ParsedFrame } from "gifuct-js";
import { applyPalette, GIFEncoder, quantize } from "gifenc";
import { loadImageElement } from "@/lib/image/export-image";
import { isSvgFormat } from "@/lib/image/output-format";
import {
  buildGifFilename,
  MAX_GIF_DIMENSION,
  MAX_GIF_FRAME_COUNT,
} from "@/lib/animation/gif-file";
import type {
  AnimationInputMetadata,
  AnimationResultState,
  AnimationSource,
  GifCropOptions,
  GifFrameData,
  GifResizeOptions,
  GifSpeedOptions,
} from "@/types/animation";

type ParsedGifFrame = ParsedFrame;

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  return { canvas, context };
}

function drawPatchFrame(
  context: CanvasRenderingContext2D,
  frame: ParsedGifFrame,
) {
  const imageData = new ImageData(
    new Uint8ClampedArray(frame.patch),
    frame.dims.width,
    frame.dims.height,
  );
  context.putImageData(imageData, frame.dims.left, frame.dims.top);
}

function renderGifFrames(
  frames: ParsedGifFrame[],
  width: number,
  height: number,
) {
  const { context } = createCanvas(width, height);
  const renderedFrames: GifFrameData[] = [];
  let restoreBuffer: ImageData | null = null;
  let previousFrame: ParsedGifFrame | null = null;

  frames.forEach((frame, index) => {
    if (previousFrame) {
      if (previousFrame.disposalType === 2) {
        context.clearRect(
          previousFrame.dims.left,
          previousFrame.dims.top,
          previousFrame.dims.width,
          previousFrame.dims.height,
        );
      } else if (previousFrame.disposalType === 3 && restoreBuffer) {
        context.putImageData(restoreBuffer, 0, 0);
      }
    }

    restoreBuffer =
      frame.disposalType === 3 ? context.getImageData(0, 0, width, height) : null;

    drawPatchFrame(context, frame);

    renderedFrames.push({
      index,
      width,
      height,
      delay: Math.max(frame.delay || 100, 20),
      rgba: context.getImageData(0, 0, width, height).data,
    });

    previousFrame = frame;
  });

  return renderedFrames;
}

function getTotalDuration(frames: GifFrameData[]) {
  return frames.reduce((total, frame) => total + frame.delay, 0);
}

function validateGifAnimationLimits(metadata: AnimationInputMetadata) {
  if (metadata.frameCount > MAX_GIF_FRAME_COUNT) {
    throw new Error(
      `This GIF has ${metadata.frameCount} frames. Please keep uploads at or below ${MAX_GIF_FRAME_COUNT} frames.`,
    );
  }

  if (metadata.width > MAX_GIF_DIMENSION || metadata.height > MAX_GIF_DIMENSION) {
    throw new Error(
      `GIF dimensions must stay at or below ${MAX_GIF_DIMENSION}px for safe browser processing.`,
    );
  }
}

function getCropRect(
  sourceWidth: number,
  sourceHeight: number,
  crop: GifCropOptions,
) {
  if (!crop.enabled) {
    return {
      x: 0,
      y: 0,
      width: sourceWidth,
      height: sourceHeight,
    };
  }

  const x = Math.max(0, Math.min(crop.x, sourceWidth - 1));
  const y = Math.max(0, Math.min(crop.y, sourceHeight - 1));
  const width = Math.max(1, Math.min(crop.width, sourceWidth - x));
  const height = Math.max(1, Math.min(crop.height, sourceHeight - y));

  return { x, y, width, height };
}

function transformFrameToRgba(
  frame: GifFrameData,
  resize: GifResizeOptions,
  crop: GifCropOptions,
) {
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = frame.width;
  sourceCanvas.height = frame.height;
  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });

  if (!sourceContext) {
    throw new Error("Canvas is not available in this browser.");
  }

  sourceContext.putImageData(
    new ImageData(new Uint8ClampedArray(frame.rgba), frame.width, frame.height),
    0,
    0,
  );

  const cropRect = getCropRect(frame.width, frame.height, crop);
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = resize.width;
  outputCanvas.height = resize.height;
  const outputContext = outputCanvas.getContext("2d", { willReadFrequently: true });

  if (!outputContext) {
    throw new Error("Canvas is not available in this browser.");
  }

  outputContext.clearRect(0, 0, resize.width, resize.height);
  outputContext.drawImage(
    sourceCanvas,
    cropRect.x,
    cropRect.y,
    cropRect.width,
    cropRect.height,
    0,
    0,
    resize.width,
    resize.height,
  );

  return outputContext.getImageData(0, 0, resize.width, resize.height).data;
}

function encodeGifFrames({
  frames,
  width,
  height,
}: {
  frames: GifFrameData[];
  width: number;
  height: number;
}) {
  const encoder = GIFEncoder();

  frames.forEach((frame, index) => {
    const palette = quantize(frame.rgba, 256);
    const indexBitmap = applyPalette(frame.rgba, palette);

    encoder.writeFrame(indexBitmap, width, height, {
      palette,
      delay: frame.delay,
      repeat: index === 0 ? 0 : undefined,
    });
  });

  encoder.finish();
  const safeBytes = Uint8Array.from(encoder.bytes());

  return new Blob([safeBytes], { type: "image/gif" });
}

export async function readGifAnimationSource(file: File): Promise<AnimationSource> {
  const buffer = await file.arrayBuffer();
  const parsed = parseGIF(buffer);
  const frames = decompressFrames(parsed, true) as ParsedFrame[];
  const renderedFrames = renderGifFrames(frames, parsed.lsd.width, parsed.lsd.height);
  const metadata: AnimationInputMetadata = {
    filename: file.name,
    mimeType: file.type,
    width: parsed.lsd.width,
    height: parsed.lsd.height,
    size: file.size,
    frameCount: renderedFrames.length,
    totalDuration: getTotalDuration(renderedFrames),
    isAnimated: renderedFrames.length > 1,
    kind: "gif",
  };

  validateGifAnimationLimits(metadata);

  return {
    metadata,
    frames: renderedFrames,
    previewUrl: URL.createObjectURL(file),
    file,
  };
}

export async function readStaticAnimationSource(file: File): Promise<AnimationSource> {
  const image = await loadImageElement(file);
  const { context } = createCanvas(image.width, image.height);

  context.clearRect(0, 0, image.width, image.height);
  context.drawImage(image, 0, 0, image.width, image.height);

  const metadata: AnimationInputMetadata = {
    filename: file.name,
    mimeType: file.type,
    width: image.width,
    height: image.height,
    size: file.size,
    frameCount: 1,
    totalDuration: 1000,
    isAnimated: false,
    kind: "image",
  };

  return {
    metadata,
    frames: [
      {
        index: 0,
        width: image.width,
        height: image.height,
        delay: 1000,
        rgba: context.getImageData(0, 0, image.width, image.height).data,
      },
    ],
    previewUrl: isSvgFormat(file.type)
      ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(await file.text())}`
      : URL.createObjectURL(file),
    file,
  };
}

export function releaseAnimationSource(source: AnimationSource | null) {
  if (!source || !source.previewUrl.startsWith("blob:")) {
    return;
  }

  URL.revokeObjectURL(source.previewUrl);
}

export function releaseAnimationResult(result: AnimationResultState | null) {
  if (!result || !result.dataUrl.startsWith("blob:")) {
    return;
  }

  URL.revokeObjectURL(result.dataUrl);
}

export async function transformAnimationToGif({
  source,
  resize,
  crop,
  speed,
  suffix,
}: {
  source: AnimationSource;
  resize: GifResizeOptions;
  crop: GifCropOptions;
  speed: GifSpeedOptions;
  suffix?: string;
}): Promise<AnimationResultState> {
  const transformedFrames = source.frames.map((frame) => ({
    ...frame,
    width: resize.width,
    height: resize.height,
    delay: Math.max(Math.round(frame.delay / speed.multiplier), 20),
    rgba: transformFrameToRgba(frame, resize, crop),
  }));

  const blob = encodeGifFrames({
    frames: transformedFrames,
    width: resize.width,
    height: resize.height,
  });
  const dataUrl = URL.createObjectURL(blob);

  return {
    blob,
    dataUrl,
    filename: buildGifFilename(source.file.name, suffix),
    type: blob.type,
    width: resize.width,
    height: resize.height,
    size: blob.size,
    frameCount: transformedFrames.length,
    totalDuration: getTotalDuration(transformedFrames),
  };
}
