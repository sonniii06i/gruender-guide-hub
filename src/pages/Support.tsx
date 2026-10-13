import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Plus, Inbox, Clock, CheckCircle2, Archive, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, ToneBadge, type Tone } from "@/components/cockpit/kit";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { ticketNimmtAntwortenAn } from "@/lib/tickets";

interface Ticket {
  id: string; subject: string; status: string; created_at: string; message: string;
}
interface Msg { id: string; body: string; author_role: string; created_at: string; }

const STATUS_BADGE: Record<string, { label: string; tone: Tone; icon: any }> = {
  open: { label: "Offen", tone: "info", icon: Inbox },
  in_progress: { label: "In Bearbeitung", tone: "warning", icon: Clock },
  resolved: { label: "Gelöst", tone: "success", icon: CheckCircle2 },
  // Admin.tsx setzt auch "closed" -- fiel vorher auf "Offen" zurueck.
  closed: { label: "Geschlossen", tone: "neutral", icon: Archive },
};

const Support = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Ticket | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const loadMsgs = async (ticketId: string) => {
    const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", ticketId).order("created_at", { ascending: true });
    setMsgs((data ?? []) as Msg[]);
  };

  // Rueckfrage zum bestehenden Ticket statt eines neuen. author_role und
  // author_id setzt der Trigger tg_ticket_messages_rolle serverseitig.
  // Es geht keine Mail und keine Benachrichtigung raus: Die Nachricht steht im
  // Ticket, das Team sieht sie beim Bearbeiten -- so sagt es auch der Hinweis.
  const sendReply = async () => {
    if (!active || !reply.trim() || !ticketNimmtAntwortenAn(active.status)) return;
    setSending(true);
    const { error } = await supabase.from("ticket_messages").insert({ ticket_id: active.id, body: reply.trim() });
    setSending(false);
    if (error) {
      toast.error("Antwort konnte nicht gesendet werden. Bitte versuch es erneut.");
      return;
    }
    setReply("");
    toast.success("Nachricht im Ticket gespeichert", {
      description: "Unser Team sieht sie, sobald es dein Ticket bearbeitet.",
    });
    await loadMsgs(active.id);
  };

  useEffect(() => {
    if (!user) return;
    supabase.from("contact_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setTickets((data ?? []) as Ticket[]); setLoading(false); });
  }, [user]);

  useEffect(() => {
    if (!active) return;
    setReply("");
    void loadMsgs(active.id);
  }, [active]);

  return (
    <div className="container max-w-4xl px-4 pb-16 pt-8 md:px-6 md:pt-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-7">
        <div>
          <p className="text-sm font-medium text-accent-blue">Support</p>
          <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] md:text-[2.25rem]">Deine Tickets</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">Alle vergangenen Anfragen und Antworten an einem Ort.</p>
        </div>
        <Button asChild>
          <Link to="/kontakt">
            <Plus className="h-4 w-4" aria-hidden="true" /> Neues Ticket
          </Link>
        </Button>
      </header>

      {loading ? (
        <div className="space-y-3" aria-busy="true">
          <span className="sr-only">Tickets werden geladen…</span>
          {[0, 1, 2].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-secondary" />)}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="Noch keine Tickets"
          description="Stell deine erste Anfrage, wir melden uns innerhalb von 24 Stunden."
          action={<Button asChild><Link to="/kontakt">Ticket öffnen</Link></Button>}
        />
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => {
            const s = STATUS_BADGE[t.status] ?? STATUS_BADGE.open;
            const Icon = s.icon;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setActive(t)}
                  className="press w-full rounded-xl border border-border bg-card p-5 text-left hover:border-accent-blue/40 hover:shadow-card"
                >
                  <div className="mb-1 flex items-start justify-between gap-3">
                    <h2 className="font-semibold leading-tight">{t.subject}</h2>
                    <ToneBadge tone={s.tone} className="shrink-0">
                      <Icon className="h-3 w-3" aria-hidden="true" /> {s.label}
                    </ToneBadge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{t.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: de })}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle>{active.subject}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-border bg-secondary/60 p-4">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Deine Anfrage</p>
                  <p className="text-sm whitespace-pre-wrap">{active.message}</p>
                </div>
                {msgs.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">Noch keine Antwort. Wir melden uns bald.</p>
                ) : (
                  msgs.map((m) => (
                    <div key={m.id} className={`rounded-xl border p-4 ${m.author_role === "admin" ? "border-accent-blue/20 bg-accent/60" : "border-border bg-secondary/60"}`}>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        {m.author_role === "admin" ? "GründerX Team" : "Du"} · {formatDistanceToNow(new Date(m.created_at), { addSuffix: true, locale: de })}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                    </div>
                  ))
                )}
                {ticketNimmtAntwortenAn(active.status) ? (
                <div className="border-t border-border pt-4">
                  <label htmlFor="ticket-reply" className="mb-1.5 block text-sm font-medium">Antworten</label>
                  <Textarea
                    id="ticket-reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Rückfrage oder Ergänzung zu diesem Ticket …"
                    rows={4}
                    maxLength={20000}
                  />
                  <Button onClick={sendReply} disabled={sending || !reply.trim()} className="mt-3">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                    Nachricht speichern
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Deine Nachricht wird diesem Ticket hinzugefügt. Unser Team sieht sie, sobald es das Ticket bearbeitet. Es geht keine separate E-Mail raus.
                  </p>
                </div>
                ) : (
                <div className="border-t border-border pt-4 text-sm text-muted-foreground">
                  <p>Dieses Ticket ist abgeschlossen. Hast du noch eine Frage oder ein neues Anliegen, öffne bitte ein neues Ticket.</p>
                  <Button asChild variant="outline" className="mt-3">
                    <Link to="/kontakt">
                      <Plus className="h-4 w-4" aria-hidden="true" /> Neues Ticket
                    </Link>
                  </Button>
                </div>
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
