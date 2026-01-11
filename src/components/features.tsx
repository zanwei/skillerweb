import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Puzzle,
  Sparkles,
  Settings,
  Keyboard,
  Terminal,
  Palette,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "Browse Plugins",
    description:
      "Discover and install Claude Code plugins from a curated registry. Search, filter, and explore plugins that extend your coding capabilities.",
    badge: "Core",
  },
  {
    icon: Sparkles,
    title: "Install Skills",
    description:
      "Add new skills to your AI assistant with one click. Choose from a variety of specialized skills for different coding tasks.",
    badge: "Core",
  },
  {
    icon: Settings,
    title: "Customizable Settings",
    description:
      "Configure themes, default paths, package managers, and terminals. Personalize Skiller to match your workflow.",
    badge: "Flexible",
  },
  {
    icon: Keyboard,
    title: "Global Shortcuts",
    description:
      "Access Skiller instantly with customizable keyboard shortcuts. No need to click through menus - just press and go.",
    badge: "Productivity",
  },
  {
    icon: Terminal,
    title: "Multi-Terminal Support",
    description:
      "Works with iTerm, Terminal, Warp, Alacritty, Kitty, and more. Commands run in your preferred terminal app.",
    badge: "Flexible",
  },
  {
    icon: Palette,
    title: "Theme Support",
    description:
      "Light, dark, or system-matched themes. Skiller adapts to your macOS appearance preferences automatically.",
    badge: "Design",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with Tauri and Rust for native performance. Instant startup, minimal memory usage, and blazing fast searches.",
    badge: "Performance",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "All data stays on your machine. No accounts required, no telemetry, no tracking. Just a helpful tool.",
    badge: "Security",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description:
      "Available for macOS, Windows, and Linux. Same great experience on any operating system.",
    badge: "Universal",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-medium mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Skiller is packed with features to help you discover, install, and
            manage Claude Code plugins and skills efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-input flex items-center justify-center mb-4 transition-colors">
                    <feature.icon className="size-6 text-foreground" />
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
