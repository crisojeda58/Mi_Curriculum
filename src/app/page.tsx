import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeTailorSection from '@/components/sections/ResumeTailorSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection id="bio" />
        <ProjectsSection id="projects" />
        <EducationSection id="education" />
        <SkillsSection id="skills" />
        <ResumeTailorSection id="resume-tailor" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </div>
  );
}
