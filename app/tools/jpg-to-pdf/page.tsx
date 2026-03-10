import { createToolMetadata } from "@/lib/site";
import { JpgToPdfClient } from "@/components/tools/pdf/jpg-to-pdf-client";

export const metadata = createToolMetadata("jpg-to-pdf");

export default function JpgToPdfPage() {
  return <JpgToPdfClient />;
}
