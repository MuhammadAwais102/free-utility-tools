import Link from "next/link";
import { footerLinks, siteName } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/90">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-lg font-black tracking-tight text-[var(--color-foreground)]">{siteName}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">
            A clean utility tools foundation for common image, PDF, and media workflows, with a browser-first approach where possible.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-[var(--color-muted-foreground)] sm:items-start lg:items-end">
          <p className="font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground)]">
            Quick links
          </p>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--color-foreground)]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
