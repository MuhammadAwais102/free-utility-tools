import { CvEmptyHint } from "@/components/tools/cv/cv-empty-hint";
import { CvField } from "@/components/tools/cv/cv-field";
import { CvRepeatableItem } from "@/components/tools/cv/cv-repeatable-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EducationEntry } from "@/types/cv";

export function CvEducationForm({
  items,
  onChange,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  items: EducationEntry[];
  onChange: (id: string, field: keyof EducationEntry, value: string) => void;
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
            label="Education"
            description="Add the degree, school, and any supporting detail worth showing."
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
            onMoveUp={() => onMoveUp(item.id)}
            onMoveDown={() => onMoveDown(item.id)}
            onRemove={() => onRemove(item.id)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <CvField label="School">
                <Input
                  value={item.school}
                  onChange={(event) => onChange(item.id, "school", event.target.value)}
                  placeholder="State University"
                />
              </CvField>
              <CvField label="Degree">
                <Input
                  value={item.degree}
                  onChange={(event) => onChange(item.id, "degree", event.target.value)}
                  placeholder="B.S. in Computer Science"
                />
              </CvField>
              <CvField label="Location">
                <Input
                  value={item.location}
                  onChange={(event) => onChange(item.id, "location", event.target.value)}
                  placeholder="Austin, TX"
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
                <CvField label="End date">
                  <Input
                    type="month"
                    value={item.endDate}
                    onChange={(event) => onChange(item.id, "endDate", event.target.value)}
                  />
                </CvField>
              </div>
              <div className="md:col-span-2">
                <CvField label="Details" hint="Awards, coursework, GPA, or relevant notes">
                  <Textarea
                    value={item.details}
                    onChange={(event) => onChange(item.id, "details", event.target.value)}
                    placeholder="Dean's List, capstone focus, scholarships, or relevant coursework."
                  />
                </CvField>
              </div>
            </div>
          </CvRepeatableItem>
        ))
      ) : (
        <CvEmptyHint
          title="No education added yet"
          description="Add education details if they support your target role or strengthen your story."
          actionLabel="Include degrees, certifications, or relevant training."
        />
      )}
      <Button variant="secondary" onClick={onAdd} className="w-full sm:w-auto">
        Add education
      </Button>
    </div>
  );
}
