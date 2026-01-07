
export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  year: string;
}

export interface Award {
  title: string;
  year?: string;
}
