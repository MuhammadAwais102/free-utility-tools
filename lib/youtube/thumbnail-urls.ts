import type { ThumbnailVariant } from "@/types/youtube";

export function buildThumbnailUrls(videoId: string): ThumbnailVariant[] {
  return [
    {
      label: "Max Resolution",
      filename: `${videoId}-maxresdefault.jpg`,
      url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    },
    {
      label: "High Quality",
      filename: `${videoId}-hqdefault.jpg`,
      url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    },
    {
      label: "Medium Quality",
      filename: `${videoId}-mqdefault.jpg`,
      url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    },
    {
      label: "Standard Definition",
      filename: `${videoId}-sddefault.jpg`,
      url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    },
    {
      label: "Default",
      filename: `${videoId}-default.jpg`,
      url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
    },
  ];
}
