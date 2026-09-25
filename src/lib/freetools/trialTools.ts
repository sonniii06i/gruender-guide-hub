// Die Tools mit EINER kostenlosen Nutzung ohne Konto (Ergebnis gegen
// E-Mail-Adresse, danach Hinweis auf das Abo).
//
// Technik je Tool (Stand 25.09.2026):
//  - weee-check:   Edge Function `check-weee` (verify_jwt = false, keine
//                  Auth-Prüfung) → öffentliches EAR-Verzeichnis der stiftung ear
//  - brand-check:  Edge Function `check-brand` (verify_jwt = false, keine
//                  Auth-Prüfung) → DPMA/EUIPO/WIPO, DNS, Social, App Store
//  - lucid-wizard: rein im Browser gerechnet, keine Abfrage
//  - gruendungskosten-rechner: rein im Browser (FreeToolWizard-Template)
//
// Die Sperre nach der ersten Nutzung ist eine Browser-Sperre (localStorage),
// kein Zugriffsschutz: Die beiden Edge Functions sind ohnehin öffentlich.

export interface TrialTool {
  slug: string;
  /** Kurzname für Knöpfe und Hinweise. */
  name: string;
  /** Was man bekommt, ein Satz. */
  desc: string;
  /** Öffentliche Seite mit der kostenlosen Nutzung. */
  trialPath: string;
  /** Beschreibende Landing (SEO). */
  landingPath: string;
  /** Vollversion im Cockpit (hinter der PaywallGate). */
  cockpitPath: string;
}

export const TRIAL_TOOLS: TrialTool[] = [
  {
    slug: "weee-check",
    name: "WEEE-Check",
    desc: "Marke im offiziellen EAR-Verzeichnis der stiftung ear nachschlagen: WEEE-Reg.-Nr., Hersteller, Kategorie, aktiv oder ausgetreten.",
    trialPath: "/tools/weee-check/gratis",
    landingPath: "/tools/weee-check",
    cockpitPath: "/cockpit/weee-check",
  },
  {
    slug: "brand-check",
    name: "Brand-Check",
    desc: "Markenname gegen DPMA/EUIPO, Domains, Social-Handles und App Store prüfen — in einem Durchgang.",
    trialPath: "/tools/brand-check/gratis",
    landingPath: "/tools/brand-check",
    cockpitPath: "/cockpit/check",
  },
  {
    slug: "lucid-wizard",
    name: "LUCID-Wizard",
    desc: "Verpackungsmengen eingeben, Lizenzkosten-Spanne und passende duale Systeme sehen.",
    trialPath: "/tools/lucid-wizard/gratis",
    landingPath: "/tools/lucid-wizard",
    cockpitPath: "/cockpit/lucid-wizard",
  },
  {
    slug: "gruendungskosten-rechner",
    name: "Gründungskosten-Rechner",
    desc: "Einmalige und laufende Kosten deiner Gründung als Übersicht mit PDF.",
    trialPath: "/gruendungskosten-rechner",
    landingPath: "/gruendungskosten-rechner",
    cockpitPath: "/gruendungskosten-rechner",
  },
];

export const TRIAL_TOOL_BY_SLUG: Record<string, TrialTool> = Object.fromEntries(
  TRIAL_TOOLS.map((t) => [t.slug, t]),
);

/** Einheitlicher Hinweis auf den Teaser-Seiten. */
export const TRIAL_CLAIM = "1 kostenlose Prüfung, nur E-Mail nötig";
