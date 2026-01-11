// Types
export interface Plugin {
  id: number;
  name: string;
  description: string;
  author: string;
  stars: number;
  downloads: number;
  installed: boolean;
  category: string;
  tags?: string[];
  icon: string;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  owner: string;
  downloads: number;
  stars: number;
  supportedClients: string[];
}

export interface Client {
  id: string;
  name: string;
  icon: string;
}

// Supported clients for skill installation
export const supportedClients: Client[] = [
  { id: "claude-code", name: "Claude Code", icon: "🤖" },
  { id: "cursor", name: "Cursor", icon: "⌨️" },
  { id: "vscode", name: "VS Code", icon: "💻" },
  { id: "codex", name: "Codex", icon: "🔮" },
  { id: "amp-code", name: "Amp Code", icon: "⚡" },
  { id: "goose", name: "Goose", icon: "🪿" },
];

// Mock plugins - matching original skiller app
export const mockPlugins: Plugin[] = [
  {
    id: 1,
    name: "frontend-design",
    description: "Create distinctive, production-grade frontend interfaces with high design quality.",
    author: "anthropic",
    stars: 53900,
    downloads: 2800,
    installed: false,
    category: "",
    icon: "",
  },
  {
    id: 2,
    name: "compounding-engineering",
    description: "AI-powered development tools that get smarter with every use.",
    author: "gitmaster",
    stars: 2400,
    downloads: 1400,
    installed: false,
    category: "",
    tags: ["AI-Powered", "Workflow-Automation"],
    icon: "",
  },
  {
    id: 3,
    name: "feature-dev",
    description: "Comprehensive feature development workflow with specialized agents.",
    author: "testify",
    stars: 53900,
    downloads: 1400,
    installed: false,
    category: "",
    icon: "",
  },
];

// Mock skills - matching original skiller app
export const mockSkills: Skill[] = [
  {
    id: 1,
    name: "frontend-design",
    description: "Create distinctive, production-grade frontend interfaces with high design quality.",
    owner: "anthropics",
    downloads: 8700,
    stars: 52400,
    supportedClients: ["claude-code", "cursor", "vscode", "codex", "amp", "opencode", "goose", "letta", "github"],
  },
  {
    id: 2,
    name: "prompt-engineering-patterns",
    description: "Master advanced prompt engineering techniques to maximize LLM performance.",
    owner: "wshobson",
    downloads: 886,
    stars: 21000,
    supportedClients: ["claude-code", "cursor", "vscode", "codex", "amp", "opencode", "goose", "letta", "github"],
  },
  {
    id: 3,
    name: "brainstorming",
    description: "You MUST use this before any creative work - creating features, building components.",
    owner: "obra",
    downloads: 825,
    stars: 14900,
    supportedClients: ["claude-code", "cursor", "vscode", "codex", "amp", "opencode", "goose", "letta", "github"],
  },
];

// Categories for filtering
export const pluginCategories = [
  "All",
  "Analysis",
  "Git",
  "Testing",
  "Documentation",
  "Refactoring",
  "Security",
  "Performance",
  "TypeScript",
  "Database",
  "API",
  "Utilities",
  "Styling",
  "DevOps",
  "Data",
];

export const skillCategories = [
  "All",
  "Data",
  "System",
  "Automation",
  "Media",
  "Testing",
  "Database",
  "Version Control",
  "DevOps",
  "Cloud",
  "Documents",
  "Communication",
  "Integration",
  "Network",
];

// Sort options
export const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Recently Added" },
  { value: "stars", label: "Most Stars" },
  { value: "name", label: "Name A-Z" },
];
