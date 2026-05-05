import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, MapPin, ExternalLink, AlertTriangle, CheckCircle2, Mail, Copy, Info } from "lucide-react";
import { toast } from "sonner";

/* ============ COMPANY NAME CHECK ============ */
export function CompanyNameCheck({ initial, onPick }: { initial?: string; onPick?: (name: string) => void }) {
  const [name, setName] = useState(initial ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const run = async () => {
    if (!name.trim()) return;
    setLoading(true); setResult(null);
    const { data, error } = await supabase.functions.invoke("check-company-name", { body: { name } });
    if (error) toast.error("Suche fehlgeschlagen");
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold"><Search className="h-4 w-4 text-accent-blue" /> Live-Check im Unternehmensregister</div>
      <div className="flex gap-2">
        <Input value={name} onChange={(e) => { setName(e.target.value); onPick?.(e.target.value); }} placeholder="z. B. Müller Digital GmbH" />
        <Button onClick={run} disabled={loading || !name.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Prüfen"}
        </Button>
      </div>
      {result && (
        <div className="space-y-2 text-sm">
          {result.searchFailed ? (
            <div className="flex items-start gap-2 rounded-lg bg-warning/10 text-warning-foreground border border-warning/30 p-3">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Live-Check nicht möglich – die Register-Quellen waren gerade nicht erreichbar. Bitte direkt im Handelsregister prüfen.</span>
            </div>
          ) : result.exactConflict ? (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 text-destructive p-3">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span><strong>Konflikt:</strong> Es existiert bereits ein eingetragenes Unternehmen mit identischem Namen. Andere Firmierung wählen.</span>
            </div>
          ) : result.similarConflict ? (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 text-destructive p-3">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span><strong>Sehr ähnlicher Name gefunden</strong> – das IHK/Registergericht lehnt das wahrscheinlich ab. Vor Notartermin verbindlich prüfen.</span>
            </div>
          ) : result.noHits ? (
            <div className="flex items-start gap-2 rounded-lg bg-success/10 text-success p-3">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Keine Treffer in den durchsuchten Registern – sieht frei aus, trotzdem offiziell verifizieren.</span>
            </div>
          ) : (
            <div className="flex items-start gap-2 rounded-lg bg-secondary text-foreground p-3">
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Treffer mit Namensbestandteilen gefunden – siehe Liste. Selbst beurteilen, ob Verwechslungsgefahr besteht.</span>
            </div>
          )}
          {result.hits?.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="text-xs font-semibold mb-1 text-muted-foreground">Treffer ({result.hits.length})</div>
              <ul className="space-y-1 text-xs">
                {result.hits.slice(0, 10).map((h: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={h.exact ? "text-destructive font-semibold" : ""}>•</span>
                    <span className="flex-1">
                      <span className={h.exact ? "font-semibold" : ""}>{h.name}</span>
                      {h.court && <span className="text-muted-foreground"> · {h.court}</span>}
                      {h.registerType && h.registerNumber && (
                        <span className="text-muted-foreground"> · {h.registerType} {h.registerNumber}</span>
                      )}
                    </span>
                    <span className="text-muted-foreground text-[10px]">[{h.source}]</span>
                    {typeof h.score === "number" && (
                      <span className="text-muted-foreground tabular-nums">{Math.round(h.score * 100)}%</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.sources && (
            <div className="text-[10px] text-muted-foreground space-y-0.5">
              <div>
                Quellen: NorthData ({result.sources.northdata})
                {result.sources.gleif && <> · GLEIF ({result.sources.gleif})</>}
                {result._cached && (
                  <span className="ml-2 text-accent-blue">· aus Cache ({Math.round((result._cacheAgeSec ?? 0) / 60)} min alt)</span>
                )}
              </div>
              {result.debug && (
                <div className="font-mono">
                  layout={result.debug.finalLayout} · http={result.debug.httpStatus} · size={result.debug.htmlSize} · jsonld={result.debug.jsonLdScripts} · hits[jsonld/cards/text]={result.debug.afterJsonLd}/{result.debug.afterHtmlCards}/{result.debug.afterVisibleText}
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-2 text-xs">
            {result.northdataUrl && (
              <a href={result.northdataUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline"><ExternalLink className="h-3 w-3" /> NorthData</a>
            )}
            <a href={result.handelsregisterUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline"><ExternalLink className="h-3 w-3" /> Handelsregister</a>
            <a href={result.unternehmensregisterUrl ?? result.handelsregisterUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline"><ExternalLink className="h-3 w-3" /> Unternehmensregister</a>
            <a href={result.dpmaUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline"><ExternalLink className="h-3 w-3" /> DPMA Marken-Check</a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ NOTAR FINDER + ANSCHREIBEN ============ */
export function NotarFinder({ companyName }: { companyName?: string }) {
  const [plz, setPlz] = useState("");
  const [loading, setLoading] = useState(false);
  const [notare, setNotare] = useState<any[]>([]);
  const [src, setSrc] = useState<string | null>(null);
  const [picked, setPicked] = useState<any | null>(null);

  const run = async () => {
    if (!/^\d{4,5}$/.test(plz)) { toast.error("Bitte gültige PLZ"); return; }
    setLoading(true); setNotare([]);
    const { data, error } = await supabase.functions.invoke("find-notare", { body: { plz } });
    if (error) toast.error("Suche fehlgeschlagen");
    setNotare(data?.notare ?? []);
    setSrc(data?.fallbackUrl ?? data?.sourceUrl ?? null);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4 text-accent-blue" /> Notare in deiner Nähe (notar.de)</div>
        <div className="flex gap-2">
          <Input value={plz} onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="PLZ z. B. 10115" />
          <Button onClick={run} disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Suchen"}</Button>
        </div>
        {notare.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-2">
            {notare.map((n, i) => (
              <button key={i} onClick={() => setPicked(n)}
                className={`text-left rounded-lg border p-3 text-sm transition-colors ${picked?.name === n.name ? "border-accent-blue bg-accent" : "border-border bg-card hover:border-accent-blue/40"}`}>
                <div className="font-semibold">{n.name}</div>
                {n.street && <div className="text-xs text-muted-foreground">{n.street}</div>}
                {(n.postalCode || n.city) && <div className="text-xs text-muted-foreground">{n.postalCode} {n.city}</div>}
                {n.phone && <div className="text-xs">📞 {n.phone}</div>}
                {n.email && <div className="text-xs">✉️ {n.email}</div>}
              </button>
            ))}
          </div>
        )}
        {src && notare.length === 0 && !loading && (
          <a href={src} target="_blank" rel="noreferrer" className="text-xs underline inline-flex items-center gap-1"><ExternalLink className="h-3 w-3" /> Direkt auf notar.de öffnen</a>
        )}
      </div>

      <NotarAnschreiben notar={picked} companyName={companyName} />
    </div>
  );
}

/* ============ ANSCHREIBEN GENERATOR (Template, no AI) ============ */
function NotarAnschreiben({ notar, companyName }: { notar: any | null; companyName?: string }) {
  const [form, setForm] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    company: companyName ?? "",
    rechtsform: "GmbH",
    stammkapital: "25000",
    gesellschafter: "",
    geschaeftsfuehrer: "",
    musterprotokoll: "ja",
  });
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const text = `Sehr geehrte Damen und Herren${notar?.name ? ` (${notar.name})` : ""},

ich plane die Gründung einer ${form.rechtsform} und möchte hierfür einen Notartermin zur Beurkundung des Gesellschaftsvertrags und Anmeldung beim Handelsregister vereinbaren.

Eckdaten:
• Firmierung: ${form.company || "(noch offen)"}
• Rechtsform: ${form.rechtsform}
• Stammkapital: ${form.stammkapital} €
• Gesellschafter: ${form.gesellschafter || "(siehe Anhang/Telefonat)"}
• Geschäftsführer: ${form.geschaeftsfuehrer || "(siehe oben)"}
• Verwendung Musterprotokoll: ${form.musterprotokoll}

Bitte teilen Sie mir mit:
1. Voraussichtliche Notarkosten (inkl. HR-Anmeldung)
2. Frühestmöglicher Termin
3. Welche Unterlagen Sie vorab benötigen (Ausweise, Entwurf, etc.)

Vielen Dank vorab.

Mit freundlichen Grüßen
${form.senderName}
${form.senderPhone}
${form.senderEmail}`;

  const copy = () => { navigator.clipboard.writeText(text); toast.success("In Zwischenablage kopiert"); };
  const mailto = notar?.email
    ? `mailto:${notar.email}?subject=${encodeURIComponent(`Notartermin ${form.rechtsform}-Gründung – ${form.company || "Anfrage"}`)}&body=${encodeURIComponent(text)}`
    : null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold"><Mail className="h-4 w-4 text-accent-blue" /> Notar-Anschreiben generieren</div>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          ["senderName", "Dein Name"],
          ["senderPhone", "Telefon"],
          ["senderEmail", "E-Mail"],
          ["company", "Firmierung"],
          ["rechtsform", "Rechtsform"],
          ["stammkapital", "Stammkapital (€)"],
          ["gesellschafter", "Gesellschafter (Namen)"],
          ["geschaeftsfuehrer", "Geschäftsführer"],
          ["musterprotokoll", "Musterprotokoll? (ja/nein)"],
        ].map(([k, l]) => (
          <div key={k}>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{l}</Label>
            <Input value={(form as any)[k]} onChange={(e) => update(k, e.target.value)} className="mt-1" />
          </div>
        ))}
      </div>
      <Textarea value={text} readOnly rows={12} className="font-mono text-xs" />
      <div className="flex flex-wrap gap-2">
        <Button onClick={copy} variant="outline"><Copy className="h-4 w-4 mr-1" /> Kopieren</Button>
        {mailto && <a href={mailto}><Button><Mail className="h-4 w-4 mr-1" /> An {notar.name} senden</Button></a>}
        {!mailto && <span className="text-xs text-muted-foreground self-center">Wähle oben einen Notar mit E-Mail für direkten Versand.</span>}
      </div>
    </div>
  );
}
