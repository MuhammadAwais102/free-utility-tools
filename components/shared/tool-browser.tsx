"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { CategoryIcon } from "@/components/shared/tool-icon";
import { ToolCard } from "@/components/shared/tool-card";
import { Input } from "@/components/ui/input";
import {
  getCategoryCount,
  getCategoryKey,
  toolCategoryLabels,
  toolCategoryOrder,
  type ToolCategoryKey,
  type ToolDefinition,
} from "@/lib/site";
import { cn, formatNumber } from "@/lib/utils";

const categories: ToolCategoryKey[] = [
  "all",
  ...toolCategoryOrder.map((category) => getCategoryKey(category)),
];

export function ToolBrowser({ tools }: { tools: ToolDefinition[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategoryKey>("all");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || getCategoryKey(tool.category) === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        [tool.name, tool.description, tool.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, tools]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 rounded-[32px] border border-[var(--color-border)] bg-white/95 p-6 shadow-[var(--shadow-card)] lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-[-0.02em] text-[var(--color-foreground)]">
            All Tools
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-[var(--color-muted-foreground)]">
            Browse every utility by category, or search by tool name, description, and
            use case to jump straight into the task you need.
          </p>
        </div>

        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-light-foreground)]" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="bg-[var(--color-surface)] pl-11"
          />
        </div>
      </div>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = getCategoryCount(category);
          const label = toolCategoryLabels[category];
          const countLabel = `${formatNumber(count)} ${count === 1 ? "tool" : "tools"}`;
          const categoryName = category === "all" ? null : toolCategoryOrder.find(
            (item) => getCategoryKey(item) === category,
          );

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--color-muted-foreground)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)]",
                isActive && "cat-tab-active",
              )}
            >
              {categoryName ? <CategoryIcon category={categoryName} className="h-3.5 w-3.5" /> : null}
              {label}
              <span
                className={cn(
                  "cat-count-pill rounded-full bg-[var(--color-surface)] px-2 py-px text-[11px] text-[var(--color-muted-foreground)]",
                  isActive && "bg-white/20 text-white",
                )}
              >
                {countLabel}
              </span>
            </button>
          );
        })}
      </div>

      {filteredTools.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tools match this search"
          description="Try a broader keyword or switch back to All to see the full tool collection."
        />
      )}
    </div>
  );
}
