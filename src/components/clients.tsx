import { Badge } from "@/components/ui/badge";

// Import SVG icons
import ClaudeIcon from "@/assets/icon/claude-color.svg";
import CursorIcon from "@/assets/icon/cursor.svg";
import VSCodeIcon from "@/assets/icon/vscode.svg";
import OpenAIIcon from "@/assets/icon/openai.svg";
import AmpIcon from "@/assets/icon/amp.svg";
import OpenCodeIcon from "@/assets/icon/opencode.svg";
import GooseIcon from "@/assets/icon/goose.svg";
import AnthropicIcon from "@/assets/icon/anthropic.svg";
import GithubIcon from "@/assets/icon/github.svg";

const clients = [
  {
    name: "Claude",
    description: "Anthropic's Claude Desktop app",
    icon: ClaudeIcon,
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "Claude Code",
    description: "Claude's coding-focused interface",
    icon: ClaudeIcon,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "Cursor",
    description: "AI-powered code editor",
    icon: CursorIcon,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "VS Code",
    description: "Visual Studio Code with AI extensions",
    icon: VSCodeIcon,
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Codex",
    description: "OpenAI Codex integration",
    icon: OpenAIIcon,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Amp Code",
    description: "Amp's AI coding assistant",
    icon: AmpIcon,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "OpenCode",
    description: "Open-source AI coding platform",
    icon: OpenCodeIcon,
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    name: "Goose",
    description: "Block's AI agent platform",
    icon: GooseIcon,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    name: "Letta",
    description: "Memory-focused AI platform",
    icon: AnthropicIcon,
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    name: "GitHub",
    description: "GitHub Copilot integration",
    icon: GithubIcon,
    color: "from-gray-500/20 to-slate-500/20",
  },
];

export function Clients() {
  return (
    <section id="clients" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Integrations
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-medium mb-4">
            Works With Your Favorite Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Skiller supports installing skills to all major AI coding assistants.
            Choose your target client during installation.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 text-center"
            >

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-center mb-3">
                  <img src={client.icon} alt={client.name} className="w-10 h-10" />
                </div>
                <h3 className="font-medium text-sm mb-1">{client.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
