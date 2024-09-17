export interface Question {
  id: number;
  question: string;
  answer: {
    text: string | null;
  };
  aiAnswer?: string; // Add this line to include the AI-generated answer
  selected: boolean;
  labels: string[];
  reviewer: {
    name: string;
  };
  assignee: {
    name: string;
  };
  isEdited: boolean;
  originalAnswer: string | null;
}


export interface User {
  id: string;
  email: string;
  // Remove the 'name' property
}