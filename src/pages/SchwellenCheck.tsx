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
 *  - §3 Nr. 26 EStG Übungsleiter-Pauschale 3.000 €/J
 *  - §3 Nr. 26a EStG Ehrenamtspauschale 840 €/J
 *  - §23 EStG Privates Veräußerungsgeschäft Freigrenze 1.000 €/J (Crypto, Antik etc.)
 *  - §23 EStG Spekulationsfrist 1 Jahr (10 Jahre Immobilien)
 *  - §19 UStG Kleinunternehmer 25k Vorjahr / 100k aktuell
 *  - §20 EStG Sparerpauschbetrag 1.000 € Single / 2.000 € Verheir.
 *  - DAC7-Plattform-Meldung 30 Verkäufe oder 2.000 €
 *  - Gewerbe-Nachhaltigkeit: 3+ Wiederholungen/J = nachhaltig
 *  - GewSt-Freibetrag 24.500 €/J Einzelunternehmer/Personengesellschaft
 *  - Werbungskosten-Pauschbetrag Anlage S 102 €
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
  HelpCircle,
  XCircle,
} from "lucide-react";

// ============================================================================
// Stand 2026
// ============================================================================
const SCHWELLEN_2026 = {
  GRUND_FREIBETRAG_SINGLE: 12348,
  GRUND_FREIBETRAG_VERHEIRATET: 24696,
  SONSTIGE_EINKUENFTE_22_NR_3: 256,
  UEBUNGSLEITER_PAUSCHALE: 3000,
  EHRENAMTS_PAUSCHALE: 840,
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
}

const QUELLEN: QuelleInfo[] = [
  {
    v: "ebay-private",
    label: "Privater Verkauf (eBay, Vinted, Kleinanzeigen)",
    emoji: "🏷️",
    schwelle: SCHWELLEN_2026.PRIV_VERAEUSSERUNG_23,
    schwellenName: "§23 EStG Freigrenze + Spekulationsfrist 1 Jahr",
    paragraph: "§23 EStG",
    unterSchwelle: "Steuerfrei wenn (a) Spekulationsfrist 1 Jahr eingehalten ODER (b) Gesamtgewinn aller §23-Geschäfte < 1.000 € pro Jahr (Freigrenze, KEIN Freibetrag — bei 1.001 € voller Betrag steuerpflichtig).",
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
    unterSchwelle: "Bis 3.000 €/Jahr STEUER-FREI (Freibetrag, nicht Freigrenze — auch bei 3.001 € sind die ersten 3.000 € frei). Voraussetzung: nebenberuflich + gemeinnütziger Auftraggeber (Verein, gemeinnützige Org).",
    ueberSchwelle: "Nur der Betrag über 3.000 € wird besteuert. Bei Gewinnerzielungsabsicht: gewerblich oder freiberuflich (Lehrer-ähnlich) anmelden.",
    warnung: "Übungsleiter UND Ehrenamt kombinierbar! Du kannst von beiden Pauschalen profitieren (Voraussetzung: getrennte Tätigkeiten / Auftraggeber).",
  },
  {
    v: "ehrenamt",
    label: "Ehrenamt (Vereinsvorstand, Schöffe etc.)",
    emoji: "🤝",
    schwelle: SCHWELLEN_2026.EHRENAMTS_PAUSCHALE,
    schwellenName: "§3 Nr. 26a EStG Ehrenamts-Pauschale",
    paragraph: "§3 Nr. 26a EStG",
    unterSchwelle: "Bis 840 €/Jahr STEUER-FREI (Freibetrag). Voraussetzung: gemeinnützige Tätigkeit nebenberuflich.",
    ueberSchwelle: "Betrag über 840 € wird besteuert. Anmeldung nicht erforderlich solange ehrenamtlich.",
    warnung: "Ehrenamt und Übungsleiter sind KUMULIERBAR (840 + 3.000 = 3.840 € steuerfrei möglich). Aber: nur bei UNTERSCHIEDLICHEN Tätigkeiten/Auftraggebern.",
  },
  {
    v: "crypto",
    label: "Crypto-Handel (Bitcoin, Ether, NFTs)",
    emoji: "₿",
    schwelle: SCHWELLEN_2026.PRIV_VERAEUSSERUNG_23,
    schwellenName: "§23 EStG Freigrenze + Spekulationsfrist 1 Jahr",
    paragraph: "§23 EStG",
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
    schwellenName: "Gelegentliche Vermietung Freigrenze § 22 Nr. 3 EStG (520 €/J)",
    paragraph: "§21 EStG + ggf. §22",
    unterSchwelle: "Bei GELEGENTLICHER Vermietung (z.B. einmal im Jahr Airbnb-Wochenende) bis 520 €/Jahr steuerfrei nach §22 EStG. Bei laufender Vermietung: immer Anlage V, kein Freibetrag.",
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
    unterSchwelle: "Bis 256 €/Jahr (Freigrenze, kein Freibetrag) STEUER-FREI. Bei 256,01 € sind ALLE sonstigen Einkünfte voll steuerpflichtig.",
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
    const ueber = quelle.schwelle > 0 && eingenommen > quelle.schwelle;
    const grenze = quelle.schwellenName.includes("Freigrenze");
    return {
      ueber,
      grenze,
      info: ueber ? quelle.ueberSchwelle : quelle.unterSchwelle,
    };
  }, [quelle, eingenommen]);

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Side-Hustle-Schwellen — wann muss ich was melden?"
      subtitle="Alle wichtigen Freibeträge, Freigrenzen und Pflicht-Schwellen für Anfänger:innen auf einer Page. Mit Live-Check pro Einkommens-Quelle + DAC7-Plattform-Meldung-Warnung."
    >
      <BeginnerHero />

      {/* === Quick-Check === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-blue" />
          Quick-Check für deine Einkommens-Quelle
        </h3>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 z.B. eBay, Crypto, Übungsleiter, YouTube, Zinsen, Airbnb …"
          className="h-11 text-base mb-3"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filtered.map((q) => (
            <button
              key={q.v}
              onClick={() => { setSelectedQuelle(q.v); setEingenommen(0); }}
              className={`text-left rounded-xl border p-3 transition ${
                selectedQuelle === q.v
                  ? "border-accent-blue bg-accent-blue/10 ring-1 ring-accent-blue/30"
                  : "border-border bg-card hover:border-accent-blue/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{q.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm leading-tight mb-1">{q.label}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {q.schwelle > 0 ? (
                      <>
                        Schwelle: <strong className="text-foreground font-semibold">{q.schwelle.toLocaleString("de-DE")} €/J</strong> · {q.paragraph}
                      </>
                    ) : (
                      <>
                        <span className="text-red-700 font-semibold">Keine Freigrenze</span> · {q.paragraph}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-sm text-muted-foreground p-3">
            Keine Treffer für „{search}". Tipp: allgemeinere Begriffe wie „Crypto", „Ehrenamt", „Vermietung".
          </div>
        )}
      </div>

      {/* === Detail-Check für gewählte Quelle === */}
      {quelle && (
        <div className="rounded-2xl border-2 border-accent-blue/40 bg-accent-blue/5 p-5 mb-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{quelle.emoji}</span>
              <div>
                <h2 className="text-lg font-bold">{quelle.label}</h2>
                <div className="text-xs text-muted-foreground mt-0.5">{quelle.schwellenName}</div>
              </div>
            </div>
            <button onClick={() => setSelectedQuelle(null)} className="text-xs text-muted-foreground hover:text-foreground">
              ✕ Andere Quelle
            </button>
          </div>

          {quelle.schwelle > 0 && (
            <div className="rounded-lg bg-secondary/40 p-3 mb-3">
              <label className="text-xs font-medium block mb-2">Wie viel hast du dieses Jahr eingenommen?</label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={eingenommen || ""}
                  onChange={(e) => setEingenommen(Math.max(0, Number(e.target.value) || 0))}
                  placeholder="0"
                  className="h-10 text-base flex-1"
                />
                <div className="text-xs text-muted-foreground">€/Jahr</div>
              </div>
              {/* Visuelle Schwellen-Anzeige */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                  <span>0 €</span>
                  <span>
                    Schwelle {quelle.schwelle.toLocaleString("de-DE")} €
                  </span>
                  <span>{Math.max(quelle.schwelle * 2, eingenommen * 1.2).toLocaleString("de-DE")} €</span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden relative">
                  <div
                    className={`absolute inset-y-0 left-0 transition-all ${eingenommen > quelle.schwelle ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(100, (eingenommen / Math.max(quelle.schwelle * 2, eingenommen * 1.2)) * 100)}%` }}
                  />
                  {/* Schwelle-Marker */}
                  <div className="absolute inset-y-0 w-0.5 bg-foreground" style={{ left: `${Math.min(100, (quelle.schwelle / Math.max(quelle.schwelle * 2, eingenommen * 1.2)) * 100)}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Verdict-Anzeige */}
          {verdict && (
            <div className={`rounded-xl p-4 border-2 ${
              verdict.ueber
                ? "border-amber-500/50 bg-amber-500/5"
                : "border-emerald-500/50 bg-emerald-500/5"
            }`}>
              <div className="flex items-start gap-3">
                {verdict.ueber ? (
                  <AlertTriangle className="h-6 w-6 text-amber-700 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-emerald-700 shrink-0" />
                )}
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider font-semibold mb-1">
                    {verdict.ueber
                      ? `Über der Schwelle (${eingenommen.toLocaleString("de-DE")} € > ${quelle.schwelle.toLocaleString("de-DE")} €)`
                      : quelle.schwelle === 0
                      ? "Keine Freigrenze — sofort melde-/anmeldepflichtig"
                      : eingenommen === 0
                      ? "Schwelle: " + quelle.schwelle.toLocaleString("de-DE") + " € pro Jahr"
                      : `Unter der Schwelle (${eingenommen.toLocaleString("de-DE")} € ≤ ${quelle.schwelle.toLocaleString("de-DE")} €)`}
                  </div>
                  <p className="text-sm leading-relaxed">{verdict.info}</p>
                  {!verdict.ueber && verdict.grenze && eingenommen > 0 && eingenommen >= quelle.schwelle * 0.85 && (
                    <div className="mt-2 text-xs text-amber-700 font-semibold">
                      ⚠ Vorsicht: du näherst dich der Freigrenze. Erinnerung — Freigrenze ≠ Freibetrag! Schon 1 € über der Grenze macht den GESAMTEN Betrag steuerpflichtig.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stolperfalle */}
          {quelle.warnung && (
            <div className="mt-3 rounded-lg bg-red-500/5 border border-red-500/30 p-3 text-xs leading-relaxed flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-900">Stolperfalle:</strong> {quelle.warnung}
              </div>
            </div>
          )}
        </div>
      )}

      {/* === Alle Schwellen-Übersicht 2026 === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-accent-blue" />
          Alle wichtigen Schwellen 2026 auf einen Blick
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-2 pr-3">Schwelle</th>
                <th className="py-2 pr-3">Wert 2026</th>
                <th className="py-2 pr-3">Typ</th>
                <th className="py-2">§</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
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
                <tr key={i} className="hover:bg-secondary/30">
                  <td className="py-2 pr-3 font-medium">{row.name}</td>
                  <td className="py-2 pr-3 font-mono text-foreground">{row.wert}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{row.typ}</td>
                  <td className="py-2 text-muted-foreground text-[11px] font-mono">{row.par}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
          <strong>Freibetrag</strong> = Beträge bis Schwelle steuerfrei, darüber NUR Mehrbetrag versteuern · <strong>Freigrenze</strong> = bei Überschreitung wird der GESAMTE Betrag steuerpflichtig (⚠ tückisch!).
        </div>
      </div>

      {/* === Kombinations-Hinweise === */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-700" />
          Kombinations-Hinweise (was geht zusammen, was nicht)
        </h3>
        <ul className="text-xs space-y-2 leading-relaxed text-muted-foreground">
          <li>
            ✅ <strong>Übungsleiter (3.000 €) + Ehrenamt (840 €)</strong> kumulierbar bei unterschiedlichen Tätigkeiten → 3.840 € steuerfrei möglich
          </li>
          <li>
            ❌ <strong>§22 Nr. 3 Sonstige (256 €) + Gewerbe</strong> nicht kumulierbar — sobald nachhaltig → Gewerbe
          </li>
          <li>
            ⚠ <strong>Kleinunternehmer + Freiberuf</strong> = ja, aber bei Nebeneinkünften aus Gewerbe greift Abfärbetheorie §15 Abs. 3 → ALLES Gewerbe (siehe Freiberuf-Check)
          </li>
          <li>
            ⚠ <strong>Sparerpauschbetrag (1.000 €) + Crypto-Freigrenze (1.000 €)</strong> sind separat — du kannst beide voll nutzen
          </li>
          <li>
            ✅ <strong>Hauptberuf-Anstellung + nebenberuflicher Side-Hustle</strong> → separate Anlage S/G, ESt-Progression auf Summe. Sozial-Versicherungs-rechtlich: nur wenn nebenberuf {">"} 50 % Hauptberuf-Brutto wird er pflichtversichert.
          </li>
        </ul>
      </div>

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <Link to="/cockpit/gewerbe-check" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Brauche ich Gewerbe? (Tool 1)</div>
          <div className="text-muted-foreground">Decision-Tree für Anfänger:innen</div>
        </Link>
        <Link to="/cockpit/ust-rechner" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">USt-Rechner (KU §19 etc.) →</div>
          <div className="text-muted-foreground">5 Tabs für USt-Spezialfälle</div>
        </Link>
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
const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-accent-blue/30 bg-gradient-to-br from-accent-blue/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Du fragst dich: „Wenn ich nur 200 € nebenbei verdiene — muss ich das versteuern?" oder „Mein Verein zahlt mir 500 € Übungsleiter-Honorar — steuerfrei?". Dieses Tool zeigt dir alle relevanten Freibeträge und Freigrenzen für Side-Hustles, plus die DAC7-Plattform-Meldepflicht (gilt seit 2023 für eBay, Vinted etc.).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-emerald-500/5 p-2 border border-emerald-500/20">
            <strong className="text-emerald-700">✅ Freibetrag</strong>
            <div className="text-muted-foreground mt-0.5">Beträge bis Schwelle steuerfrei, NUR der Mehrbetrag wird besteuert. Beispiel: Übungsleiter 3.500 € → 500 € steuerpflichtig.</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 p-2 border border-amber-500/20">
            <strong className="text-amber-700">⚠ Freigrenze</strong>
            <div className="text-muted-foreground mt-0.5">Bei Überschreitung wird der GESAMTE Betrag steuerpflichtig. Beispiel: §23 EStG 1.001 € Crypto-Gewinn → ALLE 1.001 € steuerpflichtig.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { begriff: "Freibetrag vs. Freigrenze", erklaerung: "Freibetrag (z.B. Übungsleiter 3.000 €): bis Schwelle steuerfrei, NUR der Mehrbetrag wird besteuert. Freigrenze (z.B. §23 EStG 1.000 €): bei Überschreitung wird der GESAMTE Betrag steuerpflichtig — extrem tückisch! Schon 1 € drüber → alles versteuert." },
        { begriff: "§22 Nr. 3 EStG (Sonstige Einkünfte)", erklaerung: "Auffangtatbestand für gelegentliche Einnahmen, die kein Lohn / Gewinn aus Selbstständigkeit / Kapitalertrag etc. sind. 256 €/J Freigrenze. Beispiele: Vermittlungs-Tipps, Reichweiten-Awards, gelegentliche Vermietung." },
        { begriff: "§3 Nr. 26 EStG (Übungsleiter-Pauschale)", erklaerung: "3.000 €/Jahr Freibetrag für nebenberufliche pädagogische / künstlerische / pflegerische Tätigkeit bei gemeinnützigen Auftraggebern. Typisch: Sport-Trainer im Verein, Yoga-Kurse Volkshochschule, Nachhilfe Schule." },
        { begriff: "§3 Nr. 26a EStG (Ehrenamtspauschale)", erklaerung: "840 €/Jahr Freibetrag für nebenberufliche ehrenamtliche Tätigkeit bei gemeinnützigen Organisationen. Kombinierbar mit Übungsleiter-Pauschale bei unterschiedlichen Tätigkeiten." },
        { begriff: "§23 EStG (Privates Veräußerungsgeschäft)", erklaerung: "Gewinne aus dem Verkauf von Privatvermögen (Crypto, Antiquitäten, Gold). Steuerfrei wenn (a) >1 Jahr gehalten ODER (b) Gesamtgewinn aller §23-Geschäfte unter 1.000 €/J. Bei Immobilien: 10 Jahre Haltefrist." },
        { begriff: "DAC7 (EU-Plattform-Meldepflicht)", erklaerung: "EU-Richtlinie 2021/514, seit 2023 in Kraft. Plattformen wie eBay, Vinted, Kleinanzeigen, Airbnb, Uber müssen das FA informieren bei ≥ 30 Verkäufen ODER ≥ 2.000 € Umsatz pro Jahr. Auch wenn deine Verkäufe steuerfrei sind — die Meldung kommt." },
        { begriff: "Sparerpauschbetrag §20 EStG", erklaerung: "1.000 € Single / 2.000 € Verheiratet steuerfreier Kapitalertrag. Freistellungsauftrag bei jeder Bank stellen, damit keine 25 % Abgeltungsteuer einbehalten wird. Bei mehreren Banken: Aufträge entsprechend splitten." },
        { begriff: "Nachhaltige Gewinnerzielungsabsicht", erklaerung: "Kern-Kriterium für 'Gewerbe' nach §15 EStG. Du planst, auf Dauer Gewinn zu machen (auch wenn die ersten Jahre Verluste). Faustregel FA: bei 3+ Wiederholungen pro Jahr von ähnlichen Geschäften → nachhaltig." },
        { begriff: "Abgeltungsteuer", erklaerung: "Pauschale 25 % Steuer auf Kapitalerträge (Zinsen, Dividenden, ETF-Gewinne) plus 5,5 % Solidaritätszuschlag = effektiv 26,375 %. Wird i.d.R. direkt von der Bank einbehalten und abgeführt. Bei niedrigem persönlichen Steuersatz: Günstigerprüfung in Anlage KAP." },
        { begriff: "CARF (Crypto-Asset Reporting Framework)", erklaerung: "OECD-Standard für Krypto-Meldepflicht ähnlich DAC7 für klassische Plattformen. Greift schrittweise ab 2025/26 — Crypto-Börsen müssen das FA informieren. Auch internationale Börsen wie Binance, Coinbase betroffen." },
      ].map((g) => (
        <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
          <div className="text-muted-foreground">{g.erklaerung}</div>
        </div>
      ))}
    </div>
  </details>
);

export default SchwellenCheck;
