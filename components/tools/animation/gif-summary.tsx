import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import type { AnimationInputMetadata, AnimationResultState } from "@/types/animation";

function formatDuration(duration: number) {
  return `${(duration / 1000).toFixed(2)}s`;
}

export function GifSummary({
  original,
  result,
}: {
  original: AnimationInputMetadata;
  result: AnimationResultState | null;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Original</p>
        <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">{original.width} x {original.height}</p>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{formatBytes(original.size)}</p>
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Frames</p>
        <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">{original.frameCount}</p>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{original.isAnimated ? "Animated GIF" : "Single frame"}</p>
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Duration</p>
        <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">{formatDuration(original.totalDuration)}</p>
        {result ? (
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Output: {formatDuration(result.totalDuration)}
          </p>
        ) : null}
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Output</p>
        {result ? (
          <>
            <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">{result.width} x {result.height}</p>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{formatBytes(result.size)}</p>
          </>
        ) : (
          <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">Export to preview the final GIF.</p>
        )}
      </Card>
    </div>
  );
}
