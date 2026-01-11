import type { ReactNode } from "react";
import { Settings } from "lucide-react";

interface PanelProps {
  children: ReactNode;
  onOpenSettings?: () => void;
  showHeader?: boolean;
}

export function Panel({ children, onOpenSettings, showHeader = true }: PanelProps) {
  return (
    <div className="relative flex flex-col bg-sidebar/95 dark:bg-sidebar/95 backdrop-blur-[40px] border border-border/30 rounded-2xl shadow-[0_0_0_1px_hsl(var(--sidebar-border)/0.3),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden w-[420px] h-[682px]">
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
