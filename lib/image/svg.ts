import {
  buildImageFilename,
  isSvgFormat,
} from "@/lib/image/output-format";
import type { ProcessedImageResult, SelectedImage } from "@/types/image";

export function isSvgFile(file: File) {
  return isSvgFormat(file.type);
}

export async function readSvgText(file: File) {
  if (!isSvgFile(file)) {
    throw new Error("This file is not an SVG image.");
  }

  return file.text();
}

export function optimizeSvgMarkup(markup: string) {
  const withoutComments = markup.replace(/<!--[\s\S]*?-->/g, "");
  const withoutMetadata = withoutComments
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<desc[\s\S]*?<\/desc>/gi, "");

  return withoutMetadata.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
}

function parseSvgMarkup(markup: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(markup, "image/svg+xml");
  const root = document.documentElement;

  if (!root || root.nodeName.toLowerCase() !== "svg") {
    throw new Error("The uploaded SVG could not be parsed.");
  }

  return { document, root };
}

export async function exportOptimizedSvg({
  selectedImage,
  suffix,
}: {
  selectedImage: SelectedImage;
  suffix?: string;
}): Promise<ProcessedImageResult> {
  const source = await readSvgText(selectedImage.file);
  const optimizedMarkup = optimizeSvgMarkup(source) || source.trim();
  const blob = new Blob([optimizedMarkup], { type: "image/svg+xml" });

  return {
    blob,
    dataUrl: selectedImage.previewUrl,
    filename: buildImageFilename({
      originalFilename: selectedImage.file.name,
      format: "image/svg+xml",
      suffix,
    }),
    width: selectedImage.width,
    height: selectedImage.height,
    size: blob.size,
    type: blob.type,
  };
}

export async function exportResizedSvg({
  selectedImage,
  width,
  height,
  suffix,
}: {
  selectedImage: SelectedImage;
  width: number;
  height: number;
  suffix?: string;
}): Promise<ProcessedImageResult> {
  const source = await readSvgText(selectedImage.file);
  const optimizedMarkup = optimizeSvgMarkup(source) || source.trim();
  const { root } = parseSvgMarkup(optimizedMarkup);

  root.setAttribute("width", String(width));
  root.setAttribute("height", String(height));

  if (!root.getAttribute("viewBox")) {
    root.setAttribute("viewBox", `0 0 ${selectedImage.width} ${selectedImage.height}`);
  }

  const markup = root.outerHTML;
  const blob = new Blob([markup], { type: "image/svg+xml" });

  return {
    blob,
    dataUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`,
    filename: buildImageFilename({
      originalFilename: selectedImage.file.name,
      format: "image/svg+xml",
      suffix,
    }),
    width,
    height,
    size: blob.size,
    type: blob.type,
  };
}
