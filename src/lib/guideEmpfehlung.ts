import { PLAYBOOKS, type Playbook } from "@/data/playbooks";

// Dashboard „Direkt loslegen“: Guides passend zum Geschäftsmodell aus dem Onboarding
// (profiles.business_model, kommagetrennt). Ohne Angabe die ersten Guides wie bisher.
const NACH_MODELL: Record<string, string[]> = {
  creator: ["creator-influencer-setup", "creator-setup", "tiktok-shop-starten", "creator-tiktok-instagram"],
  amazon_fba: ["amazon-fba-launch", "reseller-marketplace-setup", "tiktok-shop-starten"],
  shopify: ["shopify-launch", "brand-owner-d2c-setup", "tiktok-shop-starten"],
  agency: ["agency-services-setup"],
};
const GRUNDLAGE = ["einzelunternehmen-gruendung", "kleinunternehmer"];

export function empfohleneGuides(businessModel: string | null | undefined, anzahl = 6): Playbook[] {
  const modelle = (businessModel ?? "").split(",").map((m) => m.trim()).filter(Boolean);
  const wunsch = modelle.flatMap((m) => NACH_MODELL[m] ?? []);
  if (wunsch.length === 0) return PLAYBOOKS.slice(0, anzahl);
  const slugs = [...new Set([...wunsch, ...GRUNDLAGE])];
  const treffer = slugs.map((s) => PLAYBOOKS.find((p) => p.slug === s)).filter((p): p is Playbook => !!p);
  const rest = PLAYBOOKS.filter((p) => !treffer.includes(p));
  return [...treffer, ...rest].slice(0, anzahl);
}
