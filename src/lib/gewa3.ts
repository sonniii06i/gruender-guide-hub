// Gewerbe-Abmeldung (GewA 3): welcher Vordruck bei welchem Anlass, Fristen und
// die Belegung der Felder im amtlichen Muster (Anlage 3 GewAnzV, BGBl. 2024 I Nr. 411).
// Reine Logik ohne React; das PDF wird erst beim Klick im Browser gefüllt.
//
// Belege (alle am 26.11.2026 live abgerufen, gesetze-im-internet.de):
// - § 14 Abs. 1 GewO: Anzeige „gleichzeitig“; Satz 2 Nr. 1 Verlegung, Nr. 2 Wechsel/Ausdehnung
//   des Gegenstands, Nr. 2a Namensänderung, Nr. 3 Aufgabe; Satz 3: Aufgabe im Zusammenhang mit
//   einer Verlegung in einen anderen Meldebezirk „ausschließlich gegenüber der für die
//   Gewerbeanmeldung nach Satz 1 zuständigen Behörde“ anzuzeigen, die die Daten weitergibt.
// - § 1 GewAnzV: Anlage 1 (Beginn; auch Aufgabe i. V. m. § 14 Abs. 1 Satz 3 GewO), Anlage 2
//   (Verlegung, Wechsel/Ausdehnung, Namensänderung), Anlage 3 (Aufgabe).
// - Landeshauptstadt München und Stadt Münster (Amtsseiten): Regel gilt seit 1. November 2025.
// - § 138 Abs. 1 und 4 AO: Mitteilung an die Gemeinde, auch für Verlegung und Aufgabe,
//   innerhalb eines Monats nach dem Ereignis; § 108 AO i. V. m. §§ 187, 188 BGB (Fristlauf).
// - § 147 Abs. 3, 4 AO: 10 Jahre Bücher/Jahresabschlüsse, 8 Jahre Buchungsbelege, 6 Jahre
//   Geschäftsbriefe; Beginn mit Schluss des Kalenderjahrs.

export const GEWA3_STAND = "26.11.2026";
export const GEWA3_PDF_PFAD = "/forms/gewa3.pdf";

export type Anlass =
  | "aufgabe"
  | "umzug_andere"
  | "umzug_gleiche"
  | "taetigkeit"
  | "name"
  | "rechtsform"
  | "austritt"
  | "uebergabe"
  | "umwandlung"
  | "pause";

export type Vordruck = "GewA 3" | "GewA 2" | "GewA 1" | "keiner";

export interface AbmeldeWeg {
  vordruck: Vordruck;
  /** Zweiter Vordruck, den derselbe Vorgang zusätzlich auslöst (z. B. Neuanmeldung in neuer Rechtsform). */
  zusaetzlich?: Vordruck;
  /** Wo die Anzeige abgegeben wird. */
  behoerde: string;
  /** Kästchen in Feld 25/26 des GewA 3 (nur wenn vordruck „GewA 3“). */
  grund?: "f25_aufgabe" | "f25_rechtsform" | "f25_umwandlung" | "f25_gesellschafter" | "f25_uebergabe";
  grundText?: string;
  norm: string;
  erklaerung: string;
}

const ANLAESSE: Anlass[] = ["aufgabe", "umzug_andere", "umzug_gleiche", "taetigkeit", "name", "rechtsform", "austritt", "uebergabe", "umwandlung", "pause"];

export function istAnlass(v: string): v is Anlass {
  return (ANLAESSE as string[]).includes(v);
}

/** Welcher Vordruck bei welchem Anlass – jede Zeile mit Norm. */
export function abmeldeWeg(anlass: Anlass): AbmeldeWeg {
  const alt = "Gewerbeamt der Gemeinde, in der die Betriebsstätte liegt";
  switch (anlass) {
    case "aufgabe":
      return {
        vordruck: "GewA 3",
        behoerde: alt,
        grund: "f25_aufgabe",
        grundText: "Vollständige Aufgabe",
        norm: "§ 14 Abs. 1 Satz 2 Nr. 3 GewO, § 1 Nr. 3 GewAnzV",
        erklaerung: "Du gibst den Betrieb auf. Dafür ist der Vordruck GewA 3 (Gewerbe-Abmeldung) vorgeschrieben.",
      };
    case "umzug_andere":
      return {
        vordruck: "GewA 1",
        behoerde: "Gewerbeamt der neuen Gemeinde",
        norm: "§ 14 Abs. 1 Satz 3 GewO, § 1 Nr. 3 GewAnzV",
        erklaerung:
          "Beim Umzug in eine andere Gemeinde brauchst du keinen GewA 3. Du meldest das Gewerbe nur bei der neuen Gemeinde an (GewA 1); sie übermittelt die Daten an die bisherige Behörde.",
      };
    case "umzug_gleiche":
      return {
        vordruck: "GewA 2",
        behoerde: alt,
        norm: "§ 14 Abs. 1 Satz 2 Nr. 1 GewO, § 1 Nr. 2 GewAnzV",
        erklaerung: "Der Betrieb zieht innerhalb derselben Gemeinde um. Das ist eine Ummeldung mit dem Vordruck GewA 2, keine Abmeldung.",
      };
    case "taetigkeit":
      return {
        vordruck: "GewA 2",
        behoerde: alt,
        norm: "§ 14 Abs. 1 Satz 2 Nr. 2 GewO, § 1 Nr. 2 GewAnzV",
        erklaerung:
          "Du wechselst die Tätigkeit oder dehnst sie auf Waren oder Leistungen aus, die bei deinem Gewerbe nicht geschäftsüblich sind. Das ist eine Ummeldung mit dem Vordruck GewA 2.",
      };
    case "name":
      return {
        vordruck: "GewA 2",
        behoerde: alt,
        norm: "§ 14 Abs. 1 Satz 2 Nr. 2a GewO, § 1 Nr. 2 GewAnzV",
        erklaerung: "Dein Name hat sich geändert (z. B. durch Heirat). Das ist eine Ummeldung mit dem Vordruck GewA 2.",
      };
    case "rechtsform":
      return {
        vordruck: "GewA 3",
        zusaetzlich: "GewA 1",
        behoerde: alt,
        grund: "f25_rechtsform",
        grundText: "Wechsel der Rechtsform",
        norm: "§ 14 Abs. 1 GewO; Feld 25/26 des GewA 3 und Feld 25 des GewA 1",
        erklaerung:
          "Beim Wechsel der Rechtsform meldest du den Betrieb in der alten Rechtsform ab (GewA 3, Grund „Wechsel der Rechtsform“) und in der neuen an (GewA 1).",
      };
    case "austritt":
      return {
        vordruck: "GewA 3",
        behoerde: alt,
        grund: "f25_gesellschafter",
        grundText: "Gesellschafteraustritt",
        norm: "§ 14 Abs. 1 GewO; Kopfzeile und Feld 25/26 des GewA 3",
        erklaerung:
          "Bei Personengesellschaften füllt jeder geschäftsführende Gesellschafter einen eigenen Vordruck aus. Wer ausscheidet, meldet sich mit dem GewA 3 und dem Grund „Gesellschafteraustritt“ ab.",
      };
    case "uebergabe":
      return {
        vordruck: "GewA 3",
        behoerde: alt,
        grund: "f25_uebergabe",
        grundText: "Übergabe (Erbfolge, Kauf, Pacht)",
        norm: "§ 14 Abs. 1 GewO; Feld 25/26 und 27 des GewA 3",
        erklaerung:
          "Du übergibst den Betrieb. Du meldest ihn mit dem GewA 3 ab (Grund „Übergabe“) und trägst in Feld 27 den Nachfolger ein; der Nachfolger meldet mit dem GewA 1 an.",
      };
    case "umwandlung":
      return {
        vordruck: "GewA 3",
        zusaetzlich: "GewA 1",
        behoerde: alt,
        grund: "f25_umwandlung",
        grundText: "Übergang nach dem Umwandlungsgesetz",
        norm: "§ 14 Abs. 1 GewO; Feld 25/26 des GewA 3 und Feld 25 des GewA 1",
        erklaerung:
          "Bei Verschmelzung oder Spaltung wird der bisherige Betrieb mit dem GewA 3 abgemeldet (Grund „Übergang nach dem Umwandlungsgesetz“). Die Anmeldung in der neuen Form läuft über den GewA 1, der in Feld 25 dasselbe Kästchen hat.",
      };
    case "pause":
      return {
        vordruck: "keiner",
        behoerde: alt,
        norm: "§ 14 Abs. 1 GewO",
        erklaerung:
          "§ 14 GewO kennt nur Beginn, Verlegung, Änderung und Aufgabe, aber keine Anzeige für eine Pause. Solange du den Betrieb nicht aufgibst, gibt es dafür keinen Vordruck. Ob deine Pause schon eine Aufgabe ist, klärst du mit deinem Gewerbeamt.",
      };
  }
}

// ── Datum und Fristen ───────────────────────────────────────────────

/** „TT.MM.JJJJ“ oder „JJJJ-MM-TT“ → Date (UTC, 12 Uhr); ungültig → null. */
export function datumLesen(v: string): Date | null {
  const t = (v || "").trim();
  let j: number, m: number, d: number;
  let treffer = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(t);
  if (treffer) [d, m, j] = [Number(treffer[1]), Number(treffer[2]), Number(treffer[3])];
  else {
    treffer = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
    if (!treffer) return null;
    [j, m, d] = [Number(treffer[1]), Number(treffer[2]), Number(treffer[3])];
  }
  const datum = new Date(Date.UTC(j, m - 1, d, 12));
  if (datum.getUTCFullYear() !== j || datum.getUTCMonth() !== m - 1 || datum.getUTCDate() !== d) return null;
  if (j < 1900 || j > 2100) return null;
  return datum;
}

export function datumText(d: Date): string {
  const z = (n: number) => String(n).padStart(2, "0");
  return `${z(d.getUTCDate())}.${z(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
}

/**
 * Monatsfrist nach einem Ereignis (§ 108 Abs. 1 AO i. V. m. § 187 Abs. 1, § 188 Abs. 2 und 3 BGB):
 * Ende am Tag des Folgemonats mit derselben Zahl; fehlt er, am letzten Tag des Monats.
 * Sonnabend/Sonntag → nächster Werktag (§ 108 Abs. 3 AO). Feiertage sind je Land verschieden
 * und werden nicht verschoben – das steht als Hinweis im Ergebnis.
 */
export function monatsfrist(ereignis: Date): Date {
  const j = ereignis.getUTCFullYear();
  const m = ereignis.getUTCMonth();
  const tag = ereignis.getUTCDate();
  const letzter = new Date(Date.UTC(j, m + 2, 0, 12)).getUTCDate();
  const ende = new Date(Date.UTC(j, m + 1, Math.min(tag, letzter), 12));
  const wt = ende.getUTCDay();
  if (wt === 6) ende.setUTCDate(ende.getUTCDate() + 2);
  if (wt === 0) ende.setUTCDate(ende.getUTCDate() + 1);
  return ende;
}

/** Frühestes Ende der Aufbewahrung für Unterlagen, die im Jahr der Aufgabe entstanden sind (§ 147 Abs. 3, 4 AO). */
export function aufbewahrungBis(aufgabe: Date): { buecher: string; belege: string; briefe: string } {
  const j = aufgabe.getUTCFullYear();
  return { buecher: `31.12.${j + 10}`, belege: `31.12.${j + 8}`, briefe: `31.12.${j + 6}` };
}

// ── Zeichen, die die PDF-Schrift (Helvetica, WinAnsi) darstellen kann ──

const WINANSI_EXTRA = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";
const ERSATZ: Record<string, string> = { ł: "l", Ł: "L", đ: "d", Đ: "D", ı: "i", İ: "I", ħ: "h", Ħ: "H", ŧ: "t", Ŧ: "T", "ẞ": "SS" };

function winAnsiZeichen(c: string): boolean {
  const code = c.charCodeAt(0);
  if (c === "\n") return true;
  if (code >= 0x20 && code <= 0x7e) return true;
  if (code >= 0xa0 && code <= 0xff) return true;
  return WINANSI_EXTRA.includes(c);
}

/**
 * Text auf den Zeichenvorrat der PDF-Schrift bringen. Unbekannte Zeichen werden auf den
 * Grundbuchstaben zurückgeführt (ş → s); was dann noch fehlt, entfällt. `geaendert` sagt,
 * ob der Nutzer das Feld von Hand nachbessern muss.
 */
export function winAnsi(text: string): { text: string; geaendert: boolean } {
  let aus = "";
  for (const c of text.replace(/\r\n?/g, "\n").replace(/\t/g, " ")) {
    if (winAnsiZeichen(c)) aus += c;
    else if (ERSATZ[c]) aus += ERSATZ[c];
    else {
      const grund = c.normalize("NFD").replace(/[̀-ͯ]/g, "");
      for (const g of grund) if (winAnsiZeichen(g)) aus += g;
    }
  }
  return { text: aus, geaendert: aus !== text.replace(/\r\n?/g, "\n").replace(/\t/g, " ") };
}

// ── Feldbelegung des GewA 3 ─────────────────────────────────────────

export type Angaben = Record<string, string | boolean>;

export interface Gewa3Belegung {
  /** Feldname im PDF → Text. */
  text: Record<string, string>;
  /** Namen der angekreuzten Kästchen. */
  kreuze: string[];
  /** Feldnummern, deren Text für das PDF vereinfacht werden musste. */
  vereinfacht: string[];
}

const str = (d: Angaben, name: string): string => {
  const v = d[name];
  return typeof v === "string" ? v.trim() : "";
};

/** Rechtsformen mit Registereintrag (Feld 1 und 2 nur dann). */
export function istEingetragen(rechtsform: string): boolean {
  return rechtsform === "ek" || rechtsform === "ohg_kg" || rechtsform === "ug_gmbh" || rechtsform === "sonstige";
}

/** Gesellschaften: Feld 12 (Zahl der geschäftsführenden Gesellschafter bzw. gesetzlichen Vertreter). */
export function istGesellschaft(rechtsform: string): boolean {
  return rechtsform === "gbr" || rechtsform === "ohg_kg" || rechtsform === "ug_gmbh" || rechtsform === "sonstige";
}

function anschrift(strasse: string, plzOrt: string): string {
  return [strasse, plzOrt].filter(Boolean).join("\n");
}

/** Angaben aus dem Wizard → Felder des amtlichen Vordrucks. Leere Angaben bleiben leer (handschriftlich nachtragen). */
export function gewa3Felder(d: Angaben): Gewa3Belegung {
  const text: Record<string, string> = {};
  const kreuze: string[] = [];
  const vereinfacht: string[] = [];
  const setze = (feld: string, nr: string, wert: string) => {
    if (!wert) return;
    const w = winAnsi(wert);
    if (w.geaendert && !vereinfacht.includes(nr)) vereinfacht.push(nr);
    if (w.text) text[feld] = w.text;
  };

  const rechtsform = str(d, "rechtsform") || "einzel";
  const anlassRoh = str(d, "anlass");
  const weg = istAnlass(anlassRoh) ? abmeldeWeg(anlassRoh) : abmeldeWeg("aufgabe");

  // Feld 1–3: Betriebsinhaber
  if (istEingetragen(rechtsform)) {
    setze("f01_name_rechtsform", "1", str(d, "firma"));
    setze("f02_register", "2", str(d, "register"));
  } else if (rechtsform === "gbr") {
    const mit = str(d, "mitgesellschafter");
    setze("f01_name_rechtsform", "1", mit ? `Weitere geschäftsführende Gesellschafter: ${mit}` : "");
  }
  setze("f03_geschaeftsbezeichnung", "3", str(d, "geschaeftsbezeichnung"));

  // Feld 4–11: Person
  setze("f04_name", "4", str(d, "name"));
  setze("f05_vornamen", "5", str(d, "vornamen"));
  const geschlecht = str(d, "geschlecht");
  if (geschlecht === "m") kreuze.push("f06_maennlich");
  if (geschlecht === "w") kreuze.push("f06_weiblich");
  if (geschlecht === "d") kreuze.push("f06_divers");
  if (geschlecht === "ohne") kreuze.push("f06_ohne_angabe");
  setze("f07_geburtsname", "7", str(d, "geburtsname"));
  const geb = datumLesen(str(d, "geburtsdatum"));
  setze("f08_geburtsdatum", "8", geb ? datumText(geb) : str(d, "geburtsdatum"));
  setze("f09_geburtsort", "9", str(d, "geburtsort"));
  const staat = str(d, "staat");
  if (staat === "deutsch") kreuze.push("f10_deutsch");
  if (staat === "andere") setze("f10_andere", "10", str(d, "staat_andere"));
  const wohn = anschrift(str(d, "wohn_strasse"), str(d, "wohn_plzort"));
  setze("f11_anschrift", "11", wohn);
  setze("f11_telefon", "11", str(d, "telefon"));
  setze("f11_email", "11", str(d, "email"));

  // Feld 12–16: Betrieb
  if (istGesellschaft(rechtsform)) setze("f12_zahl", "12", str(d, "zahl_vertreter"));
  // Einzelunternehmen und e. K. haben keine Gesellschafter, also auch keine Beteiligung der öffentlichen Hand.
  const hand = istGesellschaft(rechtsform) ? str(d, "oeffentliche_hand") : "nein";
  if (hand === "ja") kreuze.push("f13_ja");
  if (hand === "nein") kreuze.push("f13_nein");
  if (hand === "unbekannt") kreuze.push("f13_nicht_bekannt");
  const niederlassung = str(d, "niederlassung") || "haupt";
  const zweig = niederlassung === "zweig" || niederlassung === "zweigstelle";
  if (zweig) setze("f14_name", "14", str(d, "vertreter"));
  const betrieb = d.betrieb_wie_wohnung === true ? wohn : anschrift(str(d, "betrieb_strasse"), str(d, "betrieb_plzort"));
  setze("f15_anschrift", "15", betrieb);
  if (zweig) setze("f16_anschrift", "16", anschrift(str(d, "haupt_strasse"), str(d, "haupt_plzort")));

  // Feld 18–24: abgemeldete Tätigkeit
  setze("f18_taetigkeit", "18", str(d, "taetigkeit"));
  const neben = str(d, "nebenerwerb");
  if (neben === "ja") kreuze.push("f19_ja");
  if (neben === "nein") kreuze.push("f19_nein");
  const aufgabe = datumLesen(str(d, "datum"));
  setze("f20_datum_aufgabe", "20", aufgabe ? datumText(aufgabe) : "");
  const art = str(d, "betriebsart");
  if (art === "industrie") kreuze.push("f21_industrie");
  if (art === "handwerk") kreuze.push("f21_handwerk");
  if (art === "handel") kreuze.push("f21_handel");
  if (art === "sonstiges") kreuze.push("f21_sonstiges");
  const vollzeit = str(d, "vollzeit").replace(/\D/g, "");
  const teilzeit = str(d, "teilzeit").replace(/\D/g, "");
  const beschaeftigte = str(d, "beschaeftigte");
  if (beschaeftigte === "nein") kreuze.push("f22_keine");
  else if (beschaeftigte === "ja") {
    if (Number(vollzeit) > 0) text.f22_vollzeit = String(Number(vollzeit));
    if (Number(teilzeit) > 0) text.f22_teilzeit = String(Number(teilzeit));
  }
  if (niederlassung === "haupt") kreuze.push("f23_haupt");
  if (niederlassung === "zweig") kreuze.push("f23_zweig");
  if (niederlassung === "zweigstelle") kreuze.push("f23_zweigstelle");
  if (niederlassung === "reise") kreuze.push("f24_reise");

  // Feld 25–28: Grund
  if (weg.grund) kreuze.push(weg.grund);
  if (weg.grund === "f25_rechtsform" || weg.grund === "f25_uebergabe" || weg.grund === "f25_umwandlung") {
    setze("f27_kuenftiger_name", "27", str(d, "nachfolger"));
  }
  setze("f28_gruende", "28", str(d, "gruende"));

  return { text, kreuze, vereinfacht };
}

/** Füllt den amtlichen Vordruck im Browser. Datum (Feld 29) und Unterschrift (Feld 30) bleiben frei. */
export async function gewa3PdfErzeugen(d: Angaben, vorlage?: ArrayBuffer | Uint8Array): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  let bytes = vorlage;
  if (!bytes) {
    const antwort = await fetch(GEWA3_PDF_PFAD);
    if (!antwort.ok) throw new Error(`Vordruck nicht geladen (HTTP ${antwort.status})`);
    bytes = await antwort.arrayBuffer();
  }
  const pdf = await PDFDocument.load(bytes);
  const form = pdf.getForm();
  const { text, kreuze } = gewa3Felder(d);
  for (const [name, wert] of Object.entries(text)) {
    const feld = form.getTextField(name);
    feld.setText(wert);
    feld.setFontSize(9);
  }
  for (const name of kreuze) form.getCheckBox(name).check();
  return pdf.save();
}
