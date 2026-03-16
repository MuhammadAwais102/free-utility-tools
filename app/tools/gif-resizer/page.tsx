import { GifResizerClient } from "@/components/tools/animation/gif-resizer-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("gif-resizer");

export default function GifResizerPage() {
  return (
    <ToolPageShell slug="gif-resizer">
      <GifResizerClient />
    </ToolPageShell>
  );
}
