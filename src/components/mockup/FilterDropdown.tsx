import { useState, useRef, useEffect } from "react";

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        className={`
          flex items-center h-[33px] gap-1.5 px-3 text-[12px] font-medium whitespace-nowrap
          bg-card border-[0.5px] border-border/50 rounded-lg cursor-pointer
          transition-all duration-150
          shadow-[0_3px_2px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.09),0_0_1px_0_rgba(0,0,0,0.10)]
          hover:border-foreground/30 hover:text-foreground
          ${value ? "text-primary border-primary bg-primary/10" : "text-muted-foreground"}
        `}
        onClick={() => setOpen(!open)}
      >
        <span>{selectedOption?.label || label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 min-w-[140px] max-h-[200px] overflow-y-auto bg-sidebar border border-border rounded-lg shadow-[0_4px_12px_hsl(0_0%_0%/0.3)] z-[1000] animate-in fade-in-0 slide-in-from-top-1 duration-150">
          <button
            className={`
              block w-full px-3 py-2 text-left text-[12px] transition-all duration-100
              hover:bg-muted/50 hover:text-foreground
              ${!value ? "text-primary bg-primary/10" : "text-foreground/80"}
            `}
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            All
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              className={`
                block w-full px-3 py-2 text-left text-[12px] transition-all duration-100
                hover:bg-muted/50 hover:text-foreground
                ${value === option.value ? "text-primary bg-primary/10" : "text-foreground/80"}
              `}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}
