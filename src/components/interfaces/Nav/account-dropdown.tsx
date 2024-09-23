"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import Link from "next/link";
import { User } from "@/types";
import { useUser } from "@/hooks/use-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SquareUser, Sun, Moon, HelpCircle, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/services/supabase/client";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  updated_at: string;
}

export default function AccountDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const supabase = createClient();
  const SignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    0;
  };

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user as User);
    };

    fetchUser();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
          <SquareUser className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-sm" align="start" forceMount>
        <DropdownMenuItem>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/help">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/settings/${user?.id}`}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={SignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
