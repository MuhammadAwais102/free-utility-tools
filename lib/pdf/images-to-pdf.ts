import { PDFDocument } from "pdf-lib";

async function loadImageSize(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error(`Failed to load ${file.name}.`));
    });

    return { width: image.width, height: image.height };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function convertImageToPngBytes(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error(`Failed to load ${file.name}.`));
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas is not available in this browser.");
    }

    context.drawImage(image, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) {
          reject(new Error(`Failed to convert ${file.name}.`));
          return;
        }

        resolve(result);
      }, "image/png");
    });

    return blob.arrayBuffer();
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export async function imagesToPdf(files: File[]) {
  const pdf = await PDFDocument.create();

  for (const file of files) {
    const bytes =
      file.type === "image/webp" ? await convertImageToPngBytes(file) : await file.arrayBuffer();
    const dimensions = await loadImageSize(file);
    const embeddedImage =
      file.type === "image/png" || file.type === "image/webp"
        ? await pdf.embedPng(bytes)
        : await pdf.embedJpg(bytes);
    const page = pdf.addPage([dimensions.width, dimensions.height]);

    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: dimensions.width,
      height: dimensions.height,
    });
  }

  const pdfBytes = await pdf.save();
  return new Blob([new Uint8Array(pdfBytes).buffer], { type: "application/pdf" });
}
