"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/shared/tool-card";
import { Input } from "@/components/ui/input";
import type { ToolDefinition } from "@/lib/site";

export function ToolBrowser({ tools }: { tools: ToolDefinition[] }) {
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return tools;
    }

    return tools.filter((tool) =>
      [tool.name, tool.description, tool.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [query, tools]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--color-border)] bg-white/90 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[var(--color-foreground)]">
            All Tools
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted-foreground)]">
            Search by tool name, category, or use case to quickly find the utility you need.
          </p>
        </div>
        <div className="w-full sm:max-w-sm">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="bg-[var(--color-surface)]"
          />
        </div>
      </div>

      {filteredTools.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching tools"
          description="Try a broader search like image, pdf, or thumbnail to see available tools."
        />
      )}
    </div>
  );
}
