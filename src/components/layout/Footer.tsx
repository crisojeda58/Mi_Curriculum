import { personalInfo } from '@/lib/data';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-8 bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-6 w-6 hover:text-primary transition-colors" />
          </Link>
          <Link href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 hover:text-primary transition-colors" />
          </Link>
          <Link href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail className="h-6 w-6 hover:text-primary transition-colors" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-1">
          Diseñado con ❤️ y código.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
