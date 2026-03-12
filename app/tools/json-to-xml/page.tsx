import { JsonToXmlClient } from "@/components/tools/data/json-to-xml-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("json-to-xml");

export default function JsonToXmlPage() {
  return <JsonToXmlClient />;
}
