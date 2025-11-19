import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { Github, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import SectionTitle from './SectionTitle';
import type { Project } from '@/lib/types';

interface ProjectsSectionProps {
  id: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = async ({ id }) => {
  const supabase = createClient();
  const { data: projects, error } = await supabase.from('projects').select('*').order('id');

  if (error) {
    console.error('Error fetching projects data:', error);
  }

  if (!projects || projects.length === 0) {
    return (
      <section id={id} className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={Briefcase} title="Proyectos Destacados" subtitle="Una selección de proyectos en los que he trabajado, demostrando mis habilidades y pasión por el desarrollo." />
          <p>No se pudieron cargar los proyectos.</p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={Briefcase} title="Proyectos Destacados" subtitle="Una selección de proyectos en los que he trabajado, demostrando mis habilidades y pasión por el desarrollo." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(projects as Project[]).map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {project.image_url && (
                <div className="relative w-full h-48">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    data-ai-hint={project.dataAiHint}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-4 text-sm">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                )}
                {project.liveUrl && project.liveUrl !== '#' && (
                  <Button variant="default" size="sm" asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
