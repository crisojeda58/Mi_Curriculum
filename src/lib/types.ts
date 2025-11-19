export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  dataAiHint?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-100
  icon?: React.ElementType;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  profileImageUrl: string;
  profileImageDataAiHint?: string;
}

export interface Certificate {
  id: number;
  title: string;
  institution: string;
  issue_date: string;
  certificate_url: string;
  description: string;
}
