import { createToolMetadata } from "@/lib/site";
import { ImageResizerClient } from "@/components/tools/image/image-resizer-client";

export const metadata = createToolMetadata("image-resizer");

export default function ImageResizerPage() {
  return <ImageResizerClient />;
}
