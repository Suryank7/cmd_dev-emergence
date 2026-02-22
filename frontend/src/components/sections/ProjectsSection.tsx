import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Brain, Server, Cloud, FlaskConical } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI Projects", icon: Brain },
  { id: "fullstack", label: "Full Stack", icon: Server },
  { id: "cloud", label: "Cloud", icon: Cloud },
  { id: "experimental", label: "Experimental", icon: FlaskConical },
];

const projects = [
  {
    id: 1,
    title: "AI Document Analyzer",
    category: "ai",
    description: "NLP-powered document processing pipeline that extracts, classifies, and summarizes content from unstructured documents with 94% accuracy.",
    aiHighlight: "Custom BERT fine-tuning for domain-specific entity extraction",
    tags: ["Python", "TensorFlow", "FastAPI", "Redis"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Real-Time Analytics Dashboard",
    category: "fullstack",
    description: "Full-stack analytics platform with real-time data visualization, user authentication, and role-based access control serving 5K+ daily users.",
    aiHighlight: "Anomaly detection ML model for metric alerting",
    tags: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Cloud Infrastructure Automator",
    category: "cloud",
    description: "Infrastructure-as-code toolkit that automates AWS resource provisioning, monitoring, and cost optimization across multi-account environments.",
    aiHighlight: "ML-based cost prediction and optimization recommendations",
    tags: ["AWS", "Terraform", "Python", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Generative Art Engine",
    category: "experimental",
    description: "Creative AI system that generates unique artwork by combining style transfer, GANs, and user-guided parameters in real-time.",
    aiHighlight: "Custom StyleGAN2 architecture with interactive latent space exploration",
    tags: ["PyTorch", "React", "WebGL", "CUDA"],
    github: "#",
    demo: "#",
  },
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated selection of projects that showcase my approach to problem-solving with AI and modern engineering.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground glow-blue"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel gradient-border p-6 group hover:bg-card/80 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image placeholder */}
                <div className="h-40 rounded-lg bg-secondary/50 mb-5 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <Brain className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">Project Preview</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{project.description}</p>

                {/* AI highlight */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 mb-4">
                  <Brain className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-primary">{project.aiHighlight}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded bg-secondary text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a href={project.github} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                  <a href={project.demo} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
