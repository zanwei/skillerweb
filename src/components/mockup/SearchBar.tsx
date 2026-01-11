import type { ReactNode } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  filterDropdown?: ReactNode;
  sortDropdown?: ReactNode;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  filterDropdown,
  sortDropdown,
}: SearchBarProps) {
  return (
    <div className="flex gap-2 px-2 py-2 border-b border-border/50 bg-sidebar">
      {/* Search Input */}
      <div className="flex items-center flex-1 h-[33px] gap-2 px-3 bg-card border-[0.5px] border-border/50 rounded-lg transition-all duration-150 shadow-[0_3px_2px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.09),0_0_1px_0_rgba(0,0,0,0.10)] focus-within:border-primary focus-within:shadow-[0_0_0_2px_hsl(var(--primary)/0.2)]">
        <SearchIcon />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground border-none outline-none"
        />
        {value && (
          <button
            className="flex items-center justify-center p-0.5 text-muted-foreground hover:text-foreground hover:bg-border/50 rounded transition-all"
            onClick={() => onChange("")}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      {filterDropdown}

      {/* Sort Dropdown */}
      {sortDropdown}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="flex-shrink-0 text-muted-foreground" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="4.5" />
      <path d="M9.5 9.5L13 13" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3l6 6M9 3l-6 6" />
    </svg>
  );
}
