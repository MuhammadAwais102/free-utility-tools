import { createToolMetadata } from "@/lib/site";
import { PdfMergeClient } from "@/components/tools/pdf/pdf-merge-client";

export const metadata = createToolMetadata("pdf-merge");

export default function PdfMergePage() {
  return <PdfMergeClient />;
}
