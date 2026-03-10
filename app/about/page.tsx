import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="About"
        title="A lean utility tools foundation for future expansion."
        description="This project starts with practical browser-first utilities and a reusable structure that is easy to develop locally and easy to deploy later."
      />
      <Card className="space-y-4">
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          The codebase is organized around reusable UI, focused helper modules, and small route pages so new tools can be added without turning the app into a monolith.
        </p>
        <p className="leading-7 text-[var(--color-muted-foreground)]">
          Image and PDF workflows are intentionally handled on the client wherever possible to reduce server complexity and keep private files on the user&apos;s device.
        </p>
      </Card>
    </div>
  );
}
