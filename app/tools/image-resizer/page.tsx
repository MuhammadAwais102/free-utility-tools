import { ImageResizerClient } from "@/components/tools/image/image-resizer-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("image-resizer");

export default function ImageResizerPage() {
  return (
    <ToolPageShell slug="image-resizer">
      <ImageResizerClient />
    </ToolPageShell>
  );
}
