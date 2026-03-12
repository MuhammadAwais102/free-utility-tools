import Link from "next/link";
import { BrandIcon } from "@/components/shared/tool-icon";
import { footerLinks, siteDescription, siteName } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/80 px-4 pt-12 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-sky-400 text-white shadow-[var(--shadow-accent)]">
              <BrandIcon className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[var(--color-foreground)]">
              {siteName}
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--color-muted-foreground)]">
            {siteDescription}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="mb-1 text-[13px] font-bold uppercase tracking-widest text-[var(--color-foreground)]">
            Explore
          </p>
          {footerLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-muted-foreground)] transition hover:text-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="mb-1 text-[13px] font-bold uppercase tracking-widest text-[var(--color-foreground)]">
            Legal
          </p>
          {footerLinks.slice(4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-muted-foreground)] transition hover:text-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1200px] border-t border-[var(--color-border)] py-5">
        <p className="text-[13px] text-[var(--color-light-foreground)]">
          Copyright 2026 {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
