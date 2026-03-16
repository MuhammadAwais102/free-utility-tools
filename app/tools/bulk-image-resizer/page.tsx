import { BulkImageResizerClient } from "@/components/tools/image/bulk-image-resizer-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("bulk-image-resizer");

export default function BulkImageResizerPage() {
  return (
    <ToolPageShell slug="bulk-image-resizer">
      <BulkImageResizerClient />
    </ToolPageShell>
  );
}
