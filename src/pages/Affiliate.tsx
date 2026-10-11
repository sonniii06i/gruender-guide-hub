import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState, Field, StatGrid, StatTile, ToolSection } from "@/components/cockpit/kit";
import { Input } from "@/components/ui/input";
import { Copy, Gift, Percent, Wallet, Users, Loader2, Check, X } from "lucide-react";
import { useRole } from "@/hooks/useRole";

interface AffiliateData {
  code: string;
  ref_link: string;
  payout_name?: string | null;
  payout_iban?: string | null;
  stats: { available_cents: number; requestable_cents: number; paid_out_cents: number; active_referrals: number; total_referrals: number };
  commissions: { commission_cents: number; status: string; product: string; created_at: string }[];
  payouts: { amount_cents: number; status: string; requested_at: string; paid_at?: string | null }[];
}

const eur = (c: number) => (c / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

export default function Affiliate() {
  const { toast } = useToast();
  const [data, setData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [busy, setBusy] = useState(false);

  const call = async (body: Record<string, unknown>) => {
    const { data: res, error } = await supabase.functions.invoke("manage-affiliate", { body });
    if (error || (res as any)?.error) {
      toast({ title: "Fehler", description: (res as any)?.error || error?.message, variant: "destructive" });
      return null;
    }
    return res as AffiliateData;
  };

  useEffect(() => {
    (async () => {
      const res = await call({ action: "me" });
      if (res) { setData(res); setName(res.payout_name || ""); setIban(res.payout_iban || ""); }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async () => { if (data) { await navigator.clipboard.writeText(data.ref_link); toast({ title: "Kopiert!", description: "Dein Reflink ist in der Zwischenablage." }); } };

  const savePayout = async () => {
    setBusy(true);
    const res = await call({ action: "save_payout", payout_name: name, payout_iban: iban });
    if (res) { setData(res); toast({ title: "Gespeichert", description: "Auszahlungsdaten aktualisiert." }); }
    setBusy(false);
  };

  const requestPayout = async () => {
    setBusy(true);
    const { data: res, error } = await supabase.functions.invoke("manage-affiliate", { body: { action: "request_payout" } });
    if (error || (res as any)?.error) {
      toast({ title: "Auszahlung nicht möglich", description: (res as any)?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: "Auszahlung angefordert", description: `${eur((res as any)?.requested_cents || 0)} werden manuell überwiesen.` });
      const fresh = await call({ action: "me" });
      if (fresh) setData(fresh);
    }
    setBusy(false);
  };

  if (loading)
    return (
      <div className="container max-w-4xl space-y-4 px-4 pb-16 pt-10 md:px-6" aria-busy="true">
        <span className="sr-only">Partnerdaten werden geladen…</span>
        <div className="h-8 w-1/2 animate-pulse rounded bg-secondary" />
        <div className="h-24 animate-pulse rounded-2xl bg-secondary" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-secondary" />)}
        </div>
      </div>
    );
  if (!data) return null;
  const s = data.stats;

  return (
    <div className="container max-w-4xl space-y-6 px-4 pb-16 pt-8 md:px-6 md:pt-10">
      <header className="border-b border-border/70 pb-7">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue">
          <Percent className="h-4 w-4" aria-hidden="true" /> 20 % Umsatzbeteiligung, lebenslang
        </p>
        <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] md:text-[2.25rem]">Partnerprogramm</h1>
        <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
          Empfiehl GründerX, AnwaltX oder das Founder-Set. Du bekommst <strong className="font-semibold text-foreground">20 % von jeder Zahlung</strong> deiner Geworbenen, dauerhaft und nicht nur im ersten Monat. Auszahlung in echtem Geld.
        </p>
      </header>

      <ToolSection title="Dein Reflink" icon={Gift} description="Jeder Kauf über diesen Link wird dir zugeordnet.">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="reflink" className="sr-only">Dein Reflink</label>
          <Input id="reflink" readOnly value={data.ref_link} className="font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
          <Button onClick={copy} className="shrink-0"><Copy className="h-4 w-4" aria-hidden="true" /> Kopieren</Button>
        </div>
      </ToolSection>

      <StatGrid cols={4}>
        <StatTile label="Verfügbar" value={eur(s.available_cents)} />
        <StatTile label="Auszahlbar" value={eur(s.requestable_cents)} tone={s.requestable_cents >= 2000 ? "success" : "neutral"} emphasis={s.requestable_cents >= 2000} />
        <StatTile label="Ausgezahlt" value={eur(s.paid_out_cents)} />
        <StatTile label="Aktive Abos" value={String(s.active_referrals)} />
      </StatGrid>

      <ToolSection title="Auszahlung" icon={Wallet} description="Mindestauszahlung 20 €, manuell per Überweisung.">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kontoinhaber" htmlFor="payout-name">
              <Input id="payout-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vor- und Nachname" />
            </Field>
            <Field label="IBAN" htmlFor="payout-iban">
              <Input id="payout-iban" spellCheck={false} value={iban} onChange={(e) => setIban(e.target.value)} placeholder="DE…" className="font-mono" />
            </Field>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={savePayout} disabled={busy}>Daten speichern</Button>
            <Button onClick={requestPayout} disabled={busy || s.requestable_cents < 2000 || !data.payout_iban}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : `Auszahlung anfordern (${eur(s.requestable_cents)})`}
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">Als Partner stellst du für die Auszahlung eine Rechnung oder Gutschrift; die 20 % sind Netto-Umsatzbeteiligung.</p>
        </div>
      </ToolSection>

      {data.commissions.length > 0 ? (
        <ToolSection title="Letzte Provisionen" bodyClassName="p-0">
          <ul className="divide-y divide-border/70 text-sm">
            {data.commissions.slice(0, 10).map((c, i) => (
              <li key={i} className="flex justify-between gap-4 px-5 py-3 md:px-6">
                <span className="text-muted-foreground">{new Date(c.created_at).toLocaleDateString("de-DE")} · {c.product} · {c.status}</span>
                <span className="font-medium tabular">{eur(c.commission_cents)}</span>
              </li>
            ))}
          </ul>
        </ToolSection>
      ) : (
        <EmptyState icon={Users} title="Noch keine Provisionen" description="Sobald jemand über deinen Reflink kauft, erscheint die Provision hier." />
      )}

      <AdminPayouts />
    </div>
  );
}

function AdminPayouts() {
  const { isAdmin } = useRole();
  const { toast } = useToast();
  const [rows, setRows] = useState<any[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.functions.invoke("manage-affiliate", { body: { action: "admin_list" } });
    setRows((data as any)?.payouts || []);
  };
  useEffect(() => { if (isAdmin) load(); /* eslint-disable-next-line */ }, [isAdmin]);
  if (!isAdmin) return null;

  const act = async (action: string, payout_id: string) => {
    setBusy(payout_id);
    const { data, error } = await supabase.functions.invoke("manage-affiliate", { body: { action, payout_id } });
    if (error || (data as any)?.error) toast({ title: "Fehler", description: (data as any)?.error || error?.message, variant: "destructive" });
    else { toast({ title: action === "admin_mark_paid" ? "Als bezahlt markiert" : "Abgelehnt" }); await load(); }
    setBusy(null);
  };

  return (
    <Card className="border-accent-blue/25">
      <CardHeader><CardTitle className="text-base">Admin: Auszahlungsanfragen</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {!rows ? <Loader2 className="h-5 w-5 animate-spin" /> : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">Keine offenen Auszahlungen.</p>
        ) : rows.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 border-b border-border/50 py-2 last:border-0 flex-wrap">
            <div className="text-sm min-w-0">
              <div className="font-medium">{eur(p.amount_cents)} · {p.affiliates?.payout_name || p.affiliates?.email}</div>
              <div className="truncate font-mono text-xs text-muted-foreground">{p.affiliates?.payout_iban || "keine IBAN"} · {p.affiliates?.email}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" onClick={() => act("admin_mark_paid", p.id)} disabled={busy === p.id}><Check className="h-4 w-4 mr-1" />Bezahlt</Button>
              <Button size="sm" variant="outline" onClick={() => act("admin_reject", p.id)} disabled={busy === p.id}><X className="h-4 w-4 mr-1" />Ablehnen</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
