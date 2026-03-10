import { CvField } from "@/components/tools/cv/cv-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CvProfile } from "@/types/cv";

export function CvBasicsForm({
  profile,
  onChange,
}: {
  profile: CvProfile;
  onChange: <K extends keyof CvProfile>(field: K, value: CvProfile[K]) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <CvField label="Full name">
        <Input
          value={profile.fullName}
          onChange={(event) => onChange("fullName", event.target.value)}
          placeholder="Alex Morgan"
        />
      </CvField>
      <CvField label="Job title">
        <Input
          value={profile.jobTitle}
          onChange={(event) => onChange("jobTitle", event.target.value)}
          placeholder="Product Designer"
        />
      </CvField>
      <CvField label="Email">
        <Input
          type="email"
          value={profile.email}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="alex@example.com"
        />
      </CvField>
      <CvField label="Phone">
        <Input
          value={profile.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </CvField>
      <CvField label="Location">
        <Input
          value={profile.location}
          onChange={(event) => onChange("location", event.target.value)}
          placeholder="New York, NY"
        />
      </CvField>
      <div className="md:col-span-2">
        <CvField label="Professional summary" hint="2 to 4 concise sentences">
          <Textarea
            value={profile.summary}
            onChange={(event) => onChange("summary", event.target.value)}
            placeholder="Write a short overview of your experience, strengths, and the kind of work you want to do."
          />
        </CvField>
      </div>
    </div>
  );
}
