export type PdfToolMode = "merge" | "split" | "images-to-pdf" | "pdf-to-images";

export type GeneratedFile = {
  filename: string;
  blob: Blob;
};
