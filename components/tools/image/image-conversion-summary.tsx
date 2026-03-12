import { Card } from "@/components/ui/card";
import { getImageFormatLabel } from "@/lib/image/output-format";

export function ImageConversionSummary({
  originalType,
  outputType,
}: {
  originalType: string;
  outputType: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Original format
        </p>
        <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">
          {getImageFormatLabel(originalType)}
        </p>
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Output format
        </p>
        <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">
          {getImageFormatLabel(outputType)}
        </p>
      </Card>
    </div>
  );
}
