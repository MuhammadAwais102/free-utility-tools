import { CvEmptyHint } from "@/components/tools/cv/cv-empty-hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SkillEntry } from "@/types/cv";

export function CvSkillsForm({
  items,
  onChange,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  items: SkillEntry[];
  onChange: (id: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      {items.length ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:flex-row sm:items-center"
            >
              <div className="sm:flex-1">
                <Input
                  value={item.name}
                  onChange={(event) => onChange(item.id, event.target.value)}
                  placeholder={`Skill ${index + 1}`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => onMoveUp(item.id)} disabled={index === 0}>
                  Move up
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onMoveDown(item.id)}
                  disabled={index === items.length - 1}
                >
                  Move down
                </Button>
                <Button variant="secondary" onClick={() => onRemove(item.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CvEmptyHint
          title="No skills added yet"
          description="Add skills one by one to build a concise, scannable skills section in the preview."
          actionLabel="Keep this list short, relevant, and easy to scan."
        />
      )}
      <Button variant="secondary" onClick={onAdd} className="w-full sm:w-auto">
        Add skill
      </Button>
    </div>
  );
}
