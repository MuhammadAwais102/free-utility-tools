"use client";

import { useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { FileUpload } from "@/components/shared/file-upload";
import { PageHeader } from "@/components/shared/page-header";
import { PdfActions } from "@/components/tools/pdf/pdf-actions";
import { PdfFileList } from "@/components/tools/pdf/pdf-file-list";
import { PdfToJpgPreviewGrid } from "@/components/tools/pdf/pdf-to-jpg-preview-grid";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import { pdfToImages } from "@/lib/pdf/pdf-to-images";
import type { GeneratedFile } from "@/types/pdf";

export function PdfToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleProcess() {
    if (!file) {
      setError("Upload a PDF before converting.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setGeneratedFiles(await pdfToImages(file));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "PDF to JPG conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="PDF Tool"
        title="PDF to JPG"
        description="Upload a PDF and render each page into a downloadable JPG image directly in your browser."
      />

      <Card className="space-y-6">
        <FileUpload
          accept="application/pdf,.pdf"
          buttonText="Choose PDF"
          helpText="Upload a single PDF file to render each page as a JPG image."
          onFilesChange={(nextFiles) => {
            setFile(nextFiles[0] ?? null);
            setGeneratedFiles([]);
            setError(null);
          }}
        />
        <ErrorMessage message={error} />
        {file ? <PdfFileList files={[file]} /> : null}
        <PdfActions
          isProcessing={isProcessing}
          hasFiles={Boolean(file)}
          hasOutput={generatedFiles.length > 0}
          processLabel="Convert to JPG"
          downloadLabel={
            generatedFiles.length > 1
              ? `Download all (${generatedFiles.length})`
              : "Download result"
          }
          onProcess={handleProcess}
          onDownload={() =>
            generatedFiles.forEach((generatedFile) =>
              downloadBlob(generatedFile.blob, generatedFile.filename),
            )
          }
          onReset={() => {
            setFile(null);
            setGeneratedFiles([]);
            setError(null);
          }}
        />
      </Card>

      {generatedFiles.length ? (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-[var(--color-foreground)]">Rendered pages</h2>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Each PDF page has been converted into an individual JPG image.
            </p>
          </Card>
          <PdfToJpgPreviewGrid files={generatedFiles} />
        </div>
      ) : (
        <EmptyState
          title="No JPG pages yet"
          description="Upload a PDF and run the converter to render page previews and downloadable JPG files."
        />
      )}
    </div>
  );
}
