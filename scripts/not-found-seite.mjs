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
/**
 * App-Hülle für die App-Routen (SEO-Befund 22.11.2026): /willkommen, /affiliate,
 * /reset-password, /mail-bestaetigen, /einbetten/… lieferten 200 mit Startseiten-
 * Titel, ohne Canonical und ohne noindex – Kopien der Startseite für Google.
 * dist/app-shell.html (Ziel aller App-Rewrites in vercel.json) trägt deshalb
 * robots noindex, aber kein og:url der Startseite.
 *
 * Dieselbe Hülle springt in prerender.mjs auch für Sitemap-Seiten ein, die nicht
 * gerendert werden konnten. Dort darf kein noindex stehen → huelleOhneNoindex().
 */
const APP_NOINDEX = '<meta name="robots" content="noindex" data-app-huelle="1">';

export function appShellSeite(shell) {
  if (!/<div id="root">\s*<\/div>/.test(shell)) {
    throw new Error("App-Hülle hat kein leeres #root – app-shell.html nicht erzeugt");
  }
  return shell
    .replace(/[ \t]*<link\b[^>]*\brel=["']canonical["'][^>]*>\s*\n?/gi, "")
    .replace(/[ \t]*<meta\b[^>]*\bname=["']robots["'][^>]*>\s*\n?/gi, "")
    .replace(/[ \t]*<meta\b[^>]*\bproperty=["']og:url["'][^>]*>\s*\n?/gi, "")
    .replace(/(<title>[^<]*<\/title>)/, `$1\n    ${APP_NOINDEX}`);
}

/** Hülle ohne das App-noindex (für den Rückfall nicht gerenderter Sitemap-Seiten und die 404). */
export function huelleOhneNoindex(shell) {
  return shell.replace(/[ \t]*<meta name="robots" content="noindex" data-app-huelle="1">\s*\n?/g, "");
}

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
