import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface DropdownTableProps {
  items: DropdownItem[];
  disabled?: boolean;
}

export default function TableItemDropdownMenu({ items, disabled = false }: DropdownTableProps) {
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
          {items.map((item, index) =>
            item.href ? (
              <DropdownMenuItem key={index} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={index} onClick={item.onClick}>
                {item.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
