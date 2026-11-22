/** Wo das Erklärfeld des Rundgangs steht. Reine Rechnung, damit sie testbar bleibt. */
export interface Kasten { left: number; top: number; width: number; height: number }
export interface Groesse { width: number; height: number }
export interface Lage { left: number; top: number }

/** Meldet der Seitenleiste, dass der Rundgang läuft (detail: true/false). */
export const RUNDGANG_EVENT = "gx-rundgang";

const ABSTAND = 14;
const RAND = 12;
const HANDY = 640;

const klemme = (wert: number, min: number, max: number) => Math.min(Math.max(wert, min), Math.max(min, max));

/**
 * @param ziel   die gezeigte Stelle (null = Feld in die Mitte)
 * @param feld   Größe des Erklärfelds
 * @param sicht  Größe des Fensters
 * @param seitlich  Stelle liegt in der Seitenleiste: Feld rechts daneben statt darunter
 */
export function tourPanelLage(ziel: Kasten | null, feld: Groesse, sicht: Groesse, seitlich = false): Lage {
  const maxLinks = sicht.width - feld.width - RAND;
  const maxOben = sicht.height - feld.height - RAND;
  const mitte = { left: klemme((sicht.width - feld.width) / 2, RAND, maxLinks), top: klemme((sicht.height - feld.height) / 2, RAND, maxOben) };
  if (!ziel) return mitte;

  const zielMitteY = ziel.top + ziel.height / 2;

  // Handy: Feld an den Rand, der der Stelle gegenüberliegt, über die volle Breite zentriert.
  if (sicht.width < HANDY) {
    const unten = zielMitteY < sicht.height / 2;
    return { left: mitte.left, top: unten ? maxOben : RAND };
  }

  if (seitlich) {
    const rechts = ziel.left + ziel.width + ABSTAND;
    if (rechts <= maxLinks) return { left: rechts, top: klemme(ziel.top, RAND, maxOben) };
  }

  const links = klemme(ziel.left, RAND, maxLinks);
  const darunter = ziel.top + ziel.height + ABSTAND;
  if (darunter <= maxOben) return { left: links, top: darunter };
  const darueber = ziel.top - ABSTAND - feld.height;
  if (darueber >= RAND) return { left: links, top: darueber };
  // Hohe Stelle: daneben, erst rechts, dann links.
  const oben = klemme(ziel.top, RAND, maxOben);
  const rechts = ziel.left + ziel.width + ABSTAND;
  if (rechts <= maxLinks) return { left: rechts, top: oben };
  const linksDavon = ziel.left - ABSTAND - feld.width;
  if (linksDavon >= RAND) return { left: linksDavon, top: oben };
  // Stelle füllt das Fenster: Feld unten rechts in die Ecke, dort verdeckt es am wenigsten.
  return { left: maxLinks, top: maxOben };
}
