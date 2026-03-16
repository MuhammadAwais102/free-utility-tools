import type { Metadata } from "next";
import { HomeCta } from "@/components/shared/home-cta";
import { HomeFeatures } from "@/components/shared/home-features";
import { HomeHero } from "@/components/shared/home-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { ToolBrowser } from "@/components/shared/tool-browser";
import { createHomeMetadata, siteConfig, tools } from "@/lib/site";

export const metadata: Metadata = createHomeMetadata();

export default function HomePage() {
  return (
    <div className="space-y-10 pb-6 sm:space-y-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />
      <HomeHero />

      <section id="tools" className="scroll-mt-28 space-y-6">
        <ToolBrowser tools={tools} />
      </section>

      <HomeFeatures />
      <HomeCta />
    </div>
  );
}
