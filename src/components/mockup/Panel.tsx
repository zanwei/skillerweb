import type { ReactNode } from "react";
import { Settings } from "lucide-react";

interface PanelProps {
  children: ReactNode;
  onOpenSettings?: () => void;
  showHeader?: boolean;
}

export function Panel({ children, onOpenSettings, showHeader = true }: PanelProps) {
  return (
    <div className="relative flex flex-col bg-sidebar border border-border/50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden w-[420px] min-w-[420px] max-w-[420px] h-[682px]">
      {/* Window Header - only show when not in settings */}
      {showHeader && (
        <header className="flex items-center justify-between h-[41px] px-2 border-b border-border/50 bg-sidebar">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Skiller"
              className="w-6 h-6 rounded-md object-contain"
              onError={(e) => {
                // Fallback to text logo if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden w-6 h-6 rounded-md bg-primary items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">S</span>
            </div>
            <span className="font-semibold text-[15px] text-foreground">Skiller</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Settings"
          >
            <Settings className="size-4" />
          </button>
        </header>
      )}

      {/* Content */}
      {children}
    </div>
  );
}
