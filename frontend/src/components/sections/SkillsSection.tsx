import { motion } from "framer-motion";
import { Brain, Cloud as CloudIcon, Code, Gauge } from "lucide-react";

const skillCategories = [
  {
    title: "AI / Machine Learning",
    icon: Brain,
    color: "from-neon-purple to-neon-blue",
    skills: [
      { name: "TensorFlow / Keras", level: 85, confidence: "High" },
      { name: "PyTorch", level: 78, confidence: "High" },
      { name: "Natural Language Processing", level: 82, confidence: "High" },
      { name: "Computer Vision", level: 70, confidence: "Medium" },
      { name: "scikit-learn", level: 88, confidence: "High" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: CloudIcon,
    color: "from-neon-cyan to-neon-blue",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 82, confidence: "High" },
      { name: "Docker", level: 78, confidence: "High" },
      { name: "Kubernetes", level: 65, confidence: "Medium" },
      { name: "Terraform", level: 72, confidence: "Medium" },
      { name: "CI/CD Pipelines", level: 80, confidence: "High" },
    ],
  },
  {
    title: "Development",
    icon: Code,
    color: "from-neon-green to-neon-cyan",
    skills: [
      { name: "React / Next.js", level: 90, confidence: "High" },
      { name: "TypeScript", level: 88, confidence: "High" },
      { name: "Python", level: 92, confidence: "High" },
      { name: "Node.js", level: 85, confidence: "High" },
      { name: "PostgreSQL", level: 80, confidence: "High" },
    ],
  },
];

const orbitTech = ["React", "Python", "AWS", "TensorFlow", "Docker", "TypeScript", "Node.js", "PostgreSQL"];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Skills Lab</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive view of my technical toolkit with confidence ratings.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15 }}
              className="glass-panel p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <cat.icon className="w-4 h-4 text-background" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground">{cat.title}</h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-foreground">{skill.name}</span>
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3 h-3 text-muted-foreground" />
                        <span className={`text-[10px] font-semibold ${
                          skill.confidence === "High" ? "text-neon-green" : "text-neon-cyan"
                        }`}>
                          {skill.confidence}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: si * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Orbit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-primary">STACK</span>
              </div>
            </div>
            {/* Orbit rings */}
            <div className="absolute inset-4 rounded-full border border-border/30" />
            <div className="absolute inset-12 rounded-full border border-border/20" />

            {orbitTech.map((tech, i) => {
              const angle = (i * 360) / orbitTech.length - 90;
              const radius = 120;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <motion.div
                  key={tech}
                  className="absolute px-2 py-1 text-[10px] font-medium rounded bg-secondary text-muted-foreground"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 10px)`,
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                >
                  {tech}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
