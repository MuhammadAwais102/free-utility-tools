import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryCount } from "@/lib/site";
import { formatNumber } from "@/lib/utils";

export function HomeCta() {
  return (
    <section className="py-4 sm:py-8">
      <div className="cta-gradient rounded-[32px] px-6 py-14 text-center text-white shadow-[var(--shadow-accent-lg)] sm:px-8 sm:py-16">
        <h2 className="text-3xl font-black tracking-[-0.02em] sm:text-[32px]">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base opacity-90">
          Pick any tool below and start processing right away. The experience is
          designed to stay fast, simple, and easy to trust.
        </p>
        <Link
          href="/#tools"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-cyan-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50"
        >
          Browse All {formatNumber(getCategoryCount("all"))} Tools
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
