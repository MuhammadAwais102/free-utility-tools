import { CvMakerClient } from "@/components/tools/cv/cv-maker-client";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("cv-maker");

export default function CvMakerPage() {
  return (
    <ToolPageShell slug="cv-maker">
      <CvMakerClient />
    </ToolPageShell>
  );
}
