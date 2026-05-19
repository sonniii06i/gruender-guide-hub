/**
 * FreiberufCheck — "Bin ich Freiberufler oder Gewerbe?"
 *
 * Tool 2 der Anfänger-Wave (Starter-Kategorie).
 * Präziser Katalogberufe-Check §18 EStG mit Edge-Cases:
 *  - 4 Katalog-Gruppen (Heilberufe / Rechts-Steuer / Technisch / Erziehung-Medien)
 *  - "Ähnliche Berufe"-Logik (BFH-Rechtsprechung)
 *  - Berufs-Qualifikation als zweite Hürde (z.B. "Unternehmensberater" nur mit BWL/VWL)
 *  - Edge-Cases: Influencer, YouTuber, Online-Coaches, IT-ohne-Studium, gemischte Tätigkeit
 *  - Abfärbetheorie §15 Abs. 3 Nr. 1 EStG bei gemischter Tätigkeit
 *
 * Layout: gleiches Anfänger-Pattern wie GewerbeCheck (BeginnerHero, Step-Wizard,
 * Erklär-Boxen, Ergebnis-Karte, Next-Steps, Glossar, Stand2026Footer).
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Sparkles,
  Search,
} from "lucide-react";

// ============================================================================
// KATALOG §18 EStG + Edge-Cases (Stand 2026 + BFH-Rechtsprechung)
// ============================================================================

type Gruppe = "heil" | "rechts" | "technisch" | "medien" | "edge";
type FreiberufKlassifikation = "katalog" | "aehnlich" | "edge-frei" | "edge-gewerbe" | "unklar";

interface Beruf {
  slug: string;
  name: string;
  gruppe: Gruppe;
  klass: FreiberufKlassifikation;
  /** Berufs-Anforderung: braucht es ein Studium oder Ausbildung? */
  qualifikation?: string;
  /** Was sagt das FA / die BFH-Rechtsprechung? */
  bfh?: string;
  /** Stolperfallen / Borderline-Indikatoren */
  warnung?: string;
}

const BERUFE: Beruf[] = [
  // === Heilberufe §18 Abs. 1 Nr. 1 ===
  { slug: "arzt", name: "Arzt / Ärztin", gruppe: "heil", klass: "katalog", qualifikation: "Approbation" },
  { slug: "zahnarzt", name: "Zahnarzt / Zahnärztin", gruppe: "heil", klass: "katalog", qualifikation: "Approbation" },
  { slug: "tierarzt", name: "Tierarzt / Tierärztin", gruppe: "heil", klass: "katalog", qualifikation: "Approbation" },
  { slug: "heilpraktiker", name: "Heilpraktiker:in", gruppe: "heil", klass: "katalog", qualifikation: "amtliche Erlaubnis" },
  { slug: "physio", name: "Physiotherapeut:in", gruppe: "heil", klass: "katalog", qualifikation: "staatl. anerkannte Ausbildung" },
  { slug: "logopaede", name: "Logopäde / Logopädin", gruppe: "heil", klass: "katalog", qualifikation: "staatl. anerkannte Ausbildung" },
  { slug: "hebamme", name: "Hebamme / Entbindungspfleger", gruppe: "heil", klass: "katalog", qualifikation: "staatl. anerkannte Ausbildung" },
  { slug: "psychotherapeut", name: "Psychotherapeut:in (approbiert)", gruppe: "heil", klass: "katalog", qualifikation: "Approbation", warnung: "Coaches ohne Approbation = i.d.R. Gewerbe!" },
  { slug: "krankengymnast", name: "Krankengymnast:in / Masseur:in (med.)", gruppe: "heil", klass: "katalog", qualifikation: "staatl. anerkannte Ausbildung" },
  { slug: "ergotherapeut", name: "Ergotherapeut:in", gruppe: "heil", klass: "katalog", qualifikation: "staatl. anerkannte Ausbildung" },

  // === Rechts-, Steuer-, Wirtschaftsberatung ===
  { slug: "anwalt", name: "Rechtsanwalt / -anwältin", gruppe: "rechts", klass: "katalog", qualifikation: "Zulassung BRAK" },
  { slug: "notar", name: "Notar:in", gruppe: "rechts", klass: "katalog", qualifikation: "Bestellung" },
  { slug: "patentanwalt", name: "Patentanwalt / -anwältin", gruppe: "rechts", klass: "katalog", qualifikation: "Zulassung" },
  { slug: "steuerberater", name: "Steuerberater:in", gruppe: "rechts", klass: "katalog", qualifikation: "Bestellung" },
  { slug: "wp", name: "Wirtschaftsprüfer:in", gruppe: "rechts", klass: "katalog", qualifikation: "Bestellung" },
  { slug: "vereidigter-buchpr", name: "Vereidigter Buchprüfer", gruppe: "rechts", klass: "katalog", qualifikation: "Bestellung" },
  { slug: "unternehmensberater", name: "Unternehmensberater:in (beratender Volks-/Betriebswirt)", gruppe: "rechts", klass: "katalog", qualifikation: "BWL/VWL-Studium o.ä.", warnung: "OHNE einschlägiges Studium → meist GEWERBE (BFH IV R 71/96)" },
  { slug: "steuerbevollmaechtigte", name: "Steuerbevollmächtigte:r", gruppe: "rechts", klass: "katalog", qualifikation: "Bestellung" },

  // === Technische / naturwissenschaftliche Berufe ===
  { slug: "ingenieur", name: "Ingenieur:in", gruppe: "technisch", klass: "katalog", qualifikation: "Ingenieur-Studium" },
  { slug: "architekt", name: "Architekt:in", gruppe: "technisch", klass: "katalog", qualifikation: "Studium + Kammer" },
  { slug: "vermessungsing", name: "Vermessungsingenieur:in", gruppe: "technisch", klass: "katalog", qualifikation: "Studium" },
  { slug: "lotse", name: "Lotse / Lotsin", gruppe: "technisch", klass: "katalog", qualifikation: "Patent" },
  { slug: "handelschemiker", name: "Handelschemiker:in", gruppe: "technisch", klass: "katalog", qualifikation: "Chemie-Studium" },

  // === Erziehung, Bildung, Medien ===
  { slug: "lehrer", name: "Lehrer:in / Dozent:in (selbständig)", gruppe: "medien", klass: "katalog", warnung: "Bei reinem 'Coaching' ohne pädagogischen Lehrstoff: oft Gewerbe!" },
  { slug: "erzieher", name: "Erzieher:in (selbständig)", gruppe: "medien", klass: "katalog" },
  { slug: "journalist", name: "Journalist:in", gruppe: "medien", klass: "katalog", warnung: "Bei Affiliate-Marketing/Display-Ads kommt 'Abfärbung' zum Gewerbe!" },
  { slug: "bildberichterstatter", name: "Bildberichterstatter:in / Fotojournalist:in", gruppe: "medien", klass: "katalog" },
  { slug: "dolmetscher", name: "Dolmetscher:in", gruppe: "medien", klass: "katalog" },
  { slug: "uebersetzer", name: "Übersetzer:in", gruppe: "medien", klass: "katalog" },
  { slug: "kuenstler", name: "Künstler:in (Malerei, Bildhauerei, Musik, Schauspiel)", gruppe: "medien", klass: "katalog", warnung: "KSK-Pflicht prüfen — Bund übernimmt 50% KV-Beiträge!" },
  { slug: "schriftsteller", name: "Schriftsteller:in / Autor:in", gruppe: "medien", klass: "katalog" },

  // === "Ähnliche Berufe" — BFH-anerkannt ===
  { slug: "programmierer-studium", name: "Software-Entwickler:in MIT (IT-/Informatik-)Studium", gruppe: "technisch", klass: "aehnlich", qualifikation: "Informatik-/Mathe-Studium o.ä.", bfh: "BFH IV R 16/01 (2003): Programmierer ähnlich Ingenieur" },
  { slug: "programmierer-autodidakt", name: "Software-Entwickler:in OHNE Studium (Autodidakt)", gruppe: "technisch", klass: "aehnlich", qualifikation: "nachweisbare Tiefe (Projekt-Portfolio, Vorträge)", bfh: "BFH VIII R 4/00: Autodidakten anerkannt wenn vergleichbares Niveau nachgewiesen", warnung: "FA prüft Tiefe und Komplexität der Tätigkeit — kein simples Coden, sondern System-Design / Architektur" },
  { slug: "datenwissenschaftler", name: "Data Scientist / ML-Engineer", gruppe: "technisch", klass: "aehnlich", qualifikation: "Studium o.ä.", bfh: "Tendenz analog Programmierer-Rechtsprechung" },
  { slug: "ux-designer", name: "UX-/Web-Designer:in", gruppe: "medien", klass: "aehnlich", warnung: "Wenn primär gestalterisch-künstlerisch: Freiberuf · wenn primär Marketing/SEO: Gewerbe" },

  // === Edge-Cases: Eindeutig GEWERBE (auch wenn es 'kreativ' aussieht) ===
  { slug: "influencer", name: "Influencer / Social-Media-Creator", gruppe: "edge", klass: "edge-gewerbe", warnung: "Werbe-/Affiliate-Einnahmen sind eindeutig gewerblich (FG Berlin-Brandenburg 9 K 11900/15). Auch wenn die Inhalte kreativ sind." },
  { slug: "youtuber", name: "YouTuber:in (mit AdSense)", gruppe: "edge", klass: "edge-gewerbe", warnung: "AdSense-Einnahmen + Sponsored Content = Gewerbe. Reine Kunst-/Musik-Kanäle ohne Werbe-Schaltung können freiberuflich sein." },
  { slug: "lifecoach", name: "Life-/Mental-Coach ohne Approbation", gruppe: "edge", klass: "edge-gewerbe", warnung: "Ohne anerkannte Heilkunde-Ausbildung kein Heilberuf — i.d.R. Gewerbe." },
  { slug: "online-marketer", name: "Online-Marketer / Social-Media-Manager", gruppe: "edge", klass: "edge-gewerbe", warnung: "Vertriebs-/Marketing-Dienstleistung = Gewerbe. Nicht journalistisch, nicht künstlerisch i.S.d. §18." },
  { slug: "seo-berater", name: "SEO-/SEA-Berater", gruppe: "edge", klass: "edge-gewerbe", warnung: "Auch mit IT-Hintergrund: SEO ist Marketing → Gewerbe. BFH-Linie konsistent." },
  { slug: "dropshipping", name: "Dropshipping / Online-Handel", gruppe: "edge", klass: "edge-gewerbe", warnung: "Klassischer Handel — immer Gewerbe." },
  { slug: "amazon-fba", name: "Amazon FBA / Marketplace-Seller", gruppe: "edge", klass: "edge-gewerbe", warnung: "Handel mit Produkten = Gewerbe (auch wenn 'online')." },
  { slug: "affiliate", name: "Affiliate-Marketer / Performance-Marketing", gruppe: "edge", klass: "edge-gewerbe", warnung: "Provisions-basiertes Marketing = Gewerbe." },
  { slug: "fitness-trainer", name: "Fitness-/Personal-Trainer ohne Ausbildung", gruppe: "edge", klass: "edge-gewerbe", warnung: "Ohne staatl. anerkannte Ausbildung (DOSB, etc.) → meist Gewerbe. Mit Sport-/Pädagogik-Studium: Lehrer-ähnlich → Freiberuf." },
  { slug: "yoga-meditation-trainer", name: "Yoga-/Meditationslehrer:in mit anerkannter Ausbildung", gruppe: "edge", klass: "edge-frei", warnung: "Mit 200h+ Yoga-Alliance-Cert oder vergleichbarer pädagogischer Ausbildung: Freiberuf (Lehrer-ähnlich)." },
  { slug: "blogger-kreativ", name: "Blogger:in / Newsletter-Autor:in (KEINE Werbung)", gruppe: "edge", klass: "edge-frei", warnung: "Nur wenn ausschließlich kreatives Schreiben ohne Affiliate/Display-Ads → Journalist-ähnlich → Freiberuf. Sobald Werbe-/Sponsoreinnahmen: Abfärbung zum Gewerbe." },
];

const GRUPPEN_LABEL: Record<Gruppe, string> = {
  heil: "🏥 Heilberufe",
  rechts: "⚖️ Recht / Steuer / Wirtschaft",
  technisch: "🔬 Technisch / Naturwissenschaftlich",
  medien: "🎨 Erziehung / Bildung / Medien",
  edge: "⚡ Grenzfälle / Edge-Cases (BFH-Praxis)",
};

const KLASS_LABEL: Record<FreiberufKlassifikation, { l: string; farbe: string }> = {
  katalog: { l: "Katalog §18 EStG", farbe: "bg-blue-500/10 text-blue-700" },
  aehnlich: { l: "Ähnlicher Beruf (BFH-anerkannt)", farbe: "bg-cyan-500/10 text-cyan-700" },
  "edge-frei": { l: "Edge — i.d.R. Freiberuf", farbe: "bg-emerald-500/10 text-emerald-700" },
  "edge-gewerbe": { l: "Edge — i.d.R. Gewerbe", farbe: "bg-amber-500/10 text-amber-700" },
  unklar: { l: "Einzelfall-Prüfung", farbe: "bg-secondary text-muted-foreground" },
};

// ============================================================================
// Komponente
// ============================================================================
type Mode = "browse" | "wizard";
type WizardKriterium = {
  qualifikationVorhanden?: boolean;
  selbstaendig?: boolean;
  persönlichErbracht?: boolean;
  gemischteEinkuenfte?: boolean;
};

const FreiberufCheck = () => {
  const [mode, setMode] = useState<Mode>("browse");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [kriterien, setKriterien] = useState<WizardKriterium>({});

  const selected = useMemo(() => BERUFE.find((b) => b.slug === selectedSlug) || null, [selectedSlug]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return BERUFE;
    return BERUFE.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.gruppe.toLowerCase().includes(q) ||
        (b.qualifikation || "").toLowerCase().includes(q) ||
        (b.warnung || "").toLowerCase().includes(q),
    );
  }, [search]);

  const byGruppe = useMemo(() => {
    const grouped: Record<Gruppe, Beruf[]> = { heil: [], rechts: [], technisch: [], medien: [], edge: [] };
    for (const b of filtered) grouped[b.gruppe].push(b);
    return grouped;
  }, [filtered]);

  // Verdict basiert auf selected + Kriterien-Check
  const verdict = useMemo(() => {
    if (!selected) return null;
    const { klass, warnung, bfh, qualifikation, name } = selected;

    // Eindeutige Katalogberufe — wenn Qualifikation bestätigt
    if (klass === "katalog") {
      if (kriterien.qualifikationVorhanden === false) {
        return {
          type: "ohne-qualifikation",
          farbe: "amber" as const,
          titel: `${name} OHNE die nötige Qualifikation → meist GEWERBE`,
          begruendung: `Für ${name} ist üblicherweise die Voraussetzung: ${qualifikation || "spezielle Qualifikation"}. Ohne diese Voraussetzung ordnet das FA die Tätigkeit i.d.R. dem Gewerbebetrieb zu, weil der gesetzliche Berufsstand nicht erreicht ist.`,
          nextSteps: [
            { text: "Gewerbeanmeldung beim örtlichen Gewerbeamt (15-65 €)" },
            { text: "Fragebogen zur steuerlichen Erfassung via ELSTER (1 Monat-Frist)", extern: "https://www.elster.de" },
            { text: "Falls strittig: Erstgespräch beim Steuerberater (oft kostenlos)", route: "/cockpit/stb-finder" },
          ],
        };
      }
      return {
        type: "freiberuf-katalog",
        farbe: "blau" as const,
        titel: `${name} = Freiberuf (Katalog §18 EStG)`,
        begruendung: `${name} ist im Katalog des §18 Abs. 1 Nr. 1 EStG ausdrücklich genannt. Keine Gewerbeanmeldung nötig. Du brauchst nur die steuerliche Erfassung beim FA (Fragebogen via ELSTER). ${qualifikation ? `Voraussetzung: ${qualifikation}.` : ""} ${warnung ? `\n⚠ Achtung: ${warnung}` : ""}`,
        nextSteps: [
          { text: "Fragebogen zur steuerlichen Erfassung via ELSTER (1 Monat-Frist)", extern: "https://www.elster.de" },
          { text: "Keine IHK-/HWK-Pflichtmitgliedschaft (Freiberufler:innen)" },
          { text: "Berufsgenossenschaft prüfen (Heilberufe oft Pflicht)" },
          { text: "Künstlersozialkasse prüfen: Bund übernimmt 50% KV-Beiträge", extern: "https://www.kuenstlersozialkasse.de" },
          { text: "USt-Rechner für §19 Kleinunternehmer", route: "/cockpit/ust-rechner" },
        ],
      };
    }

    // Ähnliche Berufe — BFH-anerkannt
    if (klass === "aehnlich") {
      if (kriterien.qualifikationVorhanden === false && selected.slug === "programmierer-autodidakt") {
        return {
          type: "autodidakt-pruefung",
          farbe: "amber" as const,
          titel: `${name} → Einzelfall-Prüfung durch FA nötig`,
          begruendung: `Autodidakten können freiberuflich sein, wenn das FA das Niveau als 'ingenieurähnlich' anerkennt. Nachweise: komplexe Projekte, System-Architektur, Vorträge, Open-Source-Beiträge. Bei reinem 'Frontend-Coding' / WordPress-Setup tendenziell Gewerbe.`,
          nextSteps: [
            { text: "Schriftliche Anfrage beim FA: 'Beurteilung freiberufliche Tätigkeit als Software-Entwickler:in' mit Projekt-Portfolio" },
            { text: "BFH VIII R 4/00: Autodidakten-Anerkennung bei vergleichbarem Niveau" },
            { text: "Im Zweifel zunächst freiberuflich anmelden — Umdeklaration bei späterer Prüfung möglich" },
            { text: "Steuerberater-Erstgespräch (oft kostenlos)", route: "/cockpit/stb-finder" },
          ],
        };
      }
      return {
        type: "freiberuf-aehnlich",
        farbe: "blau" as const,
        titel: `${name} = ähnlicher Beruf — meist Freiberuf`,
        begruendung: `${name} ist BFH-anerkannt als 'Beruf ähnlich' zu Katalog-Berufen (§18 Abs. 1 Nr. 1 EStG). ${bfh ? `Quelle: ${bfh}.` : ""} ${warnung ? `\n⚠ ${warnung}` : ""}`,
        nextSteps: [
          { text: "Fragebogen zur steuerlichen Erfassung via ELSTER (1 Monat-Frist)", extern: "https://www.elster.de" },
          { text: "Keine IHK-Pflichtmitgliedschaft" },
          { text: "Bei FA-Anfrage zur Einordnung: BFH-Urteil als Quelle nennen" },
          { text: "USt-Rechner §19 Kleinunternehmer", route: "/cockpit/ust-rechner" },
        ],
      };
    }

    // Edge-Cases: i.d.R. Gewerbe
    if (klass === "edge-gewerbe") {
      return {
        type: "gewerbe-edge",
        farbe: "amber" as const,
        titel: `${name} → eindeutig Gewerbe (auch wenn online/kreativ)`,
        begruendung: `${warnung || "Diese Tätigkeit ist nicht im §18 Katalog erfasst und auch kein 'ähnlicher Beruf'."} Du musst beim Gewerbeamt anmelden (15-65 € je Stadt). GewSt erst bei Gewinn > 24.500 €/Jahr.`,
        nextSteps: [
          { text: "Gewerbeanmeldung beim örtlichen Gewerbeamt (15-65 €)" },
          { text: "Fragebogen zur steuerlichen Erfassung via ELSTER", extern: "https://www.elster.de" },
          { text: "IHK-Pflichtmitgliedschaft (automatisch). Befreiung §3 IHKG bei Gewinn < 25k €/J" },
          { text: "Berufsgenossenschaft anmelden binnen 1 Woche (§192 SGB VII)" },
          { text: "USt-Rechner §19 Kleinunternehmer prüfen", route: "/cockpit/ust-rechner" },
          { text: "Frist-Kalender personalisieren", route: "/cockpit/steuer" },
        ],
      };
    }

    // Edge-Cases: i.d.R. Freiberuf
    if (klass === "edge-frei") {
      return {
        type: "freiberuf-edge",
        farbe: "blau" as const,
        titel: `${name} → eindeutig Freiberuf`,
        begruendung: `${warnung || ""} Du brauchst kein Gewerbe — nur den Fragebogen beim FA. Wichtig: bei zusätzlichen Einnahmequellen (z.B. Affiliate-Marketing) droht 'Abfärbung' zum Gewerbe (§15 Abs. 3 Nr. 1 EStG).`,
        nextSteps: [
          { text: "Fragebogen zur steuerlichen Erfassung via ELSTER", extern: "https://www.elster.de" },
          { text: "Bei zusätzlichen gewerblichen Einnahmen: zweite Anmeldung als Gewerbe (Trennung der Einnahmen) — sonst Abfärbung" },
          { text: "USt-Rechner §19 Kleinunternehmer", route: "/cockpit/ust-rechner" },
        ],
      };
    }

    return null;
  }, [selected, kriterien]);

  // Abfärbetheorie-Warnung bei gemischter Tätigkeit
  const abfaerbungWarnung = kriterien.gemischteEinkuenfte === true && selected?.klass !== "edge-gewerbe";

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Freiberuf vs. Gewerbe — präziser Berufs-Check"
      subtitle="50+ Berufe mit Katalog §18 EStG + ähnliche Berufe (BFH-Rechtsprechung) + Edge-Cases (YouTuber, Coaches, IT-Autodidakten). Mit Qualifikations-Check und Abfärbetheorie-Warnung bei gemischter Tätigkeit."
    >
      {/* === BeginnerHero === */}
      <BeginnerHero />

      {/* === Mode-Switch: Browse vs Wizard === */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("browse"); setSelectedSlug(null); }}
          className={`flex-1 rounded-xl border p-3 text-left transition ${mode === "browse" ? "border-accent-blue bg-accent-blue/5" : "border-border bg-card hover:bg-secondary/30"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Search className="h-4 w-4 text-accent-blue" />
            <span className="font-semibold text-sm">Beruf suchen</span>
          </div>
          <div className="text-[11px] text-muted-foreground">Direkt nach deinem Beruf suchen — du weißt schon ungefähr was du tust</div>
        </button>
      </div>

      {/* === Suche === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 z.B. Programmierer, Coach, Anwalt, YouTuber, Übersetzer, Yoga, FBA, …"
          className="h-11 text-base"
          autoFocus
        />
        {search.trim() && (
          <div className="text-[11px] text-muted-foreground mt-2">
            {filtered.length} Treffer · klicke einen Beruf für die Detail-Analyse
          </div>
        )}
      </div>

      {/* === Berufsliste nach Gruppe === */}
      {!selected && (
        <div className="space-y-4 mb-6">
          {(Object.keys(GRUPPEN_LABEL) as Gruppe[]).map((g) => {
            const list = byGruppe[g];
            if (list.length === 0) return null;
            return (
              <div key={g} className="rounded-2xl border border-border bg-card p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  {GRUPPEN_LABEL[g]}
                  <span className="text-[10px] text-muted-foreground font-normal">({list.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {list.map((b) => (
                    <button
                      key={b.slug}
                      onClick={() => { setSelectedSlug(b.slug); setKriterien({}); }}
                      className="text-left rounded-xl border border-border bg-secondary/20 hover:border-accent-blue hover:bg-accent-blue/5 p-3 transition"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-semibold text-sm flex-1 leading-tight">{b.name}</div>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap ${KLASS_LABEL[b.klass].farbe}`}>
                          {KLASS_LABEL[b.klass].l}
                        </span>
                      </div>
                      {b.qualifikation && (
                        <div className="text-[10px] text-muted-foreground">📜 {b.qualifikation}</div>
                      )}
                      {b.warnung && (
                        <div className="text-[10px] text-amber-700 mt-1 leading-relaxed">⚠ {b.warnung}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
              Keine Treffer für „{search}". Tipp: probiere allgemeinere Begriffe wie „IT", „Beratung", „Kunst" — oder
              wähle „🤔 Bin mir unsicher" im{" "}
              <Link to="/cockpit/gewerbe-check" className="text-accent-blue underline">
                Vorher-Tool „Brauche ich ein Gewerbe?"
              </Link>{" "}
              für die Decision-Tree-Variante.
            </div>
          )}
        </div>
      )}

      {/* === Detail-Analyse des gewählten Berufs === */}
      {selected && (
        <>
          <div className="rounded-2xl border-2 border-accent-blue/40 bg-accent-blue/5 p-5 mb-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Gewählter Beruf</div>
                <h2 className="text-xl font-bold">{selected.name}</h2>
              </div>
              <button
                onClick={() => { setSelectedSlug(null); setKriterien({}); }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ✕ Anderer Beruf
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${KLASS_LABEL[selected.klass].farbe}`}>
                {KLASS_LABEL[selected.klass].l}
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{GRUPPEN_LABEL[selected.gruppe]}</span>
            </div>
            {selected.qualifikation && (
              <div className="text-xs mt-2">
                <strong>Berufs-Anforderung:</strong> {selected.qualifikation}
              </div>
            )}
            {selected.bfh && (
              <div className="text-xs text-muted-foreground mt-2">📚 {selected.bfh}</div>
            )}
            {selected.warnung && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 mt-3 text-xs leading-relaxed flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
                <div>{selected.warnung}</div>
              </div>
            )}
          </div>

          {/* === Kriterien-Check — IMMER bei freiberuflichen Berufen oder Autodidakten ===
              Abfärbetheorie-Frage ist für JEDEN Freiberufler relevant, nicht nur Qualifikations-pflichtige. */}
          {(selected.klass === "katalog" || selected.klass === "aehnlich" || selected.klass === "edge-frei") && (
            <div className="rounded-2xl border border-border bg-card p-5 mb-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-accent-blue" />
                Detail-Kriterien für sichere Einordnung
              </h3>

              <div className="space-y-3">
                {/* Qualifikation — nur wenn der Beruf eine konkrete Anforderung hat */}
                {(selected.qualifikation || selected.slug === "programmierer-autodidakt") && (
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Erfüllst du die Berufs-Anforderung „{selected.qualifikation || "vergleichbares Niveau (Portfolio, Komplexität)"}"?
                    </div>
                    <div className="flex gap-2">
                      {[
                        { v: true, l: "✓ Ja" },
                        { v: false, l: "✗ Nein / unsicher" },
                      ].map((o) => (
                        <button
                          key={String(o.v)}
                          onClick={() => setKriterien({ ...kriterien, qualifikationVorhanden: o.v })}
                          className={`rounded-lg border px-3 py-1.5 text-xs ${
                            kriterien.qualifikationVorhanden === o.v
                              ? "border-accent-blue bg-accent-blue/10 font-semibold"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gemischte Einkünfte (Abfärbetheorie) — IMMER bei freiberuflichen Verdicts */}
                <div>
                  <div className="text-sm font-medium mb-1">
                    Hast du noch andere Einnahmequellen (Werbung, Affiliate, Produktverkauf, Sponsorings)?
                  </div>
                  <div className="text-[11px] text-muted-foreground mb-2">
                    Wichtig: Wenn freiberufliche + gewerbliche Einkünfte zusammen kommen, droht „Abfärbung" → gesamte Tätigkeit wird zu Gewerbe (§15 Abs. 3 Nr. 1 EStG). Bagatell-Grenze: 3 % vom Umsatz UND max. 24.500 €/J.
                  </div>
                  <div className="flex gap-2">
                    {[
                      { v: false, l: "Nein, nur die freiberufliche Tätigkeit" },
                      { v: true, l: "Ja, gemischte Einnahmen" },
                    ].map((o) => (
                      <button
                        key={String(o.v)}
                        onClick={() => setKriterien({ ...kriterien, gemischteEinkuenfte: o.v })}
                        className={`rounded-lg border px-3 py-1.5 text-xs ${
                          kriterien.gemischteEinkuenfte === o.v
                            ? "border-accent-blue bg-accent-blue/10 font-semibold"
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
          )}

          {/* === Abfärbetheorie-Warnung === */}
          {abfaerbungWarnung && (
            <div className="rounded-2xl border-2 border-red-500/40 bg-red-500/5 p-5 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm mb-1 text-red-900">⚠ Abfärbetheorie §15 Abs. 3 Nr. 1 EStG</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground mb-2">
                    Du hast freiberufliche UND gewerbliche Einnahmen. Wenn die gewerblichen mehr als{" "}
                    <strong className="text-foreground">3 % vom Gesamt-Umsatz</strong> ausmachen UND mehr als{" "}
                    <strong className="text-foreground">24.500 €/Jahr</strong> betragen → wird der gesamte Betrieb
                    als Gewerbe behandelt (= GewSt-pflichtig!).
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong>Lösung:</strong> Beide Tätigkeiten in getrennten Betrieben führen (z.B. Freiberufler-Personenfirma
                    + zweite Gewerbe-Anmeldung mit eigener Bank, Buchhaltung, Rechnungen). Dann Trennung sauber.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* === Verdict-Karte === */}
          {verdict && (
            <>
              <div className={`rounded-2xl border-2 p-5 mb-4 ${
                verdict.farbe === "blau"
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-amber-500/40 bg-amber-500/5"
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  {verdict.farbe === "blau" ? (
                    <Sparkles className="h-7 w-7 text-blue-700 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-7 w-7 text-amber-700 shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dein Ergebnis</div>
                    <h2 className="text-xl font-bold">{verdict.titel}</h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line">{verdict.begruendung}</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 mb-4">
                <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-accent-blue" />
                  Was du jetzt tun musst
                </h3>
                <ol className="space-y-2">
                  {verdict.nextSteps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="rounded-full bg-accent-blue/10 text-accent-blue h-6 w-6 flex items-center justify-center font-bold text-xs shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 leading-relaxed">
                        {s.route ? (
                          <Link to={s.route} className="text-accent-blue hover:underline font-medium">
                            {s.text} →
                          </Link>
                        ) : s.extern ? (
                          <a href={s.extern} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline font-medium">
                            {s.text} ↗
                          </a>
                        ) : (
                          <span>{s.text}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => { setSelectedSlug(null); setKriterien({}); setSearch(""); }}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Anderen Beruf wählen
            </button>
          </div>
        </>
      )}

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "§18 EStG Selbstständige Arbeit / Katalogberufe", url: "https://www.gesetze-im-internet.de/estg/__18.html" },
          { label: "§15 Abs. 3 Nr. 1 EStG (Abfärbetheorie)", url: "https://www.gesetze-im-internet.de/estg/__15.html" },
          { label: "BFH VIII R 4/00 (Autodidakten als ähnliche Berufe)", url: "https://www.bundesfinanzhof.de" },
          { label: "BFH IV R 16/01 (Programmierer als ingenieurähnlich)", url: "https://www.bundesfinanzhof.de" },
          { label: "FG Berlin-Brandenburg 9 K 11900/15 (Influencer = Gewerbe)", url: "https://www.bundesfinanzhof.de" },
        ]}
        note="Einordnung Freiberuf vs. Gewerbe trifft das Finanzamt im Einzelfall. Bei Grenzfällen schriftliche FA-Anfrage stellen oder Erstgespräch beim StB. Eine Umdeklaration nach hinten ist möglich (z.B. nach Betriebsprüfung)."
      />
    </CockpitShell>
  );
};

// =====================================================================
// Sub-Components
// =====================================================================

const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-blue-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Du weißt, dass du dich anmelden musst — aber als Freiberufler:in oder als Gewerbe? Der Unterschied ist groß:
          Freiberufler:innen sparen sich Gewerbeamt-Anmeldung, IHK-Beitrag und Gewerbesteuer. Aber nur bestimmte Berufe
          (§18 EStG Katalog + „ähnliche Berufe" per BFH-Rechtsprechung) gelten als freiberuflich. Dieses Tool prüft
          deinen konkreten Beruf — inkl. Edge-Cases wie YouTuber, Online-Coaches und IT-Autodidakten.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-blue-500/5 p-2 border border-blue-500/20">
            <strong className="text-blue-700">📘 Freiberuf-Vorteile</strong>
            <div className="text-muted-foreground mt-0.5">Kein Gewerbeschein · keine IHK-Pflicht · keine Gewerbesteuer · EÜR ohne Bilanz-Grenze · KSK möglich</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 p-2 border border-amber-500/20">
            <strong className="text-amber-700">🏪 Gewerbe-Charakteristika</strong>
            <div className="text-muted-foreground mt-0.5">Gewerbeamt (15-65 €) · IHK-Beitrag · GewSt ab 24.500 € Gewinn · oft Produktverkauf, Handel, Marketing-DL</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — wichtige Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { begriff: "Katalogberufe (§18 Abs. 1 Nr. 1 EStG)", erklaerung: "Die im Gesetz EXPLIZIT genannten Freie Berufe: Heilberufe (Arzt, Heilpraktiker, Physio), Rechts-/Steuer-/Wirtschaftsberufe (Anwalt, Notar, Steuerberater, WP, Unternehmensberater), technisch-naturwissenschaftliche (Ingenieur, Architekt, Chemiker, Lotse), Erziehung/Bildung/Medien (Lehrer, Journalist, Übersetzer, Künstler). Diese sind ohne weitere Prüfung freiberuflich." },
        { begriff: "Ähnliche Berufe", erklaerung: "Über die Katalog-Liste hinaus erkennt die BFH-Rechtsprechung 'Berufe, die einem Katalog-Beruf ähneln'. Klassiker: Programmierer mit Studium = Ingenieur-ähnlich. Erfordert Einzelfall-Prüfung des FA." },
        { begriff: "Abfärbetheorie (§15 Abs. 3 Nr. 1 EStG)", erklaerung: "Wenn ein eigentlich freiberuflich Tätiger nebenbei gewerbliche Einnahmen hat (Affiliate, Werbung, Produktverkauf), kann der GESAMTE Betrieb als Gewerbe umgewidmet werden. Bagatell-Grenze: 3% vom Umsatz UND max. 24.500 €/J. Lösung: Trennung in zwei Betriebe." },
        { begriff: "BFH (Bundesfinanzhof)", erklaerung: "Höchstes deutsches Finanzgericht. Setzt Rechtsprechung zu Steuer-Fragen. Wichtig: Auch wenn das FA bei dir vor Ort streng ist, kann ein BFH-Urteil die Entscheidung kippen." },
        { begriff: "Approbation", erklaerung: "Staatliche Zulassung zum Heilberuf (Arzt, Zahnarzt, Tierarzt, Psychotherapeut). OHNE Approbation = kein Heilberuf, sondern z.B. Coach = Gewerbe." },
        { begriff: "KSK (Künstlersozialkasse)", erklaerung: "Sozial-Versicherungs-System für selbständige Künstler:innen und Publizist:innen. Bund übernimmt 50% der KV/RV-Beiträge — wie bei Angestellten. Pflichtmitgliedschaft für viele Kreativ-Berufe (Maler, Musiker, Autor, freier Journalist)." },
        { begriff: "Influencer / YouTuber-Einordnung", erklaerung: "FG Berlin-Brandenburg 9 K 11900/15 + FA-Praxis: Wer AdSense / Sponsoring / Affiliate-Einnahmen hat, ist gewerblich. Nur reine Kunst-/Musik-Kanäle ohne Werbe-Schaltung können freiberuflich sein." },
        { begriff: "Unternehmensberater im Katalog", erklaerung: "§18 EStG sagt 'beratende Volks- und Betriebswirte'. Das bedeutet: nur mit BWL/VWL-Studium oder vergleichbarer Qualifikation. Wer sich 'Unternehmensberater' ohne Studium nennt, ist meist Gewerbe (BFH IV R 71/96)." },
      ].map((g) => (
        <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
          <div className="text-muted-foreground">{g.erklaerung}</div>
        </div>
      ))}
    </div>
  </details>
);

export default FreiberufCheck;
