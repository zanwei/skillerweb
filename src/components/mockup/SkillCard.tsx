import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Skill } from "./mockData";
import { InstallMenu } from "./InstallMenu";

interface SkillCardProps {
  skill: Skill;
  onInstall?: (skill: Skill) => void;
  onInstallTo?: (skill: Skill, client: string) => void;
  onDownload?: (skill: Skill) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function SkillCard({ skill, onInstall, onInstallTo, onDownload }: SkillCardProps) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border-[0.5px] bg-card border-border/50 hover:border-foreground/20 shadow-[0_3px_2px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.09),0_0_1px_0_rgba(0,0,0,0.10)] transition-all duration-150">
      {/* Header: Name + Stats */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[13px] font-semibold text-foreground break-words">
          {skill.name}
        </h3>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground" title="Downloads">
            <DownloadIcon />
            {formatNumber(skill.downloads)}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground" title="Stars">
            <StarIcon />
            {formatNumber(skill.stars)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[12px] text-muted-foreground leading-[1.5] line-clamp-2">
        {skill.description}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 mt-1 pt-2 border-t border-border/50">
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            className="h-[29px] px-3 text-[12px] font-medium bg-primary hover:bg-primary/90"
            onClick={() => onInstall?.(skill)}
          >
            Install
          </Button>
          <InstallMenu
            skill={skill}
            onInstallTo={onInstallTo}
            trigger={
              <Button
                size="sm"
                variant="secondary"
                className="h-[29px] px-2.5 text-[12px] font-medium gap-1"
              >
                Install to...
                <ChevronDown className="size-3" />
              </Button>
            }
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-[29px] px-2.5 text-[12px] font-medium gap-1"
          onClick={() => onDownload?.(skill)}
        >
          <DownloadIconSmall />
          Download skill
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

function DownloadIconSmall() {
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
