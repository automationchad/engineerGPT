"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { ChevronsUpDown, CheckIcon, CirclePlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const groups = [
  {
    label: "Production",
    teams: [
      {
        label: "sai360 - prod",
        value: "11279",
        avatar: "1",
      },
      {
        label: "assure - prod",
        value: "11417",
        avatar: "2",
      },
    ],
  },
  {
    label: "Roadmap",
    teams: [
      {
        label: "sai360 - roadmap",
        value: "11418",
        avatar: "3",
      },
      {
        label: "assure - roadmap",
        value: "11419",
        avatar: "4",
      },
    ],
  },
  {
    label: "Archive",
    teams: [
      {
        label: "sai360 - archive",
        value: "11420",
        avatar: "5",
      },
    ],
  },
];

interface DB {
  label: string;
  value: string;
  avatar: string; // Change this to string
}

interface DBSwitcherProps {
  className?: string;
  disabled?: boolean;
  onDBChange?: (db: DB) => void;
  selectedDatabase: DB;
  variant?: "default" | "full-width";
}

export default function DBSwitcher({ className, disabled, onDBChange, selectedDatabase, variant = "default" }: DBSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedDB, setSelectedDB] = useState<DB>(groups[0].teams[0]);

  useEffect(() => {
    if (!selectedDB && groups.length > 0 && groups[0].teams.length > 0) {
      onDBChange?.(groups[0].teams[0]);
    }
  }, [onDBChange, selectedDB]);

  const handleDBSelection = (db: DB) => {
    setSelectedDB(db);
    setOpen(false);
    if (onDBChange) {
      onDBChange(db);
    }
  };

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(
              "justify-between rounded-full",
              variant === "default" ? "w-[200px]" : "w-full", // Modify this line
              className
            )}>
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={`/img/circle-${selectedDB.avatar}.svg`} alt={selectedDB.label} className="" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedDB.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0",
            variant === "default" ? "w-[200px]" : "w-[400px]"
          )}>
          <Command>
            <CommandInput placeholder="Search DB..." />
            <CommandList>
              <CommandEmpty>No DB found.</CommandEmpty>
              {groups.map((group, groupIndex) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team, teamIndex) => (
                    <CommandItem key={team.value} className="text-sm" onSelect={() => handleDBSelection(team)}>
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage src={`/img/circle-${team.avatar}.svg`} alt={team.label} className="" />
                        <AvatarFallback>{team.label.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn("ml-auto h-4 w-4", selectedDB.value === team.value ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    disabled
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}>
                    <CirclePlus className="mr-2 h-5 w-5" />
                    Create DB
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create DB</DialogTitle>
          <DialogDescription>Add a new DB to manage knowledge.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">Trial for two weeks</span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">$9/month per user</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
