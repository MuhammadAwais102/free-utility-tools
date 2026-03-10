"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function YoutubeUrlForm({
  value,
  onChange,
  onSubmit,
  onReset,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}) {
  return (
    <form
      className="rounded-[28px] border border-[var(--color-border)] bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste a YouTube URL: watch, youtu.be, shorts, or embed"
        />
        <div className="flex gap-3">
          <Button type="submit">Get thumbnails</Button>
          <Button variant="ghost" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
        Supported formats include `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/`, and `youtube.com/embed/`.
      </p>
    </form>
  );
}
