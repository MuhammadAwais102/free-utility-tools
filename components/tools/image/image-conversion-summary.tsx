import { Card } from "@/components/ui/card";

function formatLabel(type: string) {
  if (type === "image/jpeg") {
    return "JPG";
  }

  if (type === "image/png") {
    return "PNG";
  }

  if (type === "image/webp") {
    return "WebP";
  }

  return type;
}

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
          {formatLabel(originalType)}
        </p>
      </Card>
      <Card className="bg-white/95">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
          Output format
        </p>
        <p className="mt-3 text-xl font-bold text-[var(--color-foreground)]">
          {formatLabel(outputType)}
        </p>
      </Card>
    </div>
  );
}
