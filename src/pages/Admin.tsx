import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Callout, EmptyState, KitTable, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2, Send, Inbox, Users, CreditCard, BarChart3, Search, Download,
  TrendingUp, UserPlus, Activity, MessageSquare, Calendar, Megaphone, MousePointerClick,
} from "lucide-react";
import { BookingsAdmin } from "@/components/admin/BookingsAdmin";
import { AdminGuideAnnounce } from "@/components/admin/AdminGuideAnnounce";
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

    // === TOOL-USAGE-RANKING (Cockpit-Routes nach unique visitors) ===
    const toolViews: Record<string, { views: number; uniques: Set<string> }> = {};
    visits.forEach((v) => {
      if (!v.path.startsWith("/cockpit/") && v.path !== "/booking" && v.path !== "/anbieter") return;
      // Cleanup: ?-params abschneiden für gruppierung
      const cleanPath = v.path.split("?")[0];
      if (!toolViews[cleanPath]) toolViews[cleanPath] = { views: 0, uniques: new Set() };
      toolViews[cleanPath].views++;
      toolViews[cleanPath].uniques.add(v.visitor_hash);
    });
    const toolRanking = Object.entries(toolViews)
      .map(([path, v]) => ({ path, views: v.views, uniques: v.uniques.size }))
      .sort((a, b) => b.uniques - a.uniques);

    // Tote Tools: definierte Routes aus features.ts, die 0 Views haben
    // (Liste der bekannten Cockpit-Routes aus features.ts hardcoded für Mai-2026-Snapshot)
    const KNOWN_TOOL_ROUTES = [
      "/cockpit/abschreibung", "/cockpit/amazon-buchungen", "/cockpit/amazon-ust",
      "/cockpit/auszahlung-optimizer", "/cockpit/bwa-generator", "/cockpit/ce-generator",
      "/cockpit/check", "/cockpit/crypto-steuer", "/cockpit/datev-mapper", "/cockpit/dba-cfc",
      "/cockpit/ecom-roadmap", "/cockpit/entscheidungs-engine", "/cockpit/eu-alternativen",
      "/cockpit/foerderung", "/cockpit/hk-limited-wizard", "/cockpit/holding-designer",
      "/cockpit/iab-rechner", "/cockpit/intl-banking", "/cockpit/ip-box",
      "/cockpit/kfz-optimizer", "/cockpit/labor-vergleich", "/cockpit/lucid-wizard",
      "/cockpit/marge-tracker", "/cockpit/marken-monitor", "/cockpit/marken-wizard",
      "/cockpit/pension-optimizer", "/cockpit/pre-year-end", "/cockpit/quartals-steuer",
      "/cockpit/reisekosten-logger", "/cockpit/salary-dividende", "/cockpit/sales-tax-nexus",
      "/cockpit/settlement-parser", "/cockpit/stb-finder", "/cockpit/stb-handoff",
      "/cockpit/stb-match", "/cockpit/steuer", "/cockpit/substance-checker",
      "/cockpit/ust-rechner", "/cockpit/us-kreditkarten", "/cockpit/us-llc-wizard",
      "/cockpit/visa-helper",
    ];
    const usedPaths = new Set(toolRanking.map((t) => t.path));
    const deadTools = KNOWN_TOOL_ROUTES.filter((r) => !usedPaths.has(r));

    return {
      totalUsers, activePaid, trialing, newUsers7d, newUsers30d, onboardingRate,
      openTickets, planMix, mrr, arr, topCountries, topModels, topLegals, days, visitorDaysCounts,
      uniqueVisitors30d, uniqueVisitorsToday, visitorToSignup, signupToPaid, visitorToPaid,
      topReferrers, topUtms, toolRanking, deadTools,
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

  if (authLoading || roleLoading) return <div className="p-12 text-center text-sm text-muted-foreground"><Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" aria-hidden="true" />Zugang wird geprüft…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <CockpitShell eyebrow="Admin" title="Kommandozentrale" subtitle="Marketing-Insights, Kunden, Abos und Tickets auf einen Blick.">
      {stripeError && (
        <Callout tone="danger" title="Stripe-Daten nicht ladbar" className="mb-6">
          {stripeError}
        </Callout>
      )}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={Users} label="Besucher (30 Tage)" value={stats.uniqueVisitors30d} hint={`Heute: ${stats.uniqueVisitorsToday} · Signups 30 Tage: ${stats.newUsers30d}`} />
        <Kpi icon={UserPlus} label="Registrierte" value={stats.totalUsers} hint={`Visitor→Signup ${stats.visitorToSignup}%`} />
        <Kpi icon={CreditCard} label="Zahlende Kunden" value={stats.activePaid} hint={`+ ${stats.trialing} Trial · Signup→Paid ${stats.signupToPaid}%`} accent />
        <Kpi icon={TrendingUp} label="MRR (Stripe live)" value={`${stats.mrr.toFixed(2)} €`} hint={`ARR ${stats.arr.toFixed(0)} € · Visitor→Paid ${stats.visitorToPaid}%`} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6 h-auto w-full flex-wrap justify-start gap-1 p-1 sm:w-auto">
          <TabsTrigger value="overview"><BarChart3 className="h-4 w-4 mr-1" /> Übersicht</TabsTrigger>
          <TabsTrigger value="kunden"><Users className="h-4 w-4 mr-1" /> Kunden ({stats.totalUsers})</TabsTrigger>
          <TabsTrigger value="abos"><CreditCard className="h-4 w-4 mr-1" /> Abos ({stats.activePaid})</TabsTrigger>
          <TabsTrigger value="tickets"><Inbox className="h-4 w-4 mr-1" /> Tickets ({stats.openTickets})</TabsTrigger>
          <TabsTrigger value="bookings"><Calendar className="h-4 w-4 mr-1" /> Bookings</TabsTrigger>
          <TabsTrigger value="tools"><BarChart3 className="h-4 w-4 mr-1" /> Tool-Insights ({stats.toolRanking.length}/{stats.toolRanking.length + stats.deadTools.length})</TabsTrigger>
          <TabsTrigger value="guides"><Megaphone className="h-4 w-4 mr-1" /> Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <AdminGuideAnnounce />
        </TabsContent>

        <TabsContent value="overview">
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title="Funnel (30 Tage)" icon={TrendingUp}>
              <FunnelBars
                steps={[
                  { label: "Besucher", n: stats.uniqueVisitors30d },
                  { label: "Signups", n: stats.newUsers30d },
                  { label: "Zahlend (aktiv)", n: stats.activePaid },
                ]}
              />
            </Panel>
            <Panel title="Besucher (letzte 30 Tage, unique/Tag)" icon={Activity}>
              <Sparkline values={Object.values(stats.visitorDaysCounts)} />
              <div className="mt-3 text-xs text-muted-foreground tabular">
                Spitze: {Math.max(...Object.values(stats.visitorDaysCounts), 0)} · Schnitt: {(Object.values(stats.visitorDaysCounts).reduce((a, b) => a + b, 0) / 30).toFixed(1)} / Tag
              </div>
            </Panel>
            <Panel title="Signups (letzte 30 Tage)" icon={UserPlus}>
              <Sparkline values={Object.values(stats.days)} />
              <div className="mt-3 text-xs text-muted-foreground tabular">
                Spitze: {Math.max(...Object.values(stats.days), 0)} · Schnitt: {(Object.values(stats.days).reduce((a, b) => a + b, 0) / 30).toFixed(1)} / Tag
              </div>
            </Panel>
            <Panel title="Plan-Mix (Stripe aktiv)" icon={CreditCard}>
              <Bars data={Object.entries(stats.planMix)} />
            </Panel>
            <Panel title="Top-Referrer" icon={TrendingUp}>
              <Bars data={stats.topReferrers} />
            </Panel>
            <Panel title="Top-UTM-Quellen" icon={TrendingUp}>
              <Bars data={stats.topUtms} />
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
              <div className="text-sm">
                <Row k="Onboarding-Rate" v={`${stats.onboardingRate}%`} />
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
          <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-card">
              {tickets.length === 0 && (
                <EmptyState icon={Inbox} title="Noch keine Tickets" description="Anfragen aus dem Kontaktformular landen hier." className="border-0 bg-transparent py-10" />
              )}
              {tickets.map((t) => (
                <button key={t.id} onClick={() => openTicket(t)}
                  className={`mb-1 w-full rounded-xl border p-3 text-left transition-colors ${selected?.id === t.id ? "border-accent-blue/25 bg-accent" : "border-transparent hover:bg-secondary/60"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{t.subject}</span>
                    <StatusBadge status={t.status} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">{t.name} · {t.email}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: de })}</div>
                </button>
              ))}
            </div>

            <div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
              {!selected ? (
                <EmptyState icon={MessageSquare} title="Kein Ticket ausgewählt" description="Wähle links ein Ticket, um den Verlauf zu sehen und zu antworten." className="border-0 bg-transparent" />
              ) : (
                <>
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold tracking-tight">{selected.subject}</h2>
                      <p className="mt-1 break-all text-sm text-muted-foreground">{selected.name} · <a href={`mailto:${selected.email}`} className="text-accent-blue hover:underline">{selected.email}</a></p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => setStatus("in_progress")}>In Arbeit</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus("resolved")}>Erledigt</Button>
                      <Button size="sm" variant="ghost" onClick={() => setStatus("closed")}>Schließen</Button>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                    <div className="rounded-xl bg-secondary/60 p-4">
                      <div className="mb-1 text-xs font-semibold text-muted-foreground">{selected.name}</div>
                      <p className="text-sm whitespace-pre-wrap">{selected.message}</p>
                    </div>
                    {msgs.map((m) => (
                      <div key={m.id} className={`rounded-xl border p-4 ${m.author_role === "admin" ? "ml-6 border-accent-blue/20 bg-accent md:ml-8" : "mr-6 border-border bg-secondary/60 md:mr-8"}`}>
                        <div className="mb-1 text-xs font-semibold text-muted-foreground">
                          {m.author_role === "admin" ? "Du (Admin)" : selected.name} · {formatDistanceToNow(new Date(m.created_at), { addSuffix: true, locale: de })}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-border/70 pt-4">
                    <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Deine Antwort an den Kunden…" rows={4} />
                    <Button onClick={send} disabled={sending || !reply.trim()} className="mt-3">
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-1.5 h-4 w-4" /> Antwort senden</>}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsAdmin />
        </TabsContent>

        <TabsContent value="tools">
          <div className="space-y-4">
            <Callout tone="accent" icon={BarChart3} title="Welche Tools verdienen Tiefe, welche können weg">
              Daten der letzten 30 Tage. Gezählt werden Unique-Visitors pro Tool, nicht alle Views (derselbe User mit 5 Klicks zählt 1). Tools mit 0 Uniques prüfen:
              möglicherweise schlecht beworben, falscher Bedarf oder kaputt.
            </Callout>

            <Panel title={`Top-Tools nach Unique-Visitors (${stats.toolRanking.length} aktive)`} icon={TrendingUp}>
              {stats.toolRanking.length === 0 ? (
                <EmptyState icon={MousePointerClick} title="Noch keine Tool-Views" description="In den letzten 30 Tagen wurde kein Cockpit-Tool aufgerufen." className="py-8" />
              ) : (
                <div className="space-y-2.5">
                  {stats.toolRanking.map((t, idx) => {
                    const maxUniques = stats.toolRanking[0].uniques;
                    const pct = maxUniques ? Math.round((t.uniques / maxUniques) * 100) : 0;
                    return (
                      <div key={t.path} className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-7 shrink-0 text-muted-foreground tabular">{idx + 1}.</span>
                            <code className="truncate font-mono text-xs">{t.path}</code>
                          </div>
                          <div className="ml-2 flex shrink-0 items-center gap-2 tabular">
                            <span className="font-semibold">{t.uniques}</span>
                            <span className="text-muted-foreground">({t.views} Views)</span>
                          </div>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-accent-blue" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>

            {stats.deadTools.length > 0 && (
              <Panel title={`Tote Tools ohne Views in 30 Tagen: ${stats.deadTools.length}`} icon={Inbox}>
                <div className="mb-3 text-sm text-muted-foreground">
                  Diese Routes sind in features.ts definiert, aber niemand hat sie in den letzten 30 Tagen aufgerufen.
                  Kandidaten für: im Dashboard stärker bewerben, neue Use-Cases testen oder löschen.
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stats.deadTools.map((path) => (
                    <code key={path} className="rounded-md border border-danger/25 bg-danger-soft px-2 py-1 font-mono text-xs text-danger">
                      {path}
                    </code>
                  ))}
                </div>
              </Panel>
            )}

            <Panel title="Tool-Funnels (Step-Tracking)" icon={Activity}>
              <div className="text-sm leading-relaxed text-muted-foreground">
                Funnel-Events (User kommt in Step 1 vs. Step 5) sind ab Mai 2026 instrumentiert für ausgewählte
                Wizards. Sobald genug Daten gesammelt sind, erscheint hier eine Step-für-Step-Conversion pro Tool.
                Aktuell instrumentiert: LUCID-Wizard.
              </div>
            </Panel>
          </div>
        </TabsContent>
      </Tabs>
    </CockpitShell>
  );
};

const Kpi = ({ icon: Icon, label, value, hint, accent }: { icon: any; label: string; value: any; hint?: string; accent?: boolean }) => (
  <div className={`rounded-2xl border p-5 ${accent ? "border-transparent bg-ink text-primary-foreground shadow-soft" : "border-border bg-card shadow-card"}`}>
    <div className="flex items-center justify-between gap-2">
      <span className={`text-sm font-medium ${accent ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{label}</span>
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-white/10 text-brand-green-glow" : "bg-accent text-accent-blue"}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
    <div className="mt-2 text-3xl font-semibold tracking-[-0.03em] tabular">{value}</div>
    {hint && <div className={`mt-1 text-xs leading-relaxed tabular ${accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{hint}</div>}
  </div>
);

const Panel = ({ title, icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <ToolSection title={title} icon={icon}>
    {children}
  </ToolSection>
);

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2.5 last:border-0">
    <span className="text-muted-foreground">{k}</span><span className="font-semibold tabular">{v}</span>
  </div>
);

const Bars = ({ data, labelMap }: { data: [string, number][]; labelMap?: Record<string, string> }) => {
  if (!data.length) return <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">Noch keine Daten.</p>;
  const max = Math.max(...data.map((d) => d[1]));
  return (
    <div className="space-y-2.5">
      {data.map(([k, n]) => (
        <div key={k}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="truncate font-medium">{labelMap?.[k] ?? k}</span>
            <span className="text-muted-foreground tabular">{n}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${(n / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

const FunnelBars = ({ steps }: { steps: { label: string; n: number }[] }) => {
  const max = Math.max(...steps.map((s) => s.n), 1);
  return (
    <div className="space-y-4">
      {steps.map((s, i) => {
        const prev = i > 0 ? steps[i - 1].n : null;
        const pct = prev && prev > 0 ? ((s.n / prev) * 100).toFixed(1) : null;
        return (
          <div key={s.label}>
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
              <span className="font-semibold">{s.label}</span>
              <span className="text-muted-foreground tabular">
                {s.n.toLocaleString("de-DE")}
                {pct !== null && <span className="ml-2 text-xs">({pct} % vs. {steps[i - 1].label})</span>}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${(s.n / max) * 100}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Sparkline = ({ values }: { values: number[] }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-24 items-end gap-0.5 rounded-xl bg-secondary/40 p-2">
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm bg-accent-blue/70 transition-colors hover:bg-accent-blue"
          style={{ height: `${(v / max) * 100}%`, minHeight: 2 }} title={`${v}`} />
      ))}
    </div>
  );
};

const STATUS_TONE: Record<string, Tone> = {
  open: "accent",
  in_progress: "warning",
  resolved: "success",
  closed: "neutral",
  active: "success",
  trialing: "info",
  inactive: "neutral",
};
const StatusBadge = ({ status }: { status: string }) => <ToneBadge tone={STATUS_TONE[status] ?? "neutral"}>{status}</ToneBadge>;

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
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input placeholder="Name, E-Mail, Firma, Land…" aria-label="Kunden durchsuchen" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm" onClick={() => exportCsv(filtered, "kunden.csv")}>
          <Download className="mr-1.5 h-4 w-4" /> CSV
        </Button>
        <span className="ml-auto text-sm text-muted-foreground tabular">{filtered.length} von {rows.length}</span>
      </div>
      {rows.length === 0 ? (
        <EmptyState icon={Users} title="Noch keine Kunden" description="Sobald sich jemand registriert, erscheint das Profil hier." />
      ) : (
      <KitTable caption="Kundenliste" className="[&_table]:min-w-[900px]">
          <thead><tr>
            <Th>Name</Th><Th>E-Mail</Th><Th>Firma</Th><Th>Modell</Th><Th>Rechtsform</Th><Th>Land/Stadt</Th><Th>Plan</Th><Th>Status</Th><Th>Erstellt</Th>
          </tr></thead>
          <tbody>
            {filtered.map((r) => {
              const s = subByUser.get(r.id);
              return (
                <tr key={r.id}>
                  <Td>{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</Td>
                  <Td>{r.email ? <a className="text-accent-blue hover:underline" href={`mailto:${r.email}`}>{r.email}</a> : "—"}</Td>
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
      </KitTable>
      )}
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground tabular">{rows.length} Abos</span>
        <Button variant="outline" size="sm" onClick={() => exportCsv(rows, "abos.csv")}>
          <Download className="mr-1.5 h-4 w-4" /> CSV
        </Button>
      </div>
      {rows.length === 0 ? (
        <EmptyState icon={CreditCard} title="Noch keine Abos" description="Abos aus Stripe erscheinen hier nach dem ersten Checkout." />
      ) : (
      <KitTable caption="Abos" className="[&_table]:min-w-[800px]">
          <thead><tr>
            <Th>Kunde</Th><Th>E-Mail</Th><Th>Plan</Th><Th>Status</Th><Th>Laufzeitende</Th><Th>Aktualisiert</Th>
          </tr></thead>
          <tbody>
            {rows.map((r) => {
              const p = profById.get(r.user_id);
              return (
                <tr key={r.id}>
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
      </KitTable>
      )}
    </div>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => <th className="whitespace-nowrap">{children}</th>;
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <td className={className}>{children}</td>;

export default Admin;
