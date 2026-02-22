import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import ParticleBackground from "../ParticleBackground";

const roles = ["AI Engineer", "Full Stack Developer", "Cloud Architect", "ML Enthusiast"];

const techIcons = [
  { name: "React", color: "text-neon-cyan" },
  { name: "Python", color: "text-neon-green" },
  { name: "AWS", color: "text-neon-blue" },
  { name: "TensorFlow", color: "text-neon-purple" },
  { name: "Docker", color: "text-neon-cyan" },
  { name: "TypeScript", color: "text-neon-blue" },
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Open to Opportunities</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient">Alex Chen</span>
            </h1>

            <div className="h-10 mb-6">
              <span className="font-display text-xl sm:text-2xl text-primary">
                {displayText}
                <span className="animate-blink border-r-2 border-primary ml-0.5">&nbsp;</span>
              </span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              I build intelligent systems at the intersection of AI and software engineering. 
              Passionate about transforming complex problems into elegant, scalable solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity glow-blue"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Chat With My Resume
              </a>
            </div>
          </motion.div>

          {/* Right - Floating Tech Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex relative h-[400px] items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gradient">AC</span>
                </div>
              </div>
            </div>

            {techIcons.map((tech, i) => {
              const angle = (i * 360) / techIcons.length;
              const radius = 140;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <motion.div
                  key={tech.name}
                  className="absolute glass-panel px-3 py-1.5 text-xs font-medium"
                  style={{
                    left: `calc(50% + ${x}px - 30px)`,
                    top: `calc(50% + ${y}px - 14px)`,
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                >
                  <span className={tech.color}>{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
