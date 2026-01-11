import { Button } from "@/components/ui/button";
import type { Plugin } from "./mockData";

interface PluginCardProps {
  plugin: Plugin;
  onInstall?: (plugin: Plugin) => void;
  onOpen?: (plugin: Plugin) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

// Get tag color based on category
function getTagStyle(category: string): { color: string; bg: string } {
  const tagStyles: Record<string, { color: string; bg: string }> = {
    "Analysis": { color: "oklch(0.65 0.2 290)", bg: "oklch(0.65 0.2 290 / 0.15)" },
    "Git": { color: "oklch(0.7 0.2 145)", bg: "oklch(0.7 0.2 145 / 0.15)" },
    "Testing": { color: "oklch(0.68 0.18 160)", bg: "oklch(0.68 0.18 160 / 0.15)" },
    "Documentation": { color: "oklch(0.6 0.2 250)", bg: "oklch(0.6 0.2 250 / 0.15)" },
    "Refactoring": { color: "oklch(0.7 0.18 220)", bg: "oklch(0.7 0.18 220 / 0.15)" },
    "Security": { color: "oklch(0.6 0.22 15)", bg: "oklch(0.6 0.22 15 / 0.15)" },
    "Performance": { color: "oklch(0.75 0.2 90)", bg: "oklch(0.75 0.2 90 / 0.15)" },
    "TypeScript": { color: "oklch(0.6 0.18 240)", bg: "oklch(0.6 0.18 240 / 0.15)" },
    "Database": { color: "oklch(0.65 0.15 250)", bg: "oklch(0.65 0.15 250 / 0.15)" },
    "API": { color: "oklch(0.7 0.2 50)", bg: "oklch(0.7 0.2 50 / 0.15)" },
    "Utilities": { color: "oklch(0.68 0.2 350)", bg: "oklch(0.68 0.2 350 / 0.15)" },
    "Styling": { color: "oklch(0.68 0.2 350)", bg: "oklch(0.68 0.2 350 / 0.15)" },
    "DevOps": { color: "oklch(0.65 0.2 140)", bg: "oklch(0.65 0.2 140 / 0.15)" },
    "Data": { color: "oklch(0.7 0.2 200)", bg: "oklch(0.7 0.2 200 / 0.15)" },
    "AI-Powered": { color: "oklch(0.6 0.22 300)", bg: "oklch(0.6 0.22 300 / 0.15)" },
    "Workflow-Automation": { color: "oklch(0.68 0.2 130)", bg: "oklch(0.68 0.2 130 / 0.15)" },
  };
  return tagStyles[category] || { color: "hsl(var(--primary))", bg: "hsl(var(--primary) / 0.15)" };
}

export function PluginCard({ plugin, onInstall, onOpen }: PluginCardProps) {
  const tagStyle = getTagStyle(plugin.category);

  return (
    <div
      className={`
        flex flex-col gap-2 p-3 rounded-lg border-[0.5px] transition-all duration-150
        ${
          plugin.installed
            ? "border-[hsl(173_58%_39%/0.5)] bg-[hsl(173_58%_39%/0.05)]"
            : "bg-card border-border/50 hover:border-foreground/20 shadow-[0_3px_2px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.09),0_0_1px_0_rgba(0,0,0,0.10)]"
        }
      `}
    >
      {/* Header: Name + Stats */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[13px] font-semibold text-foreground break-words">
          {plugin.name}
          {plugin.installed && (
            <span className="px-1.5 py-0.5 text-[9px] font-semibold text-[hsl(173_58%_39%)] bg-[hsl(173_58%_39%/0.15)] rounded-full uppercase tracking-[0.5px]">
              Installed
            </span>
          )}
        </h3>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground" title="Downloads">
            <DownloadIcon />
            {formatNumber(plugin.downloads)}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground" title="Stars">
            <StarIcon />
            {formatNumber(plugin.stars)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[12px] text-muted-foreground leading-[1.5] line-clamp-2">
        {plugin.description}
      </p>

      {/* Tags */}
      {(plugin.tags && plugin.tags.length > 0) || plugin.category ? (
        <div className="flex flex-wrap gap-1">
          {plugin.tags && plugin.tags.length > 0 ? (
            plugin.tags.slice(0, 3).map((tag) => {
              const style = getTagStyle(tag);
              return (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-[0.5px]"
                  style={{ color: style.color, backgroundColor: style.bg }}
                >
                  {tag}
                </span>
              );
            })
          ) : (
            <span
              className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-[0.5px]"
              style={{ color: tagStyle.color, backgroundColor: tagStyle.bg }}
            >
              {plugin.category}
            </span>
          )}
          {plugin.tags && plugin.tags.length > 3 && (
            <span className="text-[10px] text-muted-foreground px-1.5 py-0.5">
              +{plugin.tags.length - 3}
            </span>
          )}
        </div>
      ) : null}

      {/* Actions */}
      <div className="flex gap-2 mt-1 pt-2 border-t border-border/50">
        <Button
          size="sm"
          className="h-[29px] px-3 text-[12px] font-medium bg-primary hover:bg-primary/90"
          onClick={() => plugin.installed ? onOpen?.(plugin) : onInstall?.(plugin)}
        >
          Install
        </Button>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2v6M3.5 5.5L6 8l2.5-2.5M2 10h8" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 1l1.5 3.1 3.4.5-2.5 2.4.6 3.4L6 8.8l-3 1.6.6-3.4-2.5-2.4 3.4-.5L6 1z" />
    </svg>
  );
}
