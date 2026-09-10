// ===================================================================
// Gemeinsames Layout fuer alle GruenderX-Mails.
//
// WOZU DIESE DATEI. Jede Mailfunktion brachte bisher ihr eigenes HTML mit.
// Die Willkommensmail baut ihr Layout aus <div> mit "color:#111" -- ohne
// Markenfarbe, ohne Kopf, ohne Fuss, und Tabellen-Layout braucht es, damit
// Outlook nicht auseinanderfaellt. Hier steht das Geruest einmal.
//
// WAS AN DIESEM LAYOUT AUF CONVERSION AUSGELEGT IST:
//
// * Preheader — der graue Text neben dem Betreff im Postfach. Fehlt er,
//   zeigt der Client die erste Zeile des Koerpers, also "Hallo,". Nach dem
//   Betreff der zweite Hebel auf die Oeffnungsrate, und er kostet nichts.
// * Genau EIN Hauptknopf je Mail. Zwei gleichwertige Knoepfe halbieren die
//   Klickrate auf den wichtigeren, statt sie zu addieren.
// * Knopf als Tabellenzelle, nicht als <a> mit Padding — Outlook rendert
//   Padding an Inline-Elementen unzuverlaessig.
// * Keine Botschaft in Bildern. Viele Clients laden Bilder erst nach
//   Freigabe; wer die Aussage ins Bild legt, zeigt Erstlesern nichts.
// * 600px, einspaltig, Schrift ab 15px — ueber die Haelfte der Mails wird
//   auf dem Telefon geoeffnet.
// * Duzen, wie auf der Website.
// ===================================================================

export const BRAND = "#256af4";       // --accent-blue, Handlungsfarbe
export const BRAND_DARK = "#0c2a6e";  // --primary
export const BRAND_SOFT = "#eef2ff";
export const BRAND_LINE = "#dbe3f8";
export const INK = "#0c2a6e";         // dunkle Kopfflaeche = Markenblau
export const TEXT = "#1f2937";
export const TEXT_SOFT = "#4b5563";
export const TEXT_MUT = "#8b93a7";
export const BG = "#f4f6fb";
export const LINE = "#e6e9f2";

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";

const esc = (v: string) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function button(url: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 6px">
    <tr><td align="center" bgcolor="${BRAND}" style="border-radius:10px">
      <a href="${url}" style="display:inline-block;padding:15px 30px;font:700 16px/1 ${FONT};color:#ffffff;text-decoration:none;border-radius:10px">${esc(label)}</a>
    </td></tr></table>`;
}

export function paragraph(html: string): string {
  return `<div style="font:400 15px/1.65 ${FONT};color:${TEXT_SOFT};margin-top:14px">${html}</div>`;
}

export function heading(text: string): string {
  return `<div style="font:600 16px/1.4 ${FONT};color:${TEXT};margin:28px 0 14px">${esc(text)}</div>`;
}

/** Hervorgehobener Kasten fuer die eine Zahl, auf die es ankommt. */
export function callout(title: string, body: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:22px 0">
    <tr><td style="background:${BRAND_SOFT};border:1px solid ${BRAND_LINE};border-radius:12px;padding:18px 20px">
      <div style="font:700 17px/1.3 ${FONT};color:${BRAND}">${esc(title)}</div>
      <div style="font:400 14px/1.6 ${FONT};color:${TEXT_SOFT};margin-top:6px">${body}</div>
    </td></tr></table>`;
}

/** Nummerierte Schrittliste. */
export function steps(items: Array<[string, string]>): string {
  const rows = items.map(([t, d], i) =>
    `<tr>
      <td style="padding:0 14px 18px 0;vertical-align:top;width:34px">
        <div style="width:28px;height:28px;border-radius:50%;background:${BRAND};color:#fff;font:700 14px/28px ${FONT};text-align:center">${i + 1}</div>
      </td>
      <td style="padding:0 0 18px;vertical-align:top">
        <div style="font:600 15px/1.4 ${FONT};color:${TEXT}">${esc(t)}</div>
        <div style="font:400 14px/1.6 ${FONT};color:${TEXT_SOFT};margin-top:3px">${d}</div>
      </td></tr>`).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>`;
}

export interface MailOptions {
  preheader: string;
  greeting: string;
  blocks: string[];
  baseUrl?: string;
  footerNote?: string;
  /**
   * MUSS zur Mail passen. "weil du ein Konto hast" ist bei einer
   * Warenkorb-Abbruch-Mail falsch: wer abgebrochen hat, hat pay-first
   * bedingt noch gar keins.
   */
  footerReason?: string;
  /** Ein-Klick-Abmeldung (RFC 8058) — die Queue haengt den Header an. */
  unsubscribeUrl?: string;
}

export function renderMail(o: MailOptions): string {
  const url = (o.baseUrl ?? "https://gruenderx.de").replace(/\/+$/, "");
  const reason = o.footerReason ??
    "Du bekommst diese Mail, weil du ein GründerX-Konto hast.";
  const extra = o.footerNote
    ? `<div style="font:400 13px/1.6 ${FONT};color:${TEXT_MUT};margin-top:22px">${o.footerNote}</div>`
    : "";
  const unsub = o.unsubscribeUrl
    ? ` · <a href="${o.unsubscribeUrl}" style="color:${TEXT_MUT}">Abmelden</a>`
    : "";

  return `<!doctype html>
<html lang="de"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>GründerX</title>
</head>
<body style="margin:0;background:${BG};padding:24px 12px">
<!-- Vorschautext: erscheint im Postfach neben dem Betreff, nicht in der Mail. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0">
  ${esc(o.preheader)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 14px rgba(15,23,42,.07)">

  <tr><td style="background:${INK};padding:24px 28px">
    <div style="font:800 20px/1 ${FONT};color:#ffffff;letter-spacing:.3px">GründerX</div>
    <div style="font:400 12.5px/1 ${FONT};color:#94a3b8;margin-top:6px;letter-spacing:.06em;text-transform:uppercase">Gründung · Steuern · Marketplaces</div>
  </td></tr>

  <tr><td style="padding:28px">
    <div style="font:600 19px/1.35 ${FONT};color:${TEXT}">${esc(o.greeting)}</div>
    ${o.blocks.join("")}
    ${extra}
  </td></tr>

  <tr><td style="background:#f8fafc;padding:18px 28px;border-top:1px solid ${LINE}">
    <div style="font:400 12px/1.6 ${FONT};color:${TEXT_MUT}">
      GründerX · Sonni Buttke · Pinguinweg 18, 22527 Hamburg<br>
      <a href="${url}/impressum" style="color:${TEXT_MUT}">Impressum</a> ·
      <a href="${url}/datenschutz" style="color:${TEXT_MUT}">Datenschutz</a> ·
      <a href="${url}/agb" style="color:${TEXT_MUT}">AGB</a>${unsub}<br>
      <span style="color:#a3aabd">${esc(reason)} Antworte einfach, wenn du etwas brauchst.</span><br>
      <span style="color:#a3aabd">GründerX ist eine Software und weder Steuerberatung noch Rechtsdienstleistung.</span>
    </div>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}
