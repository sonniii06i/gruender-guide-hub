import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Building2,
  BarChart3,
  ListChecks,
  ArrowRight,
  Scale,
  BookOpen,
} from "lucide-react";
import {
  Callout,
  ChoiceGroup,
  Field,
  ResultPanel,
  ToolLayout,
  ToolSection,
  selectCls,
  toneText,
  type Tone,
} from "@/components/cockpit/kit";

// ============================================================
// SUBSTANCE-CHECKER · Stand Mai 2026
// ============================================================
// Audit Mai 2026: ATAD III ("Unshell"-RL) wurde am 18.06.2025 von ECOFIN
// WITHDRAWN. Substance-Risiko ist trotzdem real — nur die Maßstäbe haben
// sich verschoben:
//
// PRIMÄRE Risikoquellen (Stand 2026):
// 1. §50d Abs. 3 EStG (Anti-Treaty-Shopping, AbzStEntModG 2021)
//    → BZSt versagt DBA/MTR-Vorteile bei fehlender Substanz
// 2. §10 AO (Ort der Geschäftsleitung)
//    → BMF qualifiziert Sitz nach DE wenn GF-Entscheidungen in DE getroffen
// 3. §AStG §7-14 (Hinzurechnungsbesteuerung)
//    → Niedrigsteuer-Schwelle SEIT 2024: 15% (vorher 25%) via MinBestRL-UmsG
// 4. DBA Principal Purpose Test (PPT, via MLI in modernen DBAs)
// 5. EuGH "Danish Beneficial Owner Cases" (C-115/16, C-116/16)
//
// SEKUNDÄR / entfallen:
// - ATAD III: zurückgezogen Juni 2025 — keine eigenständige Substance-RL mehr
// - DAC 6 wird stattdessen überarbeitet (Meldepflicht-fokussiert, nicht Substance)
// ============================================================

const ASTG_NIEDRIGSTEUER_SCHWELLE = 15; // §8 Abs. 5 AStG seit Veranlagung 2024
const STREUBESITZ_KST = 10; // §8b Abs. 4 KStG

// ===== LÄNDER-DATEN (synchron mit DbaCfcRechner) =====
type Country =
  | "estland"
  | "niederlande"
  | "luxembourg"
  | "irland"
  | "zypern"
  | "malta"
  | "schweiz"
  | "oesterreich"
  | "polen"
  | "litauen"
  | "bulgarien"
  | "tschechien";

interface CountryInfo {
  flag: string;
  name: string;
  /** Effektiver CIT-Range (niedrigster bis Standard). */
  citRange: string;
  /** Effektiver CIT zum Scoring (niedrigster verfügbarer Standard-Satz). */
  effCitForScoring: number;
  /** BMF-/EuGH-Scrutiny-Level basierend auf Praxis (nicht mehr ATAD III). */
  substanceRisk: "high" | "medium" | "low";
  scrutinyNote: string;
}

const COUNTRY_LABELS: Record<Country, CountryInfo> = {
  estland: {
    flag: "🇪🇪",
    name: "Estland (OÜ)",
    citRange: "0% thesauriert / 22% ausgeschüttet (DPT, 22/78)",
    effCitForScoring: 22, // Bei Ausschüttung — der relevante Fall für DE-Empfänger
    substanceRisk: "high",
    scrutinyNote:
      "Häufig genutzt als Briefkasten für DE-Auswanderer → BZSt-Aufmerksamkeit. DPT 22% (geplante Erhöhung auf 24% wurde Ende 2025 vom Riigikogu gestrichen; ermäßigter 14/86-Satz seit 2025 abgeschafft).",
  },
  niederlande: {
    flag: "🇳🇱",
    name: "Niederlande (BV)",
    citRange: "19% bis €200k / 25,8% darüber",
    effCitForScoring: 19,
    substanceRisk: "medium",
    scrutinyNote: "Klassisches Holding-Land — Participation Exemption seit Jahrzehnten etabliert.",
  },
  luxembourg: {
    flag: "🇱🇺",
    name: "Luxembourg (Soparfi/SPF)",
    citRange: "24,94% (Soparfi) / 0% (SPF nur Familien)",
    effCitForScoring: 24.94,
    substanceRisk: "high",
    scrutinyNote: "Klassisches Holding-Land — strenger Substance-Test seit Luxleaks 2014.",
  },
  irland: {
    flag: "🇮🇪",
    name: "Irland (Ltd)",
    citRange: "12,5% Trading / 25% Passive",
    effCitForScoring: 12.5,
    substanceRisk: "medium",
    scrutinyNote:
      "BEPS-Hotspot — aber Trading-Test ist substanzgetrieben. 12,5% erfordert echte aktive Tätigkeit.",
  },
  zypern: {
    flag: "🇨🇾",
    name: "Zypern (Ltd)",
    citRange: "12,5%",
    effCitForScoring: 12.5,
    substanceRisk: "high",
    scrutinyNote:
      "Hohe BMF-Scrutiny seit Cyprus Papers — Pauschal-Verdacht bei Holding-only-Setups.",
  },
  malta: {
    flag: "🇲🇹",
    name: "Malta (Ltd, eff. 5%)",
    citRange: "35% nominell / 5% effektiv via 6/7-Refund",
    effCitForScoring: 5,
    substanceRisk: "high",
    scrutinyNote:
      "Höchste BMF-Scrutiny — 6/7-Refund-Mechanik gilt als Treaty-Shopping-Indiz.",
  },
  schweiz: {
    flag: "🇨🇭",
    name: "Schweiz (GmbH/AG)",
    citRange: "11,66-21% (Luzern niedrigster 2026)",
    effCitForScoring: 11.66,
    substanceRisk: "medium",
    scrutinyNote: "Drittland — DBA-Schutz solide, aber Substance bei niedrigen Kantonen kritisch.",
  },
  oesterreich: {
    flag: "🇦🇹",
    name: "Österreich (FlexCo)",
    citRange: "23%",
    effCitForScoring: 23,
    substanceRisk: "low",
    scrutinyNote: "Steuerlich unkritisch (CIT > §AStG-Schwelle), FlexCo modern für Beteiligungen.",
  },
  polen: {
    flag: "🇵🇱",
    name: "Polen (Sp. z o.o.)",
    citRange: "19% Standard / 9% Small (<€2M Umsatz)",
    effCitForScoring: 19,
    substanceRisk: "low",
    scrutinyNote: "EU-Mitglied, Standard 19% über §AStG-Schwelle. Small-CIT 9% triggert §AStG.",
  },
  litauen: {
    flag: "🇱🇹",
    name: "Litauen (UAB)",
    citRange: "17% Standard / 7% Small / 0% erste 2J Neugründung (ab 2026)",
    effCitForScoring: 17,
    substanceRisk: "low",
    scrutinyNote:
      "Reform 2026: 17% Standard, 7% Small <€300k, 0% erste 2J neuer Kleinunternehmen.",
  },
  bulgarien: {
    flag: "🇧🇬",
    name: "Bulgarien (EOOD)",
    citRange: "10%",
    effCitForScoring: 10,
    substanceRisk: "medium",
    scrutinyNote: "Niedrigster regulärer EU-CIT — beliebtes Setup für Ecom-Holdings, BMF prüft Substanz.",
  },
  tschechien: {
    flag: "🇨🇿",
    name: "Tschechien (s.r.o.)",
    citRange: "21%",
    effCitForScoring: 21,
    substanceRisk: "low",
    scrutinyNote: "EU-Mitglied, CIT > §AStG-Schwelle, kein typisches Holding-Land.",
  },
};

const SubstanceChecker = () => {
  const [country, setCountry] = useState<Country>("estland");
  const [gfWohnsitz, setGfWohnsitz] = useState<"de" | "auslandLand" | "drittland">("de");
  const [lokaleMitarbeiter, setLokaleMitarbeiter] = useState(0);
  const [eigenesBuero, setEigenesBuero] = useState<"none" | "coworking" | "office">("none");
  const [geschaeftsleitungVorOrt, setGeschaeftsleitungVorOrt] = useState(false);
  const [aktivitaetsArt, setAktivitaetsArt] = useState<"aktiv" | "passive">("aktiv");
  const [umsatzVorOrt, setUmsatzVorOrt] = useState(0);
  const [umsatzGesamt, setUmsatzGesamt] = useState(100);
  const [bankkontoLokal, setBankkontoLokal] = useState(false);
  const [hatPersoenlichenGrund, setHatPersoenlichenGrund] = useState(false);

  const countryInfo = COUNTRY_LABELS[country];
  const istNiedrigsteuer = countryInfo.effCitForScoring < ASTG_NIEDRIGSTEUER_SCHWELLE;

  const result = useMemo(() => {
    let score = 0;
    const reasons: string[] = [];
    const empfehlungen: string[] = [];

    // ===== §10 AO Ort der Geschäftsleitung — kritisch =====
    if (gfWohnsitz === "de") {
      score += 35;
      reasons.push(
        "**§10 AO-Risiko: GF wohnt in DE** → BMF qualifiziert Sitz nach DE um (Ort der tatsächlichen Geschäftsleitung)",
      );
      empfehlungen.push("GF mit Wohnsitz im Ziel-Land oder EU/EWR — keine DE-Adresse im Handelsregister");
    } else if (gfWohnsitz === "auslandLand") {
      score -= 15;
      reasons.push("✓ GF wohnt im Ziel-Land — entspannt §10 AO");
    } else {
      score += 10;
      reasons.push(
        "GF wohnt in Drittland — neutral (kein §10 AO-Risiko, aber auch keine echte lokale Geschäftsleitung)",
      );
    }

    // ===== §50d Abs. 3 EStG Substance-Test — Mitarbeiter =====
    if (lokaleMitarbeiter === 0) {
      score += 25;
      reasons.push(
        "**§50d Abs. 3 EStG: keine lokalen Mitarbeiter** → BZSt versagt DBA-/MTR-Vorteile (BZSt-Merkblatt 2025)",
      );
      empfehlungen.push(
        "Mind. 1 lokaler Mitarbeiter mit Entscheidungsbefugnis (nicht nur Nominee-Director / Service-Provider)",
      );
    } else if (lokaleMitarbeiter >= 3) {
      score -= 20;
      reasons.push(`✓ ${lokaleMitarbeiter} lokale Mitarbeiter — solide für §50d-Substance-Test`);
    } else {
      score += 5;
      reasons.push(
        `${lokaleMitarbeiter} lokale Mitarbeiter — minimal vorhanden, BZSt prüft Qualifikation + Entscheidungsbefugnis`,
      );
    }

    // ===== §50d Abs. 3 EStG — Büro =====
    if (eigenesBuero === "none") {
      score += 20;
      reasons.push(
        "**Keine eigenen Räumlichkeiten** → klassisches Mailbox-Indiz (§50d-Test scheitert + EuGH 'Danish Beneficial Owner Cases')",
      );
      empfehlungen.push(
        "Mind. Coworking-Vertrag mit eigener Tür/Schreibtisch + Schlüssel + Schild + Postzustellung",
      );
    } else if (eigenesBuero === "coworking") {
      score += 5;
      reasons.push("Coworking — akzeptabel aber nicht ideal (kann BZSt-Argument schwächen)");
    } else {
      score -= 15;
      reasons.push("✓ Eigenes Büro — solide Substanz");
    }

    // ===== Geschäftsleitung vor Ort =====
    if (!geschaeftsleitungVorOrt) {
      score += 25;
      reasons.push(
        "**Geschäftsleitung NICHT vor Ort** → §10 AO: Sitz richtet sich nach Ort der tatsächlichen Entscheidungen, nicht nach Handelsregister",
      );
      empfehlungen.push(
        "Board Meetings vor Ort, Verträge dort unterschreiben, dokumentierte lokale Entscheidungs-Protokolle",
      );
    } else {
      score -= 20;
      reasons.push("✓ Geschäftsleitung tatsächlich vor Ort");
    }

    // ===== Aktive vs. passive Einkünfte (§8 AStG-Aktivkatalog) =====
    if (aktivitaetsArt === "passive") {
      score += 30;
      reasons.push(
        `**Passive Einkünfte (Lizenz, Zinsen, Mieten)** → §AStG-Hinzurechnung greift bei CIT < ${ASTG_NIEDRIGSTEUER_SCHWELLE}% + Beherrschung >50%`,
      );
      empfehlungen.push(
        `Wenn passiv: nur sinnvoll wenn lokale CIT ≥ ${ASTG_NIEDRIGSTEUER_SCHWELLE}% ODER mit massiver Substanz (Aktive-Funktionsprüfung)`,
      );
    } else {
      score -= 10;
      reasons.push(
        "✓ Aktive Geschäftstätigkeit (§8 Abs. 1 Aktivkatalog) — Funktionsprüfung für Handel/DL mit beherrschendem Inländer beachten",
      );
    }

    // ===== Lokaler Umsatz / wirtschaftlicher Grund =====
    // Cap auf 100 %, falls Nutzer mehr lokal eingetragen hat als Gesamtumsatz.
    const umsatzAnteilLokal = umsatzGesamt > 0 ? Math.min(1, umsatzVorOrt / umsatzGesamt) : 0;
    if (umsatzAnteilLokal < 0.1) {
      score += 15;
      reasons.push(
        `**Nur ${(umsatzAnteilLokal * 100).toFixed(0)}% Umsatz vor Ort** → fehlende wirtschaftliche Verwurzelung (PPT/§50d)`,
      );
      empfehlungen.push(
        "Echten lokalen Markt entwickeln (B2B-Kunden vor Ort, lokale Verträge, lokale Lieferanten)",
      );
    } else if (umsatzAnteilLokal >= 0.3) {
      score -= 15;
      reasons.push(`✓ ${(umsatzAnteilLokal * 100).toFixed(0)}% Umsatz vor Ort — solider lokaler Markt`);
    }

    // ===== Lokales Bankkonto =====
    if (!bankkontoLokal) {
      score += 8;
      reasons.push("Kein lokales Bankkonto — schwächt Substanz-Argument (BZSt-Merkblatt 2025)");
      empfehlungen.push("Lokales Geschäftskonto eröffnen — auch wenn Wise/Mercury-Alternative existiert");
    } else {
      reasons.push("✓ Lokales Bankkonto vorhanden");
    }

    // ===== §AStG-Niedrigsteuer-Risiko (15% seit 2024) =====
    if (istNiedrigsteuer) {
      score += 15;
      reasons.push(
        `**Effektiver lokaler CIT ${countryInfo.effCitForScoring}% < ${ASTG_NIEDRIGSTEUER_SCHWELLE}%** → §AStG-Hinzurechnungsschwelle erreicht (seit MinBestRL-UmsG 2024)`,
      );
    } else {
      score -= 10;
      reasons.push(
        `✓ Lokaler CIT ${countryInfo.effCitForScoring}% ≥ ${ASTG_NIEDRIGSTEUER_SCHWELLE}% — §AStG-Niedrigsteuer-Hürde nicht erreicht`,
      );
    }

    // ===== Wirtschaftlicher Grund (Principal Purpose Test / §50d) =====
    if (hatPersoenlichenGrund) {
      score -= 12;
      reasons.push(
        "✓ Wirtschaftlicher Grund jenseits Steuer-Optimierung dokumentiert (entlastet PPT/§50d-Test)",
      );
    } else {
      score += 8;
      reasons.push(
        "**Kein wirtschaftlicher Grund jenseits Steuer-Optimierung** → PPT (Principal Purpose Test) im DBA + §50d Abs. 3 EStG greifen",
      );
      empfehlungen.push(
        "Dokumentiere wirtschaftliche Gründe: lokale Kunden, Talent-Pool, Markt-Zugang, Sprache, Logistik — nicht nur Steuer",
      );
    }

    // ===== Country-spezifischer Substance-Risk-Modifier =====
    if (countryInfo.substanceRisk === "high") {
      score += 10;
      reasons.push(
        `Land "${countryInfo.name}" hat hohe BMF-Scrutiny — ${countryInfo.scrutinyNote}`,
      );
    } else if (countryInfo.substanceRisk === "low") {
      score -= 5;
      reasons.push(`✓ Land "${countryInfo.name}" — ${countryInfo.scrutinyNote}`);
    } else {
      reasons.push(`Land "${countryInfo.name}" — ${countryInfo.scrutinyNote}`);
    }

    score = Math.max(0, Math.min(100, score));

    let category: "low" | "medium" | "high" | "critical";
    if (score < 25) category = "low";
    else if (score < 50) category = "medium";
    else if (score < 75) category = "high";
    else category = "critical";

    return { score, category, reasons, empfehlungen };
  }, [
    country,
    gfWohnsitz,
    lokaleMitarbeiter,
    eigenesBuero,
    geschaeftsleitungVorOrt,
    aktivitaetsArt,
    umsatzVorOrt,
    umsatzGesamt,
    bankkontoLokal,
    hatPersoenlichenGrund,
    countryInfo,
    istNiedrigsteuer,
  ]);

  const categoryTone: Tone = {
    low: "success" as const,
    medium: "warning" as const,
    high: "warning" as const,
    critical: "danger" as const,
  }[result.category];

  const categoryLabel = {
    low: "Niedrig: Substanz solide",
    medium: "Mittel: Verbesserung empfohlen",
    high: "Hoch: Setup riskant (§50d- und §AStG-Versagung droht)",
    critical: "Kritisch: sehr wahrscheinlich Briefkasten-Einstufung",
  }[result.category];

  const CategoryIcon = {
    low: CheckCircle2,
    medium: AlertCircle,
    high: AlertTriangle,
    critical: XCircle,
  }[result.category];

  const barCls = {
    low: "bg-success",
    medium: "bg-warning",
    high: "bg-warning",
    critical: "bg-danger",
  }[result.category];

  const jaNein = [
    { value: true, label: "Ja" },
    { value: false, label: "Nein" },
  ];
  const halbe = "[&>button]:flex-1 [&>button]:text-center";

  return (
    <CockpitShell
      eyebrow="International · Substance-Checker, Stand Mai 2026"
      title="Briefkasten-Risiko nach §50d EStG, §AStG und §10 AO"
      subtitle="Live-Bewertung deiner Auslandsgesellschaft. Niedriger Score heißt sauber. Hoher Score heißt: Das BZSt versagt DBA-Vorteile, das BMF verlegt den Sitz nach Deutschland oder die §AStG-Hinzurechnung greift."
    >
      {/* ============ ATAD III WITHDRAWN BANNER ============ */}
      <Callout tone="info" title="Update 18.06.2025: ATAD III zurückgezogen" className="mb-6">
        Die ATAD-III-Richtlinie („Unshell“) wurde vom ECOFIN <strong className="font-semibold text-foreground">zurückgezogen</strong>.
        Substanz bleibt trotzdem kritisch, jetzt über <strong className="font-semibold text-foreground">§50d Abs. 3 EStG</strong>, den{" "}
        <strong className="font-semibold text-foreground">DBA Principal Purpose Test</strong> und die{" "}
        <strong className="font-semibold text-foreground">EuGH „Danish Beneficial Owner Cases“</strong>. Der Score folgt den
        geltenden Maßstäben.
      </Callout>

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Gesellschaft und Geschäftsführung" icon={Building2}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field className="sm:col-span-2" label="Land" hint={countryInfo.scrutinyNote} htmlFor="sub-land">
                  <select id="sub-land" value={country} onChange={(e) => setCountry(e.target.value as Country)} className={selectCls}>
                    {Object.entries(COUNTRY_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.name} · {v.citRange}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field className="sm:col-span-2" label="Wohnsitz der Geschäftsführung" htmlFor="sub-gf">
                  <select
                    id="sub-gf"
                    value={gfWohnsitz}
                    onChange={(e) => setGfWohnsitz(e.target.value as typeof gfWohnsitz)}
                    className={selectCls}
                  >
                    <option value="de">Deutschland (§10 AO-Risiko)</option>
                    <option value="auslandLand">Im Ziel-Land ({countryInfo.name})</option>
                    <option value="drittland">Drittland (z. B. Dubai, Andorra, Thailand)</option>
                  </select>
                </Field>
                <Field className="sm:col-span-2" label="Tatsächliche Geschäftsleitung vor Ort? (§10 AO)">
                  <ChoiceGroup<boolean>
                    label="Tatsächliche Geschäftsleitung vor Ort"
                    value={geschaeftsleitungVorOrt}
                    onChange={setGeschaeftsleitungVorOrt}
                    options={jaNein}
                    className={halbe}
                  />
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="Substanz vor Ort" icon={Shield}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Lokale Mitarbeiter"
                  hint="§50d Abs. 3 EStG erwartet eigene Mitarbeiter mit Entscheidungsbefugnis, nicht nur Nominee oder Provider."
                  htmlFor="sub-ma"
                >
                  <Input
                    id="sub-ma"
                    type="number"
                    min={0}
                    value={lokaleMitarbeiter}
                    onChange={(e) => setLokaleMitarbeiter(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Büro" htmlFor="sub-buero">
                  <select
                    id="sub-buero"
                    value={eigenesBuero}
                    onChange={(e) => setEigenesBuero(e.target.value as typeof eigenesBuero)}
                    className={selectCls}
                  >
                    <option value="none">Nur Briefkasten / Service-Provider-Adresse</option>
                    <option value="coworking">Coworking-Vertrag (eigener Schreibtisch)</option>
                    <option value="office">Eigenes Büro</option>
                  </select>
                </Field>
                <Field label="Lokales Bankkonto?">
                  <ChoiceGroup<boolean> label="Lokales Bankkonto" value={bankkontoLokal} onChange={setBankkontoLokal} options={jaNein} className={halbe} />
                </Field>
                <Field label="Wirtschaftlicher Grund dokumentiert? (PPT)" hint="Lokale Kunden, Markt, Sprache, Talente: nicht nur der Steuervorteil.">
                  <ChoiceGroup<boolean>
                    label="Wirtschaftlicher Grund dokumentiert"
                    value={hatPersoenlichenGrund}
                    onChange={setHatPersoenlichenGrund}
                    options={jaNein}
                    className={halbe}
                  />
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="Tätigkeit und Umsatz" icon={BarChart3}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field className="sm:col-span-2" label="Hauptaktivität (§8 AStG-Aktivkatalog)" htmlFor="sub-akt">
                  <select
                    id="sub-akt"
                    value={aktivitaetsArt}
                    onChange={(e) => setAktivitaetsArt(e.target.value as typeof aktivitaetsArt)}
                    className={selectCls}
                  >
                    <option value="aktiv">Aktiv (Handel, Service, Produktion)</option>
                    <option value="passive">Passiv (Lizenz, Zinsen, Dividenden, Mieten)</option>
                  </select>
                </Field>
                <Field label="Umsatz vor Ort (Tsd. €)" htmlFor="sub-umsatz-lokal">
                  <Input
                    id="sub-umsatz-lokal"
                    type="number"
                    min={0}
                    value={umsatzVorOrt}
                    onChange={(e) => setUmsatzVorOrt(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Umsatz gesamt (Tsd. €)" htmlFor="sub-umsatz-gesamt">
                  <Input
                    id="sub-umsatz-gesamt"
                    type="number"
                    min={1}
                    value={umsatzGesamt}
                    onChange={(e) => setUmsatzGesamt(Math.max(1, Number(e.target.value) || 1))}
                    className="tabular"
                  />
                </Field>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Briefkasten-Risiko"
              title={
                <span className="flex items-start gap-2">
                  <CategoryIcon className={`mt-0.5 h-4 w-4 shrink-0 ${toneText(categoryTone)}`} aria-hidden="true" />
                  {categoryLabel}
                </span>
              }
              value={
                <>
                  {result.score}
                  <span className="ml-1.5 text-2xl font-medium text-primary-foreground/55">/ 100</span>
                </>
              }
              valueHint="Risiko-Score, je niedriger, desto besser"
            >
              <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div className={`h-full rounded-full ${barCls}`} style={{ width: `${result.score}%` }} />
              </div>
            </ResultPanel>

            {result.empfehlungen.length > 0 && (
              <ToolSection title="Was du verbessern solltest" icon={ListChecks}>
                <ul className="space-y-2.5 text-sm leading-relaxed">
                  {result.empfehlungen.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </ToolSection>
            )}
          </>
        }
      />

      {/* ============ REASONS ============ */}
      <ToolSection title="Bewertungsfaktoren" description="Jeder Faktor erhöht oder senkt den Score." icon={Scale} className="mb-6">
        <ul className="divide-y divide-border/70">
          {result.reasons.map((r, i) => {
            const positiv = r.startsWith("✓");
            const text = positiv ? r.replace(/^✓\s*/, "") : r;
            return (
              <li key={i} className="flex items-start gap-3 py-2.5 text-sm leading-relaxed first:pt-0 last:pb-0">
                {positiv ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                )}
                <span>
                  {text.split(/\*\*([^*]+)\*\*/g).map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="font-semibold">
                        {part}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    ),
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </ToolSection>

      {/* ============ RECHTSGRUNDLAGEN ============ */}
      <ToolSection title="Rechtsgrundlagen" description="Stand Mai 2026" icon={BookOpen}>
        <dl className="divide-y divide-border/70 text-sm">
          {[
            {
              t: "§10 AO (Ort der Geschäftsleitung)",
              d: "Der steuerliche Sitz richtet sich nach dem Ort der tatsächlichen Geschäftsleitung, nicht nach dem Handelsregister. Briefkasten in LU/CY mit GF in DE: Das BMF verlegt den Sitz nach DE.",
            },
            {
              t: "§50d Abs. 3 EStG (Anti-Treaty-Shopping, AbzStEntModG 2021)",
              d: "Das BZSt versagt DBA- und MTR-Vorteile bei fehlender Substanz. Limited-Look-Through seit BZSt-Merkblatt März 2025.",
            },
            {
              t: "§AStG §7 bis 14 (Hinzurechnungsbesteuerung)",
              d: "Niedrigsteuer-Schwelle seit Veranlagung 2024: 15 % (vorher 25 %) über MinBestRL-UmsG, BGBl. I 2023, 397. Greift bei Beherrschung über 50 %, passiven Einkünften und CIT unter 15 %.",
            },
            {
              t: "DBA Principal Purpose Test (PPT)",
              d: "Seit dem MLI in modernen DBAs: DBA-Vorteile werden versagt, wenn der Hauptzweck der Struktur die Steueroptimierung ist.",
            },
            {
              t: "EuGH „Danish Beneficial Owner Cases“ (C-115/16, C-116/16)",
              d: "MTR-Befreiung nur bei wirtschaftlich tätigem Empfänger, nicht bei einer Durchleitungs-Holding.",
            },
            {
              t: "§6 AStG Wegzugsbesteuerung (JStG 2024)",
              d: "Die zinslose EU/EWR-Stundung ist seit 2022 entfallen, nur noch 7 Raten gegen Sicherheit. Bei über 25 % Ausschüttungen in 7 Jahren: sofortiger Widerruf der Stundung. Das JStG 2024 erweitert auf Investmentfonds-Anteile ab 1.1.2025.",
            },
            {
              t: "ATAD III („Unshell“-RL)",
              d: "Am 18.06.2025 vom ECOFIN zurückgezogen, Begründung: Überlappung mit DAC 6. Stattdessen wird DAC 6 überarbeitet (Meldepflichten, nicht Substanz).",
            },
            {
              t: "Pillar 2 (OECD GloBE)",
              d: "15 % Mindeststeuer für Konzerne über 750 Mio. € Umsatz. Solo-Gründer sind nicht betroffen, die §AStG-Schwelle von 15 % läuft aber synchron.",
            },
          ].map((g) => (
            <div key={g.t} className="py-3 first:pt-0">
              <dt className="font-semibold">{g.t}</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">{g.d}</dd>
            </div>
          ))}
        </dl>
        <Callout tone="neutral" icon={Info} className="mt-4">
          Der Score ist eine Heuristik auf Basis der BMF-/BZSt-Praxis Mai 2026, kein Steuerbescheid. Bei einem kommerziellen
          Setup zwingend StB und Fachanwalt für internationales Steuerrecht einbinden.
        </Callout>
      </ToolSection>
    </CockpitShell>
  );
};

export default SubstanceChecker;
