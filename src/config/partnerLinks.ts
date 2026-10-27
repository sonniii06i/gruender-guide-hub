// Partnerlinks (Affiliate) – Betreiber 27.10.2026.
// Nur Programme, in denen GründerX gemessen angenommen ist (Awin-Publisher 1271427, relationship=joined, 27.10.2026):
//   Lexware Office DE = Awin-Programm 13787, sevDesk DE = Awin-Programm 15944.
// Regeln: Bewertungen/Reihenfolge bleiben unabhängig von der Provision (beide Buchhaltungs-Tools sind Partner,
// ELSTER-direkt bleibt die Empfehlung für kleine Fälle). Jeder Link ist als Partnerlink gekennzeichnet und trägt
// rel="sponsored nofollow" (PARTNER_REL).

const AWIN_PUBLISHER = 1271427;

interface Partner {
  awinMid: number;
  ziel: string; // Zielseite beim Anbieter
}

const PARTNER: Record<string, Partner> = {
  // Slugs wie in src/data/anbieter.ts
  lexoffice: { awinMid: 13787, ziel: "https://www.lexware.de/preise/" },
  sevdesk: { awinMid: 15944, ziel: "https://sevdesk.de/preise/" },
};

export const PARTNER_REL = "sponsored nofollow noopener noreferrer";

export const PARTNER_HINWEIS =
  "Partnerlink: Schließt du darüber ab, erhält GründerX ggf. eine Provision – für dich ohne Mehrkosten. Unsere Einordnung ist davon unabhängig.";

/** Awin-Deeplink für einen Anbieter-Slug, sonst null. `ort` landet als clickref (Auswertung je Platzierung). */
export function partnerUrl(slug: string, ort: string): string | null {
  const p = PARTNER[slug];
  if (!p) return null;
  const ref = `gx-${ort}`.replace(/[^a-z0-9-]/gi, "").slice(0, 50);
  return `https://www.awin1.com/cread.php?awinmid=${p.awinMid}&awinaffid=${AWIN_PUBLISHER}&clickref=${ref}&ued=${encodeURIComponent(p.ziel)}`;
}
