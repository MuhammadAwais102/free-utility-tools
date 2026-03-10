import type {
  CvDocument,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  SkillEntry,
} from "@/types/cv";

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyExperienceEntry(): ExperienceEntry {
  return {
    id: createId("experience"),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrentRole: false,
    highlights: "",
  };
}

export function createEmptyEducationEntry(): EducationEntry {
  return {
    id: createId("education"),
    school: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
    details: "",
  };
}

export function createEmptyProjectEntry(): ProjectEntry {
  return {
    id: createId("project"),
    name: "",
    role: "",
    link: "",
    summary: "",
  };
}

export function createEmptySkillEntry(): SkillEntry {
  return {
    id: createId("skill"),
    name: "",
  };
}

export function createEmptyCvDocument(): CvDocument {
  return {
    profile: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    projects: [],
    skills: [],
  };
}
