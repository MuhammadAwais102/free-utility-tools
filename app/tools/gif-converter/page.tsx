import { GifConverterClient } from "@/components/tools/animation/gif-converter-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("gif-converter");

export default function GifConverterPage() {
  return (
    <ToolPageShell slug="gif-converter">
      <GifConverterClient />
    </ToolPageShell>
  );
}
