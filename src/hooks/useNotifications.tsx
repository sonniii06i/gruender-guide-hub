import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  kind: "info" | "reminder" | "success" | "warning" | "feature";
  read_at: string | null;
  created_at: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);

  const refresh = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("notifications").select("*")
      .eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
    if (data) setItems(data as Notification[]);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  // Auto-create reminder for stale playbook runs (older than 3 days, no notif today)
  useEffect(() => {
    if (!user) return;
    (async () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 86400_000).toISOString();
      const { data: stale } = await supabase.from("playbook_runs").select("id, title")
        .eq("user_id", user.id).eq("status", "in_progress")
        .lt("last_activity_at", threeDaysAgo);
      if (!stale || stale.length === 0) return;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const { data: existingToday } = await supabase.from("notifications").select("id, title")
        .eq("user_id", user.id).gte("created_at", today.toISOString());
      const existingTitles = new Set((existingToday ?? []).map((n: any) => n.title));
      for (const run of stale) {
        const title = `⏰ Weitermachen: ${run.title}`;
        if (existingTitles.has(title)) continue;
        await supabase.from("notifications").insert({
          user_id: user.id, kind: "reminder",
          title, body: "Du hast vor ein paar Tagen pausiert. Nur noch wenige Schritte!",
          link: `/playbook/${run.id}`,
        });
      }
      refresh();
    })();
  }, [user, refresh]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from("notifications").update({ read_at: new Date().toISOString() })
      .eq("user_id", user.id).is("read_at", null);
    refresh();
  };

  const unread = items.filter((n) => !n.read_at).length;
  return { items, unread, refresh, markAllRead };
};
