import { JsonToXmlClient } from "@/components/tools/data/json-to-xml-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("json-to-xml");

export default function JsonToXmlPage() {
  return (
    <ToolPageShell slug="json-to-xml">
      <JsonToXmlClient />
    </ToolPageShell>
  );
}
