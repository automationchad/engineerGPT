import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MoreHorizontal, Sparkle, Plus } from "lucide-react";

interface DropdownTableProps {
  projectId: string;
  disabled: boolean;
  onRemoveProject: () => void;
}

export default function TableItemDropdownMenu({ projectId, onRemoveProject, disabled }: DropdownTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/projects/${projectId}`}>Edit project</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemoveProject}>Remove project</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
