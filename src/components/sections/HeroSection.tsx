import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/data';
import { Download, Github, Linkedin, Mail, UserCircle } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  id: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hola, soy <span className="text-primary">{personalInfo.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{personalInfo.title}</p>
            <p className="text-md text-foreground leading-relaxed mb-8">{personalInfo.bio}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Button asChild size="lg">
                <Link href="#contact">Contacta Conmigo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={personalInfo.cvUrl} download>
                  <Download className="mr-2 h-5 w-5" />
                  Descargar CV
                </a>
              </Button>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={`mailto:${personalInfo.email}`} aria-label="Email">
                <Mail className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-primary/20">
              <Image
                src={personalInfo.profileImageUrl}
                alt={personalInfo.name}
                data-ai-hint={personalInfo.profileImageDataAiHint}
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
