"use client";

import { useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { FileUpload } from "@/components/shared/file-upload";
import { PageHeader } from "@/components/shared/page-header";
import { PdfFileList } from "@/components/tools/pdf/pdf-file-list";
import { PdfSplitControls } from "@/components/tools/pdf/pdf-split-controls";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import { getPdfPageCount, splitPdfFile } from "@/lib/pdf/split-pdf";
import { parsePageRange } from "@/lib/pdf/parse-page-range";
import type { GeneratedFile } from "@/types/pdf";

type SplitMode = "all" | "range";

export function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [splitMode, setSplitMode] = useState<SplitMode>("all");
  const [rangeValue, setRangeValue] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilesChange(nextFiles: File[]) {
    const nextFile = nextFiles[0];

    if (!nextFile) {
      return;
    }

    try {
      setError(null);
      setGeneratedFiles([]);
      setFile(nextFile);
      setRangeValue("");
      setSplitMode("all");
      setPageCount(await getPdfPageCount(nextFile));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the PDF.");
      setFile(null);
      setPageCount(null);
    }
  }

  async function handleProcess() {
    if (!file || !pageCount) {
      setError("Upload a PDF before splitting.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      if (splitMode === "all") {
        setGeneratedFiles(await splitPdfFile(file));
        return;
      }

      const parsed = parsePageRange(rangeValue, pageCount);
      if ("error" in parsed) {
        setError(parsed.error);
        setGeneratedFiles([]);
        return;
      }

      setGeneratedFiles(await splitPdfFile(file, { pageNumbers: parsed.pageNumbers }));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "PDF split failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="PDF Tool"
        title="PDF Split"
        description="Upload one PDF, review the page count, and either extract every page or split out a custom page range into separate PDF files."
      />

      <Card className="space-y-6">
        <FileUpload
          accept="application/pdf,.pdf"
          buttonText="Choose PDF"
          helpText="Upload a single PDF file to extract every page or a custom page range."
          onFilesChange={handleFilesChange}
        />
        <ErrorMessage message={error} />
        {file ? <PdfFileList files={[file]} /> : null}
        <PdfSplitControls
          totalPages={pageCount}
          splitMode={splitMode}
          rangeValue={rangeValue}
          isProcessing={isProcessing}
          hasFile={Boolean(file)}
          hasOutput={generatedFiles.length > 0}
          onSplitModeChange={(nextMode) => {
            setSplitMode(nextMode);
            setGeneratedFiles([]);
          }}
          onRangeValueChange={(nextValue) => {
            setRangeValue(nextValue);
            setGeneratedFiles([]);
          }}
          onProcess={handleProcess}
          onDownload={() => generatedFiles.forEach((generatedFile) => downloadBlob(generatedFile.blob, generatedFile.filename))}
          onReset={() => {
            setFile(null);
            setPageCount(null);
            setSplitMode("all");
            setRangeValue("");
            setGeneratedFiles([]);
            setError(null);
          }}
        />
      </Card>

      {generatedFiles.length ? (
        <Card>
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">Output files</h2>
          <ul className="mt-5 space-y-3">
            {generatedFiles.map((generatedFile) => (
              <li
                key={generatedFile.filename}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] px-4 py-3"
              >
                <span className="min-w-0 truncate font-medium text-[var(--color-foreground)]">
                  {generatedFile.filename}
                </span>
                <button
                  type="button"
                  onClick={() => downloadBlob(generatedFile.blob, generatedFile.filename)}
                  className="text-sm font-semibold text-[var(--color-accent)]"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <EmptyState
          title="No split files yet"
          description="Upload a PDF and choose whether to extract every page or only a custom page range."
        />
      )}
    </div>
  );
}
