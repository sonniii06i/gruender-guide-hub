import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, CheckCircle2, AlertTriangle, ChevronRight, ExternalLink } from "lucide-react";

type Pfad = {
  slug: string;
  name: string;
  rechtsgrundlage: string;
  zielgruppe: string;
  voraussetzungen: string[];
  prozess: string[];
  dauer: string;
  kostenAmt: string;
  kostenAnwalt: string;
  niederlassungsAfter: string;
  fitScore: (input: Input) => number; // 0-100
  vorteile: string[];
  nachteile: string[];
  links: { label: string; url: string }[];
};

type Input = {
  zweck: "selbstaendig" | "freiberuflich" | "tech-fachkraft" | "gehoben-akademisch" | "ehepartner";
  hatHochschule: boolean;
  hatBerufserfahrungJahre: number;
  jobOffer: boolean;
  jobBruttoJahr: number;
  hatKapital: boolean;
  kapitalEur: number;
  hatBusinessPlan: boolean;
  istSelbstaendig: boolean;
  partnerInDe: boolean;
};

const PFADE: Pfad[] = [
  {
    slug: "21-1",
    name: "§21 Abs 1 AufenthG — Selbstständige Tätigkeit (Unternehmer)",
    rechtsgrundlage: "§21 Abs 1 AufenthG",
    zielgruppe: "Gründer mit Geschäftsidee + Kapital + wirtschaftlichem Interesse",
    voraussetzungen: [
      "Wirtschaftliches Interesse oder regionales Bedürfnis (Wertschöpfung, Innovation, Arbeitsplätze)",
      "Tragfähiger Business-Plan (Umsatz-Prognose, Marketing-Plan)",
      "Sicherung der Finanzierung — Eigenkapital + ggf. Bank-Zusage",
      "Altersvorsorge ab 45 Jahren (60k+ Euro liquide oder 1k+ Rente/Monat)",
      "Krankenversicherung",
      "Anhörung der zuständigen IHK / Handwerkskammer (positives Gutachten meist nötig)",
    ],
    prozess: [
      "Visum bei Botschaft im Heimatland (D-Visum 'zur Aufnahme einer selbstständigen Tätigkeit')",
      "Einreise nach DE",
      "Anmeldung Wohnsitz + Termin Ausländerbehörde",
      "Aufenthaltstitel-Antrag (max 3 Jahre, dann verlängerbar)",
      "Nach 3 Jahren: Niederlassungserlaubnis möglich, wenn Geschäft erfolgreich",
    ],
    dauer: "Visum 6-12 Wochen, dann Aufenthaltstitel 4-12 Wochen",
    kostenAmt: "75 € Visum + 100 € Aufenthaltstitel",
    kostenAnwalt: "1.500-5.000 € (Anwalt + Business-Plan + IHK-Vorbereitung)",
    niederlassungsAfter: "3 Jahre",
    fitScore: (i) =>
      (i.zweck === "selbstaendig" ? 50 : 0) +
      (i.hatBusinessPlan ? 20 : 0) +
      (i.hatKapital && i.kapitalEur >= 25000 ? 20 : 0) +
      (i.hatHochschule ? 10 : 0),
    vorteile: [
      "Volle unternehmerische Freiheit",
      "Path zu Niederlassung in 3 Jahren",
      "Familiennachzug möglich",
    ],
    nachteile: [
      "Hohe Anforderungen an Business-Plan + Finanzierung",
      "IHK-Gutachten kann ablehnen → Kein Visum",
      "Bei wirtschaftlichem Misserfolg Rückzug-Risiko",
    ],
    links: [
      { label: "BAMF — Selbstständig in DE", url: "https://www.bamf.de" },
      { label: "Make-it-in-Germany — Selbstständig", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/selbststaendig" },
    ],
  },

  {
    slug: "21-5",
    name: "§21 Abs 5 AufenthG — Freiberufliche Tätigkeit",
    rechtsgrundlage: "§21 Abs 5 AufenthG",
    zielgruppe: "Freiberufler — Designer, IT-Berater, Künstler, Ärzte, Steuerberater, Architekten",
    voraussetzungen: [
      "Freiberuflicher Beruf nach §18 EStG (Heilberufe, Lehrberufe, technische Berufe, Kreative)",
      "Berufs-Qualifikation (Diplom / Berufserlaubnis)",
      "Auftraggeber + Honorar-Plan in DE",
      "Krankenversicherung + Altersvorsorge ab 45",
    ],
    prozess: [
      "D-Visum bei Botschaft",
      "Einreise + Anmeldung",
      "Aufenthaltstitel bei Ausländerbehörde — max 3 Jahre",
    ],
    dauer: "Visum 6-12 Wochen",
    kostenAmt: "75 + 100 €",
    kostenAnwalt: "800-2.000 €",
    niederlassungsAfter: "3 Jahre",
    fitScore: (i) =>
      (i.zweck === "freiberuflich" ? 60 : 0) + (i.hatHochschule ? 30 : 10) + (i.istSelbstaendig ? 10 : 0),
    vorteile: [
      "Schlanker als §21 Abs 1 — kein IHK-Gutachten",
      "Kein BWL-Plan nötig, nur Honorar-Aussichten",
      "Path zu Niederlassung in 3 Jahren",
    ],
    nachteile: [
      "Nur für gelistete Freiberufler-Berufe",
      "Bei Tätigkeits-Wechsel Aufenthaltstitel neu prüfen",
    ],
    links: [
      { label: "BAMF — Freiberuflich", url: "https://www.bamf.de" },
    ],
  },

  {
    slug: "blue-card",
    name: "EU-Blue-Card §18g AufenthG",
    rechtsgrundlage: "§18g AufenthG (EU-Richtlinie 2021/1883)",
    zielgruppe: "Hochqualifizierte mit Hochschulabschluss + Job-Offer in DE",
    voraussetzungen: [
      "Hochschulabschluss (anerkannt in DE) oder mindestens 5 Jahre vergleichbare Berufserfahrung",
      "Job-Offer mit Brutto-Gehalt 48.300 €/Jahr (2026, Regel-Tatbestand) oder 43.759,80 €/Jahr (Mangelberufe wie IT, MINT, Mediziner, Pflege)",
      "Arbeitsvertrag mind. 6 Monate Laufzeit",
    ],
    prozess: [
      "Job-Offer bekommen",
      "D-Visum bei Botschaft (oft Visa-Free Einreise + Vor-Ort-Bearbeitung möglich)",
      "Aufenthaltstitel bei Ausländerbehörde",
    ],
    dauer: "1-3 Monate",
    kostenAmt: "100 €",
    kostenAnwalt: "0-1.500 €",
    niederlassungsAfter: "27 Monate (oder 21 Monate mit B1-Deutsch)",
    fitScore: (i) =>
      (i.zweck === "tech-fachkraft" || i.zweck === "gehoben-akademisch" ? 50 : 0) +
      (i.hatHochschule ? 30 : 0) +
      (i.jobOffer && i.jobBruttoJahr >= 43759 ? 20 : 0),
    vorteile: [
      "Schnellster Weg zur Niederlassung (21-27 Monate)",
      "Hohe Mobilität in EU",
      "Familien-Nachzug ohne Sprach-Nachweis",
    ],
    nachteile: [
      "Job-Offer Pflicht — nicht für Selbstständige geeignet",
      "Brutto-Schwelle muss gehalten werden, sonst Wechsel des Aufenthaltstitels nötig",
    ],
    links: [
      { label: "Make-it-in-Germany — Blue Card", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/eu-blaue-karte" },
    ],
  },

  {
    slug: "fachkraft-2024",
    name: "§18a/b AufenthG — Fachkräfte-Einwanderung 2024 (Modernisiertes Recht)",
    rechtsgrundlage: "§18a, §18b AufenthG (Reform 2023/24)",
    zielgruppe: "Qualifizierte Fachkräfte mit Berufsausbildung oder Hochschule",
    voraussetzungen: [
      "Anerkannter Berufs-/Hochschul-Abschluss",
      "Job-Offer (Gehalt mind. 47.000 €/Jahr 2026 ohne Anerkennung; geringer mit Anerkennung)",
      "Bei IT-Spezialisten ohne Abschluss: 3 Jahre Berufserfahrung + Job-Offer + Sprache nicht zwingend",
    ],
    prozess: [
      "Anerkennung der ausländischen Qualifikation (oder Chancenkarte als Alternative)",
      "Job-Offer",
      "D-Visum + Aufenthaltstitel",
    ],
    dauer: "2-6 Monate (Anerkennung-Dauer ist der Bottleneck)",
    kostenAmt: "100-200 € + Anerkennung 100-600 €",
    kostenAnwalt: "0-1.500 €",
    niederlassungsAfter: "33-48 Monate",
    fitScore: (i) =>
      (i.zweck === "tech-fachkraft" ? 40 : 0) + (i.jobOffer ? 30 : 0) + (i.hatBerufserfahrungJahre >= 3 ? 30 : 0),
    vorteile: [
      "Auch ohne Hochschule möglich (mit Berufserfahrung)",
      "Chancenkarte erlaubt 1-jährigen Aufenthalt zur Job-Suche",
      "Gehalts-Schwelle niedriger als Blue Card",
    ],
    nachteile: [
      "Anerkennungsverfahren oft langwierig",
      "Längere Niederlassungs-Dauer als Blue Card",
    ],
    links: [
      { label: "Make-it-in-Germany — Fachkraft", url: "https://www.make-it-in-germany.com" },
      { label: "Anerkennung in Deutschland", url: "https://www.anerkennung-in-deutschland.de" },
    ],
  },

  {
    slug: "chancenkarte",
    name: "§20a AufenthG — Chancenkarte (Punkte-System)",
    rechtsgrundlage: "§20a AufenthG (seit Juni 2024)",
    zielgruppe: "Job-Sucher mit Qualifikation, ohne konkretes Job-Offer",
    voraussetzungen: [
      "Mindestens 6 Punkte: Berufs-Anerkennung (4P), Sprache (max 4P), Berufserfahrung (max 3P), Alter <35 (2P)",
      "Lebensunterhalt-Sicherung (1.027 €/Monat oder Sperrkonto)",
      "Krankenversicherung",
    ],
    prozess: [
      "Punkte-Selbst-Check",
      "Visum bei Botschaft (1 Jahr zur Job-Suche)",
      "Bei Job-Funden: Wechsel auf Fachkraft-Aufenthaltstitel",
    ],
    dauer: "2-4 Monate Visum",
    kostenAmt: "75 €",
    kostenAnwalt: "0-800 €",
    niederlassungsAfter: "ab Wechsel zu Fachkraft + 33-48 Monate",
    fitScore: (i) =>
      (i.zweck === "tech-fachkraft" && !i.jobOffer ? 50 : 0) +
      (i.hatHochschule ? 25 : 0) +
      (i.hatBerufserfahrungJahre >= 2 ? 25 : 0),
    vorteile: ["Kein Job-Offer nötig", "Mit Punkte-System rechtsbündige Kriterien", "1 Jahr zur Job-Suche"],
    nachteile: [
      "Kein Aufenthaltstitel — nur Visum-Vorstufe",
      "Bei Job-Suche-Erfolglosigkeit muss man wieder ausreisen",
    ],
    links: [
      { label: "Chancenkarte-Selbsttest", url: "https://www.make-it-in-germany.com/de/visum/chancenkarte" },
    ],
  },

  {
    slug: "ehepartner",
    name: "§28 / §30 AufenthG — Familien-Nachzug",
    rechtsgrundlage: "§28 (zu Deutschem) / §30 (zu Ausländer mit AufenthT)",
    zielgruppe: "Ehepartner / eingetragener Lebenspartner / minderjährige Kinder",
    voraussetzungen: [
      "Ehe / Lebenspartnerschaft urkundlich nachgewiesen",
      "Bei §30: A1-Deutsch-Nachweis (Ausnahmen: Akademiker, Bürger bestimmter Länder)",
      "Lebensunterhalt-Sicherung (außer §28)",
      "Wohnraum",
    ],
    prozess: [
      "D-Visum 'Familiennachzug' bei Botschaft",
      "Einreise + Aufenthaltstitel",
    ],
    dauer: "3-6 Monate",
    kostenAmt: "100 €",
    kostenAnwalt: "0-1.000 €",
    niederlassungsAfter: "3 Jahre Ehe + Bleibe + Sprache + Lebensunterhalt",
    fitScore: (i) => (i.zweck === "ehepartner" ? 70 : 0) + (i.partnerInDe ? 30 : 0),
    vorteile: [
      "Direkte Arbeits-Erlaubnis (ohne Beschränkung)",
      "Path zu Niederlassung in 3 Jahren",
      "Bei §28 keine Lebensunterhalt-Pflicht",
    ],
    nachteile: ["A1-Sprach-Nachweis bei §30 nötig", "Bei Trennung Aufenthalts-Risiko"],
    links: [
      { label: "BAMF — Familiennachzug", url: "https://www.bamf.de" },
    ],
  },
];

const VisaHelper = () => {
  const [input, setInput] = useState<Input>({
    zweck: "selbstaendig",
    hatHochschule: true,
    hatBerufserfahrungJahre: 5,
    jobOffer: false,
    jobBruttoJahr: 0,
    hatKapital: true,
    kapitalEur: 50000,
    hatBusinessPlan: false,
    istSelbstaendig: false,
    partnerInDe: false,
  });

  const ranked = useMemo(() => {
    return [...PFADE]
      .map((p) => ({ ...p, score: p.fitScore(input) }))
      .sort((a, b) => b.score - a.score);
  }, [input]);

  const top = ranked[0];

  return (
    <CockpitShell
      eyebrow="Visa-Helper"
      title="Aufenthaltstitel-Pfad für non-EU-Gründer"
      subtitle="6 Pfade nach AufenthG (Selbstständig §21 Abs 1, Freiberuflich §21 Abs 5, EU-Blue-Card §18g, Fachkraft §18a/b, Chancenkarte §20a, Familien-Nachzug §28/30) mit Voraussetzungen, Prozess, Dauer, Kosten, Niederlassungs-Path."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <h3 className="font-semibold text-sm mb-3">Dein Profil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Hauptzweck</Label>
            <select
              value={input.zweck}
              onChange={(e) => setInput({ ...input, zweck: e.target.value as Input["zweck"] })}
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
            >
              <option value="selbstaendig">Eigenes Unternehmen gründen (GmbH, UG, Einzelunternehmer)</option>
              <option value="freiberuflich">Freiberufler (IT, Design, Beratung, Heilberuf)</option>
              <option value="tech-fachkraft">Angestellt in DE (mit Job-Offer / Job-Suche)</option>
              <option value="gehoben-akademisch">Hochqualifiziert (Akademiker, Forschung)</option>
              <option value="ehepartner">Familien-Nachzug zu Partner in DE</option>
            </select>
          </div>
          <div>
            <Label className="text-xs">Hochschulabschluss vorhanden?</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setInput({ ...input, hatHochschule: o.v })}
                  className={`h-9 rounded-md border text-xs transition-colors ${
                    input.hatHochschule === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs">Berufserfahrung (Jahre)</Label>
            <Input
              type="number"
              value={input.hatBerufserfahrungJahre || ""}
              onChange={(e) =>
                setInput({ ...input, hatBerufserfahrungJahre: Math.max(0, Number(e.target.value) || 0) })
              }
              className="h-9 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Job-Offer in DE?</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setInput({ ...input, jobOffer: o.v })}
                  className={`h-9 rounded-md border text-xs transition-colors ${
                    input.jobOffer === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          {input.jobOffer && (
            <div className="md:col-span-2">
              <Label className="text-xs">Brutto-Gehalt Job-Offer (€/Jahr)</Label>
              <Input
                type="number"
                value={input.jobBruttoJahr || ""}
                onChange={(e) => setInput({ ...input, jobBruttoJahr: Math.max(0, Number(e.target.value) || 0) })}
                className="h-9 text-sm mt-1"
              />
            </div>
          )}
          <div>
            <Label className="text-xs">Eigenkapital für Gründung (€)</Label>
            <Input
              type="number"
              value={input.kapitalEur || ""}
              onChange={(e) =>
                setInput({ ...input, kapitalEur: Math.max(0, Number(e.target.value) || 0), hatKapital: (Number(e.target.value) || 0) > 0 })
              }
              className="h-9 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Business-Plan vorhanden?</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setInput({ ...input, hatBusinessPlan: o.v })}
                  className={`h-9 rounded-md border text-xs transition-colors ${
                    input.hatBusinessPlan === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Empfehlung */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 mb-4">
        <div className="flex items-start gap-2">
          <Plane className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-emerald-700">Beste Passung ({top.score} von 100)</div>
            <h3 className="font-bold text-base">{top.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{top.zielgruppe}</p>
          </div>
        </div>
      </div>

      {/* Alle Pfade */}
      <div className="space-y-3 mb-6">
        {ranked.slice(0, 4).map((p, idx) => (
          <details key={p.slug} className="rounded-2xl border border-border bg-card overflow-hidden" open={idx === 0}>
            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 list-none">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold rounded-full bg-accent-blue/10 text-accent-blue px-2 py-0.5">
                    Score: {p.score}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{p.rechtsgrundlage}</span>
                </div>
                <h4 className="font-semibold text-sm">{p.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{p.zielgruppe}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </summary>

            <div className="px-4 pb-4 border-t border-border pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-semibold mb-1">Voraussetzungen</div>
                  <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                    {p.voraussetzungen.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-1">Prozess-Schritte</div>
                  <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground">
                    {p.prozess.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="font-semibold text-emerald-700 mb-1">Vorteile</div>
                  <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                    {p.vorteile.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-red-700 mb-1">Nachteile</div>
                  <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                    {p.nachteile.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-border text-xs">
                <Stat label="Dauer" value={p.dauer} />
                <Stat label="Behörden-Kosten" value={p.kostenAmt} />
                <Stat label="Anwalts-Kosten" value={p.kostenAnwalt} />
                <Stat label="Niederlassung nach" value={p.niederlassungsAfter} />
              </div>

              {p.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-accent-blue hover:underline font-semibold"
                    >
                      {l.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>

      {/* Hinweis */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Hinweis</div>
            <p className="text-muted-foreground">
              Stand 2026, keine Rechtsberatung. Schwellen + Prozesse durch Migrationsanwalt vor Visa-Antrag
              verifizieren. Manche Botschaften (Russland, Iran, China) haben deutlich längere Bearbeitungszeiten.
              Niederlassungs-Pfad hängt zusätzlich von Sprache + Lebensunterhalt + ggf. Einbürgerungstest ab.
            </p>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="font-semibold mt-0.5">{value}</div>
  </div>
);

export default VisaHelper;
