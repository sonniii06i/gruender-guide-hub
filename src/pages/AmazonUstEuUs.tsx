import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Link } from "react-router-dom";
import { Globe, AlertCircle, ArrowRight, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import { Callout, ResultPanel, ToneBadge, ToolSection, toneText, type Tone } from "@/components/cockpit/kit";

type Marketplace = {
  slug: string;
  name: string;
  flag: string;
  /** Wer rechnet die USt aus? Du oder Amazon? */
  ustVerantwortlich: "du" | "amazon" | "mix";
  /** Wenn du verantwortlich: Welcher USt-Mechanismus. */
  ustMechanismus: string;
  /** Welches Konto + Steuerschlüssel in DE-Buchhaltung. */
  buchungDe: { konto: string; steuerschluessel: string; hinweis: string };
  /** Pflicht-Registrierungen vor Verkauf. */
  registrierungen: string[];
  /** Marketplace-Facilitator-Tax: zieht Amazon den Steuerbetrag direkt ab? */
  facilitatorTax: string;
  /** Häufige Fehler. */
  stolperfallen: string[];
};

const MARKETPLACES: Marketplace[] = [
  {
    slug: "amazon-de",
    name: "Amazon.de (Verkauf nach DE-Endkunde)",
    flag: "🇩🇪",
    ustVerantwortlich: "du",
    ustMechanismus:
      "DE-USt 19 % (oder 7 % bei Lebensmitteln/Büchern). Amazon zieht keine USt für DE-DE-Verkäufe. Du erklärst sie in der USt-Voranmeldung.",
    buchungDe: {
      konto: "8400 Erlöse 19 % USt (SKR03) / 4400 SKR04",
      steuerschluessel: "3 (USt 19 %)",
      hinweis: "Verkauf wird via Settlement netto an dich gebucht — du buchst Brutto-Erlös und USt-Abführung separat",
    },
    registrierungen: [
      "DE-USt-ID: Kleinunternehmer §19 (Reform 01.01.2025) bis 25.000 € Vorjahres-Umsatz / 100.000 € aktuelles Jahr — bei Amazon faktisch ab Tag 1 sinnvoll",
      "Gewerbeanmeldung",
    ],
    facilitatorTax: "NEIN — du bist USt-Schuldner",
    stolperfallen: [
      "FBA-Lager nur in DE → einfacher Fall",
      "FBA-Lager auch in PL/CZ/IT/FR/ES → diese Verkäufe sind innergemeinschaftliche Lieferungen oder Drittland-Verkäufe — separate Behandlung",
    ],
  },
  {
    slug: "amazon-eu-fee",
    name: "Amazon-Provisionen für DE-Marketplace (seit 01.08.2024)",
    flag: "🇩🇪",
    ustVerantwortlich: "du",
    ustMechanismus:
      "Amazon EU SARL Niederlassung Deutschland rechnet seit 01.08.2024 mit deutscher 19 % USt + ausgewiesener VSt ab. KEIN Reverse-Charge mehr.",
    buchungDe: {
      konto: "3100 Fremdleistungen (SKR03) / 5900 (SKR04)",
      steuerschluessel: "9 (VSt 19 %, voll abziehbar)",
      hinweis: "AMA-SG-DE-XXXX, AMA-BG-DE-XXX, FBAFees, CoAdv → 3100 mit VSt 19 % (Schlüssel 9 in SKR03)",
    },
    registrierungen: ["DE-USt-ID Pflicht für VSt-Abzug"],
    facilitatorTax: "NEIN — Amazon ist Leistungs-Erbringer, du bist Empfänger",
    stolperfallen: [
      "Bis 31.07.2024 war Reverse-Charge §13b — VOR diesem Datum noch alte Logik anwenden",
      "VSt-Abzug nur mit ordnungsgemäßer Rechnung (Amazon stellt PDF im Seller-Central bereit)",
      "Versehentlich noch alte §13b-Buchung → VSt nicht zurückerstattet",
    ],
  },
  {
    slug: "amazon-it-fr-es-nl",
    name: "Amazon.it / .fr / .es / .nl (Marketplace-Provisionen)",
    flag: "🇪🇺",
    ustVerantwortlich: "du",
    ustMechanismus:
      "Reverse-Charge §13b UStG. Du als Leistungsempfänger schuldest die USt + ziehst sie sofort wieder als Vorsteuer ab → saldoneutral.",
    buchungDe: {
      konto: "3100 Fremdleistungen",
      steuerschluessel: "19 (RC §13b — Brutto = Netto, USt + VSt selbst gerechnet)",
      hinweis: "AMA-SG-IT, AMA-SG-FR, AMA-SG-ES, AMA-SG-NL → Schlüssel 19. USt-Position automatisch via DATEV-BU-Logik",
    },
    registrierungen: ["DE-USt-ID Pflicht (zur Verwendung im Reverse-Charge-Verfahren)"],
    facilitatorTax: "NEIN für Provisionen — JA für eigene Verkäufe (siehe nächste Zeile)",
    stolperfallen: [
      "Ohne ordnungsgemäße Rechnung trotzdem RC-Buchung — Amazon stellt diese aber bereit",
      "Keine zusätzliche USt-Anmeldung in IT/FR/ES/NL für Provisionen — die ID ist in DE",
    ],
  },
  {
    slug: "amazon-eu-verkauf-ausland-lager",
    name: "Eigene Verkäufe via FBA aus IT/FR/ES/NL/PL/CZ-Lager",
    flag: "🇪🇺",
    ustVerantwortlich: "mix",
    ustMechanismus:
      "Komplex: B2C-Verkäufe können via OSS gemeldet werden ODER per lokaler USt-ID je Land. Lieferungen aus dem ausländischen Lager benötigen Pflicht-Registrierung im Land.",
    buchungDe: {
      konto: "8338 Erlöse OSS (SKR03) / 4338 (SKR04) für OSS-Verfahren",
      steuerschluessel: "abhängig vom Bestimmungsland",
      hinweis: "OSS-Verfahren empfohlen für DACH-DE-Hauptsitz mit FBA-EU-Lagern",
    },
    registrierungen: [
      "Pflicht-Registrierung im Land des Lagers (USt-ID lokal)",
      "OSS-Anmeldung beim BZSt für B2C-EU-Verkäufe (Quartalsmeldung)",
      "Bei FBA in PL/CZ: gleichzeitig DE-USt-ID + OSS",
      "Bei Pan-EU FBA: 6+ lokale USt-IDs ggf. parallel",
    ],
    facilitatorTax: "Marketplace-Facilitator-Tax in IT/FR/UK greift seit 2021 — Amazon zieht USt direkt ein, du bist nicht USt-Schuldner für diese Verkäufe (außer in DE-DE-Konstellation)",
    stolperfallen: [
      "Auf Amazon Pan-EU klicken ohne lokale Registrierung → 4-stelliger Bußgeld-Bereich",
      "Marketplace-Facilitator-Tax NICHT als eigene USt verbuchen (durchlaufender Posten 1701/1801)",
      "OSS-Frist: bis zum LETZTEN Tag des Folgemonats beim BZSt einreichen (Q1 = 30.04., Q2 = 31.07., Q3 = 31.10., Q4 = 31.01.)",
      "Marketplace-Facilitator IT/FR (EU-VAT-Reform 07/2021) greift nur für Verkäufer mit Sitz AUSSERHALB der EU — DE-sitzige Verkäufer melden via OSS",
    ],
  },
  {
    slug: "amazon-com",
    name: "Amazon.com (USA — Verkauf an US-Endkunden)",
    flag: "🇺🇸",
    ustVerantwortlich: "amazon",
    ustMechanismus:
      "Marketplace-Facilitator-Tax: Amazon zieht für 45 US-Bundesstaaten + DC die Sales-Tax direkt vom Kunden ein und führt sie ab. Du als Verkäufer hast nur Nexus-Anmeldung beim Auftreten (manche Staaten Pflicht).",
    buchungDe: {
      konto: "8125 Erlöse stfr §4 Nr 1a (SKR03) / 4125 (SKR04)",
      steuerschluessel: "94 (Drittland) oder direkt steuerfrei",
      hinweis: "DE-Sicht: Drittland-Lieferung. Sales-Tax ist US-interne Angelegenheit, kein Bezug zur DE-USt",
    },
    registrierungen: [
      "EIN bei IRS",
      "BOI-Filing bei FinCEN: für US-Domestic-LLCs seit März 2025 AUSGESETZT (Interim Final Rule). Pflicht gilt nur noch für 'Foreign Reporting Companies' (außerhalb USA gegründet, in USA registriert)",
      "Sales-Tax-Nexus-Check pro Staat — siehe Tool",
      "Foreign-Owned Single-Member LLC (disregarded): Form 5472 + pro-forma 1120 PFLICHT (auch ohne US-Income, Strafe 25.000 $)",
      "Multi-Member LLC oder LLC mit C-Corp-Election: vollwertige Form 1120-Filing",
    ],
    facilitatorTax:
      "JA — Amazon zieht Sales-Tax direkt vom Kunden ein. Du musst sie nicht selbst abführen — aber Nexus-Anmeldung im Staat kann Pflicht sein für nicht-Marketplace-Verkäufe (Shopify-Direktverkauf).",
    stolperfallen: [
      "California/Texas/New York haben besondere Nexus-Schwellen — auch wenn Amazon die Tax abzieht",
      "1099-K von Amazon → US-LLC-Steuererklärung Pflicht",
      "DE: bei Lieferung aus DE-Lager nach US ist es Drittland-Export — ggf. EUR.1 / Ursprungsnachweis",
      "Verkauf via Amazon = nicht nexus-creating, aber Lager (FBA-USA) kann nexus auslösen",
    ],
  },
  {
    slug: "amazon-co-uk",
    name: "Amazon.co.uk (UK seit Brexit)",
    flag: "🇬🇧",
    ustVerantwortlich: "mix",
    ustMechanismus:
      "Drittland für DE. Amazon zieht UK-VAT direkt ein bei B2C-Verkäufen unter £135 (Marketplace-Facilitator-Logik). Über £135 oder B2B → eigene UK-VAT-Pflicht.",
    buchungDe: {
      konto: "8125 Erlöse stfr Drittland",
      steuerschluessel: "94 (Drittland)",
      hinweis: "Verkäufer ist für UK-Buchhaltung selbst verantwortlich, wenn man eine UK-Limited hat",
    },
    registrierungen: [
      "UK-VAT-Registrierung: Schwelle £90.000 / Jahr (seit 01.04.2024, vorher £85.000) ODER bei eigenem UK-Lager",
      "UK-EORI-Nummer für Zoll (GB-EORI)",
      "Drittland-Logistik (EUR.1, Zollanmeldung)",
    ],
    facilitatorTax:
      "Bei B2C-Verkäufen unter £135: JA (Amazon zieht UK-VAT ein, 20 %). Über £135 oder B2B: NEIN — du bist VAT-Schuldner",
    stolperfallen: [
      "Brexit: keine OSS-Möglichkeit für UK-Verkäufe — separate UK-VAT",
      "Amazon-Provisionen für .co.uk = Drittland-Leistung, Schlüssel 94",
      "EORI-Nummer Pflicht — DE-EORI greift für UK-Import nicht",
    ],
  },
];

/** Länderkürzel statt Flaggen-Emoji in der Oberfläche. */
const KUERZEL: Record<string, string> = { "🇩🇪": "DE", "🇪🇺": "EU", "🇺🇸": "US", "🇬🇧": "UK" };
const VERANTWORTUNG: Record<Marketplace["ustVerantwortlich"], { text: string; tone: Tone }> = {
  du: { text: "Du bist USt-Schuldner", tone: "warning" },
  amazon: { text: "Amazon zieht ein", tone: "success" },
  mix: { text: "Gemischt", tone: "info" },
};

const AmazonUstEuUs = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>("amazon-de");
  const selected = useMemo(() => MARKETPLACES.find((m) => m.slug === selectedSlug)!, [selectedSlug]);
  const v = VERANTWORTUNG[selected.ustVerantwortlich];

  return (
    <CockpitShell
      eyebrow="Amazon-USt EU vs US"
      title="USt-Behandlung pro Marketplace und Bestelltyp"
      subtitle="6 Konstellationen (DE-Verkauf, DE-Provisionen seit Aug 2024, IT/FR/ES/NL §13b, EU-FBA-Lager mit OSS, US Marketplace-Facilitator, UK nach dem Brexit) mit konkreten Konten, Steuerschlüsseln, Pflicht-Registrierungen und Stolperfallen."
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        {/* Auswahl */}
        <nav aria-label="Konstellation wählen" className="space-y-2 lg:sticky lg:top-20">
          <p className="mb-1 text-sm font-medium text-muted-foreground">Konstellation wählen</p>
          {MARKETPLACES.map((m) => {
            const aktiv = selectedSlug === m.slug;
            const vv = VERANTWORTUNG[m.ustVerantwortlich];
            return (
              <button
                key={m.slug}
                type="button"
                aria-pressed={aktiv}
                onClick={() => setSelectedSlug(m.slug)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-[border-color,background-color,box-shadow] ${
                  aktiv ? "border-accent-blue/50 bg-card shadow-card ring-1 ring-accent-blue/20" : "border-border bg-card/60 hover:border-foreground/20 hover:bg-card"
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${aktiv ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  {KUERZEL[m.flag] ?? "EU"}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-snug">{m.name}</span>
                  <span className={`mt-1 block text-xs ${toneText(vv.tone)}`}>{vv.text}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Detail */}
        <div className="min-w-0 space-y-5">
          <ResultPanel kicker={KUERZEL[selected.flag] ?? "EU"} title={selected.name}>
            <div className="flex flex-wrap items-center gap-2">
              <ToneBadge tone={v.tone}>{v.text}</ToneBadge>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{selected.ustMechanismus}</p>
          </ResultPanel>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ToolSection title="Buchung in DE" icon={BookOpen}>
              <dl className="divide-y divide-border/70 text-sm">
                <div className="pb-2.5">
                  <dt className="text-xs text-muted-foreground">Konto</dt>
                  <dd className="mt-0.5 font-mono text-[13px] font-semibold">{selected.buchungDe.konto}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-xs text-muted-foreground">Steuerschlüssel</dt>
                  <dd className="mt-0.5 font-mono text-[13px] font-semibold">{selected.buchungDe.steuerschluessel}</dd>
                </div>
                <div className="pt-2.5 leading-relaxed text-muted-foreground">{selected.buchungDe.hinweis}</div>
              </dl>
            </ToolSection>
            <ToolSection title="Marketplace-Facilitator-Tax?" icon={Globe}>
              <p className="text-sm leading-relaxed text-foreground/85">{selected.facilitatorTax}</p>
            </ToolSection>
          </div>

          <ToolSection title="Pflicht-Registrierungen" icon={CheckCircle2}>
            <ul className="space-y-2 text-sm leading-relaxed">
              {selected.registrierungen.map((r, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-foreground/85">{r}</span>
                </li>
              ))}
            </ul>
          </ToolSection>

          <ToolSection title="Stolperfallen" icon={AlertCircle}>
            <ul className="space-y-2 text-sm leading-relaxed">
              {selected.stolperfallen.map((x, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                  <span className="text-foreground/85">{x}</span>
                </li>
              ))}
            </ul>
          </ToolSection>

          {/* Cross-Tool-Verlinkung */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { to: "/cockpit/amazon-buchungen", t: "Amazon-Buchungstexte", d: "Codes wie AMA-SG-DE, FBAFees, CoAdv im Detail" },
              { to: "/cockpit/settlement-parser?mode=amazon", t: "Settlement-Parser", d: "CSV automatisch aufsplitten, SKR03-Mapping" },
              { to: "/cockpit/sales-tax-nexus", t: "Sales-Tax-Nexus US", d: "45 US-Staaten und DC: Wayfair-Schwellen prüfen" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="press group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/40 hover:shadow-card">
                <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                  {l.t}
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{l.d}</span>
              </Link>
            ))}
          </div>

          {/* Generelle Hinweise */}
          <Callout tone="warning" title="Generelle USt-Logik im Amazon-Kontext">
            <ul className="mt-1 space-y-2 leading-relaxed">
              <li>
                <strong className="font-semibold text-foreground">Marketplace-Facilitator-Tax:</strong> Amazon ist als Marktplatz verpflichtet, die USt
                direkt vom Kunden einzuziehen. Greift in: USA (45 Staaten und DC), UK (unter £135), AU/NZ, IT/FR/UK B2C-EU.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Reverse-Charge §13b UStG:</strong> Bei B2B-Leistung aus dem EU-Ausland an dich (DE) bist du
                USt-Schuldner. Du buchst die USt auf der einen Seite und ziehst sie auf der anderen als VSt ab, saldo 0.
              </li>
              <li>
                <strong className="font-semibold text-foreground">OSS (One-Stop-Shop):</strong> EU-weit zentralisiert beim BZSt für deine eigenen B2C-Verkäufe
                ins EU-Ausland. Greift nicht bei Verkäufen aus ausländischem Lager.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Pan-EU-FBA:</strong> Amazon verteilt deine Ware automatisch in 6+ EU-Lager. Du brauchst
                eine USt-ID in jedem Land, in das Amazon einlagert, auch wenn du nichts dafür tust.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Drittland-Verkäufe (US/UK/CH):</strong> Steuerschlüssel 94 (DE-Buchhaltung). Sales-Tax bzw.
                VAT ist Sache des Empfängerlands, nicht der DE-USt.
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <a href="https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/OSS/oss_node.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                BZSt: OSS-Verfahren <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <a href="https://sellercentral.amazon.de" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent-blue hover:underline">
                Seller Central: VAT-Services <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </Callout>
        </div>
      </div>
    </CockpitShell>
  );
};

export default AmazonUstEuUs;
