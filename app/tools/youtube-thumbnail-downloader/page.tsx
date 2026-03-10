import { createToolMetadata } from "@/lib/site";
import { YoutubeThumbnailTool } from "@/components/tools/youtube/youtube-thumbnail-tool";

export const metadata = createToolMetadata("youtube-thumbnail-downloader");

export default function YoutubeThumbnailDownloaderPage() {
  return <YoutubeThumbnailTool />;
}
