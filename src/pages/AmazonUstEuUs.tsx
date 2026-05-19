import { useState, useMemo } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Globe, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

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
      "Marketplace-Facilitator-Tax: Amazon zieht für 47 US-Bundesstaaten + DC die Sales-Tax direkt vom Kunden ein und führt sie ab. Du als Verkäufer hast nur Nexus-Anmeldung beim Auftreten (manche Staaten Pflicht).",
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

const AmazonUstEuUs = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>("amazon-de");
  const selected = useMemo(() => MARKETPLACES.find((m) => m.slug === selectedSlug)!, [selectedSlug]);

  return (
    <CockpitShell
      eyebrow="Amazon-USt EU vs US"
      title="USt-Behandlung pro Marketplace + Bestelltyp"
      subtitle="6 Konstellationen (DE-Verkauf, DE-Provisionen seit Aug 2024, IT/FR/ES/NL §13b, EU-FBA-Lager + OSS, US Marketplace-Facilitator, UK Brexit) mit konkreten Konten, Steuerschlüsseln, Pflicht-Registrierungen + Stolperfallen."
    >
      {/* Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {MARKETPLACES.map((m) => (
          <button
            key={m.slug}
            onClick={() => setSelectedSlug(m.slug)}
            className={`text-left rounded-xl border p-3 transition-colors ${
              selectedSlug === m.slug
                ? "border-accent-blue bg-accent-blue/5"
                : "border-border bg-card hover:bg-secondary/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{m.flag}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {m.ustVerantwortlich === "du" && "Du USt-Schuldner"}
                {m.ustVerantwortlich === "amazon" && "Amazon zieht ein"}
                {m.ustVerantwortlich === "mix" && "Mix"}
              </span>
            </div>
            <div className="font-semibold text-xs">{m.name}</div>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{selected.flag}</span>
          <h3 className="font-bold text-base">{selected.name}</h3>
        </div>

        <div className="text-xs leading-relaxed text-muted-foreground mb-4">{selected.ustMechanismus}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
              Buchung in DE
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs">
              <div>
                <span className="text-muted-foreground">Konto: </span>
                <span className="font-mono font-semibold">{selected.buchungDe.konto}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Steuerschlüssel: </span>
                <span className="font-mono font-semibold">{selected.buchungDe.steuerschluessel}</span>
              </div>
              <div className="text-muted-foreground mt-1.5 leading-relaxed">{selected.buchungDe.hinweis}</div>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 flex items-center gap-1">
              <Globe className="h-3 w-3" /> Marketplace-Facilitator-Tax?
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs leading-relaxed">
              {selected.facilitatorTax}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold mb-1.5 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Pflicht-Registrierungen
          </div>
          <ul className="list-disc pl-5 space-y-0.5 text-xs text-muted-foreground">
            {selected.registrierungen.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-red-700 font-semibold mb-1.5 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Stolperfallen
          </div>
          <ul className="list-disc pl-5 space-y-0.5 text-xs text-muted-foreground">
            {selected.stolperfallen.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cross-Tool-Verlinkung */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <a
          href="/cockpit/amazon-buchungen"
          className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition-colors"
        >
          <div className="font-semibold mb-0.5">Amazon-Buchungstexte →</div>
          <div className="text-muted-foreground">130+ Codes wie AMA-SG-DE, FBAFees, CoAdv im Detail</div>
        </a>
        <a
          href="/cockpit/settlement-parser?mode=amazon"
          className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition-colors"
        >
          <div className="font-semibold mb-0.5">Settlement-Parser →</div>
          <div className="text-muted-foreground">CSV automatisch aufsplitten + SKR03-Mapping</div>
        </a>
        <a
          href="/cockpit/sales-tax-nexus"
          className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition-colors"
        >
          <div className="font-semibold mb-0.5">Sales-Tax-Nexus US →</div>
          <div className="text-muted-foreground">46 US-Staaten Wayfair-Schwellen prüfen</div>
        </a>
      </div>

      {/* Generelle Hinweise */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="font-semibold mb-2">Generelle USt-Logik im Amazon-Kontext</div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
          <li>
            <strong>Marketplace-Facilitator-Tax</strong> = Amazon ist als "Marktplatz" verpflichtet, die USt
            direkt vom Kunden einzuziehen. Greift in: USA (47 Staaten), UK ({"<"} £135), AU/NZ, IT/FR/UK B2C-EU.
          </li>
          <li>
            <strong>Reverse-Charge §13b UStG</strong> = Bei B2B-Leistung aus EU-Ausland an dich (DE) bist DU
            USt-Schuldner. Du buchst die USt auf der einen Seite, ziehst sie auf der anderen als VSt — saldo 0.
          </li>
          <li>
            <strong>OSS (One-Stop-Shop)</strong> = EU-weit zentralisiert beim BZSt für deine eigenen B2C-Verkäufe
            ins EU-Ausland. Greift NICHT bei Verkäufen aus ausländischem Lager.
          </li>
          <li>
            <strong>Pan-EU-FBA</strong> = Amazon verteilt deine Ware automatisch in 6+ EU-Lager. Heißt: du
            brauchst USt-ID in jedem Land, in das Amazon legt — auch wenn du nichts dafür tust.
          </li>
          <li>
            <strong>Drittland-Verkäufe (US/UK/CH)</strong> = Steuer-Schlüssel 94 (DE-Buchhaltung). Sales-Tax /
            VAT ist Sache des Empfängerlands, nicht der DE-USt.
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href="https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/OSS/oss_node.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent-blue hover:underline font-semibold"
          >
            BZSt — OSS-Verfahren <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://sellercentral.amazon.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent-blue hover:underline font-semibold"
          >
            Seller Central — VAT-Services <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </CockpitShell>
  );
};

export default AmazonUstEuUs;
