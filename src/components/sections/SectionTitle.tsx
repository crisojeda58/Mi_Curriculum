import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title, subtitle, className }) => {
  return (
    <div className={cn("mb-12 text-center", className)}>
      {Icon && <Icon className="mx-auto h-12 w-12 text-primary mb-4" />}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
