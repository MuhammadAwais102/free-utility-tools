import { XmlToJsonClient } from "@/components/tools/data/xml-to-json-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("xml-to-json");

export default function XmlToJsonPage() {
  return (
    <ToolPageShell slug="xml-to-json">
      <XmlToJsonClient />
    </ToolPageShell>
  );
}
