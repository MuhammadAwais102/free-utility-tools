import { MonitorSmartphone, Shield, Smile, Zap } from "lucide-react";

const features = [
  {
    title: "Privacy First",
    description:
      "Many tools process files in your browser, which keeps common workflows fast and reduces unnecessary file handling.",
    icon: Shield,
    iconBg: "icon-bg-image",
  },
  {
    title: "Instant Results",
    description:
      "Open a tool, complete the task, and move on quickly with focused interfaces and lightweight interactions.",
    icon: Zap,
    iconBg: "icon-bg-animation",
  },
  {
    title: "Zero Friction",
    description:
      "No accounts, no distracting upsells, and no confusing setup. The experience stays simple and direct.",
    icon: Smile,
    iconBg: "icon-bg-data",
  },
  {
    title: "Works Everywhere",
    description:
      "The layout is tuned for desktop and mobile so tool discovery and quick tasks stay comfortable on any screen.",
    icon: MonitorSmartphone,
    iconBg: "icon-bg-career",
  },
];

export function HomeFeatures() {
  return (
    <section id="features" className="rounded-[32px] bg-[rgba(244,246,250,0.82)] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-[-0.02em] text-[var(--color-foreground)] sm:text-[32px]">
            Why Free Utility Tools?
          </h2>
          <p className="mt-2 text-[15px] text-[var(--color-muted-foreground)]">
            Built for speed, privacy, and simplicity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div
                  className={`${feature.iconBg} flex h-[52px] w-[52px] items-center justify-center rounded-[14px]`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-[-0.01em] text-[var(--color-foreground)]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-[var(--color-muted-foreground)]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
