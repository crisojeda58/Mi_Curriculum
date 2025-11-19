import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { Award, CalendarDays } from 'lucide-react';
import SectionTitle from './SectionTitle';
import type { Certificate } from '@/lib/types';
import Link from 'next/link';

interface CertificatesSectionProps {
  id: string;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = async ({ id }) => {
  const supabase = createClient();
  const { data: certificates, error } = await supabase.from('certificates').select('*').order('id');

  if (error) {
    console.error('Error fetching certificates data:', JSON.stringify(error, null, 2));
  }

  if (!certificates || certificates.length === 0) {
    return (
      <section id={id} className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle icon={Award} title="Certificados y Cursos" subtitle="Formación complementaria y especializaciones." />
          <p>No hay certificados para mostrar en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={Award} title="Certificados y Cursos" subtitle="Formación complementaria y especializaciones." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(certificates as Certificate[]).map((cert: Certificate) => (
            <Link href={cert.certificate_url || '#'} key={cert.id} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">
                <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl mb-1">{cert.title}</CardTitle>
                        <p className="text-md text-primary font-semibold">{cert.institution}</p>
                        <div className="flex items-center text-sm text-muted-foreground pt-1">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          <span>{cert.issue_date}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription className="text-sm">{cert.description}</CardDescription>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
