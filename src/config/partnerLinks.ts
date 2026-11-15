// Partnerlinks (Affiliate) – Betreiber 27.10.2026, zentralisiert 15.11.2026.
//
// Eine Stelle für alle Anbieter-Links der Vergleichs- und Ratgeberseiten: Jede Seite fragt
// `partnerZiel(url, ort)` und bekommt entweder den unveränderten Link oder den Partnerlink
// samt Kennzeichnung. Ein neues Programm ist damit eine Zeile in PARTNER und wirkt sofort
// auf allen Seiten (Anbieter-Vergleich, Bankvergleich, Karten, Roadmaps, Ratgeber-Texte).
//
// Regeln:
// - Nur Programme, in denen GründerX gemessen angenommen ist (Awin: relationship=joined;
//   andere Netzwerke: Zusage + echter Link aus dem Partner-Konto). Nie auf Verdacht.
// - Bewertungen und Reihenfolge bleiben unabhängig von der Provision.
// - Jeder Partnerlink trägt rel="sponsored nofollow" (PARTNER_REL), ein Sternchen und den
//   Hinweis PARTNER_HINWEIS auf derselben Seite.
//
// Stand der Programme:
//   Lexware Office DE = Awin 13787, sevDesk DE = Awin 15944 (joined, Klick-Probe 15.11.2026).
//   Shopify (Impact) und Amex (Freundschaftswerbung) stehen als fertige Links in den Daten
//   und werden über FERTIGE_PARTNERLINKS erkannt und gekennzeichnet.

const AWIN_PUBLISHER = 1271427;

type Partner =
  | {
      art: "awin";
      awinMid: number;
      /** Standard-Zielseite beim Anbieter */
      ziel: string;
      /** Hostnamen (ohne www.), deren Links auf dieses Programm umgestellt werden */
      domains: string[];
      /** true: Das Programm leitet auf die verlinkte Unterseite weiter (Deeplink gemessen). */
      deeplink?: boolean;
    }
  | {
      /** Fester Empfehlungslink aus dem Partner-Konto (PartnerStack, Impact, eigenes Programm). */
      art: "link";
      url: string;
      domains: string[];
    };

const PARTNER: Record<string, Partner> = {
  // Slugs wie in src/data/anbieter.ts
  lexoffice: {
    art: "awin",
    awinMid: 13787,
    ziel: "https://www.lexware.de/preise/",
    domains: ["lexoffice.de", "lexware.de"],
  },
  sevdesk: {
    art: "awin",
    awinMid: 15944,
    ziel: "https://sevdesk.de/preise/",
    domains: ["sevdesk.de"],
    deeplink: true,
  },
};

/** Links, die schon ein Empfehlungslink sind (stehen so in den Daten) und nur gekennzeichnet werden. */
const FERTIGE_PARTNERLINKS: RegExp[] = [
  /^https?:\/\/shopify\.pxf\.io\//i,
  /^https?:\/\/(www\.)?americanexpress\.com\/de-de\/referral\//i,
  /^https?:\/\/www\.awin1\.com\//i,
];

export const PARTNER_REL = "sponsored nofollow noopener noreferrer";
export const EXTERN_REL = "noopener noreferrer";

export const PARTNER_HINWEIS =
  "Partnerlink: Schließt du darüber ab, erhält GründerX ggf. eine Provision – für dich ohne Mehrkosten. Unsere Einordnung ist davon unabhängig.";

function clickref(ort: string): string {
  return `gx-${ort}`.replace(/[^a-z0-9-]/gi, "").slice(0, 50);
}

function awinLink(mid: number, ziel: string, ort: string): string {
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${AWIN_PUBLISHER}&clickref=${clickref(ort)}&ued=${encodeURIComponent(ziel)}`;
}

function host(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function passt(h: string, domains: string[]): boolean {
  return domains.some((d) => h === d || h.endsWith(`.${d}`));
}

function partnerFuerHost(h: string): Partner | null {
  for (const p of Object.values(PARTNER)) if (passt(h, p.domains)) return p;
  return null;
}

/** Partnerlink für einen Anbieter-Slug, sonst null. `ort` landet als clickref (Auswertung je Platzierung). */
export function partnerUrl(slug: string, ort: string): string | null {
  const p = PARTNER[slug];
  if (!p) return null;
  return p.art === "awin" ? awinLink(p.awinMid, p.ziel, ort) : p.url;
}

export interface PartnerZiel {
  href: string;
  /** true = Partnerlink: mit PARTNER_REL, Sternchen und Hinweis ausgeben. */
  partner: boolean;
}

/**
 * Ziel für einen externen Anbieter-Link. Erkennt das Programm am Hostnamen (oder am Slug, falls
 * übergeben), sonst bleibt der Link unverändert. Interne und ungültige Adressen bleiben unberührt.
 */
export function partnerZiel(
  url: string | undefined | null,
  ort: string,
  slug?: string,
  opts?: { zielErhalten?: boolean },
): PartnerZiel {
  if (!url) return { href: url ?? "", partner: false };
  if (FERTIGE_PARTNERLINKS.some((r) => r.test(url))) return { href: url, partner: true };
  const h = host(url);
  const p = (slug && PARTNER[slug]) || (h ? partnerFuerHost(h) : null);
  if (!p) return { href: url, partner: false };
  const deeplink = p.art === "awin" && !!p.deeplink && !!h && passt(h, p.domains);
  const anbieterseite = istAnbieterseite(url);
  // Ein Link darf nie auf eine andere Seite führen als die verlinkte: Zeigt er auf eine bestimmte
  // Unterseite (Gründerangebot, Fachartikel) und das Programm reicht keine Deeplinks durch, bleibt
  // er unverändert. Umgestellt wird nur, wenn das Ziel gleich bleibt (Deeplink) oder der Link
  // ohnehin auf Start- oder Preisseite zeigt.
  if (!deeplink && !anbieterseite) return { href: url, partner: false };
  // Im Fließtext sind tiefe Links Quellenangaben (Wissensartikel des Anbieters): weder umbiegen
  // noch als Werbung kennzeichnen, auch wenn ein Deeplink möglich wäre.
  if (opts?.zielErhalten && !anbieterseite) return { href: url, partner: false };
  if (p.art === "link") return { href: p.url, partner: true };
  return { href: awinLink(p.awinMid, deeplink ? url : p.ziel, ort), partner: true };
}

/**
 * Start-, Länder- oder Preisseite eines Anbieters, also ein Verweis auf den Anbieter selbst und
 * nicht auf ein bestimmtes Angebot oder einen Fachartikel. Bewusst eng: „/gruenderedition/“ zählt nicht.
 */
const ANBIETER_PFAD = /^(?:[a-z]{2}(?:-[a-z]{2})?|preise|preis|pricing|tarife|plans|business|geschaeftskonto)$/i;
function istAnbieterseite(url: string): boolean {
  try {
    const teile = new URL(url).pathname.split("/").filter(Boolean);
    return teile.length === 0 || teile.every((s) => ANBIETER_PFAD.test(s));
  } catch {
    return false;
  }
}

/** true, wenn mindestens einer der Links ein Partnerlink ist (für den Hinweis unter einer Liste). */
export function hatPartnerlink(urls: Array<string | undefined | null>, opts?: { zielErhalten?: boolean }): boolean {
  return urls.some((u) => partnerZiel(u, "x", undefined, opts).partner);
}
