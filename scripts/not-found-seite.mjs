/**
 * 404-Seite aus der App-Hülle (Technik-Audit 12.11.2026, Betreiber: „App-Routen listen“).
 *
 * Vorher leitete vercel.json JEDEN unbekannten Pfad per Sammel-Rewrite auf
 * app-shell.html: HTTP 200, Titel der Startseite, kein noindex – Soft-404 für
 * /dvsgukxxuj, /blog/x, /x.html, /index.php, /AGB …
 *
 * Jetzt stehen in vercel.json nur noch die echten App-Routen (Test
 * src/test/app-routen-vercel.test.ts), alles andere ohne Datei bekommt von
 * Vercel dist/404.html mit Status 404. Diese Datei IST die App-Hülle (leeres
 * #root, dieselben Skripte): Fehlt eine App-Route im Rewrite, rendert der
 * Client-Router die Seite trotzdem richtig – nur der Status wäre 404.
 *
 * Im rohen HTML: eigener Titel, robots noindex, kein Canonical, kein og:url.
 * Die React-Route „*“ (NotFound.tsx) setzt im Browser zusätzlich noindex.
 */
export const NOT_FOUND_TITEL = "Seite nicht gefunden | GründerX";
export const NOT_FOUND_BESCHREIBUNG =
  "Diese Seite gibt es bei GründerX nicht. Weiter zu Tools, Guides, Ratgeber oder Gratis-Tools.";

/**
 * @param {string} shell  Inhalt von dist/app-shell.html (unprerenderte Hülle)
 * @returns {string}      Inhalt für dist/404.html
 */
export function notFoundSeite(shell) {
  if (!/<div id="root">\s*<\/div>/.test(shell)) {
    throw new Error("App-Hülle hat kein leeres #root – 404.html nicht erzeugt");
  }
  if (!/<title>[^<]*<\/title>/.test(shell)) {
    throw new Error("App-Hülle ohne <title> – 404.html nicht erzeugt");
  }
  return shell
    .replace(/[ \t]*<link\b[^>]*\brel=["']canonical["'][^>]*>\s*\n?/gi, "")
    .replace(/[ \t]*<meta\b[^>]*\bname=["']robots["'][^>]*>\s*\n?/gi, "")
    .replace(/[ \t]*<meta\b[^>]*\bproperty=["']og:url["'][^>]*>\s*\n?/gi, "")
    .replace(
      /(<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=)(["'])[^"']*\2/i,
      `$1$2${NOT_FOUND_BESCHREIBUNG}$2`,
    )
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${NOT_FOUND_TITEL}</title>\n    <meta name="robots" content="noindex">`,
    );
}
