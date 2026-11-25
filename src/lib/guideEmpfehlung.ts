import { PLAYBOOKS, type Playbook } from "@/data/playbooks";

// Dashboard „Direkt loslegen“: Guides passend zum Geschäftsmodell aus dem Onboarding
// (profiles.business_model, kommagetrennt). Ohne Angabe die ersten Guides wie bisher.
const NACH_MODELL: Record<string, string[]> = {
  creator: ["creator-influencer-setup", "creator-setup", "tiktok-shop-starten", "creator-tiktok-instagram"],
  amazon_fba: ["amazon-fba-launch", "reseller-marketplace-setup", "tiktok-shop-starten"],
  shopify: ["shopify-launch", "brand-owner-d2c-setup", "tiktok-shop-starten"],
  agency: ["agency-services-setup"],
  saas: ["b2b-saas-spezifika", "vc-pitch-deck", "foerderung-stipendium"],
};
const NACH_ALTER: Record<string, string[]> = {
  "12-17": ["einzelunternehmen-gruendung", "erste-webseite-seo", "eigene-app-launchen", "creator-setup"],
  "18-25": ["einzelunternehmen-gruendung", "kleinunternehmer", "eigene-app-launchen", "shopify-launch"],
  "26-39": ["einzelunternehmen-gruendung", "amazon-fba-launch", "amex-us-beantragen", "ug-gruendung"],
  "40-54": ["gmbh-gruendung", "holding", "amex-us-beantragen", "buchhaltung-setup"],
  "55-70": ["freiberufler-anmelden", "einzelunternehmen-gruendung", "coach-experte-setup", "buchhaltung-setup"],
};
const GRUNDLAGE = ["einzelunternehmen-gruendung", "kleinunternehmer"];

/**
 * @param gruendungsGuide Slug des Gründungs-Guides zur gewählten Rechtsform
 *   (lib/startplan GRUENDUNGS_GUIDE). Steht dann an erster Stelle.
 * @param ageGroup Optionale Altersgruppe (12-17 bis 55-70) für altersgerechte Start-Vorschläge.
 */
export function empfohleneGuides(
  businessModel: string | null | undefined,
  anzahl = 6,
  gruendungsGuide?: string | null,
  ageGroup?: string | null,
): Playbook[] {
  const modelle = (businessModel ?? "").split(",").map((m) => m.trim()).filter(Boolean);
  // Reihum je Modell, damit bei zwei Modellen nicht das erste alle Plätze belegt.
  const listen = modelle.map((m) => NACH_MODELL[m] ?? []).filter((l) => l.length > 0);
  const reihum: string[] = [];
  for (let i = 0; i < 4; i++) for (const l of listen) if (l[i]) reihum.push(l[i]);
  const altersTipps = ageGroup && NACH_ALTER[ageGroup] ? NACH_ALTER[ageGroup] : [];
  const wunsch = [...(gruendungsGuide ? [gruendungsGuide] : []), ...reihum, ...altersTipps];
  if (wunsch.length === 0) return PLAYBOOKS.slice(0, anzahl);
  const slugs = [...new Set([...wunsch, ...(gruendungsGuide ? [] : GRUNDLAGE)])];
  const treffer = slugs.map((s) => PLAYBOOKS.find((p) => p.slug === s)).filter((p): p is Playbook => !!p);
  const rest = PLAYBOOKS.filter((p) => !treffer.includes(p));
  return [...treffer, ...rest].slice(0, anzahl);
}
