import type { Metadata } from "next";
import { BenefitsSection } from "@/components/shared/benefits-section";
import { Card } from "@/components/ui/card";
import { ToolBrowser } from "@/components/shared/tool-browser";
import { siteDescription, tools } from "@/lib/site";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Online Utility Tools",
  description: siteDescription,
};

export default function HomePage() {
  return (
    <div className="space-y-16 pb-6">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Card className="overflow-hidden border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(217,241,238,0.96))] px-7 py-8 sm:px-10 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Free Utility Tools
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            Fast everyday tools for images, PDFs, and quick downloads.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted-foreground)] sm:text-lg">
            Use a clean, lightweight toolkit for resizing images, converting files, merging PDFs, and grabbing YouTube thumbnails without unnecessary friction.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#tools"
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(14,116,144,0.22)] transition hover:bg-[var(--color-accent-strong)]"
            >
              Explore tools
            </a>
            <a
              href="/about"
              className="rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Learn more
            </a>
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <Card className="bg-white/95">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Available tools</p>
            <p className="mt-3 text-4xl font-black">{formatNumber(tools.length)}</p>
          </Card>
          <Card className="bg-white/95">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Experience</p>
            <p className="mt-3 text-xl font-bold">Responsive and simple</p>
          </Card>
          <Card className="bg-white/95">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">Trust signal</p>
            <p className="mt-3 text-xl font-bold">Minimal, focused tooling</p>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,255,0.92))]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Clear workflow</p>
          <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">
            Open a tool, upload a file, and finish the task quickly.
          </p>
        </Card>
        <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,255,0.92))]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Expandable base</p>
          <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">
            Reusable components keep future tools easy to add without clutter.
          </p>
        </Card>
        <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,250,255,0.92))]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Modern shell</p>
          <p className="mt-3 text-lg font-bold text-[var(--color-foreground)]">
            A lightweight UI that works well on mobile, tablet, and desktop.
          </p>
        </Card>
      </section>

      <section id="tools" className="space-y-6 scroll-mt-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight">Popular Tools</h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-muted-foreground)]">
            Browse the current tool set and use search to narrow the homepage cards instantly.
          </p>
        </div>
        <ToolBrowser tools={tools} />
      </section>

      <BenefitsSection />
    </div>
  );
}
