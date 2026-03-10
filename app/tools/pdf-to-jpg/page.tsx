import { createToolMetadata } from "@/lib/site";
import { PdfToJpgClient } from "@/components/tools/pdf/pdf-to-jpg-client";

export const metadata = createToolMetadata("pdf-to-jpg");

export default function PdfToJpgPage() {
  return <PdfToJpgClient />;
}
