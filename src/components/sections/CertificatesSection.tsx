import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { certificates } from '@/lib/data';
import { Award, CalendarDays } from 'lucide-react';
import SectionTitle from './SectionTitle';

interface CertificatesSectionProps {
  id: string;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={Award} title="Certificados y Cursos" subtitle="Formación complementaria y especializaciones." />
        <div className="space-y-8">
          {certificates.map((cert) => (
            <Card key={cert.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-xl mb-1 sm:mb-0">{cert.institution}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>Finalizado en {cert.endDate}</span>
                  </div>
                </div>
                <p className="text-md text-primary font-semibold">{cert.degree}</p>
              </CardHeader>
              {cert.description && (
                <CardContent>
                  <CardDescription className="text-sm">{cert.description}</CardDescription>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
