import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!data) return null;
  const s = data.stats;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-primary"><Percent className="h-5 w-5" /><span className="font-semibold">20 % Umsatzbeteiligung – lebenslang</span></div>
        <h1 className="text-2xl md:text-3xl font-bold">Partnerprogramm</h1>
        <p className="text-muted-foreground">Empfiehl GründerX, AnwaltX oder das Founder-Bundle. Du bekommst <strong>20 % von jeder Zahlung</strong> deiner Geworbenen – dauerhaft, nicht nur im ersten Monat. Auszahlung in echtem Geld.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gift className="h-4 w-4" /> Dein Reflink</CardTitle></CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-2">
          <Input readOnly value={data.ref_link} className="font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
          <Button onClick={copy} className="shrink-0"><Copy className="h-4 w-4 mr-1.5" /> Kopieren</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat icon={<Wallet className="h-4 w-4" />} label="Verfügbar" value={eur(s.available_cents)} />
        <Stat icon={<Wallet className="h-4 w-4" />} label="Auszahlbar" value={eur(s.requestable_cents)} />
        <Stat icon={<Percent className="h-4 w-4" />} label="Ausgezahlt" value={eur(s.paid_out_cents)} />
        <Stat icon={<Users className="h-4 w-4" />} label="Aktive Abos" value={String(s.active_referrals)} />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Auszahlung</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Kontoinhaber</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Vor- und Nachname" /></div>
            <div><Label>IBAN</Label><Input value={iban} onChange={(e) => setIban(e.target.value)} placeholder="DE.." className="font-mono" /></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={savePayout} disabled={busy}>Daten speichern</Button>
            <Button onClick={requestPayout} disabled={busy || s.requestable_cents < 2000 || !data.payout_iban}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : `Auszahlung anfordern (${eur(s.requestable_cents)})`}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Mindestauszahlung 20 €. Auszahlung manuell per Überweisung. Als Partner stellst du dafür eine Rechnung/Gutschrift; die 20 % sind Netto-Umsatzbeteiligung.</p>
        </CardContent>
      </Card>

      {data.commissions.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Letzte Provisionen</CardTitle></CardHeader>
          <CardContent className="space-y-1.5 text-sm">
            {data.commissions.slice(0, 10).map((c, i) => (
              <div key={i} className="flex justify-between border-b border-border/50 py-1.5 last:border-0">
                <span className="text-muted-foreground">{new Date(c.created_at).toLocaleDateString("de-DE")} · {c.product} · {c.status}</span>
                <span className="font-medium">{eur(c.commission_cents)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
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
    <Card className="border-primary/30">
      <CardHeader><CardTitle className="text-base">Admin · Auszahlungsanfragen</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {!rows ? <Loader2 className="h-5 w-5 animate-spin" /> : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">Keine offenen Auszahlungen.</p>
        ) : rows.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 border-b border-border/50 py-2 last:border-0 flex-wrap">
            <div className="text-sm min-w-0">
              <div className="font-medium">{eur(p.amount_cents)} · {p.affiliates?.payout_name || p.affiliates?.email}</div>
              <div className="text-muted-foreground font-mono text-xs truncate">{p.affiliates?.payout_iban || "— keine IBAN —"} · {p.affiliates?.email}</div>
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

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card><CardContent className="p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">{icon}{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </CardContent></Card>
  );
}
