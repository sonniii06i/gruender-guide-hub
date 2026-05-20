export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          confirmation_sent_at: string | null
          created_at: string
          email: string
          id: string
          meet_link: string | null
          message: string | null
          name: string
          phone: string | null
          reminder_15min_sent_at: string | null
          reminder_24h_sent_at: string | null
          slot_iso: string
          status: string
          topic: string
          user_id: string | null
        }
        Insert: {
          confirmation_sent_at?: string | null
          created_at?: string
          email: string
          id?: string
          meet_link?: string | null
          message?: string | null
          name: string
          phone?: string | null
          reminder_15min_sent_at?: string | null
          reminder_24h_sent_at?: string | null
          slot_iso: string
          status?: string
          topic: string
          user_id?: string | null
        }
        Update: {
          confirmation_sent_at?: string | null
          created_at?: string
          email?: string
          id?: string
          meet_link?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          reminder_15min_sent_at?: string | null
          reminder_24h_sent_at?: string | null
          slot_iso?: string
          status?: string
          topic?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          assistant_message: string | null
          completion_tokens: number | null
          conversation_id: string | null
          created_at: string
          error: string | null
          id: string
          input_guard_triggered: string | null
          latency_ms: number | null
          model: string | null
          output_guard_triggered: string | null
          prompt_tokens: number | null
          provider: string
          user_id: string | null
          user_message: string
        }
        Insert: {
          assistant_message?: string | null
          completion_tokens?: number | null
          conversation_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          input_guard_triggered?: string | null
          latency_ms?: number | null
          model?: string | null
          output_guard_triggered?: string | null
          prompt_tokens?: number | null
          provider: string
          user_id?: string | null
          user_message: string
        }
        Update: {
          assistant_message?: string | null
          completion_tokens?: number | null
          conversation_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          input_guard_triggered?: string | null
          latency_ms?: number | null
          model?: string | null
          output_guard_triggered?: string | null
          prompt_tokens?: number | null
          provider?: string
          user_id?: string | null
          user_message?: string
        }
        Relationships: []
      }
      chat_memories: {
        Row: {
          category: string | null
          confidence: number | null
          created_at: string
          fact: string
          id: string
          last_used_at: string | null
          source_message_id: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          confidence?: number | null
          created_at?: string
          fact: string
          id?: string
          last_used_at?: string | null
          source_message_id?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          confidence?: number | null
          created_at?: string
          fact?: string
          id?: string
          last_used_at?: string | null
          source_message_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_tickets: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          kind: string
          link: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          link?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          link?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          country: string | null
          created_at: string
          id: string
          path: string
          referrer: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_hash: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_hash: string
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_hash?: string
        }
        Relationships: []
      }
      playbook_runs: {
        Row: {
          completed_at: string | null
          context: Json
          created_at: string
          current_step: number
          id: string
          last_activity_at: string
          playbook_slug: string
          started_at: string
          status: string
          title: string
          total_steps: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          context?: Json
          created_at?: string
          current_step?: number
          id?: string
          last_activity_at?: string
          playbook_slug: string
          started_at?: string
          status?: string
          title: string
          total_steps: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          context?: Json
          created_at?: string
          current_step?: number
          id?: string
          last_activity_at?: string
          playbook_slug?: string
          started_at?: string
          status?: string
          title?: string
          total_steps?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      playbook_step_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          data: Json
          id: string
          notes: string | null
          run_id: string
          status: string
          step_index: number
          step_slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          data?: Json
          id?: string
          notes?: string | null
          run_id: string
          status?: string
          step_index: number
          step_slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          data?: Json
          id?: string
          notes?: string | null
          run_id?: string
          status?: string
          step_index?: number
          step_slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playbook_step_progress_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "playbook_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          business_model: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          legal_form: string | null
          onboarding_completed: boolean
          onboarding_step: number
          phone: string | null
          postal_code: string | null
          salutation: string | null
          street: string | null
          tax_id: string | null
          updated_at: string
          vat_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_model?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          legal_form?: string | null
          onboarding_completed?: boolean
          onboarding_step?: number
          phone?: string | null
          postal_code?: string | null
          salutation?: string | null
          street?: string | null
          tax_id?: string | null
          updated_at?: string
          vat_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_model?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          legal_form?: string | null
          onboarding_completed?: boolean
          onboarding_step?: number
          phone?: string | null
          postal_code?: string | null
          salutation?: string | null
          street?: string | null
          tax_id?: string | null
          updated_at?: string
          vat_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          author_id: string | null
          author_role: string
          body: string
          created_at: string
          id: string
          ticket_id: string
        }
        Insert: {
          author_id?: string | null
          author_role?: string
          body: string
          created_at?: string
          id?: string
          ticket_id: string
        }
        Update: {
          author_id?: string | null
          author_role?: string
          body?: string
          created_at?: string
          id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "contact_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_events: {
        Row: {
          created_at: string
          event: string
          id: string
          metadata: Json | null
          tool: string
          user_id: string | null
          visitor_hash: string
        }
        Insert: {
          created_at?: string
          event: string
          id?: string
          metadata?: Json | null
          tool: string
          user_id?: string | null
          visitor_hash: string
        }
        Update: {
          created_at?: string
          event?: string
          id?: string
          metadata?: Json | null
          tool?: string
          user_id?: string | null
          visitor_hash?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_booked_slots: {
        Args: never
        Returns: {
          slot_iso: string
        }[]
      }
      get_bookings_needing_15min_reminder: {
        Args: never
        Returns: {
          email: string
          id: string
          meet_link: string
          message: string
          name: string
          slot_iso: string
          topic: string
        }[]
      }
      get_bookings_needing_24h_reminder: {
        Args: never
        Returns: {
          email: string
          id: string
          meet_link: string
          message: string
          name: string
          slot_iso: string
          topic: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      mark_reminder_sent: {
        Args: { p_booking_id: string; p_reminder_kind: string }
        Returns: undefined
      }
      set_booking_meet_link: {
        Args: { p_booking_id: string; p_meet_link: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
