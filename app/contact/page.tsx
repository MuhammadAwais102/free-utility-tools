import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { createStaticPageMetadata } from "@/lib/site";

export const metadata: Metadata = createStaticPageMetadata({
  title: "Contact",
  description:
    "Get support, share feedback, request new tools, or reach out about automation and workflow projects.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="CONTACT"
        title="Support, feedback, and tool requests."
        description="Have a question, found a bug, or want a new tool added? Reach out and I&apos;ll review it as quickly as possible."
      />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Contact Details
            </p>
            <h2 className="text-xl font-bold text-[var(--color-foreground)]">
              Direct support channels
            </h2>
          </div>

          <div className="space-y-4 text-[var(--color-muted-foreground)]">
            <div>
              <p className="font-semibold text-[var(--color-foreground)]">Support email</p>
              <a
                href="mailto:muhammadawais8697@gmail.com"
                className="mt-1 inline-flex text-[var(--color-accent)] transition hover:text-[var(--color-accent-strong)]"
              >
                muhammadawais8697@gmail.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-foreground)]">WhatsApp</p>
              <a
                href="https://wa.me/923175264448"
                className="mt-1 inline-flex text-[var(--color-accent)] transition hover:text-[var(--color-accent-strong)]"
              >
                +92 317 5264448
              </a>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-foreground)]">Response time</p>
              <p className="mt-1">Usually within 1 hour</p>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Support Scope
            </p>
            <h2 className="text-xl font-bold text-[var(--color-foreground)]">
              You can contact me for
            </h2>
          </div>

          <ul className="space-y-3 text-[var(--color-muted-foreground)]">
            <li>Support with an existing tool.</li>
            <li>Bug reports.</li>
            <li>Requests for new tools.</li>
            <li>Feedback and improvement ideas.</li>
          </ul>
        </Card>
      </div>

      <Card className="space-y-5">
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">
          Business and automation enquiries
        </h2>
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          If you want to discuss automation systems, AI workflows, or custom business
          tooling, mention that in your message and include a short summary of what you
          need.
        </p>
      </Card>

      <Card className="space-y-5">
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">
          Contact form note
        </h2>
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          A direct contact form can be added here later. For now, use the support
          channels above and include the tool name, the issue, and any steps to
          reproduce the problem if you are reporting a bug.
        </p>
        <p className="font-medium text-[var(--color-foreground)]">
          Need help or want to suggest a tool? Send a message and I&apos;ll get back to
          you as soon as possible.
        </p>
      </Card>
    </div>
  );
}
