"use client";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { useTheme } from "next-themes";

import Link from "next/link";
import { User } from "@/types";

import { LifeBuoy, Settings2, ScrollText, SquareTerminal, Construction, Triangle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { createClient } from "@/lib/services/supabase/client";
import { useRouter } from "next/navigation";
import AccountDropdown from "./account-dropdown";

interface Project {
  id: string;
  name: string;
  updated_at: string;
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
    0;
  };

  const { theme, setTheme } = useTheme();

  const navItems = [
    {
      name: "Projects",
      icon: <ScrollText className="size-5" />,
      href: "/projects",
    },
    {
      name: "Playground",
      icon: <Construction className="size-5" />,
      href: "/playground",
    },
    // {
    //   name: "Settings",
    //   icon: <Settings2 className="size-5" />,
    //   href: "/settings",
    // },
  ];

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      // Fetch user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user as User);

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
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r border-border">
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
              <AccountDropdown />
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
