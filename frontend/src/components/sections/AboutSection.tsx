import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const skills = [
  { name: "Python", level: 92, category: "AI/ML" },
  { name: "TensorFlow", level: 85, category: "AI/ML" },
  { name: "React", level: 90, category: "Dev" },
  { name: "TypeScript", level: 88, category: "Dev" },
  { name: "AWS", level: 82, category: "Cloud" },
  { name: "Docker", level: 78, category: "Cloud" },
  { name: "Node.js", level: 85, category: "Dev" },
  { name: "PostgreSQL", level: 80, category: "Dev" },
];

const techStack = [
  { name: "React", desc: "Frontend framework for building interactive UIs" },
  { name: "Python", desc: "Primary language for AI/ML development" },
  { name: "TensorFlow", desc: "Deep learning framework for model training" },
  { name: "AWS", desc: "Cloud infrastructure and deployment" },
  { name: "Docker", desc: "Containerization for consistent deployments" },
  { name: "PostgreSQL", desc: "Relational database for structured data" },
  { name: "Redis", desc: "In-memory caching for performance" },
  { name: "GraphQL", desc: "Flexible API query language" },
];

const timeline = [
  { year: "2024", title: "AI Engineer Intern", company: "TechCorp AI", icon: Briefcase, desc: "Built NLP pipeline processing 10K+ documents daily" },
  { year: "2023", title: "Full Stack Developer", company: "StartupXYZ", icon: Briefcase, desc: "Led development of real-time analytics dashboard" },
  { year: "2023", title: "AWS Certified", company: "Solutions Architect", icon: Award, desc: "Cloud architecture and best practices" },
  { year: "2022", title: "B.S. Computer Science", company: "State University", icon: GraduationCap, desc: "Focus on AI/ML, GPA 3.8" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A developer who thinks in systems and builds with purpose. I bridge the gap between 
            cutting-edge AI research and production-ready software.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Skill Proficiency</h3>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(270 70% 60%))",
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Tech Chips */}
            <div className="pt-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Tooltip key={tech.name}>
                    <TooltipTrigger asChild>
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-default">
                        {tech.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[200px]">{tech.desc}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Experience</h3>
            <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-secondary border-2 border-primary flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-semibold">{item.year}</span>
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
