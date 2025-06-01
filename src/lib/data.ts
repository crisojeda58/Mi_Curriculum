import type { PersonalInfo, Project, Education, Skill } from './types';
import { Laptop, Briefcase, GraduationCap, Code, Server, Database, Cog, Linkedin, Github, Mail, FileText, ExternalLink, BarChartBig, Users, Paintbrush, Gamepad2 } from 'lucide-react';

export const personalInfo: PersonalInfo = {
  name: 'Cristian Ojeda',
  title: 'Estudiante Ingeniería Informática, Técnico en Enfermería Nivel Superior, Entrenador de Voleibol.',
  bio: 'Soy un apasionado estudiante de informática con un fuerte interés en el desarrollo web full-stack y las nuevas tecnologías. Siempre estoy buscando aprender y aplicar mis conocimientos en proyectos desafiantes. Mi objetivo es convertirme en un desarrollador de software competente y creativo.',
  email: 'cris.ojeda.co@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/cristian-ojeda-0ba76b326/',
  githubUrl: 'https://github.com/crisojeda58',
  cvUrl: '/CV_TuNombre.pdf', // User should place their CV here
  profileImageUrl: '/src/images/perfil.jpg',
  profileImageDataAiHint: 'profile student',
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portafolio Web Personal',
    description: 'Mi portafolio personal construido con Next.js y Tailwind CSS para mostrar mis proyectos, habilidades y experiencia. Incluye un adaptador de CV impulsado por IA.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'portfolio website',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Genkit'],
    githubUrl: 'https://github.com/tu-usuario/mi-portafolio',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Aplicación de Gestión de Tareas',
    description: 'Una aplicación web para gestionar tareas diarias, permitiendo a los usuarios crear, editar, eliminar y marcar tareas como completadas. Implementada con MERN stack.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'task manager',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    githubUrl: 'https://github.com/tu-usuario/task-manager',
  },
  {
    id: '3',
    title: 'Clon de Red Social Simple',
    description: 'Un prototipo de red social que permite a los usuarios registrarse, iniciar sesión, crear publicaciones y seguir a otros usuarios. Enfocado en aprender conceptos de backend y bases de datos relacionales.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social network',
    technologies: ['Python', 'Django', 'PostgreSQL', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/tu-usuario/social-clone',
  },
];

export const education: Education[] = [
  {
    id: '1',
    institution: 'Instituto Profesional Santo Tomas',
    degree: 'Grado Ingeniero Informático',
    startDate: 'Enero 2022',
    endDate: 'Presente',
    description: 'Cursando asignaturas como Bases de Datos, Algoritmos, Desarrollo Web, Arquitectura de Software, Sistemas Operativos, Programacion Android, Ethical Hacking, entre otras.',
  },
  {
    id: '2',
    institution: 'Plataforma de Cursos Online (ej. Coursera, Udemy)',
    degree: 'Certificado en Desarrollo Web Full-Stack',
    startDate: 'Enero 2022',
    endDate: 'Diciembre 2022',
    description: 'Curso intensivo cubriendo HTML, CSS, JavaScript, React, Node.js, Express, y MongoDB. Desarrollo de múltiples proyectos prácticos.',
  },
];

export const skills: Skill[] = [
  { id: '1', name: 'JavaScript', proficiency: 85, icon: Code },
  { id: '2', name: 'TypeScript', proficiency: 80, icon: Code },
  { id: '3', name: 'React', proficiency: 80, icon: Code },
  { id: '4', name: 'Next.js', proficiency: 75, icon: Laptop },
  { id: '5', name: 'Node.js', proficiency: 70, icon: Server },
  { id: '6', name: 'Python', proficiency: 70, icon: Code },
  { id: '7', name: 'Django', proficiency: 60, icon: Server },
  { id: '8', name: 'SQL (PostgreSQL, MySQL)', proficiency: 65, icon: Database },
  { id: '9', name: 'Git & GitHub', proficiency: 85, icon: Github },
  { id: '10', name: 'HTML5', proficiency: 90, icon: Code },
  { id: '11', name: 'CSS3 & Tailwind', proficiency: 85, icon: Paintbrush },
  { id: '12', name: 'REST APIs', proficiency: 75, icon: Cog },
];

export const navigationLinks = [
  { href: '#bio', label: 'Biografia' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#education', label: 'Educación' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#contact', label: 'Contactar' },
];
