import { createToolMetadata } from "@/lib/site";
import { ImageCompressorClient } from "@/components/tools/image/image-compressor-client";

export const metadata = createToolMetadata("image-compressor");

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
