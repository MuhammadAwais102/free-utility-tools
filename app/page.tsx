import type { Metadata } from "next";
import { HomeCta } from "@/components/shared/home-cta";
import { HomeFeatures } from "@/components/shared/home-features";
import { HomeHero } from "@/components/shared/home-hero";
import { ToolBrowser } from "@/components/shared/tool-browser";
import { siteDescription, tools } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Utility Tools",
  description: siteDescription,
};

export default function HomePage() {
  return (
    <div className="space-y-10 pb-6 sm:space-y-14">
      <HomeHero />

      <section id="tools" className="scroll-mt-28 space-y-6">
        <ToolBrowser tools={tools} />
      </section>

      <HomeFeatures />
      <HomeCta />
    </div>
  );
}
