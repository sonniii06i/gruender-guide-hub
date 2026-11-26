import { FileX2 } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER } from "./types";
import {
  GEWA3_PDF_PFAD,
  GEWA3_STAND,
  abmeldeWeg,
  aufbewahrungBis,
  datumLesen,
  datumText,
  gewa3Felder,
  gewa3PdfErzeugen,
  istAnlass,
  istEingetragen,
  istGesellschaft,
  monatsfrist,
  type Anlass,
} from "@/lib/gewa3";

// Gewerbe abmelden: Formular GewA 3 ausfüllen (26.11.2026).
// Entscheider (welcher Vordruck bei welchem Anlass), Ausfüllhilfe für das amtliche Muster
// (Anlage 3 GewAnzV, BGBl. 2024 I Nr. 411) und Checkliste für die Zeit danach.
// Belege (alle am 26.11.2026 live abgerufen):
// - § 14 Abs. 1 GewO (Satz 1 „gleichzeitig“, Satz 2 Nr. 1–3, Satz 3 Verlegung in anderen Meldebezirk,
//   Satz 4 Abmeldung von Amts wegen), Abs. 8 (Weitergabe an IHK, HWK, Berufsgenossenschaft,
//   Registergericht, Finanzamt); § 15 Abs. 1 GewO (Bescheinigung binnen dreier Tage);
//   § 146 Abs. 2 Nr. 2 Buchst. b, Abs. 3 GewO (Geldbuße bis 1.000 €); § 4 Abs. 1 GewO.
// - § 1 und § 2 GewAnzV (Vordrucke, elektronische Anzeige).
// - Amtsseiten: Landeshauptstadt München (35 Euro; Regel seit 1. November 2025; formlose Vollmacht),
//   Stadt Münster (Aufgabe gebührenfrei; Regel seit 1. November 2025), service.berlin.de
//   (gebührenfrei; online mit oder ohne BundID), hamburg.de (erste Bescheinigung kostenlos,
//   weitere Ausfertigung 15 Euro; Bestätigung in der Regel innerhalb von 2 Wochen).
// - § 138 Abs. 1, 4 AO; § 108 AO; §§ 187, 188 BGB; § 147 Abs. 3, 4 AO; § 149 Abs. 2 AO.
// - § 16 Abs. 3, § 18 Abs. 3 Satz 2, § 19 Abs. 1 Satz 2 UStG; UStAE 2.6 Abs. 6 (BMF, Amtliche
//   Umsatzsteuer-Handausgabe 2024); § 16 Abs. 3 Satz 1 und 8 EStG.
// - § 31 Abs. 2, § 143 Abs. 1 HGB; § 65, § 73 Abs. 1, § 74 GmbHG; § 28a Abs. 1 Nr. 2 SGB IV.
// - Art. 57h DVO (EU) 282/2011 und BZSt (OSS-Abmeldung bis zum 10. Tag des Folgemonats);
//   § 6 Abs. 1 Satz 2 VerpackDG und ZSVR; § 6 Abs. 1 Satz 4 ElektroG und stiftung ear; BZSt-FAQ USt-IdNr.
// - Frankreich: entreprendre.service-public.gouv.fr (30 Tage); Italien: Agenzia delle Entrate,
//   Modell AA9/12 (30 Tage); Spanien: Agencia Tributaria, Modelo 036 (ein Monat).

const GII = "https://www.gesetze-im-internet.de";
export const Q = {
  gewo14: `${GII}/gewo/__14.html`,
  gewo15: `${GII}/gewo/__15.html`,
  gewo146: `${GII}/gewo/__146.html`,
  gewo4: `${GII}/gewo/__4.html`,
  gewanzv1: `${GII}/gewanzv_2014/__1.html`,
  gewanzv2: `${GII}/gewanzv_2014/__2.html`,
  anlage3: `${GII}/gewanzv_2014/anlage_3.html`,
  ao138: `${GII}/ao_1977/__138.html`,
  ao108: `${GII}/ao_1977/__108.html`,
  ao147: `${GII}/ao_1977/__147.html`,
  ustg16: `${GII}/ustg_1980/__16.html`,
  ustg18: `${GII}/ustg_1980/__18.html`,
  ustg19: `${GII}/ustg_1980/__19.html`,
  ustae26: "https://usth.bundesfinanzministerium.de/usth/2024/A-Umsatzsteuergesetz/I-Steuergegenstand-und-Geltungsbereich/Paragraf-2/ae-2-6.html",
  estg16: `${GII}/estg/__16.html`,
  hgb31: `${GII}/hgb/__31.html`,
  gmbhg65: `${GII}/gmbhg/__65.html`,
  gmbhg73: `${GII}/gmbhg/__73.html`,
  sgb28a: `${GII}/sgb_4/__28a.html`,
  verpackdg6: `${GII}/verpackdg/__6.html`,
  elektrog6: `${GII}/elektrog_2015/__6.html`,
  muenchen:
    "https://stadt.muenchen.de/service/info/hauptabteilung-iii-gewerbeangelegenheiten-und-verbraucherschutz-gewerbemeldungen-zentrale-dienste-anmeldung-prostschg/10279729/",
  muenster: "https://www.stadt-muenster.de/ordnungsamt/gewerbemeldungen",
  berlin: "https://service.berlin.de/dienstleistung/122107/",
  hamburg: "https://www.hamburg.de/service/info/11258060/n0/",
  bund: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99050012070000",
  bzstOss: "https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/One-Stop-Shop_EU/one_stop_shop_eu_node.html",
  bzstUstId: "https://www.bzst.de/DE/Unternehmen/Identifikationsnummern/Umsatzsteuer-Identifikationsnummer/FAQ/faq_ust_node.html",
  zsvr: "https://www.verpackungsregister.org/ich-moechte-meine-registrierung-aendern",
  ear: "https://www.stiftung-ear.de/anleitungen/weee-nummer-beantragen/beendigung-der-registrierung/",
  fr: "https://entreprendre.service-public.gouv.fr/vosdroits/F37363",
  it: "https://www.agenziaentrate.gov.it/portale/schede/istanze/aa9_11-apertura-variazione-chiusura-pf/come-variare-o-chiudere",
  es: "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/tramites-censales-relacionados-empresarios-profesionales-retenedores/plazo-presentar-declaracion-censal/cuando-tengo-que-presentar-declaracion-baja.html",
};

/** Gebühren laut Amtsseiten der Gemeinden – Beispiele, keine Liste für ganz Deutschland. */
export const GEBUEHREN: { ort: string; gebuehr: string; url: string }[] = [
  { ort: "Berlin", gebuehr: "gebührenfrei", url: Q.berlin },
  { ort: "Hamburg", gebuehr: "erste Bescheinigung kostenlos, jede weitere Ausfertigung 15 Euro", url: Q.hamburg },
  { ort: "München", gebuehr: "35 Euro (Gebührenrahmen laut Amtsseite)", url: Q.muenchen },
  { ort: "Münster", gebuehr: "gebührenfrei", url: Q.muenster },
];

const ANLASS_TEXT: Record<Anlass, string> = {
  aufgabe: "Betrieb wird ganz aufgegeben",
  umzug_andere: "Umzug des Betriebs in eine andere Gemeinde",
  umzug_gleiche: "Umzug des Betriebs innerhalb derselben Gemeinde",
  taetigkeit: "Tätigkeit wird gewechselt oder erweitert",
  name: "Namensänderung",
  rechtsform: "Wechsel der Rechtsform",
  austritt: "Austritt als Gesellschafter",
  uebergabe: "Übergabe des Betriebs (Verkauf, Pacht, Erbfolge)",
  umwandlung: "Verschmelzung oder Spaltung nach dem Umwandlungsgesetz",
  pause: "Gewerbe soll nur ruhen",
};

function anlassVon(d: ToolData): Anlass {
  const a = s(d, "anlass", "aufgabe");
  return istAnlass(a) ? a : "aufgabe";
}

/** GewA 3 wird nur gebraucht, wenn der Anlass eine Abmeldung ist. */
export function brauchtGewa3(d: ToolData): boolean {
  return abmeldeWeg(anlassVon(d)).vordruck === "GewA 3";
}

const FELD_NAME: Record<string, string> = {
  f01_name_rechtsform: "Feld 1 (eingetragener Name mit Rechtsform)",
  f02_register: "Feld 2 (Ort und Nummer des Registereintrags)",
  f03_geschaeftsbezeichnung: "Feld 3 (Name des Geschäfts)",
  f04_name: "Feld 4 (Name)",
  f05_vornamen: "Feld 5 (Vornamen)",
  f07_geburtsname: "Feld 7 (Geburtsname)",
  f08_geburtsdatum: "Feld 8 (Geburtsdatum)",
  f09_geburtsort: "Feld 9 (Geburtsort und -land)",
  f10_andere: "Feld 10 (Staatsangehörigkeit, andere)",
  f11_anschrift: "Feld 11 (Anschrift der Wohnung)",
  f11_telefon: "Feld 11 (Telefon)",
  f11_email: "Feld 11 (E-Mail)",
  f12_zahl: "Feld 12 (Zahl der geschäftsführenden Gesellschafter / gesetzlichen Vertreter)",
  f14_name: "Feld 14 (vertretungsberechtigte Person / Betriebsleiter)",
  f15_anschrift: "Feld 15 (Betriebsstätte)",
  f16_anschrift: "Feld 16 (Hauptniederlassung)",
  f18_taetigkeit: "Feld 18 (abgemeldete Tätigkeit)",
  f20_datum_aufgabe: "Feld 20 (Datum der Betriebsaufgabe)",
  f22_vollzeit: "Feld 22 (tätige Personen in Vollzeit)",
  f22_teilzeit: "Feld 22 (tätige Personen in Teilzeit)",
  f27_kuenftiger_name: "Feld 27 (künftiger Gewerbetreibender oder Firmenname)",
  f28_gruende: "Feld 28 (Gründe für die Betriebsaufgabe)",
};

const KREUZ_NAME: Record<string, string> = {
  f06_maennlich: "Feld 6: männlich",
  f06_weiblich: "Feld 6: weiblich",
  f06_divers: "Feld 6: divers",
  f06_ohne_angabe: "Feld 6: ohne Angabe",
  f10_deutsch: "Feld 10: deutsch",
  f13_ja: "Feld 13 (Beteiligung der öffentlichen Hand): ja",
  f13_nein: "Feld 13 (Beteiligung der öffentlichen Hand): nein",
  f13_nicht_bekannt: "Feld 13 (Beteiligung der öffentlichen Hand): nicht bekannt",
  f19_ja: "Feld 19 (zuletzt im Nebenerwerb): ja",
  f19_nein: "Feld 19 (zuletzt im Nebenerwerb): nein",
  f21_industrie: "Feld 21: Industrie",
  f21_handwerk: "Feld 21: Handwerk",
  f21_handel: "Feld 21: Handel",
  f21_sonstiges: "Feld 21: Sonstiges",
  f22_keine: "Feld 22: keine",
  f23_haupt: "Feld 23: eine Hauptniederlassung",
  f23_zweig: "Feld 23: eine Zweigniederlassung",
  f23_zweigstelle: "Feld 23: eine unselbständige Zweigstelle",
  f24_reise: "Feld 24: ein Reisegewerbe",
  f25_aufgabe: "Feld 25/26: Vollständige Aufgabe",
  f25_rechtsform: "Feld 25/26: Wechsel der Rechtsform",
  f25_umwandlung: "Feld 25/26: Übergang nach dem Umwandlungsgesetz",
  f25_gesellschafter: "Feld 25/26: Gesellschafteraustritt",
  f25_uebergabe: "Feld 25/26: Übergabe (Erbfolge, Kauf, Pacht)",
};

function generate(d: ToolData): string {
  const anlass = anlassVon(d);
  const weg = abmeldeWeg(anlass);
  const rechtsform = s(d, "rechtsform", "einzel");
  const datum = datumLesen(s(d, "datum"));
  const L: string[] = [];

  L.push("GEWERBE ABMELDEN – DEIN FAHRPLAN");
  L.push(`Rechtsstand: ${GEWA3_STAND}`);
  L.push("");

  L.push("1. Dein Vordruck");
  L.push(`Anlass: ${ANLASS_TEXT[anlass]}`);
  L.push(
    weg.vordruck === "keiner"
      ? "Vordruck: keiner – für eine Pause sieht § 14 GewO keine Anzeige vor."
      : `Vordruck: ${weg.vordruck}${weg.zusaetzlich ? ` und danach ${weg.zusaetzlich}` : ""}`
  );
  if (weg.vordruck !== "keiner") L.push(`Abgeben bei: ${weg.behoerde}`);
  L.push(`Rechtsgrundlage: ${weg.norm}`);
  L.push(weg.erklaerung);
  if (anlass === "umzug_andere") {
    L.push(
      "Die Regel gilt laut den Amtsseiten der Landeshauptstadt München und der Stadt Münster seit dem 1. November 2025. Manche Stadtportale beschreiben noch den alten Weg mit eigener Abmeldung; maßgeblich ist § 14 Abs. 1 Satz 3 GewO. Im GewA 1 kreuzt du in Feld 25 „Verlegung des Betriebs aus einem anderen Meldebezirk“ an."
    );
    L.push("Ausfüllhilfe für den GewA 1: gruenderx.de/tools/gewerbeanmeldung-wizard");
  }
  if (anlass === "rechtsform") {
    L.push("Welche Rechtsform passt und was sie kostet: gruenderx.de/rechtsform-finden und gruenderx.de/gruendungskosten-rechner. Ausfüllhilfe für den GewA 1: gruenderx.de/tools/gewerbeanmeldung-wizard");
  }
  if (anlass === "pause") {
    L.push(
      "Wichtig für die Umsatzsteuer: Eine Einstellung der Tätigkeit liegt nicht vor, wenn du das Unternehmen in absehbarer Zeit wieder aufleben lassen willst (UStAE 2.6 Abs. 6). Solange das Gewerbe angemeldet bleibt, laufen deine steuerlichen Erklärungspflichten weiter."
    );
  }
  L.push("");

  L.push("2. Fristen");
  if (weg.vordruck === "keiner") {
    L.push("- Keine Frist: Es gibt nichts anzuzeigen, solange du den Betrieb nicht aufgibst. Gibst du später doch auf, ist die Abmeldung gleichzeitig mit der Aufgabe fällig (§ 14 Abs. 1 GewO).");
  } else {
    L.push(
      datum
        ? `- Gewerbeamt: gleichzeitig mit dem Ereignis, also zum ${datumText(datum)} (§ 14 Abs. 1 GewO).`
        : "- Gewerbeamt: gleichzeitig mit dem Ereignis (§ 14 Abs. 1 GewO). Du hast kein gültiges Datum angegeben (Format TT.MM.JJJJ)."
    );
    L.push("- Wer die Anzeige nicht, nicht richtig oder nicht rechtzeitig erstattet, handelt ordnungswidrig; die Geldbuße kann bis zu 1.000 Euro betragen (§ 146 Abs. 2 Nr. 2, Abs. 3 GewO).");
    if (datum) {
      L.push(
        `- Steuerlich gilt für die Mitteilung von Verlegung oder Aufgabe an die Gemeinde eine Monatsfrist (§ 138 Abs. 1 und 4 AO): spätestens ${datumText(monatsfrist(datum))}. Sonnabend und Sonntag sind berücksichtigt; fällt der Tag bei dir auf einen gesetzlichen Feiertag, endet die Frist am nächsten Werktag (§ 108 Abs. 3 AO).`
      );
    }
    L.push("- Die Behörde bescheinigt den Empfang der Anzeige innerhalb von drei Tagen (§ 15 Abs. 1 GewO). Heb die Bescheinigung auf.");
  }
  L.push("");

  if (weg.vordruck === "GewA 3") {
    const belegung = gewa3Felder(d);
    L.push("3. So ist dein GewA 3 ausgefüllt");
    L.push("Über den Knopf „GewA 3 ausgefüllt als PDF“ bekommst du das amtliche Muster mit diesen Einträgen:");
    for (const [feld, wert] of Object.entries(belegung.text)) {
      L.push(`- ${FELD_NAME[feld] ?? feld}: ${wert.replace(/\n/g, ", ")}`);
    }
    for (const k of belegung.kreuze) L.push(`- [x] ${KREUZ_NAME[k] ?? k}`);
    L.push("- Feld 17 und die Kästen unten rechts füllt die Behörde aus.");
    L.push("- Feld 29 (Datum) und Feld 30 (Unterschrift) trägst du nach dem Ausdrucken von Hand ein. Bei der Online-Abmeldung entfällt die Unterschrift (§ 2 Abs. 1 GewAnzV).");
    if (belegung.vereinfacht.length > 0) {
      L.push(
        `- Achtung: In Feld ${belegung.vereinfacht.join(", ")} stehen Zeichen, die die PDF-Schrift nicht kennt. Sie wurden auf den Grundbuchstaben vereinfacht – bitte nach dem Ausdrucken von Hand berichtigen.`
      );
    }
    if (rechtsform === "gbr" || rechtsform === "ohg_kg") {
      L.push("- Personengesellschaft: Jeder geschäftsführende Gesellschafter füllt einen eigenen Vordruck aus (Kopfzeile des GewA 3). Spiel das Tool je Person einmal durch.");
    }
    if (rechtsform === "ug_gmbh" || rechtsform === "sonstige") {
      L.push("- Juristische Person: In den Feldern 4 bis 11 stehen die Angaben zum gesetzlichen Vertreter, also z. B. zum Geschäftsführer (Kopfzeile des GewA 3).");
    }
    L.push("");

    L.push("4. Abgeben");
    L.push("- Wege: online über das Portal deiner Gemeinde, per Post oder persönlich. Elektronische Anzeigen sind nach § 2 GewAnzV zulässig; ob deine Gemeinde sie anbietet, steht auf ihrer Website oder im Bundesportal (verwaltung.bund.de, Leistung „Gewerbe abmelden“).");
    L.push("- Mitbringen oder beilegen: Ausweis oder Kopie des Ausweises" + (istEingetragen(rechtsform) ? ", aktueller Registerauszug" : "") + ". Lässt du dich vertreten, braucht die Person eine schriftliche Vollmacht (so z. B. Hamburg und München).");
    L.push("- Gebühr: legt jede Gemeinde selbst fest. Beispiele von den Amtsseiten (Stand " + GEWA3_STAND + "): " + GEBUEHREN.map((g) => `${g.ort}: ${g.gebuehr}`).join("; ") + ".");
    L.push("- Das Formular kommt von GründerX, nicht von einer Behörde. Wirksam wird die Abmeldung erst, wenn sie bei deinem Gewerbeamt eingegangen ist.");
    L.push("");

    L.push("5. Danach erledigen");
    L.push("[ ] Finanzamt: Das Gewerbeamt gibt die Abmeldung an das Finanzamt weiter (§ 14 Abs. 8 Nr. 13 GewO, § 138 Abs. 1 AO). Die Steuererklärungen für das letzte Jahr gibst du trotzdem ab.");
    const ust = s(d, "ust");
    if (ust === "klein") {
      L.push("[ ] Umsatzsteuer: Als Kleinunternehmer bist du von den Erklärungspflichten des § 18 Abs. 1 bis 4 UStG befreit (§ 19 Abs. 1 Satz 2 UStG). Fordert das Finanzamt dich auf, gibst du trotzdem eine Erklärung ab.");
    } else {
      L.push("[ ] Umsatzsteuer: Endet deine Tätigkeit mitten im Jahr, ist der Besteuerungszeitraum kürzer (§ 16 Abs. 3 UStG) und die Jahreserklärung binnen eines Monats nach seinem Ablauf fällig (§ 18 Abs. 3 Satz 2 UStG).");
      L.push("    Der Zeitraum endet nicht mit der Gewerbeabmeldung, sondern mit dem letzten Tätigwerden: Der spätere Verkauf von Restware oder Inventar gehört noch dazu (UStAE 2.6 Abs. 6).");
    }
    L.push("[ ] Einkommensteuer: Die Aufgabe des Gewerbebetriebs gilt als Veräußerung (§ 16 Abs. 3 Satz 1 EStG). Was du nicht verkaufst, sondern behältst (Laptop, Restware, Fahrzeug), wird mit dem gemeinen Wert angesetzt (Satz 8). Den Aufgabegewinn rechnest du am besten mit einem Steuerberater.");
    if (datum) {
      const frist = aufbewahrungBis(datum);
      L.push(`[ ] Unterlagen aufbewahren (§ 147 Abs. 3 und 4 AO): Buchungsbelege aus ${datum.getUTCFullYear()} mindestens bis ${frist.belege} (8 Jahre), Geschäftsbriefe bis ${frist.briefe} (6 Jahre), Bücher, Aufzeichnungen und Jahresabschlüsse 10 Jahre ab dem Ende des Jahres, in dem sie fertig wurden – also frühestens bis ${frist.buecher}.`);
    } else {
      L.push("[ ] Unterlagen aufbewahren (§ 147 Abs. 3 AO): Bücher und Jahresabschlüsse 10 Jahre, Buchungsbelege 8 Jahre, Geschäftsbriefe 6 Jahre.");
    }
    L.push("[ ] IHK, Handwerkskammer und Berufsgenossenschaft erfahren von der Abmeldung über das Gewerbeamt (§ 14 Abs. 8 Nr. 1, 2 und 6 GewO). Prüf trotzdem den letzten Beitragsbescheid.");
    if (rechtsform === "ek") {
      L.push("[ ] Handelsregister: Das Erlöschen der Firma meldest du zur Eintragung an (§ 31 Abs. 2 HGB), das läuft über einen Notar.");
    }
    if (rechtsform === "ohg_kg") {
      L.push("[ ] Handelsregister: Nach der Auflösung der Gesellschaft folgt die Liquidation (§ 143 Abs. 1 HGB); die Anmeldungen zum Register laufen über einen Notar.");
    }
    if (rechtsform === "ug_gmbh") {
      L.push("[ ] UG/GmbH: Die Gewerbeabmeldung löst die Gesellschaft nicht auf. Dafür meldest du die Auflösung zum Handelsregister an und rufst die Gläubiger auf (§ 65 GmbHG); verteilt wird frühestens ein Jahr nach dem Aufruf (§ 73 Abs. 1 GmbHG), danach wird der Schluss der Liquidation angemeldet (§ 74 Abs. 1 GmbHG).");
    }
    if (s(d, "beschaeftigte") === "ja") {
      L.push("[ ] Beschäftigte: Das Ende jeder versicherungspflichtigen Beschäftigung meldest du der Einzugsstelle (§ 28a Abs. 1 Nr. 2 SGB IV).");
    }
    if (b(d, "oss")) {
      L.push("[ ] One-Stop-Shop: Spätestens am zehnten Tag des Folgemonats beim BZSt abmelden (Abmeldeformular im BZStOnline-Portal; Art. 57h DVO (EU) 282/2011). Für Zeiträume, in denen du registriert warst, gibst du weiter Erklärungen ab.");
    }
    if (b(d, "lucid")) {
      L.push("[ ] Verpackungsregister LUCID: Die dauerhafte Aufgabe der Herstellertätigkeit teilst du unverzüglich mit (§ 6 Abs. 1 Satz 2 VerpackDG). Du beendest die Registrierung selbst in LUCID (Stammdaten → Bearbeiten → „Registrierung beenden“), ein Brief genügt nicht. Erst beenden, wenn keine Herstellerpflichten mehr bestehen – eine beendete Registrierung lässt sich nicht reaktivieren.");
    }
    if (b(d, "weee")) {
      L.push("[ ] Elektrogeräte (stiftung ear): Die dauerhafte Aufgabe des Inverkehrbringens teilst du unverzüglich mit (§ 6 Abs. 1 Satz 4 ElektroG). Die Aufhebung beantragst du im ear-Portal, frühestens 2 Monate im Voraus und nicht rückwirkend; eine Kündigung gibt es nicht.");
    }
    if (b(d, "ustid")) {
      L.push("[ ] USt-IdNr.: Ihre Gültigkeit endet, wenn du die Beendigung beim BZSt beantragst oder das Finanzamt dein Unternehmen nicht mehr umsatzsteuerlich führt (BZSt-FAQ).");
    }
    L.push("[ ] Verträge und Auftritte: Geschäftskonto, Software-Abos, Versicherungen, Marktplatz-Konten und Impressum durchgehen.");
    L.push("[ ] Wiederaufnahme: Nimmst du die Tätigkeit später wieder auf, meldest du sie neu an (Hinweis auf dem GewA 3).");
    L.push("");
  }

  L.push(
    `Quellen (Stand ${GEWA3_STAND}): § 14 GewO (${Q.gewo14}); § 1 GewAnzV (${Q.gewanzv1}); Anlage 3 GewAnzV (${Q.anlage3}); § 138 AO (${Q.ao138}); § 147 AO (${Q.ao147}); § 18 UStG (${Q.ustg18}); UStAE 2.6 (${Q.ustae26}); München (${Q.muenchen}); Münster (${Q.muenster}); Berlin (${Q.berlin}); Hamburg (${Q.hamburg}).`
  );
  L.push("");
  L.push("Keine Rechts- oder Steuerberatung – im Einzelfall Anwalt oder Steuerberater fragen.");
  L.push(DISCLAIMER);
  return L.join("\n");
}

const nurGewa3 = (d: ToolData) => brauchtGewa3(d);
const rf = (d: ToolData) => s(d, "rechtsform", "einzel");
const zweig = (d: ToolData) => s(d, "niederlassung") === "zweig" || s(d, "niederlassung") === "zweigstelle";

export const gewerbeAbmeldenConfig: ToolConfig = {
  slug: "gewerbe-abmelden",
  shortTitle: "Gewerbe abmelden: Formular GewA 3",
  documentName: "Fahrplan Gewerbe abmelden",
  icon: FileX2,
  accent: "from-slate-800 to-slate-600",
  badge: `Amtliches Muster GewA 3 · Stand ${GEWA3_STAND}`,
  heroTitle: "Gewerbe abmelden: Formular GewA 3 kostenlos ausfüllen",
  heroSubtitle:
    "Ein paar Fragen, dann weißt du, ob du den GewA 3, den GewA 2 oder nur eine Anmeldung brauchst. Den GewA 3 füllen wir mit deinen Angaben aus: als PDF zum Unterschreiben, mit Fristen und der Checkliste für Finanzamt, Umsatzsteuer und Register. Deine Angaben bleiben in deinem Browser.",
  resultFilename: "gewerbe-abmelden-fahrplan",
  format: "formular",
  formularPdf: {
    label: "GewA 3 ausgefüllt als PDF",
    dateiname: "gewerbe-abmeldung-gewa3",
    verfuegbar: brauchtGewa3,
    erzeugen: (d) => gewa3PdfErzeugen(d),
  },
  downloads: [{ label: "Leeres Formular GewA 3 (amtliches Muster, ausfüllbares PDF)", href: GEWA3_PDF_PFAD }],
  steps: [
    {
      title: "Anlass",
      subtitle: "Was ändert sich, und welcher Vordruck gehört dazu?",
      fields: [
        {
          name: "anlass",
          label: "Was trifft zu?",
          type: "radio",
          required: true,
          options: [
            { value: "aufgabe", label: "Ich gebe das Gewerbe ganz auf" },
            { value: "umzug_andere", label: "Ich ziehe mit dem Betrieb in eine andere Gemeinde" },
            { value: "umzug_gleiche", label: "Ich ziehe innerhalb derselben Gemeinde um" },
            { value: "rechtsform", label: "Ich wechsle die Rechtsform (z. B. vom Einzelunternehmen zur UG oder GmbH)" },
            { value: "uebergabe", label: "Ich übergebe den Betrieb (Verkauf, Pacht, Erbfolge)" },
            { value: "austritt", label: "Ich scheide als Gesellschafter aus (GbR, OHG, KG)" },
            { value: "umwandlung", label: "Verschmelzung oder Spaltung nach dem Umwandlungsgesetz" },
            { value: "taetigkeit", label: "Ich ändere oder erweitere nur die Tätigkeit" },
            { value: "name", label: "Nur mein Name hat sich geändert" },
            { value: "pause", label: "Ich will das Gewerbe nur ruhen lassen" },
          ],
        },
        {
          name: "datum",
          label: "Datum der Aufgabe bzw. Änderung",
          type: "text",
          placeholder: "TT.MM.JJJJ",
          required: true,
          condition: (d) => s(d, "anlass") !== "pause",
          help: "Der Tag, an dem der Betrieb tatsächlich endet oder sich ändert. Er kommt beim GewA 3 in Feld 20.",
          colSpan: 1,
        },
        {
          name: "rechtsform",
          label: "Bisherige Rechtsform",
          type: "select",
          required: true,
          colSpan: 1,
          options: [
            { value: "einzel", label: "Einzelunternehmen (nicht im Handelsregister)" },
            { value: "ek", label: "Eingetragener Kaufmann (e. K.)" },
            { value: "gbr", label: "GbR" },
            { value: "ohg_kg", label: "OHG oder KG" },
            { value: "ug_gmbh", label: "UG oder GmbH" },
            { value: "sonstige", label: "Andere eingetragene Rechtsform (AG, eG, e. V.)" },
          ],
        },
      ],
    },
    {
      title: "Betriebsinhaber",
      subtitle: "Felder 1 bis 11 des GewA 3. Bei UG und GmbH gehören in die Felder 4 bis 11 die Angaben zum Geschäftsführer.",
      fields: [
        { name: "firma", label: "Eingetragener Name mit Rechtsform (Feld 1)", type: "text", placeholder: "Muster Handels UG (haftungsbeschränkt)", condition: (d) => nurGewa3(d) && istEingetragen(rf(d)) },
        { name: "register", label: "Ort und Nummer des Registereintrags (Feld 2)", type: "text", placeholder: "Amtsgericht Köln, HRB 12345", condition: (d) => nurGewa3(d) && istEingetragen(rf(d)) },
        { name: "mitgesellschafter", label: "Weitere geschäftsführende Gesellschafter (Feld 1)", type: "text", placeholder: "Vor- und Nachnamen", condition: (d) => nurGewa3(d) && rf(d) === "gbr" },
        { name: "geschaeftsbezeichnung", label: "Name des Geschäfts, falls vorhanden (Feld 3)", type: "text", placeholder: "z. B. Friseur Haargenau", condition: nurGewa3 },
        { name: "name", label: "Name (Feld 4)", type: "text", required: true, colSpan: 1, condition: nurGewa3 },
        { name: "vornamen", label: "Vornamen (Feld 5)", type: "text", required: true, colSpan: 1, condition: nurGewa3 },
        {
          name: "geschlecht",
          label: "Geschlecht laut Geburtsurkunde (Feld 6)",
          type: "select",
          colSpan: 1,
          condition: nurGewa3,
          options: [
            { value: "m", label: "männlich" },
            { value: "w", label: "weiblich" },
            { value: "d", label: "divers" },
            { value: "ohne", label: "ohne Angabe" },
          ],
        },
        { name: "geburtsname", label: "Geburtsname, nur wenn abweichend (Feld 7)", type: "text", colSpan: 1, condition: nurGewa3 },
        { name: "geburtsdatum", label: "Geburtsdatum (Feld 8)", type: "text", placeholder: "TT.MM.JJJJ", colSpan: 1, condition: nurGewa3 },
        { name: "geburtsort", label: "Geburtsort und -land (Feld 9)", type: "text", placeholder: "Köln, Deutschland", colSpan: 1, condition: nurGewa3 },
        {
          name: "staat",
          label: "Staatsangehörigkeit (Feld 10)",
          type: "radio",
          condition: nurGewa3,
          options: [
            { value: "deutsch", label: "deutsch" },
            { value: "andere", label: "andere" },
          ],
        },
        { name: "staat_andere", label: "Welche Staatsangehörigkeit(en)?", type: "text", condition: (d) => nurGewa3(d) && s(d, "staat") === "andere" },
        { name: "wohn_strasse", label: "Wohnanschrift: Straße und Hausnummer (Feld 11)", type: "text", colSpan: 1, condition: nurGewa3 },
        { name: "wohn_plzort", label: "Wohnanschrift: PLZ und Ort", type: "text", colSpan: 1, condition: nurGewa3 },
        { name: "telefon", label: "Telefon (freiwillig)", type: "tel", colSpan: 1, condition: nurGewa3 },
        { name: "email", label: "E-Mail (freiwillig)", type: "email", colSpan: 1, condition: nurGewa3 },
      ],
    },
    {
      title: "Betrieb und Tätigkeit",
      subtitle: "Felder 12 bis 24: was du abmeldest und wo.",
      fields: [
        { name: "zahl_vertreter", label: "Zahl der geschäftsführenden Gesellschafter bzw. gesetzlichen Vertreter (Feld 12)", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && istGesellschaft(rf(d)) },
        {
          name: "oeffentliche_hand",
          label: "Ist die öffentliche Hand beteiligt? (Feld 13)",
          type: "radio",
          condition: (d) => nurGewa3(d) && istGesellschaft(rf(d)),
          options: [
            { value: "nein", label: "nein" },
            { value: "ja", label: "ja" },
            { value: "unbekannt", label: "nicht bekannt" },
          ],
        },
        {
          name: "niederlassung",
          label: "Was meldest du ab? (Feld 23/24)",
          type: "radio",
          required: true,
          condition: nurGewa3,
          options: [
            { value: "haupt", label: "Hauptniederlassung (der Normalfall)" },
            { value: "zweig", label: "Zweigniederlassung" },
            { value: "zweigstelle", label: "Unselbständige Zweigstelle" },
            { value: "reise", label: "Reisegewerbe" },
          ],
        },
        { name: "vertreter", label: "Vertretungsberechtigte Person oder Betriebsleiter (Feld 14)", type: "text", placeholder: "Name, Vornamen", condition: (d) => nurGewa3(d) && zweig(d) },
        { name: "betrieb_wie_wohnung", label: "Die Betriebsstätte ist meine Wohnanschrift", type: "checkbox", condition: nurGewa3 },
        { name: "betrieb_strasse", label: "Betriebsstätte: Straße und Hausnummer (Feld 15)", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && !b(d, "betrieb_wie_wohnung") },
        { name: "betrieb_plzort", label: "Betriebsstätte: PLZ und Ort", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && !b(d, "betrieb_wie_wohnung") },
        { name: "haupt_strasse", label: "Hauptniederlassung: Straße und Hausnummer (Feld 16)", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && zweig(d) },
        { name: "haupt_plzort", label: "Hauptniederlassung: PLZ und Ort", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && zweig(d) },
        {
          name: "taetigkeit",
          label: "Abgemeldete Tätigkeit (Feld 18)",
          type: "textarea",
          required: true,
          condition: nurGewa3,
          placeholder: "z. B. Onlinehandel mit Sportartikeln",
          help: "So genau wie in deiner Gewerbeanmeldung. Meldest du nur einen Teil ab, nenn nur diesen Teil.",
        },
        {
          name: "nebenerwerb",
          label: "Wurde die Tätigkeit zuletzt im Nebenerwerb betrieben? (Feld 19)",
          type: "radio",
          condition: nurGewa3,
          options: [
            { value: "ja", label: "ja" },
            { value: "nein", label: "nein" },
          ],
        },
        {
          name: "betriebsart",
          label: "Art des Betriebs (Feld 21)",
          type: "radio",
          condition: nurGewa3,
          options: [
            { value: "handel", label: "Handel" },
            { value: "handwerk", label: "Handwerk" },
            { value: "industrie", label: "Industrie" },
            { value: "sonstiges", label: "Sonstiges (z. B. Dienstleistung)" },
          ],
        },
        {
          name: "beschaeftigte",
          label: "Waren bei der Aufgabe außer dir Personen im Betrieb tätig? (Feld 22)",
          type: "radio",
          condition: nurGewa3,
          help: "Mitgezählt werden auch Aushilfen und mithelfende Ehe- oder Lebenspartner, nicht der Inhaber.",
          options: [
            { value: "nein", label: "nein, keine" },
            { value: "ja", label: "ja" },
          ],
        },
        { name: "vollzeit", label: "Davon in Vollzeit", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && s(d, "beschaeftigte") === "ja" },
        { name: "teilzeit", label: "Davon in Teilzeit", type: "text", colSpan: 1, condition: (d) => nurGewa3(d) && s(d, "beschaeftigte") === "ja" },
      ],
    },
    {
      title: "Grund und Folgepflichten",
      subtitle: "Felder 27 und 28 sowie die Punkte für deine Checkliste danach.",
      fields: [
        {
          name: "nachfolger",
          label: "Name des künftigen Gewerbetreibenden oder künftiger Firmenname (Feld 27)",
          type: "text",
          condition: (d) => ["rechtsform", "uebergabe", "umwandlung"].includes(s(d, "anlass")),
        },
        { name: "gruende", label: "Gründe für die Betriebsaufgabe (Feld 28)", type: "text", placeholder: "z. B. Alter, wirtschaftliche Schwierigkeiten", condition: nurGewa3 },
        {
          name: "ust",
          label: "Wie wirst du bei der Umsatzsteuer geführt?",
          type: "radio",
          condition: nurGewa3,
          options: [
            { value: "regel", label: "Regelbesteuerung (ich weise Umsatzsteuer aus)" },
            { value: "klein", label: "Kleinunternehmer (§ 19 UStG)" },
          ],
        },
        { name: "ustid", label: "Ich habe eine USt-IdNr.", type: "checkbox", condition: nurGewa3 },
        { name: "oss", label: "Ich bin beim One-Stop-Shop (OSS) des BZSt registriert", type: "checkbox", condition: nurGewa3 },
        { name: "lucid", label: "Ich bin im Verpackungsregister LUCID registriert", type: "checkbox", condition: nurGewa3 },
        { name: "weee", label: "Ich bin bei der stiftung ear registriert (Elektrogeräte, WEEE)", type: "checkbox", condition: nurGewa3 },
      ],
    },
  ],
  generate,
  kurzantwort: {
    titel: "Gewerbe abmelden: Formular, Frist und Kosten in Kürze",
    text: [
      "Für die Abmeldung ist bundesweit der Vordruck GewA 3 vorgeschrieben (Anlage 3 der Gewerbeanzeigeverordnung). Du gibst ihn bei dem Gewerbeamt ab, bei dem dein Betrieb gemeldet ist, und zwar gleichzeitig mit der Aufgabe (§ 14 Abs. 1 GewO). Hier füllst du das amtliche Muster kostenlos aus und lädst es als PDF.",
      "Nicht jeder Anlass ist eine Abmeldung. Ziehst du mit dem Betrieb in eine andere Gemeinde, meldest du seit dem 1. November 2025 nur noch dort an; die neue Gemeinde gibt die Daten an die alte weiter. Bei einem Umzug innerhalb der Gemeinde, einer neuen Tätigkeit oder einem neuen Namen reicht die Ummeldung mit dem GewA 2.",
      "Die Gebühr legt jede Gemeinde selbst fest: Berlin und Münster verlangen nichts, Hamburg stellt die erste Bescheinigung kostenlos aus, München nennt 35 Euro.",
    ],
    tabelle: {
      kopf: ["Anlass", "Vordruck", "Abgeben bei"],
      zeilen: [
        ["Betrieb ganz aufgeben", "GewA 3", "bisheriges Gewerbeamt"],
        ["Umzug in eine andere Gemeinde", "GewA 1 (nur Anmeldung)", "Gewerbeamt der neuen Gemeinde"],
        ["Umzug innerhalb der Gemeinde", "GewA 2", "bisheriges Gewerbeamt"],
        ["Tätigkeit wechseln oder erweitern, Namensänderung", "GewA 2", "bisheriges Gewerbeamt"],
        ["Rechtsform wechseln", "GewA 3, danach GewA 1", "bisheriges Gewerbeamt"],
        ["Betrieb übergeben (Verkauf, Pacht, Erbfolge)", "GewA 3, Nachfolger GewA 1", "bisheriges Gewerbeamt"],
        ["Als Gesellschafter ausscheiden", "GewA 3 je Gesellschafter", "bisheriges Gewerbeamt"],
      ],
    },
    fussnote:
      "Quellen: § 14 Abs. 1 GewO, § 1 GewAnzV, Vordrucke der Anlagen 1 bis 3 GewAnzV (BGBl. 2024 I Nr. 411); Gebühren laut Amtsseiten der vier Städte. Das Formular stellt GründerX bereit, nicht eine Behörde; abgegeben wird es bei deinem Gewerbeamt.",
  },
  seoSections: [
    {
      heading: "Gewerbe abmelden: Wann du das Formular GewA 3 brauchst",
      body: [
        "Wer einen Gewerbebetrieb aufgibt, muss das der zuständigen Behörde anzeigen, und zwar gleichzeitig (§ 14 Abs. 1 Satz 2 Nr. 3 GewO). Welcher Vordruck dafür gilt, regelt die Gewerbeanzeigeverordnung: für die Aufgabe das Muster der Anlage 3, kurz GewA 3. Das Muster ist in ganz Deutschland gleich. Die Vordrucke der Städte unterscheiden sich nur im Briefkopf.",
        "Den GewA 3 brauchst du auch, wenn der Betrieb weiterläuft, aber nicht mehr von dir oder nicht mehr in derselben Form: beim Wechsel der Rechtsform, bei der Übergabe an einen Nachfolger, beim Übergang nach dem Umwandlungsgesetz und wenn du als Gesellschafter ausscheidest. Für diese Fälle hat das Formular in Feld 25/26 eigene Kästchen.",
        "Keine Abmeldung ist dagegen der Umzug. Innerhalb derselben Gemeinde meldest du mit dem GewA 2 um. Ziehst du in eine andere Gemeinde, zeigst du das ausschließlich der Behörde an, die für die Anmeldung am neuen Ort zuständig ist; sie übermittelt die Daten an das bisherige Gewerbeamt (§ 14 Abs. 1 Satz 3 GewO). München und Münster nennen dafür den 1. November 2025 als Stichtag. Im aktuellen GewA 3 steht an der Stelle des früheren Kästchens „Verlegung in einen anderen Meldebezirk“ deshalb nur noch „(weggefallen)“. Viele ältere Anleitungen und manche Stadtportale beschreiben noch zwei Wege zum Amt.",
      ],
    },
    {
      heading: "GewA 3 ausfüllen: die Felder, bei denen es hakt",
      body: [
        "Der Vordruck hat 30 Felder auf zwei Seiten und soll laut Verordnung vollständig und gut lesbar, maschinell oder in Druckbuchstaben, ausgefüllt werden. Die meisten Felder kennst du aus der Anmeldung. Nachfragen vom Amt gibt es vor allem bei diesen:",
      ],
      tabelle: {
        kopf: ["Feld", "Was hinein gehört"],
        zeilen: [
          ["1 und 2", "Nur bei Eintrag im Handels-, Genossenschafts- oder Vereinsregister: Name mit Rechtsform, Registergericht und Nummer. Bei einer nicht eingetragenen GbR stehen in Feld 1 die weiteren geschäftsführenden Gesellschafter. Einzelunternehmer ohne Registereintrag lassen beide leer."],
          ["4 bis 11", "Deine Person. Bei UG und GmbH die Angaben zum gesetzlichen Vertreter, also zum Geschäftsführer."],
          ["12 und 13", "Nur für Gesellschaften: Zahl der geschäftsführenden Gesellschafter oder gesetzlichen Vertreter und die Frage nach einer Beteiligung der öffentlichen Hand."],
          ["15 und 16", "Anschrift der Betriebsstätte. Feld 16 nur, wenn du eine Zweigniederlassung oder Zweigstelle abmeldest."],
          ["17", "Bleibt leer. Das Feld füllt die Behörde aus."],
          ["18", "Die abgemeldete Tätigkeit, so genau wie in der Anmeldung. Gibst du nur einen Teil auf, nennst du nur diesen Teil."],
          ["20", "Der Tag, an dem der Betrieb tatsächlich geendet hat. Nicht der Tag, an dem du das Formular ausfüllst."],
          ["22", "Personen, die bei der Aufgabe im Betrieb tätig waren, einschließlich Aushilfen und mithelfender Partner, ohne dich selbst."],
          ["25/26", "Der Grund: vollständige Aufgabe, Wechsel der Rechtsform, Umwandlung, Gesellschafteraustritt oder Übergabe."],
          ["27", "Nur bei Übergabe, Rechtsformwechsel oder Umwandlung: Name des künftigen Gewerbetreibenden oder der künftigen Firma."],
          ["29 und 30", "Datum und Unterschrift von Hand. Bei der Online-Abmeldung entfällt die Unterschrift."],
        ],
      },
    },
    {
      heading: "Abgeben: online, per Post oder im Amt, und was es kostet",
      body: [
        "Zuständig ist das Gewerbeamt der Gemeinde, in der die Betriebsstätte liegt; in Hamburg nehmen auch die Handelskammer und die Handwerkskammer die Abmeldung an. Die Verordnung erlaubt die elektronische Anzeige, viele Gemeinden bieten sie an: Berlin online mit oder ohne BundID, München über die BayernID. Wer online abmeldet, braucht den Papiervordruck nicht und unterschreibt nicht. Welcher Weg bei dir offen ist, zeigt das Bundesportal, sobald du deinen Ort auswählst.",
        "Gehst du persönlich hin oder schickst du das Formular per Post, legst du deinen Ausweis vor oder eine Kopie bei. Eingetragene Unternehmen fügen einen aktuellen Registerauszug hinzu. Du kannst dich vertreten lassen: Hamburg verlangt eine schriftliche Vollmacht, München eine formlose Vollmacht samt Ausweisen beider Personen.",
        "Die Behörde bescheinigt den Empfang innerhalb von drei Tagen (§ 15 Abs. 1 GewO). In der Praxis dauert es je nach Amt länger; Hamburg nennt in der Regel bis zu zwei Wochen. Was die Abmeldung kostet, bestimmt die Gemeinde:",
      ],
      tabelle: {
        kopf: ["Gemeinde", "Gebühr für die Abmeldung", "Quelle"],
        zeilen: GEBUEHREN.map((g) => [g.ort, g.gebuehr, `Amtsseite, Stand ${GEWA3_STAND}`]),
      },
    },
    {
      heading: "Beispiel: Nebengewerbe zum 31. Dezember 2026 aufgeben",
      body: [
        "Lena betreibt neben ihrem Job einen Onlinehandel als Einzelunternehmerin und hört zum 31.12.2026 auf. Im Tool wählt sie „Ich gebe das Gewerbe ganz auf“. Ergebnis: GewA 3 an ihr Gewerbeamt, in Feld 19 „ja“ (Nebenerwerb), in Feld 20 der 31.12.2026, in Feld 25/26 „Vollständige Aufgabe“. Die Felder 1, 2, 12 und 14 bleiben leer, weil sie nicht im Handelsregister steht und keine Zweigstelle hat.",
        "Die Fristen: Die Anzeige beim Gewerbeamt ist zum 31.12.2026 fällig. Die steuerliche Monatsfrist aus § 138 Abs. 4 AO endet rechnerisch am 31.01.2027, einem Sonntag, und damit am Montag, 01.02.2027. Ihre Buchungsbelege aus 2026 bewahrt sie mindestens bis 31.12.2034 auf. Weil sie die Restware erst im Februar abverkauft, endet ihre unternehmerische Tätigkeit für die Umsatzsteuer erst dann.",
      ],
    },
    {
      heading: "Nach der Abmeldung: Finanzamt, Umsatzsteuer, Unterlagen",
      body: [
        "Das Gewerbeamt gibt die Abmeldung weiter, unter anderem an das Finanzamt, die IHK oder Handwerkskammer, die Berufsgenossenschaft und bei eingetragenen Unternehmen an das Registergericht (§ 14 Abs. 8 GewO). Erledigt ist damit nur die Mitteilung. Die Steuererklärungen für das letzte Jahr gibst du weiter ab.",
        "Bei der Umsatzsteuer zählt nicht das Datum der Abmeldung. Die Finanzverwaltung schreibt: „Die Unternehmereigenschaft endet mit dem letzten Tätigwerden. Der Zeitpunkt der Einstellung oder Abmeldung eines Gewerbebetriebs ist unbeachtlich“ (UStAE 2.6 Abs. 6). Wer nach der Abmeldung noch Restware oder Inventar verkauft, ist insoweit weiter Unternehmer. Endet die Tätigkeit mitten im Jahr, ist die Umsatzsteuererklärung binnen eines Monats nach Ablauf des verkürzten Zeitraums fällig (§ 18 Abs. 3 Satz 2 UStG). Kleinunternehmer sind von dieser Erklärungspflicht befreit (§ 19 Abs. 1 Satz 2 UStG).",
        "Bei der Einkommensteuer gilt die Aufgabe des Gewerbebetriebs als Veräußerung (§ 16 Abs. 3 EStG). Was du behältst, etwa Laptop, Fahrzeug oder Restware, wird mit dem gemeinen Wert angesetzt. Unterlagen hebst du weiter auf: Bücher und Jahresabschlüsse zehn Jahre, Buchungsbelege acht Jahre, Geschäftsbriefe sechs Jahre (§ 147 Abs. 3 AO).",
      ],
    },
    {
      heading: "Online-Händler: OSS, LUCID und WEEE mit abmelden",
      body: [
        "Wer online verkauft, hat meist mehr Registrierungen als den Gewerbeschein. Vom One-Stop-Shop meldest du dich beim Bundeszentralamt für Steuern ab, spätestens am zehnten Tag des Monats nach dem Ende der Leistungen; für die Zeiträume davor gibst du weiter Erklärungen ab. Die USt-IdNr. endet, wenn du das beim BZSt beantragst oder das Finanzamt dein Unternehmen nicht mehr umsatzsteuerlich führt.",
        "Im Verpackungsregister LUCID teilst du die dauerhafte Aufgabe der Herstellertätigkeit unverzüglich mit (§ 6 Abs. 1 Satz 2 VerpackDG, das am 12. August 2026 das Verpackungsgesetz abgelöst hat). Das geht nur im Portal selbst, ein Brief an die Zentrale Stelle ist nicht wirksam, und eine beendete Registrierung lässt sich nicht reaktivieren. Bei Elektrogeräten beantragst du im Portal der stiftung ear die Aufhebung der Registrierung, frühestens zwei Monate im Voraus und nicht rückwirkend.",
      ],
    },
    {
      heading: "UG und GmbH: Die Gewerbeabmeldung löst die Gesellschaft nicht auf",
      body: [
        "Bei Einzelunternehmen endet mit Abmeldung und letzter Steuererklärung der Betrieb. Eine UG oder GmbH besteht dagegen weiter, bis sie im Handelsregister gelöscht ist. Der Weg dorthin: Auflösung zum Register anmelden und die Gläubiger öffentlich aufrufen (§ 65 GmbHG), frühestens ein Jahr nach dem Aufruf das Vermögen verteilen (§ 73 Abs. 1 GmbHG) und den Schluss der Liquidation anmelden (§ 74 GmbHG). Ein eingetragener Kaufmann meldet das Erlöschen der Firma an (§ 31 Abs. 2 HGB).",
        "Wer nur die Rechtsform wechselt, etwa vom Einzelunternehmen zur UG, meldet das alte Gewerbe mit dem GewA 3 ab und das neue mit dem GewA 1 an. Welche Form zu dir passt, klärt unser Rechtsform-Check; was Notar, Register und Gewerbeamt zusammen kosten, rechnet der Gründungskosten-Rechner.",
      ],
    },
    {
      heading: "Typische Fehler bei der Gewerbeabmeldung",
      body: [
        "1. Beim Umzug in eine andere Stadt doppelt zum Amt gehen: Seit November 2025 reicht die Anmeldung am neuen Ort. 2. In Feld 20 das Datum des Ausfüllens eintragen statt den Tag der Aufgabe. 3. Die Abmeldung liegen lassen: Wer nicht rechtzeitig anzeigt, riskiert eine Geldbuße bis 1.000 Euro (§ 146 GewO), und die Behörde kann von Amts wegen abmelden. 4. Glauben, mit der Abmeldung sei auch die Umsatzsteuer erledigt, obwohl noch Ware verkauft wird. 5. Belege wegwerfen, obwohl die Aufbewahrungsfristen laufen. 6. LUCID per Brief kündigen oder die Registrierung zu früh beenden. 7. Als GbR nur einen Vordruck abgeben: Jeder geschäftsführende Gesellschafter füllt einen eigenen aus.",
      ],
    },
    {
      heading: "Betrieb im EU-Ausland schließen: Frankreich, Italien, Spanien",
      body: [
        "Der GewA 3 gilt nur für Betriebe in Deutschland. Wer aus einem anderen EU-Staat heraus nur vorübergehend in Deutschland tätig war, musste hier gar keine Gewerbeanzeige erstatten und meldet auch nichts ab (§ 4 Abs. 1 GewO). Hast du im Ausland eine eigene Niederlassung, gelten die dortigen Fristen: In Frankreich erklärst du die Einstellung binnen 30 Tagen über den Guichet des formalités des entreprises. In Italien reichst du das Modell AA9/12 binnen 30 Tagen bei der Agenzia delle Entrate ein. In Spanien gibst du die Abmeldung mit dem Modelo 036 binnen eines Monats bei der Agencia Tributaria ab.",
      ],
    },
  ],
  links: [
    { to: "/tools/gewerbeanmeldung-wizard", label: "Gewerbeanmeldung (GewA 1) richtig ausfüllen" },
    { to: "/rechtsform-finden", label: "Rechtsform finden: Einzelunternehmen, UG oder GmbH?" },
    { to: "/gruendungskosten-rechner", label: "Gründungskosten-Rechner für UG und GmbH" },
    { to: "/ratgeber/ug-oder-gmbh", label: "UG oder GmbH: der Vergleich" },
    { to: "/ratgeber/kleingewerbe-anmelden", label: "Kleingewerbe anmelden: Ablauf, Kosten, Fristen" },
    { to: "/tools/gewerbe-check", label: "Gewerbe oder Freiberuf? Der Gewerbe-Check" },
    { to: "/tools/steuerkalender", label: "Steuerkalender für Selbstständige" },
    { to: "/tools/ust-voranmeldung", label: "USt-Voranmeldung in ELSTER Schritt für Schritt" },
    { to: "/ratgeber/oss-anmeldung", label: "One-Stop-Shop: Anmeldung und Pflichten" },
    { to: "/ratgeber/lucid-verpackungsregister-anmelden", label: "LUCID: Verpackungsregister anmelden" },
    { to: "/guides/weee-registrierung", label: "WEEE-Registrierung bei der stiftung ear" },
    { to: "/vorlagen/austritt-gbr-vereinbarung", label: "Vorlage: Austritt aus der GbR" },
  ],
  quellen: [
    { label: "§ 14 GewO – Anzeigepflicht (Aufgabe, Verlegung, Weitergabe der Daten)", url: Q.gewo14 },
    { label: "§ 1 GewAnzV – welcher Vordruck für welche Anzeige", url: Q.gewanzv1 },
    { label: "§ 2 GewAnzV – elektronische Gewerbeanzeige", url: Q.gewanzv2 },
    { label: "Anlage 3 GewAnzV – Vordruck GewA 3 (Fassung BGBl. 2024 I Nr. 411)", url: Q.anlage3 },
    { label: "§ 15 GewO – Empfangsbescheinigung innerhalb dreier Tage", url: Q.gewo15 },
    { label: "§ 146 GewO – Ordnungswidrigkeiten, Geldbuße bis 1.000 Euro", url: Q.gewo146 },
    { label: "§ 4 GewO – grenzüberschreitende Dienstleistungen aus EU und EWR", url: Q.gewo4 },
    { label: "Landeshauptstadt München: Gewerbe-Abmeldung (35 Euro; Änderung zum 1. November 2025; Vollmacht)", url: Q.muenchen },
    { label: "Stadt Münster: Gewerbemeldungen (Aufgabe gebührenfrei; Änderung zum 1. November 2025)", url: Q.muenster },
    { label: "service.berlin.de: Gewerbe – Abmeldung (gebührenfrei; online mit oder ohne BundID)", url: Q.berlin },
    { label: "hamburg.de: Gewerbe abmelden (Unterlagen, Vollmacht, Gebühren, Dauer)", url: Q.hamburg },
    { label: "Bundesportal: Leistung „Gewerbe abmelden“ mit Ortsauswahl", url: Q.bund },
    { label: "§ 138 AO – Mitteilung von Verlegung und Aufgabe, Monatsfrist", url: Q.ao138 },
    { label: "§ 108 AO – Fristen und Termine", url: Q.ao108 },
    { label: "§ 147 AO – Aufbewahrungsfristen", url: Q.ao147 },
    { label: "§ 16 UStG – verkürzter Besteuerungszeitraum", url: Q.ustg16 },
    { label: "§ 18 UStG – Steueranmeldung binnen eines Monats", url: Q.ustg18 },
    { label: "§ 19 UStG – Kleinunternehmer", url: Q.ustg19 },
    { label: "BMF, Amtliche Umsatzsteuer-Handausgabe 2024: UStAE 2.6 Beginn und Ende der Unternehmereigenschaft", url: Q.ustae26 },
    { label: "§ 16 EStG – Aufgabe des Gewerbebetriebs", url: Q.estg16 },
    { label: "§ 31 HGB – Erlöschen der Firma", url: Q.hgb31 },
    { label: "§ 65 GmbHG – Anmeldung der Auflösung, Gläubigeraufruf", url: Q.gmbhg65 },
    { label: "§ 73 GmbHG – Sperrjahr", url: Q.gmbhg73 },
    { label: "§ 28a SGB IV – Meldepflicht bei Ende der Beschäftigung", url: Q.sgb28a },
    { label: "BZSt: One-Stop-Shop, EU-Regelung (Abmeldung bis zum zehnten Tag des Folgemonats)", url: Q.bzstOss },
    { label: "BZSt: FAQ zur USt-IdNr. (Ende der Gültigkeit)", url: Q.bzstUstId },
    { label: "§ 6 VerpackDG – Registrierung, Mitteilung der Aufgabe", url: Q.verpackdg6 },
    { label: "Zentrale Stelle Verpackungsregister: Registrierung ändern oder beenden", url: Q.zsvr },
    { label: "§ 6 ElektroG – Registrierung, Mitteilung der Aufgabe", url: Q.elektrog6 },
    { label: "stiftung ear: Beendigung der Registrierung", url: Q.ear },
    { label: "Frankreich: entreprendre.service-public.gouv.fr – cessation d’activité de l’entrepreneur individuel", url: Q.fr },
    { label: "Italien: Agenzia delle Entrate – Modell AA9/12, variare o chiudere la partita IVA", url: Q.it },
    { label: "Spanien: Agencia Tributaria – declaración de baja, Modelo 036", url: Q.es },
  ],
  stand: GEWA3_STAND,
  seo: {
    title: "Gewerbe abmelden: Formular GewA 3 ausfüllen | GründerX",
    description:
      "Gewerbe abmelden mit dem amtlichen Formular GewA 3: kostenlos als PDF ausfüllen, mit Entscheider für Umzug und Rechtsformwechsel, Fristen und Checkliste.",
    keywords:
      "gewerbe abmelden formular, gewerbe abmelden, gewerbeabmeldung formular, gewa 3, gewa3 pdf, gewerbe abmelden online, gewerbe abmelden kosten, kleingewerbe abmelden, gewerbe abmelden umzug, gewerbe ummelden oder abmelden",
    faqs: [
      {
        q: "Welches Formular brauche ich, um mein Gewerbe abzumelden?",
        a: "Den Vordruck GewA 3 (Gewerbe-Abmeldung). Er ist als Anlage 3 der Gewerbeanzeigeverordnung bundesweit einheitlich und gilt für die Aufgabe des Betriebs, den Wechsel der Rechtsform, die Übergabe und den Austritt als Gesellschafter. Für Umzug innerhalb der Gemeinde, Namensänderung oder eine neue Tätigkeit gilt der GewA 2.",
      },
      {
        q: "Was kostet es, ein Gewerbe abzumelden?",
        a: "Das bestimmt die Gemeinde. Laut den Amtsseiten (Stand 26.11.2026) ist die Abmeldung in Berlin und Münster gebührenfrei, Hamburg stellt die erste Bescheinigung kostenlos aus und München nennt 35 Euro. Die Gebühr deiner Gemeinde steht auf ihrer Website.",
      },
      {
        q: "Bis wann muss ich mein Gewerbe abmelden?",
        a: "Gleichzeitig mit der Aufgabe des Betriebs (§ 14 Abs. 1 GewO). Wer die Anzeige nicht oder nicht rechtzeitig erstattet, handelt ordnungswidrig; die Geldbuße kann bis zu 1.000 Euro betragen (§ 146 GewO). Steht die Aufgabe eindeutig fest, kann die Behörde auch von Amts wegen abmelden.",
      },
      {
        q: "Muss ich mein Gewerbe abmelden, wenn ich in eine andere Stadt ziehe?",
        a: "Nein. Bei der Verlegung in eine andere Gemeinde zeigst du das nur noch der neuen Gemeinde an, die die Daten an die bisherige weitergibt (§ 14 Abs. 1 Satz 3 GewO). München und Münster nennen dafür den 1. November 2025 als Stichtag. Du füllst am neuen Ort den GewA 1 aus und kreuzt „Verlegung des Betriebs aus einem anderen Meldebezirk“ an.",
      },
      {
        q: "Kann ich mein Gewerbe online abmelden?",
        a: "In vielen Gemeinden ja. Die Gewerbeanzeigeverordnung lässt die elektronische Anzeige zu; die Unterschrift entfällt dann. Berlin bietet die Online-Abmeldung mit oder ohne BundID an, München über die BayernID. Ob deine Gemeinde das anbietet, zeigt das Bundesportal nach Auswahl deines Ortes.",
      },
      {
        q: "Muss ich dem Finanzamt die Gewerbeabmeldung extra melden?",
        a: "Die Mitteilung läuft über die Gemeinde: Das Gewerbeamt gibt die Daten an das Finanzamt weiter (§ 14 Abs. 8 GewO, § 138 Abs. 1 AO). Deine Steuererklärungen für das letzte Jahr gibst du trotzdem ab. Bei der Umsatzsteuer endet deine Unternehmereigenschaft erst mit dem letzten Tätigwerden, nicht mit der Abmeldung.",
      },
      {
        q: "Kann ich mein Gewerbe ruhen lassen, statt es abzumelden?",
        a: "Eine eigene Anzeige für das Ruhen kennt § 14 GewO nicht; anzuzeigen sind Beginn, Verlegung, Änderung und Aufgabe. Solange das Gewerbe angemeldet bleibt, laufen deine steuerlichen Pflichten weiter. Ob eine längere Pause schon als Aufgabe gilt, klärst du mit deinem Gewerbeamt.",
      },
      {
        q: "Kann jemand anderes mein Gewerbe für mich abmelden?",
        a: "Ja, mit Vollmacht. Hamburg verlangt eine schriftlich bevollmächtigte und ausgewiesene Person, München eine formlose Vollmacht mit den Ausweisen von dir und der bevollmächtigten Person. Frag bei deiner Gemeinde nach, was sie sehen will.",
      },
    ],
  },
};
