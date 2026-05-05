import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2, Send, Inbox, Users, CreditCard, BarChart3, Search, Download,
  TrendingUp, UserPlus, Activity, MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface Ticket {
  id: string; name: string; email: string; subject: string; message: string;
  status: string; priority: string; created_at: string; user_id: string | null;
}
interface Msg { id: string; body: string; author_role: string; created_at: string; }

interface ProfileRow {
  id: string; email: string | null; first_name: string | null; last_name: string | null;
  company_name: string | null; country: string | null; city: string | null;
  business_model: string | null; legal_form: string | null;
  phone: string | null; created_at: string; onboarding_completed: boolean;
}
interface SubRow {
  id: string; user_id: string; plan: string; status: string;
  current_period_end: string | null; updated_at: string; created_at: string;
}

const MODEL_LABEL: Record<string, string> = {
  amazon_fba: "Amazon FBA",
  shopify: "Shopify-Shop",
  creator: "Creator",
  agency: "Agentur",
  saas: "SaaS",
  other: "Anderes",
};

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useRole();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [chatCount, setChatCount] = useState(0);
  const [runsCount, setRunsCount] = useState(0);
  const [visits, setVisits] = useState<{ visitor_hash: string; created_at: string; path: string; referrer: string | null; utm_source: string | null }[]>([]);
  const [stripeStats, setStripeStats] = useState<{ activeCount: number; trialingCount: number; mrrCents: number; arrCents: number; byPlan: { name: string; count: number; mrrCents: number }[] } | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const loadAll = async () => {
    const since30 = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
    const [tk, pr, sb, ch, ru, pv, ss] = await Promise.all([
      supabase.from("contact_tickets").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("subscriptions").select("*").order("updated_at", { ascending: false }).limit(1000),
      supabase.from("chat_messages").select("*", { count: "exact", head: true }),
      supabase.from("playbook_runs").select("*", { count: "exact", head: true }),
      supabase.from("page_views" as any).select("visitor_hash, created_at, path, referrer, utm_source").gte("created_at", since30).limit(10000),
      supabase.functions.invoke("admin-stripe-stats"),
    ]);
    setTickets((tk.data ?? []) as Ticket[]);
    setProfiles((pr.data ?? []) as ProfileRow[]);
    setSubs((sb.data ?? []) as SubRow[]);
    setChatCount(ch.count ?? 0);
    setRunsCount(ru.count ?? 0);
    setVisits((pv.data ?? []) as any);
    if (ss.error) setStripeError(ss.error.message);
    else setStripeStats(ss.data);
  };

  useEffect(() => { if (isAdmin) loadAll(); }, [isAdmin]);

  const subByUser = useMemo(() => {
    const m = new Map<string, SubRow>();
    subs.forEach((s) => m.set(s.user_id, s));
    return m;
  }, [subs]);

  const stats = useMemo(() => {
    const now = Date.now();
    const D = 24 * 60 * 60 * 1000;
    const totalUsers = profiles.length;
    const activePaid = stripeStats?.activeCount ?? 0;
    const trialing = stripeStats?.trialingCount ?? 0;
    const newUsers7d = profiles.filter((p) => now - new Date(p.created_at).getTime() < 7 * D).length;
    const newUsers30d = profiles.filter((p) => now - new Date(p.created_at).getTime() < 30 * D).length;
    const onboarded = profiles.filter((p) => p.onboarding_completed).length;
    const onboardingRate = totalUsers ? Math.round((onboarded / totalUsers) * 100) : 0;
    const openTickets = tickets.filter((t) => t.status === "open").length;

    const uniqueVisitors30d = new Set(visits.map((v) => v.visitor_hash)).size;
    const today = new Date().toISOString().slice(0, 10);
    const uniqueVisitorsToday = new Set(visits.filter((v) => v.created_at.startsWith(today)).map((v) => v.visitor_hash)).size;
    const visitorToSignup = uniqueVisitors30d ? ((newUsers30d / uniqueVisitors30d) * 100).toFixed(1) : "0";
    const signupToPaid = totalUsers ? ((activePaid / totalUsers) * 100).toFixed(1) : "0";
    const visitorToPaid = uniqueVisitors30d ? ((activePaid / uniqueVisitors30d) * 100).toFixed(2) : "0";

    const mrr = (stripeStats?.mrrCents ?? 0) / 100;
    const arr = (stripeStats?.arrCents ?? 0) / 100;
    const planMix: Record<string, number> = {};
    (stripeStats?.byPlan ?? []).forEach((p) => { planMix[p.name] = p.count; });

    const countries: Record<string, number> = {};
    profiles.forEach((p) => { const c = p.country || "—"; countries[c] = (countries[c] ?? 0) + 1; });
    const topCountries = Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 6);

    const models: Record<string, number> = {};
    profiles.forEach((p) => (p.business_model ?? "").split(",").filter(Boolean).forEach((m) => {
      models[m] = (models[m] ?? 0) + 1;
    }));
    const topModels = Object.entries(models).sort((a, b) => b[1] - a[1]);

    const legals: Record<string, number> = {};
    profiles.forEach((p) => { const l = p.legal_form || "—"; legals[l] = (legals[l] ?? 0) + 1; });
    const topLegals = Object.entries(legals).sort((a, b) => b[1] - a[1]);

    const days: Record<string, number> = {};
    const visitorDays: Record<string, Set<string>> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * D);
      const k = d.toISOString().slice(0, 10);
      days[k] = 0;
      visitorDays[k] = new Set();
    }
    profiles.forEach((p) => {
      const k = p.created_at.slice(0, 10);
      if (k in days) days[k]++;
    });
    visits.forEach((v) => {
      const k = v.created_at.slice(0, 10);
      if (k in visitorDays) visitorDays[k].add(v.visitor_hash);
    });
    const visitorDaysCounts: Record<string, number> = {};
    Object.entries(visitorDays).forEach(([k, set]) => { visitorDaysCounts[k] = set.size; });

    const refs: Record<string, number> = {};
    visits.forEach((v) => {
      if (!v.referrer) return;
      try { const h = new URL(v.referrer).hostname; refs[h] = (refs[h] ?? 0) + 1; } catch {}
    });
    const topReferrers = Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 8);

    const utms: Record<string, number> = {};
    visits.forEach((v) => { if (v.utm_source) utms[v.utm_source] = (utms[v.utm_source] ?? 0) + 1; });
    const topUtms = Object.entries(utms).sort((a, b) => b[1] - a[1]).slice(0, 8);

    return {
      totalUsers, activePaid, trialing, newUsers7d, newUsers30d, onboardingRate,
      openTickets, planMix, mrr, arr, topCountries, topModels, topLegals, days, visitorDaysCounts,
      uniqueVisitors30d, uniqueVisitorsToday, visitorToSignup, signupToPaid, visitorToPaid,
      topReferrers, topUtms,
    };
  }, [profiles, subs, tickets, visits, stripeStats]);

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
    await loadAll();
    setSending(false);
    toast.success("Antwort gespeichert");
  };

  const setStatus = async (status: string) => {
    if (!selected) return;
    await supabase.from("contact_tickets").update({ status }).eq("id", selected.id);
    await loadAll();
    setSelected({ ...selected, status });
  };

  if (authLoading || roleLoading) return <div className="p-12 text-center text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <CockpitShell eyebrow="🛡️ Admin" title="Kommandozentrale" subtitle="Marketing-Insights, Kunden, Abos & Tickets.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Kpi icon={Users} label="Nutzer gesamt" value={stats.totalUsers} hint={`+${stats.newUsers7d} in 7T · +${stats.newUsers30d} in 30T`} />
        <Kpi icon={CreditCard} label="Aktive Abos" value={stats.activeSubs} hint={`Conversion ${stats.conversion}%`} accent />
        <Kpi icon={TrendingUp} label="MRR (geschätzt)" value={`€${stats.mrr.toFixed(2)}`} hint={`ARR ≈ €${(stats.mrr * 12).toFixed(0)}`} />
        <Kpi icon={Activity} label="Onboarding-Rate" value={`${stats.onboardingRate}%`} hint={`${stats.openTickets} offene Tickets · ${chatCount} Felix-Msgs · ${runsCount} Runs`} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="overview"><BarChart3 className="h-4 w-4 mr-1" /> Übersicht</TabsTrigger>
          <TabsTrigger value="kunden"><Users className="h-4 w-4 mr-1" /> Kunden ({stats.totalUsers})</TabsTrigger>
          <TabsTrigger value="abos"><CreditCard className="h-4 w-4 mr-1" /> Abos ({stats.activeSubs})</TabsTrigger>
          <TabsTrigger value="tickets"><Inbox className="h-4 w-4 mr-1" /> Tickets ({stats.openTickets})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-2 gap-4">
            <Panel title="Signups (letzte 30 Tage)" icon={UserPlus}>
              <Sparkline values={Object.values(stats.days)} />
              <div className="text-xs text-muted-foreground mt-2">
                Spitze: {Math.max(...Object.values(stats.days), 0)} an einem Tag · Schnitt: {(Object.values(stats.days).reduce((a, b) => a + b, 0) / 30).toFixed(1)} / Tag
              </div>
            </Panel>
            <Panel title="Plan-Mix (aktive Abos)" icon={CreditCard}>
              <Bars data={Object.entries(stats.planMix)} />
            </Panel>
            <Panel title="Top-Geschäftsmodelle" icon={TrendingUp}>
              <Bars data={stats.topModels} labelMap={MODEL_LABEL} />
            </Panel>
            <Panel title="Rechtsform-Mix" icon={BarChart3}>
              <Bars data={stats.topLegals} />
            </Panel>
            <Panel title="Top-Länder" icon={Users}>
              <Bars data={stats.topCountries} />
            </Panel>
            <Panel title="Engagement" icon={MessageSquare}>
              <div className="space-y-2 text-sm">
                <Row k="Felix-Chat-Nachrichten gesamt" v={chatCount.toString()} />
                <Row k="Playbook-Runs gesamt" v={runsCount.toString()} />
                <Row k="Tickets offen" v={stats.openTickets.toString()} />
                <Row k="Tickets gesamt" v={tickets.length.toString()} />
              </div>
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="kunden">
          <CustomerTable rows={profiles} subByUser={subByUser} />
        </TabsContent>

        <TabsContent value="abos">
          <SubsTable rows={subs} profiles={profiles} />
        </TabsContent>

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
      </Tabs>
    </CockpitShell>
  );
};

const Kpi = ({ icon: Icon, label, value, hint, accent }: { icon: any; label: string; value: any; hint?: string; accent?: boolean }) => (
  <div className={`rounded-2xl p-5 border ${accent ? "border-accent-blue/40 bg-gradient-primary text-primary-foreground" : "border-border bg-card"}`}>
    <div className="flex items-center justify-between">
      <span className={`text-[11px] uppercase tracking-wider font-bold ${accent ? "opacity-90" : "text-muted-foreground"}`}>{label}</span>
      <Icon className="h-4 w-4 opacity-70" />
    </div>
    <div className="text-3xl font-bold mt-2">{value}</div>
    {hint && <div className={`text-xs mt-1 ${accent ? "opacity-85" : "text-muted-foreground"}`}>{hint}</div>}
  </div>
);

const Panel = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-5">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-4 w-4 text-accent-blue" />
      <h3 className="font-bold">{title}</h3>
    </div>
    {children}
  </div>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-center justify-between border-b border-border/60 py-1.5 last:border-0">
    <span className="text-muted-foreground">{k}</span><span className="font-semibold">{v}</span>
  </div>
);

const Bars = ({ data, labelMap }: { data: [string, number][]; labelMap?: Record<string, string> }) => {
  if (!data.length) return <p className="text-xs text-muted-foreground">Keine Daten.</p>;
  const max = Math.max(...data.map((d) => d[1]));
  return (
    <div className="space-y-2">
      {data.map(([k, n]) => (
        <div key={k}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">{labelMap?.[k] ?? k}</span>
            <span className="text-muted-foreground">{n}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary" style={{ width: `${(n / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

const Sparkline = ({ values }: { values: number[] }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-0.5 h-24">
      {values.map((v, i) => (
        <div key={i} className="flex-1 bg-accent-blue/70 rounded-sm transition-all hover:bg-accent-blue"
          style={{ height: `${(v / max) * 100}%`, minHeight: 2 }} title={`${v}`} />
      ))}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    open: "bg-accent-blue/15 text-accent-blue",
    in_progress: "bg-warning/15 text-warning",
    resolved: "bg-success/15 text-success",
    closed: "bg-secondary text-muted-foreground",
    active: "bg-success/15 text-success",
    trialing: "bg-accent-blue/15 text-accent-blue",
    inactive: "bg-secondary text-muted-foreground",
  };
  return <Badge className={`${map[status] ?? ""} text-[10px]`}>{status}</Badge>;
};

const exportCsv = (rows: any[], filename: string) => {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const CustomerTable = ({ rows, subByUser }: { rows: ProfileRow[]; subByUser: Map<string, SubRow> }) => {
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (r.email ?? "").toLowerCase().includes(s)
      || (r.first_name ?? "").toLowerCase().includes(s)
      || (r.last_name ?? "").toLowerCase().includes(s)
      || (r.company_name ?? "").toLowerCase().includes(s)
      || (r.country ?? "").toLowerCase().includes(s);
  });
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Name, E-Mail, Firma, Land…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm" onClick={() => exportCsv(filtered, "kunden.csv")}>
          <Download className="h-4 w-4 mr-1" /> CSV
        </Button>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} / {rows.length}</span>
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-secondary/60"><tr>
            <Th>Name</Th><Th>E-Mail</Th><Th>Firma</Th><Th>Modell</Th><Th>Rechtsform</Th><Th>Land/Stadt</Th><Th>Plan</Th><Th>Status</Th><Th>Erstellt</Th>
          </tr></thead>
          <tbody>
            {filtered.map((r) => {
              const s = subByUser.get(r.id);
              return (
                <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                  <Td>{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</Td>
                  <Td>{r.email ? <a className="underline" href={`mailto:${r.email}`}>{r.email}</a> : "—"}</Td>
                  <Td>{r.company_name ?? "—"}</Td>
                  <Td className="text-xs">{(r.business_model ?? "").split(",").filter(Boolean).map((m) => MODEL_LABEL[m] ?? m).join(", ") || "—"}</Td>
                  <Td>{r.legal_form ?? "—"}</Td>
                  <Td>{[r.city, r.country].filter(Boolean).join(", ") || "—"}</Td>
                  <Td>{s?.plan && s.plan !== "none" ? s.plan : "—"}</Td>
                  <Td><StatusBadge status={s?.status ?? "inactive"} /></Td>
                  <Td>{new Date(r.created_at).toLocaleDateString("de-DE")}</Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubsTable = ({ rows, profiles }: { rows: SubRow[]; profiles: ProfileRow[] }) => {
  const profById = useMemo(() => {
    const m = new Map<string, ProfileRow>();
    profiles.forEach((p) => m.set(p.id, p));
    return m;
  }, [profiles]);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <Button variant="outline" size="sm" onClick={() => exportCsv(rows, "abos.csv")}>
          <Download className="h-4 w-4 mr-1" /> CSV
        </Button>
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-secondary/60"><tr>
            <Th>Kunde</Th><Th>E-Mail</Th><Th>Plan</Th><Th>Status</Th><Th>Period End</Th><Th>Aktualisiert</Th>
          </tr></thead>
          <tbody>
            {rows.map((r) => {
              const p = profById.get(r.user_id);
              return (
                <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                  <Td>{p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : r.user_id.slice(0, 8) + "…"}</Td>
                  <Td>{p?.email ?? "—"}</Td>
                  <Td>{r.plan}</Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td>{r.current_period_end ? new Date(r.current_period_end).toLocaleDateString("de-DE") : "—"}</Td>
                  <Td>{new Date(r.updated_at).toLocaleDateString("de-DE")}</Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => <th className="text-left p-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{children}</th>;
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <td className={`p-3 ${className}`}>{children}</td>;

export default Admin;
