import { Database } from "./supabase";

// Use type aliases for better readability
type Tables = Database["public"]["Tables"];

export type Question = Tables["entries"]["Row"];
// export type Organization = Tables["organizations"]["Row"];
export type User = Tables["users"]["Row"];
export type Team = Tables["teams"]["Row"];
export type Section = Tables["sections"]["Row"];
export type Entry = Tables["entries"]["Row"];
export type AiAnswer = Tables["ai_answers"]["Row"];
export type Project = Tables["projects"]["Row"];
export type Message = Tables["entries"]["Row"];
export type Conversion = Tables["conversions"]["Row"];

export interface DB {
  label: string;
  value: string;
  avatar: string;
}

export type History = Array<Message>;

// Extend the Project type with the sections table
export type ProjectWithSections = Project & {
  sections: Section[];
};

export type SectionWithEntries = Section & {
  entries: Entry[];
  // You can add more properties here if needed
};

export type EntryWithAiAnswers = Entry & {
  ai_answers: AiAnswer[];
};

export type UserTeam = {
  team_id: string;
  user_id: string;
  teams: Team;
};

export type UserWithTeams = User & {
  user_teams: UserTeam[];
};