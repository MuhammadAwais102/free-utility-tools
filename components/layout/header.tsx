import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandIcon } from "@/components/shared/tool-icon";
import { navigationLinks, siteName } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(250,251,253,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-cyan-600 to-sky-400 text-white shadow-[var(--shadow-accent)]">
            <BrandIcon className="h-5 w-5" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[var(--color-foreground)] sm:text-lg">
            {siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition hover:bg-white hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#tools"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4.5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
          >
            Browse Tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
