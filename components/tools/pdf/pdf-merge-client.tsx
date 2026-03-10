"use client";

import { useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { FileUpload } from "@/components/shared/file-upload";
import { PageHeader } from "@/components/shared/page-header";
import { PdfActions } from "@/components/tools/pdf/pdf-actions";
import { PdfMergeFileList } from "@/components/tools/pdf/pdf-merge-file-list";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import { mergePdfFiles } from "@/lib/pdf/merge-pdf";
import { reorderItems } from "@/lib/utils";
import type { GeneratedFile } from "@/types/pdf";

const PDF_MIME_TYPE = "application/pdf";

export function PdfMergeClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [generatedFile, setGeneratedFile] = useState<GeneratedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFilesChange(nextFiles: File[]) {
    if (nextFiles.some((file) => file.type && file.type !== PDF_MIME_TYPE)) {
      setError("Only PDF files can be merged.");
      return;
    }

    setFiles(nextFiles);
    setGeneratedFile(null);
    setError(null);
  }

  async function handleProcess() {
    if (files.length < 2) {
      setError("Add at least two PDF files to merge.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const blob = await mergePdfFiles(files);
      setGeneratedFile({ filename: "merged.pdf", blob });
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "PDF merge failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="PDF Tool"
        title="PDF Merge"
        description="Upload multiple PDF files, arrange them in the order you want, and merge them into a single downloadable document in your browser."
      />

      <Card className="space-y-6">
        <FileUpload
          accept="application/pdf,.pdf"
          multiple
          buttonText="Choose PDFs"
          helpText="Upload two or more PDF files, then reorder them before merging."
          onFilesChange={handleFilesChange}
        />
        <ErrorMessage message={error} />
        {files.length ? (
          <PdfMergeFileList
            files={files}
            onMoveUp={(index) => {
              if (index === 0) {
                return;
              }

              setFiles((currentFiles) => reorderItems(currentFiles, index, index - 1));
              setGeneratedFile(null);
            }}
            onMoveDown={(index) => {
              if (index === files.length - 1) {
                return;
              }

              setFiles((currentFiles) => reorderItems(currentFiles, index, index + 1));
              setGeneratedFile(null);
            }}
            onRemove={(index) => {
              setFiles((currentFiles) => currentFiles.filter((_, itemIndex) => itemIndex !== index));
              setGeneratedFile(null);
            }}
          />
        ) : null}
        <PdfActions
          isProcessing={isProcessing}
          hasFiles={files.length > 0}
          hasOutput={Boolean(generatedFile)}
          processLabel="Merge PDFs"
          downloadLabel="Download merged PDF"
          onProcess={handleProcess}
          onDownload={() => generatedFile && downloadBlob(generatedFile.blob, generatedFile.filename)}
          onReset={() => {
            setFiles([]);
            setGeneratedFile(null);
            setError(null);
          }}
        />
      </Card>

      {generatedFile ? (
        <Card>
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">Merged file</h2>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-medium text-[var(--color-foreground)]">{generatedFile.filename}</p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Your PDFs have been combined in the selected order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => downloadBlob(generatedFile.blob, generatedFile.filename)}
              className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
            >
              Download
            </button>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No merged PDF yet"
          description="Upload at least two PDF files, arrange their order, and run the merge tool to create one downloadable PDF."
        />
      )}
    </div>
  );
}
