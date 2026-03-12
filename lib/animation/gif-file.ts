import { getBaseName } from "@/lib/file";
import type { AnimationConversionMode } from "@/types/animation";

export const SUPPORTED_GIF_MIME_TYPE = "image/gif";
export const SUPPORTED_GIF_CONVERTER_INPUTS = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
] as const;

export const MAX_GIF_FILE_SIZE_BYTES = 25 * 1024 * 1024;
export const MAX_GIF_FRAME_COUNT = 250;
export const MAX_GIF_DIMENSION = 4096;

export function isGifFile(file: File) {
  return file.type === SUPPORTED_GIF_MIME_TYPE;
}

export function isSupportedGifConverterInput(file: File) {
  return SUPPORTED_GIF_CONVERTER_INPUTS.includes(
    file.type as (typeof SUPPORTED_GIF_CONVERTER_INPUTS)[number],
  );
}

export function validateGifInputFile(file: File) {
  if (!isGifFile(file)) {
    return "Please upload a GIF file.";
  }

  if (file.size > MAX_GIF_FILE_SIZE_BYTES) {
    return "This GIF is too large for safe in-browser processing. Please keep files under 25 MB.";
  }

  return null;
}

export function buildGifFilename(originalFilename: string, suffix?: string) {
  const baseName = getBaseName(originalFilename);
  return `${baseName}${suffix ? `-${suffix}` : ""}.gif`;
}

export function getGifConverterMode(file: File): AnimationConversionMode {
  return isGifFile(file) ? "gif-to-gif" : "image-to-gif";
}
