import { BulkImageResizerClient } from "@/components/tools/image/bulk-image-resizer-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("bulk-image-resizer");

export default function BulkImageResizerPage() {
  return <BulkImageResizerClient />;
}
