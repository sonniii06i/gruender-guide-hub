// ===================================================================
// mailLayout.ts — gemeinsames Geruest fuer ALLE Mails dieser Marke.
//
// Diese Datei ist in allen Marken **byte-identisch**. Alles, was sich je
// Marke unterscheidet, steht in mailBrand.ts. Wer hier etwas aendert,
// aendert es fuer alle fuenf Marken — und das ist der Zweck: Das Layout
// ist bisher in jeder Codebasis eigenstaendig gewachsen, in den beiden
// Shops sogar je Mailfunktion neu. Eine Korrektur musste bis zu sieben
// Mal nachgezogen werden und wurde es nie vollstaendig.
//
// Abgleich mit `diff` gegen jede andere Marke muss leer bleiben.
//
// -------------------------------------------------------------------
// WAS AN DIESEM LAYOUT AUF CONVERSION AUSGELEGT IST, und warum
// -------------------------------------------------------------------
//
// * **Preheader.** Der graue Text neben dem Betreff im Postfach. Ohne ihn
//   zeigt der Client die erste Zeile des Koerpers ("Hallo,"). Nach dem
//   Betreff der zweite Hebel auf die Oeffnungsrate, und er kostet nichts.
//
// * **Genau EIN Hauptknopf je Mail.** Zwei gleichwertige Knoepfe halbieren
//   die Klickrate auf den wichtigeren, statt sie zu addieren. Zweitwege
//   gehoeren als Textlink darunter, nicht als zweiter Knopf.
//
// * **Knopf als Tabellenzelle**, nicht als <a> mit Padding — Outlook
//   rendert Padding an Inline-Elementen unzuverlaessig.
//
// * **Keine Botschaft in Bildern.** Viele Clients laden Bilder erst nach
//   Freigabe; wer die Aussage ins Bild legt, zeigt Erstlesern nichts.
//   Jedes Bild hier hat deshalb ein aussagekraeftiges alt-Attribut, und
//   die Mail ergibt ohne jedes Bild noch Sinn.
//
// * **600px, einspaltig, Schrift ab 15px** — ueber die Haelfte der Mails
//   wird auf dem Telefon geoeffnet.
//
// * **Dunkelmodus.** NEU in v2 und der Grund fuer die halbe Datei:
//   Apple Mail und Outlook invertieren helle Mails im Dunkelmodus
//   eigenmaechtig. Bisher wurde dabei dunkler Text auf dunklem Grund
//   gerendert — in der Bestellbestaetigung war der Gesamtbetrag
//   betroffen. `color-scheme` meldet dem Client, dass die Mail selbst
//   Bescheid weiss, und die Media-Query setzt die Flaechen bewusst.
//
// * **Immer eine Textfassung.** Reine HTML-Mails landen haeufiger im
//   Spam, und `Built.text` ist deshalb im Typ Pflicht, nicht optional.
//   In AnwaltX fehlte sie bisher komplett.
// ===================================================================

import { BRANDING } from "./mailBrand.ts";

export const BRAND = BRANDING.brand;
export const BRAND_DARK = BRANDING.brandDark;
export const BRAND_SOFT = BRANDING.brandSoft;
export const BRAND_LINE = BRANDING.brandLine;
export const INK = BRANDING.ink;

export const TEXT = "#1f2937";
export const TEXT_SOFT = "#4b5563";
export const TEXT_MUT = "#8b93a7";
export const BG = "#f4f6fb";
export const LINE = "#e6e9f2";
export const GOOD = "#15803d";

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";

const esc = (v: string) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Betrag in Cent -> "12,90 €". Eine Stelle fuer alle Mails, damit nicht
 *  die eine Mail "12.90 EUR" schreibt und die naechste "12,90 €". */
export const eur = (cents: number): string =>
  `${(cents / 100).toFixed(2).replace(".", ",")} €`;

// -------------------------------------------------------------------
// Linkverfolgung
// -------------------------------------------------------------------
// Jeder Link bekommt UTM-Parameter, sonst taucht der gesamte Mailumsatz
// in der Statistik als "Direktzugriff" auf und die Kampagne sieht
// wirkungslos aus. `variant` traegt die A/B-Variante bis in den Kauf --
// erst dadurch laesst sich eine Variante am Umsatz messen und nicht nur
// am Klick.
export function track(
  url: string,
  campaign: string,
  variant?: string,
): string {
  if (!url.startsWith("http")) return url;
  const sep = url.includes("?") ? "&" : "?";
  const p = [
    "utm_source=mail",
    "utm_medium=email",
    `utm_campaign=${encodeURIComponent(campaign)}`,
  ];
  if (variant) p.push(`utm_content=${encodeURIComponent(variant)}`);
  return `${url}${sep}${p.join("&")}`;
}

// -------------------------------------------------------------------
// Bausteine
// -------------------------------------------------------------------

/**
 * Der Handlungsknopf. Breiter und hoeher als vorher.
 *
 * Bei den Vorbildern ist der Knopf ein Block, kein Etikett: Crocs setzt
 * ihn auf rund 260px Breite bei 52px Hoehe. Ein Knopf, der auf dem
 * Telefon kleiner als eine Fingerkuppe ist, wird nicht getroffen — und
 * ein Knopf, den man beim Ueberfliegen uebersieht, wird nicht gedrueckt.
 */
export function button(url: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 8px">
    <tr><td align="center" bgcolor="${BRAND}" style="border-radius:8px">
      <a href="${url}" style="display:inline-block;min-width:200px;padding:17px 36px;font:700 16px/1.1 ${FONT};color:${BRANDING.onBrand};text-decoration:none;border-radius:8px;text-align:center">${esc(label)}</a>
    </td></tr></table>`;
}

/** Zweitweg unter dem Hauptknopf — bewusst als Textlink, nie als zweiter Knopf. */
export function secondary(url: string, label: string): string {
  return `<div style="font:400 14px/1.6 ${FONT};color:${TEXT_MUT};margin:2px 0 4px">
    <a href="${url}" style="color:${BRAND};text-decoration:underline">${esc(label)}</a>
  </div>`;
}

export function paragraph(html: string): string {
  return `<div class="dm-soft" style="font:400 15px/1.65 ${FONT};color:${TEXT_SOFT};margin-top:14px">${html}</div>`;
}

export function heading(text: string): string {
  return `<div class="dm-text" style="font:600 16px/1.4 ${FONT};color:${TEXT};margin:28px 0 14px">${esc(text)}</div>`;
}

export function divider(): string {
  return `<div class="dm-line" style="height:1px;background:${LINE};margin:26px 0"></div>`;
}

// -------------------------------------------------------------------
// Hervorheben ohne Kasten
// -------------------------------------------------------------------
// Hier stand frueher EIN Baustein fuer alles: ein Kasten mit Rahmen,
// farbigem Grund und Radius, in den Preise, Codes und ganze Saetze
// gleichermassen hineingesteckt wurden.
//
// Das Problem daran ist nicht die Optik, sondern die Wirkung: Ein Rahmen
// sagt "hier ist ein Kasten", nicht "hier ist die Zahl, auf die es
// ankommt". Ein Leser, der die Mail ueberfliegt, sieht ein Werbeelement
// und liest darueber hinweg — dieselbe Blindheit wie bei Bannern.
//
// Hervorgehoben wird jetzt ueber SCHRIFTGROESSE und WEISSRAUM. Eine Zahl
// in 30px steht fuer sich, ohne dass ein Rahmen sie einrahmen muss, und
// sie wird beim Ueberfliegen tatsaechlich gelesen. Drei Bausteine statt
// einem, weil drei verschiedene Dinge hervorgehoben werden:
//
//   kernzahl()  — ein Betrag mit Einheit (Preis, Provision, Bestand)
//   kennung()   — ein Code, den jemand abschreiben oder weitergeben soll
//   betonung()  — ein Satz, der herausstechen soll, aber keine Zahl ist
//
// Alle drei setzen die Markenfarbe auf die Schrift statt auf eine Flaeche.

/**
 * Der eine Betrag, auf den es ankommt.
 *
 * `zahl` steht gross und allein, `einheit` klein darunter — so liest man
 * "64,99 €" und erst danach "pro Monat", was der Reihenfolge im Kopf
 * entspricht. `erklaerung` ist normaler Fliesstext und traegt die
 * Bedingungen, die niemand gross gesetzt haben will.
 */
export function kernzahl(zahl: string, einheit: string, erklaerung: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0 24px">
    <tr><td>
      <div style="font:700 30px/1.1 ${FONT};color:${BRAND};letter-spacing:-.02em">${esc(zahl)}</div>
      ${einheit ? `<div class="dm-soft" style="font:400 15px/1.4 ${FONT};color:${TEXT_SOFT};margin-top:5px">${esc(einheit)}</div>` : ""}
      <div class="dm-soft" style="font:400 15px/1.65 ${FONT};color:${TEXT_SOFT};margin-top:14px">${erklaerung}</div>
    </td></tr></table>`;
}

/**
 * Ein Code zum Abschreiben oder Weitergeben.
 *
 * Monospace, weil es beim Abtippen auf jedes Zeichen ankommt und eine
 * Proportionalschrift 0 und O nebeneinanderstellt, ohne sie zu
 * unterscheiden. Etwas Laufweite, damit die Zeichen einzeln lesbar sind.
 */
export function kennung(wert: string, erklaerung: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0 22px">
    <tr><td>
      <div style="font:600 26px/1.2 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:${BRAND};letter-spacing:.06em">${esc(wert)}</div>
      <div class="dm-soft" style="font:400 15px/1.65 ${FONT};color:${TEXT_SOFT};margin-top:12px">${erklaerung}</div>
    </td></tr></table>`;
}

/**
 * Ein Satz, der herausstechen soll, aber keine Zahl ist — der naechste
 * offene Schritt etwa, oder der Bonus zur Bestellung.
 *
 * Groesser als Fliesstext und in Markenfarbe, aber ohne Flaeche: Eine
 * ganze Zeile in 30px waere im Postfach ein Schrei, kein Hinweis.
 */
export function betonung(titel: string, erklaerung: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0 22px">
    <tr><td>
      <div style="font:700 19px/1.35 ${FONT};color:${BRAND}">${esc(titel)}</div>
      <div class="dm-soft" style="font:400 15px/1.65 ${FONT};color:${TEXT_SOFT};margin-top:9px">${erklaerung}</div>
    </td></tr></table>`;
}

/** Nummerierte Schrittliste. */
export function steps(items: Array<[string, string]>): string {
  const rows = items.map(([t, d], i) =>
    `<tr>
      <td style="padding:0 14px 18px 0;vertical-align:top;width:34px">
        <div style="width:28px;height:28px;border-radius:50%;background:${BRAND};color:${BRANDING.onBrand};font:700 14px/28px ${FONT};text-align:center">${i + 1}</div>
      </td>
      <td style="padding:0 0 18px;vertical-align:top">
        <div class="dm-text" style="font:600 15px/1.4 ${FONT};color:${TEXT}">${esc(t)}</div>
        <div class="dm-soft" style="font:400 14px/1.6 ${FONT};color:${TEXT_SOFT};margin-top:3px">${d}</div>
      </td></tr>`).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>`;
}

/** Hakenliste — kuerzer als steps(), fuer Leistungsumfang statt Ablauf. */
export function bullets(items: string[]): string {
  const rows = items.map((t) =>
    `<tr>
      <td style="padding:0 10px 10px 0;vertical-align:top;width:20px">
        <span style="font:700 15px/1.6 ${FONT};color:${BRAND}">✓</span>
      </td>
      <td class="dm-soft" style="padding:0 0 10px;font:400 15px/1.6 ${FONT};color:${TEXT_SOFT}">${t}</td>
    </tr>`).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0">${rows}</table>`;
}

/**
 * Der Blickfang am Kopf der Mail — eine Flaeche, die die Botschaft traegt.
 *
 * ABGESCHAUT, NICHT ABGESCHRIEBEN. Wer sich ansieht, was performende
 * Haendler verschicken (Crocs, H&M, Lidl), findet dort oben immer ein
 * grossformatiges Bild mit EINER Aussage darin — bei Crocs die "50 %" in
 * rund 90px auf roter Flaeche. Die Mail ist damit auf dem Telefon schon
 * verstanden, bevor ein Wort gelesen wurde.
 *
 * Hier entsteht dasselbe aus HTML statt aus einer Bilddatei, und das ist
 * kein Notbehelf, sondern der bessere Weg: Viele Clients laden Bilder
 * erst nach Freigabe. Wer seine Aussage in ein JPEG legt, zeigt genau den
 * Erstlesern eine leere Flaeche, auf die es ankommt. Eine Flaeche aus
 * Hintergrundfarbe und Text wird IMMER angezeigt.
 *
 * `gross` traegt die eine Aussage und ist absichtlich knapp — zwei bis
 * vier Zeichen bei einer Zahl, hoechstens drei Woerter bei Text. Was
 * laenger ist, gehoert in `unten`.
 */
export function hero(o: {
  klein?: string;
  gross: string;
  unten?: string;
  /** Dunkle Flaeche statt Markenfarbe — fuer ruhigere Anlaesse. */
  ruhig?: boolean;
}): string {
  const grund = o.ruhig ? INK : BRAND;
  const auf = o.ruhig ? BRANDING.onInk : BRANDING.onBrand;
  const leise = o.ruhig ? BRANDING.inkSub : "rgba(255,255,255,.72)";
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${grund}">
    <tr><td align="center" style="padding:44px 28px 46px">
      ${o.klein ? `<div style="font:600 13px/1.3 ${FONT};color:${leise};letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px">${esc(o.klein)}</div>` : ""}
      <div style="font:800 54px/1.02 ${FONT};color:${auf};letter-spacing:-.03em">${esc(o.gross)}</div>
      ${o.unten ? `<div style="font:500 17px/1.4 ${FONT};color:${leise};margin-top:14px;max-width:420px">${esc(o.unten)}</div>` : ""}
    </td></tr></table>`;
}

/**
 * Die Ueberschrift unter dem Hero — der erste Satz, den man liest.
 *
 * 30px und linksbuendig, weil genau das bei den Vorbildern steht: Crocs
 * setzt "Deine Favoriten im Mega-Sale" in rund 32px links, nicht
 * zentriert. Zentrierte Fliesstext-Ueberschriften wirken wie eine
 * Einladungskarte, nicht wie eine Nachricht.
 *
 * `unter` ist die graue Zweitzeile — das Muster, mit dem SaaS-Newsletter
 * arbeiten (Mobbin: Aussage schwarz, Praezisierung grau darunter). Sie
 * nimmt der Ueberschrift die Pflicht, alles unterzubringen.
 */
export function aufmacher(titel: string, unter?: string): string {
  return `<div class="dm-text" style="font:700 30px/1.2 ${FONT};color:${TEXT};letter-spacing:-.02em;margin:0 0 ${unter ? "8" : "16"}px">${esc(titel)}</div>
  ${unter ? `<div class="dm-soft" style="font:400 17px/1.45 ${FONT};color:${TEXT_SOFT};margin-bottom:16px">${esc(unter)}</div>` : ""}`;
}

export interface ProductCard {
  name: string;
  href: string;
  image?: string;
  /** Aktueller Bruttopreis in Cent. */
  priceCents: number;
  /** Frueherer Preis in Cent — NUR setzen, wenn er wirklich verlangt wurde. */
  wasCents?: number;
  note?: string;
  cta?: string;
}

/**
 * Produktkarte im Anker-Muster: Bild, Name, Preis, gerechnete Ersparnis.
 *
 * `wasCents` erzeugt einen durchgestrichenen Preis und ein Ersparnis-Abzeichen.
 * Der Betrag wird hier **gerechnet**, nie uebergeben — ein von Hand
 * geschriebenes "50 % sparen" neben zwei Preisen, die etwas anderes
 * hergeben, ist genau der Widerspruch, der teuer wird. Wer keinen echten
 * frueheren Preis hat, laesst das Feld weg und bekommt keine Ersparnis.
 */
export function productCard(p: ProductCard): string {
  const save = p.wasCents && p.wasCents > p.priceCents
    ? p.wasCents - p.priceCents
    : 0;
  const pct = save ? Math.round((save / (p.wasCents as number)) * 100) : 0;

  const img = p.image
    ? `<tr><td style="padding:0 0 16px">
         <a href="${p.href}"><img src="${p.image}" width="536" alt="${esc(p.name)}"
            style="display:block;width:100%;max-width:536px;height:auto;border-radius:10px;border:0"></a>
       </td></tr>`
    : "";

  const preis = save
    ? `<span class="dm-text" style="font:700 20px/1.2 ${FONT};color:${TEXT}">${eur(p.priceCents)}</span>
       <span class="dm-mut" style="font:400 15px/1.2 ${FONT};color:${TEXT_MUT};text-decoration:line-through;margin-left:8px">${eur(p.wasCents as number)}</span>
       <span style="display:inline-block;background:${BRAND_SOFT};color:${BRAND};font:700 12px/1 ${FONT};padding:5px 8px;border-radius:5px;margin-left:8px">${eur(save)} gespart · ${pct} %</span>`
    : `<span class="dm-text" style="font:700 20px/1.2 ${FONT};color:${TEXT}">${eur(p.priceCents)}</span>`;

  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:22px 0">
    <tr><td class="dm-card" style="border:1px solid ${LINE};border-radius:12px;padding:18px">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${img}
        <tr><td>
          <div class="dm-text" style="font:600 17px/1.35 ${FONT};color:${TEXT}">${esc(p.name)}</div>
          <div style="margin-top:8px">${preis}</div>
          ${p.note ? `<div class="dm-soft" style="font:400 14px/1.6 ${FONT};color:${TEXT_SOFT};margin-top:8px">${p.note}</div>` : ""}
        </td></tr>
        <tr><td>${button(p.href, p.cta ?? "Ansehen")}</td></tr>
      </table>
    </td></tr></table>`;
}

/**
 * Die Zusagen, die den Kauf absichern — als lesbarer Satz.
 *
 * Vorher standen sie als drei graue Mini-Spalten unter dem Knopf. Das
 * sah aufgeraeumt aus und wurde nicht gelesen: 12-Punkt-Grau in drei
 * Spalten ist die Form, in der auch Kleingedrucktes steht, und genau so
 * wird es ueberflogen.
 *
 * Als ein Satz in normaler Lesegroesse tragen dieselben Angaben
 * tatsaechlich zur Entscheidung bei — Rueckgaberecht und Versandkosten
 * sind der haeufigste Grund, einen Kauf doch noch abzubrechen.
 *
 * Erfindet nichts: Was hier steht, muss auf der Website an derselben
 * Stelle nachlesbar sein. Keine Sterne, keine Kundenzahl, kein Siegel.
 */
export function zusagen(items: string[]): string {
  if (!items.length) return "";
  const satz = items.length > 1
    ? `${items.slice(0, -1).join(", ")} und ${items[items.length - 1]}`
    : items[0];
  return `<div class="dm-soft" style="font:400 15px/1.65 ${FONT};color:${TEXT_SOFT};margin-top:18px">${satz}.</div>`;
}

/** Zeile mit Betrag rechts — Bestelluebersichten und Preisaufstellungen. */
export function priceRows(
  rows: Array<[string, string]>,
  total?: [string, string],
): string {
  const body = rows.map(([l, r]) =>
    `<tr>
      <td class="dm-soft" style="padding:9px 0;border-bottom:1px solid ${LINE};font:400 15px/1.5 ${FONT};color:${TEXT_SOFT}">${l}</td>
      <td class="dm-soft" style="padding:9px 0;border-bottom:1px solid ${LINE};font:400 15px/1.5 ${FONT};color:${TEXT_SOFT};text-align:right;white-space:nowrap">${r}</td>
    </tr>`).join("");
  const sum = total
    ? `<tr>
        <td class="dm-text" style="padding:13px 0;font:700 16px/1.4 ${FONT};color:${TEXT}">${total[0]}</td>
        <td class="dm-text" style="padding:13px 0;font:700 16px/1.4 ${FONT};color:${TEXT};text-align:right;white-space:nowrap">${total[1]}</td>
      </tr>`
    : "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:18px 0">${body}${sum}</table>`;
}

// -------------------------------------------------------------------
// Rahmen
// -------------------------------------------------------------------

export interface MailOptions {
  preheader: string;
  /**
   * Die Anrede. Optional geworden: Wo ein Hero die Mail eroeffnet, ist
   * "Hallo," davor eine verschenkte Zeile — die Vorbilder steigen mit der
   * Botschaft ein, nicht mit der Begruessung.
   */
  greeting?: string;
  /** Fertiger Hero-Block aus hero(). Steht vor allem anderen. */
  heroBlock?: string;
  blocks: string[];
  baseUrl?: string;
  footerNote?: string;
  /**
   * MUSS zur Mail passen. "weil du ein Konto hast" ist bei einer
   * Warenkorb-Abbruch-Mail falsch: wer abgebrochen hat, hat pay-first
   * bedingt noch gar keins.
   */
  footerReason?: string;
  /** Ein-Klick-Abmeldung (RFC 8058). Gmail und Yahoo verlangen den
   *  zugehoerigen Header seit 02/2024 bei Massenversand. */
  unsubscribeUrl?: string;
}

export function renderMail(o: MailOptions): string {
  const url = (o.baseUrl ?? BRANDING.url).replace(/\/+$/, "");
  const reason = o.footerReason ?? BRANDING.defaultReason;
  const extra = o.footerNote
    ? `<div class="dm-mut" style="font:400 13px/1.6 ${FONT};color:${TEXT_MUT};margin-top:22px">${o.footerNote}</div>`
    : "";
  const unsub = o.unsubscribeUrl
    ? ` · <a href="${o.unsubscribeUrl}" style="color:${TEXT_MUT}">Abmelden</a>`
    : "";
  // Die Zusagen-Leiste ueber dem Logo. Bei Crocs, H&M und Lidl steht dort
  // die staerkste Zusage, noch vor der Marke — sie ist das Erste, was ein
  // Kunde sieht, und beantwortet die Frage, die ihn vom Kauf abhaelt.
  // Nur Shops haben eine; bei den SaaS-Marken gibt es nichts zu versenden.
  const utility = BRANDING.utilityBar
    ? `<tr><td align="center" style="background:${INK};padding:11px 20px">
        <div style="font:700 12px/1.3 ${FONT};color:${BRANDING.onInk};letter-spacing:.09em;text-transform:uppercase">${esc(BRANDING.utilityBar)}</div>
      </td></tr>`
    : "";
  const schmal = !BRANDING.utilityBar;

  // Kategorie-Navigation im Fuss — bei den Haendler-Vorbildern steht sie
  // ausnahmslos dort: Wer die Mail geoeffnet hat, aber das Angebot nicht
  // will, soll trotzdem einen Weg in den Shop finden statt zu schliessen.
  const nav = BRANDING.navigation?.length
    ? `<tr><td align="center" style="padding:22px 24px 20px;border-top:1px solid ${LINE}">
        ${BRANDING.navigation.map((n) =>
          `<a href="${url}${n.pfad}" style="display:inline-block;margin:0 10px 6px;font:600 13px/1.4 ${FONT};color:${TEXT_SOFT};text-decoration:none">${esc(n.titel)}</a>`
        ).join("")}
      </td></tr>`
    : "";

  const legal = BRANDING.legalNote
    ? `<br><span style="color:#a3aabd">${BRANDING.legalNote}</span>`
    : "";

  return `<!doctype html>
<html lang="de"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${BRANDING.name}</title>
<style>
  /* Dunkelmodus. Ohne diesen Block invertieren Apple Mail und Outlook die
     Flaechen selbst und rendern dunklen Text auf dunklem Grund — der
     Gesamtbetrag der Bestellbestaetigung war dabei unlesbar. */
  @media (prefers-color-scheme: dark) {
    body, .dm-bg { background:#0f1115 !important; }
    .dm-card, .dm-sheet { background:#171a21 !important; border-color:#2a2f3a !important; }
    .dm-text { color:#f3f5f9 !important; }
    .dm-soft { color:#c3c9d6 !important; }
    .dm-mut  { color:#8e96a8 !important; }
    .dm-line { background:#2a2f3a !important; }
    .dm-soft-bg { background:#1b2030 !important; border-color:#2f3a52 !important; }
    .dm-foot { background:#12151b !important; border-color:#2a2f3a !important; }
  }
</style>
</head>
<body class="dm-bg" style="margin:0;background:${BG};padding:24px 12px">
<!-- Vorschautext: erscheint im Postfach neben dem Betreff, nicht in der Mail. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0">
  ${esc(o.preheader)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-sheet"
       style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 14px rgba(15,23,42,.07)">

  ${utility}

  <tr><td class="dm-sheet" style="background:#ffffff;padding:${schmal ? "26px 28px 22px" : "28px 28px 24px"};text-align:${BRANDING.logoMitte ? "center" : "left"}">
    <div style="font:800 26px/1 ${FONT};color:${BRAND};letter-spacing:-.02em">${BRANDING.name}</div>
  </td></tr>

  ${o.heroBlock ?? ""}

  <tr><td style="padding:${o.heroBlock ? "32px 28px 30px" : "6px 28px 30px"}">
    ${o.greeting ? `<div class="dm-text" style="font:600 19px/1.35 ${FONT};color:${TEXT};margin-bottom:2px">${esc(o.greeting)}</div>` : ""}
    ${o.blocks.join("")}
    ${extra}
  </td></tr>

  ${nav}

  <tr><td class="dm-foot" style="background:#f8fafc;padding:18px 28px;border-top:1px solid ${LINE}">
    <div class="dm-mut" style="font:400 12px/1.6 ${FONT};color:${TEXT_MUT}">
      ${BRANDING.imprint}<br>
      <a href="${url}/impressum" style="color:${TEXT_MUT}">Impressum</a> ·
      <a href="${url}/datenschutz" style="color:${TEXT_MUT}">Datenschutz</a> ·
      <a href="${url}/agb" style="color:${TEXT_MUT}">AGB</a>${unsub}<br>
      <span style="color:#a3aabd">${esc(reason)} Antworte einfach, wenn du etwas brauchst.</span>${legal}
    </div>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

/** Jede Kampagne liefert beides. `text` ist Pflicht, nicht optional. */
export interface Built {
  subject: string;
  text: string;
  html: string;
}

/**
 * Baut die Textfassung aus denselben Angaben, aus denen die HTML-Mail
 * gebaut wird. Von Hand gepflegte Textfassungen driften -- in GruenderX
 * nannte die Textfassung der Warenkorbmail bereits einen anderen Preis
 * als das HTML daneben.
 */
export function plain(parts: {
  greeting: string;
  lines: string[];
  cta?: [string, string];
  unsubscribeUrl?: string;
  reason?: string;
}): string {
  const out = [parts.greeting, ""];
  out.push(...parts.lines);
  if (parts.cta) {
    out.push("", `${parts.cta[0]}:`, parts.cta[1]);
  }
  out.push("", "Fragen? Antworte einfach auf diese Mail.", "");
  out.push("Viele Gruesse", `${BRANDING.signature}`);
  if (parts.reason || parts.unsubscribeUrl) {
    out.push("", "--");
    if (parts.reason) out.push(parts.reason);
    if (parts.unsubscribeUrl) out.push(`Abmelden: ${parts.unsubscribeUrl}`);
  }
  return out.join("\n");
}
