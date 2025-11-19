import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { GraduationCap, CalendarDays } from 'lucide-react';
import SectionTitle from './SectionTitle';
import type { Education } from '@/lib/types';

interface EducationSectionProps {
  id: string;
}

const EducationSection: React.FC<EducationSectionProps> = async ({ id }) => {
  const supabase = createClient();
  const { data: education, error } = await supabase.from('education').select('*').order('id');

  if (error) {
    console.error('Error fetching education data:', error);
  }

  if (!education) {
    return (
        <section id={id} className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle icon={GraduationCap} title="Formación Académica" subtitle="Mi trayectoria académica y títulos obtenidos." />
                <p>No se pudo cargar la información de educación.</p>
            </div>
        </section>
    );
  }

  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={GraduationCap} title="Formación Académica" subtitle="Mi trayectoria académica y títulos obtenidos." />
        <div className="space-y-8">
          {education.map((edu: Education) => (
            <Card key={edu.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-xl mb-1 sm:mb-0">{edu.institution}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>{edu.start_date} - {edu.end_date}</span>
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
