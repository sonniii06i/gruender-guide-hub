import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PLAYBOOKS } from "@/data/playbooks";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clock, Target, ArrowRight } from "lucide-react";

const Playbooks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const start = async (slug: string, title: string, total: number) => {
    if (!user) { navigate("/auth"); return; }
    // check existing run
    const { data: existing } = await supabase
      .from("playbook_runs")
      .select("id")
      .eq("user_id", user.id)
      .eq("playbook_slug", slug)
      .neq("status", "completed")
      .maybeSingle();
    if (existing) { navigate(`/playbook/${existing.id}`); return; }

    const { data, error } = await supabase.from("playbook_runs").insert({
      user_id: user.id, playbook_slug: slug, title, total_steps: total,
    }).select("id").single();
    if (error || !data) { toast.error("Konnte Playbook nicht starten"); return; }
    await supabase.from("notifications").insert({
      user_id: user.id, kind: "info",
      title: `Playbook gestartet: ${title}`,
      body: "Mach Schritt für Schritt weiter – wir erinnern dich.",
      link: `/playbook/${data.id}`,
    });
    navigate(`/playbook/${data.id}`);
  };

  return (
    <CockpitShell
      eyebrow="🚀 Playbooks"
      title="Gründungs-Playbooks"
      subtitle="Wähle ein Vorhaben – wir führen dich Schritt für Schritt durch jedes Detail. Kein Vergessen, keine Lücken."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {PLAYBOOKS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.slug} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-soft transition-all flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-accent-blue mb-0.5">{p.difficulty}</div>
                  <h2 className="text-lg font-bold leading-tight">{p.title}</h2>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.duration}</span>
                <span className="inline-flex items-center gap-1"><Target className="h-3.5 w-3.5" /> {p.steps.length} Schritte</span>
              </div>
              <p className="text-sm leading-relaxed mb-5 flex-1"><span className="font-semibold">Ergebnis:</span> {p.outcome}</p>
              <Button onClick={() => start(p.slug, p.title, p.steps.length)} className="rounded-full self-start">
                Playbook starten <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>
    </CockpitShell>
  );
};

export default Playbooks;
