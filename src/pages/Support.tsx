import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader2, MessageSquare, Plus, Inbox, Clock, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Ticket {
  id: string; subject: string; status: string; created_at: string; message: string;
}
interface Msg { id: string; body: string; author_role: string; created_at: string; }

const STATUS_BADGE: Record<string, { label: string; cls: string; icon: any }> = {
  open: { label: "Offen", cls: "bg-accent-blue/15 text-accent-blue", icon: Inbox },
  in_progress: { label: "In Bearbeitung", cls: "bg-warning/15 text-warning", icon: Clock },
  resolved: { label: "Gelöst", cls: "bg-success/15 text-success", icon: CheckCircle2 },
};

const Support = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Ticket | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("contact_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setTickets((data ?? []) as Ticket[]); setLoading(false); });
  }, [user]);

  useEffect(() => {
    if (!active) return;
    supabase.from("ticket_messages").select("*").eq("ticket_id", active.id).order("created_at", { ascending: true })
      .then(({ data }) => setMsgs((data ?? []) as Msg[]));
  }, [active]);

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">Support</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Deine Tickets</h1>
          <p className="mt-1 text-sm text-muted-foreground">Alle vergangenen Anfragen und Antworten an einem Ort.</p>
        </div>
        <Link to="/kontakt">
          <Button className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
            <Plus className="h-4 w-4 mr-1" /> Neues Ticket
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : tickets.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-bold mb-1">Noch keine Tickets</h3>
          <p className="text-sm text-muted-foreground mb-5">Stelle deine erste Anfrage – wir melden uns innerhalb von 24h.</p>
          <Link to="/kontakt"><Button className="rounded-full">Ticket öffnen</Button></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => {
            const s = STATUS_BADGE[t.status] ?? STATUS_BADGE.open;
            const Icon = s.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className="w-full text-left rounded-2xl border border-border bg-card p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold leading-tight">{t.subject}</h3>
                  <span className={`inline-flex items-center gap-1 rounded-full text-[10px] font-bold uppercase px-2 py-1 ${s.cls}`}>
                    <Icon className="h-3 w-3" /> {s.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: de })}
                </p>
              </button>
            );
          })}
        </div>
      )}

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle>{active.subject}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-secondary p-4">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Deine Anfrage</p>
                  <p className="text-sm whitespace-pre-wrap">{active.message}</p>
                </div>
                {msgs.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">Noch keine Antwort. Wir melden uns bald.</p>
                ) : (
                  msgs.map((m) => (
                    <div key={m.id} className={`rounded-2xl p-4 ${m.author_role === "admin" ? "bg-accent-blue/10 border border-accent-blue/20" : "bg-secondary"}`}>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        {m.author_role === "admin" ? "GründerX Team" : "Du"} · {formatDistanceToNow(new Date(m.created_at), { addSuffix: true, locale: de })}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Support;
