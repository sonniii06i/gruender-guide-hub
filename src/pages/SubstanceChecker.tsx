import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

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
    citRange: "0% thesauriert / 24% ausgeschüttet (DPT ab 2026)",
    effCitForScoring: 24, // Bei Ausschüttung — der relevante Fall für DE-Empfänger
    substanceRisk: "high",
    scrutinyNote:
      "Häufig genutzt als Briefkasten für DE-Auswanderer → BZSt-Aufmerksamkeit. DPT 24% ab 2026 (war 22% in 2025).",
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
    const umsatzAnteilLokal = umsatzGesamt > 0 ? umsatzVorOrt / umsatzGesamt : 0;
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

  const categoryColor = {
    low: "border-emerald-500/40 bg-emerald-500/5",
    medium: "border-amber-500/40 bg-amber-500/5",
    high: "border-orange-500/40 bg-orange-500/5",
    critical: "border-red-500/40 bg-red-500/5",
  }[result.category];

  const categoryLabel = {
    low: "Niedrig — Substanz solide",
    medium: "Mittel — Verbesserung empfohlen",
    high: "Hoch — Setup riskant (§50d + §AStG-Versagung droht)",
    critical: "Kritisch — sehr wahrscheinlich Mailbox-Klassifizierung",
  }[result.category];

  const categoryIcon = {
    low: <CheckCircle2 className="h-6 w-6 text-emerald-700" />,
    medium: <AlertCircle className="h-6 w-6 text-amber-700" />,
    high: <AlertTriangle className="h-6 w-6 text-orange-700" />,
    critical: <XCircle className="h-6 w-6 text-red-700" />,
  }[result.category];

  return (
    <CockpitShell
      eyebrow="Substance-Checker · Stand Mai 2026"
      title="§50d EStG / §AStG / §10 AO Mailbox-Risiko-Score"
      subtitle="Live-Bewertung deiner Auslandsgesellschaft. Niedrig = sauber. Hoch = BZSt versagt DBA-Vorteile / BMF qualifiziert Sitz nach DE um / §AStG-Hinzurechnung."
    >
      {/* ============ ATAD III WITHDRAWN BANNER ============ */}
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 mb-6">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-blue-700">Update 18.06.2025:</strong> Die ATAD-III-Richtlinie
            ("Unshell") wurde von ECOFIN <strong>zurückgezogen</strong>. Substance ist trotzdem
            kritisch — aber jetzt via <strong>§50d Abs. 3 EStG (DE)</strong>,{" "}
            <strong>DBA Principal Purpose Test</strong> und{" "}
            <strong>EuGH "Danish Beneficial Owner Cases"</strong>. Dieser Score ist auf die
            geltenden Maßstäbe aktualisiert.
          </div>
        </div>
      </div>

      {/* ============ INPUTS ============ */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine Auslandsgesellschaft</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Land</Label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(COUNTRY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.flag} {v.name} · {v.citRange}
                </option>
              ))}
            </select>
            <div className="text-[10px] text-muted-foreground mt-1 italic">
              {countryInfo.scrutinyNote}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">GF-Wohnsitz</Label>
            <select
              value={gfWohnsitz}
              onChange={(e) => setGfWohnsitz(e.target.value as typeof gfWohnsitz)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="de">🇩🇪 DE — Wohnsitz Deutschland (§10 AO-Risiko!)</option>
              <option value="auslandLand">{countryInfo.flag} im Ziel-Land</option>
              <option value="drittland">🌍 Drittland (z.B. Dubai, Andorra, Thailand)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Lokale Mitarbeiter</Label>
            <Input
              type="number"
              min={0}
              value={lokaleMitarbeiter}
              onChange={(e) => setLokaleMitarbeiter(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              §50d Abs. 3 EStG erwartet eigene Mitarbeiter mit Entscheidungsbefugnis (nicht nur
              Nominee/Provider)
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Büro-Setup</Label>
            <select
              value={eigenesBuero}
              onChange={(e) => setEigenesBuero(e.target.value as typeof eigenesBuero)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="none">Nur Briefkasten / Service-Provider-Adresse</option>
              <option value="coworking">Coworking-Vertrag (eigener Schreibtisch)</option>
              <option value="office">Eigenes Büro</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Tatsächliche Geschäftsleitung vor Ort? (§10 AO)
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setGeschaeftsleitungVorOrt(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    geschaeftsleitungVorOrt === o.v
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
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Hauptaktivität (§8 AStG-Aktivkatalog)
            </Label>
            <select
              value={aktivitaetsArt}
              onChange={(e) => setAktivitaetsArt(e.target.value as typeof aktivitaetsArt)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="aktiv">Aktiv (Handel, Service, Produktion)</option>
              <option value="passive">Passiv (Lizenz, Zinsen, Dividenden, Mieten)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz vor Ort (k €)</Label>
            <Input
              type="number"
              min={0}
              value={umsatzVorOrt}
              onChange={(e) => setUmsatzVorOrt(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz gesamt (k €)</Label>
            <Input
              type="number"
              min={1}
              value={umsatzGesamt}
              onChange={(e) => setUmsatzGesamt(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Lokales Bankkonto?</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setBankkontoLokal(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    bankkontoLokal === o.v
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
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Wirtschaftl. Grund dokumentiert (PPT)?
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setHatPersoenlichenGrund(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    hatPersoenlichenGrund === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              Lokale Kunden / Markt / Sprache / Talent — nicht nur Steuer-Vorteil
            </div>
          </div>
        </div>
      </div>

      {/* ============ SCORE ============ */}
      <div className={`rounded-2xl border-2 p-6 mb-6 ${categoryColor}`}>
        <div className="flex items-center gap-3 mb-3">
          {categoryIcon}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Mailbox-Risiko</div>
            <div className="text-2xl font-bold">{categoryLabel}</div>
          </div>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <div className="text-5xl font-bold">{result.score}</div>
          <div className="text-sm text-muted-foreground pb-2">/ 100 Risiko-Score</div>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${
              result.category === "low"
                ? "bg-emerald-500"
                : result.category === "medium"
                ? "bg-amber-500"
                : result.category === "high"
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {/* ============ REASONS ============ */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Bewertungs-Faktoren</h3>
        <ul className="space-y-2 text-sm">
          {result.reasons.map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
              dangerouslySetInnerHTML={{
                __html: `<span class="text-muted-foreground">·</span><span>${r.replace(
                  /\*\*([^*]+)\*\*/g,
                  "<strong>$1</strong>",
                )}</span>`,
              }}
            />
          ))}
        </ul>
      </div>

      {/* ============ EMPFEHLUNGEN ============ */}
      {result.empfehlungen.length > 0 && (
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
          <h3 className="font-bold text-sm mb-3">Was du verbessern solltest</h3>
          <ul className="space-y-2 text-sm">
            {result.empfehlungen.map((e, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ============ RECHTSGRUNDLAGEN ============ */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed">
        <strong>Rechtsgrundlagen — Stand Mai 2026:</strong>
        <ul className="list-disc pl-4 space-y-1.5 mt-2 text-muted-foreground">
          <li>
            <strong>§10 AO (Ort der Geschäftsleitung):</strong> Steuer-Sitz richtet sich nach Ort
            der tatsächlichen Geschäftsleitung — nicht Handelsregister. Mailbox in LU/CY mit GF in
            DE → BMF qualifiziert nach DE um.
          </li>
          <li>
            <strong>§50d Abs. 3 EStG (Anti-Treaty-Shopping, AbzStEntModG 2021):</strong> BZSt
            versagt DBA-/MTR-Vorteile bei fehlender Substanz. Limited-Look-Through seit BZSt-
            Merkblatt März 2025.
          </li>
          <li>
            <strong>§AStG §7-14 (Hinzurechnungsbesteuerung):</strong> Niedrigsteuer-Schwelle{" "}
            <strong>seit Veranlagung 2024: 15%</strong> (vorher 25%) via MinBestRL-UmsG, BGBl. I
            2023, 397. Greift bei Beherrschung &gt;50% + passive Einkünfte + CIT &lt;15%.
          </li>
          <li>
            <strong>DBA Principal Purpose Test (PPT):</strong> seit MLI in modernen DBAs — DBA-
            Vorteile versagt wenn Hauptzweck der Struktur die Steuer-Optimierung ist.
          </li>
          <li>
            <strong>EuGH "Danish Beneficial Owner Cases"</strong> (C-115/16, C-116/16): MTR-
            Befreiung nur bei wirtschaftlich tätigem Empfänger, nicht bei Durchleitungs-Holding.
          </li>
          <li>
            <strong>§6 AStG Wegzugsbesteuerung (JStG 2024):</strong> Zinslose EU/EWR-Stundung{" "}
            <strong>ENTFALLEN seit 2022</strong> — nur noch 7-Raten gegen Sicherheit. Bei &gt;25%
            Ausschüttungen in 7 Jahren: sofortiger Stundungs-Widerruf. JStG 2024 erweitert auf
            Investmentfonds-Anteile ab 1.1.2025.
          </li>
          <li>
            <strong>ATAD III ("Unshell"-RL):</strong> Am 18.06.2025 von ECOFIN{" "}
            <strong>zurückgezogen</strong> — Begründung: Überlappung mit DAC 6. Stattdessen wird
            DAC 6 überarbeitet (Meldepflichten, nicht Substance).
          </li>
          <li>
            <strong>Pillar 2 (OECD GloBE):</strong> 15% Mindeststeuer für Konzerne &gt;€750M
            Umsatz — Solo-Founder unbetroffen, aber §AStG-15%-Schwelle synchron.
          </li>
          <li className="text-foreground">
            <strong>Disclaimer:</strong> Score ist Heuristik basierend auf BMF/BZSt-Praxis Mai
            2026, kein Steuer-Bescheid. Bei kommerziellem Setup zwingend StB + Fachanwalt für
            internationales Steuerrecht konsultieren.
          </li>
        </ul>
      </div>
    </CockpitShell>
  );
};

export default SubstanceChecker;
