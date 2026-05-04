import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send, Inbox, Users, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Ticket {
  id: string; name: string; email: string; subject: string; message: string;
  status: string; priority: string; created_at: string; user_id: string | null;
}
interface Msg { id: string; body: string; author_role: string; created_at: string; }

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useRole();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState({ users: 0, subs: 0, tickets: 0 });

  const loadTickets = async () => {
    const { data } = await supabase.from("contact_tickets").select("*").order("created_at", { ascending: false });
    setTickets((data ?? []) as Ticket[]);
  };

  const loadStats = async () => {
    const [{ count: users }, { count: subs }, { count: openTickets }] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("contact_tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
    ]);
    setStats({ users: users ?? 0, subs: subs ?? 0, tickets: openTickets ?? 0 });
  };

  useEffect(() => { if (isAdmin) { loadTickets(); loadStats(); } }, [isAdmin]);

  const openTicket = async (t: Ticket) => {
    setSelected(t);
    const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", t.id).order("created_at");
    setMsgs((data ?? []) as Msg[]);
  };

  const send = async () => {
    if (!selected || !reply.trim()) return;
    setSending(true);
    const { error } = await supabase.from("ticket_messages").insert({
      ticket_id: selected.id, author_id: user!.id, author_role: "admin", body: reply.trim(),
    });
    if (error) { toast.error(error.message); setSending(false); return; }
    await supabase.from("contact_tickets").update({ status: "in_progress" }).eq("id", selected.id);
    setReply("");
    await openTicket(selected);
    await loadTickets();
    setSending(false);
    toast.success("Antwort gespeichert");
  };

  const setStatus = async (status: string) => {
    if (!selected) return;
    await supabase.from("contact_tickets").update({ status }).eq("id", selected.id);
    await loadTickets();
    setSelected({ ...selected, status });
  };

  if (authLoading || roleLoading) return <div className="p-12 text-center text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <CockpitShell eyebrow="🛡️ Admin" title="Kommandozentrale" subtitle="Tickets beantworten, Kunden & Abos im Blick.">
      <Tabs defaultValue="tickets">
        <TabsList className="mb-6">
          <TabsTrigger value="tickets"><Inbox className="h-4 w-4 mr-1" /> Tickets ({stats.tickets})</TabsTrigger>
          <TabsTrigger value="kunden"><Users className="h-4 w-4 mr-1" /> Kunden ({stats.users})</TabsTrigger>
          <TabsTrigger value="abos"><CreditCard className="h-4 w-4 mr-1" /> Abos ({stats.subs})</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <div className="grid lg:grid-cols-[340px_1fr] gap-4">
            <div className="rounded-2xl border border-border bg-card p-3 max-h-[70vh] overflow-y-auto">
              {tickets.length === 0 && <p className="text-sm text-muted-foreground p-4">Noch keine Tickets.</p>}
              {tickets.map((t) => (
                <button key={t.id} onClick={() => openTicket(t)}
                  className={`w-full text-left p-3 rounded-xl mb-1 transition-colors ${selected?.id === t.id ? "bg-secondary" : "hover:bg-secondary/50"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm truncate">{t.subject}</span>
                    <StatusBadge status={t.status} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">{t.name} · {t.email}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: de })}</div>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              {!selected ? (
                <p className="text-sm text-muted-foreground">Wähle ein Ticket aus, um es zu beantworten.</p>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-border">
                    <div>
                      <h2 className="text-xl font-bold">{selected.subject}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{selected.name} – <a href={`mailto:${selected.email}`} className="underline">{selected.email}</a></p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => setStatus("in_progress")}>In Arbeit</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus("resolved")}>Erledigt</Button>
                      <Button size="sm" variant="ghost" onClick={() => setStatus("closed")}>Schließen</Button>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                    <div className="rounded-xl bg-secondary/60 p-4">
                      <div className="text-xs font-bold text-muted-foreground mb-1">{selected.name}</div>
                      <p className="text-sm whitespace-pre-wrap">{selected.message}</p>
                    </div>
                    {msgs.map((m) => (
                      <div key={m.id} className={`rounded-xl p-4 ${m.author_role === "admin" ? "bg-primary/10 ml-8" : "bg-secondary/60 mr-8"}`}>
                        <div className="text-xs font-bold text-muted-foreground mb-1">
                          {m.author_role === "admin" ? "Du (Admin)" : selected.name} · {formatDistanceToNow(new Date(m.created_at), { addSuffix: true, locale: de })}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Deine Antwort an den Kunden…" rows={4} />
                    <Button onClick={send} disabled={sending || !reply.trim()} className="mt-2 rounded-full">
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4 mr-1" /> Antwort senden</>}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="kunden">
          <CustomerList />
        </TabsContent>

        <TabsContent value="abos">
          <SubsList />
        </TabsContent>
      </Tabs>
    </CockpitShell>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    open: "bg-accent-blue/15 text-accent-blue",
    in_progress: "bg-warning/15 text-warning",
    resolved: "bg-success/15 text-success",
    closed: "bg-secondary text-muted-foreground",
  };
  return <Badge className={`${map[status] ?? ""} text-[10px]`}>{status}</Badge>;
};

const CustomerList = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("profiles").select("id, email, first_name, last_name, company_name, country, created_at")
      .order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
  }, []);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60"><tr>
          <Th>Name</Th><Th>E-Mail</Th><Th>Firma</Th><Th>Land</Th><Th>Erstellt</Th>
        </tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <Td>{r.first_name} {r.last_name}</Td><Td>{r.email}</Td><Td>{r.company_name ?? "—"}</Td><Td>{r.country ?? "—"}</Td>
              <Td>{new Date(r.created_at).toLocaleDateString("de-DE")}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SubsList = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("subscriptions").select("*").order("updated_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
  }, []);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60"><tr>
          <Th>User</Th><Th>Plan</Th><Th>Status</Th><Th>Period End</Th>
        </tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <Td className="font-mono text-xs">{r.user_id.slice(0, 8)}…</Td>
              <Td>{r.plan}</Td><Td>{r.status}</Td>
              <Td>{r.current_period_end ? new Date(r.current_period_end).toLocaleDateString("de-DE") : "—"}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => <th className="text-left p-3 font-semibold text-xs uppercase tracking-wider">{children}</th>;
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <td className={`p-3 ${className}`}>{children}</td>;

export default Admin;
