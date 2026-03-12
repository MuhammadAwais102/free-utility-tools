import { GifResizerClient } from "@/components/tools/animation/gif-resizer-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("gif-resizer");

export default function GifResizerPage() {
  return <GifResizerClient />;
}
