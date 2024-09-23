"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import TableItemDropdownMenu from "./table-item-dropdown-menu";
import TableSelectedDropdownMenu from "./table-selected-dropdown-menu";

import { ArrowUpDown, Plus, Loader, TriangleAlert, Check, Octagon, Sparkle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

function getBadgeVariant(status: string) {
  switch (status) {
    case "processing":
      return (
        <div className="flex items-center gap-2 text-blue-400">
          <span className="rounded-full bg-blue-800 border-blue-600 flex items-center justify-center border h-4 w-4"></span>
          Processing
        </div>
      );
    case "queued":
      return (
        <div className="flex items-center gap-2 text-blue-400">
          <span className="rounded-full bg-blue-800 border-blue-600 flex items-center justify-center border h-4 w-4"></span>
          Running
        </div>
      );
    case "failed":
      return (
        <div className="flex items-center gap-2 text-red-400">
          <span className="rounded-full bg-red-800 border-red-600 border h-4 w-4 flex items-center justify-center"></span>
          Failed
        </div>
      );
    case "ready":
      return (
        <div className="flex items-center gap-2 text-green-400">
          <span className="rounded-full bg-green-800 border-green-600 border h-4 w-4"></span>
          Ready
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2 text-gray-400 capitalize">
          <span className="rounded-full bg-gray-800 border-gray-600 border h-4 w-4 flex items-center justify-center"></span>
          {status}
        </div>
      );
  }
}

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

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return getBadgeVariant(row.original.status);
    },
  },
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
          <TableItemDropdownMenu disabled={item.status !== "ready"} projectId={item.id} onRemoveProject={() => {}} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
