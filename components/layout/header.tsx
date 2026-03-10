import Link from "next/link";
import { navigationLinks, siteName } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-[rgba(247,251,255,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-[var(--color-foreground)]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-accent),#38bdf8)] text-sm font-black text-white shadow-[0_12px_30px_rgba(14,116,144,0.28)]">
            FT
          </span>
          <span className="text-lg font-black tracking-tight">{siteName}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-[var(--color-muted-foreground)]">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#tools"
            className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-white shadow-[0_10px_30px_rgba(14,116,144,0.22)] transition hover:bg-[var(--color-accent-strong)]"
          >
            Browse Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}
