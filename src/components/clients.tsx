import { motion } from "motion/react";

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
  { name: "Claude", icon: ClaudeIcon },
  { name: "Claude Code", icon: ClaudeIcon },
  { name: "Cursor", icon: CursorIcon },
  { name: "VS Code", icon: VSCodeIcon },
  { name: "Codex", icon: OpenAIIcon },
  { name: "Amp Code", icon: AmpIcon },
  { name: "OpenCode", icon: OpenCodeIcon },
  { name: "Goose", icon: GooseIcon },
  { name: "Letta", icon: AnthropicIcon },
  { name: "GitHub", icon: GithubIcon },
];

export function Clients() {
  return (
    <section id="clients" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Integrations
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-balance">
            Works with your favorite tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Install skills to all major AI coding assistants.
          </p>
        </motion.div>

        {/* Simple Grid - Better Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {clients.map((client, index) => (
            <div
              key={client.name + index}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <img
                src={client.icon}
                alt={client.name}
                className="size-5 shrink-0"
              />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
