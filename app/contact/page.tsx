import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Contact"
        title="Support and feedback."
        description="Use this page to direct visitors to your support channel, feedback inbox, or help documentation."
      />
      <Card className="space-y-4 leading-7 text-[var(--color-muted-foreground)]">
        <p>
          Add your public support email, contact form, or help center link here before launching the site.
        </p>
      </Card>
    </div>
  );
}
