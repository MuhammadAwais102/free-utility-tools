import type { ReactNode } from "react";
import { JsonLd } from "@/components/shared/json-ld";
import { RelatedTools } from "@/components/shared/related-tools";
import { ToolErrorBoundary } from "@/components/shared/tool-error-boundary";
import { getToolBySlug, getToolUrl } from "@/lib/site";

export function ToolPageShell({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return children;
  }

  return (
    <div className="space-y-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: `${tool.name} - Free Utility Tools`,
          description: tool.description,
          url: getToolUrl(tool.slug),
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          browserRequirements: "Requires a modern web browser",
        }}
      />
      <ToolErrorBoundary>{children}</ToolErrorBoundary>
      <RelatedTools slug={tool.slug} />
    </div>
  );
}
