import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedTools } from "@/lib/site";

export function RelatedTools({ slug }: { slug: string }) {
  const relatedTools = getRelatedTools(slug, 3);

  if (!relatedTools.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="max-w-2xl space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
          Related tools
        </p>
        <h2 className="text-2xl font-black tracking-tight text-[var(--color-foreground)]">
          You might also need
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted-foreground)]">
          Nearby tools from the same workflow can help you finish the next step faster.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {relatedTools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="group rounded-[28px] border border-[var(--color-border)] bg-white/90 p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-accent)]">
                {tool.category}
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--color-light-foreground)] transition group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-[-0.01em] text-[var(--color-foreground)]">
              {tool.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
