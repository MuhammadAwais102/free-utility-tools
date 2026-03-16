import { XmlPrettifyClient } from "@/components/tools/data/xml-prettify-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("xml-prettify");

export default function XmlPrettifyPage() {
  return (
    <ToolPageShell slug="xml-prettify">
      <XmlPrettifyClient />
    </ToolPageShell>
  );
}
