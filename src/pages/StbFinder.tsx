import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Search, CheckCircle2, AlertTriangle, Copy, Wand2 } from "lucide-react";

type Spezialisierung = {
  slug: string;
  name: string;
  emoji: string;
  desc: string;
  /** Was muss der StB können — Pflicht-Knowledge. */
  pflicht: string[];
  /** Bonus-Knowledge die nicht jeder StB hat. */
  bonus: string[];
  /** Honorar-Range für Standard-Mandant pro Jahr. */
  honorarJahr: string;
  /** Standardisierte Erst-Termin-Fragen, an denen man Eignung testet. */
  erstterminFragen: string[];
  /** Red-Flags die einen StB sofort disqualifizieren. */
  redFlags: string[];
  /** Wo man danach sucht. */
  wofindet: string[];
};

const SPEZIALISIERUNGEN: Spezialisierung[] = [
  {
    slug: "ecom",
    name: "E-Commerce / Marketplace",
    emoji: "🛒",
    desc: "Amazon/Shopify/Stripe-Settlements parsen, USt-Themen (OSS, Reverse-Charge), Marketplace-Facilitator-Tax. PayJoe, Lexoffice, Taxdoo Workflow.",
    pflicht: [
      "Amazon EU SARL Niederlassung DE 19 % USt-Logik (seit 01.08.2024)",
      "Reverse-Charge §13b für IT/FR/ES/NL-Marketplaces",
      "OSS (One-Stop-Shop) Verfahren für eigene B2C-EU-Verkäufe",
      "FBA-Lager in IT/FR/PL/CZ/ES → Pflicht-Registrierung im Land + ggf lokale USt-ID",
      "PayJoe oder Taxdoo Mapping in DATEV/Lexoffice",
      "Marketplace-Facilitator-Tax-Logik (in DE saldieren, nicht aufwenden)",
    ],
    bonus: [
      "US-Sales-Tax-Nexus mit eigenen Tools (TaxJar, Avalara)",
      "Erfahrung mit FBA-Lager-Sondertatbestand 0 € VK aus DE-Lager",
      "Crypto-Steuer-Tools (CoinTracking, Blockpit)",
      "Stripe-Multi-Currency-Settlement-Auflösung",
    ],
    honorarJahr: "5.000-15.000 € / Jahr (kleine GmbH bis 1 Mio Umsatz)",
    erstterminFragen: [
      "Wie viele E-Com-Mandanten betreuen Sie? Welche Plattformen kommen am häufigsten?",
      "Wie buchen Sie eine AMA-SG-DE-MZNFS-Buchung in DATEV? (Antwort sollte sein: 3100 Fremdleistungen mit BU 9)",
      "Wie buchen Sie einen Amazon-Refund mit RFNDCMMS? (Antwort: Aufwandsminderung 3100, nicht Erlös)",
      "Wenn ich FBA in 6 EU-Ländern habe, was muss ich anmelden? (Antwort: alle 6 USt-IDs + monatliche Meldungen)",
      "Wie geht Ihre Zusammenarbeit mit PayJoe/Taxdoo aus? Sind Sie Live-User oder lassen Sie das uns?",
      "Was kostet die Buchführung pro Monat — separat von Jahres-Abschluss?",
    ],
    redFlags: [
      '"Amazon-Verkäufe sind doch alle innergemeinschaftlich" — falsch seit 2024',
      '"Marketplace-Facilitator-Tax buchen wir wie sonstige USt" — kein Verständnis der Saldierungs-Logik',
      "StB-Büro nutzt nur Excel + DATEV-Stamm, kein API-Connector — Buchhaltung bleibt manuell teuer",
      "Honorar-Pauschale ohne Mengen-Indikation — bei E-Com-Skalierung explodieren oft Kosten",
    ],
    wofindet: [
      "Specht & Partner (Lübeck) — bekannter E-Com-StB",
      "TaxAdvisor.network",
      "PayJoe-Partner-Liste",
      "Taxdoo-Partner-Liste",
      "Reddit r/dachgewerbe, FB-Gruppen 'Amazon Seller DE'",
    ],
  },
  {
    slug: "crypto",
    name: "Crypto / DeFi",
    emoji: "🪙",
    desc: "FIFO §23 EStG, 1-Jahres-Haltefrist, Staking/Lending, NFTs, DeFi-Liquidity-Pool-Steuer-Behandlung.",
    pflicht: [
      "FIFO-Berechnung Veräußerungsgewinne pro Trade",
      "1-Jahres-Haltefrist § 23 EStG inkl. Verlängerung bei Staking/Lending",
      "Staking-Erträge zu Marktpreis bei Zufluss",
      "NFT-Verkäufe als sonst Einkünfte",
      "Freigrenze 1.000 € (nicht Freibetrag)",
      "Wallet-zu-Wallet ist KEIN Veräußerungsgeschäft",
    ],
    bonus: [
      "Tools wie CoinTracking, Blockpit, Koinly direkt importieren",
      "DeFi-Pools (Uniswap, Aave) — neueres BMF-Schreiben kennt der StB",
      "NFT-Mint vs. Sekundär-Markt korrekt einordnen",
      "Privat-Halten vs. gewerbliche Spekulation richtig abgrenzen",
    ],
    honorarJahr: "2.500-8.000 € / Jahr (1k-10k Trades)",
    erstterminFragen: [
      "Welches Crypto-Tool nutzen Sie? CoinTracking, Blockpit, Accointing — andere?",
      "Wie behandeln Sie Staking-Erträge in der ESt-Erklärung?",
      "Wie stehen Sie zur 10-Jahres-Frist bei Staking/Lending? Hat der BFH das schon geklärt?",
      "Was kostet ein Trade-Mengen-Bracket pro Jahr — bei 500 vs. 5.000 vs. 50.000 Trades?",
      "Wie buchen Sie einen DeFi-Liquidity-Pool-Eintritt? (Antwort: kein Tausch, kein Steuerentstehungs-Tatbestand)",
    ],
    redFlags: [
      '"Crypto-zu-Crypto ist immer steuerfrei nach 1 Jahr" — Stake-Period verlängert!',
      '"Wir machen Crypto nicht" — geh zu jemand anders',
      "StB hat keine eigene Wallet — schwieriges Verständnis von Wallet-Tracking",
      "Honorar pro Trade — bei 50k Trades wird das absurd teuer",
    ],
    wofindet: [
      "Steuerberater Crypto.de",
      "Blockpit / Koinly Partner-Liste",
      "Reddit r/Steuern, Crypto-Steuer-Foren",
      "Cryptotax-Konferenzen",
    ],
  },
  {
    slug: "holding",
    name: "Holding-Strukturen / §8b",
    emoji: "🏢",
    desc: "Beteiligungs-Strukturen, §8b KStG-Schachtelprivileg, Sperrfristen, EWiV, Holdings für VC-Aufnahme.",
    pflicht: [
      "§8b KStG (95 % steuerfreie Ausschüttungen + Veräußerungsgewinne)",
      "Mindest-Beteiligung 10 % für Streubesitz-Limitation",
      "Sperrfrist 7 Jahre nach Einbringung §22 UmwStG",
      "Ein-Mann-GmbH+Holding-Standardkonstrukt",
      "Familien-Pool / Stiftungs-Holding-Konstrukte",
    ],
    bonus: [
      "VC-Strukturen mit DCF-Bewertung",
      "Trust- / Stiftungs-Konstrukte (DE oder LI/CH)",
      "Multi-Brand-Holding mit IP-Box-Auslagerung",
      "ATAD III + §AStG bei EU-/CH-Strukturen",
    ],
    honorarJahr: "8.000-25.000 € / Jahr (2-3 Gesellschaften)",
    erstterminFragen: [
      "Welche Mandanten haben Sie mit Holding-Struktur? Wie viele Stufen?",
      "Wann ist §22 UmwStG Sperrfrist relevant für mich?",
      "Was passiert wenn ich nach 5 Jahren die Tochter verkaufe — welche Steuer?",
      "Können Sie mir bei der Familien-Pool-Variante helfen oder geben Sie mich an einen Spezialisten ab?",
      "Wie gut kennen Sie ATAD III und EU-Substanz-Anforderungen?",
    ],
    redFlags: [
      '"Holding macht keinen Sinn unter 1 Mio €" — pauschale Aussage, individuell ja schon ab 100k Gewinn',
      '"Sperrfristen kennen wir nicht so genau" — Beratungs-Fehler kostet 6-stellig',
      "Kein Multi-Gesellschaft-Workflow im Büro — wird nicht skalieren",
    ],
    wofindet: [
      "DStV-Fachberater Internationale Steuerrecht",
      "BBH (Beiten Burkhardt) für Größere Strukturen",
      "Specialist-Pools wie Roedl & Partner, Ebner Stolz",
    ],
  },
  {
    slug: "international",
    name: "International (US-LLC, HK-Ltd, EU-Konstrukte)",
    emoji: "🌍",
    desc: "Auslandskonstrukte aus DE-Sicht, DBA-Anrechnung, Hinzurechnungsbesteuerung §AStG, Substance + ATAD III.",
    pflicht: [
      "§AStG Hinzurechnungsbesteuerung (über 25 % Niedrig-Steuer-Schwelle)",
      "DBA-Anrechnung Quellensteuer auf KSt + ESt",
      "Mutter-Tochter-Richtlinie (95 % steuerfreie EU-Ausschüttungen)",
      "Substance-Anforderungen + ATAD III ab 2026/2027",
      "5472-Filing-Pflicht US-LLCs (auch ohne US-Income)",
      "Two-Tier-Profits-Tax HK + Offshore-Status-Begründung",
    ],
    bonus: [
      "Trust-Konstrukte / Stiftungen in CH/LI/Delaware",
      "Patent-Box-Strukturen (NL/IE/HU/CH)",
      "Cross-Border M&A",
      "Beneficial-Owner-Tracking (RBO/Transparency)",
    ],
    honorarJahr: "10.000-40.000 € / Jahr (1-3 Auslandsgesellschaften)",
    erstterminFragen: [
      "Wie viele US-LLC-Mandate haben Sie? Wie viele HK-Ltd?",
      "Wie wird ein 5472-Filing gegenüber dem IRS in DE gehandhabt? (Trick-Frage: meist macht das ein US-CPA)",
      "Wann fällt § AStG Hinzurechnung bei meiner US-LLC?",
      "Wie weisen wir Substanz nach, um ATAD III zu vermeiden?",
      "Haben Sie Erfahrung mit Estonian-OÜ-Konstrukten?",
      "Wie ist Ihre Zusammenarbeit mit US-CPAs / HK-Wirtschaftsprüfern?",
    ],
    redFlags: [
      '"Der IRS interessiert sich nicht für mich" — gefährlich + falsch',
      '"US-LLC sparen wir uns als Briefkasten" — kein Substance-Verständnis',
      '"Hong Kong ist Steuerparadies" — naive Aussage, Profits-Tax-Logik komplex',
      "Kein Partner-StB im Ausland — du bezahlst alles separat",
    ],
    wofindet: [
      "DStV-Fachberater Internationale Steuerrecht",
      "Specialty-Boutiquen (Becker International, Tax Edge)",
      "WTS Group, Roedl & Partner",
      "US-Ext-CPAs mit DE-Connection (z.B. CPAs Munich, Berlin)",
    ],
  },
  {
    slug: "starter",
    name: "Standard-Gründung (UG / GmbH / Einzel)",
    emoji: "🏗️",
    desc: "Reguläre Gründungs-Begleitung. Notar-Termin, Eröffnungs-Bilanz, Gewerbeanmeldung, EÜR-vs-Bilanz, IAB/GWG/Sammelposten, Kleinunternehmer-Reform 2025.",
    pflicht: [
      "EÜR vs. Bilanzierung — Schwelle §141 AO (800k Umsatz ODER 80k Gewinn)",
      "Eröffnungsbilanz §242 HGB sauber buchen (Stammeinlage Bank → 1200/2900)",
      "USt-Voranmeldung-Frequenz §18 UStG (monatlich >7.500€/Q vs. quartalsweise; Sonderregel Neu-Gründung 2 J. monatlich)",
      "Kleinunternehmer §19 UStG — Reform 2025: 25k Vorjahr / 100k laufendes Jahr (vorher 22k/50k)",
      "Investitionsabzugsbetrag §7g EStG (50% gewinnmindernd vor Anschaffung, Auflösung 3 J.)",
      "GWG-Schwelle 800€ (§6 Abs. 2) + Sammelposten 250-1.000€ (§6 Abs. 2a, 5J. linear)",
      "Lohnabrechnung GF + Mitarbeiter (Mini-Job 556€ Schwelle 2026, Midi-Job 538-2.000€)",
      "Jahres-Abschluss — Bilanz/Anhang/Lagebericht je nach §267 HGB-Klasse",
      "GewSt-Freibetrag 24.500€ für Einzel/PersGes (NICHT für GmbH)",
    ],
    bonus: [
      "Existenzgründer-Begleitung mit IHK",
      "EXIST/KfW-Förderung-Anträge",
      "BMF-Sofortabschreibung Computer/Software 2021 (1 Jahr für alle digitalen Wirtschaftsgüter)",
      "DATEV Unternehmen Online + DATEVconnect für API-Workflow",
      "GoBD-konformes Belegmanagement + revisionssichere Archivierung",
      "E-Rechnungspflicht §14 UStG seit 1.1.2025 (B2B-Empfang Pflicht, Versand stufenweise bis 2028)",
    ],
    honorarJahr: "1.500-5.000 € / Jahr (Einzel-EÜR bis kleine GmbH)",
    erstterminFragen: [
      "Welche Buchhaltungs-Software empfehlen Sie für Mandanten meiner Größe — und welche Schnittstelle nutzen Sie (DATEVconnect, lexoffice-API, sevDesk-API)?",
      "Ab welcher Umsatz-Grenze muss ich von EÜR auf Bilanzierung wechseln? (Antwort: §141 AO — 800k Umsatz ODER 80k Gewinn pro Jahr, schriftliche Mitteilung Finanzamt)",
      "Wie buchen Sie meine Eröffnungsbilanz für eine GmbH mit 25.000€ Stammeinlage in DATEV? (Antwort: 1200 Bank an 2900 Eigenkapital / Stammkapital eingefordert)",
      "Wenn ich 2026 einen Laptop für 1.200€ kaufe — welche 4 Abschreibungs-Optionen habe ich, und welche ist die beste? (Antwort: BMF-Sofortabschreibung 1J. wegen Digital-Wirtschaftsgut, sonst Lineare AfA 3J. nach AfA-Tabelle)",
      "Wie funktioniert der Investitionsabzugsbetrag §7g — und wann lohnt sich der für mich vs. normale AfA?",
      "Wie ist Ihre Empfehlung zur USt-Kleinunternehmer-Regelung 2026 — wann sollte ich optieren, wann nicht? (Antwort: bei B2B-Kunden mit Vorsteuer-Abzug fast immer raus, bei B2C-Endkunden meist drin solange unter 100k)",
      "Wer macht bei Ihnen die monatliche USt-Voranmeldung — Sie, ich, oder gemischt? Und gilt für mich in den ersten 2 Jahren die Monats-Pflicht?",
      "Wie ist Ihr Workflow für E-Rechnungs-Empfang seit 1.1.2025? Welche Pflichten habe ich konkret? (Antwort: muss XRechnung/ZUGFeRD empfangen können, GoBD-konform 10J. archivieren, Versand-Pflicht stufenweise ab 2027 bis 2028)",
      "Was kostet die Buchhaltung pro Monat — getrennt von Jahresabschluss + USt-Voranmeldung + Lohn?",
      "Wenn ich im Gründungsjahr Verlust mache — was kostet mich das Jahr trotzdem? (Antwort: IHK-Mindestbeitrag, evtl. Notar/HR + Lohnsteuer falls GF-Gehalt; KSt + GewSt nur auf Gewinn)",
      "Wie schnell antworten Sie auf Email/Telefon — gleicher Tag, 24h, 48h? Und haben Sie einen festen Sachbearbeiter pro Mandant?",
    ],
    redFlags: [
      '"Wir machen alles per Schuhkarton-Buchhaltung" — keine Skalierungs-Reife',
      '"E-Rechnung machen wir nächstes Jahr" — seit 1.1.2025 ist B2B-Empfang Pflicht',
      '"§7g IAB? Brauchen Sie nicht" — pauschale Abwehr ohne Berechnung = will keine Mühe machen',
      '"Kleinunternehmer-Schwellen sind 22k/50k" — falsch seit 2025 (jetzt 25k/100k)',
      '"GWG-Grenze ist 410€" — alte Grenze, seit 2018 bei 800€ netto',
      '"Ich habe nur Privat-Mandanten und ein paar GmbHs" — Operator-Knowledge fehlt',
      "Honorar-Bandbreiten ohne Mengen-Bezug (Belege/Monat, Buchungen/Jahr)",
      "Kein klarer Workflow für USt-Voranmeldung — wer fristwacht, wer überweist?",
      "Kein DATEVconnect oder API-Schnittstelle — Beleg-Email-Workflow ist 2026 nicht mehr akzeptabel",
    ],
    wofindet: [
      "Steuerberaterkammer-Suche (kammer-mv.de etc.)",
      "Local IHK Empfehlung",
      "Reddit r/dachgewerbe + r/Finanzen",
      "Lexoffice / sevDesk Partner-Liste (https://www.lexoffice.de/steuerberater-finden/)",
      "DATEV-Partner-Finder",
      "ProvenExpert/Trustpilot Steuerberater-Filter",
    ],
  },
];

const StbFinder = () => {
  const [aktive, setAktive] = useState<Set<string>>(new Set(["starter"]));
  const [filter, setFilter] = useState("");
  const [showQuestions, setShowQuestions] = useState(true);

  const toggle = (slug: string) =>
    setAktive((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const selected = useMemo(
    () => SPEZIALISIERUNGEN.filter((s) => aktive.has(s.slug)),
    [aktive],
  );

  const filtered = useMemo(() => {
    if (!filter.trim()) return selected;
    const q = filter.toLowerCase();
    return selected.map((s) => ({
      ...s,
      pflicht: s.pflicht.filter((p) => p.toLowerCase().includes(q)),
      erstterminFragen: s.erstterminFragen.filter((f) => f.toLowerCase().includes(q)),
    }));
  }, [selected, filter]);

  const allQuestions = useMemo(
    () => selected.flatMap((s) => s.erstterminFragen.map((f) => `[${s.name}] ${f}`)),
    [selected],
  );

  const copyQuestions = async () => {
    try {
      await navigator.clipboard.writeText(allQuestions.join("\n"));
      alert(`${allQuestions.length} Fragen in Zwischenablage kopiert.`);
    } catch {
      alert("Konnte nicht in Zwischenablage kopieren.");
    }
  };

  return (
    <CockpitShell
      eyebrow="StB-Auswahl-Wizard"
      title="Was du beim Steuerberater-Erstgespräch testen musst"
      subtitle="5 Spezialisierungen (E-Com, Crypto, Holding, International, Standard) mit Pflicht-Knowledge + Bonus-Knowledge + Honorar-Ranges + Erst-Termin-Frage-Katalog. Du wählst aus, kopierst die Fragen und gehst informiert in den Termin."
    >
      {/* Auswahl */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <h3 className="font-semibold text-sm mb-3">Welche Spezialisierungen brauchst du?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SPEZIALISIERUNGEN.map((s) => (
            <label
              key={s.slug}
              className={`flex items-start gap-2 p-3 rounded-xl border transition-colors cursor-pointer ${
                aktive.has(s.slug)
                  ? "border-accent-blue bg-accent-blue/5"
                  : "border-border hover:bg-secondary/30"
              }`}
            >
              <input
                type="checkbox"
                checked={aktive.has(s.slug)}
                onChange={() => toggle(s.slug)}
                className="mt-0.5 h-3.5 w-3.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span>{s.emoji}</span>
                  <span className="font-semibold text-sm">{s.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Filter + Copy-All */}
      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter Fragen / Pflichten..."
              className="w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-xs"
            />
          </div>
          <button
            onClick={copyQuestions}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
          >
            <Copy className="h-3.5 w-3.5" /> Alle Fragen kopieren ({allQuestions.length})
          </button>
          <button
            onClick={() => setShowQuestions(!showQuestions)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
          >
            {showQuestions ? "Pflicht-Knowledge zeigen" : "Erstterm.-Fragen zeigen"}
          </button>
        </div>
      )}

      {/* Spezialisierungs-Detail */}
      <div className="space-y-4">
        {filtered.map((s) => (
          <div key={s.slug} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-bold text-base flex items-center gap-2">
                <span className="text-xl">{s.emoji}</span> {s.name}
              </h4>
              <span className="inline-flex rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-semibold px-2 py-0.5">
                {s.honorarJahr}
              </span>
            </div>

            {showQuestions ? (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Wand2 className="h-3 w-3" /> Erst-Termin-Frage-Katalog
                </div>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                  {s.erstterminFragen.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Pflicht-Knowledge (das MUSS er können)
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-muted-foreground">
                    {s.pflicht.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-accent-blue font-semibold mb-1.5">
                    Bonus-Knowledge (sehr selten — das macht ihn premium)
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-muted-foreground">
                    {s.bonus.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-red-700 font-semibold mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Red-Flags (sofort disqualifizieren)
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-muted-foreground">
                    {s.redFlags.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Wo du nach diesen StBs suchst
                  </div>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-muted-foreground">
                    {s.wofindet.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selected.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Wähle oben mindestens eine Spezialisierung.
        </div>
      )}

      {/* Hinweis */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mt-6 text-xs leading-relaxed">
        <div className="font-semibold mb-2">Erstgespräch-Strategie</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li>3-4 StBs anrufen, alle gleiche Fragen stellen — vergleichbare Antworten</li>
          <li>StB der bei einer Pflicht-Frage zögert oder umschweift = nicht qualifiziert in dem Bereich</li>
          <li>Honorar IMMER schriftlich fixieren — Buchführung pro Monat + Jahresabschluss separat</li>
          <li>Mandanten-Referenzen in deiner Branche fragen (z.B. 'darf ich 1 Amazon-Mandanten anrufen?')</li>
          <li>Erstgespräch i.d.R. kostenlos. Erste Beratung ab Termin 2 ist Honorar-pflichtig (250-450 €/h)</li>
        </ul>
      </div>
    </CockpitShell>
  );
};

export default StbFinder;
