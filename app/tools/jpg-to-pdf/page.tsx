import { JpgToPdfClient } from "@/components/tools/pdf/jpg-to-pdf-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("jpg-to-pdf");

export default function JpgToPdfPage() {
  return (
    <ToolPageShell slug="jpg-to-pdf">
      <JpgToPdfClient />
    </ToolPageShell>
  );
}
