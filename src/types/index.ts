export interface Question {
  id: number;
  query: string;
  answer: string;
  reviewer_id: number;
  assignee_id: number;
}

export interface User {
  id: string;
  email: string;
  // Remove the 'name' property
}
export interface DB {
  label: string;
  value: string;
  avatar: string;
}

export interface Section {
  id: string;
  name: string;
  context: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  created_at: string;
  sections?: Section[] | [];
  database: DB;
  document: File;
  is_converted?: boolean;
}

export interface Message {
  id: number;
  query: string;
  answer: string;
  created_at: string;
}

export type History = Message[];
