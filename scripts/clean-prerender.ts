// Läuft als Teil von `postbuild` NACH react-snap.
// react-snap crawlt (logged-out) auch hinter die PaywallGate und friert dort die
// Upsell-Wand als statisches HTML ein. Für zahlende User würde das beim
// Direktaufruf/Refresh eines Tools einen "Schalte alle Tools frei"-Flash erzeugen,
// bevor React hydratisiert. Außerdem sind das robots-blockierte Thin-Content-Seiten.
// → Wir löschen die prerenderten HTMLs dieser gegateten/privaten Routen wieder.
// Diese Routen fallen dann auf die SPA-Shell (dist/index.html) zurück:
// Loader → echter Inhalt, kein Paywall-Flash.

import { rmSync, existsSync } from "fs";
import { resolve } from "path";

const DIST = resolve("dist");

// Top-Level-Verzeichnisse gegateter/privater Bereiche (siehe robots.txt Disallow).
const GATED_DIRS = [
  "cockpit",
  "wizard",
  "dashboard",
  "auth",
  "checkout",
  "onboarding",
  "booking",
  "profile",
  "admin",
  "support",
  "felix",
  "anbieter",
  "playbook",
  "playbooks",
];

let removed = 0;
for (const dir of GATED_DIRS) {
  const p = resolve(DIST, dir);
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true });
    removed++;
  }
}

console.log(`clean-prerender: ${removed} gegatete Prerender-Verzeichnisse entfernt (fallen auf SPA-Shell zurück).`);
