/**
 * SchwellenCheck — "Wann muss ich was melden?"
 *
 * Tool 3 der Anfänger-Wave (Starter-Kategorie).
 * Interaktiver Check für alle relevanten Freibeträge, Freigrenzen und Pflicht-
 * Schwellen für Side-Hustle / nebenberuflich Selbstständige.
 *
 * 12 Schwellen (Stand 2026):
 *  - Grundfreibetrag §32a EStG 12.348 €/J 2026
 *  - §22 Nr. 3 EStG Sonstige-Einkünfte-Freigrenze 256 €/J
 *  - §3 Nr. 26 EStG Übungsleiter-Pauschale 3.300 €/J
 *  - §3 Nr. 26a EStG Ehrenamtspauschale 960 €/J
 *  - §23 EStG Privates Veräußerungsgeschäft Freigrenze 1.000 €/J (Crypto, Antik etc.)
 *  - §23 EStG Spekulationsfrist 1 Jahr (10 Jahre Immobilien)
 *  - §19 UStG Kleinunternehmer 25k Vorjahr / 100k aktuell
 *  - §20 EStG Sparerpauschbetrag 1.000 € Single / 2.000 € Verheir.
 *  - DAC7-Plattform-Meldung 30 Verkäufe oder 2.000 €
 *  - Gewerbe-Nachhaltigkeit: 3+ Wiederholungen/J = nachhaltig
 *  - GewSt-Freibetrag 24.500 €/J Einzelunternehmer/Personengesellschaft
 *  - Werbungskosten-Pauschbetrag Anlage S 102 €
 */
import { useMemo, useState, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Callout, EmptyState, Field, KitTable, ToneBadge, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  HelpCircle,
  XCircle,
  Bitcoin,
  ChevronDown,
  Coins,
  Combine,
  Dumbbell,
  HeartHandshake,
  Home,
  Laptop,
  MousePointerClick,
  Package,
  Search,
  SearchX,
  Tag,
  TrendingUp,
  Video,
  X,
} from "lucide-react";

// ============================================================================
// Stand 2026
// ============================================================================
const SCHWELLEN_2026 = {
  GRUND_FREIBETRAG_SINGLE: 12348,
  GRUND_FREIBETRAG_VERHEIRATET: 24696,
  SONSTIGE_EINKUENFTE_22_NR_3: 256,
  UEBUNGSLEITER_PAUSCHALE: 3300,
  EHRENAMTS_PAUSCHALE: 960,
  PRIV_VERAEUSSERUNG_23: 1000,
  KU_VORJAHR: 25000,
  KU_AKTUELL: 100000,
  SPARERPAUSCHBETRAG_SINGLE: 1000,
  SPARERPAUSCHBETRAG_VERHEIRATET: 2000,
  DAC7_VERKAEUFE_PA: 30,
  DAC7_UMSATZ_PA: 2000,
  GEWST_FREIBETRAG: 24500,
  WERBUNGSKOSTEN_ANLAGE_S: 102,
};

// ============================================================================
// Income-Quellen für Quick-Check
// ============================================================================
type Quelle =
  | "ebay-private"           // privater Verkauf
  | "ebay-handel"            // gewerblich
  | "freelance-side"         // freiberuflich nebenbei
  | "uebungsleiter"          // Sport-/Musik-/Bildung
  | "ehrenamt"               // Vereinsvorstand etc.
  | "crypto"                 // Bitcoin & Co
  | "kapitalertraege"        // Zinsen, Dividenden
  | "vermietung"             // V+V
  | "occasion-einnahme"      // Einzelfall, nicht wiederholbar
  | "youtube-twitch";        // Werbe-/Sponsor-Einnahmen

interface QuelleInfo {
  v: Quelle;
  label: string;
  emoji: string;
  schwelle: number;
  schwellenName: string;
  paragraph: string;
  /** Was passiert wenn unter Schwelle. */
  unterSchwelle: string;
  /** Was passiert wenn über Schwelle. */
  ueberSchwelle: string;
  /** Spezielle Stolperfalle. */
  warnung?: string;
  /** Worauf sich die Schwelle bezieht: Gewinn/Einkünfte (§23, §22 Nr. 3) oder Einnahmen/Umsatz */
  betragsArt?: "gewinn" | "einnahmen";
  /** Freigrenze mit Wortlaut "weniger als" → genau die Grenze ist schon steuerpflichtig */
  wenigerAls?: boolean;
}

const QUELLEN: QuelleInfo[] = [
  {
    v: "ebay-private",
    label: "Privater Verkauf (eBay, Vinted, Kleinanzeigen)",
    emoji: "🏷️",
    schwelle: SCHWELLEN_2026.PRIV_VERAEUSSERUNG_23,
    schwellenName: "§23 EStG Freigrenze + Spekulationsfrist 1 Jahr",
    paragraph: "§23 EStG",
    betragsArt: "gewinn",
    wenigerAls: true,
    unterSchwelle: "Gegenstände des täglichen Gebrauchs (Kleidung, Möbel, Handy, Auto) sind gar kein §23-Fall (§23 Abs. 1 Satz 1 Nr. 2 Satz 2 EStG) — ihr Verkauf ist steuerfrei. Für andere Wirtschaftsgüter (z. B. Sammlerstücke, Gold): steuerfrei wenn (a) Spekulationsfrist 1 Jahr eingehalten ODER (b) Gesamtgewinn aller §23-Geschäfte weniger als 1.000 € pro Jahr (Freigrenze, KEIN Freibetrag — ab 1.000 € Gewinn ist der volle Betrag steuerpflichtig).",
    ueberSchwelle: "Voller Gewinn steuerpflichtig mit deinem persönlichen ESt-Satz. Verluste aus §23-Geschäften können nur mit anderen §23-Gewinnen verrechnet werden (Vortrag möglich).",
    warnung: "DAC7-Meldung: Plattformen wie eBay, Vinted, Kleinanzeigen sind seit 2023 verpflichtet, das Finanzamt zu informieren wenn du ≥ 30 Verkäufe ODER ≥ 2.000 € Umsatz pro Jahr hast. Auch wenn steuerfrei — die Meldung kommt.",
  },
  {
    v: "ebay-handel",
    label: "Online-Handel (regelmäßiger Einkauf+Verkauf)",
    emoji: "📦",
    schwelle: SCHWELLEN_2026.KU_VORJAHR,
    schwellenName: "§19 UStG Kleinunternehmer 25k Vorjahr / 100k aktuell",
    paragraph: "§15 EStG + §19 UStG",
    unterSchwelle: "Gewerbeanmeldung trotzdem Pflicht (nachhaltige Gewinnerzielungsabsicht §15 EStG). Aber: USt-Kleinunternehmer-Regelung möglich — keine USt-Ausweisung, keine Vorsteuer.",
    ueberSchwelle: "Voller USt-Pflichtbetrieb: 19/7 % USt erheben, an FA abführen, monatliche/quartalsweise USt-VA. Plus weiterhin ESt + ggf. GewSt > 24.500 € Gewinn.",
    warnung: "Wer regelmäßig handelt (3+ ähnliche Verkäufe/J mit Gewinnabsicht) ist gewerblich — auch wenn 'nur Hobby'. Bei Bestriebsprüfung droht Nachzahlung für mehrere Jahre.",
  },
  {
    v: "freelance-side",
    label: "Freelance / Dienstleistung nebenbei",
    emoji: "💻",
    schwelle: SCHWELLEN_2026.KU_VORJAHR,
    schwellenName: "§19 UStG Kleinunternehmer 25k Vorjahr / 100k aktuell",
    paragraph: "§15 oder §18 EStG",
    unterSchwelle: "Anmeldung nötig (Gewerbe ODER Freiberuf §18 EStG — siehe Berufs-Check). USt-Kleinunternehmer-Regelung möglich. ESt auf Gewinn (= Einnahmen - Betriebsausgaben) im Rahmen deines persönlichen Steuersatzes.",
    ueberSchwelle: "Voller USt-Pflichtbetrieb. Bei Freiberuf trotz höherem Umsatz keine GewSt. Bei Gewerbe: GewSt ab 24.500 € Gewinn.",
    warnung: "Wenn du angestellt bist UND nebenbei freelancest: erst Arbeitgeber informieren (Wettbewerbsklauseln, NK-Recht). Bei >18 h/Woche freelance gilt das oft als 2. Hauptberuf — KV-Folgen!",
  },
  {
    v: "uebungsleiter",
    label: "Übungsleiter / Trainer / Dozent (gemeinnützig)",
    emoji: "🏃",
    schwelle: SCHWELLEN_2026.UEBUNGSLEITER_PAUSCHALE,
    schwellenName: "§3 Nr. 26 EStG Übungsleiter-Pauschale",
    paragraph: "§3 Nr. 26 EStG",
    unterSchwelle: "Bis 3.300 €/Jahr STEUER-FREI (Freibetrag, nicht Freigrenze — auch bei 3.301 € sind die ersten 3.300 € frei). Voraussetzung: nebenberuflich + gemeinnütziger Auftraggeber (Verein, gemeinnützige Org).",
    ueberSchwelle: "Nur der Betrag über 3.300 € wird besteuert. Bei Gewinnerzielungsabsicht: gewerblich oder freiberuflich (Lehrer-ähnlich) anmelden.",
    warnung: "Übungsleiter UND Ehrenamt kombinierbar! Du kannst von beiden Pauschalen profitieren (Voraussetzung: getrennte Tätigkeiten / Auftraggeber).",
  },
  {
    v: "ehrenamt",
    label: "Ehrenamt (Vereinsvorstand, Schöffe etc.)",
    emoji: "🤝",
    schwelle: SCHWELLEN_2026.EHRENAMTS_PAUSCHALE,
    schwellenName: "§3 Nr. 26a EStG Ehrenamts-Pauschale",
    paragraph: "§3 Nr. 26a EStG",
    unterSchwelle: "Bis 960 €/Jahr STEUER-FREI (Freibetrag). Voraussetzung: gemeinnützige Tätigkeit nebenberuflich.",
    ueberSchwelle: "Betrag über 960 € wird besteuert. Anmeldung nicht erforderlich solange ehrenamtlich.",
    warnung: "Ehrenamt und Übungsleiter sind KUMULIERBAR (960 + 3.300 = 4.260 € steuerfrei möglich). Aber: nur bei UNTERSCHIEDLICHEN Tätigkeiten/Auftraggebern.",
  },
  {
    v: "crypto",
    label: "Crypto-Handel (Bitcoin, Ether, NFTs)",
    emoji: "₿",
    schwelle: SCHWELLEN_2026.PRIV_VERAEUSSERUNG_23,
    schwellenName: "§23 EStG Freigrenze + Spekulationsfrist 1 Jahr",
    paragraph: "§23 EStG",
    betragsArt: "gewinn",
    wenigerAls: true,
    unterSchwelle: "Steuerfrei wenn (a) > 1 Jahr gehalten ODER (b) Gesamtgewinn < 1.000 €/Jahr (Freigrenze). FIFO-Methode für Kauf/Verkauf-Zuordnung.",
    ueberSchwelle: "Voller Gewinn steuerpflichtig mit persönlichem ESt-Satz (i.d.R. höher als die 25 % Abgeltungsteuer für Kapitalerträge). Verluste vortragbar.",
    warnung: "Staking/Lending = KEINE 10-Jahres-Frist — es bleibt bei 1 Jahr (§23 EStG; BMF 06.03.2025, BFH IX R 3/22). Plus: ab 2026 Pflicht zur Plattform-Meldung (CARF — Crypto-Asset Reporting Framework, OECD-Standard).",
  },
  {
    v: "kapitalertraege",
    label: "Kapitalerträge (Zinsen, Dividenden, ETFs)",
    emoji: "📈",
    schwelle: SCHWELLEN_2026.SPARERPAUSCHBETRAG_SINGLE,
    schwellenName: "§20 EStG Sparerpauschbetrag",
    paragraph: "§20 EStG",
    unterSchwelle: "1.000 € Single / 2.000 € verheiratet STEUER-FREI. Freistellungsauftrag bei der Bank stellen — dann Bank zieht keine 25 % Abgeltungsteuer ab.",
    ueberSchwelle: "Abgeltungsteuer 25 % + SolZ 5,5 % = 26,375 % wird direkt von Bank einbehalten. Bei niedrigerem ESt-Satz: Günstigerprüfung in Anlage KAP beantragen.",
    warnung: "Sparerpauschbetrag gilt nur für ALLE Kapitalerträge SUMMIERT. Wenn auf mehrere Banken verteilt: Freistellungsaufträge entsprechend splitten.",
  },
  {
    v: "vermietung",
    label: "Vermietung (Zimmer, Airbnb, Garage)",
    emoji: "🏠",
    schwelle: 520,
    schwellenName: "Untervermietung: Vereinfachungsgrenze 520 €/J (R 21.2 Abs. 1 EStR)",
    paragraph: "§21 EStG",
    betragsArt: "einnahmen",
    unterSchwelle: "Zimmer, Wohnung, Airbnb und Garage sind Vermietung und Verpachtung (§21 EStG), nicht §22 Nr. 3. Bei vorübergehender Untervermietung von Teilen der selbst genutzten Wohnung kann das Finanzamt aus Vereinfachungsgründen von einer Besteuerung absehen, wenn die Einnahmen 520 €/Jahr nicht übersteigen (R 21.2 Abs. 1 EStR). Die 256-€-Freigrenze des §22 Nr. 3 gilt nur für die Vermietung beweglicher Gegenstände (z. B. Auto, Werkzeug).",
    ueberSchwelle: "Anlage V (Vermietung) in Steuererklärung. Einnahmen minus Werbungskosten (AfA, Zinsen, Reparaturen, Maklergebühren) = zu versteuerndes Einkommen.",
    warnung: "Bei Airbnb / dauerhafter Touristenvermietung: zusätzlich USt-Pflicht ab 25k Umsatz UND eventuell Beherbergungssteuer der Stadt. DAC7-Meldung greift auch hier.",
  },
  {
    v: "occasion-einnahme",
    label: "Einmalige Sonstige-Einkünfte (Reichweiten-Award, kleine Tippvergütung)",
    emoji: "💰",
    schwelle: SCHWELLEN_2026.SONSTIGE_EINKUENFTE_22_NR_3,
    schwellenName: "§22 Nr. 3 EStG Sonstige-Einkünfte-Freigrenze",
    paragraph: "§22 Nr. 3 EStG",
    betragsArt: "gewinn",
    wenigerAls: true,
    unterSchwelle: "Einkünfte (Einnahmen minus Werbungskosten) von weniger als 256 €/Jahr (Freigrenze, kein Freibetrag) sind STEUER-FREI. Ab 256 € sind ALLE sonstigen Einkünfte voll steuerpflichtig.",
    ueberSchwelle: "Anlage SO (Sonstige) zur ESt-Erklärung. Voller Betrag mit persönlichem Steuersatz.",
    warnung: "Beispiele: Casino-Gewinne (umstritten), Belohnungen, kleinere Vermittlungs-Tipps. Achtung: regelmäßige Einnahmen sind keine §22 Nr. 3 mehr, sondern Gewerbe/Freiberuf.",
  },
  {
    v: "youtube-twitch",
    label: "YouTube / Twitch / TikTok (Werbe-/Sponsor-Einnahmen)",
    emoji: "🎬",
    schwelle: 0,
    schwellenName: "Sofort Gewerbe — keine Freigrenze",
    paragraph: "§15 EStG",
    unterSchwelle: "Auch der erste AdSense-Cent ist gewerblich. KEINE Freigrenze, Anmelde-Pflicht ab Tag 1 wenn nachhaltige Gewinnerzielungsabsicht.",
    ueberSchwelle: "Vollständig gewerblich. Gewerbeanmeldung + EÜR + ESt + ggf. USt + ggf. GewSt > 24.500 €.",
    warnung: "Auch wenn du 'nur Hobby-Streamer' bist: sobald Sponsorings, Affiliate-Links, AdSense, Twitch-Subs → Gewerbe. FG Berlin-Brandenburg 9 K 11900/15 klar in dieser Linie.",
  },
];

// ============================================================================
// Komponente
// ============================================================================
const SchwellenCheck = () => {
  const [selectedQuelle, setSelectedQuelle] = useState<Quelle | null>(null);
  const [eingenommen, setEingenommen] = useState(0);
  const [search, setSearch] = useState("");

  const quelle = useMemo(() => QUELLEN.find((q) => q.v === selectedQuelle) || null, [selectedQuelle]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return QUELLEN;
    return QUELLEN.filter((x) => x.label.toLowerCase().includes(q) || x.paragraph.toLowerCase().includes(q));
  }, [search]);

  const verdict = useMemo(() => {
    if (!quelle) return null;
    // Freigrenzen mit Wortlaut "weniger als" (§23 Abs. 3 Satz 5, §22 Nr. 3 Satz 2 EStG): genau die Grenze ist steuerpflichtig
    const ueber = quelle.schwelle > 0 && (quelle.wenigerAls ? eingenommen >= quelle.schwelle : eingenommen > quelle.schwelle);
    const grenze = quelle.schwellenName.includes("Freigrenze");
    return {
      ueber,
      grenze,
      info: ueber ? quelle.ueberSchwelle : quelle.unterSchwelle,
    };
  }, [quelle, eingenommen]);


  const skalaMax = quelle ? Math.max(quelle.schwelle * 2, eingenommen * 1.2) : 0;

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Side-Hustle-Schwellen: wann muss ich was melden?"
      subtitle="Alle wichtigen Freibeträge, Freigrenzen und Pflicht-Schwellen für Anfänger:innen auf einer Seite. Mit Live-Check je Einkommensquelle und Warnung zur DAC7-Plattform-Meldung."
    >
      <BeginnerHero />

      {/* === Quick-Check === */}
      <ToolLayout
        className="mb-8"
        resultFirstOnMobile={!!quelle}
        inputs={
          <ToolSection
            title="Quick-Check für deine Einkommensquelle"
            description="Wähle die Quelle, aus der dein Geld kommt."
            icon={Lightbulb}
          >
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="z.B. eBay, Crypto, Übungsleiter, YouTube, Zinsen, Airbnb …"
                aria-label="Einkommensquelle suchen"
                className="h-11 pl-9"
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              {filtered.map((q) => {
                const Icon = QUELLE_ICON[q.v];
                const aktiv = selectedQuelle === q.v;
                return (
                  <button
                    key={q.v}
                    type="button"
                    aria-pressed={aktiv}
                    onClick={() => { setSelectedQuelle(q.v); setEingenommen(0); }}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px",
                      aktiv
                        ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
                        : "border-border bg-card hover:border-foreground/25",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        aktiv ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-foreground/70",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug">{q.label}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {q.schwelle > 0 ? (
                          <>
                            Schwelle <strong className="font-semibold text-foreground tabular">{q.schwelle.toLocaleString("de-DE")} €/J</strong> · {q.paragraph}
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-danger">Keine Freigrenze</span> · {q.paragraph}
                          </>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <EmptyState
                icon={SearchX}
                className="py-8"
                title={`Keine Treffer für „${search}“`}
                description="Probier allgemeinere Begriffe wie „Crypto“, „Ehrenamt“ oder „Vermietung“."
              />
            )}
          </ToolSection>
        }
        result={
          !quelle ? (
            <EmptyState
              icon={MousePointerClick}
              className="hidden lg:flex"
              title="Noch keine Quelle gewählt"
              description="Wähle links eine Einkommensquelle. Dann siehst du die passende Schwelle, kannst deinen Jahresbetrag eintragen und bekommst die Einschätzung."
            />
          ) : (
            <>
              {/* === Detail-Check für gewählte Quelle === */}
              <section className="rounded-2xl border border-accent-blue/20 bg-card shadow-soft" aria-live="polite">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 px-5 py-4 md:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
                      {(() => {
                        const Icon = QUELLE_ICON[quelle.v];
                        return <Icon className="h-4 w-4" aria-hidden="true" />;
                      })()}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold leading-snug">{quelle.label}</h2>
                      <p className="mt-0.5 text-sm text-muted-foreground">{quelle.schwellenName}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedQuelle(null)}>
                    <X aria-hidden="true" /> Andere Quelle
                  </Button>
                </div>

                <div className="space-y-4 p-5 md:p-6">
                  {quelle.schwelle > 0 && (
                    <div>
                      <Field label={quelle.betragsArt === "gewinn" ? "Wie viel Gewinn hast du dieses Jahr gemacht? (Verkaufspreis minus Anschaffungskosten)" : "Wie viel hast du dieses Jahr eingenommen?"} htmlFor="sc-betrag">
                        <div className="relative">
                          <Input
                            id="sc-betrag"
                            type="number"
                            value={eingenommen || ""}
                            onChange={(e) => setEingenommen(Math.max(0, Number(e.target.value) || 0))}
                            placeholder="0"
                            className="h-11 pr-16 text-base tabular"
                          />
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€/Jahr</span>
                        </div>
                      </Field>
                      {/* Visuelle Schwellen-Anzeige */}
                      <div className="mt-4">
                        <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={cn("absolute inset-y-0 left-0 rounded-full transition-all", verdict?.ueber ? "bg-warning" : "bg-success")}
                            style={{ width: `${Math.min(100, (eingenommen / skalaMax) * 100)}%` }}
                          />
                          {/* Schwelle-Marker */}
                          <div className="absolute inset-y-0 w-0.5 bg-foreground" style={{ left: `${Math.min(100, (quelle.schwelle / skalaMax) * 100)}%` }} />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground tabular">
                          <span>0 €</span>
                          <span className="font-medium text-foreground">Schwelle {quelle.schwelle.toLocaleString("de-DE")} €</span>
                          <span>{skalaMax.toLocaleString("de-DE")} €</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verdict-Anzeige */}
                  {verdict && (
                    <div
                      className={cn(
                        "rounded-xl border p-4",
                        verdict.ueber ? "border-warning/30 bg-warning-soft" : "border-success/30 bg-success-soft",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {verdict.ueber ? (
                          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
                        ) : (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold tabular">
                            {verdict.ueber
                              ? `Über der Schwelle (${eingenommen.toLocaleString("de-DE")} € > ${quelle.schwelle.toLocaleString("de-DE")} €)`
                              : quelle.schwelle === 0
                              ? "Keine Freigrenze: sofort melde-/anmeldepflichtig"
                              : eingenommen === 0
                              ? "Schwelle: " + quelle.schwelle.toLocaleString("de-DE") + " € pro Jahr"
                              : `Unter der Schwelle (${eingenommen.toLocaleString("de-DE")} € ≤ ${quelle.schwelle.toLocaleString("de-DE")} €)`}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{verdict.info}</p>
                          {!verdict.ueber && verdict.grenze && eingenommen > 0 && eingenommen >= quelle.schwelle * 0.85 && (
                            <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-warning">
                              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>
                                Vorsicht: du näherst dich der Freigrenze. Erinnerung — Freigrenze ≠ Freibetrag! Schon 1 € über der Grenze macht den GESAMTEN Betrag steuerpflichtig.
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stolperfalle */}
                  {quelle.warnung && (
                    <Callout tone="danger" title="Stolperfalle" icon={XCircle}>
                      {quelle.warnung}
                    </Callout>
                  )}
                </div>
              </section>
            </>
          )
        }
      />

      {/* === Alle Schwellen-Übersicht 2026 === */}
      <ToolSection title="Alle wichtigen Schwellen 2026 auf einen Blick" icon={Info} className="mb-6">
        <KitTable caption="Schwellen, Freibeträge und Freigrenzen 2026">
          <thead>
            <tr>
              <th>Schwelle</th>
              <th>Wert 2026</th>
              <th>Typ</th>
              <th>Rechtsgrundlage</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Grundfreibetrag ESt (Single)", wert: `${SCHWELLEN_2026.GRUND_FREIBETRAG_SINGLE.toLocaleString("de-DE")} €/J`, typ: "Freibetrag", par: "§32a EStG" },
              { name: "Grundfreibetrag ESt (Verheiratet)", wert: `${SCHWELLEN_2026.GRUND_FREIBETRAG_VERHEIRATET.toLocaleString("de-DE")} €/J`, typ: "Freibetrag", par: "§32a EStG" },
              { name: "Sonstige Einkünfte Freigrenze", wert: `${SCHWELLEN_2026.SONSTIGE_EINKUENFTE_22_NR_3} €/J`, typ: "Freigrenze ⚠", par: "§22 Nr. 3 EStG" },
              { name: "Übungsleiter-Pauschale", wert: `${SCHWELLEN_2026.UEBUNGSLEITER_PAUSCHALE.toLocaleString("de-DE")} €/J`, typ: "Freibetrag", par: "§3 Nr. 26 EStG" },
              { name: "Ehrenamts-Pauschale", wert: `${SCHWELLEN_2026.EHRENAMTS_PAUSCHALE} €/J`, typ: "Freibetrag", par: "§3 Nr. 26a EStG" },
              { name: "Privates Veräußerungsgeschäft (Crypto, Antiquitäten)", wert: `${SCHWELLEN_2026.PRIV_VERAEUSSERUNG_23.toLocaleString("de-DE")} €/J`, typ: "Freigrenze ⚠", par: "§23 EStG" },
              { name: "Kleinunternehmer Vorjahres-Umsatz", wert: `${SCHWELLEN_2026.KU_VORJAHR.toLocaleString("de-DE")} €/J`, typ: "Schwelle", par: "§19 UStG" },
              { name: "Kleinunternehmer aktueller Umsatz", wert: `${SCHWELLEN_2026.KU_AKTUELL.toLocaleString("de-DE")} €/J`, typ: "Schwelle", par: "§19 UStG" },
              { name: "Sparerpauschbetrag (Single)", wert: `${SCHWELLEN_2026.SPARERPAUSCHBETRAG_SINGLE.toLocaleString("de-DE")} €/J`, typ: "Freibetrag", par: "§20 EStG" },
              { name: "Sparerpauschbetrag (Verheiratet)", wert: `${SCHWELLEN_2026.SPARERPAUSCHBETRAG_VERHEIRATET.toLocaleString("de-DE")} €/J`, typ: "Freibetrag", par: "§20 EStG" },
              { name: "DAC7-Plattform-Meldung Verkäufe", wert: `${SCHWELLEN_2026.DAC7_VERKAEUFE_PA} /J`, typ: "Meldungs-Schwelle", par: "DAC7 RL (EU 2021/514)" },
              { name: "DAC7-Plattform-Meldung Umsatz", wert: `${SCHWELLEN_2026.DAC7_UMSATZ_PA.toLocaleString("de-DE")} €/J`, typ: "Meldungs-Schwelle", par: "DAC7 RL (EU 2021/514)" },
              { name: "GewSt-Freibetrag Einzelunternehmer", wert: `${SCHWELLEN_2026.GEWST_FREIBETRAG.toLocaleString("de-DE")} €/J Gewinn`, typ: "Freibetrag", par: "§11 GewStG" },
              { name: "Werbungskosten-Pauschbetrag (sonstige Einkünfte/Renten, Anlage SO/R)", wert: `${SCHWELLEN_2026.WERBUNGSKOSTEN_ANLAGE_S} €/J`, typ: "Pauschbetrag", par: "§9a S.1 Nr.3 EStG" },
            ].map((row, i) => (
              <tr key={i}>
                <td className="min-w-48 font-medium">{row.name}</td>
                <td className="whitespace-nowrap">{row.wert}</td>
                <td>
                  <ToneBadge tone={row.typ.startsWith("Freigrenze") ? "warning" : row.typ === "Freibetrag" ? "success" : "neutral"} className="whitespace-nowrap">
                    {row.typ}
                  </ToneBadge>
                </td>
                <td className="whitespace-nowrap text-muted-foreground">{row.par}</td>
              </tr>
            ))}
          </tbody>
        </KitTable>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Freibetrag</strong> = Beträge bis Schwelle steuerfrei, darüber NUR Mehrbetrag versteuern · <strong className="text-foreground">Freigrenze</strong> = bei Überschreitung wird der GESAMTE Betrag steuerpflichtig (tückisch!).
        </p>
      </ToolSection>

      {/* === Kombinations-Hinweise === */}
      <ToolSection title="Kombinations-Hinweise: was geht zusammen, was nicht" icon={Combine} className="mb-6">
        <ul className="divide-y divide-border/70 text-sm leading-relaxed">
          <KombiZeile tone="success">
            <strong className="text-foreground">Übungsleiter (3.300 €) + Ehrenamt (960 €)</strong> kumulierbar bei unterschiedlichen Tätigkeiten → 4.260 € steuerfrei möglich
          </KombiZeile>
          <KombiZeile tone="danger">
            <strong className="text-foreground">§22 Nr. 3 Sonstige (256 €) + Gewerbe</strong> nicht kumulierbar — sobald nachhaltig → Gewerbe
          </KombiZeile>
          <KombiZeile tone="warning">
            <strong className="text-foreground">Kleinunternehmer + Freiberuf</strong> = ja. Abfärbetheorie (§15 Abs. 3 Nr. 1 EStG) gilt nur für Personengesellschaften (GbR, PartG): dort macht gewerbliche Nebentätigkeit ALLES gewerblich. Als Einzelunternehmer:in kannst du Freiberuf und Gewerbe getrennt führen (getrennte Aufzeichnungen)
          </KombiZeile>
          <KombiZeile tone="warning">
            <strong className="text-foreground">Sparerpauschbetrag (1.000 €) + Crypto-Freigrenze (1.000 €)</strong> sind separat — du kannst beide voll nutzen
          </KombiZeile>
          <KombiZeile tone="success">
            <strong className="text-foreground">Hauptberuf-Anstellung + nebenberuflicher Side-Hustle</strong> → separate Anlage S/G, ESt-Progression auf Summe. Sozial-Versicherungs-rechtlich: nur wenn nebenberuf {">"} 50 % Hauptberuf-Brutto wird er pflichtversichert.
          </KombiZeile>
        </ul>
      </ToolSection>

      {/* === Cross-Links === */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {[
          { to: "/cockpit/gewerbe-check", t: "Brauche ich ein Gewerbe?", d: "Entscheidungsbaum für Anfänger:innen" },
          { to: "/cockpit/ust-rechner", t: "USt-Rechner (KU §19 und mehr)", d: "5 Tabs für USt-Spezialfälle" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
          >
            <span>
              <span className="block text-sm font-semibold">{l.t}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{l.d}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§22 Nr. 3 EStG Sonstige Einkünfte", url: "https://www.gesetze-im-internet.de/estg/__22.html" },
          { label: "§3 Nr. 26 EStG Übungsleiter-Pauschale", url: "https://www.gesetze-im-internet.de/estg/__3.html" },
          { label: "§23 EStG Private Veräußerungsgeschäfte", url: "https://www.gesetze-im-internet.de/estg/__23.html" },
          { label: "§19 UStG Kleinunternehmer (Reform 2025)", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
          { label: "DAC7 EU-Richtlinie 2021/514 (Plattform-Meldung)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32021L0514" },
          { label: "§32a EStG Einkommensteuer-Tarif 2026", url: "https://www.gesetze-im-internet.de/estg/__32a.html" },
        ]}
        note="Schwellen sind Stand Mai 2026 nach aktuellem Gesetzesstand. Bei Reform-Maßnahmen (z.B. Riester-Nachfolge ab 2027) können sich Werte ändern. Im Zweifel: schriftliche Anfrage beim FA oder Steuerberater-Erstgespräch."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components (Anfänger-Layout-Pattern)
// ============================================================================
const QUELLE_ICON: Record<Quelle, ElementType> = {
  "ebay-private": Tag,
  "ebay-handel": Package,
  "freelance-side": Laptop,
  uebungsleiter: Dumbbell,
  ehrenamt: HeartHandshake,
  crypto: Bitcoin,
  kapitalertraege: TrendingUp,
  vermietung: Home,
  "occasion-einnahme": Coins,
  "youtube-twitch": Video,
};

const KombiZeile = ({ tone, children }: { tone: "success" | "warning" | "danger"; children: ReactNode }) => {
  const Icon = tone === "success" ? CheckCircle2 : tone === "danger" ? XCircle : AlertTriangle;
  return (
    <li className="flex gap-3 py-3 text-muted-foreground first:pt-0 last:pb-0">
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", tone === "success" ? "text-success" : tone === "danger" ? "text-danger" : "text-warning")}
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
};

const BeginnerHero = () => (
  <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
    <h2 className="text-base font-semibold tracking-tight">Was ist das hier?</h2>
    <p className="mt-1.5 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
      Du fragst dich: „Wenn ich nur 200 € nebenbei verdiene — muss ich das versteuern?" oder „Mein Verein zahlt mir 500 € Übungsleiter-Honorar — steuerfrei?". Dieses Tool zeigt dir alle relevanten Freibeträge und Freigrenzen für Side-Hustles, plus die DAC7-Plattform-Meldepflicht (gilt seit 2023 für eBay, Vinted etc.).
    </p>
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-success/25 bg-success-soft p-3.5">
        <p className="flex items-center gap-2 text-sm font-semibold text-success">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Freibetrag
        </p>
        <p className="mt-1 text-sm text-foreground/75">Beträge bis Schwelle steuerfrei, NUR der Mehrbetrag wird besteuert. Beispiel: Übungsleiter 3.500 € → 200 € steuerpflichtig (Freibetrag 3.300 € seit 2026).</p>
      </div>
      <div className="rounded-xl border border-warning/25 bg-warning-soft p-3.5">
        <p className="flex items-center gap-2 text-sm font-semibold text-warning">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Freigrenze
        </p>
        <p className="mt-1 text-sm text-foreground/75">Bei Überschreitung wird der GESAMTE Betrag steuerpflichtig. Beispiel: §23 EStG 1.001 € Crypto-Gewinn → ALLE 1.001 € steuerpflichtig.</p>
      </div>
    </div>
  </section>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
      {[
        { begriff: "Freibetrag vs. Freigrenze", erklaerung: "Freibetrag (z.B. Übungsleiter 3.300 €): bis Schwelle steuerfrei, NUR der Mehrbetrag wird besteuert. Freigrenze (z.B. §23 EStG 1.000 €): bei Überschreitung wird der GESAMTE Betrag steuerpflichtig — extrem tückisch! Schon 1 € drüber → alles versteuert." },
        { begriff: "§22 Nr. 3 EStG (Sonstige Einkünfte)", erklaerung: "Auffangtatbestand für gelegentliche Einnahmen, die kein Lohn / Gewinn aus Selbstständigkeit / Kapitalertrag etc. sind. 256 €/J Freigrenze. Beispiele: Vermittlungs-Tipps, Reichweiten-Awards, gelegentliche Vermietung." },
        { begriff: "§3 Nr. 26 EStG (Übungsleiter-Pauschale)", erklaerung: "3.300 €/Jahr Freibetrag für nebenberufliche pädagogische / künstlerische / pflegerische Tätigkeit bei gemeinnützigen Auftraggebern. Typisch: Sport-Trainer im Verein, Yoga-Kurse Volkshochschule, Nachhilfe Schule." },
        { begriff: "§3 Nr. 26a EStG (Ehrenamtspauschale)", erklaerung: "960 €/Jahr Freibetrag für nebenberufliche ehrenamtliche Tätigkeit bei gemeinnützigen Organisationen. Kombinierbar mit Übungsleiter-Pauschale bei unterschiedlichen Tätigkeiten." },
        { begriff: "§23 EStG (Privates Veräußerungsgeschäft)", erklaerung: "Gewinne aus dem Verkauf von Privatvermögen (Crypto, Antiquitäten, Gold). Steuerfrei wenn (a) >1 Jahr gehalten ODER (b) Gesamtgewinn aller §23-Geschäfte unter 1.000 €/J. Bei Immobilien: 10 Jahre Haltefrist." },
        { begriff: "DAC7 (EU-Plattform-Meldepflicht)", erklaerung: "EU-Richtlinie 2021/514, seit 2023 in Kraft. Plattformen wie eBay, Vinted, Kleinanzeigen, Airbnb, Uber müssen das FA informieren bei ≥ 30 Verkäufen ODER ≥ 2.000 € Umsatz pro Jahr. Auch wenn deine Verkäufe steuerfrei sind — die Meldung kommt." },
        { begriff: "Sparerpauschbetrag §20 EStG", erklaerung: "1.000 € Single / 2.000 € Verheiratet steuerfreier Kapitalertrag. Freistellungsauftrag bei jeder Bank stellen, damit keine 25 % Abgeltungsteuer einbehalten wird. Bei mehreren Banken: Aufträge entsprechend splitten." },
        { begriff: "Nachhaltige Gewinnerzielungsabsicht", erklaerung: "Kern-Kriterium für 'Gewerbe' nach §15 EStG. Du planst, auf Dauer Gewinn zu machen (auch wenn die ersten Jahre Verluste). Faustregel FA: bei 3+ Wiederholungen pro Jahr von ähnlichen Geschäften → nachhaltig." },
        { begriff: "Abgeltungsteuer", erklaerung: "Pauschale 25 % Steuer auf Kapitalerträge (Zinsen, Dividenden, ETF-Gewinne) plus 5,5 % Solidaritätszuschlag = effektiv 26,375 %. Wird i.d.R. direkt von der Bank einbehalten und abgeführt. Bei niedrigem persönlichen Steuersatz: Günstigerprüfung in Anlage KAP." },
        { begriff: "CARF (Crypto-Asset Reporting Framework)", erklaerung: "OECD-Standard für Krypto-Meldepflicht ähnlich DAC7 für klassische Plattformen. Greift schrittweise ab 2025/26 — Crypto-Börsen müssen das FA informieren. Auch internationale Börsen wie Binance, Coinbase betroffen." },
      ].map((g) => (
        <div key={g.begriff} className="py-4">
          <dt className="text-sm font-semibold">{g.begriff}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.erklaerung}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default SchwellenCheck;
