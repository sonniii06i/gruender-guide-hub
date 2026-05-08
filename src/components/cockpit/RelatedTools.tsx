import { useLocation, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ToolRef = { route: string; label: string; desc: string };

// Verwandte Tools je Route. Pflege zentral hier — keine Page muss angefasst werden.
const RELATED: Record<string, ToolRef[]> = {
  "/cockpit/bwa-generator": [
    { route: "/cockpit/marge-tracker", label: "Marge-Tracker", desc: "Pro SKU & Channel rechnen, ROAS, Healthy-Marge-Benchmarks" },
    { route: "/cockpit/settlement-parser?mode=amazon", label: "Settlement-Parser", desc: "CSV-Settlements parsen, danach in BWA übertragen" },
  ],
  "/cockpit/marge-tracker": [
    { route: "/cockpit/bwa-generator", label: "BWA-Generator", desc: "Marge-Daten in vollständige BWA mit SKR03-Mapping überführen" },
    { route: "/cockpit/settlement-parser?mode=amazon", label: "Settlement-Parser", desc: "Echte Provision aus Amazon-CSV ziehen" },
  ],
  "/cockpit/settlement-parser": [
    { route: "/cockpit/bwa-generator", label: "BWA-Generator", desc: "Geparste Fees in BWA-Kategorien einkippen" },
    { route: "/cockpit/marge-tracker", label: "Marge-Tracker", desc: "Channel-Marge mit echten Provisionen rechnen" },
    { route: "/cockpit/amazon-buchungen", label: "Amazon-Buchungstexte", desc: "Code-Lookup für SKR03/04 und USt-Behandlung" },
  ],
  "/cockpit/amazon-buchungen": [
    { route: "/cockpit/settlement-parser?mode=amazon", label: "Settlement-Parser", desc: "Komplette CSV automatisch aufsplitten lassen" },
  ],
  "/cockpit/pre-year-end": [
    { route: "/cockpit/pension-optimizer", label: "Pension-Optimizer", desc: "Rürup/bAV als Steuer-Hebel quantifizieren" },
    { route: "/cockpit/kfz-optimizer", label: "Kfz-Optimizer", desc: "Vor Jahreswechsel 1%-Regel vs. Fahrtenbuch festlegen" },
    { route: "/cockpit/crypto-steuer", label: "Crypto-Steuer", desc: "Realisierte Gewinne checken vor Jahreswechsel" },
  ],
  "/cockpit/kfz-optimizer": [
    { route: "/cockpit/pre-year-end", label: "Pre-Year-End", desc: "Methodenwahl in Year-End-Strategie einfließen lassen" },
  ],
  "/cockpit/pension-optimizer": [
    { route: "/cockpit/pre-year-end", label: "Pre-Year-End", desc: "Sonderzahlung als Year-End-Hebel" },
    { route: "/cockpit/auszahlung-optimizer", label: "Auszahlung-Optimizer", desc: "Pension als Auszahlungs-Vehikel im Vergleich" },
  ],
  "/cockpit/crypto-steuer": [
    { route: "/cockpit/pre-year-end", label: "Pre-Year-End", desc: "Verlust-Tausch vor Jahreswechsel zur Steuer-Optimierung" },
  ],
  "/cockpit/holding-designer": [
    { route: "/cockpit/entscheidungs-engine", label: "Entscheidungs-Engine", desc: "Wenn unsicher: 7-Fragen-Wizard quer über alle Strukturen" },
    { route: "/cockpit/eu-alternativen", label: "EU-Alternativen", desc: "Holding im Ausland als Alternative zu DE" },
    { route: "/cockpit/auszahlung-optimizer", label: "Auszahlung-Optimizer", desc: "Holding-Auszahlung gegen Direkt-GmbH rechnen" },
  ],
  "/cockpit/entscheidungs-engine": [
    { route: "/cockpit/holding-designer", label: "Holding-Designer", desc: "Wenn Empfehlung Holding ist: Konstrukt im Detail" },
    { route: "/cockpit/eu-alternativen", label: "EU-Alternativen", desc: "Wenn Empfehlung Ausland ist: Länder-Vergleich" },
    { route: "/wizard/rechtsform", label: "Rechtsform-Wizard", desc: "Wenn Empfehlung Einzel/UG/GmbH ist: Detail-Setup" },
  ],
  "/cockpit/eu-alternativen": [
    { route: "/cockpit/holding-designer", label: "Holding-Designer", desc: "EU-Alternative als Holding-Spitze einbauen" },
    { route: "/cockpit/substance-checker", label: "Substance-Checker", desc: "Mailbox-Risiko in Wunsch-Land checken (ATAD III)" },
    { route: "/cockpit/dba-cfc", label: "DBA-CFC-Rechner", desc: "Hinzurechnung + DBA-Quellensteuer rechnen" },
  ],
  "/cockpit/auszahlung-optimizer": [
    { route: "/cockpit/holding-designer", label: "Holding-Designer", desc: "Holding-Auszahlung im Konstrukt verankern" },
    { route: "/cockpit/pension-optimizer", label: "Pension-Optimizer", desc: "Pensionszusage als Auszahlungs-Vehikel im Detail" },
  ],
  "/wizard/rechtsform": [
    { route: "/cockpit/entscheidungs-engine", label: "Entscheidungs-Engine", desc: "Komplexe Fälle (Holding, Multi-Brand, EU): meta-Wizard" },
    { route: "/cockpit/holding-designer", label: "Holding-Designer", desc: "Wenn Holding sinnvoll: 8 Konstrukte verglichen" },
  ],
  "/cockpit/us-llc-wizard": [
    { route: "/cockpit/sales-tax-nexus", label: "Sales-Tax-Nexus", desc: "Wayfair-Schwellen pro US-Staat checken" },
    { route: "/cockpit/intl-banking", label: "US + HK Banking", desc: "Mercury / Wise / Relay / Brex-Vergleich" },
    { route: "/cockpit/substance-checker", label: "Substance-Checker", desc: "Mailbox-Risiko aus DE-Sicht (CFC)" },
  ],
  "/cockpit/hk-limited-wizard": [
    { route: "/cockpit/intl-banking", label: "HK Banking", desc: "Statrys / Airwallex / HSBC für non-Resident" },
    { route: "/cockpit/substance-checker", label: "Substance-Checker", desc: "Offshore-Status + ATAD III aus DE-Sicht" },
  ],
  "/cockpit/intl-banking": [
    { route: "/cockpit/us-llc-wizard", label: "US-LLC-Wizard", desc: "EIN + BOI vor Konto-Eröffnung erledigen" },
    { route: "/cockpit/hk-limited-wizard", label: "HK-Limited-Wizard", desc: "NNC1 + Comp Sec vor Konto-Eröffnung" },
  ],
  "/cockpit/sales-tax-nexus": [
    { route: "/cockpit/us-llc-wizard", label: "US-LLC-Wizard", desc: "Bundesstaat-Wahl & Setup-Pfad" },
    { route: "/cockpit/settlement-parser?mode=amazon", label: "Settlement-Parser", desc: "Marketplace-Facilitator-Tax aus CSV ziehen" },
  ],
  "/cockpit/substance-checker": [
    { route: "/cockpit/eu-alternativen", label: "EU-Alternativen", desc: "Land-Liste mit Steuer-Sätzen" },
    { route: "/cockpit/dba-cfc", label: "DBA-CFC-Rechner", desc: "Bei Mailbox-Risiko: konkrete Hinzurechnung rechnen" },
    { route: "/cockpit/us-llc-wizard", label: "US-LLC-Wizard", desc: "US-LLC vom Substance-Standpunkt prüfen" },
  ],
  "/cockpit/dba-cfc": [
    { route: "/cockpit/eu-alternativen", label: "EU-Alternativen", desc: "Land mit niedriger Hinzurechnung wählen" },
    { route: "/cockpit/substance-checker", label: "Substance-Checker", desc: "Substanz aufbauen, um Hinzurechnung zu vermeiden" },
    { route: "/cockpit/holding-designer", label: "Holding-Designer", desc: "Hinzurechnung in Holding-Konstrukt einplanen" },
  ],
  "/cockpit/check": [
    { route: "/cockpit/marken-wizard", label: "Marken-Wizard", desc: "Wenn Marke frei: DPMA-Anmeldung schritt-für-schritt" },
    { route: "/cockpit/marken-monitor", label: "Marken-Monitor", desc: "Watchlist + Diff-Alert bei neuen Anmeldungen" },
  ],
  "/cockpit/marken-wizard": [
    { route: "/cockpit/check", label: "Brand-Check", desc: "Vorab-Check Domain + Social + Apple App Store" },
    { route: "/cockpit/marken-monitor", label: "Marken-Monitor", desc: "Nach Anmeldung: Watchlist anlegen" },
  ],
  "/cockpit/marken-monitor": [
    { route: "/cockpit/check", label: "Brand-Check", desc: "Neue Marke vorab gegen DPMA + EUIPO checken" },
    { route: "/cockpit/marken-wizard", label: "Marken-Wizard", desc: "Anmeldung selbst erledigen mit Nizza-Empfehlung" },
  ],
  "/cockpit/lucid-wizard": [
    { route: "/cockpit/ce-generator", label: "CE/RoHS-Generator", desc: "Konformitätserklärung-PDF parallel erstellen" },
  ],
  "/cockpit/ce-generator": [
    { route: "/cockpit/lucid-wizard", label: "LUCID-Wizard", desc: "Verpackungsregister-Anmeldung" },
  ],
  "/cockpit/reisekosten-logger": [
    { route: "/cockpit/bwa-generator", label: "BWA-Generator", desc: "Reisekosten-Summe in BWA übertragen" },
    { route: "/cockpit/kfz-optimizer", label: "Kfz-Optimizer", desc: "Bei eigenem Geschäfts-Kfz: 1%-Regel vs Fahrtenbuch" },
  ],
  "/cockpit/foerderung": [
    { route: "/wizard/rechtsform", label: "Rechtsform-Wizard", desc: "Förder-Eignung hängt oft an Rechtsform (UG vs GmbH)" },
  ],
};

const RelatedTools = () => {
  const { pathname, search } = useLocation();
  // Settlement-Parser-Variante: ?mode= entscheidet — ignoriere search für Lookup, nutze Basis-Path
  const lookup = pathname;
  const items = RELATED[lookup];
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-border">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Verwandte Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((t) => (
          <Link
            key={t.route}
            to={t.route}
            className="group rounded-2xl border border-border bg-card p-4 hover:border-accent-blue hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="font-semibold text-sm">{t.label}</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            <div className="text-xs text-muted-foreground leading-snug">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
