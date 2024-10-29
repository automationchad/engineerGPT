import { getAccessToken } from "./index";
import { LoopioClient } from "./client";

interface LoopioSection {
  id: number;
  name: string;
  project: {
    id: number;
  };
}

interface LoopioSectionsResponse {
  items: LoopioSection[];
  totalItems: number;
  totalPages: number;
}

interface LoopioEntry {
  id: number;
  question: string;
  answer: { text: string };
  project: { id: number };
  section: { id: number };
  assignee: { id: number };
  reviewer: { id: number };
}

interface EntriesResponse {
  items: LoopioEntry[];
  totalItems: number;
  totalPages: number;
}

export class LoopioAPI {
  private baseUrl = "https://api.loopio.com";

  private client: LoopioClient;

  constructor() {
    this.client = new LoopioClient();
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = await this.client.getToken();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Loopio API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getSections(projectId: string, page: number = 1, pageSize: number = 100): Promise<LoopioSectionsResponse> {
    const response = await this.fetchWithAuth(
      `/data/v2/sections?projectId=${projectId}&page=${page}&pageSize=${pageSize}`
    );
    console.log(response);
    return { items: response.items, totalItems: response.totalItems, totalPages: response.totalPages };
  }

  async getEntries(projectId: string, page: number = 1, pageSize: number = 100): Promise<EntriesResponse> {
    const response = await this.fetchWithAuth(
      `/data/v2/projectEntries?projectId=${projectId}&page=${page}&pageSize=${pageSize}`
    );
    console.log(response);
    return {
      items: response.items,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
    };
  }

  async updateEntry(entryId: number, newAnswer: string, question: string): Promise<void> {
    const response = await this.fetchWithAuth(`/data/v2/projectEntries/${entryId}`, {
      method: "PUT",
      body: JSON.stringify({
        question,
        answer: {
          text: newAnswer,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update Loopio entry ${entryId}: ${response.statusText}`);
    }
  }
}
