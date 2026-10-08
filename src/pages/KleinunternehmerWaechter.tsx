import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KU_LAUFEND, KU_VORJAHR, pruefeKleinunternehmer, type KuEingabe } from "@/lib/kleinunternehmer";

const SPEICHER = "gx-ku-waechter-v1";
const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const STANDARD: KuEingabe = { gruendungsjahr: false, vorjahr: 0, monate: Array(12).fill(0), bisMonat: new Date().getMonth() + 1 };
const lade = (): KuEingabe => {
  try {
    const r = localStorage.getItem(SPEICHER);
    return r ? { ...STANDARD, ...JSON.parse(r), bisMonat: new Date().getMonth() + 1 } : STANDARD;
  } catch {
    return STANDARD;
  }
};
const eur = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";

const FARBE = {
  ku: "border-emerald-500/40 bg-emerald-500/5 text-emerald-800",
  warnung: "border-amber-500/40 bg-amber-500/5 text-amber-800",
  ueberschritten: "border-red-500/40 bg-red-500/5 text-red-800",
  "kein-ku": "border-red-500/40 bg-red-500/5 text-red-800",
};
const TITEL = { ku: "Kleinunternehmer – alles im grünen Bereich", warnung: "Achtung: Grenze rückt näher", ueberschritten: "Grenze überschritten", "kein-ku": "Dieses Jahr kein Kleinunternehmer" };

const KleinunternehmerWaechter = () => {
  const [e, setE] = useState<KuEingabe>(lade);
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(e));
    } catch {
      /* ohne Speicher */
    }
  }, [e]);
  const r = useMemo(() => pruefeKleinunternehmer(e), [e]);
  let kum = 0;

  return (
    <CockpitShell
      eyebrow="Kleinunternehmerregelung § 19 UStG · seit 2025"
      title="Kleinunternehmer-Wächter"
      subtitle="Trag deine monatlichen Einnahmen ein – der Wächter zeigt, wie nah du an der 25.000- bzw. 100.000-€-Grenze bist, wann du sie bei gleichem Tempo reißt und ob du nächstes Jahr noch Kleinunternehmer bist."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-start gap-2 text-sm pt-5">
              <input type="checkbox" className="mt-1" checked={e.gruendungsjahr} onChange={(ev) => setE((x) => ({ ...x, gruendungsjahr: ev.target.checked }))} />
              <span>Ich habe dieses Jahr gegründet <span className="block text-[11px] text-muted-foreground">Dann gilt 25.000 € statt 100.000 €.</span></span>
            </label>
            {!e.gruendungsjahr && (
              <div>
                <Label className="text-xs">Umsatz im Vorjahr (netto)</Label>
                <Input type="number" value={e.vorjahr} onChange={(ev) => setE((x) => ({ ...x, vorjahr: Number(ev.target.value) || 0 }))} className="mt-1" />
              </div>
            )}
          </div>
          <div>
            <Label className="text-xs">Eingenommene Umsätze je Monat (netto, ohne Verkauf von Anlagevermögen)</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
              {MONATE.map((m, i) => (
                <div key={m} className={i >= e.bisMonat ? "opacity-50" : ""}>
                  <div className="text-[11px] text-muted-foreground">{m}</div>
                  <Input type="number" value={e.monate[i] || ""} placeholder="0" onChange={(ev) => setE((x) => ({ ...x, monate: x.monate.map((v, j) => (j === i ? Number(ev.target.value) || 0 : v)) }))} className="h-9" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Verlauf (kumuliert)</div>
            <div className="flex items-end gap-1 h-32">
              {e.monate.map((v, i) => {
                kum += i < e.bisMonat ? v : 0;
                const h = Math.min(100, (kum / r.grenze) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full" title={`${MONATE[i]}: ${eur(kum)}`}>
                    <div className={`rounded-t ${kum > r.grenze ? "bg-red-500" : kum > r.grenze * 0.8 ? "bg-amber-500" : "bg-accent-blue"} ${i >= e.bisMonat ? "opacity-20" : ""}`} style={{ height: `${Math.max(2, h)}%` }} />
                    <div className="text-[9px] text-center text-muted-foreground mt-0.5">{MONATE[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className={`rounded-2xl border p-5 ${FARBE[r.status]}`}>
            <div className="font-bold">{TITEL[r.status]}</div>
            <div className="mt-3 h-3 rounded-full bg-background/70 overflow-hidden">
              <div className={`h-full ${r.status === "ku" ? "bg-emerald-500" : r.status === "warnung" ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${Math.min(100, r.anteil * 100)}%` }} />
            </div>
            <div className="text-xs mt-1 text-foreground">{eur(r.bisher)} von {eur(r.grenze)} · Prognose Jahr {eur(r.prognoseJahr)}</div>
            <ul className="mt-3 space-y-1.5 text-xs text-foreground list-disc pl-4">
              {r.texte.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed space-y-1.5">
            <div className="font-bold text-sm">Regeln seit 2025</div>
            <p>Kleinunternehmer bist du, wenn der Umsatz im Vorjahr höchstens {eur(KU_VORJAHR)} betrug und im laufenden Jahr {eur(KU_LAUFEND)} nicht übersteigt – im Gründungsjahr gilt {eur(KU_VORJAHR)}.</p>
            <p>Schon der Umsatz, mit dem du die Grenze überschreitest, ist voll steuerpflichtig – nicht erst das nächste Jahr.</p>
            <p>Auf jede Rechnung gehört der Hinweis auf die Steuerbefreiung nach § 19 UStG. Rechnungen schreibst du im <Link to="/cockpit/rechnungs-generator" className="text-accent-blue hover:underline">Rechnungs-Generator</Link>.</p>
            <p className="text-muted-foreground">Gespeichert nur in diesem Browser. Grundlage: § 19 UStG, BMF-Schreiben vom 18.03.2025.</p>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default KleinunternehmerWaechter;
