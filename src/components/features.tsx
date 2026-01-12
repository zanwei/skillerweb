import { useEffect, useRef } from "react";
import {
  Puzzle,
  Sparkles,
  Keyboard,
  Terminal,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "Browse Plugins",
    description:
      "Discover and install Claude Code plugins from a curated registry.",
    span: "lg:col-span-2",
  },
  {
    icon: Sparkles,
    title: "Install Skills",
    description:
      "Add new skills to your AI assistant with one click.",
    span: "",
  },
  {
    icon: Keyboard,
    title: "Global Shortcuts",
    description:
      "Access Skiller instantly with customizable keyboard shortcuts.",
    span: "",
  },
  {
    icon: Terminal,
    title: "Multi-Terminal",
    description:
      "Works with iTerm, Terminal, Warp, Alacritty, Kitty, and more.",
    span: "",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with Tauri and Rust for native performance.",
    span: "",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "All data stays on your machine. No accounts, no tracking.",
    span: "lg:col-span-2",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe feature cards with staggered delay
    const cards = gridRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card, index) => {
      (card as HTMLElement).style.transitionDelay = `${index * 50}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 animate-on-scroll"
        >
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-balance">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Powerful features to help you discover and manage AI plugins and skills.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors ${feature.span}`}
            >
              {/* Icon */}
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                <feature.icon className="size-5 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
