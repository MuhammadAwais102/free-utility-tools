import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { buildDateRange, joinParts, splitLines } from "@/lib/cv/format";
import type { CvDocument } from "@/types/cv";

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
          {title}
        </h2>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>
      {children}
    </section>
  );
}

export function CvPreview({ document }: { document: CvDocument }) {
  const { profile, experience, education, projects, skills } = document;
  const hasProfileDetails = Boolean(profile.email || profile.phone || profile.location);
  const populatedSectionCount = [experience, education, projects, skills].filter(
    (section) => section.length,
  ).length;

  return (
    <Card
      data-cv-preview-root
      className="sticky top-24 space-y-8 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,251,253,0.98))] p-6 sm:p-8"
    >
      <div className="space-y-5 border-b border-[var(--color-border)] pb-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--color-surface-strong)] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Live Preview
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            {populatedSectionCount} sections populated
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            {profile.fullName || "Your name"}
          </h1>
          <p className="text-lg font-semibold text-[var(--color-accent)]">
            {profile.jobTitle || "Your target job title"}
          </p>
        </div>

        {hasProfileDetails ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--color-muted-foreground)]">
            {profile.email ? <span>{profile.email}</span> : null}
            {profile.phone ? <span>{profile.phone}</span> : null}
            {profile.location ? <span>{profile.location}</span> : null}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Add your contact details on the left to complete the header.
          </p>
        )}

        <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted-foreground)]">
          {profile.summary ||
            "Your professional summary will appear here. Use it to quickly introduce your background, strengths, and the type of work you do best."}
        </p>
      </div>

      <div className="space-y-8">
        <PreviewSection title="Experience">
          {experience.length ? (
            <div className="space-y-6">
              {experience.map((item) => (
                <article key={item.id} className="space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[var(--color-foreground)]">
                        {item.role || "Role title"}
                      </h3>
                      <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
                        {joinParts([item.company, item.location]) || "Company | Location"}
                      </p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                      {buildDateRange(
                        item.startDate,
                        item.endDate,
                        item.isCurrentRole ? "Present" : "",
                      ) || "Date range"}
                    </p>
                  </div>
                  {splitLines(item.highlights).length ? (
                    <ul className="space-y-2 pl-5 text-sm leading-6 text-[var(--color-muted-foreground)]">
                      {splitLines(item.highlights).map((line) => (
                        <li key={line} className="list-disc">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
                      Add a few achievement-focused bullets to make this entry stronger.
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
              Add experience entries to show your work history here.
            </p>
          )}
        </PreviewSection>

        <PreviewSection title="Education">
          {education.length ? (
            <div className="space-y-5">
              {education.map((item) => (
                <article key={item.id} className="space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[var(--color-foreground)]">
                        {item.degree || "Degree"}
                      </h3>
                      <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
                        {joinParts([item.school, item.location]) || "School | Location"}
                      </p>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-foreground)]">
                      {buildDateRange(item.startDate, item.endDate) || "Date range"}
                    </p>
                  </div>
                  {item.details ? (
                    <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
                      {item.details}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
              Add education history if it supports your experience or target role.
            </p>
          )}
        </PreviewSection>

        <PreviewSection title="Projects">
          {projects.length ? (
            <div className="space-y-5">
              {projects.map((item) => (
                <article key={item.id} className="space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[var(--color-foreground)]">
                        {item.name || "Project name"}
                      </h3>
                      {item.role ? (
                        <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
                          {item.role}
                        </p>
                      ) : null}
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-[var(--color-accent)]"
                      >
                        View link
                      </a>
                    ) : null}
                  </div>
                  <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
                    {item.summary || "Add a short description of the project and your contribution."}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
              Add projects to show hands-on examples of your work.
            </p>
          )}
        </PreviewSection>

        <PreviewSection title="Skills">
          {skills.length ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-foreground)]"
                >
                  {item.name || "Skill"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[var(--color-muted-foreground)]">
              Add skills to create a quick scannable overview for recruiters and hiring managers.
            </p>
          )}
        </PreviewSection>
      </div>
    </Card>
  );
}
