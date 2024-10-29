export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_answers: {
        Row: {
          content: string | null
          conversion_id: string | null
          created_at: string | null
          id: string
          is_finalized: boolean | null
          question_id: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          conversion_id?: string | null
          created_at?: string | null
          id?: string
          is_finalized?: boolean | null
          question_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          conversion_id?: string | null
          created_at?: string | null
          id?: string
          is_finalized?: boolean | null
          question_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_answers_conversion_id_fkey"
            columns: ["conversion_id"]
            isOneToOne: false
            referencedRelation: "conversions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "entries"
            referencedColumns: ["id"]
          },
        ]
      }
      commits: {
        Row: {
          completed_at: string | null
          created_at: string
          id: number
          processed_answers: number
          project_id: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: number
          processed_answers?: number
          project_id?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: number
          processed_answers?: number
          project_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commits_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      conversions: {
        Row: {
          completed_at: string | null
          error_message: string | null
          id: string
          processed_questions: number
          project_id: string | null
          started_at: string | null
          status: string
          total_questions: number
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          processed_questions?: number
          project_id?: string | null
          started_at?: string | null
          status: string
          total_questions: number
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          processed_questions?: number
          project_id?: string | null
          started_at?: string | null
          status?: string
          total_questions?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      entries: {
        Row: {
          answer: string | null
          assignee_id: number | null
          created_at: string
          id: string
          loopio_id: number | null
          query: string | null
          reviewer_id: number | null
          section_id: string | null
          status: string
        }
        Insert: {
          answer?: string | null
          assignee_id?: number | null
          created_at?: string
          id?: string
          loopio_id?: number | null
          query?: string | null
          reviewer_id?: number | null
          section_id?: string | null
          status?: string
        }
        Update: {
          answer?: string | null
          assignee_id?: number | null
          created_at?: string
          id?: string
          loopio_id?: number | null
          query?: string | null
          reviewer_id?: number | null
          section_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "entries_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      injections: {
        Row: {
          created_at: string
          id: number
          text: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "injections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      playground_history: {
        Row: {
          answer: string | null
          created_at: string
          id: number
          query: string | null
          settings: Json
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: number
          query?: string | null
          settings?: Json
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: number
          query?: string | null
          settings?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playground_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          data_source: string
          database: string | null
          document: string | null
          id: string
          is_converted: boolean
          loopio_id: number | null
          name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_source?: string
          database?: string | null
          document?: string | null
          id?: string
          is_converted?: boolean
          loopio_id?: number | null
          name: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          data_source?: string
          database?: string | null
          document?: string | null
          id?: string
          is_converted?: boolean
          loopio_id?: number | null
          name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          context: string | null
          created_at: string
          id: string
          loopio_id: number | null
          name: string | null
          project_id: string | null
          type: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          loopio_id?: number | null
          name?: string | null
          project_id?: string | null
          type?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          loopio_id?: number | null
          name?: string | null
          project_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          bucket_id: number | null
          created_at: string
          exaggeration: number | null
          id: number
          model: string | null
          relevance: number | null
          temperature: number | null
          user_id: string | null
        }
        Insert: {
          bucket_id?: number | null
          created_at?: string
          exaggeration?: number | null
          id?: number
          model?: string | null
          relevance?: number | null
          temperature?: number | null
          user_id?: string | null
        }
        Update: {
          bucket_id?: number | null
          created_at?: string
          exaggeration?: number | null
          id?: number
          model?: string | null
          relevance?: number | null
          temperature?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          loopio_id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          loopio_id: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          loopio_id?: number
          name?: string | null
        }
        Relationships: []
      }
      user_teams: {
        Row: {
          team_id: string
          user_id: string
        }
        Insert: {
          team_id: string
          user_id: string
        }
        Update: {
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          loopio_id: number
          type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string | null
          id: string
          loopio_id?: number
          type?: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          loopio_id?: number
          type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: "admin" | "user" | "bot"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
