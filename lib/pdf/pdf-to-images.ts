import { getBaseName } from "@/lib/file";
import type { GeneratedFile } from "@/types/pdf";

export async function pdfToImages(file: File): Promise<GeneratedFile[]> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const bytes = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const outputFiles: GeneratedFile[] = [];
  const baseName = getBaseName(file.name);

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas is not available in this browser.");
    }

    await page.render({ canvas, canvasContext: context, viewport }).promise;
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error(`Failed to export page ${pageNumber}.`));
            return;
          }

          resolve(result);
        },
        "image/jpeg",
        0.92,
      );
    });

    outputFiles.push({
      filename: `${baseName}-page-${pageNumber}.jpg`,
      blob,
    });
  }

  return outputFiles;
}
