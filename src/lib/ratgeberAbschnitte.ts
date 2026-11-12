/**
 * Teilt einen Ratgeber nach dem ersten Antwortabschnitt (vor der zweiten H2 „## “).
 * Recherche „kleine Gewinner“ 12.11.2026: Bei 14 von 21 gut rankenden Seiten mit wenig Autorität steht die Antwort direkt
 * unter der H1; bei uns stand auf 18 von 18 Ratgebern zuerst der Konto-Hinweis. Der Hinweis wandert hinter den ersten
 * Abschnitt. Codeblöcke werden nicht als Überschrift gezählt.
 */
export function nachErstemAbschnitt(md: string): [string, string] {
  let imCode = false;
  let h2 = 0;
  let pos = 0;
  for (const zeile of md.split("\n")) {
    if (/^\s*(```|~~~)/.test(zeile)) imCode = !imCode;
    if (!imCode && /^##\s/.test(zeile)) {
      h2 += 1;
      if (h2 === 2) return [md.slice(0, pos), md.slice(pos)];
    }
    pos += zeile.length + 1;
  }
  return [md, ""];
}
