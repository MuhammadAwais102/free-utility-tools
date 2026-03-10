import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy-first by default."
        description="Most tools in this starter process files directly in the browser instead of uploading them to a remote server."
      />
      <Card className="space-y-4 leading-7 text-[var(--color-muted-foreground)]">
        <p>Uploaded files stay on the local device for browser-side processing unless a future tool explicitly documents otherwise.</p>
        <p>You should still avoid using sensitive files on shared or untrusted devices.</p>
      </Card>
    </div>
  );
}
