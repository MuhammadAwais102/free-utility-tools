const benefits = [
  {
    title: "Browser-first processing",
    description: "Many tools can run locally in the browser, which keeps the experience fast and reduces file handling overhead.",
  },
  {
    title: "Simple, focused workflows",
    description: "Each utility is designed to do one job well, with a lightweight interface that is easy to extend later.",
  },
  {
    title: "Built for easy deployment",
    description: "The structure stays close to standard Next.js conventions, so local development and future hosting stay straightforward.",
  },
];

export function BenefitsSection() {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Why use it
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--color-foreground)]">
          Clean utilities with practical benefits.
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--color-muted-foreground)]">
          The homepage is designed to build trust quickly and help users jump straight into the right tool without clutter.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-[28px] border border-[var(--color-border)] bg-white/90 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.05)]"
          >
            <h3 className="text-lg font-bold text-[var(--color-foreground)]">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted-foreground)]">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
