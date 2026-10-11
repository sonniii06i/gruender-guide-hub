import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus, SlidersHorizontal } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout, EmptyState, Field, ResultPanel, ToneBadge, ToolSection, selectCls, type Tone } from "@/components/cockpit/kit";
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

const TON: Record<Frist["art"], Tone> = {
  ust: "info",
  est: "accent",
  gewst: "warning",
  lohn: "success",
  sv: "success",
  zm: "neutral",
  erklaerung: "danger",
  hgb: "warning",
};

const KURZ: Record<Frist["art"], string> = {
  ust: "USt",
  est: "ESt/KSt",
  gewst: "GewSt",
  lohn: "Lohn",
  sv: "SV",
  zm: "ZM",
  erklaerung: "Erklärung",
  hgb: "HGB",
};

const Auswahl = <T extends string>({ label, wert, setze, optionen }: { label: string; wert: T; setze: (v: T) => void; optionen: [T, string][] }) => {
  const id = `sfk-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <Field label={label} htmlFor={id}>
      <select id={id} value={wert} onChange={(e) => setze(e.target.value as T)} className={selectCls}>
        {optionen.map(([v, t]) => (
          <option key={v} value={v}>{t}</option>
        ))}
      </select>
    </Field>
  );
};

const Haken = ({ label, wert, setze, hilfe }: { label: string; wert: boolean; setze: (v: boolean) => void; hilfe?: string }) => (
  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm transition-colors hover:border-foreground/20">
    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={wert} onChange={(e) => setze(e.target.checked)} />
    <span>
      <span className="font-medium">{label}</span>
      {hilfe && <span className="mt-0.5 block text-xs text-muted-foreground">{hilfe}</span>}
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
      subtitle="Alle Abgabe- und Zahlungstermine der nächsten 12 Monate für deine Situation: USt-Voranmeldung, Vorauszahlungen, Lohn, Zusammenfassende Meldung, Jahreserklärungen. Wochenenden und Feiertage sind eingerechnet. Ein Klick, und alles steht mit Erinnerung in deinem Kalender."
    >
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8">
        <ToolSection title="Deine Situation" description="Wird nur in diesem Browser gespeichert." icon={SlidersHorizontal} className="lg:sticky lg:top-20" bodyClassName="space-y-4">
          <Auswahl label="Rechtsform" wert={p.rechtsform} setze={(v) => set("rechtsform", v)} optionen={[["einzel", "Einzelunternehmen (Gewerbe)"], ["freiberufler", "Freiberufler"], ["kapital", "GmbH / UG"]]} />
          <Auswahl label="Umsatzsteuer" wert={p.ust} setze={(v) => set("ust", v)} optionen={[["quartal", "Quartalsweise Voranmeldung"], ["monat", "Monatliche Voranmeldung"], ["jahr", "Keine Voranmeldung (Vorjahr ≤ 2.000 €)"], ["kleinunternehmer", "Kleinunternehmer (§ 19)"]]} />
          <Field label="Gründungsjahr" htmlFor="sfk-gruendungsjahr">
            <Input id="sfk-gruendungsjahr" type="number" inputMode="numeric" value={p.gruendungsjahr} onChange={(e) => set("gruendungsjahr", Number(e.target.value) || STANDARD.gruendungsjahr)} />
          </Field>
          <div className="space-y-2">
            {p.ust !== "kleinunternehmer" && p.ust !== "jahr" && <Haken label="Dauerfristverlängerung" wert={p.dauerfrist} setze={(v) => set("dauerfrist", v)} hilfe="Ein Monat mehr Zeit; bei Monatszahlern Sondervorauszahlung 1/11" />}
            <Haken label={`${p.rechtsform === "kapital" ? "Körperschaftsteuer" : "Einkommensteuer"}-Vorauszahlungen festgesetzt`} wert={p.ekVorauszahlung} setze={(v) => set("ekVorauszahlung", v)} hilfe="Steht im Vorauszahlungsbescheid" />
            {p.rechtsform !== "freiberufler" && <Haken label="Gewerbesteuer-Vorauszahlungen festgesetzt" wert={p.gewstVorauszahlung} setze={(v) => set("gewstVorauszahlung", v)} />}
          </div>
          <Auswahl label="Mitarbeiter" wert={p.mitarbeiter} setze={(v) => set("mitarbeiter", v)} optionen={[["keine", "keine"], ["minijob", "nur Minijobber"], ["sv", "sozialversicherungspflichtig"]]} />
          {p.mitarbeiter !== "keine" && <Auswahl label="Lohnsteuer-Anmeldung" wert={p.lohnsteuer} setze={(v) => set("lohnsteuer", v)} optionen={[["monat", "monatlich (> 5.000 € Vorjahr)"], ["quartal", "vierteljährlich (1.080 bis 5.000 €)"], ["jahr", "jährlich (≤ 1.080 €)"]]} />}
          <Auswahl label="EU-Geschäft an Unternehmen (ZM)" wert={p.zm} setze={(v) => set("zm", v)} optionen={[["keine", "keine"], ["quartal", "vierteljährlich"], ["monat", "monatlich (> 50.000 € Lieferungen)"]]} />
          <Haken label="Mit Steuerberater" wert={p.steuerberater} setze={(v) => set("steuerberater", v)} hilfe="Verlängert die Frist der Jahreserklärungen" />
        </ToolSection>

        <div className="min-w-0 space-y-5">
          <ResultPanel
            variant="ink"
            kicker="Deine nächsten 12 Monate"
            title={`${fristen.length} Termine in den nächsten 12 Monaten`}
            actions={
              <Button onClick={exportieren} disabled={!fristen.length} className="bg-card text-primary shadow-none hover:bg-card/90">
                <CalendarPlus className="h-4 w-4" /> In den Kalender (mit Erinnerung)
              </Button>
            }
          >
            {fristen[0] && (
              <p className="text-sm">
                Nächster Termin:{" "}
                <span className="font-semibold text-primary-foreground">
                  {new Date(`${fristen[0].datum}T12:00:00`).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
                </span>
                , {fristen[0].titel}
              </p>
            )}
          </ResultPanel>

          {hinweise.length > 0 && (
            <Callout tone="warning" title="Hinweise zu deiner Situation">
              <ul className="list-disc space-y-1 pl-4">
                {hinweise.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </Callout>
          )}

          {fristen.length === 0 ? (
            <EmptyState icon={CalendarPlus} title="Keine Termine in den nächsten 12 Monaten" description="Für deine Angaben stehen keine Abgabe- oder Zahlungstermine an. Ändere links deine Situation, falls etwas nicht passt." />
          ) : (
            <ol className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              {fristen.map((f, i) => {
                const monat = new Date(`${f.datum}T12:00:00`).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
                const kopf = monat !== letzterMonat;
                letzterMonat = monat;
                return (
                  <li key={`${f.datum}-${f.titel}-${i}`}>
                    {kopf && <h3 className="border-b border-border/70 bg-secondary/60 px-4 py-2 text-sm font-semibold text-foreground">{monat}</h3>}
                    <div className="flex items-start gap-3 border-b border-border/60 px-4 py-3 last:border-b-0">
                      <div className="w-16 shrink-0 text-sm font-semibold tabular sm:w-20">
                        {new Date(`${f.datum}T12:00:00`).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" })}
                      </div>
                      <div className="min-w-0 flex-1 text-sm">
                        {f.titel}
                        {(f.hinweis || f.datum !== f.original) && (
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {f.datum !== f.original && `verschoben vom ${f.original.split("-").reverse().join(".")} (Wochenende/Feiertag). `}
                            {f.hinweis}
                          </div>
                        )}
                      </div>
                      <ToneBadge tone={TON[f.art]} className="shrink-0">{KURZ[f.art]}</ToneBadge>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">
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
