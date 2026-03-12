import { XmlToJsonClient } from "@/components/tools/data/xml-to-json-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("xml-to-json");

export default function XmlToJsonPage() {
  return <XmlToJsonClient />;
}
