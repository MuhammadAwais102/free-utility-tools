import { createToolMetadata } from "@/lib/site";
import { PdfSplitClient } from "@/components/tools/pdf/pdf-split-client";

export const metadata = createToolMetadata("pdf-split");

export default function PdfSplitPage() {
  return <PdfSplitClient />;
}
