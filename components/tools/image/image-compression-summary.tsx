import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";

export function ImageCompressionSummary({
  originalSize,
  compressedSize,
}: {
  originalSize: number;
  compressedSize: number;
}) {
  const savedBytes = Math.max(originalSize - compressedSize, 0);
  const reduction =
    originalSize > 0 ? Math.max(((originalSize - compressedSize) / originalSize) * 100, 0) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Original</p>
        <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">{formatBytes(originalSize)}</p>
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Compressed</p>
        <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">{formatBytes(compressedSize)}</p>
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Reduction</p>
        <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">
          {reduction.toFixed(1)}%
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          {formatBytes(savedBytes)} saved
        </p>
      </Card>
    </div>
  );
}
