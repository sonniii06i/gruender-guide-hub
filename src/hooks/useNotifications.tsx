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

  // Weitermachen-Reminder für pausierte Guides: GENAU 2× pro Guide — einmal nach
  // 3 Tagen Inaktivität, einmal nach 7 Tagen. Danach keine weitere Erinnerung.
  // Jede Stufe wird "ever" (nicht pro Tag) dedupliziert über link + titelspezifische
  // Stufe, sodass nichts mehrfach feuert.
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: runs } = await supabase.from("playbook_runs")
        .select("id, title, last_activity_at")
        .eq("user_id", user.id).eq("status", "in_progress");
      if (!runs || runs.length === 0) return;

      // Bereits gesendete Reminder (für immer, nicht nur heute).
      const { data: existing } = await supabase.from("notifications")
        .select("title, link").eq("user_id", user.id).eq("kind", "reminder");
      const sent = new Set((existing ?? []).map((n: any) => `${n.link}|${n.title}`));

      const now = Date.now();
      let didInsert = false;
      for (const run of runs) {
        if (!run.last_activity_at) continue;
        const days = (now - new Date(run.last_activity_at).getTime()) / 86400_000;
        if (days < 3) continue;
        const link = `/playbook/${run.id}`;
        const t3 = `⏰ Weitermachen: ${run.title}`;
        const t7 = `⏳ Letzte Erinnerung: ${run.title}`;

        if (days >= 7 && !sent.has(`${link}|${t7}`)) {
          await supabase.from("notifications").insert({
            user_id: user.id, kind: "reminder", title: t7,
            body: "Schon eine Woche pausiert – magst du den Guide abschließen? Das ist unsere letzte Erinnerung dazu.",
            link,
          });
          didInsert = true;
        } else if (days >= 3 && days < 7 && !sent.has(`${link}|${t3}`)) {
          await supabase.from("notifications").insert({
            user_id: user.id, kind: "reminder", title: t3,
            body: "Du hast vor ein paar Tagen pausiert. Nur noch wenige Schritte!",
            link,
          });
          didInsert = true;
        }
      }
      if (didInsert) refresh();
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
