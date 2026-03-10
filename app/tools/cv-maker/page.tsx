import { CvMakerClient } from "@/components/tools/cv/cv-maker-client";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("cv-maker");

export default function CvMakerPage() {
  return <CvMakerClient />;
}
