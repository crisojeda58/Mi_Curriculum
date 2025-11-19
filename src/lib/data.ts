import type { PersonalInfo, Skill } from './types';
import { Code, Computer, Github, DraftingCompass, Database, Paintbrush } from 'lucide-react';

export const personalInfo: PersonalInfo = {
  name: 'Cristian Ojeda',
  title: 'Estudiante Ingeniería Informática, Técnico en Enfermería Nivel Superior, Entrenador de Voleibol.',
  bio: 'Soy un estudiante de informática Interesado en especializarme en ciberseguridad y las nuevas tecnologías. Algunos de mis pasatiempos son la lectura, relizar deporte, trekking, acampar.',
  email: 'cris.ojeda.co@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/cristian-ojeda-0ba76b326/',
  githubUrl: 'https://github.com/crisojeda58',
  cvUrl: '/documents/Curriculum 2025.docx', // User should place their CV here
  profileImageUrl: '/images/perfil.jpg',
  profileImageDataAiHint: 'profile student',
};

export const skills: Skill[] = [
  { id: '1', name: 'Python', proficiency: 60, icon: Code },
  { id: '2', name: 'Kali-Linux', proficiency: 70, icon: Computer },
  { id: '3', name: 'Git & GitHub', proficiency: 90, icon: Github },
  { id: '4', name: 'C#', proficiency: 50, icon: Code },
  { id: '5', name: 'Java', proficiency: 50, icon: Code },
  { id: '6', name: 'Golang', proficiency: 20, icon: Code },
  { id: '7', name: 'Firebase', proficiency: 60, icon: DraftingCompass },
  { id: '8', name: 'Flutter', proficiency: 60, icon: DraftingCompass },
  { id: '9', name: 'SQL (PostgreSQL, MySQL)', proficiency: 80, icon: Database },
  { id: '10', name: 'TypeScript', proficiency: 50, icon: Code },
  { id: '11', name: 'JavaScript', proficiency: 40, icon: Code },
  { id: '12', name: 'React', proficiency: 30, icon: Code },
  { id: '13', 'name': 'HTML5', 'proficiency': 90, 'icon': Code },
  { id: '14', name: 'CSS3, Bootstrap, Tailwind', proficiency: 85, icon: Paintbrush },
];
