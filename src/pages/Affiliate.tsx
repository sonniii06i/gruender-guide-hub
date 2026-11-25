import { ibanGueltig } from "@/lib/eRechnungLesen";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Callout, EmptyState, Field, StatGrid, StatTile, ToneBadge, ToolSection } from "@/components/cockpit/kit";
import { Input } from "@/components/ui/input";
import { Copy, Gift, Percent, Wallet, Users, Loader2, Check, X, ShieldCheck, Lock, Pencil } from "lucide-react";
import { useRole } from "@/hooks/useRole";

interface AffiliateData {
  code: string;
  ref_link: string;
  konditionen?: "v1_20_dauerhaft" | "v2_25_12m";
  payout_name?: string | null;
  payout_iban_masked?: string | null;
  has_payout_iban?: boolean;
  has_open_payout?: boolean;
  email_verified?: boolean;
  stats: {
    available_cents: number;
    requestable_cents: number;
    in_wartezeit_cents?: number;
    paid_out_cents: number;
    active_referrals: number;
    total_referrals: number;
  };
  commissions: { commission_cents: number; status: string; product: string; created_at: string }[];
  payouts: { amount_cents: number; status: string; requested_at: string; paid_at?: string | null }[];
}

const eur = (c: number) => (c / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

export default function Affiliate() {
  const { toast } = useToast();
  const [data, setData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingBank, setEditingBank] = useState(false);
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [busy, setBusy] = useState(false);
  const [ladeFehler, setLadeFehler] = useState(false);

  const call = async (body: Record<string, unknown>) => {
    const { data: res, error } = await supabase.functions.invoke("manage-affiliate", { body });
    if (error || (res as any)?.error) {
      let msg = (res as any)?.error || error?.message || "Aktion fehlgeschlagen";
      try {
        const parsed = await (error as { context?: { json?: () => Promise<{ error?: string }> } })?.context?.json?.();
        if (parsed?.error) msg = parsed.error;
      } catch {
        /* ignore */
      }
      toast({ title: "Hinweis", description: msg, variant: "destructive" });
      return null;
    }
    if (!(res as AffiliateData | null)?.stats) return null;
    return res as AffiliateData;
  };

  const laden = async () => {
    setLoading(true);
    setLadeFehler(false);
    const res = await call({ action: "me" });
    if (res) {
      setData(res);
      setName(res.payout_name || "");
      setIban("");
      setEditingBank(!res.has_payout_iban);
    } else {
      setLadeFehler(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    void laden();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async () => {
    if (data) {
      await navigator.clipboard.writeText(data.ref_link);
      toast({ title: "Kopiert", description: "Dein Empfehlungslink liegt in der Zwischenablage." });
    }
  };

  const savePayout = async () => {
    if (name.trim().length < 2) {
      toast({ title: "Kontoinhaber fehlt", description: "Bitte gib mindestens Vor- und Nachnamen an.", variant: "destructive" });
      return;
    }
    if (!ibanGueltig(iban)) {
      toast({ title: "IBAN ungültig", description: "Bitte prüfe Länderkennung, Länge und Prüfziffer deiner IBAN.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const res = await call({ action: "save_payout", payout_name: name.trim(), payout_iban: iban.trim() });
    if (res) {
      setData(res);
      setIban("");
      setEditingBank(false);
      toast({ title: "Serverseitig gespeichert", description: "Deine Bankdaten wurden geprüft und sicher hinterlegt." });
    }
    setBusy(false);
  };

  const requestPayout = async () => {
    setBusy(true);
    const { data: res, error } = await supabase.functions.invoke("manage-affiliate", { body: { action: "request_payout" } });
    if (error || (res as any)?.error) {
      let msg = (res as any)?.error || error?.message || "Auszahlung nicht möglich";
      try {
        const parsed = await (error as { context?: { json?: () => Promise<{ error?: string }> } })?.context?.json?.();
        if (parsed?.error) msg = parsed.error;
      } catch {
        /* ignore */
      }
      toast({ title: "Auszahlung nicht möglich", description: msg, variant: "destructive" });
    } else {
      toast({
        title: "Auszahlung angefordert",
        description: `${eur((res as any)?.requested_cents || 0)} wurden serverseitig verbucht und werden überwiesen.`,
      });
      const fresh = await call({ action: "me" });
      if (fresh) setData(fresh);
    }
    setBusy(false);
  };

  if (loading) {
    return (
      <CockpitShell eyebrow="Partnerprogramm" title="Partnerprogramm" showRelated={false}>
        <div className="space-y-4" aria-busy="true">
          <span className="sr-only">Partnerdaten werden geladen…</span>
          <div className="h-24 animate-pulse rounded-2xl bg-secondary" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-secondary" />
            ))}
          </div>
        </div>
      </CockpitShell>
    );
  }

  if (!data) {
    return (
      <CockpitShell eyebrow="Partnerprogramm" title="Partnerprogramm" showRelated={false}>
        <EmptyState
          icon={Users}
          title="Partnerdaten nicht geladen"
          description={ladeFehler ? "Wir konnten dein Partnerkonto gerade nicht laden. Bitte versuch es noch einmal." : "Keine Partnerdaten gefunden."}
          action={<Button onClick={() => void laden()}>Erneut laden</Button>}
        />
      </CockpitShell>
    );
  }

  const s = data.stats;
  const bestand = data.konditionen === "v1_20_dauerhaft";

  return (
    <CockpitShell
      eyebrow={`Partnerprogramm · ${bestand ? "20 % dauerhaft" : "25 % für 12 Monate"}`}
      title="Partnerprogramm & Auszahlungen"
      subtitle={`Empfiehl GründerX und erhalte ${bestand ? "20 %" : "25 %"} von jeder Zahlung deiner Geworbenen (${bestand ? "dauerhaft" : "12 Monate je Kunde"}). Auszahlbar ab 20 € nach Ablauf der 14-tägigen Widerrufsfrist.`}
      showRelated={false}
    >
      <div className="space-y-6">
        <ToolSection title="Dein persönlicher Empfehlungslink" icon={Gift} description="Jeder Kauf über diesen Link wird 60 Tage lang automatisch deinem Konto zugeordnet.">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <label htmlFor="reflink" className="sr-only">Dein Reflink</label>
            <Input id="reflink" readOnly value={data.ref_link} className="h-11 font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
            <Button onClick={copy} className="press h-11 shrink-0 gap-2 rounded-xl">
              <Copy className="h-4 w-4" aria-hidden="true" /> Link kopieren
            </Button>
          </div>
        </ToolSection>

        <StatGrid cols={4}>
          <StatTile label="Verfügbar gesamt" value={eur(s.available_cents)} />
          <StatTile
            label="Auszahlbar"
            value={eur(s.requestable_cents)}
            tone={s.requestable_cents >= 2000 ? "success" : "neutral"}
            emphasis={s.requestable_cents >= 2000}
          />
          <StatTile label="Ausgezahlt" value={eur(s.paid_out_cents)} />
          <StatTile label="Aktive Abos" value={String(s.active_referrals)} />
        </StatGrid>

        <ToolSection
          title="Auszahlung & Bankdaten"
          icon={Wallet}
          description="Mindestauszahlung 20 €, manuell per Überweisung. Alle Prüfungen und Buchungen laufen ausschließlich serverseitig."
          actions={
            <ToneBadge tone="success">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" /> Serverseitig geschützt
            </ToneBadge>
          }
        >
          <div className="space-y-4">
            {data.email_verified === false && (
              <Callout tone="warning" title="E-Mail-Bestätigung erforderlich">
                Aus Sicherheitsgründen musst du deine E-Mail-Adresse zuerst bestätigen, bevor Bankdaten geändert oder
                Auszahlungen ausgelöst werden können.
              </Callout>
            )}

            {data.has_payout_iban && !editingBank ? (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-secondary/40 p-4">
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-success">
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    Bankverbindung serverseitig hinterlegt (im Browser maskiert)
                  </p>
                  <p className="text-sm font-semibold text-foreground">{data.payout_name}</p>
                  <p className="font-mono text-sm text-muted-foreground">{data.payout_iban_masked}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIban("");
                    setEditingBank(true);
                  }}
                  className="min-h-10 gap-1.5 rounded-xl"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  Bankdaten ändern
                </Button>
              </div>
            ) : (
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  void savePayout();
                }}
                className="space-y-4 rounded-xl border border-border bg-secondary/30 p-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Kontoinhaber" htmlFor="payout-holder-field">
                    <Input
                      id="payout-holder-field"
                      name="gx_holder_noval"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vor- und Nachname oder Firma"
                      className="h-11 bg-card"
                    />
                  </Field>
                  <Field label="Neue IBAN (wird serverseitig geprüft)" htmlFor="payout-iban-field">
                    <Input
                      id="payout-iban-field"
                      name="gx_iban_noval"
                      autoComplete="off"
                      spellCheck={false}
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                      placeholder="DE89 3704 0044 0532 0130 00"
                      className="h-11 bg-card font-mono"
                    />
                  </Field>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="submit" disabled={busy || data.email_verified === false} className="min-h-11 rounded-xl">
                    {busy ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                    Bankdaten sicher speichern
                  </Button>
                  {data.has_payout_iban && (
                    <Button type="button" variant="outline" onClick={() => setEditingBank(false)} className="min-h-11 rounded-xl">
                      Abbrechen
                    </Button>
                  )}
                </div>
              </form>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                onClick={requestPayout}
                disabled={busy || s.requestable_cents < 2000 || !data.has_payout_iban || data.has_open_payout || data.email_verified === false}
                className="press min-h-11 rounded-xl"
              >
                {busy ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" />
                ) : data.has_open_payout ? (
                  "Auszahlung bereits angefordert"
                ) : (
                  `Auszahlung anfordern (${eur(s.requestable_cents)})`
                )}
              </Button>
              {data.has_open_payout && (
                <span className="text-xs font-medium text-muted-foreground">
                  Deine offene Auszahlungsanfrage wird geprüft und manuell überwiesen.
                </span>
              )}
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Als Partner stellst du für die Auszahlung eine Rechnung oder Gutschrift; die {bestand ? "20" : "25"} %
              sind Netto-Umsatzbeteiligung.
              {(s.in_wartezeit_cents ?? 0) > 0 ? ` Noch in der 14-tägigen Widerrufsfrist: ${eur(s.in_wartezeit_cents ?? 0)}.` : ""}
            </p>
          </div>
        </ToolSection>

        {data.payouts.length > 0 && (
          <ToolSection title="Deine Auszahlungen" bodyClassName="p-0">
            <ul className="divide-y divide-border/70 text-sm">
              {data.payouts.map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <span className="text-muted-foreground">
                    Angefordert am {new Date(p.requested_at).toLocaleDateString("de-DE")}
                    {p.paid_at ? ` · bezahlt am ${new Date(p.paid_at).toLocaleDateString("de-DE")}` : ""}
                  </span>
                  <span className="flex items-center gap-2 font-semibold tabular">
                    <ToneBadge tone={p.status === "paid" ? "success" : "info"}>
                      {p.status === "paid" ? "Bezahlt" : "In Prüfung"}
                    </ToneBadge>
                    {eur(p.amount_cents)}
                  </span>
                </li>
              ))}
            </ul>
          </ToolSection>
        )}

        {data.commissions.length > 0 ? (
          <ToolSection title="Letzte Provisionen" bodyClassName="p-0">
            <ul className="divide-y divide-border/70 text-sm">
              {data.commissions.slice(0, 10).map((c, i) => (
                <li key={i} className="flex justify-between gap-4 px-5 py-3.5">
                  <span className="text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString("de-DE")} · {c.product} · {c.status}
                  </span>
                  <span className="font-semibold tabular">{eur(c.commission_cents)}</span>
                </li>
              ))}
            </ul>
          </ToolSection>
        ) : (
          <EmptyState
            icon={Percent}
            title="Noch keine Provisionen"
            description="Sobald jemand über deinen Empfehlungslink kauft, erscheint die Provision automatisch hier."
          />
        )}

        <AdminPayouts />
      </div>
    </CockpitShell>
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
  useEffect(() => {
    if (isAdmin) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);
  if (!isAdmin) return null;

  const act = async (action: string, payout_id: string) => {
    setBusy(payout_id);
    const { data, error } = await supabase.functions.invoke("manage-affiliate", { body: { action, payout_id } });
    if (error || (data as any)?.error) {
      toast({ title: "Fehler", description: (data as any)?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: action === "admin_mark_paid" ? "Als bezahlt markiert" : "Abgelehnt" });
      await load();
    }
    setBusy(null);
  };

  return (
    <Card className="rounded-2xl border-primary/25 shadow-card">
      <CardHeader>
        <CardTitle className="text-base">Admin: Offene Auszahlungsanfragen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {!rows ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">Keine offenen Auszahlungen.</p>
        ) : (
          rows.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 py-2.5 last:border-0">
              <div className="min-w-0 text-sm">
                <div className="font-semibold">
                  {eur(p.amount_cents)} · {p.affiliates?.payout_name || p.affiliates?.email}
                </div>
                <div className="truncate font-mono text-xs text-muted-foreground">
                  {p.affiliates?.payout_iban || "keine IBAN"} · {p.affiliates?.email}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" onClick={() => act("admin_mark_paid", p.id)} disabled={busy === p.id}>
                  <Check className="mr-1 h-4 w-4" /> Bezahlt
                </Button>
                <Button size="sm" variant="outline" onClick={() => act("admin_reject", p.id)} disabled={busy === p.id}>
                  <X className="mr-1 h-4 w-4" /> Ablehnen
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
