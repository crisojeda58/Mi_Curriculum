import type { PersonalInfo, Project, Education, Skill } from './types';
import { Laptop, Briefcase, GraduationCap, Code, DraftingCompass,  Server, Database, Cog, Linkedin, Github, Mail, FileText, ExternalLink, BarChartBig, Users, Paintbrush, Gamepad2, Computer } from 'lucide-react';

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

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portafolio Web Personal',
    description: 'Mi portafolio personal construido con Next.js y Tailwind CSS para mostrar mis proyectos, habilidades y experiencia.',
    imageUrl: '/images/PortafolioWeb.png',
    dataAiHint: 'portfolio website',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Firebase'],
    githubUrl: 'https://github.com/crisojeda58/Mi_CV',
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
    degree: 'Grado Ingeniero en Informática',
    startDate: 'Enero 2022',
    endDate: 'Presente',
    description: 'Cursando asignaturas como Bases de Datos, Algoritmos, Desarrollo Web, Arquitectura de Software, Sistemas Operativos, Programacion Android, Ethical Hacking, entre otras.',
  },
  {
    id: '2',
    institution: 'Universidad San Sebastian',
    degree: 'Grado Bachiller en Ciencias de la Salud',
    startDate: 'Enero 2016',
    endDate: 'Diciembre 2018',
    description: 'Cursando asignaturas como Biología, Química, Anatomia, Biquimica, Bioestadistica, Fisilogia, Microbiologia, Física, entre otros.',
  },
  {
    id: '3',
    institution: 'Santander Open Academy - MIT Professional Education',
    degree: 'Curso Introductorio al Internet de las Cosas',
    startDate: '',
    endDate: 'Septiembre 2024',
    description: 'Curso de 8 horas, en el que se aborda una introduccion al Internet Of Things, la tecnologias que utiliza, su funcionamiento, y los parametros de seguridad.',
  },
  {
    id: '4',
    institution: 'Santander Open Academy - Goolge',
    degree: 'Curso Inteligencia artificial y Productividad',
    startDate: '',
    endDate: 'Septiembre 2024',
    description: 'Curso de 8 horas, diseñado por Google, aborda que es un LLM, mecanismos para optimizar el uso de los LLM, automatizacion de tareas con IA, Integracion de Gemini en Google Workspace.',
  },
  {
    id: '5',
    institution: 'Hacker Mentor, Academia de Ciberseguridad',
    degree: 'Curso Introducción al Ethical Hacking y Pentesting',
    startDate: '',
    endDate: 'Septiembre 2024',
    description: 'Curso de 8 horas, introduccion al hackin etico, Deteccion de vulnerabilidades, uso de herramientas como Nmap, WSPscan, Metasploit, Gobuster, entre otros',
  },
];

export const skills: Skill[] = [
  { id: '1', name: 'Python', proficiency: 60, icon: Code },
  { id: '2', name: 'Kali-Linux', proficiency: 70, icon: Computer },
  { id: '3', name: 'Git & GitHub', proficiency: 90, icon: Github },
  { id: '4', name: 'C#', proficiency: 50, icon: Code },
  { id: '5', name: 'Java', proficiency: 50, icon: Code },
  { id: '6', name: 'Golang', proficiency: 20, icon: Code },
  { id: '7', name: 'Firebase', proficiency: 60, icon: DraftingCompass },	
  { id: '8', name: 'Flutter', proficiency: 60, icon: DraftingCompass },
  { id: '7', name: 'SQL (PostgreSQL, MySQL)', proficiency: 80, icon: Database },
  { id: '8', name: 'TypeScript', proficiency: 50, icon: Code },
  { id: '9', name: 'JavaScript', proficiency: 40, icon: Code },
  { id: '10', name: 'React', proficiency: 30, icon: Code },
  { id: '11', name: 'HTML5', proficiency: 90, icon: Code },
  { id: '12', name: 'CSS3, Bootstrap, Tailwind', proficiency: 85, icon: Paintbrush },
];

export const navigationLinks = [
  { href: '#bio', label: 'Biografia' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#education', label: 'Educación' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#contact', label: 'Contactar' },
];
