import { SkillCard } from "./SkillCard";
import type { Skill } from "./mockData";

interface SkillListProps {
  skills: Skill[];
  total: number;
  onInstall?: (skill: Skill) => void;
  onInstallTo?: (skill: Skill, client: string) => void;
  onDownload?: (skill: Skill) => void;
}

export function SkillList({ skills, total, onInstall, onInstallTo, onDownload }: SkillListProps) {
  if (skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-[13px] text-muted-foreground">No skills found</p>
      </div>
    );
  }

  return (
    <>
      {/* Stats - shown above the scrollable content */}
      <div className="py-1 px-3 text-[11px] text-muted-foreground text-center bg-sidebar">
        Showing {skills.length} of {total} skills
      </div>

      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto p-2 bg-sidebar">
        {/* Card List */}
        <div className="flex flex-col gap-2">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onInstall={onInstall}
              onInstallTo={onInstallTo}
              onDownload={onDownload}
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
