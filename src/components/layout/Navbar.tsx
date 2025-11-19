
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, BookText } from 'lucide-react';
import { navigationLinks } from '@/lib/navigation';
import { personalInfo } from '@/lib/data';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <BookText className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">CV Cristian Ojeda</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-m font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <a href={personalInfo.cvUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Descargar CV
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
