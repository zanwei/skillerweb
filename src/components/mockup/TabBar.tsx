export type Tab = "plugins" | "skills" | "installed";

interface TabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  installedCount?: number;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "plugins", label: "Plugins" },
  { id: "skills", label: "Skills" },
  { id: "installed", label: "Installed" },
];

export function TabBar({ activeTab, onTabChange, installedCount = 0 }: TabBarProps) {
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <nav className="p-2 bg-sidebar">
      <div className="relative flex bg-card border border-border/50 rounded-full p-[3px] shadow-[0_3px_2px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.09),0_0_1px_0_rgba(0,0,0,0.10)]">
        {/* Sliding indicator */}
        <div
          className="absolute top-[3px] bottom-[3px] bg-black/[0.08] rounded-full transition-[left] duration-150 ease-out z-0"
          style={{
            left: `calc(${(activeIndex * 100) / tabs.length}% + 3px)`,
            width: `calc(${100 / tabs.length}% - 6px)`,
          }}
        />
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 relative z-[1] flex items-center justify-center gap-1.5
                px-3 py-2 text-[13px] font-medium rounded-full
                transition-colors duration-200 outline-none
                ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {tab.label}
              {tab.id === "installed" && installedCount > 0 && (
                <span
                  className={`
                    inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5
                    text-[10px] font-semibold rounded-full transition-colors duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/90 text-primary-foreground"
                    }
                  `}
                >
                  {installedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
