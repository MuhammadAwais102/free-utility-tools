import { ImageConverterClient } from "@/components/tools/image/image-converter-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("image-converter");

export default function ImageConverterPage() {
  return (
    <ToolPageShell slug="image-converter">
      <ImageConverterClient />
    </ToolPageShell>
  );
}
