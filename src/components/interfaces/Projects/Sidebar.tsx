"use client";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";

import Link from "next/link";
import Image from "next/image";
import {} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings2,
  ScrollText,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Home,
  Share2,
  Sun,
  Moon,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  BookOpenText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  updated_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Sidebar() {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const pathname = usePathname();

  const supabase = createClient();
  const SignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const { theme,setTheme } = useTheme();

  const navItems = [
    {
      name: "Projects",
      icon: <ScrollText className="size-5" />,
      href: "/projects",
    },
    {
      name: "Playground",
      icon: <SquareTerminal className="size-5" />,
      href: "/playground",
    },
    // {
    //   name: "Documentation",
    //   icon: <Book className="size-5" />,
    //   href: "/documentation",
    // },
    {
      name: "Settings",
      icon: <Settings2 className="size-5" />,
      href: "/settings",
    },
  ];

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      // Fetch user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Fetch recent projects
      const { data, error } = await supabase.from("projects").select("id, name, updated_at");
      if (error) {
        console.error("Error fetching recent projects:", error);
      } else {
        setRecentProjects(data || []);
      }
    };

    fetchUserAndProjects();
  }, []);

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {navItems.map((item) => (
          <TooltipProvider key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${item.href === pathname ? "bg-muted" : ""}`}
                  aria-label={item.name}>
                  <Link href={item.href}>{React.cloneElement(item.icon, { className: "h-5 w-5" })}</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
                    <Link href="/faq">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings">
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
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {user?.email}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

//   return (
//     <div className="flex flex-col h-screen w-64 bg-background border-r">
//       <div className="p-4">
//         <Image src="/img/logo-black.svg" alt="logo" height={50} width={50} />
//       </div>
//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           <header className="text-sm font-semibold">Recents</header>

//           {recentProjects.map((project) => (
//             <li key={project.id} className="group text-xs ">
//               <Link
//                 href={`/projects/${project.id}`}
//                 className="inline-flex items-center group-hover:bg-gray-100 py-1 px-2 w-full rounded-md">
//                 <BookOpenText className="mr-2 h-3 w-3" />
//                 {project.name}
//               </Link>
//             </li>
//           ))}

//           <li>
//             <Link href="/projects" className="w-full justify-start text-xs flex items-center flex-row">
//               View all <ChevronRight className="ml-2 h-4 w-4" />
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="p-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="w-full justify-start">
//               <Avatar className="w-8 h-8 mr-2">
//                 <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
//                 <AvatarFallback className="uppercase bg-pink-300 text-white">{user?.email?.charAt(0)}</AvatarFallback>
//               </Avatar>
//               {user?.name}
//               <span className="text-xs text-gray-500">{user?.email}</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56 text-sm" align="end" forceMount>
//             <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
//               <DropdownMenuRadioItem value="day" className="cursor-pointer">
//                 <Sun className="mr-2 h-4 w-4" />
//                 Day
//               </DropdownMenuRadioItem>
//               <DropdownMenuRadioItem value="night" className="cursor-pointer">
//                 <Moon className="mr-2 h-4 w-4" />
//                 Night
//               </DropdownMenuRadioItem>
//               <DropdownMenuRadioItem value="auto" className="cursor-pointer">
//                 <Sun className="mr-2 h-4 w-4" />
//                 Auto
//               </DropdownMenuRadioItem>
//             </DropdownMenuRadioGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem asChild className="cursor-pointer">
//               <Link href="/faq">
//                 <HelpCircle className="mr-2 h-4 w-4" />
//                 FAQ
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild className="cursor-pointer">
//               <Link href="/settings">
//                 <Settings className="mr-2 h-4 w-4" />
//                 Settings
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={SignOut} className="cursor-pointer">
//               <LogOut className="mr-2 h-4 w-4" />
//               Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }
