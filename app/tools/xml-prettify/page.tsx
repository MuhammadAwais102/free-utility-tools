import { XmlPrettifyClient } from "@/components/tools/data/xml-prettify-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("xml-prettify");

export default function XmlPrettifyPage() {
  return <XmlPrettifyClient />;
}
