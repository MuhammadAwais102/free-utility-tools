import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { CheckCircle2, Search, Shield, Zap } from "lucide-react";
import { CategoryIcon, CategoryIconFrame } from "@/components/shared/tool-icon";
import {
  getCategoryCount,
  getCategoryKey,
  siteName,
  toolCategoryOrder,
  toolCategoryLabels,
} from "@/lib/site";
import { formatNumber } from "@/lib/utils";

const heroCardAnimationClasses = [
  "animate-float",
  "animate-float-delay-1",
  "animate-float-delay-2",
  "animate-float-delay-3",
] as const;

const featuredCategories = toolCategoryOrder.slice(0, 4);

export function HomeHero() {
  return (
    <section className="px-0 pb-16 pt-8 sm:pt-12 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 text-[13px] font-semibold text-cyan-700">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-cyan-600" />
            {formatNumber(getCategoryCount("all"))} Free Tools - No Signup Required
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-[-0.03em] text-[var(--color-foreground)] sm:text-5xl lg:text-[56px]">
            Everyday tools for
            <br className="hidden sm:block" />{" "}
            <span className="gradient-text">images, PDFs and data</span>
          </h1>

          <p className="mt-5 max-w-[560px] text-base leading-8 text-[var(--color-muted-foreground)] sm:text-[17px]">
            {siteName} gives you a fast, browser-first workspace for resizing images,
            converting files, editing PDFs, building CVs, and handling quick developer
            tasks without unnecessary friction.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#tools"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
            >
              <Search className="h-4 w-4" />
              Explore All Tools
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-5">
            <HeroTrust icon={Shield} label="Files stay in your browser" />
            <HeroTrust icon={Zap} label="Instant processing" />
            <HeroTrust icon={CheckCircle2} label="100% free, no limits" />
          </div>
        </div>

        <div className="grid max-w-[420px] grid-cols-2 gap-4 max-lg:mx-auto">
          {featuredCategories.map((category, index) => {
            const count = getCategoryCount(getCategoryKey(category));

            return (
              <Link
                key={category}
                href="/#tools"
                className={`${heroCardAnimationClasses[index]} rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-float)]`}
              >
                <CategoryIconFrame category={category}>
                  <CategoryIcon category={category} className="h-6 w-6" />
                </CategoryIconFrame>
                <p className="mt-3.5 text-[15px] font-bold text-[var(--color-foreground)]">
                  {toolCategoryLabels[getCategoryKey(category)]} Tools
                </p>
                <p className="mt-1 text-[13px] text-[var(--color-muted-foreground)]">
                  {formatNumber(count)} {count === 1 ? "tool" : "tools"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HeroTrust({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-muted-foreground)]">
      <Icon className="h-4 w-4 text-[var(--color-accent)]" />
      <span>{label}</span>
    </div>
  );
}
