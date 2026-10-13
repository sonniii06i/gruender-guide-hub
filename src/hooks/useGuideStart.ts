import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getPlaybook } from "@/data/playbooks";

export function useGuideStart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [starting, setStarting] = useState<string | null>(null);

  const start = async (slug: string) => {
    const pb = getPlaybook(slug);
    if (!pb) return;
    if (!user) { navigate("/auth"); return; }
    if (starting) return; // Doppelklick legt sonst zwei Runs an
    setStarting(slug);
    try {
      // Juengsten offenen Run nehmen. maybeSingle() ohne limit(1) warf bei
      // zwei offenen Runs einen Fehler -> existing war null -> noch ein Run.
      const { data: existing, error: findErr } = await supabase
        .from("playbook_runs")
        .select("id")
        .eq("user_id", user.id)
        .eq("playbook_slug", slug)
        .neq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (findErr) { toast.error("Konnte Guide nicht starten. Bitte erneut versuchen."); return; }
      if (existing) { navigate(`/playbook/${existing.id}`); return; }

      const { data, error } = await supabase.from("playbook_runs").insert({
        user_id: user.id,
        playbook_slug: slug,
        title: pb.title,
        total_steps: pb.steps.length,
      }).select("id").single();
      if (error || !data) { toast.error("Konnte Guide nicht starten"); return; }

      await supabase.from("notifications").insert({
        user_id: user.id, kind: "info",
        title: `Guide gestartet: ${pb.title}`,
        body: "Schritt für Schritt – wir erinnern dich.",
        link: `/playbook/${data.id}`,
      });
      navigate(`/playbook/${data.id}`);
    } finally {
      setStarting(null);
    }
  };

  return { start, starting };
}
