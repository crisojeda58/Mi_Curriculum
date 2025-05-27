import { skills } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react'; // Using Wrench as a generic skills icon
import SectionTitle from './SectionTitle';

interface SkillsSectionProps {
  id: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={Wrench} title="Habilidades Técnicas" subtitle="Un resumen de las tecnologías y herramientas que manejo." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <Card key={skill.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{skill.name}</CardTitle>
                {skill.icon && <skill.icon className="h-6 w-6 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <Progress value={skill.proficiency} aria-label={`${skill.name} proficiency ${skill.proficiency}%`} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1 text-right">{skill.proficiency}%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
