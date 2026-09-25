// Zusammengelegte Themen-Dubletten (SEO-Runde 25.09.2026).
//
// Zu diesen Themen gab es je eine Pitch-Seite unter /guides/:slug (600–800
// Woerter, Umriss des bezahlten Playbooks) UND einen ausfuehrlichen Ratgeber
// unter /ratgeber/:slug (1.350–1.850 Woerter). Beide trugen ein eigenes
// Canonical und konkurrierten um dieselben Suchbegriffe. Der Ratgeber ist
// jeweils die staerkere Seite; die Guide-Landing leitet per 301 dorthin
// (vercel.json), der Playbook-Umriss erscheint als Kasten im Ratgeber.
//
// Das Playbook selbst (/playbook/…, hinter der Paywall) bleibt unberuehrt.
//
// WICHTIG: Jede Zeile hier braucht ihr Gegenstueck in vercel.json
// ("/guides/<slug>" -> "/ratgeber/<ziel>", 301). guideMerges.test.ts prueft das.
export const GUIDE_MERGED_INTO: Readonly<Record<string, string>> = {
  "us-llc": "us-llc-gruenden-deutschland",
  kleinunternehmer: "kleinunternehmer-2026",
  "gpsr-compliance": "gpsr-verordnung-haendler",
  "oss-anmeldung": "oss-anmeldung",
  "hk-limited": "hk-limited-gruenden",
  "gmbh-gruendung": "gmbh-gruenden-kosten-2026",
  "marke-anmelden": "marke-anmelden-dpma",
  holding: "holding-gmbh-gruenden",
  "einzelunternehmen-gruendung": "einzelunternehmen-gruenden-gewerbe-freiberufler",
  "amazon-fba-launch": "amazon-fba-starten-deutschland",
  "foerderung-stipendium": "foerderung-gruender-2026",
};

/** Ziel-URL fuer einen Guide-Link: der Ratgeber, falls zusammengelegt. */
export const guideHref = (slug: string): string =>
  GUIDE_MERGED_INTO[slug] ? `/ratgeber/${GUIDE_MERGED_INTO[slug]}` : `/guides/${slug}`;

export const isMergedGuide = (slug: string): boolean => slug in GUIDE_MERGED_INTO;

/** Guide-Slugs, die in diesen Ratgeber zusammengelegt wurden. */
export const guidesMergedInto = (ratgeberSlug: string): string[] =>
  Object.entries(GUIDE_MERGED_INTO)
    .filter(([, ziel]) => ziel === ratgeberSlug)
    .map(([guide]) => guide);
