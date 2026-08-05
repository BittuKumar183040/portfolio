export interface TechCategory {
  title: string;
  stack: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  logo: string;
  logoAlt: string;
  employmentType?: string;
  /** Paragraph description (used when the story reads better as prose). */
  summary?: string;
  /** Bullet-point description (used when the work is best captured as a list). */
  highlights?: string[];
  technologies: TechCategory[];
}
