import { motion } from "framer-motion";
import { Download, Award, Briefcase, Code, GraduationCap } from "lucide-react";

const resumeSections = [
  {
    icon: Briefcase,
    title: "Experience",
    items: [
      { primary: "AI Engineer Intern — TechCorp AI", secondary: "Jan 2024 – Present", detail: "Built NLP pipeline, reduced processing time by 40%" },
      { primary: "Full Stack Developer — StartupXYZ", secondary: "Jun 2023 – Dec 2023", detail: "Led analytics dashboard serving 5K+ daily users" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    items: [
      { primary: "B.S. Computer Science", secondary: "State University, 2022", detail: "GPA 3.8, AI/ML Focus, Dean's List" },
    ],
  },
  {
    icon: Award,
    title: "Certifications",
    items: [
      { primary: "AWS Solutions Architect", secondary: "2023", detail: "Cloud architecture and best practices" },
      { primary: "TensorFlow Developer Certificate", secondary: "2023", detail: "Deep learning with TensorFlow" },
    ],
  },
  {
    icon: Code,
    title: "Technical Skills",
    items: [
      { primary: "Languages", secondary: "", detail: "Python, TypeScript, JavaScript, SQL, Go" },
      { primary: "AI/ML", secondary: "", detail: "TensorFlow, PyTorch, scikit-learn, NLP, Computer Vision" },
      { primary: "Cloud & DevOps", secondary: "", detail: "AWS, Docker, Kubernetes, Terraform, CI/CD" },
    ],
  },
];

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-muted-foreground mb-6">A snapshot of my professional journey.</p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity glow-blue">
            <Download className="w-4 h-4" /> Download Resume
          </button>
        </motion.div>

        <div className="space-y-8">
          {resumeSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item, j) => (
                  <div key={j} className="pl-11">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-medium text-sm text-foreground">{item.primary}</span>
                      {item.secondary && (
                        <span className="text-xs text-muted-foreground">{item.secondary}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
