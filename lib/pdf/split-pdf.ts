import { getBaseName } from "@/lib/file";
import type { GeneratedFile } from "@/types/pdf";
import { PDFDocument } from "pdf-lib";

type SplitPdfOptions = {
  pageNumbers?: number[];
};

export async function getPdfPageCount(file: File) {
  const bytes = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(bytes);
  return sourcePdf.getPageCount();
}

export async function splitPdfFile(
  file: File,
  options: SplitPdfOptions = {},
): Promise<GeneratedFile[]> {
  const bytes = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(bytes);
  const generatedFiles: GeneratedFile[] = [];
  const baseName = getBaseName(file.name);
  const pageNumbers =
    options.pageNumbers ?? sourcePdf.getPageIndices().map((pageIndex) => pageIndex + 1);

  for (const pageNumber of pageNumbers) {
    const nextPdf = await PDFDocument.create();
    const [page] = await nextPdf.copyPages(sourcePdf, [pageNumber - 1]);
    nextPdf.addPage(page);
    const pageBytes = await nextPdf.save();

    generatedFiles.push({
      filename: `${baseName}-page-${pageNumber}.pdf`,
      blob: new Blob([new Uint8Array(pageBytes).buffer], { type: "application/pdf" }),
    });
  }

  return generatedFiles;
}
