import { PdfSplitClient } from "@/components/tools/pdf/pdf-split-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("pdf-split");

export default function PdfSplitPage() {
  return (
    <ToolPageShell slug="pdf-split">
      <PdfSplitClient />
    </ToolPageShell>
  );
}
