import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { education } from '@/lib/data';
import { GraduationCap, CalendarDays } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface EducationSectionProps {
  id: string;
}

const EducationSection: React.FC<EducationSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={GraduationCap} title="Formación Académica" subtitle="Mi trayectoria educativa y certificaciones relevantes." />
        <div className="space-y-8">
          {education.map((edu) => (
            <Card key={edu.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-xl mb-1 sm:mb-0">{edu.institution}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>{edu.startDate} - {edu.endDate}</span>
                  </div>
                </div>
                <p className="text-md text-primary font-semibold">{edu.degree}</p>
              </CardHeader>
              {edu.description && (
                <CardContent>
                  <CardDescription className="text-sm">{edu.description}</CardDescription>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
