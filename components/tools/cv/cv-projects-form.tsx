import { CvEmptyHint } from "@/components/tools/cv/cv-empty-hint";
import { CvField } from "@/components/tools/cv/cv-field";
import { CvRepeatableItem } from "@/components/tools/cv/cv-repeatable-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectEntry } from "@/types/cv";

export function CvProjectsForm({
  items,
  onChange,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  items: ProjectEntry[];
  onChange: (id: string, field: keyof ProjectEntry, value: string) => void;
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
            label="Project"
            description="Highlight personal, freelance, open-source, or team projects."
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
            onMoveUp={() => onMoveUp(item.id)}
            onMoveDown={() => onMoveDown(item.id)}
            onRemove={() => onRemove(item.id)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <CvField label="Project name">
                <Input
                  value={item.name}
                  onChange={(event) => onChange(item.id, "name", event.target.value)}
                  placeholder="Creator Portfolio"
                />
              </CvField>
              <CvField label="Role">
                <Input
                  value={item.role}
                  onChange={(event) => onChange(item.id, "role", event.target.value)}
                  placeholder="Lead Designer and Developer"
                />
              </CvField>
              <div className="md:col-span-2">
                <CvField label="Project link" hint="Optional">
                  <Input
                    value={item.link}
                    onChange={(event) => onChange(item.id, "link", event.target.value)}
                    placeholder="https://example.com"
                  />
                </CvField>
              </div>
              <div className="md:col-span-2">
                <CvField label="Summary">
                  <Textarea
                    value={item.summary}
                    onChange={(event) => onChange(item.id, "summary", event.target.value)}
                    placeholder="Describe the outcome, your contribution, and the tools or skills involved."
                  />
                </CvField>
              </div>
            </div>
          </CvRepeatableItem>
        ))
      ) : (
        <CvEmptyHint
          title="No projects added yet"
          description="Projects can help show initiative, practical skills, or role-relevant work beyond your job history."
          actionLabel="Add projects that support the role you want next."
        />
      )}
      <Button variant="secondary" onClick={onAdd} className="w-full sm:w-auto">
        Add project
      </Button>
    </div>
  );
}
