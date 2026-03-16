import { PdfMergeClient } from "@/components/tools/pdf/pdf-merge-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("pdf-merge");

export default function PdfMergePage() {
  return (
    <ToolPageShell slug="pdf-merge">
      <PdfMergeClient />
    </ToolPageShell>
  );
}
