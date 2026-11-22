// Rechen- und Entscheidungslogik für die Relevanz-Tools 2026/2027
// (KI-Kennzeichnung, E-Rechnung, Künstlersozialabgabe). Stand 22.11.2026.
// Jede Regel trägt die Norm, aus der sie stammt. Keine Bußgelder, keine
// Auslegung über den Wortlaut hinaus.

/* ------------------------------------------------------------ KI-Kennzeichnung */

export type KiRolle = "anbieter" | "betreiber" | "privat";
export type KiInhalt = "chatbot" | "text" | "bild" | "video" | "stimme" | "emotion";

export type KiEingabe = {
  rolle: KiRolle;
  inhalte: KiInhalt[];
  /** Anbieter: Tool war schon vor dem 02.08.2026 auf dem Markt. */
  vorStichtag?: boolean;
  /** Betreiber, Bild/Video/Stimme: zeigt echte Personen, Orte, Gegenstände oder Ereignisse und könnte für echt gehalten werden. */
  deepfake?: boolean;
  /** Betreiber, Deepfake: offensichtlich künstlerisch, kreativ, satirisch oder fiktional. */
  kunst?: boolean;
  /** Betreiber, Text: wird veröffentlicht, um die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse zu informieren. */
  textOeffentlich?: boolean;
  /** Betreiber, Text: von einem Menschen geprüft, jemand trägt die redaktionelle Verantwortung. */
  redaktion?: boolean;
};

export type KiPflicht = {
  inhalt: KiInhalt;
  stufe: "ja" | "eingeschraenkt" | "nein" | "anbieter" | "offen";
  titel: string;
  was: string;
  grundlage: string;
  ab?: string; // ISO
  baustein?: string;
};

export const KI_GELTUNG = "2026-08-02";
export const KI_NACHFRIST = "2026-12-02";

const BAUSTEIN: Partial<Record<KiInhalt, string>> = {
  chatbot: "Du schreibst mit einem KI-Assistenten. Die Antworten werden automatisch erzeugt.",
  text: "Dieser Text wurde mit KI erstellt.",
  bild: "Mit KI erzeugt.",
  video: "Dieses Video wurde mit KI erzeugt.",
  stimme: "Diese Stimme wurde mit KI erzeugt.",
  emotion: "Hier läuft ein KI-System, das Emotionen erkennt bzw. Personen biometrisch einordnet.",
};

const NAME: Record<KiInhalt, string> = {
  chatbot: "Chatbot oder KI-Assistent",
  text: "Texte",
  bild: "Bilder",
  video: "Videos",
  stimme: "Stimmen und Audio",
  emotion: "Emotionserkennung oder biometrische Kategorisierung",
};

export function kiPflichten(e: KiEingabe): KiPflicht[] {
  const out: KiPflicht[] = [];
  for (const inhalt of e.inhalte) {
    const titel = NAME[inhalt];
    if (e.rolle === "privat") {
      out.push({ inhalt, stufe: "nein", titel, was: "Wer KI nur privat und nicht beruflich nutzt, ist kein Betreiber im Sinne der KI-Verordnung. Die Pflichten aus Art. 50 treffen dich dann nicht.", grundlage: "Art. 3 Nr. 4 KI-VO" });
      continue;
    }
    if (e.rolle === "anbieter") {
      if (inhalt === "chatbot") {
        out.push({ inhalt, stufe: "ja", titel, was: "Menschen, die mit deinem System sprechen oder schreiben, müssen erfahren, dass sie mit einer KI interagieren. Ausnahme: Es ist für eine verständige Person aus den Umständen offensichtlich.", grundlage: "Art. 50 Abs. 1 KI-VO", ab: KI_GELTUNG, baustein: BAUSTEIN.chatbot });
      } else if (inhalt === "emotion") {
        out.push({ inhalt, stufe: "nein", titel, was: "Die Hinweispflicht bei Emotionserkennung trifft den Betreiber, also wer das System einsetzt. Setzt du es selbst ein, gilt für dich die Betreiber-Pflicht.", grundlage: "Art. 50 Abs. 3 KI-VO" });
      } else {
        const ab = e.vorStichtag ? KI_NACHFRIST : KI_GELTUNG;
        out.push({
          inhalt, stufe: "ja", titel,
          was: "Was dein System erzeugt, muss maschinenlesbar gekennzeichnet und als künstlich erzeugt oder manipuliert erkennbar sein. Die technische Lösung soll, soweit technisch möglich, wirksam, interoperabel, belastbar und zuverlässig sein. Ausnahme: Das System unterstützt nur die Standardbearbeitung oder verändert die Eingaben bzw. deren Bedeutung nicht wesentlich.",
          grundlage: e.vorStichtag ? "Art. 50 Abs. 2 KI-VO, Nachfrist nach Art. 111 Abs. 4" : "Art. 50 Abs. 2 KI-VO",
          ab,
        });
      }
      continue;
    }
    // Betreiber
    if (inhalt === "chatbot") {
      out.push({ inhalt, stufe: "anbieter", titel, was: "Den Hinweis „Du sprichst mit einer KI“ schuldet der Anbieter des Chatbots. Läuft der Chatbot unter deinem Namen oder deiner Marke, prüf, ob du selbst Anbieter bist.", grundlage: "Art. 50 Abs. 1, Art. 3 Nr. 3 KI-VO", baustein: BAUSTEIN.chatbot });
    } else if (inhalt === "emotion") {
      out.push({ inhalt, stufe: "ja", titel, was: "Die betroffenen Personen müssen erfahren, dass ein solches System läuft. Personenbezogene Daten dabei nur nach DSGVO verarbeiten.", grundlage: "Art. 50 Abs. 3 KI-VO", ab: KI_GELTUNG, baustein: BAUSTEIN.emotion });
    } else if (inhalt === "text") {
      if (e.textOeffentlich === undefined || (e.textOeffentlich && e.redaktion === undefined)) {
        out.push({ inhalt, stufe: "offen", titel, was: "Beantworte die Fragen unter „Die Details“, dann steht hier dein Ergebnis.", grundlage: "Art. 50 Abs. 4 Satz 4 und 5 KI-VO" });
      } else if (!e.textOeffentlich) {
        out.push({ inhalt, stufe: "nein", titel, was: "Für KI-Texte, die nicht zur Information der Öffentlichkeit über Themen von öffentlichem Interesse veröffentlicht werden, sieht Art. 50 keine Kennzeichnung durch dich vor.", grundlage: "Art. 50 Abs. 4 Satz 4 und 5 KI-VO" });
      } else if (e.redaktion) {
        out.push({ inhalt, stufe: "nein", titel, was: "Keine Kennzeichnung nötig: Ein Mensch hat den Text geprüft oder redigiert, und jemand trägt die redaktionelle Verantwortung für die Veröffentlichung.", grundlage: "Art. 50 Abs. 4 Satz 4 und 5 KI-VO" });
      } else {
        out.push({ inhalt, stufe: "ja", titel, was: "Offenlegen, dass der Text künstlich erzeugt oder manipuliert wurde.", grundlage: "Art. 50 Abs. 4 Satz 4 und 5 KI-VO", ab: KI_GELTUNG, baustein: BAUSTEIN.text });
      }
    } else if (e.deepfake === undefined || (e.deepfake && e.kunst === undefined)) {
      out.push({ inhalt, stufe: "offen", titel, was: "Beantworte die Fragen unter „Die Details“, dann steht hier dein Ergebnis.", grundlage: "Art. 3 Nr. 60, Art. 50 Abs. 4 KI-VO" });
    } else if (!e.deepfake) {
      out.push({ inhalt, stufe: "nein", titel, was: "Kein Deepfake im Sinne der Verordnung: Der Inhalt ähnelt keinen echten Personen, Orten, Gegenständen oder Ereignissen so, dass man ihn für echt halten könnte. Art. 50 Abs. 4 verlangt dann von dir keine Kennzeichnung.", grundlage: "Art. 3 Nr. 60, Art. 50 Abs. 4 KI-VO" });
    } else if (e.kunst) {
      out.push({ inhalt, stufe: "eingeschraenkt", titel, was: "Bei offensichtlich künstlerischen, kreativen, satirischen oder fiktionalen Werken reicht ein Hinweis, dass solche Inhalte enthalten sind, so platziert, dass er die Darstellung nicht stört.", grundlage: "Art. 50 Abs. 4 Satz 3 KI-VO", ab: KI_GELTUNG, baustein: BAUSTEIN[inhalt] });
    } else {
      out.push({ inhalt, stufe: "ja", titel, was: "Offenlegen, dass der Inhalt künstlich erzeugt oder manipuliert wurde (Deepfake).", grundlage: "Art. 50 Abs. 4 Satz 1 KI-VO", ab: KI_GELTUNG, baustein: BAUSTEIN[inhalt] });
    }
  }
  return out;
}

/* ------------------------------------------------------------ E-Rechnung */

export const ERECHNUNG_GRENZE_2026 = 800_000;

export type ErEingabe = {
  b2bInland: boolean;
  b2c: boolean;
  ausland: boolean;
  kleinunternehmer: boolean;
  /** Gesamtumsatz 2026 im Sinne des § 19 Abs. 2 UStG. */
  umsatz2026: number;
};

export type ErErgebnis = {
  /** "ab" = Pflicht ab Datum; "befreit" = Kleinunternehmer; "keine" = keine Inlands-B2B-Rechnungen. */
  art: "ab" | "befreit" | "keine";
  ab?: string; // ISO
  /** Bis wann Papier/PDF mit Zustimmung des Empfängers noch geht (letzter Tag der Leistung). */
  papierBis?: string;
  satz: string;
  grundlagen: string[];
};

export function eRechnungPflicht(e: ErEingabe): ErErgebnis {
  if (e.kleinunternehmer)
    return { art: "befreit", satz: "Du musst keine E-Rechnungen ausstellen. Als Kleinunternehmer darfst du immer eine sonstige Rechnung schicken, also Papier oder PDF.", grundlagen: ["§ 34a Satz 4 UStDV"] };
  if (!e.b2bInland)
    return { art: "keine", satz: "Die Pflicht gilt nur für Rechnungen an andere Unternehmer im Inland. Rechnungen an Privatkunden und an Kunden im Ausland betrifft sie nicht.", grundlagen: ["§ 14 Abs. 2 Satz 2 Nr. 1 UStG"] };
  if (e.umsatz2026 > ERECHNUNG_GRENZE_2026)
    return { art: "ab", ab: "2027-01-01", papierBis: "2026-12-31", satz: "Dein Gesamtumsatz 2026 liegt über 800.000 €. Für Leistungen ab dem 01.01.2027 an Unternehmer im Inland musst du E-Rechnungen ausstellen. EDI-Verfahren mit Zustimmung des Empfängers bleiben bis 31.12.2027 erlaubt.", grundlagen: ["§ 14 Abs. 2 Satz 2 Nr. 1 UStG", "§ 27 Abs. 38 Nr. 1 bis 3 UStG"] };
  return { art: "ab", ab: "2028-01-01", papierBis: "2027-12-31", satz: "Dein Gesamtumsatz 2026 liegt bei höchstens 800.000 €. Für Leistungen bis 31.12.2027 darfst du Unternehmern im Inland noch Papier- oder PDF-Rechnungen schicken, wenn sie zustimmen. Ab 01.01.2028 musst du E-Rechnungen ausstellen.", grundlagen: ["§ 14 Abs. 2 Satz 2 Nr. 1 UStG", "§ 27 Abs. 38 Nr. 1 und 2 UStG"] };
}

/* ------------------------------------------------------------ Künstlersozialabgabe */

export const KSA_SATZ: Record<2026 | 2027, number> = { 2026: 4.9, 2027: 5.0 };
export const KSA_GRENZE = 1000;
export const KSA_VORAUS_MIN = 40;

export type KsaTyp = "verwerter" | "eigenwerbung" | "nutzung" | "keins";

export type KsaEingabe = {
  typ: KsaTyp;
  /** Entgelte 2026 an selbständige Künstler und Publizisten, ohne gesondert ausgewiesene USt. */
  summe2026: number;
  /** Bei "nutzung": Entgelte fallen nur bei höchstens drei Veranstaltungen im Jahr an. */
  nurVeranstaltungen?: boolean;
};

export type KsaErgebnis = {
  pflichtig: boolean;
  grund: string;
  abgabe2026: number;
  /** Monatliche Vorauszahlung ab März 2027 (0, wenn sie entfällt). */
  vorauszahlung2027: number;
  vorauszahlungEntfaellt: boolean;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

export function ksaCheck(e: KsaEingabe): KsaErgebnis {
  const summe = Math.max(0, e.summe2026 || 0);
  let pflichtig = false;
  let grund: string;
  if (e.typ === "keins") grund = "Du beauftragst keine selbständigen Künstler oder Publizisten. Damit fällt keine Abgabe an.";
  else if (summe <= 0) grund = "Ohne Entgelte an selbständige Künstler oder Publizisten fällt keine Abgabe an.";
  else if (e.typ === "verwerter") {
    pflichtig = true;
    grund = "Dein Unternehmen gehört zu den typischen Verwertern nach § 24 Abs. 1 KSVG. Dort gibt es keine 1.000-€-Grenze.";
  } else if (e.typ === "nutzung" && e.nurVeranstaltungen) {
    grund = "Entgelte bei höchstens drei Veranstaltungen im Jahr lösen nach § 24 Abs. 2 Satz 3 Nr. 1 KSVG keine Abgabe aus.";
  } else if (summe > KSA_GRENZE) {
    pflichtig = true;
    grund = "Deine Entgelte 2026 liegen über 1.000 €. Damit bist du nach § 24 Abs. 2 KSVG abgabepflichtig.";
  } else {
    grund = "Deine Entgelte 2026 liegen bei höchstens 1.000 €. Unter dieser Grenze besteht nach § 24 Abs. 2 Satz 2 KSVG keine Abgabepflicht.";
  }
  const abgabe2026 = pflichtig ? r2((summe * KSA_SATZ[2026]) / 100) : 0;
  const voraus = pflichtig ? r2(((summe / 12) * KSA_SATZ[2027]) / 100) : 0;
  const entfaellt = voraus <= KSA_VORAUS_MIN;
  return { pflichtig, grund, abgabe2026, vorauszahlung2027: entfaellt ? 0 : voraus, vorauszahlungEntfaellt: pflichtig && entfaellt };
}
