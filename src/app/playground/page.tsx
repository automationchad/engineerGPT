"use server";

import Sidebar from "@/components/interfaces/Nav/Sidebar";
import PlaygroundLayout from "@/components/interfaces/Playground/PlaygroundLayout";
import { createClient } from "@/lib/services/supabase/server";
import { Message } from "@/types";
import { revalidatePath } from "next/cache";

const supabase = createClient();

async function getHistory(): Promise<Message[]> {
  const { data: history, error } = await supabase.from("playground_history").select("*").order("createdAt", { ascending: false });
  return (history as Message[]) || [];
}

export default async function Playground() {
  const history = await getHistory();
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
        </header>
        <PlaygroundLayout history={history}/>
      </div>
    </div>
  );
}
