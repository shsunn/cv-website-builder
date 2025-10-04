export type CvData = {
  name: string;
  englishName: string;
  targetStatement: string;
  overview?: string[];
  email: string;
  github?: string;
  phone?: string;
  links?: string[];
  timeline?: Array<{ term: string; desc: string }>;
  clubs?: Array<{ name: string; role?: string; desc?: string }>;
  sports?: string[];
  projects: Array<{
    title: string;
    start: string;
    end: string;
    advisor: string;
    org?: string;
    tags?: string[];
    bullets: string[];
  }>;
  education: Array<{ school: string; program: string; start: string; end: string; desc: string }>;
  skills: Array<{ category: string; items: string[] }>;
};

