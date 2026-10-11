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
import { useMemo, useState, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Callout, ResultPanel, ToneBadge, ToolSection, toneSoft, toneText, type Tone } from "@/components/cockpit/kit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Briefcase,
  ChevronDown,
  Code2,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  ListChecks,
  Minus,
  Package,
  Palette,
  Plus,
  RotateCcw,
  Scale,
  Sparkles,
  Stethoscope,
  Store,
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
      eyebrow="Erste Schritte · für komplette Anfänger:innen"
      title="Brauche ich überhaupt ein Gewerbe?"
      subtitle="Vier Fragen bis zur Einordnung: Hobby, Freiberuf oder Gewerbe? Du bekommst eine Klartext-Empfehlung mit konkreten nächsten Schritten, ganz ohne Steuer-Vorkenntnisse."
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* === BeginnerHero: "Was ist das hier?" === */}
        <BeginnerHero />

        {/* === Fortschritt === */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium">
              {step < stepCount ? `Frage ${step + 1} von ${stepCount}` : "Fertig!"}
            </span>
            <span className="text-muted-foreground tabular">{Math.round(progressPct)} %</span>
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPct)}
            aria-label="Fortschritt"
          >
            <div className="h-full rounded-full bg-accent-blue transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* === Steps === */}
        {step === 0 && (
          <StepFrame
            n={1}
            title="Was machst du genau?"
            erklaerung="Die Tätigkeit bestimmt, ob du beim Gewerbeamt anmelden musst oder nur beim Finanzamt. Manche Berufe (Katalogberufe §18 EStG) sind automatisch freiberuflich, dann ist kein Gewerbe nötig."
            onNext={setup.taetigkeit ? next : undefined}
            onPrev={undefined}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {TAETIGKEITEN.map((t) => {
                const Icon = TAETIGKEIT_ICON[t.v];
                return (
                  <OptionCard key={t.v} active={setup.taetigkeit === t.v} onClick={() => setSetup({ ...setup, taetigkeit: t.v })}>
                    <span className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/70">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">{t.label}</span>
                          {t.freiberuf === "ja" && <ToneBadge tone="info">Freiberuf</ToneBadge>}
                          {t.freiberuf === "nein" && <ToneBadge tone="warning">Gewerbe</ToneBadge>}
                          {t.freiberuf === "vielleicht" && <ToneBadge tone="accent">Beides möglich</ToneBadge>}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{t.beispiele}</span>
                      </span>
                    </span>
                  </OptionCard>
                );
              })}
            </div>
          </StepFrame>
        )}

        {step === 1 && (
          <StepFrame
            n={2}
            title="Wie regelmäßig machst du das?"
            erklaerung="Eine einmalige Aktion (z.B. Garagenflohmarkt) ist KEIN Gewerbe. Sobald du regelmäßig mit Gewinn handelst, sieht das FA das als 'nachhaltige Gewinnerzielungsabsicht', dann musst du anmelden."
            onNext={setup.regelmaessigkeit ? next : undefined}
            onPrev={prev}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {([
                { v: "einmalig", l: "Einmalig / Ausnahme", d: "Z.B. einmal etwas verkauft, nicht geplant zu wiederholen" },
                { v: "selten", l: "1-3 mal im Jahr", d: "Sporadisch, kein laufendes Geschäft" },
                { v: "nebenbei-regelmaessig", l: "Regelmäßig nebenbei", d: "Wöchentlich/monatlich neben Hauptjob" },
                { v: "hauptberuflich", l: "Hauptberuflich / Vollzeit", d: "Ist (oder wird) dein Haupt-Einkommen" },
              ] as { v: Regelmaessigkeit; l: string; d: string }[]).map((o) => (
                <OptionCard key={o.v} active={setup.regelmaessigkeit === o.v} onClick={() => setSetup({ ...setup, regelmaessigkeit: o.v })}>
                  <span className="block text-sm font-semibold">{o.l}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{o.d}</span>
                </OptionCard>
              ))}
            </div>
          </StepFrame>
        )}

        {step === 2 && (
          <StepFrame
            n={3}
            title="Willst du Gewinn machen?"
            erklaerung="Das ist die entscheidende Frage des Finanzamts: 'Gewinnerzielungsabsicht?'. Ohne Gewinnabsicht = Liebhaberei = kein Gewerbe nötig. Mit Gewinnabsicht (auch langfristig, auch kleine Beträge) musst du anmelden."
            onNext={setup.gewinnabsicht ? next : undefined}
            onPrev={prev}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {([
                { v: "ja", l: "Ja, das soll Geld bringen", d: "Wirtschaftlich denken, Wachstum oder Nebeneinkommen" },
                { v: "nein-hobby", l: "Nein, reines Hobby", d: "Spaß steht im Vordergrund, Gewinne zufällig" },
                { v: "unsicher", l: "Vielleicht später", d: "Aktuell noch unklar, könnte sich entwickeln" },
              ] as { v: Gewinnabsicht; l: string; d: string }[]).map((o) => (
                <OptionCard key={o.v} active={setup.gewinnabsicht === o.v} onClick={() => setSetup({ ...setup, gewinnabsicht: o.v })}>
                  <span className="block text-sm font-semibold">{o.l}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{o.d}</span>
                </OptionCard>
              ))}
            </div>
          </StepFrame>
        )}

        {step === 3 && (
          <StepFrame
            n={4}
            title="Wie viel Gewinn erwartest du pro Jahr?"
            erklaerung="Wichtig für: Kleinunternehmer-Regelung §19 UStG (bis 25.000 € Vorjahres-Umsatz / 100.000 € aktuelles Jahr 2026), GewSt-Freibetrag (24.500 €), IHK-Befreiung. Schätze ehrlich; bei deutlicher Abweichung stellst du später einen Anpassungs-Antrag."
            onNext={setup.gewinnstufe ? next : undefined}
            onPrev={prev}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {([
                { v: "unter-410", l: "Unter 410 € pro Jahr", d: "Mini-Gewinn, wahrscheinlich noch Hobby-Schwelle" },
                { v: "unter-3000", l: "410 € – 3.000 € pro Jahr", d: "Klassisches Side-Hustle-Niveau" },
                { v: "unter-25000", l: "3.000 € – 25.000 € pro Jahr", d: "Hauptberuflicher Verdienst möglich" },
                { v: "ueber-25000", l: "Über 25.000 € pro Jahr", d: "Skalierter Solo-Self oder Vollzeit-Business" },
              ] as { v: Gewinnstufe; l: string; d: string }[]).map((o) => (
                <OptionCard key={o.v} active={setup.gewinnstufe === o.v} onClick={() => setSetup({ ...setup, gewinnstufe: o.v })}>
                  <span className="block text-sm font-semibold tabular">{o.l}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{o.d}</span>
                </OptionCard>
              ))}
            </div>
          </StepFrame>
        )}

        {/* === Ergebnis === */}
        {step === 4 && verdict && (
          <>
            <section aria-live="polite" className={cn("rounded-2xl border p-5 shadow-card md:p-6", toneSoft(FARBE_TONE[verdict.farbe]))}>
              <div className="flex items-start gap-4">
                <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card", toneText(FARBE_TONE[verdict.farbe]))}>
                  {verdict.farbe === "gruen" ? (
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  ) : verdict.farbe === "blau" ? (
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-medium", toneText(FARBE_TONE[verdict.farbe]))}>Dein Ergebnis</p>
                  <h2 className="mt-0.5 text-2xl font-semibold leading-tight tracking-tight">{verdict.titel}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{verdict.begruendung}</p>
                </div>
              </div>
            </section>

            {/* === Rechtsform-Empfehlung === */}
            {rechtsformEmpfehlung && verdict.type !== "hobby" && (
              <RechtsformBox reco={rechtsformEmpfehlung} />
            )}

            <ToolSection title="Was du jetzt tun musst" icon={ListChecks}>
              <ol className="space-y-3">
                {verdict.nextSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1 leading-relaxed">
                      {s.route ? (
                        <Link to={s.route} className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                          {s.text} <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </Link>
                      ) : s.extern ? (
                        <a
                          href={s.extern}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent-blue hover:underline"
                        >
                          {s.text} <ExternalLink className="inline h-3 w-3 align-baseline" aria-hidden="true" />
                        </a>
                      ) : (
                        <span>{s.text}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </ToolSection>

            <div>
              <Button variant="outline" onClick={reset}>
                <RotateCcw aria-hidden="true" /> Nochmal starten
              </Button>
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
      </div>
    </CockpitShell>
  );
};

// ===== Sub-Components =====

const TAETIGKEIT_ICON: Record<Taetigkeit, ElementType> = {
  "dienstleistung-handel": Store,
  produktverkauf: Package,
  "beratung-coaching": Briefcase,
  "kunst-schreiben-musik": Palette,
  "software-entwicklung": Code2,
  "lehre-unterricht": GraduationCap,
  "heilberuf-medizin": Stethoscope,
  "rechts-steuer-beratung": Scale,
  unsicher: HelpCircle,
};

const FARBE_TONE: Record<"gruen" | "blau" | "amber" | "rot", Tone> = {
  gruen: "success",
  blau: "info",
  amber: "warning",
  rot: "danger",
};

const OptionCard = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={cn(
      "block w-full rounded-xl border p-4 text-left text-foreground transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px",
      active
        ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
        : "border-border bg-card hover:border-foreground/25",
    )}
  >
    {children}
  </button>
);

const RechtsformBox = ({ reco }: { reco: RechtsformReco }) => (
  <ResultPanel kicker="Empfohlene Rechtsform und USt-Modus" title={reco.empfohlenLabel}>
    <p className="text-sm leading-relaxed text-foreground/85">{reco.begruendung}</p>

    {/* USt-Modus-Hinweis */}
    <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-secondary/40 p-4 sm:flex-row sm:items-start sm:gap-3">
      <ToneBadge tone={reco.ustModus === "ku-19" ? "success" : reco.ustModus === "regel" ? "info" : "neutral"} className="shrink-0 self-start">
        {reco.ustModus === "ku-19" ? "§19 KU empfohlen"
         : reco.ustModus === "regel" ? "Regelbesteuerung"
         : "USt egal"}
      </ToneBadge>
      <p className="text-sm leading-relaxed text-muted-foreground">{reco.ustHinweis}</p>
    </div>

    {/* Alternativen */}
    {reco.alternativen.length > 0 && (
      <details className="group mt-3 rounded-xl border border-border">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          <span>Alternativen ansehen ({reco.alternativen.length})</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-3 border-t border-border/70 p-4">
          {reco.alternativen.map((alt) => (
            <div key={alt.id} className="text-sm">
              <p className="font-semibold">{alt.label}</p>
              <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <p className="flex gap-2 rounded-lg border border-success/25 bg-success-soft p-2.5">
                  <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                  <span><strong className="font-semibold">Pro:</strong> <span className="text-muted-foreground">{alt.pro}</span></span>
                </p>
                <p className="flex gap-2 rounded-lg border border-warning/25 bg-warning-soft p-2.5">
                  <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
                  <span><strong className="font-semibold">Contra:</strong> <span className="text-muted-foreground">{alt.contra}</span></span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </details>
    )}

    {/* Cross-Links zu vertiefenden Tools */}
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-4 text-sm">
      <span className="text-muted-foreground">Tiefer einsteigen:</span>
      <Link to="/cockpit/gewerbeanmeldung-wizard" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
        Gewerbeanmeldung-Wizard <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
      <Link to="/wizard/rechtsform" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
        Rechtsform-Wizard <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
      <Link to="/cockpit/brutto-netto-solo" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
        Brutto-Netto-Rechner <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  </ResultPanel>
);

const BeginnerHero = () => (
  <ToolSection title="Was ist das hier?" icon={Lightbulb}>
    <p className="text-sm leading-relaxed text-muted-foreground">
      Du verkaufst was, machst Beratung oder hast eine Idee und weißt nicht, ob du <strong className="text-foreground">überhaupt</strong>{" "}
      ein Gewerbe anmelden musst? Dieses Tool führt dich in 4 Fragen durch die wichtigste Vorentscheidung deiner
      Selbstständigkeit: <strong className="text-foreground">Hobby, Freiberuf oder Gewerbe?</strong>
    </p>
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="rounded-xl border border-success/25 bg-success-soft p-4 text-sm">
        <strong className="font-semibold text-success">🌿 Hobby</strong>
        <p className="mt-1 text-muted-foreground">Keine Gewinnabsicht oder einmalig: nichts melden, evtl. Anlage 'Sonstige' §22 EStG</p>
      </div>
      <div className="rounded-xl border border-info/20 bg-info-soft p-4 text-sm">
        <strong className="font-semibold text-info">📘 Freiberuf</strong>
        <p className="mt-1 text-muted-foreground">Katalogberuf §18 EStG: nur Finanzamt-Fragebogen, kein Gewerbeschein, keine GewSt, keine IHK-Pflicht</p>
      </div>
      <div className="rounded-xl border border-warning/25 bg-warning-soft p-4 text-sm">
        <strong className="font-semibold text-warning">🏪 Gewerbe</strong>
        <p className="mt-1 text-muted-foreground">Handel/Produktion/Dienstleistung: Gewerbeamt (15-65 €), IHK, ggf. GewSt ab 24.500 € Gewinn</p>
      </div>
    </div>
  </ToolSection>
);

const StepFrame = ({
  n,
  title,
  erklaerung,
  children,
  onNext,
  onPrev,
}: {
  n: number;
  title: string;
  erklaerung: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}) => (
  <section className="rounded-2xl border border-border bg-card shadow-card">
    <div className="flex items-start gap-3 border-b border-border/70 px-5 py-4 md:px-6">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-blue tabular">{n}</span>
      <h2 className="text-lg font-semibold leading-snug tracking-tight">{title}</h2>
    </div>
    <div className="space-y-5 p-5 md:p-6">
      <Callout tone="info" icon={Info}>{erklaerung}</Callout>
      {children}
      <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-5">
        <Button variant="outline" onClick={onPrev} disabled={!onPrev}>
          <ArrowLeft aria-hidden="true" /> Zurück
        </Button>
        <Button onClick={onNext} disabled={!onNext}>
          Weiter <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  </section>
);

const Glossar = () => (
  <details className="group rounded-2xl border border-border bg-card shadow-card">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 md:px-6 [&::-webkit-details-marker]:hidden">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold">Glossar: Begriffe einfach erklärt</span>
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="grid gap-3 border-t border-border/70 p-5 text-sm leading-relaxed md:grid-cols-2 md:p-6">
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
        <div key={g.begriff} className="rounded-xl border border-border bg-secondary/40 p-4">
          <dt className="font-semibold text-foreground">{g.begriff}</dt>
          <dd className="mt-1 text-muted-foreground">{g.erklaerung}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default GewerbeCheck;
