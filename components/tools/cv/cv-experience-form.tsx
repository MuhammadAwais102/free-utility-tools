import { CvEmptyHint } from "@/components/tools/cv/cv-empty-hint";
import { CvField } from "@/components/tools/cv/cv-field";
import { CvRepeatableItem } from "@/components/tools/cv/cv-repeatable-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ExperienceEntry } from "@/types/cv";

export function CvExperienceForm({
  items,
  onChange,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  items: ExperienceEntry[];
  onChange: <K extends keyof ExperienceEntry>(id: string, field: K, value: ExperienceEntry[K]) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      {items.length ? (
        items.map((item, index) => (
          <CvRepeatableItem
            key={item.id}
            index={index}
            label="Experience"
            description="Add your employer, role, dates, and key impact highlights."
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
            onMoveUp={() => onMoveUp(item.id)}
            onMoveDown={() => onMoveDown(item.id)}
            onRemove={() => onRemove(item.id)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <CvField label="Company">
                <Input
                  value={item.company}
                  onChange={(event) => onChange(item.id, "company", event.target.value)}
                  placeholder="Northwind Studio"
                />
              </CvField>
              <CvField label="Role">
                <Input
                  value={item.role}
                  onChange={(event) => onChange(item.id, "role", event.target.value)}
                  placeholder="Senior Frontend Engineer"
                />
              </CvField>
              <CvField label="Location">
                <Input
                  value={item.location}
                  onChange={(event) => onChange(item.id, "location", event.target.value)}
                  placeholder="Remote"
                />
              </CvField>
              <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
                <CvField label="Start date">
                  <Input
                    type="month"
                    value={item.startDate}
                    onChange={(event) => onChange(item.id, "startDate", event.target.value)}
                  />
                </CvField>
                <CvField label="End date" hint="Leave blank if current">
                  <Input
                    type="month"
                    value={item.endDate}
                    disabled={item.isCurrentRole}
                    onChange={(event) => onChange(item.id, "endDate", event.target.value)}
                  />
                </CvField>
              </div>
              <label className="md:col-span-2 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)]">
                <input
                  type="checkbox"
                  checked={item.isCurrentRole}
                  onChange={(event) => {
                    onChange(item.id, "isCurrentRole", event.target.checked);
                    if (event.target.checked) {
                      onChange(item.id, "endDate", "");
                    }
                  }}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                <span className="font-medium">I currently work here</span>
              </label>
              <div className="md:col-span-2">
                <CvField label="Highlights" hint="One idea per line works well">
                  <Textarea
                    value={item.highlights}
                    onChange={(event) => onChange(item.id, "highlights", event.target.value)}
                    placeholder={"Led redesign of the onboarding flow\nImproved page speed by 35%\nPartnered with product and design on roadmap delivery"}
                  />
                </CvField>
              </div>
            </div>
          </CvRepeatableItem>
        ))
      ) : (
        <CvEmptyHint
          title="No experience added yet"
          description="Add work history entries to build a stronger preview and show your recent roles."
          actionLabel="Start with your most relevant or most recent role."
        />
      )}
      <Button variant="secondary" onClick={onAdd} className="w-full sm:w-auto">
        Add experience
      </Button>
    </div>
  );
}
