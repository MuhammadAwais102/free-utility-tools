import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ToolDefinition } from "@/lib/site";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <Card className="h-full border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,251,255,0.94))] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(14,116,144,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full bg-[var(--color-surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {tool.category}
          </span>
          <span className="text-lg text-[var(--color-muted-foreground)] transition group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
            →
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-[var(--color-foreground)]">{tool.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">{tool.description}</p>
      </Card>
    </Link>
  );
}
