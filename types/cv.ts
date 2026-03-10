export type CvListItem = {
  id: string;
};

export type ExperienceEntry = CvListItem & {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  highlights: string;
};

export type EducationEntry = CvListItem & {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type ProjectEntry = CvListItem & {
  name: string;
  role: string;
  link: string;
  summary: string;
};

export type SkillEntry = CvListItem & {
  name: string;
};

export type CvProfile = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
};

export type CvDocument = {
  profile: CvProfile;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillEntry[];
};
