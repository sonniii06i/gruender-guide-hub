/**
 * GewerbeCheck — "Brauche ich überhaupt ein Gewerbe?"
 *
 * Tool 1 der Anfänger-Wave. Decision-Tree für komplette Beginner ohne
 * Steuer-Vorwissen. Layout-Pattern für alle künftigen Anfänger-Tools:
 *
 * 1. BeginnerHero — "Was ist das hier?" + "Wann brauchst du das?"
 * 2. Step-Wizard — eine Frage pro Schritt, simple Sprache, Skip-Erklärung
 * 3. Empfehlungs-Karte — Klartext-Verdict mit Farb-Code + Begründung
 * 4. Next-Steps — konkrete Action-Items mit Links zu weiterführenden Tools
 * 5. Glossar — Fachbegriffe einklappbar erklärt
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Sparkles,
} from "lucide-react";

type Taetigkeit =
  | "dienstleistung-handel"   // Klassisch Gewerblich
  | "produktverkauf"
  | "beratung-coaching"       // Grenzfall
  | "kunst-schreiben-musik"   // Künstlerisch → Freiberuf
  | "software-entwicklung"    // §18 Ingenieur-ähnlich
  | "lehre-unterricht"        // Freiberuf
  | "heilberuf-medizin"       // Freiberuf
  | "rechts-steuer-beratung"  // Freiberuf
  | "unsicher";

type Regelmaessigkeit = "einmalig" | "selten" | "nebenbei-regelmaessig" | "hauptberuflich";
type Gewinnabsicht = "ja" | "nein-hobby" | "unsicher";
type Gewinnstufe = "unter-410" | "unter-3000" | "unter-25000" | "ueber-25000";

interface Setup {
  taetigkeit?: Taetigkeit;
  regelmaessigkeit?: Regelmaessigkeit;
  gewinnabsicht?: Gewinnabsicht;
  gewinnstufe?: Gewinnstufe;
}

type Verdict =
  | "hobby"
  | "freiberuf"
  | "gewerbe"
  | "unklar"
  | "kleinunternehmer-tauglich";

const TAETIGKEITEN: { v: Taetigkeit; label: string; emoji: string; freiberuf: "ja" | "nein" | "vielleicht"; beispiele: string }[] = [
  { v: "dienstleistung-handel", label: "Dienstleistung / Handel", emoji: "🛍️", freiberuf: "nein", beispiele: "Online-Shop, Verkauf, Vermittlung, Marketing-Agentur, SEO/SEA, Social-Media-Agentur" },
  { v: "produktverkauf", label: "Produktverkauf", emoji: "📦", freiberuf: "nein", beispiele: "Amazon-FBA, eigene Marke, Dropshipping, Handarbeit verkaufen, eBay-Reseller" },
  { v: "beratung-coaching", label: "Coaching / Beratung", emoji: "💼", freiberuf: "vielleicht", beispiele: "Business-Coach, Lifecoach, Mentaltrainer (oft gewerblich), Unternehmensberater (oft freiberuflich)" },
  { v: "kunst-schreiben-musik", label: "Kunst / Schreiben / Musik", emoji: "🎨", freiberuf: "ja", beispiele: "Autor:in, Musiker:in, Maler:in, Fotograf:in, Designer:in, YouTuber (i.d.R. freiberuflich)" },
  { v: "software-entwicklung", label: "Software / IT / Engineering", emoji: "💻", freiberuf: "ja", beispiele: "Programmierer:in, IT-Beratung, Ingenieur:in, Web-Developer (Katalogberuf §18 EStG)" },
  { v: "lehre-unterricht", label: "Lehre / Unterricht", emoji: "🎓", freiberuf: "ja", beispiele: "Nachhilfe, Sprachlehrer:in, Yoga-/Sport-Trainer:in, Online-Kurs-Anbieter" },
  { v: "heilberuf-medizin", label: "Heilberufe / Medizin", emoji: "⚕️", freiberuf: "ja", beispiele: "Arzt/Ärztin, Heilpraktiker:in, Physio, Logopäde:in, Hebamme — alle Katalog §18 EStG" },
  { v: "rechts-steuer-beratung", label: "Recht / Steuer / Wirtschaftsprüfung", emoji: "⚖️", freiberuf: "ja", beispiele: "Anwalt/Anwältin, Steuerberater:in, Wirtschaftsprüfer:in" },
  { v: "unsicher", label: "Bin mir unsicher / etwas anderes", emoji: "🤔", freiberuf: "vielleicht", beispiele: "Wenn deine Tätigkeit nicht klar in eine Kategorie passt — wir geben dir eine Empfehlung zur Klärung" },
];

// ============================================================================
// Rechtsform-Empfehlungs-Logik
// ============================================================================
type RechtsformId = "einzel-frei" | "einzel-gewerbe" | "gbr" | "ug" | "gmbh";

type RechtsformReco = {
  empfohlen: RechtsformId;
  empfohlenLabel: string;
  begruendung: string;
  ustModus: "ku-19" | "regel" | "egal";
  ustHinweis: string;
  alternativen: {
    id: RechtsformId;
    label: string;
    pro: string;
    contra: string;
  }[];
};

const RECHTSFORM_LABEL: Record<RechtsformId, string> = {
  "einzel-frei": "Einzelunternehmen (Freiberufler:in)",
  "einzel-gewerbe": "Einzelunternehmen (Gewerbe)",
  "gbr": "GbR (Gesellschaft bürgerlichen Rechts)",
  "ug": "UG (haftungsbeschränkt) — Mini-GmbH",
  "gmbh": "GmbH",
};

function berechneRechtsformEmpfehlung(setup: Setup): RechtsformReco {
  const t = TAETIGKEITEN.find((x) => x.v === setup.taetigkeit)!;
  const istFreiberuf = t.freiberuf === "ja";
  const istGewerbe = t.freiberuf === "nein";
  const niedrigerGewinn = setup.gewinnstufe === "unter-410" || setup.gewinnstufe === "unter-3000";
  const mittlererGewinn = setup.gewinnstufe === "unter-25000";
  const hoherGewinn = setup.gewinnstufe === "ueber-25000";
  const istHobby = setup.gewinnabsicht === "nein-hobby";

  // Hobby → keine Rechtsform-Empfehlung relevant
  if (istHobby) {
    return {
      empfohlen: "einzel-frei",
      empfohlenLabel: "Keine — bleib Hobby",
      begruendung: "Solange du ohne Gewinnerzielungsabsicht handelst (Liebhaberei), brauchst du KEINE Rechtsform und KEINE Anmeldung. Wenn sich das ändert, komm zurück und mach den Check neu.",
      ustModus: "egal",
      ustHinweis: "Keine USt-Pflicht bei Liebhaberei.",
      alternativen: [],
    };
  }

  // === FREIBERUF ===
  if (istFreiberuf) {
    const ustModus = niedrigerGewinn || mittlererGewinn ? "ku-19" : "regel";
    return {
      empfohlen: "einzel-frei",
      empfohlenLabel: "Einzelunternehmen als Freiberufler:in",
      begruendung: "Für die allermeisten Solo-Freiberufler:innen die richtige Wahl: keine Gewerbeanmeldung, keine GewSt, keine IHK-Pflicht, keine Buchführungspflicht (EÜR reicht bis 800k Umsatz). Du brauchst KEINE Rechtsform-Anmeldung — nur die steuerliche Erfassung beim Finanzamt.",
      ustModus,
      ustHinweis: ustModus === "ku-19"
        ? "Bei deinem Gewinn lohnt §19 UStG (Kleinunternehmer): keine USt auf Rechnungen, keine USt-Voranmeldungen. Grenze: 25k Vorjahres-Umsatz / 100k Prognose. ABER: kein Vorsteuer-Abzug — bei viel B2B-Geschäft mit teuren Anschaffungen kann Regelbesteuerung besser sein."
        : "Bei deinem erwarteten Umsatz wahrscheinlich Regelbesteuerung sinnvoll — mit Vorsteuer-Abzug. KU §19 nur falls Umsatz unter 25k bleibt.",
      alternativen: [
        {
          id: "gbr",
          label: "GbR mit 2+ Personen",
          pro: "Wenn du mit Partner:in zusammenarbeitest. Einfach gegründet (Schriftform genügt), keine Stammkapital.",
          contra: "Volle persönliche Haftung beider Partner:innen, Konflikte schwer auflösbar.",
        },
        {
          id: "gmbh",
          label: "GmbH (mit 25k Stammkapital)",
          pro: "Haftungsbeschränkung. Sinnvoll bei sehr hohem Gewinn (>150k) wegen Thesaurierungs-Vorteil.",
          contra: "Komplexe Buchführung (Bilanz), Notar-Gründung ~1.500 €, IHK-Pflicht. Für Solo-Freiberuf meist Overkill.",
        },
      ],
    };
  }

  // === GEWERBE ===
  if (istGewerbe) {
    // Niedrig + Mittel: Einzel-Gewerbe + KU
    if (niedrigerGewinn || mittlererGewinn) {
      return {
        empfohlen: "einzel-gewerbe",
        empfohlenLabel: "Einzelunternehmen (Gewerbe) + §19 KU",
        begruendung: "Für Solo-Gewerbe bei niedrigem bis mittlerem Gewinn klar die einfachste Option: GewA1-Anmeldung (15-65 €), keine Stammkapital, EÜR statt Bilanz, GewSt-Freibetrag 24.500 €. Volle persönliche Haftung — bei deinem Risiko-Profil aber meist okay.",
        ustModus: "ku-19",
        ustHinweis: "Kleinunternehmer §19 UStG empfohlen (Vorjahres-Umsatz < 25k / Prognose < 100k): keine USt-Ausweisung, keine USt-VA. Bindung 5 Jahre. Wechsel zu Regelbesteuerung nur wenn du viele teure Anschaffungen mit Vorsteuer-Abzug hast oder dein Hauptkundenkreis B2B ist.",
        alternativen: [
          {
            id: "ug",
            label: "UG (haftungsbeschränkt)",
            pro: "Bei Risiko-intensiver Tätigkeit (Produkthaftung, hoher Lagerwert): Haftung auf Stammkapital begrenzt. Ab 1 € Stammkapital, aber 25 % vom Gewinn müssen als Rücklage aufgebaut werden bis 25k erreicht.",
            contra: "Notar nötig (~500 €), Handelsregister-Eintrag, Bilanz-Pflicht, IHK-Pflicht, höhere Buchführungskosten (~2-3k €/J StB-Honorar).",
          },
          {
            id: "gbr",
            label: "GbR mit Partner:in",
            pro: "Falls du nicht solo bist. Einfach gegründet, EÜR ausreichend.",
            contra: "Volle persönliche Haftung beider Partner:innen, GewA1 pro Person.",
          },
        ],
      };
    }
    // Hoch: erwäge UG/GmbH
    return {
      empfohlen: "einzel-gewerbe",
      empfohlenLabel: "Einzelunternehmen (Gewerbe) — UG/GmbH erwägen",
      begruendung: "Bei Solo-Gewerbe und Gewinn > 25k €/Jahr ist Einzelunternehmen weiterhin möglich, aber UG/GmbH lohnen sich zu prüfen. Vorteile: Haftungsbeschränkung + Thesaurierungs-Vorteil bei nicht entnommenen Gewinnen (KSt 15 % + GewSt vs. ESt-Spitze 42 %).",
      ustModus: "regel",
      ustHinweis: "Bei diesem Gewinn klar Regelbesteuerung — KU §19 wäre wegen Umsatz > 25k ohnehin nicht mehr möglich. Du brauchst USt-ID (bei EU-Geschäft Pflicht) und musst USt-VA monatlich/quartalsweise abgeben.",
      alternativen: [
        {
          id: "ug",
          label: "UG (haftungsbeschränkt)",
          pro: "Haftungsbeschränkung + Thesaurierungs-Vorteil. Ab 1 € Stammkapital + Rücklagenbildung bis 25k. Notar ~500 €.",
          contra: "Bilanz-Pflicht + DAS Handelsregister + ~2-3k €/J Buchhaltungskosten. Geschäftsführer-Gehalt muss sozialversicherungspflichtig sein.",
        },
        {
          id: "gmbh",
          label: "GmbH (25k Stammkapital)",
          pro: "Klassische Rechtsform mit voller Haftungsbeschränkung. Bessere Reputation bei B2B-Kunden, Banken, Investoren.",
          contra: "25k Stammkapital binden, ~1.500 € Notar-/Gründungs-Kosten, sonst gleiche Pflichten wie UG.",
        },
      ],
    };
  }

  // === UNKLAR ===
  return {
    empfohlen: "einzel-gewerbe",
    empfohlenLabel: "Erst Status klären, dann Rechtsform",
    begruendung: "Da deine Tätigkeit zwischen Freiberuf und Gewerbe liegt: erst den Status mit dem Finanzamt klären (kostenlose schriftliche Anfrage). Dann je nach Ergebnis: bei Freiberuf → Einzelunternehmen ohne GewA1; bei Gewerbe → Einzelunternehmen mit GewA1.",
    ustModus: niedrigerGewinn || mittlererGewinn ? "ku-19" : "regel",
    ustHinweis: niedrigerGewinn || mittlererGewinn
      ? "Bei deinem Gewinn KU §19 UStG sinnvoll. Im FsE-Fragebogen ankreuzen."
      : "Regelbesteuerung — KU-Grenzen werden überschritten.",
    alternativen: [],
  };
}

const GewerbeCheck = () => {
  const [step, setStep] = useState(0);
  const [setup, setSetup] = useState<Setup>({});

  const rechtsformEmpfehlung = useMemo<RechtsformReco | null>(() => {
    if (!setup.taetigkeit || !setup.gewinnabsicht || !setup.gewinnstufe) return null;
    return berechneRechtsformEmpfehlung(setup);
  }, [setup]);

  const verdict: { type: Verdict; titel: string; farbe: "gruen" | "blau" | "amber" | "rot"; begruendung: string; nextSteps: { text: string; route?: string; extern?: string }[] } | null = useMemo(() => {
    if (!setup.taetigkeit || !setup.regelmaessigkeit || !setup.gewinnabsicht || !setup.gewinnstufe) return null;

    const t = TAETIGKEITEN.find((x) => x.v === setup.taetigkeit)!;
    const istHobby = setup.gewinnabsicht === "nein-hobby" || (setup.regelmaessigkeit === "einmalig" && setup.gewinnstufe === "unter-410");

    // Verdict 1: HOBBY / Liebhaberei
    if (istHobby) {
      return {
        type: "hobby",
        titel: "Du brauchst (noch) kein Gewerbe",
        farbe: "gruen",
        begruendung:
          setup.gewinnabsicht === "nein-hobby"
            ? "Ohne Gewinnerzielungsabsicht = Liebhaberei. Das Finanzamt sieht das als Hobby — kein Gewerbe nötig, keine Steuer auf den Erlös."
            : `Bei einmaligen Aktivitäten unter ~410 € Gewinn greift die Bagatell-Grenze. Aber Achtung: bei mehrmaliger Wiederholung wertet das FA das als 'nachhaltige Gewinnerzielungsabsicht' und du bist plötzlich gewerbe-/anmeldepflichtig.`,
        nextSteps: [
          { text: "Wichtige Schwellen: §22 EStG Sonstige Einkünfte unter 256 €/J steuerfrei · Ehrenamtspauschale 840 €/J · Übungsleiterpauschale 3.000 €/J" },
          { text: "Bei wiederholtem Verkauf (Flohmarkt, eBay-Reseller): nach 3+ Wiederholungen pro Jahr droht 'Nachhaltigkeit' → Gewerbe-Pflicht. Im Zweifel beim FA anfragen." },
          {
            text: "Falls trotzdem ESt-Erklärung nötig: Anlage 'Sonstige Einkünfte' §22 EStG (Freigrenze 256 €/J)",
            extern: "https://www.steuern.de/steuererklaerung-anlage-so",
          },
        ],
      };
    }

    // Verdict 2: Eindeutig Freiberuf (Katalogberuf §18 EStG)
    if (t.freiberuf === "ja") {
      const ku = setup.gewinnstufe === "unter-410" || setup.gewinnstufe === "unter-3000";
      return {
        type: ku ? "kleinunternehmer-tauglich" : "freiberuf",
        titel: "Du bist Freiberufler:in (§18 EStG)",
        farbe: "blau",
        begruendung: `${t.label} fällt unter die Katalogberufe nach §18 Abs. 1 Nr. 1 EStG — KEINE Gewerbeanmeldung nötig. Du brauchst nur die steuerliche Erfassung beim Finanzamt (Fragebogen via ELSTER).${
          ku ? " Bei deinem erwarteten Gewinn lohnt sich i.d.R. die Kleinunternehmer-Regelung §19 UStG (kein Umsatzsteuer-Ausweis, kein VSt-Abzug)." : ""
        }`,
        nextSteps: [
          {
            text: "Fragebogen zur steuerlichen Erfassung via ELSTER ausfüllen (Pflicht binnen 1 Monat)",
            extern: "https://www.elster.de",
          },
          {
            text: "Keine IHK-/HWK-Pflichtmitgliedschaft (Freiberufler:innen)",
          },
          {
            text: "Berufsgenossenschaft prüfen — manche Berufe Pflicht (z.B. Heilberufe)",
          },
          {
            text: "Krankenversicherung: KSK prüfen (Künstler/Publizisten) — Bund übernimmt 50%!",
            extern: "https://www.kuenstlersozialkasse.de",
          },
          { text: "USt-Rechner: prüfe Kleinunternehmer §19 (25k/100k 2026)", route: "/cockpit/ust-rechner" },
        ],
      };
    }

    // Verdict 3: Eindeutig Gewerbe (Handel, Produktverkauf etc.)
    if (t.freiberuf === "nein") {
      const ku = setup.gewinnstufe === "unter-410" || setup.gewinnstufe === "unter-3000";
      return {
        type: ku ? "kleinunternehmer-tauglich" : "gewerbe",
        titel: "Du brauchst ein Gewerbe",
        farbe: "amber",
        begruendung: `${t.label} ist eindeutig gewerblich (nicht §18 EStG). Du musst beim Gewerbeamt anmelden (15-65 € je Stadt). Das Gewerbeamt leitet automatisch ans Finanzamt + IHK weiter. GewSt erst bei Gewinn > 24.500 €/Jahr — die meisten Anfänger:innen zahlen also vorerst keine GewSt.${
          ku ? " Bei deinem erwarteten Gewinn lohnt sich i.d.R. die Kleinunternehmer-Regelung §19 UStG." : ""
        }`,
        nextSteps: [
          { text: "Gewerbe-Anmeldung beim örtlichen Gewerbeamt (15-65 € je nach Stadt)" },
          { text: "Fragebogen zur steuerlichen Erfassung via ELSTER (Pflicht binnen 1 Monat)", extern: "https://www.elster.de" },
          {
            text: "IHK-Pflichtmitgliedschaft (automatisch) — Befreiung möglich bei Gewinn < 25k €/J (§3 IHKG)",
          },
          {
            text: "Berufsgenossenschaft anmelden innerhalb 1 Woche (Pflicht §192 SGB VII, auch ohne Mitarbeiter)",
          },
          { text: "USt-Rechner: Kleinunternehmer §19 prüfen", route: "/cockpit/ust-rechner" },
          { text: "Frist-Kalender personalisieren (USt-VA, ESt-VZ, GewSt-VZ)", route: "/cockpit/steuer" },
        ],
      };
    }

    // Verdict 4: Vielleicht Freiberuf, vielleicht Gewerbe
    return {
      type: "unklar",
      titel: "Status nicht eindeutig — Klärung nötig",
      farbe: "amber",
      begruendung: `${t.label} kann sowohl freiberuflich als auch gewerblich sein — hängt vom konkreten Inhalt deiner Tätigkeit ab (z.B. Beratung von Wirtschaftlern = freiberuflich nach §18, Lifecoaching ohne Ausbildung = oft gewerblich). Lass dir das vom Finanzamt vor Anmeldung schriftlich bestätigen, das spart spätere Streitigkeiten.`,
      nextSteps: [
        {
          text: "Schriftliche Anfrage an dein örtliches Finanzamt 'Beurteilung freiberufliche vs. gewerbliche Tätigkeit' — kostenlos, ca. 4-8 Wochen",
        },
        {
          text: "Alternativ: kostenloses Erstgespräch beim Steuerberater (ca. 0-150€) für verbindliche Einordnung",
          route: "/cockpit/stb-finder",
        },
        {
          text: "IHK-Gründungsberatung kostenlos buchen — die kennen lokale FA-Praxis",
          extern: "https://www.ihk.de",
        },
        {
          text: "Felix-Chat fragen — kostenloser AI-Berater mit Steuer-Know-how",
          route: "/felix",
        },
      ],
    };
  }, [setup]);

  const reset = () => {
    setSetup({});
    setStep(0);
  };
  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const stepCount = 4;
  const progressPct = Math.min(100, ((step) / stepCount) * 100);

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Brauche ich überhaupt ein Gewerbe?"
      subtitle="Decision-Tree in 4 Fragen: Hobby, Freiberuf oder Gewerbe? Klartext-Empfehlung mit konkreten Action-Items — keine Steuer-Vorkenntnisse nötig."
    >
      {/* === BeginnerHero: "Was ist das hier?" === */}
      <BeginnerHero />

      {/* === Progress-Bar === */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="text-muted-foreground">
            {step < stepCount ? `Frage ${step + 1} von ${stepCount}` : "Fertig!"}
          </span>
          <span className="text-muted-foreground">{Math.round(progressPct)} %</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-accent-blue transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* === Steps === */}
      {step === 0 && (
        <StepFrame
          title="Was machst du genau?"
          erklaerung="Die Tätigkeit bestimmt, ob du beim Gewerbeamt anmelden musst oder nur beim Finanzamt. Manche Berufe (Katalogberufe §18 EStG) sind automatisch freiberuflich — kein Gewerbe nötig."
          onNext={setup.taetigkeit ? next : undefined}
          onPrev={undefined}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {TAETIGKEITEN.map((t) => (
              <button
                key={t.v}
                onClick={() => setSetup({ ...setup, taetigkeit: t.v })}
                className={`text-left rounded-xl border p-3 transition ${
                  setup.taetigkeit === t.v
                    ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{t.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-semibold text-sm">{t.label}</div>
                      {t.freiberuf === "ja" && (
                        <span className="rounded-full bg-blue-500/10 text-blue-700 px-2 py-0.5 text-[10px] font-semibold">
                          Freiberuf
                        </span>
                      )}
                      {t.freiberuf === "nein" && (
                        <span className="rounded-full bg-amber-500/10 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">
                          Gewerbe
                        </span>
                      )}
                      {t.freiberuf === "vielleicht" && (
                        <span className="rounded-full bg-purple-500/10 text-purple-700 px-2 py-0.5 text-[10px] font-semibold">
                          Beides möglich
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-relaxed">{t.beispiele}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </StepFrame>
      )}

      {step === 1 && (
        <StepFrame
          title="Wie regelmäßig machst du das?"
          erklaerung="Eine einmalige Aktion (z.B. Garagenflohmarkt) ist KEIN Gewerbe. Sobald du regelmäßig mit Gewinn handelst, sieht das FA das als 'nachhaltige Gewinnerzielungsabsicht' — dann musst du anmelden."
          onNext={setup.regelmaessigkeit ? next : undefined}
          onPrev={prev}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {([
              { v: "einmalig", l: "Einmalig / Ausnahme", d: "Z.B. einmal etwas verkauft, nicht geplant zu wiederholen" },
              { v: "selten", l: "1-3 mal im Jahr", d: "Sporadisch, kein laufendes Geschäft" },
              { v: "nebenbei-regelmaessig", l: "Regelmäßig nebenbei", d: "Wöchentlich/monatlich neben Hauptjob" },
              { v: "hauptberuflich", l: "Hauptberuflich / Vollzeit", d: "Ist (oder wird) dein Haupt-Einkommen" },
            ] as { v: Regelmaessigkeit; l: string; d: string }[]).map((o) => (
              <button
                key={o.v}
                onClick={() => setSetup({ ...setup, regelmaessigkeit: o.v })}
                className={`text-left rounded-xl border p-3 transition ${
                  setup.regelmaessigkeit === o.v
                    ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >
                <div className="font-semibold text-sm mb-1">{o.l}</div>
                <div className="text-[11px] text-muted-foreground">{o.d}</div>
              </button>
            ))}
          </div>
        </StepFrame>
      )}

      {step === 2 && (
        <StepFrame
          title="Willst du Gewinn machen?"
          erklaerung="Das ist die entscheidende Frage des Finanzamts: 'Gewinnerzielungsabsicht?'. Ohne Gewinnabsicht = Liebhaberei = kein Gewerbe nötig. Mit Gewinnabsicht (auch langfristig, auch kleine Beträge) musst du anmelden."
          onNext={setup.gewinnabsicht ? next : undefined}
          onPrev={prev}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {([
              { v: "ja", l: "Ja, das soll Geld bringen", d: "Wirtschaftlich denken, Wachstum oder Nebeneinkommen" },
              { v: "nein-hobby", l: "Nein, reines Hobby", d: "Spaß steht im Vordergrund, Gewinne zufällig" },
              { v: "unsicher", l: "Vielleicht später", d: "Aktuell noch unklar, könnte sich entwickeln" },
            ] as { v: Gewinnabsicht; l: string; d: string }[]).map((o) => (
              <button
                key={o.v}
                onClick={() => setSetup({ ...setup, gewinnabsicht: o.v })}
                className={`text-left rounded-xl border p-3 transition ${
                  setup.gewinnabsicht === o.v
                    ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >
                <div className="font-semibold text-sm mb-1">{o.l}</div>
                <div className="text-[11px] text-muted-foreground">{o.d}</div>
              </button>
            ))}
          </div>
        </StepFrame>
      )}

      {step === 3 && (
        <StepFrame
          title="Wie viel Gewinn erwartest du pro Jahr?"
          erklaerung="Wichtig für: Kleinunternehmer-Regelung §19 UStG (bis 25.000 € Vorjahres-Umsatz / 100.000 € aktuelles Jahr 2026), GewSt-Freibetrag (24.500 €), IHK-Befreiung. Schätze ehrlich — bei deutlicher Abweichung später Anpassungs-Antrag stellen."
          onNext={setup.gewinnstufe ? next : undefined}
          onPrev={prev}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {([
              { v: "unter-410", l: "Unter 410 € pro Jahr", d: "Mini-Gewinn — wahrscheinlich noch Hobby-Schwelle" },
              { v: "unter-3000", l: "410 € – 3.000 € pro Jahr", d: "Klassisches Side-Hustle-Niveau" },
              { v: "unter-25000", l: "3.000 € – 25.000 € pro Jahr", d: "Hauptberuflicher Verdienst möglich" },
              { v: "ueber-25000", l: "Über 25.000 € pro Jahr", d: "Skalierter Solo-Self oder Vollzeit-Business" },
            ] as { v: Gewinnstufe; l: string; d: string }[]).map((o) => (
              <button
                key={o.v}
                onClick={() => setSetup({ ...setup, gewinnstufe: o.v })}
                className={`text-left rounded-xl border p-3 transition ${
                  setup.gewinnstufe === o.v
                    ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >
                <div className="font-semibold text-sm mb-1">{o.l}</div>
                <div className="text-[11px] text-muted-foreground">{o.d}</div>
              </button>
            ))}
          </div>
        </StepFrame>
      )}

      {/* === Ergebnis === */}
      {step === 4 && verdict && (
        <>
          <div
            className={`rounded-2xl border-2 p-6 mb-6 ${
              verdict.farbe === "gruen"
                ? "border-emerald-500/40 bg-emerald-500/5"
                : verdict.farbe === "blau"
                ? "border-blue-500/40 bg-blue-500/5"
                : verdict.farbe === "amber"
                ? "border-amber-500/40 bg-amber-500/5"
                : "border-red-500/40 bg-red-500/5"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              {verdict.farbe === "gruen" ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-700 shrink-0" />
              ) : verdict.farbe === "blau" ? (
                <Sparkles className="h-8 w-8 text-blue-700 shrink-0" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-amber-700 shrink-0" />
              )}
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dein Ergebnis</div>
                <h2 className="text-2xl font-bold">{verdict.titel}</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{verdict.begruendung}</p>
          </div>

          {/* === Rechtsform-Empfehlung === */}
          {rechtsformEmpfehlung && verdict.type !== "hobby" && (
            <RechtsformBox reco={rechtsformEmpfehlung} />
          )}

          <div className="rounded-2xl border border-border bg-card p-5 mb-6">
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
                      <a
                        href={s.extern}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-blue hover:underline font-medium"
                      >
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

          <div className="flex gap-2 mb-6">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Nochmal starten
            </button>
          </div>
        </>
      )}

      {/* === Glossar === */}
      <Glossar />

      <Stand2026Footer
        sources={[
          { label: "§14 GewO Gewerbeanmeldung", url: "https://www.gesetze-im-internet.de/gewo/__14.html" },
          { label: "§18 EStG Katalogberufe Freiberufler", url: "https://www.gesetze-im-internet.de/estg/__18.html" },
          { label: "§15 EStG Gewerbebetrieb", url: "https://www.gesetze-im-internet.de/estg/__15.html" },
          { label: "§19 UStG Kleinunternehmer-Regelung", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
          { label: "§22 EStG Sonstige Einkünfte (Hobby/Liebhaberei)", url: "https://www.gesetze-im-internet.de/estg/__22.html" },
          { label: "IHK Gründung-Beratung", url: "https://www.ihk.de" },
        ]}
        note="Decision-Tree ist Orientierung — finale Einordnung trifft das Finanzamt im Einzelfall. Bei Grenzfällen schriftliche FA-Anfrage stellen oder Erstgespräch beim Steuerberater. Status freiberuflich vs gewerblich kann vom FA jederzeit per Betriebsprüfung umgewidmet werden."
      />
    </CockpitShell>
  );
};

// ===== Sub-Components =====

const RechtsformBox = ({ reco }: { reco: RechtsformReco }) => (
  <div className="rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3 mb-3">
      <div className="h-10 w-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-xl shrink-0">
        🏛️
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs uppercase tracking-wider text-purple-700 font-semibold mb-1">
          Empfohlene Rechtsform + USt-Modus
        </div>
        <h3 className="text-lg font-bold">{reco.empfohlenLabel}</h3>
      </div>
    </div>

    <p className="text-sm leading-relaxed mb-4">{reco.begruendung}</p>

    {/* USt-Modus-Hinweis */}
    <div className="rounded-xl bg-card border border-border p-3 mb-4">
      <div className="flex items-start gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mt-0.5 ${
          reco.ustModus === "ku-19" ? "bg-emerald-500/15 text-emerald-700"
          : reco.ustModus === "regel" ? "bg-blue-500/15 text-blue-700"
          : "bg-secondary/50 text-muted-foreground"
        }`}>
          {reco.ustModus === "ku-19" ? "§19 KU empfohlen"
           : reco.ustModus === "regel" ? "Regelbesteuerung"
           : "USt egal"}
        </span>
        <div className="flex-1 text-xs leading-relaxed text-muted-foreground">{reco.ustHinweis}</div>
      </div>
    </div>

    {/* Alternativen */}
    {reco.alternativen.length > 0 && (
      <details className="rounded-xl border border-border bg-card/60 p-3">
        <summary className="cursor-pointer text-xs font-semibold flex items-center gap-1.5">
          <span className="text-purple-700">▸</span> Alternativen ansehen ({reco.alternativen.length})
        </summary>
        <div className="mt-3 space-y-3">
          {reco.alternativen.map((alt) => (
            <div key={alt.id} className="rounded-lg bg-secondary/30 p-3 text-xs">
              <div className="font-semibold mb-1">{alt.label}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="text-emerald-700"><strong>+ Pro:</strong> <span className="text-muted-foreground">{alt.pro}</span></div>
                <div className="text-amber-700"><strong>− Contra:</strong> <span className="text-muted-foreground">{alt.contra}</span></div>
              </div>
            </div>
          ))}
        </div>
      </details>
    )}

    {/* Cross-Links zu vertiefenden Tools */}
    <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2 text-[11px]">
      <span className="text-muted-foreground">Tiefer einsteigen:</span>
      <Link to="/cockpit/gewerbeanmeldung-wizard" className="text-purple-700 hover:underline font-medium">
        Gewerbeanmeldung-Wizard →
      </Link>
      <Link to="/wizard/rechtsform" className="text-purple-700 hover:underline font-medium">
        Rechtsform-Wizard →
      </Link>
      <Link to="/cockpit/brutto-netto-solo" className="text-purple-700 hover:underline font-medium">
        Brutto-Netto-Rechner →
      </Link>
    </div>
  </div>
);

const BeginnerHero = () => (
  <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Was ist das hier?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Du verkaufst was, machst Beratung, oder hast eine Idee — und weißt nicht, ob du <strong>überhaupt</strong>{" "}
          ein Gewerbe anmelden musst? Dieses Tool führt dich in 4 Fragen durch die wichtigste Vorentscheidung
          deiner Selbstständigkeit: <strong>Hobby, Freiberuf oder Gewerbe?</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-lg bg-emerald-500/5 p-2 border border-emerald-500/20">
            <strong className="text-emerald-700">🌿 Hobby</strong>
            <div className="text-muted-foreground mt-0.5">Keine Gewinnabsicht oder einmalig — nichts melden, evtl. Anlage 'Sonstige' §22 EStG</div>
          </div>
          <div className="rounded-lg bg-blue-500/5 p-2 border border-blue-500/20">
            <strong className="text-blue-700">📘 Freiberuf</strong>
            <div className="text-muted-foreground mt-0.5">Katalogberuf §18 EStG — nur Finanzamt-Fragebogen, kein Gewerbeschein, keine GewSt, keine IHK-Pflicht</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 p-2 border border-amber-500/20">
            <strong className="text-amber-700">🏪 Gewerbe</strong>
            <div className="text-muted-foreground mt-0.5">Handel/Produktion/Dienstleistung — Gewerbeamt (15-65€), IHK, ggf. GewSt ab 24.500€ Gewinn</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StepFrame = ({
  title,
  erklaerung,
  children,
  onNext,
  onPrev,
}: {
  title: string;
  erklaerung: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}) => (
  <div className="rounded-2xl border border-border bg-card p-5 mb-6">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 mb-4 text-xs leading-relaxed flex items-start gap-2">
      <Info className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
      <div className="text-muted-foreground">{erklaerung}</div>
    </div>
    <div className="mb-4">{children}</div>
    <div className="flex justify-between gap-2">
      <button
        onClick={onPrev}
        disabled={!onPrev}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4" /> Zurück
      </button>
      <button
        onClick={onNext}
        disabled={!onNext}
        className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90"
      >
        Weiter <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" />
      Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { begriff: "Freiberufler:in", erklaerung: "Selbstständig in einem 'Katalogberuf' nach §18 Abs. 1 Nr. 1 EStG (Ärzt:innen, Rechtsanwält:innen, Ingenieur:innen, Künstler:innen, Journalist:innen u.a.) oder in einem 'ähnlichen Beruf'. KEINE Gewerbeanmeldung, KEINE Gewerbesteuer, KEINE IHK-Pflichtmitgliedschaft. Nur Fragebogen beim Finanzamt." },
        { begriff: "Gewerbe", erklaerung: "Selbstständige, nachhaltige Tätigkeit mit Gewinnerzielungsabsicht, die nicht freiberuflich, land-/forstwirtschaftlich oder Vermögensverwaltung ist. Pflicht: Anmeldung beim Gewerbeamt (15-65 €), IHK-Mitgliedschaft, ggf. Gewerbesteuer ab 24.500 €/J Gewinn." },
        { begriff: "Kleingewerbe", erklaerung: "Umgangssprachlich für 'Gewerbe in kleinem Umfang' (Nicht-Kaufmann i.S.d. HGB). Hat nichts mit der USt-Kleinunternehmer-Regelung zu tun! Vereinfachte Buchhaltung (EÜR statt Bilanz)." },
        { begriff: "Kleinunternehmer-Regelung (§19 UStG)", erklaerung: "Du musst keine Umsatzsteuer ausweisen, kannst aber auch keine Vorsteuer ziehen. 2026: Vorjahres-Umsatz unter 25.000 €, aktuelles Jahr unter 100.000 €. Vorteil: einfacher. Nachteil: keine VSt zurück (lohnt sich nicht wenn du viel investierst)." },
        { begriff: "Gewinnerzielungsabsicht", erklaerung: "Du willst auf Dauer einen Gewinn machen (auch wenn die ersten Jahre Verluste sind). Wichtig für die Abgrenzung zur 'Liebhaberei' (= Hobby, das nicht profitabel sein muss)." },
        { begriff: "Liebhaberei", erklaerung: "Das Finanzamt nimmt an, dass du KEINEN Gewinn erzielen willst (typisch: Pferdezucht, Künstler:in im Verlust seit 7+ Jahren). Folge: Verluste sind nicht steuerlich abzugsfähig, Gewinne sind auch nicht steuerbar." },
        { begriff: "Fragebogen zur steuerlichen Erfassung", erklaerung: "Pflichtformular nach jeder Gründung — du gibst dem Finanzamt deine voraussichtlichen Umsätze + Gewinne + Familienstand an. Daraus berechnet das FA deine Vorauszahlungen. Pflicht binnen 1 Monat via ELSTER." },
        { begriff: "EÜR (Einnahmen-Überschuss-Rechnung)", erklaerung: "Vereinfachte Gewinnermittlung: Einnahmen minus Ausgaben = Gewinn. Erlaubt bis 600.000 € Jahresumsatz oder 60.000 € Gewinn (sonst Bilanz-Pflicht). Pflicht-Anlage zur Steuererklärung — elektronisch via ELSTER." },
        { begriff: "Anlage S vs Anlage G", erklaerung: "Anlage S: für Einkünfte aus selbstständiger Arbeit (Freiberufler). Anlage G: für Einkünfte aus Gewerbebetrieb. Beide brauchen zusätzlich die Anlage EÜR (Gewinn-Detail)." },
        { begriff: "Katalogberufe (§18 EStG)", erklaerung: "Eindeutig als freiberuflich anerkannte Berufe: Heilberufe, Rechts-/Steuerberatung, Ingenieur:innen, Architekt:innen, Künstler:innen, Journalist:innen, Lehrer:innen. 'Ähnliche Berufe' nur durch Einzelfall-Prüfung anerkannt." },
        { begriff: "IHK-Pflichtmitgliedschaft", erklaerung: "Alle Gewerbetreibenden in DE sind Pflichtmitglied der IHK (oder HWK bei Handwerk). Kosten: Grundbeitrag 30-300 €/J + Umlage 0,1-0,3 % vom Gewerbeertrag. Befreiung bei Existenzgründer:innen mit Gewinn < 25.000 €/J (§3 IHKG)." },
        { begriff: "Berufsgenossenschaft", erklaerung: "Gesetzliche Unfallversicherung für Beschäftigte UND Selbstständige (Pflicht bei manchen Branchen, freiwillig sonst). Anmeldung binnen 1 Woche nach Gründung (§192 SGB VII). Beitrag richtet sich nach Beruf + Lohnsumme." },
      ].map((g) => (
        <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
          <div className="text-muted-foreground">{g.erklaerung}</div>
        </div>
      ))}
    </div>
  </details>
);

export default GewerbeCheck;
