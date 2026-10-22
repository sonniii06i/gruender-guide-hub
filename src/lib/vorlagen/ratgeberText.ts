// Zerlegt den reinen Text eines Ratgeber-Abschnitts (src/data/vorlagen) in
// Absätze und Aufzählungen: Absätze sind durch eine Leerzeile getrennt,
// Aufzählungspunkte beginnen mit „- “. Kein Markdown, kein HTML.

export type TextBlock = { art: "absatz"; text: string } | { art: "liste"; zeilen: string[] };

export function textBloecke(text: string): TextBlock[] {
  const bloecke: TextBlock[] = [];
  for (const roh of text.replace(/\r/g, "").split(/\n\s*\n/)) {
    const zeilen = roh.split("\n").map((z) => z.trim()).filter(Boolean);
    let absatz: string[] = [];
    let liste: string[] = [];
    const absatzSchliessen = () => {
      if (absatz.length) bloecke.push({ art: "absatz", text: absatz.join(" ") });
      absatz = [];
    };
    const listeSchliessen = () => {
      if (liste.length) bloecke.push({ art: "liste", zeilen: liste });
      liste = [];
    };
    for (const z of zeilen) {
      if (/^[-•]\s+/.test(z)) {
        absatzSchliessen();
        liste.push(z.replace(/^[-•]\s+/, ""));
      } else {
        listeSchliessen();
        absatz.push(z);
      }
    }
    absatzSchliessen();
    listeSchliessen();
  }
  return bloecke;
}

/** Anker-ID aus einer Überschrift, z. B. „Was muss in einen GbR-Vertrag?“ → „was-muss-in-einen-gbr-vertrag“. */
export const ankerId = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
