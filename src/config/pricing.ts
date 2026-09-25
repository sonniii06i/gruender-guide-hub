/**
 * Einzige Quelle für Preise, Ausführungen und Leistungen von GründerX.
 *
 * Genutzt von:
 *  - dem Produktblock der Startseite (/#bundles, components/landing/Bundles.tsx)
 *  - der Preisseite (/preise, pages/Preise.tsx) inkl. JSON-LD
 *  - dem Warenkorb (/checkout, pages/Checkout.tsx) für die Beträge
 *  - den Abo-Hinweisen nach einer kostenlosen Prüfung
 *
 * ALLE BETRÄGE SIND BRUTTO (Endpreise inkl. 19 % USt.) — genau der Betrag, den
 * Stripe abbucht. AGB § 4 Abs. 1 führt Solo mit „54,61 € netto / Monat
 * (64,99 € brutto)" und das Set mit „84,03 € netto (99,99 € brutto)".
 * `create-checkout` setzt kein `automatic_tax`; der Nettoanteil wird
 * herausgerechnet, nie aufgeschlagen.
 *
 * Wer einen Preis ändert, ändert ihn HIER — und zusätzlich in Stripe und in
 * den AGB. Die Seiten rechnen alles Weitere (Netto, Tagespreis, Ersparnis)
 * aus diesen Werten.
 */
import { STRIPE_PRICES } from "@/lib/stripe";

export const VAT_RATE = 0.19;

export type PlanId = "gruenderx" | "gruenderx-year" | "bundle" | "bundle-year";

export interface PlanVariant {
  id: PlanId;
  /** Name der Ausführung, wie er auch im Warenkorb und auf der Rechnung steht. */
  name: string;
  /** Artikelnummer. */
  sku: string;
  /** BRUTTOpreis in Cent. */
  grossCents: number;
  /** Streichpreis in Cent (brutto), nur mit echtem Vergleichswert. */
  anchorCents?: number;
  period: "month" | "year";
  note?: string;
  /** Stripe-Price-ID (Monat und Jahr teilen sich denselben Anker). */
  priceId: string;
  interval: "month" | "year";
}

export const PLANS: Record<PlanId, PlanVariant> = {
  "gruenderx": {
    id: "gruenderx",
    name: "GründerX — monatlich",
    sku: "GX-PRO-M",
    grossCents: 6499,
    period: "month",
    priceId: STRIPE_PRICES.gruenderx,
    interval: "month",
  },
  "gruenderx-year": {
    id: "gruenderx-year",
    name: "GründerX — jährlich",
    sku: "GX-PRO-Y",
    grossCents: 64990,
    anchorCents: 12 * 6499,
    period: "year",
    note: "Zwei Monate geschenkt gegenüber der Monatszahlung (12 × 64,99 € = 779,88 €).",
    priceId: STRIPE_PRICES.gruenderx,
    interval: "year",
  },
  "bundle": {
    id: "bundle",
    name: "Founder-Set — GründerX + AnwaltX",
    sku: "GX-AX-SET-M",
    grossCents: 9999,
    // Vergleichswert: GründerX (64,99 €) + AnwaltX Pro (64,99 €) einzeln.
    anchorCents: 2 * 6499,
    period: "month",
    note: "Enthält zusätzlich den vollen AnwaltX-Zugang (Juri). Ein Konto, eine Abrechnung.",
    priceId: STRIPE_PRICES.bundle,
    interval: "month",
  },
  "bundle-year": {
    id: "bundle-year",
    name: "Founder-Set — jährlich",
    sku: "GX-AX-SET-Y",
    grossCents: 99990,
    anchorCents: 12 * 9999,
    period: "year",
    note: "Beide Zugänge, zwei Monate geschenkt gegenüber der Monatszahlung.",
    priceId: STRIPE_PRICES.bundle,
    interval: "year",
  },
};

export const PLAN_ORDER: PlanId[] = ["gruenderx", "gruenderx-year", "bundle", "bundle-year"];

/** Günstigster Monatspreis — für „ab …"-Angaben. */
export const PRO_MONTH_GROSS_CENTS = PLANS.gruenderx.grossCents;

/** Nettoanteil eines Bruttobetrags in Cent. */
export const netCentsOf = (grossCents: number) => Math.round(grossCents / (1 + VAT_RATE));

/** "64,99 €" — deutsche Schreibweise. */
export const formatEurCents = (cents: number): string =>
  (cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/** "64.99" — für schema.org (Punkt als Dezimaltrenner). */
export const schemaPrice = (cents: number): string => (cents / 100).toFixed(2);

/** Kündigungsregel — derselbe Wortlaut überall. */
export const CANCEL_NOTE =
  "Jederzeit im Konto kündbar, wirksam zum Ende der laufenden Abrechnungsperiode — danach keine weitere Abbuchung. Keine Mindestlaufzeit über die gebuchte Periode hinaus. Widerrufsrecht für Verbraucher nach § 355 BGB.";

/** Gutschein für den ersten Monat (nur Monatsabos). */
export const FOUNDER_CODE = { code: "FOUNDER", percent: 20 } as const;

/** Voller Funktionsumfang des GründerX-Zugangs. */
export const SOLO_CONTENTS = [
  "Felix — KI-Co-Pilot für Gründung, Steuern und Marketplaces, unbegrenzt im Chat",
  "Gründung: Rechtsform-Wizard, Gewerbeanmeldung, Fragebogen zur steuerlichen Erfassung (Einzel, Personen- und Kapitalgesellschaft), Erste-Schritte-Roadmap, Entscheidungs-Engine, Gewerbe-Check",
  "Steuer-Cockpit: USt-Voranmeldung, Anlage EÜR, BWA-Generator, DATEV-Mapper, Quartals-Steuerschätzung, IAB-Rechner, Abschreibungs-Erklärer, Fristen-Kalender",
  "Belege & Buchhaltung: Rechnungs-Generator (PDF), Settlement-Parser, Reisekosten-Logger, Kfz-Optimizer, Crypto-Steuer, Steuer-ABC-Glossar",
  "E-Commerce: Amazon-Erstattungen & Seller-Automation, Amazon-USt EU vs. US, Marge-Tracker, Shop-Profit-Rechner, ECom-Brand-Roadmap, Side-Hustle-Schwellen-Check, Sales-Tax-Nexus",
  "Marke & Compliance: Brand-Check, Marken-Wizard, Marken-Monitor, LUCID-Wizard, WEEE/EAR-Check, CE/RoHS-Generator, GPSR, BattG, CPNP, Pre-Year-End-Check",
  "International: US-LLC- und HK-Limited-Wizard (EIN, ITIN, BOI, Banking), US- und HK-Tax-Helper, DBA-CFC-Rechner, IP-Box-Vergleich, EU-Alternativen, Substance-Checker, Visa-Helper",
  "Geld & Absicherung: Auszahlung-Optimizer, Salary-vs-Dividende, Runway- & Burn-Rate-Rechner, KV- und Pension-Optimizer, Brutto-Netto Solo, Stundensatz-Rechner, Versicherungs-Basis-Check",
  "Banking & Karten: Intl. Banking, Geschäftskreditkarten- und US-Kreditkarten-Vergleich, Förderung-Datenbank",
  "Steuerberater: StB-Finder, StB-Match, Cost-Benefit-Check und Hand-off-Paket für den Wechsel",
  "Anbieter-Vergleich in 14 Kategorien: Banking, Buchhaltung, 3PL, Versand, Domains, Tracking, Labor und mehr",
  "Holding-Designer für Struktur- und Beteiligungsfragen",
  "Gründungs-Guides und Playbooks (GmbH, UG, Einzelunternehmen, US-LLC, Holding) plus laufend gepflegte Ratgeber",
  "Coop-Deals und Anbieter-Konditionen für Abonnenten",
  "E-Mail-Support",
];

/** Was das Founder-Set zusätzlich enthält. */
export const BUNDLE_CONTENTS = [
  "Alles aus dem GründerX-Zugang (siehe Einzelzugang)",
  "Juri — KI-Rechts-Assistentin (AnwaltX), unbegrenzt im Chat",
  "Vertragsprüfung: Vertrag oder AGB hochladen, Risiko-Klauseln markiert zurück",
  "Vertrags-Builder für eigene Verträge und AGB",
  "Abmahnungs-Soforthilfe mit Einordnung, Fristenlage und Antwortentwurf",
  "Abmahn-Radar: laufende Abmahnwellen, bevor sie dich treffen",
  "Markencheck und Chargeback-Verteidigung",
  "Rechts-Generatoren: Impressum, Datenschutz, Widerruf, Datenschutzklauseln",
  "Fristen-Tracker und rechtssichere Mails direkt aus dem System",
  "Felix und Juri gemeinsam im selben Chat",
  "Priorisierter Support",
];

/** Was ausdrücklich NICHT enthalten ist. */
export const NOT_INCLUDED =
  "Steuerberatung und Rechtsberatung im Einzelfall sowie Amtsgebühren (Gewerbeanmeldung, Notar, Handelsregister, Markenanmeldung). GründerX ist eine Software und weder Steuerberatung noch Rechtsdienstleistung.";
