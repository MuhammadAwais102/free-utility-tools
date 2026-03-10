"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { PageHeader } from "@/components/shared/page-header";
import { ThumbnailGrid } from "@/components/tools/youtube/thumbnail-grid";
import { YoutubeUrlForm } from "@/components/tools/youtube/youtube-url-form";
import { buildThumbnailUrls } from "@/lib/youtube/thumbnail-urls";
import { extractVideoId } from "@/lib/youtube/extract-video-id";
import type { ThumbnailVariant } from "@/types/youtube";

export function YoutubeThumbnailTool() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<ThumbnailVariant[]>([]);
  const [videoId, setVideoId] = useState<string | null>(null);

  function handleSubmit() {
    const videoId = extractVideoId(value);

    if (!videoId) {
      setError("Enter a valid YouTube URL in a supported format.");
      setVideoId(null);
      setThumbnails([]);
      return;
    }

    setError(null);
    setVideoId(videoId);
    setThumbnails(buildThumbnailUrls(videoId));
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Video Tool"
        title="YouTube Thumbnail Downloader"
        description="Extract thumbnail URLs from a public YouTube video without relying on a server-side proxy."
      />
      <YoutubeUrlForm
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        onReset={() => {
          setValue("");
          setError(null);
          setVideoId(null);
          setThumbnails([]);
        }}
      />
      <ErrorMessage message={error} />
      {thumbnails.length ? (
        <div className="space-y-6">
          <Card className="bg-white/95">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              Video ID
            </p>
            <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">{videoId}</p>
          </Card>
          <ThumbnailGrid thumbnails={thumbnails} />
        </div>
      ) : (
        <EmptyState
          title="No thumbnails loaded yet"
          description="Paste a YouTube URL above to get direct links for the common thumbnail sizes."
        />
      )}
    </div>
  );
}
