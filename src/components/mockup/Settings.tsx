import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, X } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface SettingsProps {
  onClose?: () => void;
}

// Section divider
function Divider() {
  return <div className="h-px bg-border/50 my-4" />;
}

// Section title component
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
      {children}
    </h3>
  );
}

// Toggle switch component
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={`w-12 h-7 rounded-full relative transition-colors duration-200 ${
        checked ? "bg-muted" : "bg-border"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full absolute top-1 transition-all duration-200 shadow-sm ${
          checked ? "right-1 bg-muted-foreground" : "left-1 bg-muted-foreground/50"
        }`}
      />
    </button>
  );
}

// Theme button group component - full width with border
function ThemeButtonGroup({
  value,
  onChange,
}: {
  value: Theme;
  onChange: (theme: Theme) => void;
}) {
  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <Sun className="size-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="size-4" /> },
    { value: "system", label: "System", icon: <Monitor className="size-4" /> },
  ];

  return (
    <div className="flex bg-muted/50 rounded-full p-1 border border-border/50 h-12">
      {themes.map((theme) => (
        <button
          key={theme.value}
          onClick={() => onChange(theme.value)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-[13px] font-medium transition-all duration-150 ${
            value === theme.value
              ? "bg-card text-foreground shadow-sm border border-border/30"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {theme.icon}
          {theme.label}
        </button>
      ))}
    </div>
  );
}

export function Settings({ onClose }: SettingsProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      if (stored) return stored;
      return "system";
    }
    return "system";
  });
  const [showInDock, setShowInDock] = useState(false);
  const [shortcut] = useState("⌃ + ⌥ + X");
  const [downloadPath] = useState("/Users/zanwei.guo/Desktop");

  // Apply theme effect
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", systemPrefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("dark", e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  return (
    <div className="flex flex-col flex-1 bg-sidebar">
      {/* Settings Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <h2 className="text-[15px] font-semibold text-foreground">Settings</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="size-4" />
        </button>
      </header>

      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {/* APPEARANCE Section */}
        <section>
          <SectionTitle>APPEARANCE</SectionTitle>
          
          <div className="space-y-4">
            {/* Theme */}
            <div>
              <h4 className="text-[13px] font-medium text-foreground mb-2">Theme</h4>
              <ThemeButtonGroup value={theme} onChange={setTheme} />
            </div>

            {/* Show in Dock */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-medium text-foreground">Show Skiller in Dock</h4>
                <p className="text-[12px] text-muted-foreground">Display app icon in macOS Dock</p>
              </div>
              <Toggle checked={showInDock} onChange={setShowInDock} />
            </div>
          </div>
        </section>

        <Divider />

        {/* QUICK ACCESS Section */}
        <section>
          <SectionTitle>QUICK ACCESS</SectionTitle>
          
          <div>
            <h4 className="text-[13px] font-medium text-foreground">Global Shortcut</h4>
            <p className="text-[12px] text-muted-foreground mb-2">Press a key combination to quickly open Skiller</p>
            
            <div className="relative">
              <input
                type="text"
                readOnly
                placeholder="Click to set shortcut"
                value={shortcut}
                className="w-full h-10 py-2 px-4 bg-input border border-border/50 rounded-xl text-[13px] text-foreground text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-border transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <X className="size-4" />
              </button>
            </div>
          </div>
        </section>

        <Divider />

        {/* DOWNLOAD & INSTALLATION Section */}
        <section>
          <SectionTitle>DOWNLOAD & INSTALLATION</SectionTitle>
          
          <div className="space-y-4">
            {/* Default Download Path */}
            <div>
              <h4 className="text-[13px] font-medium text-foreground">Default Download Path</h4>
              <p className="text-[12px] text-muted-foreground mb-2">Where to save downloaded skill files (default: system Downloads folder)</p>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={downloadPath}
                  readOnly
                  className="flex-1 h-10 py-2 px-3 bg-input border border-border/50 rounded-lg text-[13px] text-foreground"
                />
                <button className="h-10 py-2 px-4 bg-input border border-border/50 rounded-lg text-[13px] font-medium text-foreground hover:bg-muted transition-colors">
                  Browse
                </button>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Footer */}
        <div className="text-center pt-2 pb-4">
          <p className="text-[12px] text-muted-foreground">Skiller v1.0.3</p>
          <a href="https://claude-plugins.dev" className="text-[12px] text-primary hover:underline">
            Powered by claude-plugins.dev
          </a>
        </div>
      </main>
    </div>
  );
}
