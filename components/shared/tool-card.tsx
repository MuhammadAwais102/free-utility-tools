import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CategoryIconFrame,
  ToolIcon,
  getCategoryBadgeClass,
} from "@/components/shared/tool-icon";
import type { ToolDefinition } from "@/lib/site";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={tool.href}
      className="tool-card-hover group block rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={`${getCategoryBadgeClass(tool.category)} inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em]`}
        >
          {tool.category}
        </span>
        <span className="tool-arrow-icon text-[var(--color-light-foreground)] transition duration-200">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>

      <CategoryIconFrame category={tool.category} className="mt-5">
        <ToolIcon tool={tool} className="h-6 w-6" />
      </CategoryIconFrame>

      <h3 className="mt-4 text-lg font-bold tracking-[-0.01em] text-[var(--color-foreground)]">
        {tool.name}
      </h3>
      <p className="mt-2 text-sm leading-7 text-[var(--color-muted-foreground)]">
        {tool.description}
      </p>
    </Link>
  );
}
