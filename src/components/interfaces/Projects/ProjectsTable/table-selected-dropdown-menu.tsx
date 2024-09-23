import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Sparkle, Plus } from 'lucide-react';

interface DropdownTableProps {
  disabled: boolean;
  onGenerateAnswer: () => void;
  onCommitChanges: () => void;
}

export default function TableSelectedDropdownMenu({
  disabled,
  onGenerateAnswer,
  onCommitChanges,
}: DropdownTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onGenerateAnswer}>
            <Sparkle className="mr-2 h-4 w-4" />
            <span>Generate answers</span>
            <DropdownMenuShortcut>⌘+G</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onCommitChanges}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Commit all changes</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
