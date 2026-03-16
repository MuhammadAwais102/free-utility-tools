import { YoutubeThumbnailTool } from "@/components/tools/youtube/youtube-thumbnail-tool";
import { ToolPageShell } from "@/components/shared/tool-page-shell";
import { createToolMetadata } from "@/lib/site";

export const metadata = createToolMetadata("youtube-thumbnail-downloader");

export default function YoutubeThumbnailDownloaderPage() {
  return (
    <ToolPageShell slug="youtube-thumbnail-downloader">
      <YoutubeThumbnailTool />
    </ToolPageShell>
  );
}
