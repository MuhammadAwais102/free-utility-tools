import { GifConverterClient } from "@/components/tools/animation/gif-converter-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("gif-converter");

export default function GifConverterPage() {
  return <GifConverterClient />;
}
