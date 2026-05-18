import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plane,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Globe,
  MapPin,
  ShieldAlert,
  Info,
  TrendingDown,
} from "lucide-react";
import { VISA_PROGRAMS, CATEGORY_META, AVOID_LIST, STEUER_BLOCK, type VisaCategory } from "@/data/visaPrograms";

// ============================================================
// VISA-HELPER · Stand Mai 2026 (Total-Refactor)
// ============================================================
// Tab 1: 🇩🇪 NACH Deutschland (6 Aufenthaltstitel-Pfade für non-EU Founder)
// Tab 2: 🌍 AUS Deutschland raus (27 Visa-Programme weltweit)
// ============================================================

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
  fitScore: (input: ProfileInput) => number;
  vorteile: string[];
  nachteile: string[];
  links: { label: string; url: string }[];
};

type ProfileInput = {
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

// ============================================================
// PFADE: 6 deutsche Aufenthaltstitel für non-EU-Gründer
// (Ausland → Deutschland)
// ============================================================
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
      "Krankenversicherung",
      "Bei >45 Jahre: angemessene Altersvorsorge nachweisen",
    ],
    prozess: [
      "Business-Plan + Finanzierungsplan einreichen",
      "Stellungnahme IHK / HWK / Berufsvertretung",
      "Anhörung Ausländerbehörde",
      "Bei Bewilligung: Aufenthaltstitel max. 3 Jahre",
    ],
    dauer: "Bearbeitung 2-6 Monate · Aufenthalt 3 Jahre, verlängerbar",
    kostenAmt: "100 € Antrag + 100 € Verlängerung",
    kostenAnwalt: "2-5k € optional (Business-Plan Review)",
    niederlassungsAfter: "Niederlassungserlaubnis nach 3 Jahren bei erfolgreicher Tätigkeit",
    fitScore: (i) =>
      (i.zweck === "selbstaendig" ? 50 : 0) +
      (i.hatBusinessPlan ? 25 : 0) +
      (i.hatKapital && i.kapitalEur >= 25000 ? 20 : 0) +
      (i.hatHochschule ? 5 : 0),
    vorteile: ["Eigenes Unternehmen mit eigener Vision", "Familien-Nachzug möglich", "Pfad zu Niederlassung in 3 Jahren"],
    nachteile: ["Hohe Anforderungen an Business-Plan", "Stellungnahmen-Verfahren kann 6 Monate dauern"],
    links: [
      { label: "BAMF — Selbstständige", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrationsplaene/Selbststaendig/selbststaendig-node.html" },
    ],
  },
  {
    slug: "21-5",
    name: "§21 Abs 5 AufenthG — Freiberufliche Tätigkeit",
    rechtsgrundlage: "§21 Abs 5 AufenthG",
    zielgruppe: "Freiberufler (IT, Design, Beratung, Heilberufe, Künstler)",
    voraussetzungen: [
      "Freier Beruf gemäß §18 EStG (Catalog: IT, Design, Beratung, Heilberufe, Künstler, Wissenschaftler etc.)",
      "Berufsspezifische Berechtigung (z.B. Approbation bei Heilberufen, IT-Skills)",
      "Auftragslage + Einkommens-Prognose (mind. 2 Auftraggeber empfohlen)",
      "Krankenversicherung",
    ],
    prozess: [
      "Antrag bei Ausländerbehörde mit Berufs-Nachweis + Auftragsliste",
      "Stellungnahme zuständige Berufsvertretung (Kammer, Berufsverband)",
      "Aufenthaltstitel typisch 3 Jahre",
    ],
    dauer: "2-4 Monate · Aufenthalt 3 Jahre",
    kostenAmt: "100 € Antrag",
    kostenAnwalt: "1-3k € optional",
    niederlassungsAfter: "Niederlassungserlaubnis nach 3 Jahren",
    fitScore: (i) =>
      (i.zweck === "freiberuflich" ? 50 : 0) +
      (i.hatHochschule ? 20 : 0) +
      (i.hatBerufserfahrungJahre >= 3 ? 20 : 0) +
      (i.istSelbstaendig ? 10 : 0),
    vorteile: ["Niedrige Kapital-Hürde", "Schneller Niederlassungs-Pfad", "Familien-Nachzug"],
    nachteile: ["Nur für anerkannte freie Berufe", "Auftragsbestätigungen nötig"],
    links: [
      { label: "BAMF — Freiberufler", url: "https://www.bamf.de" },
    ],
  },
  {
    slug: "18g",
    name: "EU-Blue-Card §18g AufenthG",
    rechtsgrundlage: "§18g AufenthG (umgesetzt aus EU-RL 2021/1883)",
    zielgruppe: "Hochqualifizierte mit Job-Offer + Brutto-Gehalt ≥ Schwelle",
    voraussetzungen: [
      "Hochschulabschluss (mind. 3-jährig) ODER mind. 5 Jahre vergleichbare Berufserfahrung",
      "Job-Offer in DE mit Brutto-Gehalt ab €45.300/Jahr (Standard 2026) oder €41.041 (Mangelberufe)",
      "Anerkennung des Abschlusses (via Anabin / ZAB)",
    ],
    prozess: [
      "Job-Offer + Anerkannter Abschluss",
      "Antrag bei deutscher Auslandsvertretung ODER (bei legalem Aufenthalt) direkt bei Ausländerbehörde",
      "Approval typisch 4-12 Wochen",
    ],
    dauer: "1-3 Monate · Initial 4 Jahre, verlängerbar",
    kostenAmt: "100-110 €",
    kostenAnwalt: "0-2k € optional",
    niederlassungsAfter: "Niederlassung nach 33 Monaten (21 Mo bei B1-Deutsch)",
    fitScore: (i) =>
      (i.zweck === "tech-fachkraft" || i.zweck === "gehoben-akademisch" ? 40 : 0) +
      (i.hatHochschule ? 25 : 0) +
      (i.jobOffer && i.jobBruttoJahr >= 45300 ? 25 : 0) +
      (i.hatBerufserfahrungJahre >= 5 ? 10 : 0),
    vorteile: ["Schnellster Niederlassungs-Pfad", "Familien-Nachzug ohne Sprachnachweis", "EU-weite Mobilität nach 18 Monaten"],
    nachteile: ["Job-Offer + Gehalts-Schwelle Pflicht", "Anerkennung Abschluss dauert"],
    links: [
      { label: "Make-it-in-Germany — EU Blue Card", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/eu-blue-card" },
    ],
  },
  {
    slug: "18ab",
    name: "§18a/b AufenthG — Fachkräfte-Einwanderung 2024",
    rechtsgrundlage: "§18a/b AufenthG (Modernisiertes Recht 2024)",
    zielgruppe: "Qualifizierte Fachkräfte mit anerkannter Ausbildung + Job-Offer",
    voraussetzungen: [
      "§18a: berufliche Ausbildung (mind. 2 Jahre) — bisher 'kein Akademiker'-Pfad",
      "§18b: akademischer Abschluss (Bachelor/Master/PhD)",
      "Anerkennung der Qualifikation ODER Anerkennungs-Partnerschaft (neu seit 2024)",
      "Job-Offer in DE (kein konkretes Mindestgehalt seit Reform 2024!)",
    ],
    prozess: [
      "Anerkennung Abschluss + Job-Offer",
      "Antrag bei Auslandsvertretung",
      "Approval 4-12 Wochen",
    ],
    dauer: "1-3 Monate · Initial 4 Jahre",
    kostenAmt: "100 €",
    kostenAnwalt: "0-2k €",
    niederlassungsAfter: "Niederlassung nach 4 Jahren (Standard) oder 33 Monaten (gehobene Voraussetzungen)",
    fitScore: (i) =>
      (i.zweck === "tech-fachkraft" ? 40 : 0) +
      (i.jobOffer ? 30 : 0) +
      (i.hatHochschule ? 15 : 0) +
      (i.hatBerufserfahrungJahre >= 2 ? 15 : 0),
    vorteile: ["KEIN Gehalts-Mindest mehr (Reform 2024)", "Berufliche UND akademische Ausbildung qualifiziert", "Anerkennungs-Partnerschaft möglich (Anerkennung in DE)"],
    nachteile: ["Job-Offer + Anerkennung nötig", "Niederlassung etwas später als Blue Card"],
    links: [
      { label: "Make-it-in-Germany — Fachkraft", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/fachkraft" },
    ],
  },
  {
    slug: "20a",
    name: "§20a AufenthG — Chancenkarte (Punkte-System)",
    rechtsgrundlage: "§20a AufenthG (seit 1.6.2024)",
    zielgruppe: "Fachkräfte mit Anerkennung-Aussicht ohne Job-Offer (Jobsuche 1 Jahr in DE)",
    voraussetzungen: [
      "Berufliche oder akademische Qualifikation (mind. 2 Jahre)",
      "Mind. 6 Punkte aus Punkte-System (Anerkennung, Sprache, Erfahrung, Alter, Land-Bezug, Bedarfsberufe)",
      "Lebensunterhalt für 1 Jahr Jobsuche nachweisen (~ €1.027/Monat)",
      "A1-Deutsch ODER B2-Englisch",
    ],
    prozess: [
      "Punkte-Check (Selbst-Test auf BAMF-Website)",
      "Antrag bei deutscher Auslandsvertretung mit Qualifikations-Nachweis + Punkte-Begründung",
      "Visum für 1 Jahr — in DE Jobsuche + Probebeschäftigung möglich",
    ],
    dauer: "2-4 Monate · 1 Jahr Aufenthalt zur Jobsuche, dann auf §18a/b umstellen",
    kostenAmt: "75 €",
    kostenAnwalt: "0-1k €",
    niederlassungsAfter: "Erst nach Übergang auf reguläres Aufenthaltsrecht (§18 a/b)",
    fitScore: (i) =>
      (i.zweck === "tech-fachkraft" && !i.jobOffer ? 50 : 0) +
      (i.hatHochschule ? 20 : 0) +
      (i.hatBerufserfahrungJahre >= 3 ? 20 : 0) +
      10,
    vorteile: ["Jobsuche IN DE möglich", "Punkte-System modern (Land-Bezug, Bedarfsberufe)", "Sprung zu §18a/b nach Job-Offer"],
    nachteile: ["Nur Brücke, keine Niederlassung direkt", "1 Jahr ohne Job-Garantie"],
    links: [
      { label: "BAMF — Chancenkarte", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrationsplaene/Chancenkarte/chancenkarte-node.html" },
    ],
  },
  {
    slug: "28-30",
    name: "§28 / §30 AufenthG — Familien-Nachzug",
    rechtsgrundlage: "§28 (zu DE-Staatsangehöriger), §30 (zu Ausländer)",
    zielgruppe: "Ehepartner / eingetragener Partner einer Person mit deutschem oder dauerhaftem Aufenthalt",
    voraussetzungen: [
      "§28: Ehegatte/Lebenspartner eines Deutschen",
      "§30: Ehegatte/Lebenspartner eines Ausländers mit Aufenthaltsrecht in DE",
      "§30: A1-Sprach-Nachweis Pflicht (außer Ausnahmen)",
      "Sicherung des Lebensunterhalts ohne Sozialhilfe",
    ],
    prozess: [
      "Heirats-/Partnerschafts-Urkunde + Partner-Nachweis in DE",
      "Antrag bei deutscher Auslandsvertretung",
      "Approval 4-12 Wochen",
    ],
    dauer: "1-3 Monate · 3 Jahre, verlängerbar",
    kostenAmt: "100 €",
    kostenAnwalt: "0-2k €",
    niederlassungsAfter: "Niederlassung nach 3 Jahren bei §28 / 5 Jahren bei §30",
    fitScore: (i) =>
      (i.zweck === "ehepartner" && i.partnerInDe ? 80 : 0),
    vorteile: ["Direkter Pfad bei Partner in DE", "Arbeit/Selbstständigkeit erlaubt", "Niederlassung nach 3 Jahren"],
    nachteile: ["A1-Sprach-Nachweis bei §30 nötig", "Bei Trennung Aufenthalts-Risiko"],
    links: [
      { label: "BAMF — Familiennachzug", url: "https://www.bamf.de" },
    ],
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
const VisaHelper = () => {
  return (
    <CockpitShell
      eyebrow="Visa-Helper · Stand Mai 2026"
      title="Visa-Pfade in beide Richtungen — international"
      subtitle="🇩🇪 NACH Deutschland: 6 Aufenthaltstitel-Pfade (§21/§18g/§18a/b/§20a/§28/§30) · 🌍 AUS Deutschland raus: 27 Visa weltweit (USA O-1/EB-2/E-2/L-1, UK Innovator, Portugal D8/D2/Golden, Spanien DNV+Beckham, UAE Golden, Singapore Tech.Pass, Thailand LTR, Georgien 1% etc.) + §6 AStG Wegzugsbesteuerung-Block + AVOID-Liste verifiziert."
    >
      <Tabs defaultValue="raus" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="rein">🇩🇪 Nach Deutschland (6 Pfade)</TabsTrigger>
          <TabsTrigger value="raus">🌍 Aus Deutschland raus (27 Visa)</TabsTrigger>
        </TabsList>

        <TabsContent value="rein"><NachDeutschland /></TabsContent>
        <TabsContent value="raus"><AusDeutschland /></TabsContent>
      </Tabs>
    </CockpitShell>
  );
};

// ============================================================
// TAB 1: NACH DEUTSCHLAND (bestehend)
// ============================================================
const NachDeutschland = () => {
  const [input, setInput] = useState<ProfileInput>({
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

  const ranked = useMemo(
    () => [...PFADE].map((p) => ({ ...p, score: p.fitScore(input) })).sort((a, b) => b.score - a.score),
    [input],
  );
  const top = ranked[0];

  return (
    <div className="space-y-4">
      {/* Profile-Input */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-semibold text-sm mb-3">Dein Profil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Hauptzweck</Label>
            <select
              value={input.zweck}
              onChange={(e) => setInput({ ...input, zweck: e.target.value as ProfileInput["zweck"] })}
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
            <Label className="text-xs">Hochschulabschluss?</Label>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setInput({ ...input, hatHochschule: o.v })}
                  className={`h-9 rounded-md border text-xs ${
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
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Job-Offer DE Brutto/Jahr (€)</Label>
            <Input
              type="number"
              value={input.jobBruttoJahr || ""}
              onChange={(e) =>
                setInput({
                  ...input,
                  jobBruttoJahr: Math.max(0, Number(e.target.value) || 0),
                  jobOffer: Number(e.target.value) > 0,
                })
              }
              placeholder="0 = kein Job-Offer"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Kapital (€) für Gründung</Label>
            <Input
              type="number"
              value={input.kapitalEur || ""}
              onChange={(e) =>
                setInput({
                  ...input,
                  kapitalEur: Math.max(0, Number(e.target.value) || 0),
                  hatKapital: Number(e.target.value) > 0,
                })
              }
              className="mt-1"
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
                  className={`h-9 rounded-md border text-xs ${
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

      {/* Top-Match */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5">
        <div className="flex items-center gap-3 mb-2">
          <Plane className="h-5 w-5 text-emerald-700" />
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Top-Match für dein Profil</div>
            <div className="text-xl font-bold">{top.name}</div>
          </div>
          <div className="ml-auto rounded-full bg-emerald-500/15 text-emerald-700 px-3 py-1 text-xs font-bold">
            Score {top.score}/100
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{top.zielgruppe}</p>
      </div>

      {/* Alle Pfade */}
      <div className="space-y-3">
        {ranked.map((p) => (
          <details key={p.slug} className="rounded-2xl border border-border bg-card p-4" open={p.slug === top.slug}>
            <summary className="cursor-pointer flex items-start justify-between gap-3">
              <div>
                <div className="font-bold text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.zielgruppe}</div>
              </div>
              <Badge variant="outline" className="shrink-0 font-mono">Score {p.score}</Badge>
            </summary>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">Voraussetzungen</div>
                <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                  {p.voraussetzungen.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              </div>
              <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                <div className="text-[10px] uppercase tracking-wider text-blue-700 font-semibold mb-1">Prozess</div>
                <ol className="space-y-1 text-muted-foreground list-decimal pl-4">
                  {p.prozess.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <Stat label="Dauer" value={p.dauer} />
              <Stat label="Behörden-Kosten" value={p.kostenAmt} />
              <Stat label="Anwalt (optional)" value={p.kostenAnwalt} />
              <Stat label="Niederlassung" value={p.niederlassungsAfter} />
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">Vorteile</div>
                <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                  {p.vorteile.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              </div>
              <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                <div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1">Nachteile</div>
                <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                  {p.nachteile.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> {l.label}
                </a>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// TAB 2: AUS DEUTSCHLAND (NEU — 27 Visa)
// ============================================================
const AusDeutschland = () => {
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<VisaCategory | "all">("all");
  const [profileFilter, setProfileFilter] = useState<"all" | "solo" | "family">("all");
  const [showSteuer, setShowSteuer] = useState(false);
  const [showAvoid, setShowAvoid] = useState(false);

  const countries = useMemo(() => {
    const set = new Set(VISA_PROGRAMS.map((v) => v.country));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return VISA_PROGRAMS.filter((v) => {
      if (countryFilter !== "all" && v.country !== countryFilter) return false;
      if (categoryFilter !== "all" && v.category !== categoryFilter) return false;
      if (profileFilter === "solo" && !v.bestForSolo) return false;
      if (profileFilter === "family" && !v.bestForFamily) return false;
      return true;
    });
  }, [countryFilter, categoryFilter, profileFilter]);

  return (
    <div className="space-y-4">
      {/* KRITISCHE WARNUNG */}
      <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <div className="font-bold text-red-700 mb-1">★ Kritische 2025/2026-Updates</div>
            <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
              <li>
                <strong className="text-foreground">DE HAT E-2-Treaty mit USA</strong> (seit 1956!) — Mythos
                widerlegt. KEIN Grenada-CBI-Umweg nötig.
              </li>
              <li>
                <strong className="text-foreground">Canada Start-Up Visa CLOSED</strong> für Neuanträge seit
                31.12.2025
              </li>
              <li>
                <strong className="text-foreground">UK Non-Dom-Regime abgeschafft</strong> seit April 2025
              </li>
              <li>
                <strong className="text-foreground">Portugal NHR abgeschafft</strong> 2024 (Nachfolger IFICI
                ist eng)
              </li>
              <li>
                <strong className="text-foreground">§6 AStG verschärft 2025</strong>: zinslose EU-Stundung weg,
                jetzt 7-Jahres-Ratenzahlung mit Sicherheit
              </li>
              <li>
                <strong className="text-foreground">Paraguay $5k-Mythos tot</strong> seit Gesetz 6984/2022
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Filter</h3>
          <span className="text-xs text-muted-foreground ml-auto">{filtered.length} von {VISA_PROGRAMS.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Land</Label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
            >
              <option value="all">Alle Länder ({countries.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Kategorie</Label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as VisaCategory | "all")}
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
            >
              <option value="all">Alle Kategorien</option>
              {(Object.entries(CATEGORY_META) as [VisaCategory, typeof CATEGORY_META[VisaCategory]][]).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.emoji} {v.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Profil</Label>
            <select
              value={profileFilter}
              onChange={(e) => setProfileFilter(e.target.value as typeof profileFilter)}
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm mt-1"
            >
              <option value="all">Alle Profile</option>
              <option value="solo">Solo-Founder</option>
              <option value="family">Mit Familie</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visa Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Keine Visa-Programme passen zu den Filtern.
          </div>
        ) : (
          filtered.map((v) => {
            const cat = CATEGORY_META[v.category];
            return (
              <div key={v.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{v.countryEmoji}</div>
                    <div>
                      <div className="text-xs text-muted-foreground">{v.country}</div>
                      <h3 className="font-bold text-base">{v.name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <Badge variant="outline" className={`text-[10px] ${cat.color}`}>
                          {cat.emoji} {cat.label}
                        </Badge>
                        {v.bestForSolo && (
                          <Badge variant="outline" className="text-[10px]">Solo OK</Badge>
                        )}
                        {v.bestForFamily && (
                          <Badge variant="outline" className="text-[10px]">Familie OK</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <a
                    href={v.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90 shrink-0"
                  >
                    <ExternalLink className="h-3 w-3" /> Offizielle Seite
                  </a>
                </div>

                {v.forDeFounder && (
                  <div
                    className={`rounded-lg p-3 mb-3 text-sm ${
                      v.forDeFounder.startsWith("★")
                        ? "border border-emerald-500/30 bg-emerald-500/5"
                        : "border border-border bg-secondary/30"
                    }`}
                  >
                    <strong>Für DE-Founder:</strong> {v.forDeFounder}
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <Stat label="Dauer" value={v.durationYears} />
                  <Stat label="Bearbeitung" value={v.processingTime} />
                  <Stat label="Setup-Kosten" value={v.costEur} />
                  <Stat label="PR-Pfad" value={v.pathToPr} />
                </div>

                <details className="text-xs">
                  <summary className="cursor-pointer font-semibold text-foreground mb-2">
                    Voraussetzungen, Steuer, Watchouts ▾
                  </summary>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="rounded-lg bg-card border border-border p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Voraussetzungen
                      </div>
                      <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                        {v.requirements.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-card border border-border p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Steuer-Implikationen (DE-Bezug)
                      </div>
                      <div className="text-muted-foreground leading-relaxed">{v.taxImplications}</div>
                    </div>
                  </div>
                  {v.watchouts.length > 0 && (
                    <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 mt-2">
                      <div className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-1">
                        Watchouts
                      </div>
                      <ul className="space-y-0.5 text-muted-foreground list-disc pl-4">
                        {v.watchouts.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  )}
                </details>
              </div>
            );
          })
        )}
      </div>

      {/* Steuer-Block */}
      <CollapsiblePanel
        open={showSteuer}
        onToggle={() => setShowSteuer((v) => !v)}
        icon={<TrendingDown className="h-5 w-5 text-red-700" />}
        title="§6 AStG Wegzugsbesteuerung + Steuer-Strategie"
        subtitle={`${STEUER_BLOCK.length} Sektionen — KRITISCH vor jedem Wegzug`}
        colorClass="border-red-500/30 bg-red-500/5"
      >
        <div className="space-y-2">
          {STEUER_BLOCK.map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-3">
              <div className="font-semibold text-sm mb-1">{s.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{s.detail}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      {/* AVOID-Block */}
      <CollapsiblePanel
        open={showAvoid}
        onToggle={() => setShowAvoid((v) => !v)}
        icon={<ShieldAlert className="h-5 w-5 text-red-700" />}
        title="AVOID-Liste — Mythen + Pitfalls"
        subtitle={`${AVOID_LIST.length} Marketing-Mythen die DE-Founder regelmäßig in Steuer-/Compliance-Probleme bringen`}
        colorClass="border-red-500/30 bg-red-500/5"
      >
        <div className="space-y-2">
          {AVOID_LIST.map((a, i) => (
            <div key={i} className="rounded-xl border border-red-500/20 bg-card p-3">
              <div className="font-semibold text-sm text-red-700">{a.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.detail}</div>
            </div>
          ))}
        </div>
      </CollapsiblePanel>

      <div className="rounded-2xl border border-border bg-card p-4 text-[11px] text-muted-foreground leading-relaxed">
        <strong>Disclaimer:</strong> Stand Mai 2026 verifiziert. Quellen: USCIS, GOV.UK, AIMA Portugal,
        Spain Exteriores, Startup Estonia, UAE Government, Singapore EDB/MOM, Canada IRCC, IND NL, Swiss SEM,
        Thailand BOI/SMART, Bahrain Golden Residency, Georgia Revenue Service. Konditionen ändern sich —
        zwingend Migrationsanwalt + Steuerberater 12-18 Monate vor Wegzug. §6 AStG ist seit 2025 verschärft.
      </div>
    </div>
  );
};

// ============================================================
// HELPERS
// ============================================================
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md bg-secondary/40 px-2 py-1.5">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="font-semibold text-xs mt-0.5">{value}</div>
  </div>
);

const CollapsiblePanel = ({
  open,
  onToggle,
  icon,
  title,
  subtitle,
  colorClass,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  colorClass: string;
  children: React.ReactNode;
}) => (
  <div className={`rounded-2xl border ${colorClass} overflow-hidden`}>
    <button
      onClick={onToggle}
      className="w-full p-4 text-left flex items-start gap-3 hover:bg-black/5 transition-colors"
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="text-muted-foreground text-xs shrink-0 mt-1">{open ? "▲" : "▼"}</div>
    </button>
    {open && <div className="px-4 pb-4">{children}</div>}
  </div>
);

export default VisaHelper;
