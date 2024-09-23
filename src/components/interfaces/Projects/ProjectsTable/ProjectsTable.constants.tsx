"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import TableItemDropdownMenu from "./table-item-dropdown-menu";
import TableSelectedDropdownMenu from "./table-selected-dropdown-menu";

import { ArrowUpDown, Plus, Loader2, TriangleAlert, Check, OctagonX, Sparkle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            className="text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return name;
    },
    enableSorting: true,
  },

  // {
  //   accessorKey: "assigned",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Assigned to
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return format(new Date(created_at), "MM/dd/yyyy");
    },
  },

  {
    accessorKey: "database",
    header: () => <div className="text-left">Database</div>,
    cell: ({ row }) => {
      return row.original.database;
    },
  },

  {
    id: "actions",
    header: ({ table }) => <div className="text-right"></div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <TableItemDropdownMenu disabled={false} projectId={item.id} onRemoveProject={() => {}} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
