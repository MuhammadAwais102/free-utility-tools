import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { createStaticPageMetadata } from "@/lib/site";

export const metadata: Metadata = createStaticPageMetadata({
  title: "About",
  description:
    "Learn how Free Utility Tools is built for speed, privacy, and practical everyday work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="ABOUT"
        title="Free utility tools built for speed, privacy, and real work."
        description="Free Utility Tools is a browser-first platform designed to help everyday users and businesses complete useful tasks quickly, without ads, accounts, or unnecessary friction."
      />

      <Card className="space-y-5">
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          Most people waste time on repetitive digital tasks that should take seconds,
          not minutes. This platform is built to solve that with practical tools that
          are simple, fast, and easy to trust.
        </p>
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          What makes Free Utility Tools different is the focus on privacy and
          accessibility. The tools are free to use, designed to stay lightweight, and
          built so users can get work done without giving up their data.
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">
            The goal is straightforward
          </h2>
          <ul className="space-y-3 text-[var(--color-muted-foreground)]">
            <li>Provide useful tools that solve real everyday problems.</li>
            <li>Keep the experience clean and professional.</li>
            <li>Avoid unnecessary complexity, ads, and data collection.</li>
            <li>Make privacy-first processing the default whenever possible.</li>
          </ul>
        </Card>

        <Card className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">
            Who it is for
          </h2>
          <p className="leading-7 text-[var(--color-muted-foreground)]">
            The platform is useful for both everyday users and businesses. Whether
            someone needs to resize images, work with PDFs, format structured data, or
            use utility workflows that save time, the experience should feel fast,
            reliable, and practical.
          </p>
        </Card>
      </div>

      <Card className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">
          Built with a broader efficiency mindset
        </h2>
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          This project is also shaped by a broader focus on automation and efficiency.
          The same mindset behind AI automation systems, workflow design, and business
          process optimization also drives this platform: remove repetitive work,
          simplify operations, and create tools that genuinely save time.
        </p>
      </Card>
    </div>
  );
}
