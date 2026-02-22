import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

const suggestedQuestions = [
  "What are his strongest skills?",
  "Explain his AI projects",
  "Is he backend or frontend focused?",
  "What makes him unique?",
  "What's his education background?",
  "Is he open to internships?",
];

const mockResponses: Record<string, string> = {
  "What are his strongest skills?":
    "Alex's strongest skills span **AI/ML engineering** and **full-stack development**. His top proficiencies include:\n\n- **Python** (92%) — Primary language for AI/ML pipelines\n- **React** (90%) — Building complex, interactive UIs\n- **TypeScript** (88%) — Type-safe application development\n- **TensorFlow** (85%) — Deep learning model training\n\nHe's particularly strong at bridging the gap between ML research and production systems.",
  "Explain his AI projects":
    "Alex has worked on several AI-focused projects:\n\n1. **AI Document Analyzer** — An NLP pipeline using custom fine-tuned BERT models that processes 10K+ documents daily with 94% accuracy.\n\n2. **Generative Art Engine** — A creative AI system combining StyleGAN2 with interactive latent space exploration.\n\nEach project demonstrates his ability to take AI from prototype to production.",
  "Is he backend or frontend focused?":
    "Alex is a **true full-stack engineer** with a slight lean toward backend/AI systems. He's equally comfortable building React frontends as he is designing ML pipelines and cloud infrastructure. His sweet spot is building end-to-end AI-powered applications.",
  "What makes him unique?":
    "What sets Alex apart is his **dual expertise** in AI engineering and product thinking. He doesn't just build models — he builds **complete products** around them. His portfolio demonstrates:\n\n- Strong UI/UX sensibility\n- Production-grade ML systems\n- Cloud-native architecture\n- Clear technical communication",
  "What's his education background?":
    "Alex holds a **B.S. in Computer Science** from State University (GPA 3.8) with a focus on AI/ML. He's also **AWS Certified Solutions Architect**, demonstrating cloud expertise beyond academic credentials.",
  "Is he open to internships?":
    "Yes! Alex is actively seeking **AI Engineering** and **Full Stack Development** internship opportunities. He's particularly interested in roles where he can work on production ML systems and innovative AI products.",
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm an AI trained on Alex's resume and portfolio. Ask me anything about his skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg = text.trim();
    setInput("");
    
    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      // Prepare history format for the backend
      const history = messages.slice(1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("http://localhost:8022/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: userMsg,
          history: history
        })
      });

      if (!res.ok) throw new Error("API response was not ok");
      
      const data = await res.json();
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "No response received" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Sorry, I am having trouble connecting to the backend right now. Please make sure the FastAPI server is running." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="chat" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">AI-Powered</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Ask My Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            AI trained on my resume & portfolio — ask anything about my experience, skills, and projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 max-w-5xl mx-auto">
          {/* Left - Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Suggested Questions
            </h3>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </motion.div>

          {/* Right - Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel gradient-border flex flex-col h-[500px]"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "bg-primary/20" : "bg-accent/20"
                  }`}>
                    {msg.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-accent" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/80 text-foreground"
                  }`}>
                    {msg.content.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-2" : ""}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k} className="font-semibold">{part.slice(2, -2)}</strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-secondary/80 rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="flex-1 bg-secondary/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-3 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
