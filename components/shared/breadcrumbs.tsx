import Link from "next/link";
import type { ToolCategory } from "@/lib/site";

export function Breadcrumbs({
  category,
  toolName,
}: {
  category: ToolCategory;
  toolName: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted-foreground)]"
    >
      <Link href="/" className="transition hover:text-[var(--color-accent)]">
        Home
      </Link>
      <span aria-hidden="true">›</span>
      <Link href="/#tools" className="transition hover:text-[var(--color-accent)]">
        {category} Tools
      </Link>
      <span aria-hidden="true">›</span>
      <span className="font-medium text-[var(--color-foreground)]">{toolName}</span>
    </nav>
  );
}
