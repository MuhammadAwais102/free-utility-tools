import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { AnimationResultState, AnimationSource } from "@/types/animation";

export function GifPreview({
  source,
  result,
}: {
  source: AnimationSource;
  result: AnimationResultState | null;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Original
        </p>
        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[24px] bg-[var(--color-surface)]">
          <Image src={source.previewUrl} alt={source.file.name} fill className="object-contain p-4" unoptimized />
        </div>
      </Card>
      <Card>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Output
        </p>
        {result ? (
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[24px] bg-[var(--color-surface)]">
            <Image src={result.dataUrl} alt={result.filename} fill className="object-contain p-4" unoptimized />
          </div>
        ) : (
          <div className="mt-4 rounded-[24px] border border-dashed border-[var(--color-border)] px-4 py-12 text-sm text-[var(--color-muted-foreground)]">
            Process the file to preview the animated output here.
          </div>
        )}
      </Card>
    </div>
  );
}
