import { PluginCard } from "./PluginCard";
import type { Plugin } from "./mockData";

interface PluginListProps {
  plugins: Plugin[];
  total?: number;
  onInstall?: (plugin: Plugin) => void;
  onOpen?: (plugin: Plugin) => void;
}

export function PluginList({ plugins, total, onInstall, onOpen }: PluginListProps) {
  if (plugins.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-[13px] text-muted-foreground">No plugins found</p>
      </div>
    );
  }

  return (
    <>
      {/* Stats - shown above the scrollable content */}
      {total !== undefined && (
        <div className="py-1 px-3 text-[11px] text-muted-foreground text-center bg-sidebar">
          Showing {plugins.length} of {total} plugins
        </div>
      )}

      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto p-2 bg-sidebar">
        {/* Card List */}
        <div className="flex flex-col gap-2">
          {plugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              onInstall={onInstall}
              onOpen={onOpen}
            />
          ))}
        </div>

        {/* End of list */}
        <div className="py-4 text-[11px] text-muted-foreground/60 text-center">
          — End of list —
        </div>
      </main>
    </>
  );
}
