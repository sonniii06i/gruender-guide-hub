import type { LucideIcon } from "lucide-react";

// Free-Tools-Funnel für GründerX: kostenlose Gründer-Tools als Lead-Magnet.
// Multi-Step-Wizard → finales Dokument hinter Konto-Erstellung (kein Abo).
// Dokumente werden deterministisch aus Templates erzeugt (kein LLM, skaliert, free).

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio";

export interface FieldOption {
  value: string;
  label: string;
}

export type ToolData = Record<string, string | boolean>;

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  required?: boolean;
  options?: FieldOption[];
  /** Feld nur anzeigen, wenn Bedingung erfüllt. */
  condition?: (data: ToolData) => boolean;
  /** Grid-Breite (1 = halb, 2 = voll). Default 2. */
  colSpan?: 1 | 2;
}

export interface StepDef {
  title: string;
  subtitle?: string;
  fields: FieldDef[];
}

export interface ToolConfig {
  slug: string;
  shortTitle: string;
  documentName: string;
  icon: LucideIcon;
  accent: string;
  badge?: string;
  heroTitle: string;
  heroSubtitle: string;
  /** true (Default): Ergebnis erst nach Konto-Erstellung/Login sichtbar. */
  gated?: boolean;
  resultFilename: string;
  steps: StepDef[];
  generate: (data: ToolData) => string;
  /** Lange, keyword-reiche Inhaltsblöcke unter dem Wizard (SEO). */
  seoSections?: { heading: string; body: string[] }[];
  seo: {
    title: string;
    description: string;
    keywords: string;
    faqs: { q: string; a: string }[];
  };
}

export function s(data: ToolData, name: string, fallback = ""): string {
  const v = data[name];
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

export function b(data: ToolData, name: string): boolean {
  return data[name] === true;
}

export const DISCLAIMER =
  "Hinweis: Dieser Text wurde automatisch aus deinen Angaben erstellt und dient als " +
  "unverbindliche Orientierung. GründerX ist ein digitales Gründer-Tool und ersetzt keine " +
  "individuelle Steuer-, Rechts- oder Unternehmensberatung. Bitte vor Verwendung prüfen (lassen).";
