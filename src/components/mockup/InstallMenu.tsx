import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supportedClients, type Skill } from "./mockData";

interface InstallMenuProps {
  skill: Skill;
  onInstallTo?: (skill: Skill, clientId: string) => void;
  trigger: ReactNode;
}

export function InstallMenu({ skill, onInstallTo, trigger }: InstallMenuProps) {
  const availableClients = supportedClients.filter((client) =>
    skill.supportedClients.includes(client.id)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Install to...
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableClients.map((client) => (
          <DropdownMenuItem
            key={client.id}
            onClick={() => onInstallTo?.(skill, client.id)}
            className="text-xs gap-2"
          >
            <span>{client.icon}</span>
            <span>{client.name}</span>
          </DropdownMenuItem>
        ))}
        {availableClients.length === 0 && (
          <DropdownMenuItem disabled className="text-xs text-muted-foreground">
            No compatible clients
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
