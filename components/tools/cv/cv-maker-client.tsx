"use client";

import { useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { CvBasicsForm } from "@/components/tools/cv/cv-basics-form";
import { CvEducationForm } from "@/components/tools/cv/cv-education-form";
import { CvExperienceForm } from "@/components/tools/cv/cv-experience-form";
import { CvPrintStyles } from "@/components/tools/cv/cv-print-styles";
import { CvPreview } from "@/components/tools/cv/cv-preview";
import { CvProjectsForm } from "@/components/tools/cv/cv-projects-form";
import { CvSectionCard } from "@/components/tools/cv/cv-section-card";
import { CvSkillsForm } from "@/components/tools/cv/cv-skills-form";
import { Button } from "@/components/ui/button";
import { buildDateRange } from "@/lib/cv/format";
import {
  createEmptyCvDocument,
  createEmptyEducationEntry,
  createEmptyExperienceEntry,
  createEmptyProjectEntry,
  createEmptySkillEntry,
} from "@/lib/cv/defaults";
import { printCvDocument } from "@/lib/cv/print";
import { reorderItems } from "@/lib/utils";
import type {
  CvDocument,
  CvProfile,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  SkillEntry,
} from "@/types/cv";

type CvListSection = "experience" | "education" | "projects" | "skills";
type CvSectionMap = {
  experience: ExperienceEntry;
  education: EducationEntry;
  projects: ProjectEntry;
  skills: SkillEntry;
};

export function CvMakerClient() {
  const [document, setDocument] = useState<CvDocument>(createEmptyCvDocument);

  function updateProfile<K extends keyof CvProfile>(field: K, value: CvProfile[K]) {
    setDocument((currentDocument) => ({
      ...currentDocument,
      profile: {
        ...currentDocument.profile,
        [field]: value,
      },
    }));
  }

  function updateItem<S extends CvListSection>(
    section: S,
    id: string,
    updater: (item: CvSectionMap[S]) => CvSectionMap[S],
  ) {
    setDocument((currentDocument) => ({
      ...currentDocument,
      [section]: currentDocument[section].map((item) =>
        item.id === id ? updater(item as CvSectionMap[S]) : item,
      ),
    }));
  }

  function removeItem(section: CvListSection, id: string) {
    setDocument((currentDocument) => ({
      ...currentDocument,
      [section]: currentDocument[section].filter((item) => item.id !== id),
    }));
  }

  function moveItem<S extends CvListSection>(section: S, id: string, direction: -1 | 1) {
    setDocument((currentDocument) => {
      const items = currentDocument[section] as CvSectionMap[S][];
      const currentIndex = items.findIndex((item) => item.id === id);

      if (currentIndex === -1) {
        return currentDocument;
      }

      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex >= items.length) {
        return currentDocument;
      }

      return {
        ...currentDocument,
        [section]: reorderItems(items, currentIndex, nextIndex),
      };
    });
  }

  return (
    <div className="space-y-8" data-cv-maker>
      <CvPrintStyles />
      <PageHeader
        eyebrow="Career Tool"
        title="CV Maker"
        description="Build a clean one-page CV in your browser with editable sections for your profile, experience, education, projects, and skills."
        actions={
          <div className="flex flex-wrap gap-3" data-cv-screen-only>
            <Button onClick={printCvDocument}>Print / Save as PDF</Button>
            <Button variant="secondary" onClick={() => setDocument(createEmptyCvDocument())}>
              Reset CV
            </Button>
          </div>
        }
      />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="space-y-6" data-cv-form>
          <CvSectionCard
            title="Profile"
            description="Start with the key details at the top of your CV so the live preview has a strong foundation."
          >
            <CvBasicsForm profile={document.profile} onChange={updateProfile} />
          </CvSectionCard>

          <CvSectionCard
            title="Work experience"
            description="Add your roles in the order you want them to appear and include clear achievement-focused highlights."
            actionLabel="Add experience"
            onAction={() =>
              setDocument((currentDocument) => ({
                ...currentDocument,
                experience: [...currentDocument.experience, createEmptyExperienceEntry()],
              }))
            }
          >
            <CvExperienceForm
              items={document.experience}
              onAdd={() =>
                setDocument((currentDocument) => ({
                  ...currentDocument,
                  experience: [...currentDocument.experience, createEmptyExperienceEntry()],
                }))
              }
              onChange={(id, field, value) =>
                updateItem("experience", id, (item) => ({
                  ...item,
                  [field]: value,
                }))
              }
              onMoveUp={(id) => moveItem("experience", id, -1)}
              onMoveDown={(id) => moveItem("experience", id, 1)}
              onRemove={(id) => removeItem("experience", id)}
            />
          </CvSectionCard>

          <CvSectionCard
            title="Education"
            description="Include degrees, certifications, or academic details that help support your target role."
            actionLabel="Add education"
            onAction={() =>
              setDocument((currentDocument) => ({
                ...currentDocument,
                education: [...currentDocument.education, createEmptyEducationEntry()],
              }))
            }
          >
            <CvEducationForm
              items={document.education}
              onAdd={() =>
                setDocument((currentDocument) => ({
                  ...currentDocument,
                  education: [...currentDocument.education, createEmptyEducationEntry()],
                }))
              }
              onChange={(id, field, value) =>
                updateItem("education", id, (item) => ({
                  ...item,
                  [field]: value,
                }))
              }
              onMoveUp={(id) => moveItem("education", id, -1)}
              onMoveDown={(id) => moveItem("education", id, 1)}
              onRemove={(id) => removeItem("education", id)}
            />
          </CvSectionCard>

          <CvSectionCard
            title="Projects"
            description="Use projects to showcase relevant portfolio work, side projects, or practical examples of your skills."
            actionLabel="Add project"
            onAction={() =>
              setDocument((currentDocument) => ({
                ...currentDocument,
                projects: [...currentDocument.projects, createEmptyProjectEntry()],
              }))
            }
          >
            <CvProjectsForm
              items={document.projects}
              onAdd={() =>
                setDocument((currentDocument) => ({
                  ...currentDocument,
                  projects: [...currentDocument.projects, createEmptyProjectEntry()],
                }))
              }
              onChange={(id, field, value) =>
                updateItem("projects", id, (item) => ({
                  ...item,
                  [field]: value,
                }))
              }
              onMoveUp={(id) => moveItem("projects", id, -1)}
              onMoveDown={(id) => moveItem("projects", id, 1)}
              onRemove={(id) => removeItem("projects", id)}
            />
          </CvSectionCard>

          <CvSectionCard
            title="Skills"
            description="Keep this list sharp and relevant. Short skill labels make the preview easier to scan."
            actionLabel="Add skill"
            onAction={() =>
              setDocument((currentDocument) => ({
                ...currentDocument,
                skills: [...currentDocument.skills, createEmptySkillEntry()],
              }))
            }
          >
            <CvSkillsForm
              items={document.skills}
              onAdd={() =>
                setDocument((currentDocument) => ({
                  ...currentDocument,
                  skills: [...currentDocument.skills, createEmptySkillEntry()],
                }))
              }
              onChange={(id, value) =>
                updateItem("skills", id, (item) => ({
                  ...item,
                  name: value,
                }))
              }
              onMoveUp={(id) => moveItem("skills", id, -1)}
              onMoveDown={(id) => moveItem("skills", id, 1)}
              onRemove={(id) => removeItem("skills", id)}
            />
          </CvSectionCard>
        </div>

        <div className="space-y-4" data-cv-preview-shell>
          <div className="xl:hidden" data-cv-screen-only>
            <EmptyState
              title="Live preview updates instantly"
              description="As you type on the form, the CV preview below updates right away so you can refine the layout and wording together."
            />
          </div>
          <div
            className="hidden rounded-[24px] border border-[var(--color-border)] bg-white/85 px-5 py-4 text-sm leading-6 text-[var(--color-muted-foreground)] shadow-[0_12px_35px_rgba(15,23,42,0.05)] xl:block"
            data-cv-screen-only
          >
            <p className="font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Preview Notes
            </p>
            <p className="mt-2">
              Keep entries concise, use action-focused bullets, and let the live preview guide the final order of your sections.
            </p>
            {document.experience[0] ? (
              <p className="mt-2">
                Latest role: {document.experience[0].role || "Untitled role"} {buildDateRange(document.experience[0].startDate, document.experience[0].endDate, document.experience[0].isCurrentRole ? "Present" : "") ? `(${buildDateRange(document.experience[0].startDate, document.experience[0].endDate, document.experience[0].isCurrentRole ? "Present" : "")})` : ""}
              </p>
            ) : null}
          </div>
          <div
            className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-muted-foreground)] md:px-5"
            data-cv-screen-only
          >
            Use the browser print dialog and choose <span className="font-semibold text-[var(--color-foreground)]">Save as PDF</span> for a clean export of the preview only.
          </div>
          <CvPreview document={document} />
        </div>
      </div>
    </div>
  );
}
