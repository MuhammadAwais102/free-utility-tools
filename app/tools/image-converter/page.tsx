import { createToolMetadata } from "@/lib/site";
import { ImageConverterClient } from "@/components/tools/image/image-converter-client";

export const metadata = createToolMetadata("image-converter");

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
