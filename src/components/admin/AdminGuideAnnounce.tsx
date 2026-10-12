import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Megaphone, Loader2 } from "lucide-react";
import { PLAYBOOKS } from "@/data/playbooks";

// Admin-Tool: einen Guide an ALLE User ankündigen (prominente Notification).
export const AdminGuideAnnounce = () => {
  const [busy, setBusy] = useState<string | null>(null);

  const announce = async (slug: string, title: string, tagline: string) => {
    setBusy(slug);
    try {
      const { data, error } = await supabase.functions.invoke("announce-guide", {
        body: { slug, title, body: tagline },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const inserted = (data as any)?.inserted ?? 0;
      if (inserted === 0) {
        toast.info("Alle User haben diese Ankündigung bereits.");
      } else {
        toast.success(`Angekündigt – ${inserted} User benachrichtigt.`);
      }
    } catch (e: any) {
      toast.error(e.message ?? "Ankündigung fehlgeschlagen");
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-start gap-3 border-b border-border/70 px-5 py-4 md:px-6">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <Megaphone className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight">Guide ankündigen</h2>
      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
        Schickt allen Usern eine prominente „Neuer Guide"-Benachrichtigung (oben im
        Glocken-Tab, blau hervorgehoben). Idempotent: Mehrfaches Klicken benachrichtigt niemanden doppelt.
      </p>
        </div>
      </div>
      <div className="divide-y divide-border/70 px-5 md:px-6">
        {PLAYBOOKS.map((pb) => (
          <div key={pb.slug} className="flex items-center gap-3 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-base" aria-hidden="true">{pb.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{pb.title}</p>
              <p className="text-xs text-muted-foreground truncate">{pb.tagline}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              disabled={busy === pb.slug}
              onClick={() => announce(pb.slug, pb.title, pb.tagline)}
            >
              {busy === pb.slug ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ankündigen"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
