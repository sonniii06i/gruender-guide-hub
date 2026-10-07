import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fristenFuer, type Frist, type FristProfil } from "@/lib/steuerFristen";
import { baueIcs } from "@/lib/ics";

const SPEICHER = "gx-steuerkalender-v1";
const STANDARD: FristProfil = {
  rechtsform: "einzel", ust: "quartal", dauerfrist: false, ekVorauszahlung: false, gewstVorauszahlung: false,
  mitarbeiter: "keine", lohnsteuer: "monat", zm: "keine", steuerberater: false, gruendungsjahr: new Date().getFullYear(),
};
const lade = (): FristProfil => {
  try {
    const r = localStorage.getItem(SPEICHER);
    return r ? { ...STANDARD, ...JSON.parse(r) } : STANDARD;
  } catch {
    return STANDARD;
  }
};

const FARBE: Record<Frist["art"], string> = {
  ust: "bg-accent-blue/10 text-accent-blue",
  est: "bg-purple-500/10 text-purple-700",
  gewst: "bg-orange-500/10 text-orange-700",
  lohn: "bg-emerald-500/10 text-emerald-700",
  sv: "bg-emerald-500/10 text-emerald-700",
  zm: "bg-pink-500/10 text-pink-700",
  erklaerung: "bg-red-500/10 text-red-700",
  hgb: "bg-amber-500/10 text-amber-700",
};

const Auswahl = <T extends string>({ label, wert, setze, optionen }: { label: string; wert: T; setze: (v: T) => void; optionen: [T, string][] }) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <select value={wert} onChange={(e) => setze(e.target.value as T)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
      {optionen.map(([v, t]) => (
        <option key={v} value={v}>{t}</option>
      ))}
    </select>
  </div>
);

const Haken = ({ label, wert, setze, hilfe }: { label: string; wert: boolean; setze: (v: boolean) => void; hilfe?: string }) => (
  <label className="flex items-start gap-2 text-sm cursor-pointer">
    <input type="checkbox" className="mt-1" checked={wert} onChange={(e) => setze(e.target.checked)} />
    <span>
      {label}
      {hilfe && <span className="block text-[11px] text-muted-foreground">{hilfe}</span>}
    </span>
  </label>
);

const SteuerFristenKalender = () => {
  const heute = new Date().toISOString().slice(0, 10);
  const [p, setP] = useState<FristProfil>(lade);
  useEffect(() => {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(p));
    } catch {
      /* ohne Zwischenspeicher */
    }
  }, [p]);
  const set = <K extends keyof FristProfil>(k: K, v: FristProfil[K]) => setP((x) => ({ ...x, [k]: v }));
  const { fristen, hinweise } = useMemo(() => fristenFuer(p, heute, 12), [p, heute]);

  const exportieren = () => {
    const ics = baueIcs(
      fristen.map((f) => ({ uid: `steuer-${f.original}-${f.art}-${f.titel.length}`, titel: f.titel, start: f.datum, beschreibung: f.hinweis, erinnerungTage: 3 })),
      "Meine Steuerfristen (GründerX)",
    );
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "steuerfristen.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  let letzterMonat = "";

  return (
    <CockpitShell
      eyebrow="Steuer- & Fristenkalender · Stand Oktober 2026"
      title="Dein persönlicher Steuerkalender"
      subtitle="Alle Abgabe- und Zahlungstermine der nächsten 12 Monate für deine Situation – USt-Voranmeldung, Vorauszahlungen, Lohn, Zusammenfassende Meldung, Jahreserklärungen. Wochenenden und Feiertage sind schon eingerechnet. Ein Klick, und alles steht mit Erinnerung in deinem Kalender."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3 self-start lg:sticky lg:top-4">
          <h2 className="font-bold">Deine Situation</h2>
          <Auswahl label="Rechtsform" wert={p.rechtsform} setze={(v) => set("rechtsform", v)} optionen={[["einzel", "Einzelunternehmen (Gewerbe)"], ["freiberufler", "Freiberufler"], ["kapital", "GmbH / UG"]]} />
          <Auswahl label="Umsatzsteuer" wert={p.ust} setze={(v) => set("ust", v)} optionen={[["quartal", "Quartalsweise Voranmeldung"], ["monat", "Monatliche Voranmeldung"], ["jahr", "Keine Voranmeldung (Vorjahr ≤ 2.000 €)"], ["kleinunternehmer", "Kleinunternehmer (§ 19)"]]} />
          <div>
            <Label className="text-xs">Gründungsjahr</Label>
            <input type="number" value={p.gruendungsjahr} onChange={(e) => set("gruendungsjahr", Number(e.target.value) || STANDARD.gruendungsjahr)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
          </div>
          {p.ust !== "kleinunternehmer" && p.ust !== "jahr" && <Haken label="Dauerfristverlängerung" wert={p.dauerfrist} setze={(v) => set("dauerfrist", v)} hilfe="Ein Monat mehr Zeit; bei Monatszahlern Sondervorauszahlung 1/11" />}
          <Haken label={`${p.rechtsform === "kapital" ? "Körperschaftsteuer" : "Einkommensteuer"}-Vorauszahlungen festgesetzt`} wert={p.ekVorauszahlung} setze={(v) => set("ekVorauszahlung", v)} hilfe="Steht im Vorauszahlungsbescheid" />
          {p.rechtsform !== "freiberufler" && <Haken label="Gewerbesteuer-Vorauszahlungen festgesetzt" wert={p.gewstVorauszahlung} setze={(v) => set("gewstVorauszahlung", v)} />}
          <Auswahl label="Mitarbeiter" wert={p.mitarbeiter} setze={(v) => set("mitarbeiter", v)} optionen={[["keine", "keine"], ["minijob", "nur Minijobber"], ["sv", "sozialversicherungspflichtig"]]} />
          {p.mitarbeiter !== "keine" && <Auswahl label="Lohnsteuer-Anmeldung" wert={p.lohnsteuer} setze={(v) => set("lohnsteuer", v)} optionen={[["monat", "monatlich (> 5.000 € Vorjahr)"], ["quartal", "vierteljährlich (1.080–5.000 €)"], ["jahr", "jährlich (≤ 1.080 €)"]]} />}
          <Auswahl label="EU-Geschäft an Unternehmen (ZM)" wert={p.zm} setze={(v) => set("zm", v)} optionen={[["keine", "keine"], ["quartal", "vierteljährlich"], ["monat", "monatlich (> 50.000 € Lieferungen)"]]} />
          <Haken label="Mit Steuerberater" wert={p.steuerberater} setze={(v) => set("steuerberater", v)} hilfe="Verlängert die Frist der Jahreserklärungen" />
        </div>

        <div>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <h2 className="text-lg font-bold">{fristen.length} Termine in den nächsten 12 Monaten</h2>
            <Button onClick={exportieren} disabled={!fristen.length}>
              <CalendarPlus className="h-4 w-4 mr-2" /> Alle in den Kalender (mit Erinnerung)
            </Button>
          </div>
          {hinweise.length > 0 && (
            <ul className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mb-4 text-xs space-y-1 list-disc pl-6">
              {hinweise.map((h) => <li key={h}>{h}</li>)}
            </ul>
          )}
          <div className="space-y-1.5">
            {fristen.map((f, i) => {
              const monat = new Date(`${f.datum}T12:00:00`).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
              const kopf = monat !== letzterMonat;
              letzterMonat = monat;
              return (
                <div key={`${f.datum}-${f.titel}-${i}`}>
                  {kopf && <h3 className="text-xs uppercase tracking-wider text-muted-foreground pt-4 pb-1">{monat}</h3>}
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-3 py-2">
                    <div className="w-20 shrink-0 text-sm font-semibold tabular-nums">
                      {new Date(`${f.datum}T12:00:00`).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" })}
                    </div>
                    <div className="flex-1 min-w-0 text-sm">
                      {f.titel}
                      {(f.hinweis || f.datum !== f.original) && (
                        <div className="text-[11px] text-muted-foreground">
                          {f.datum !== f.original && `verschoben vom ${f.original.split("-").reverse().join(".")} (Wochenende/Feiertag). `}
                          {f.hinweis}
                        </div>
                      )}
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${FARBE[f.art]}`}>{f.art.toUpperCase()}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4">
            Eingerechnet sind bundesweite Feiertage (§ 108 Abs. 3 AO). Landesfeiertage wie Reformationstag oder Allerheiligen
            können eine Frist in deinem Bundesland um einen Tag verschieben. Die IHK-Beitragsfälligkeit steht im Bescheid
            deiner IHK. Mehr zur Voranmeldung:{" "}
            <Link to="/cockpit/ust-voranmeldung" className="text-accent-blue hover:underline">USt-Voranmeldung-Walkthrough</Link>.
          </p>
        </div>
      </div>
    </CockpitShell>
  );
};

export default SteuerFristenKalender;
