import { PdfToJpgClient } from "@/components/tools/pdf/pdf-to-jpg-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("pdf-to-jpg");

export default function PdfToJpgPage() {
  return (
    <ToolPageShell slug="pdf-to-jpg">
      <PdfToJpgClient />
    </ToolPageShell>
  );
}
