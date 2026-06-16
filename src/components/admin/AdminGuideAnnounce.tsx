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
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-1">
        <Megaphone className="h-5 w-5 text-accent-blue" />
        <h3 className="font-semibold">Guide ankündigen</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Schickt allen Usern eine prominente „Neuer Guide"-Benachrichtigung (oben im
        Glocken-Tab, blau hervorgehoben). Idempotent – mehrfaches Klicken pingt niemanden doppelt.
      </p>
      <div className="divide-y divide-border">
        {PLAYBOOKS.map((pb) => (
          <div key={pb.slug} className="flex items-center gap-3 py-2.5">
            <span className="text-lg shrink-0">{pb.emoji}</span>
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
    </div>
  );
};
