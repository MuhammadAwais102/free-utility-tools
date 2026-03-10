import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Terms"
        title="Terms of use."
        description="Review and adapt this page to match the terms, disclaimers, and legal requirements for your deployment."
      />
      <Card className="space-y-4 leading-7 text-[var(--color-muted-foreground)]">
        <p>The tools are provided as-is without warranty.</p>
        <p>Review legal and compliance requirements before deploying publicly or collecting any user data.</p>
      </Card>
    </div>
  );
}
