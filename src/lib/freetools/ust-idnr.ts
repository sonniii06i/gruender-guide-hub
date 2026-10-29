import { BadgeCheck } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER } from "./types";

// USt-IdNr beantragen (29.10.2026): Bedarfs-Check, richtiger Antragsweg und
// Prüfziffer-Check für USt-IdNrn aus DE/FR/IT/ES.
// Belege (abgerufen 29.10.2026):
// - § 27a Abs. 1 UStG: BZSt erteilt auf Antrag; Antrag mit Name, Anschrift, Steuernummer.
// - BZSt „Vergabe und Erteilung der USt-IdNr.“: online (Formular-Management-System), über den
//   Fragebogen zur steuerlichen Erfassung oder schriftlich an BZSt, Dienstsitz Saarlouis, 66738 Saarlouis;
//   Mitteilung ausschließlich per Post; erst nach umsatzsteuerlicher Erfassung durch das Finanzamt;
//   bei Organschaft nur der Organträger.
// - BZSt-FAQ: kostenlos, nur das BZSt vergibt; Bestätigungsabfrage gebührenfrei.
// - BZSt-Merkblatt „Aufbau der USt-IdNr. in den EU-Mitgliedstaaten“: DE neun Ziffern; FR elf Stellen,
//   1./2. Stelle ggf. Buchstabe; IT elf Ziffern; ES neun Stellen, erste und/oder letzte ggf. Buchstabe.
// - Prüfziffern (DE: ISO 7064 MOD 11,10; FR: Schlüssel = (12 + 3 × (SIREN mod 97)) mod 97;
//   IT: Luhn über die ersten zehn Ziffern) gegen VIES (EU-Kommission) am 29.10.2026 geprüft,
//   Testfälle in src/test/ust-idnr.test.ts. ES: nur Format, keine Prüfziffer.
// - § 6a Abs. 1 Nr. 4, § 13b Abs. 5 Satz 10, § 14a, § 18a Abs. 4, § 14 Abs. 4 Satz 1 Nr. 2, § 19, § 19a UStG; § 5 Abs. 1 Nr. 6 DDG.
export const UST_IDNR_STAND = "29.10.2026";

export const BZST_ANTRAG = "https://www.formulare-bfinv.de/ffw/action/invoke.do?id=ustid";
export const BZST_VERGABE =
  "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/Vergabe_USt_IdNr/vergabe_ust_idnr_node.html";
export const BZST_FAQ =
  "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/FAQ/faq_ust_node.html";
export const BZST_AUFBAU =
  "https://www.bzst.de/SharedDocs/Downloads/DE/Merkblaetter/ust_idnr_aufbau.pdf?__blob=publicationFile&v=8";
export const BZST_EVATR = "https://www.bzst.de/evatr";
export const VIES = "https://ec.europa.eu/taxation_customs/vies/";

export type UstLand = "DE" | "FR" | "IT" | "ES";

export interface UstPruefung {
  eingabe: string;
  land: UstLand | null;
  /** Länge und Zeichen passen zum Merkblatt des BZSt. */
  formatOk: boolean;
  /** ok = Prüfziffer passt, falsch = sicher Tippfehler, offen = nicht rechenbar (ES, FR mit Buchstaben). */
  pruefziffer: "ok" | "falsch" | "offen";
  text: string;
}

const FORMAT: Record<UstLand, { re: RegExp; beschreibung: string }> = {
  DE: { re: /^\d{9}$/, beschreibung: "DE + neun Ziffern" },
  FR: { re: /^[0-9A-HJ-NP-Z]{2}\d{9}$/, beschreibung: "FR + zwei Zeichen (Ziffern oder Buchstaben) + neun Ziffern (SIREN)" },
  IT: { re: /^\d{11}$/, beschreibung: "IT + elf Ziffern" },
  ES: { re: /^[0-9A-Z]\d{7}[0-9A-Z]$/, beschreibung: "ES + neun Stellen, erste und/oder letzte Stelle ggf. ein Buchstabe" },
};

/** DE: ISO/IEC 7064, MOD 11,10 über die ersten acht Ziffern. */
export function pruefzifferDE(n: string): boolean {
  let p = 10;
  for (const c of n.slice(0, 8)) {
    const sum = (Number(c) + p) % 10 || 10;
    p = (2 * sum) % 11;
  }
  return (11 - p) % 10 === Number(n[8]);
}

/** FR (numerischer Schlüssel): Schlüssel = (12 + 3 × (SIREN mod 97)) mod 97. */
export function pruefzifferFR(n: string): boolean {
  const key = Number(n.slice(0, 2));
  const siren = Number(n.slice(2));
  return key === (12 + 3 * (siren % 97)) % 97;
}

/** IT: Luhn über die ersten zehn Ziffern, elfte Ziffer = Prüfziffer. */
export function pruefzifferIT(n: string): boolean {
  let t = 0;
  for (let i = 0; i < 10; i++) {
    let d = Number(n[i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    t += d;
  }
  return (10 - (t % 10)) % 10 === Number(n[10]);
}

export function pruefeUstIdNr(raw: string): UstPruefung {
  const eingabe = raw.trim();
  const z = eingabe.toUpperCase().replace(/[\s.\-/]/g, "");
  const land = (["DE", "FR", "IT", "ES"] as UstLand[]).find((l) => z.startsWith(l)) ?? null;
  if (!land) {
    return {
      eingabe, land: null, formatOk: false, pruefziffer: "offen",
      text: "Kein Ländercode DE, FR, IT oder ES am Anfang. Jede USt-IdNr beginnt mit dem Ländercode (z. B. DE123456789).",
    };
  }
  const n = z.slice(2);
  const f = FORMAT[land];
  if (!f.re.test(n)) {
    return { eingabe, land, formatOk: false, pruefziffer: "offen", text: `Format passt nicht. Erwartet: ${f.beschreibung}.` };
  }
  let pz: UstPruefung["pruefziffer"] = "offen";
  if (land === "DE") pz = pruefzifferDE(n) ? "ok" : "falsch";
  else if (land === "IT") pz = pruefzifferIT(n) ? "ok" : "falsch";
  else if (land === "FR" && /^\d{2}/.test(n)) pz = pruefzifferFR(n) ? "ok" : "falsch";

  const verbindlich = "Ob die Nummer vergeben und gültig ist, sagt nur die Bestätigungsabfrage beim BZSt (eVatR) oder in VIES.";
  const text =
    pz === "ok"
      ? `Format und Prüfziffer passen (${f.beschreibung}). ${verbindlich}`
      : pz === "falsch"
        ? `Format passt, aber die Prüfziffer stimmt nicht – fast sicher ein Tippfehler. Nummer beim Geschäftspartner erneut erfragen.`
        : `Format passt (${f.beschreibung}). Eine Prüfziffer lässt sich hier nicht offline rechnen. ${verbindlich}`;
  return { eingabe, land, formatOk: true, pruefziffer: pz, text };
}

export interface UstBedarf {
  noetig: boolean;
  gruende: string[];
}

/** Brauche ich eine USt-IdNr? Gründe jeweils mit Norm. */
export function ustIdBedarf(d: ToolData): UstBedarf {
  const g: string[] = [];
  if (b(d, "g_lieferung_eu")) {
    g.push("Du lieferst Waren an Unternehmen im EU-Ausland: Steuerfrei ist das nur mit gültiger USt-IdNr des Kunden, und du gibst deine eigene auf der Rechnung an (§ 6a Abs. 1 Nr. 4, § 14a Abs. 3 UStG).");
  }
  if (b(d, "g_leistung_eu")) {
    g.push("Du erbringst Dienstleistungen an Unternehmen im EU-Ausland: Auf die Rechnung gehören deine und die USt-IdNr des Kunden (§ 14a Abs. 1 UStG).");
  }
  if (b(d, "g_einkauf_leistung")) {
    g.push("Du kaufst Dienstleistungen bei Anbietern aus dem EU-Ausland ein (z. B. Werbeanzeigen, Software): Die Steuer schuldest du selbst (Reverse Charge, § 13b UStG) – auch als Kleinunternehmer (§ 13b Abs. 5 Satz 10 UStG). Die Anbieter fragen für die Netto-Rechnung in der Regel nach deiner USt-IdNr.");
  }
  if (b(d, "g_einkauf_ware")) {
    g.push("Du kaufst Waren bei Unternehmen im EU-Ausland ein: Mit deiner USt-IdNr bekommst du eine Netto-Rechnung und versteuerst den Erwerb in Deutschland.");
  }
  if (b(d, "g_plattform")) {
    g.push("Eine Plattform oder ein Marktplatz verlangt die USt-IdNr bei der Registrierung (z. B. TikTok Shop bei e.K. und GbR). Antragsberechtigt bist du als Unternehmer (§ 2 UStG).");
  }
  return { noetig: g.length > 0, gruende: g };
}

function generate(d: ToolData): string {
  const stand = s(d, "stand", "neu"); // neu | stnr | erhalten
  const form = s(d, "form", "eu"); // eu | gbr | kapital | organschaft
  const ku = s(d, "ku") === "ja";
  const bedarf = ustIdBedarf(d);
  const pruefen = s(d, "pruefen");

  const L: string[] = [];
  L.push("Dein USt-IdNr-Fahrplan");
  L.push(`Stand der Regeln: ${UST_IDNR_STAND}`);
  L.push("");

  L.push("1. Brauchst du eine USt-IdNr?");
  if (bedarf.noetig) {
    L.push("Ja, nach deinen Angaben brauchst du sie:");
    for (const g of bedarf.gruende) L.push(`- ${g}`);
  } else {
    L.push("Nach deinen Angaben aktuell nicht zwingend: Du hast keine Geschäfte mit Unternehmen im EU-Ausland angegeben. Für Rechnungen im Inland reicht die Steuernummer.");
    L.push("Du darfst sie trotzdem beantragen (§ 27a Abs. 1 UStG: jeder Unternehmer). Vorteil: Auf Rechnungen darfst du statt der Steuernummer die USt-IdNr angeben (§ 14 Abs. 4 Satz 1 Nr. 2 UStG) – dann gehört sie aber auch ins Impressum (§ 5 Abs. 1 Nr. 6 DDG).");
  }
  if (ku) {
    L.push("");
    L.push("Als Kleinunternehmer (§ 19 UStG: Vorjahr höchstens 25.000 €, laufendes Jahr höchstens 100.000 € Umsatz):");
    L.push("- Eine USt-IdNr ändert nichts an deinem Kleinunternehmer-Status. Du stellst weiter Rechnungen ohne Umsatzsteuer.");
    L.push("- Zusammenfassende Meldungen musst du nicht abgeben (§ 18a Abs. 4 UStG).");
    if (b(d, "g_einkauf_leistung")) {
      L.push("- Achtung Reverse Charge: Für eingekaufte EU-Dienstleistungen (z. B. Meta- oder Google-Werbung aus Irland) schuldest du die deutsche Umsatzsteuer selbst, meldest sie in der Umsatzsteuer-Voranmeldung und zahlst sie – ohne Vorsteuerabzug.");
    }
    L.push("- Kleinunternehmer-Befreiung in anderen EU-Ländern nutzen ist ein eigenes Verfahren mit eigener Kleinunternehmer-Identifikationsnummer beim BZSt (§ 19a UStG, EU-weit höchstens 100.000 € Umsatz) – das ist nicht die USt-IdNr.");
  }
  L.push("");

  L.push("2. Dein Antragsweg");
  if (form === "organschaft") {
    L.push("Bei einer umsatzsteuerlichen Organschaft beantragt nur der Organträger die USt-IdNr (BZSt).");
  }
  if (stand === "neu") {
    L.push("[ ] Du hast noch keine Steuernummer: Kreuze im Fragebogen zur steuerlichen Erfassung (ELSTER) das Feld zur USt-IdNr an. Das Finanzamt leitet den Antrag automatisch an das BZSt weiter – kein zweiter Antrag nötig.");
    L.push("[ ] Fragebogen innerhalb eines Monats nach Beginn der Tätigkeit abgeben (§ 138 Abs. 1b, Abs. 4 AO).");
    L.push("[ ] Rechne mit einigen Wochen: Erst erfasst dich das Finanzamt, dann übermittelt es die Daten ans BZSt.");
  } else if (stand === "stnr") {
    L.push("[ ] Du hast schon eine Steuernummer: Beantrage online beim BZSt über das Formular „Umsatzsteuer-Identifikationsnummer“:");
    L.push(`    ${BZST_ANTRAG}`);
    L.push("[ ] Bereithalten: zuständiges Finanzamt, Steuernummer, Rechtsform und – je nach Rechtsform – Name und Geburtsdatum bzw. Firmenname und Sitz.");
    L.push("[ ] Die Angaben werden automatisch mit den Daten des Finanzamts abgeglichen. Direkt nach dem Absenden siehst du den Stand der Bearbeitung.");
    L.push("[ ] Alternativ schriftlich: Bundeszentralamt für Steuern, Dienstsitz Saarlouis, 66738 Saarlouis – mit Name, Anschrift, Finanzamt und Steuernummer (§ 27a Abs. 1 UStG).");
  } else {
    L.push("[x] Du hast deine USt-IdNr schon. Bei Verlust: gleiches Online-Formular – du bekommst per Post eine Kopie des Bescheids, die Nummer bleibt bestehen.");
    L.push("[ ] Adresse oder Name geändert? Nur über dein Finanzamt ändern lassen.");
  }
  L.push("[ ] Die Nummer kommt ausschließlich per Post. Per E-Mail oder Telefon teilt das BZSt sie nicht mit.");
  L.push("[ ] Kostenlos: Nur das BZSt vergibt USt-IdNrn. Zahle nie an Firmen, die dir eine Nummer „gegen Gebühr“ anbieten.");
  L.push("");

  L.push("3. Danach erledigen");
  L.push("[ ] Ins Impressum aufnehmen (§ 5 Abs. 1 Nr. 6 DDG) – Vorlage: /vorlagen/impressum-muster");
  L.push("[ ] Auf Rechnungen an EU-Unternehmen: deine und die USt-IdNr des Kunden angeben (§ 14a UStG) – Generator: /tools/rechnungs-generator");
  if (!ku && (b(d, "g_lieferung_eu") || b(d, "g_leistung_eu"))) {
    L.push("[ ] Zusammenfassende Meldung beim BZSt bis zum 25. Tag nach Monats- bzw. Quartalsende (§ 18a UStG; quartalsweise nur bis 50.000 € Lieferungen je Quartal).");
  }
  L.push("[ ] Vor jeder steuerfreien EU-Rechnung die USt-IdNr des Kunden bestätigen lassen (BZSt eVatR oder VIES) und das Ergebnis aufheben.");
  if (form === "gbr" || form === "kapital") {
    L.push("[ ] Bei Gesellschaften: Die USt-IdNr gehört der Gesellschaft, nicht den Gesellschaftern.");
  }
  L.push("");

  if (pruefen) {
    const p = pruefeUstIdNr(pruefen);
    L.push("4. Prüfung der eingegebenen USt-IdNr");
    L.push(`Eingabe: ${p.eingabe}`);
    L.push(p.text);
    L.push(`Verbindlich prüfen: ${BZST_EVATR} oder ${VIES}`);
    L.push("");
  }

  L.push(`Quellen (Stand ${UST_IDNR_STAND}): § 27a UStG; BZSt Vergabe der USt-IdNr (${BZST_VERGABE}); BZSt FAQ (${BZST_FAQ}); BZSt-Merkblatt Aufbau (${BZST_AUFBAU}).`);
  L.push("");
  L.push(DISCLAIMER);
  return L.join("\n");
}

export const ustIdNrConfig: ToolConfig = {
  slug: "ust-id-beantragen",
  shortTitle: "USt-ID beantragen",
  documentName: "USt-IdNr-Fahrplan",
  icon: BadgeCheck,
  accent: "from-slate-800 to-blue-600",
  badge: "Kostenlos beim BZSt · Stand 29.10.2026",
  heroTitle: "USt-ID beantragen: Schritt für Schritt + Prüf-Tool",
  heroSubtitle:
    "Finde in 2 Minuten heraus, ob du eine Umsatzsteuer-Identifikationsnummer brauchst, welcher Antragsweg für dich gilt (Fragebogen, BZSt-Online-Formular oder Brief) und was danach zu tun ist. Dazu prüfst du USt-IdNrn aus Deutschland, Frankreich, Italien und Spanien auf Format und Prüfziffer.",
  resultFilename: "ust-idnr-fahrplan",
  format: "anleitung",
  steps: [
    {
      title: "Dein Stand",
      fields: [
        {
          name: "stand",
          label: "Wo stehst du gerade?",
          type: "radio",
          required: true,
          options: [
            { value: "neu", label: "Ich gründe gerade, habe noch keine Steuernummer" },
            { value: "stnr", label: "Ich habe eine Steuernummer, aber keine USt-IdNr" },
            { value: "erhalten", label: "Ich habe schon eine USt-IdNr (verloren / Änderung)" },
          ],
        },
        {
          name: "form",
          label: "Rechtsform",
          type: "radio",
          required: true,
          options: [
            { value: "eu", label: "Einzelunternehmen / Freiberufler" },
            { value: "gbr", label: "GbR, OHG oder KG" },
            { value: "kapital", label: "UG oder GmbH" },
            { value: "organschaft", label: "Teil einer umsatzsteuerlichen Organschaft" },
          ],
        },
        {
          name: "ku",
          label: "Nutzt du die Kleinunternehmerregelung (§ 19 UStG)?",
          type: "radio",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein" },
          ],
        },
      ],
    },
    {
      title: "Deine Geschäfte mit dem EU-Ausland",
      subtitle: "Alles ankreuzen, was zutrifft (auch geplant).",
      fields: [
        { name: "g_lieferung_eu", label: "Ich verkaufe Waren an Unternehmen in anderen EU-Ländern", type: "checkbox" },
        { name: "g_leistung_eu", label: "Ich erbringe Dienstleistungen für Unternehmen in anderen EU-Ländern", type: "checkbox" },
        { name: "g_einkauf_leistung", label: "Ich kaufe Dienstleistungen aus dem EU-Ausland ein (z. B. Meta-/Google-Werbung, Software)", type: "checkbox" },
        { name: "g_einkauf_ware", label: "Ich kaufe Waren bei Unternehmen im EU-Ausland ein", type: "checkbox" },
        { name: "g_plattform", label: "Eine Plattform verlangt eine USt-IdNr von mir", type: "checkbox" },
      ],
    },
    {
      title: "USt-IdNr prüfen (optional)",
      subtitle: "Format und Prüfziffer für DE, FR, IT, ES – z. B. die Nummer eines Kunden.",
      fields: [
        {
          name: "pruefen",
          label: "USt-IdNr",
          type: "text",
          placeholder: "DE123456789",
          help: "Ersetzt nicht die amtliche Bestätigung beim BZSt oder in VIES.",
        },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "USt-ID beantragen: die drei Wege im Überblick",
      body: [
        "Die Umsatzsteuer-Identifikationsnummer (USt-IdNr, oft kurz USt-ID) vergibt ausschließlich das Bundeszentralamt für Steuern (BZSt) – nicht dein Finanzamt und schon gar keine private Firma. Die Vergabe ist kostenlos. Das BZSt kann die Nummer aber erst erteilen, wenn dich dein Finanzamt umsatzsteuerlich erfasst und die Daten übermittelt hat. Deshalb hängt der richtige Weg davon ab, ob du schon eine Steuernummer hast.",
        "Weg 1 – Neugründung: Im Fragebogen zur steuerlichen Erfassung, den du über ELSTER abgibst, kreuzt du das Feld zur USt-IdNr an. Das Finanzamt leitet den Antrag automatisch ans BZSt weiter. Einen zweiten Antrag brauchst du nicht. Weg 2 – du hast schon eine Steuernummer: Dann beantragst du online über das Formular „Umsatzsteuer-Identifikationsnummer“ im Formular-Management-System des Bundes. Weg 3 – schriftlich per Brief an das Bundeszentralamt für Steuern, Dienstsitz Saarlouis, 66738 Saarlouis.",
        "Egal welcher Weg: Die Nummer kommt ausschließlich per Post. Telefonisch, per E-Mail oder per Chatbot teilt das BZSt sie aus rechtlichen Gründen nicht mit. Plane einige Wochen ein, denn zwischen dem Eingang beim Finanzamt und der Übermittlung ans BZSt vergeht Zeit. Wer im Januar an EU-Kunden liefern will, sollte den Fragebogen also nicht erst im Dezember abgeben.",
      ],
    },
    {
      heading: "Welche Angaben brauche ich für den Online-Antrag?",
      body: [
        "Laut BZSt fragt das Online-Formular nach dem zuständigen Finanzamt, der Steuernummer und der Rechtsform. Je nach Rechtsform kommen Name und Geburtsdatum (Einzelunternehmen) oder Firmenname und Sitz (Gesellschaft) dazu. Das System gleicht deine Angaben automatisch mit den Daten des Finanzamts ab und zeigt dir direkt nach dem Absenden, wie weit die automatische Bearbeitung ist. Für den schriftlichen Antrag schreibt § 27a Abs. 1 UStG Name, Anschrift und Steuernummer vor.",
        "Typischer Fehler: Die Angaben weichen vom Finanzamt ab, etwa weil die neue Geschäftsadresse dort noch nicht hinterlegt ist. Dann schlägt der Abgleich fehl. Änderungen von Name oder Anschrift laufen ausschließlich über dein Finanzamt, nicht über das BZSt.",
      ],
    },
    {
      heading: "Wer braucht eine USt-IdNr – und wer nicht?",
      body: [
        "Beantragen darf jeder Unternehmer im Sinne von § 2 UStG, also auch Freiberufler, Kleingewerbetreibende und Kleinunternehmer. Nötig ist sie, sobald du mit Unternehmen in anderen EU-Ländern Geschäfte machst: Warenlieferungen an EU-Unternehmen sind nur steuerfrei, wenn der Kunde eine gültige USt-IdNr verwendet (§ 6a Abs. 1 Nr. 4 UStG). Auf Rechnungen für Dienstleistungen an EU-Unternehmen gehören deine und die Nummer des Kunden (§ 14a UStG).",
        "Viele Gründer übersehen die Einkaufsseite: Werbung bei Meta oder Google, Software-Abos und Freelancer aus dem EU-Ausland sind Dienstleistungen, bei denen du als Empfänger die Steuer schuldest (Reverse Charge, § 13b UStG). Das gilt ausdrücklich auch für Kleinunternehmer (§ 13b Abs. 5 Satz 10 UStG). Die Anbieter fragen in der Regel nach deiner USt-IdNr, um netto abzurechnen.",
        "Kein Muss ist sie, wenn du nur im Inland verkaufst. Trotzdem hat sie einen praktischen Vorteil: Auf Rechnungen darfst du statt der Steuernummer die USt-IdNr angeben (§ 14 Abs. 4 Satz 1 Nr. 2 UStG), sodass deine Steuernummer nicht bei jedem Kunden landet. Wer eine USt-IdNr hat, muss sie allerdings im Impressum angeben (§ 5 Abs. 1 Nr. 6 DDG).",
      ],
    },
    {
      heading: "Beispiel: Kleinunternehmerin mit Instagram-Werbung",
      body: [
        "Lea verkauft handgemachten Schmuck, nutzt die Kleinunternehmerregelung und schaltet Werbung über Meta (Rechnungssteller in Irland). Ihr Fahrplan: USt-IdNr online beim BZSt beantragen, weil sie schon eine Steuernummer hat. Die Nummer im Werbekonto hinterlegen. Für jede Meta-Rechnung die deutsche Umsatzsteuer (19 %) in der Umsatzsteuer-Voranmeldung melden und zahlen – als Kleinunternehmerin ohne Vorsteuerabzug. Eine Zusammenfassende Meldung muss sie nicht abgeben (§ 18a Abs. 4 UStG). Ihre eigenen Rechnungen bleiben ohne Umsatzsteuer.",
      ],
    },
    {
      heading: "Aufbau der USt-IdNr in Deutschland, Frankreich, Italien und Spanien",
      body: [
        "Jede USt-IdNr beginnt mit dem Ländercode. Laut Merkblatt des BZSt gilt: Deutschland DE + neun Ziffern; Frankreich FR + elf Stellen, von denen die erste und/oder zweite ein Buchstabe sein kann; Italien IT + elf Ziffern; Spanien ES + neun Stellen, wobei die erste und/oder die letzte Stelle ein Buchstabe sein kann. Unser Prüf-Tool rechnet für DE, IT und numerische FR-Nummern zusätzlich die Prüfziffer nach. Getestet haben wir das an echten Nummern, die in VIES (EU-Kommission) als gültig oder ungültig bestätigt wurden. Für Spanien prüfen wir nur das Format.",
        "Wichtig: Eine passende Prüfziffer heißt nur, dass die Nummer richtig getippt sein kann. Ob sie vergeben und gültig ist, bestätigt nur die Abfrage beim BZSt (eVatR, mit Name und Anschrift als qualifizierte Bestätigung) oder in VIES. Rückwirkend für vergangene Zeitpunkte bestätigt das BZSt nicht – also vor der Rechnung prüfen und das Ergebnis aufheben.",
      ],
    },
    {
      heading: "Typische Fehler beim USt-IdNr-Antrag",
      body: [
        "1. Für die Nummer bezahlen: Schreiben, die eine USt-IdNr gegen Gebühr „registrieren“ oder „veröffentlichen“, kommen nicht vom BZSt. Die Vergabe ist kostenlos. 2. Doppelt beantragen: Wer das Feld im Fragebogen angekreuzt hat, braucht keinen zweiten Online-Antrag. 3. Zu früh beantragen: Ohne Steuernummer und umsatzsteuerliche Erfassung kann das BZSt nicht vergeben. 4. Auf eine E-Mail warten: Die Nummer kommt nur per Post. 5. Organschaft: Hier ist nur der Organträger antragsberechtigt. 6. Die EU-Kleinunternehmerregelung (§ 19a UStG) verwechseln: Die Kleinunternehmer-Identifikationsnummer ist ein eigenes Verfahren und ersetzt keine USt-IdNr.",
      ],
    },
  ],
  links: [
    { to: "/tools/fse-wizard", label: "Fragebogen zur steuerlichen Erfassung ausfüllen" },
    { to: "/tools/kleinunternehmer-waechter", label: "Kleinunternehmer-Grenze 2026 im Blick" },
    { to: "/tools/ust-rechner", label: "USt-Rechner: § 19, § 13b und OSS" },
    { to: "/tools/rechnungs-generator", label: "Rechnung mit USt-IdNr erstellen" },
    { to: "/vorlagen/impressum-muster", label: "Impressum-Vorlage nach § 5 DDG" },
    { to: "/ratgeber/oss-anmeldung", label: "OSS-Verfahren: EU-Verkäufe an Privatkunden" },
    { to: "/tools/gewerbeanmeldung-wizard", label: "Gewerbeanmeldung richtig ausfüllen" },
  ],
  quellen: [
    { label: "§ 27a UStG – Umsatzsteuer-Identifikationsnummer", url: "https://www.gesetze-im-internet.de/ustg_1980/__27a.html" },
    { label: "BZSt: Vergabe und Erteilung der USt-IdNr.", url: BZST_VERGABE },
    { label: "BZSt: FAQ zur USt-IdNr. (Kosten, Zustellung, Änderungen)", url: BZST_FAQ },
    { label: "BZSt: Online-Antrag „Umsatzsteuer-Identifikationsnummer“", url: BZST_ANTRAG },
    { label: "BZSt-Merkblatt: Aufbau der USt-IdNr. in den EU-Mitgliedstaaten (PDF)", url: BZST_AUFBAU },
    { label: "§ 13b UStG – Reverse Charge (Abs. 5 Satz 10: auch Kleinunternehmer)", url: "https://www.gesetze-im-internet.de/ustg_1980/__13b.html" },
    { label: "§ 18a UStG – Zusammenfassende Meldung (Abs. 4: nicht für § 19)", url: "https://www.gesetze-im-internet.de/ustg_1980/__18a.html" },
    { label: "§ 6a UStG – innergemeinschaftliche Lieferung", url: "https://www.gesetze-im-internet.de/ustg_1980/__6a.html" },
    { label: "§ 19a UStG – EU-Kleinunternehmerregelung", url: "https://www.gesetze-im-internet.de/ustg_1980/__19a.html" },
    { label: "§ 5 DDG – Impressumspflicht", url: "https://www.gesetze-im-internet.de/ddg/__5.html" },
    { label: "VIES – MwSt-Nummern prüfen (EU-Kommission)", url: VIES },
  ],
  stand: UST_IDNR_STAND,
  seo: {
    title: "USt-ID beantragen: kostenlos beim BZSt + Check | GründerX",
    description:
      "USt-ID beantragen 2026: Fragebogen, BZSt-Online-Formular oder Brief – welcher Weg für dich gilt, welche Angaben nötig sind, plus Prüf-Tool für DE/FR/IT/ES.",
    keywords:
      "ust id beantragen, umsatzsteuer id beantragen, ust-idnr beantragen, umsatzsteuer identifikationsnummer beantragen, ust id nummer beantragen, umsatzsteuer id beantragen online, ust id kleinunternehmer",
    faqs: [
      {
        q: "Wo kann ich eine USt-ID beantragen?",
        a: "Nur beim Bundeszentralamt für Steuern (BZSt): bei der Neugründung über das Kreuz im Fragebogen zur steuerlichen Erfassung, mit vorhandener Steuernummer über das Online-Formular „Umsatzsteuer-Identifikationsnummer“ oder schriftlich an das BZSt, Dienstsitz Saarlouis, 66738 Saarlouis.",
      },
      {
        q: "Was kostet die USt-ID?",
        a: "Nichts. Das BZSt erhebt keine Gebühren, auch die Bestätigungsabfrage ist kostenlos. Angebote, die eine USt-IdNr gegen Geld vermitteln, kommen nicht vom BZSt.",
      },
      {
        q: "Wie lange dauert es, bis ich die USt-ID bekomme?",
        a: "Das BZSt nennt keine feste Frist. Es kann erst vergeben, wenn das Finanzamt dich erfasst und die Daten übermittelt hat – das kann einige Wochen dauern. Die Nummer kommt ausschließlich per Post.",
      },
      {
        q: "Brauchen Kleinunternehmer eine USt-ID?",
        a: "Nur, wenn sie Geschäfte mit EU-Unternehmen machen – etwa Werbung bei Meta oder Google aus Irland einkaufen. Dafür schulden auch Kleinunternehmer die Umsatzsteuer selbst (§ 13b Abs. 5 Satz 10 UStG). Am Kleinunternehmer-Status ändert die Nummer nichts, und eine Zusammenfassende Meldung entfällt (§ 18a Abs. 4 UStG).",
      },
      {
        q: "Kann ich die USt-ID per Telefon oder E-Mail bekommen?",
        a: "Nein. Laut BZSt wird die USt-IdNr aus rechtlichen Gründen ausschließlich per Post mitgeteilt. Bei Verlust stellst du online einen neuen Antrag und bekommst eine Kopie des Bescheids per Post.",
      },
      {
        q: "Wie erkenne ich, ob eine USt-IdNr gültig ist?",
        a: "Unser Tool prüft Format und Prüfziffer und findet so Tippfehler. Verbindlich ist nur die Bestätigungsabfrage beim BZSt (eVatR) oder in VIES – am besten qualifiziert mit Name und Anschrift und vor der Rechnung.",
      },
    ],
  },
};
