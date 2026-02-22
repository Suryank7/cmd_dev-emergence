import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ChatSection from "@/components/sections/ChatSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";
import { Terminal } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ChatSection />
      <SkillsSection />
      <ResumeSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-display text-xs font-bold tracking-wider text-foreground">
              CMD<span className="text-primary">.dev</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 Alex Chen. Built with React, TypeScript & a lot of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
