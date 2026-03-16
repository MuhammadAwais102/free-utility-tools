import { ImageCompressorClient } from "@/components/tools/image/image-compressor-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("image-compressor");

export default function ImageCompressorPage() {
  return (
    <ToolPageShell slug="image-compressor">
      <ImageCompressorClient />
    </ToolPageShell>
  );
}
