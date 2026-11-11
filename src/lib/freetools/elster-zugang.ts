import { KeyRound } from "lucide-react";
import { type ToolConfig, type ToolData, s, b, DISCLAIMER } from "./types";

// ELSTER-Zertifikat / ELSTER-Zugang beantragen (07.11.2026): Kontotyp, Login-Option,
// Identitätsprüfung und Zeitplan für Gründer – plus Zugangserneuerung bei Verlust/Ablauf.
// Belege (alle am 07.11.2026 live abgerufen):
// - ELSTER-Hilfe „Registrierung“ (help_registrierung): Kontotypen „Für eine Privatperson“ (IdNr, Geburtsdatum,
//   E-Mail, Benutzername) / „Für eine Organisation“ (Bundesland, Steuernummer der Organisation, Ansprechpartner);
//   „Sofern es sich bei Ihrem Einzelunternehmen um keine Kapitalgesellschaft handelt und Sie keine Angestellten
//   beschäftigen, empfehlen wir den Kontotyp ‚Für eine Privatperson‘“; Arbeitgeberfunktionen ELStAM: Registrierung
//   mit Steuernummer empfohlen; Identitätsprüfung per Brief (Aktivierungs-ID 18-stellig per E-Mail, Aktivierungs-Code
//   per Post an die Adresse bei Meldebehörde bzw. Finanzamt, Vollmachten nicht berücksichtigt, Zustellung „einige
//   Tage“) oder online (Nect Wallet-App bzw. AusweisApp mit Ausweis-PIN, „noch am selben Tag“); Registrierung nur mit
//   E-Mail: nur Fragebogen zur steuerlichen Erfassung, nur Zertifikatsdatei, Aktivierungs-ID und -Code beide per
//   E-Mail; Passwort 10–128 Zeichen, Buchstaben und Ziffern; Benutzername max. 16 Zeichen; Zertifikatsdatei .pfx
//   nur speichern, nicht öffnen/importieren; Fehlercode 080005207 = Konto zur IdNr existiert → Zugangserneuerung;
//   falsches Geburtsdatum → kein Aktivierungsbrief; Zugangserneuerung mit Sperren des alten Zertifikats.
// - ELSTER-FAQ (help): Mein ELSTER kostenlos, Zertifikatsdatei ohne Kosten, Sicherheitsstick/Signaturkarte kosten;
//   Zertifikatsdatei und Sicherheitsstick 3 Jahre gültig, Benachrichtigung mehrere Wochen vorher, Login verlängert;
//   nach Ablauf Zugangserneuerung; Mindestalter 18; Privatperson max. 20 Abrufberechtigungen; Personalausweis:
//   kein Aktivierungsbrief, Konto in wenigen Minuten; Steuerkontoabfrage nur Signaturkarte.
// - ELSTER-Infoseite ElsterSecure: Login per App, „Ein Zertifikat wird bei dieser Art des Logins nicht mehr benötigt.“
// - LfSt Rheinland-Pfalz, Klickanleitung Registrierung mit Zertifikatsdatei, Stand 09/2025: Organisationszertifikat
//   beruht auf der Steuernummer, Bescheinigungsabruf damit nicht möglich; Verifizierungscode 6-stellig, Browserfenster
//   offen lassen; Zertifikatsdatei landet im Download-Ordner, Sicherung z. B. auf USB-Stick.
// - Mein Unternehmenskonto, Zertifikatsleitfaden 12/2024 (v1.9): Organisationszertifikat setzt deutsche Steuernummer
//   voraus; Aktivierungsbrief „in der Regel ca. 5 Werktage“; Solo-Selbständige können sich dort auch mit dem
//   persönlichen Zertifikat authentifizieren.
// - sicherheitsstick.de (07.11.2026): Sicherheitsstick einmalig 61,42 € inkl. MwSt.
// - § 138 Abs. 1b und Abs. 4 AO: Fragebogen elektronisch, innerhalb eines Monats.
export const ELSTER_STAND = "07.11.2026";

export const ELSTER_REGISTRIERUNG = "https://www.elster.de/eportal/registrierung";
export const ELSTER_AKTIVIERUNG = "https://www.elster.de/eportal/aktivierung";
export const ELSTER_HILFE_REG = "https://www.elster.de/eportal/helpGlobal?themaGlobal=help_registrierung";
export const ELSTER_FAQ = "https://www.elster.de/eportal/helpGlobal?themaGlobal=help";
export const ELSTER_SECURE = "https://www.elster.de/eportal/infoseite/elstersecure";
export const RLP_LEITFADEN =
  "https://lfst.rlp.de/fileadmin/lfst.rlp.de/ELSTER/Klickanleitungen/Leitfaden_Registrierung_mit_Zertifikatsdatei_Stand_09.2025.pdf";
export const MUK_LEITFADEN = "https://info.mein-unternehmenskonto.de/wp-content/uploads/2024/12/20241219_Zertifikatsleitfaden.pdf";
export const STICK_SHOP = "https://www.sicherheitsstick.de/";
export const STICK_PREIS = "61,42 € inkl. MwSt.";
export const IDNR_ANFORDERN = "https://www.identifikationsmerkmal.de";

export type Kontotyp = "privatperson" | "organisation" | "email";
export type LoginOption = "ElsterSecure" | "Zertifikatsdatei" | "Sicherheitsstick";
export type Identitaet = "online" | "brief" | "email";

export interface ElsterEmpfehlung {
  kontotyp: Kontotyp;
  /** Worauf das Konto beruht. */
  merkmal: "steuerliche Identifikationsnummer" | "Steuernummer der Organisation" | "nur E-Mail-Adresse";
  login: LoginOption;
  identitaet: Identitaet;
  /** Realistische Dauer bis zum ersten Login, mit Quelle. */
  dauer: string;
  gruende: string[];
  hinweise: string[];
  /** Zweites Konto, das später dazukommt (z. B. Organisation nach Erhalt der Steuernummer). */
  spaeter?: string;
}

/** Kontotyp, Login-Option und Identitätsprüfung aus den Angaben ableiten – jede Regel mit ELSTER-Beleg. */
export function elsterEmpfehlung(d: ToolData): ElsterEmpfehlung {
  const wer = s(d, "wer", "solo"); // privat | solo | solo_ma | gesellschaft
  const idnr = s(d, "idnr", "ja") !== "nein";
  const stnr = s(d, "stnr", "nein") === "ja";
  const tempo = s(d, "tempo", "egal") === "sofort";
  const ausweis = s(d, "ausweis", "nein") === "ja";
  const geraet = s(d, "geraet", "beides"); // handy | pc | beides
  const stick = b(d, "stick");

  const gruende: string[] = [];
  const hinweise: string[] = [];
  let kontotyp: Kontotyp;
  let spaeter: string | undefined;

  if (wer === "gesellschaft" || wer === "solo_ma") {
    if (stnr) {
      kontotyp = "organisation";
      gruende.push(
        wer === "gesellschaft"
          ? "Für Steuererklärungen und -anmeldungen einer GbR, OHG, KG, UG, GmbH oder eines Vereins empfiehlt ELSTER das Konto „Für eine Organisation“. Es beruht auf der Steuernummer, unter der das Unternehmen beim Finanzamt geführt wird."
          : "Du beschäftigst Angestellte: Für die Arbeitgeberfunktionen (ELStAM an-, ab-, ummelden) empfiehlt ELSTER die Registrierung mit der Steuernummer der Organisation."
      );
      hinweise.push("Mit dem Organisationskonto kannst du keine Bescheinigungen für deine private Einkommensteuererklärung abrufen (vorausgefüllte Steuererklärung). Dafür brauchst du zusätzlich ein Konto „Für eine Privatperson“ mit deiner IdNr.");
    } else if (idnr && wer === "solo_ma") {
      kontotyp = "privatperson";
      gruende.push("Du hast noch keine Steuernummer für dein Unternehmen. Starte mit dem Konto „Für eine Privatperson“ (deine IdNr): Damit gibst du den Fragebogen zur steuerlichen Erfassung ab und bekommst die Steuernummer.");
      spaeter = "Sobald die Steuernummer da ist und du Personal anmeldest: zusätzlich ein Konto „Für eine Organisation“ anlegen (ELSTER empfiehlt es für die Arbeitgeberfunktionen).";
    } else {
      kontotyp = "email";
      gruende.push("Die Gesellschaft hat noch keine Steuernummer. ELSTER bietet dafür die Registrierung „nur mit E-Mail-Adresse“ an: Damit kannst du ausschließlich den Fragebogen zur steuerlichen Erfassung ausfüllen und übermitteln – andere Formulare werden nicht angeboten.");
      spaeter = "Sobald das Finanzamt die Steuernummer erteilt hat, schaltest du das Konto über „Identifikation mit Steuernummer“ zum vollwertigen Organisationskonto frei.";
    }
  } else if (idnr) {
    kontotyp = "privatperson";
    gruende.push(
      wer === "solo"
        ? "ELSTER-Hilfe wörtlich: „Sofern es sich bei Ihrem Einzelunternehmen um keine Kapitalgesellschaft handelt und Sie keine Angestellten beschäftigen, empfehlen wir den Kontotyp ‚Für eine Privatperson‘.“ Eine Registrierung reicht für Einkommensteuer, Umsatzsteuer, Gewerbesteuer und den Fragebogen."
        : "Du gibst Erklärungen nur für dich (und ggf. deinen Partner) ab: Konto „Für eine Privatperson“ mit deiner steuerlichen Identifikationsnummer."
    );
  } else {
    kontotyp = "email";
    gruende.push("Ohne IdNr und ohne Steuernummer bleibt nur die Registrierung „nur mit E-Mail-Adresse“ – sie erlaubt ausschließlich den Fragebogen zur steuerlichen Erfassung.");
    hinweise.push(`Jede in Deutschland gemeldete Person hat eine IdNr (11 Stellen, oben links auf dem Einkommensteuerbescheid). Verloren? Beim BZSt anfordern: ${IDNR_ANFORDERN} – dann lieber mit IdNr registrieren.`);
  }

  // Login-Option
  let login: LoginOption;
  if (kontotyp === "email") {
    login = "Zertifikatsdatei";
    hinweise.push("Bei der Registrierung nur mit E-Mail bietet ELSTER ausschließlich die Login-Option Zertifikatsdatei an.");
  } else if (stick) {
    login = "Sicherheitsstick";
    hinweise.push(`Der Sicherheitsstick kostet einmalig ${STICK_PREIS} (nur über ${STICK_SHOP}) und braucht die Software ElsterAuthenticator. Das Zertifikat auf dem Stick ist 3 Jahre gültig.`);
  } else if (geraet === "pc") {
    login = "Zertifikatsdatei";
    hinweise.push("Die Zertifikatsdatei (.pfx) ist kostenlos, braucht keine zusätzliche Hardware und ist 3 Jahre gültig. Nur speichern, nicht öffnen oder in den PC importieren; Kopie z. B. auf einen USB-Stick.");
  } else {
    login = "ElsterSecure";
    hinweise.push("ElsterSecure ist die von ELSTER empfohlene Login-App (Android/iOS): QR-Code scannen, mit Gerätesperre bestätigen. Ein Zertifikat ist dabei nicht mehr nötig. Geht das Handy verloren und du hast keine zweite Login-Option, hilft nur die Zugangserneuerung – deshalb lohnt sich zusätzlich eine Zertifikatsdatei als Reserve.");
  }

  // Identitätsprüfung und Dauer
  let identitaet: Identitaet;
  let dauer: string;
  if (kontotyp === "email") {
    identitaet = "email";
    dauer = "Sofort: Verifizierungscode, Aktivierungs-ID und Aktivierungs-Code kommen alle per E-Mail, kein Brief (ELSTER-Hilfe, Registrierung nur mit E-Mail-Adresse).";
  } else if (kontotyp === "privatperson" && tempo && ausweis) {
    identitaet = "online";
    dauer = "Noch am selben Tag: Online-Identitätsprüfung mit Personalausweis über die Nect Wallet-App (ohne PIN, Selfie-Video) oder die AusweisApp (NFC-Handy oder Kartenleser, 6-stellige Ausweis-PIN). Der Brief entfällt.";
  } else {
    identitaet = "brief";
    dauer =
      kontotyp === "organisation"
        ? "Mehrere Tage: Aktivierungs-ID per E-Mail, Aktivierungs-Code per Brief an die Adresse, die das Finanzamt zur Steuernummer gespeichert hat (Vollmachten zählen nicht). ELSTER nennt „einige Tage“, der Leitfaden Mein Unternehmenskonto „in der Regel ca. 5 Werktage“."
        : "Mehrere Tage: Aktivierungs-ID (18 Stellen) per E-Mail, Aktivierungs-Code per Brief an deine Meldeadresse. ELSTER nennt „einige Tage“; plane eine Woche ein. Tipp: Rund zwei Wochen ohne Brief → beim Finanzamt nachfragen oder Registrierung wiederholen.";
    if (kontotyp === "privatperson" && tempo && !ausweis) {
      hinweise.push("Schneller ginge es nur mit Personalausweis (Online-Identitätsprüfung am selben Tag). Ohne Ausweis bleibt der Brief.");
    }
  }

  const merkmal =
    kontotyp === "privatperson" ? "steuerliche Identifikationsnummer" : kontotyp === "organisation" ? "Steuernummer der Organisation" : "nur E-Mail-Adresse";
  return { kontotyp, merkmal, login, identitaet, dauer, gruende, hinweise, spaeter };
}

function generate(d: ToolData): string {
  const e = elsterEmpfehlung(d);
  const situation = s(d, "situation", "neu"); // neu | verloren | abgelaufen | passwort
  const wer = s(d, "wer", "solo");
  const L: string[] = [];

  L.push("Dein ELSTER-Zugang: Fahrplan");
  L.push(`Stand der Regeln: ${ELSTER_STAND} (ELSTER-Hilfe, FAQ, Leitfäden der Finanzverwaltung)`);
  L.push("");

  if (situation !== "neu") {
    L.push("0. Du hast schon ein Konto: Zugangserneuerung statt Neuregistrierung");
    L.push(
      situation === "passwort"
        ? "Passwort vergessen: Über „Zugang erneuern“ bekommst du wie bei einer Registrierung neue Aktivierungsdaten – Aktivierungs-ID per E-Mail, Aktivierungs-Code per Post („einige Tage“). Am Ende setzt du ein neues Passwort."
        : situation === "abgelaufen"
          ? "Zertifikat abgelaufen: Zertifikatsdatei und Sicherheitsstick gelten 3 Jahre. Mehrere Wochen vor Ablauf warnt ELSTER per E-Mail – ein Login verlängert dann automatisch. Ist die Frist verstrichen, führst du eine Zugangserneuerung durch; Konto und Postfach bleiben erhalten."
          : "Zertifikatsdatei verloren oder Handy mit ElsterSecure weg: Mit „Zugang erneuern“ prüft ELSTER deine Identität erneut (online oder per Brief) und gibt dir eine neue Login-Option. Du kannst das alte Zertifikat dabei sperren – gesperrt bleibt gesperrt."
    );
    L.push("[ ] Nicht neu registrieren: Zur gleichen IdNr gibt es nur ein Konto. Fehlercode 080005207 beim Geburtsdatum heißt genau das – dann Zugangserneuerung.");
    L.push("[ ] Du brauchst Zugriff auf die im Konto hinterlegte E-Mail-Adresse. Fehlt er, hilft der Ansprechpartner deines Bundeslands über den ELSTER-Kontaktfinder.");
    L.push(`[ ] Einstieg: Login-Seite → „Zertifikatsdatei verloren oder Zertifikat abgelaufen?“ (${ELSTER_HILFE_REG})`);
    L.push("");
  }

  L.push("1. Dein Kontotyp");
  L.push(`Empfehlung: ${e.kontotyp === "privatperson" ? "„Für eine Privatperson“" : e.kontotyp === "organisation" ? "„Für eine Organisation“" : "Registrierung „nur mit E-Mail-Adresse“"} – Merkmal: ${e.merkmal}.`);
  for (const g of e.gruende) L.push(`- ${g}`);
  if (e.spaeter) L.push(`- Später: ${e.spaeter}`);
  L.push("");

  L.push("2. Deine Login-Option");
  L.push(`Empfehlung: ${e.login}.`);
  for (const h of e.hinweise) L.push(`- ${h}`);
  if (e.login !== "Sicherheitsstick") L.push("- Mein ELSTER selbst ist kostenlos. Kosten entstehen nur, wenn du Sicherheitsstick oder Signaturkarte willst.");
  L.push("");

  L.push("3. Identitätsprüfung und Zeitplan");
  L.push(e.dauer);
  L.push("");

  L.push("4. Vorher bereitlegen");
  if (e.kontotyp === "privatperson") {
    L.push("[ ] Steuerliche Identifikationsnummer (11 Stellen; oben links auf dem Einkommensteuerbescheid oder im IdNr-Brief des BZSt)");
    L.push("[ ] Geburtsdatum exakt wie bei der Meldebehörde – bei falschem Datum wird kein Aktivierungsbrief erzeugt, die Registrierung scheitert.");
    L.push("[ ] Meldeadresse aktuell? Der Brief geht an die Adresse der Meldebehörde, nicht an eine Vollmacht.");
  } else if (e.kontotyp === "organisation") {
    L.push("[ ] Steuernummer des Unternehmens (steht auf Bescheiden und Schreiben des Finanzamts) und das Bundesland des Finanzamts");
    L.push("[ ] Ansprechpartner mit Kontaktdaten; der Aktivierungsbrief geht an die Firmenadresse, die das Finanzamt zur Steuernummer gespeichert hat.");
  } else {
    L.push("[ ] Nur E-Mail-Adresse, Benutzername und eine Sicherheitsfrage – mehr fragt ELSTER hier nicht ab.");
  }
  L.push("[ ] Eine E-Mail-Adresse, auf die du dauerhaft Zugriff hast (keine Adresse vom Arbeitgeber oder Studium) – an sie gehen Verifizierungscode und Aktivierungs-ID.");
  L.push("[ ] Benutzername (max. 16 Zeichen; steht unverschlüsselt in ELSTER-Mails, also keine sensiblen Daten) und eine Sicherheitsfrage mit Antwort – sie wird später zum Löschen des Kontos gebraucht.");
  if (e.login === "Zertifikatsdatei" || e.login === "Sicherheitsstick") {
    L.push("[ ] Passwort ausdenken: 10 bis 128 Zeichen, Buchstaben und Ziffern. Beim Zertifikat ist das Passwort der einzige Schutz, falls die Datei kopiert wird.");
  }
  if (e.login === "ElsterSecure") L.push("[ ] Smartphone oder Tablet mit Android oder iOS; ElsterSecure aus Google Play oder dem App Store laden.");
  if (e.identitaet === "online") L.push("[ ] Personalausweis plus Nect Wallet-App – oder AusweisApp mit NFC-fähigem Handy/Kartenleser und 6-stelliger Ausweis-PIN.");
  if (e.login === "Sicherheitsstick") L.push(`[ ] Sicherheitsstick (${STICK_PREIS}) vor der Registrierung bestellen und ElsterAuthenticator installieren.`);
  L.push("[ ] Mindestalter 18 Jahre.");
  L.push("");

  L.push("5. Schritt für Schritt");
  L.push(`[ ] Schritt 1: ${ELSTER_REGISTRIERUNG} → „Benutzerkonto erstellen“ → ${e.kontotyp === "privatperson" ? "„Für eine Privatperson“" : e.kontotyp === "organisation" ? "„Für eine Organisation“" : "Variante „Mit E-Mail“ (nur bei Login-Option Zertifikatsdatei)"} wählen. Bei hoher Last landest du zuerst im Warteraum von ELSTER – einfach warten.`);
  L.push(`[ ] Schritt 2: ${e.kontotyp === "privatperson" ? "IdNr, Geburtsdatum, E-Mail, Benutzername" : e.kontotyp === "organisation" ? "Bundesland, Steuernummer, Ansprechpartner, Benutzername" : "E-Mail, Benutzername, Sicherheitsfrage"} eingeben, Sicherheitsfrage beantworten, Captcha lösen. Angaben prüfen und bestätigen.`);
  L.push("[ ] Schritt 3: E-Mail mit 6-stelligem Verifizierungscode abwarten (auch Spam-Ordner prüfen, Absender portal@elster.de). Browserfenster offen lassen – sonst beginnst du von vorn. Code eingeben.");
  if (e.identitaet === "online") {
    L.push("[ ] Schritt 4: „Online-Identitätsprüfung“ wählen: Nect Wallet-App (Ausweis fotografieren, kurzes Selfie-Video mit zwei vorgelesenen Wörtern) oder Online-Ausweisfunktion mit AusweisApp und PIN. Danach geht es direkt weiter.");
  } else if (e.identitaet === "brief") {
    L.push("[ ] Schritt 4: „Identitätsprüfung per Brief“: Aktivierungs-ID (18 Stellen) kommt per E-Mail, Aktivierungs-Code per Post. Beides aufheben; die Aktivierungsdaten gelten nur für die in der E-Mail genannte Frist.");
    L.push(`[ ] Schritt 5: Sobald Brief und E-Mail da sind: Link in der E-Mail oder ${ELSTER_AKTIVIERUNG} öffnen, Aktivierungs-ID und Aktivierungs-Code eingeben.`);
  } else {
    L.push("[ ] Schritt 4: Zweite E-Mail mit Aktivierungs-ID und Aktivierungs-Code abwarten und beides auf der Aktivierungsseite eingeben.");
  }
  const n = e.identitaet === "brief" ? 6 : 5;
  if (e.login === "ElsterSecure") {
    L.push(`[ ] Schritt ${n}: Login-Option „ElsterSecure“ wählen, App öffnen, den QR-Code im Browser scannen und mit Face ID, Fingerabdruck oder Geräte-PIN bestätigen. Fertig – der erste Login läuft direkt über die App.`);
  } else if (e.login === "Zertifikatsdatei") {
    L.push(`[ ] Schritt ${n}: Login-Option „Zertifikatsdatei“ (bei ELSTER unter „Andere Login-Optionen“) wählen, Passwort festlegen, „Jetzt erstellen“ und die .pfx-Datei herunterladen. Sie landet im Download-Ordner – verschiebe sie an einen festen Ort und sichere eine Kopie (USB-Stick). Nicht per Doppelklick öffnen.`);
    L.push(`[ ] Schritt ${n + 1}: Erster Login mit Zertifikatsdatei und Passwort – damit prüft ELSTER, dass das Speichern geklappt hat. Datenschutzhinweis bestätigen.`);
  } else {
    L.push(`[ ] Schritt ${n}: Login-Option „Sicherheitsstick“ wählen, Stick anstecken, über den ElsterAuthenticator das Zertifikat auf den Stick schreiben und ein Passwort setzen. Erster Login über „Weiter mit ElsterAuthenticator“.`);
  }
  L.push("");

  L.push("6. Direkt danach erledigen");
  if (wer !== "privat") {
    L.push("[ ] Fragebogen zur steuerlichen Erfassung innerhalb eines Monats nach Start elektronisch abgeben (§ 138 Abs. 1b und Abs. 4 AO) – Begleiter: /tools/fse-wizard, Klickanleitung: /guides/elster-fse-fillout");
    L.push("[ ] Im Fragebogen das Feld zur USt-IdNr ankreuzen, wenn du mit EU-Unternehmen Geschäfte machst – Details: /ust-id-beantragen");
    L.push("[ ] Die Steuernummer kommt danach per Post vom Finanzamt – Ablauf und Dauer: /ratgeber/steuernummer-beantragen");
    L.push("[ ] Fristen für USt-Voranmeldung und Vorauszahlungen eintragen: /tools/steuerkalender, Vordruck erklärt: /tools/ust-voranmeldung");
  } else {
    L.push("[ ] Bescheinigungen abrufen (vorausgefüllte Steuererklärung) – beim Konto „Für eine Privatperson“ direkt möglich.");
  }
  L.push("[ ] Zertifikat im Blick behalten: Zertifikatsdatei und Sicherheitsstick gelten 3 Jahre; ELSTER erinnert Wochen vorher per E-Mail, ein Login verlängert automatisch.");
  if (wer === "gesellschaft" || wer === "solo_ma") {
    L.push("[ ] Förder- und Behördenportale (Mein Unternehmenskonto): Login mit dem ELSTER-Organisationszertifikat; Solo-Selbständige ohne Organisationszertifikat können dort auch das persönliche Zertifikat nutzen.");
  }
  L.push("");

  L.push("7. Typische Fehler, die den Zugang verzögern");
  L.push("- Falsches oder erfundenes Geburtsdatum → kein Aktivierungsbrief, Registrierung wiederholen.");
  L.push("- Tippfehler in der E-Mail-Adresse → keine Aktivierungs-ID. Spam-Ordner prüfen, portal@elster.de erlauben.");
  L.push("- Browserfenster während des Verifizierungscodes geschlossen → von vorn beginnen.");
  L.push("- Zweites Konto zur gleichen IdNr versucht (Fehlercode 080005207) → Zugangserneuerung statt Registrierung.");
  L.push("- Zertifikatsdatei doppelt geklickt oder importiert → ELSTER verlangt: nur speichern. Login läuft über Dateiauswahl + Passwort im Browser.");
  L.push("- Ablaufwarnung ignoriert → nach 3 Jahren nur noch Zugangserneuerung mit neuem Brief.");
  L.push("- Organisationskonto fürs Private genutzt → kein Bescheinigungsabruf für die eigene Einkommensteuer.");
  L.push("");

  L.push(`Quellen (Stand ${ELSTER_STAND}): ELSTER-Hilfe Registrierung (${ELSTER_HILFE_REG}); ELSTER-FAQ (${ELSTER_FAQ}); ElsterSecure (${ELSTER_SECURE}); LfSt RLP Klickanleitung 09/2025 (${RLP_LEITFADEN}); Mein Unternehmenskonto Zertifikatsleitfaden 12/2024 (${MUK_LEITFADEN}); Sicherheitsstick-Shop (${STICK_SHOP}); § 138 AO.`);
  L.push("");
  L.push(DISCLAIMER);
  return L.join("\n");
}

export const elsterZugangConfig: ToolConfig = {
  slug: "elster-zertifikat-beantragen",
  shortTitle: "ELSTER-Zertifikat beantragen",
  documentName: "ELSTER-Zugangs-Fahrplan",
  icon: KeyRound,
  accent: "from-emerald-800 to-teal-600",
  badge: "Kostenlos bei ELSTER · Stand 07.11.2026",
  heroTitle: "ELSTER-Zertifikat beantragen: Welcher Zugang passt zu dir?",
  heroSubtitle:
    "In 2 Minuten weißt du, ob du dich „Für eine Privatperson“ oder „Für eine Organisation“ registrierst, ob ElsterSecure, Zertifikatsdatei oder Sicherheitsstick zu dir passt, wie lange der Aktivierungsbrief dauert und was du vorher bereitlegen musst – inklusive Zugangserneuerung bei verlorenem oder abgelaufenem Zertifikat.",
  resultFilename: "elster-zugang-fahrplan",
  format: "anleitung",
  steps: [
    {
      title: "Deine Situation",
      fields: [
        {
          name: "situation",
          label: "Was trifft zu?",
          type: "radio",
          required: true,
          options: [
            { value: "neu", label: "Ich habe noch kein ELSTER-Konto" },
            { value: "verloren", label: "Zertifikatsdatei verloren oder Handy mit ElsterSecure weg" },
            { value: "abgelaufen", label: "Mein Zertifikat ist abgelaufen" },
            { value: "passwort", label: "Passwort vergessen" },
          ],
        },
        {
          name: "wer",
          label: "Für wen brauchst du den Zugang?",
          type: "radio",
          required: true,
          options: [
            { value: "solo", label: "Einzelunternehmen / Freiberufler ohne Angestellte (auch Nebengewerbe)" },
            { value: "solo_ma", label: "Einzelunternehmen mit Angestellten" },
            { value: "gesellschaft", label: "GbR, OHG, KG, UG, GmbH oder Verein" },
            { value: "privat", label: "Nur meine private Steuererklärung" },
          ],
        },
        {
          name: "stnr",
          label: "Hat das Unternehmen schon eine Steuernummer vom Finanzamt?",
          type: "radio",
          condition: (d) => s(d, "wer") === "gesellschaft" || s(d, "wer") === "solo_ma",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein, ich gründe gerade" },
          ],
        },
        {
          name: "idnr",
          label: "Kennst du deine steuerliche Identifikationsnummer (IdNr, 11 Stellen)?",
          type: "radio",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein / nicht zur Hand" },
          ],
          help: "Steht oben links auf dem Einkommensteuerbescheid und im IdNr-Brief des BZSt.",
        },
      ],
    },
    {
      title: "Tempo und Geräte",
      fields: [
        {
          name: "tempo",
          label: "Wie schnell brauchst du den Zugang?",
          type: "radio",
          options: [
            { value: "sofort", label: "Heute – eine Frist drängt" },
            { value: "egal", label: "Ein paar Tage Wartezeit sind okay" },
          ],
        },
        {
          name: "ausweis",
          label: "Hast du einen Personalausweis mit Online-Ausweisfunktion (seit 2017 Standard) und ein Smartphone?",
          type: "radio",
          condition: (d) => s(d, "tempo") === "sofort",
          options: [
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein" },
          ],
        },
        {
          name: "geraet",
          label: "Womit willst du dich einloggen?",
          type: "radio",
          options: [
            { value: "handy", label: "Mit dem Smartphone (App)" },
            { value: "pc", label: "Nur am PC/Mac, ohne App" },
            { value: "beides", label: "Egal, Hauptsache einfach" },
          ],
        },
        { name: "stick", label: "Ich möchte den Zugang auf Hardware (Sicherheitsstick, kostenpflichtig)", type: "checkbox" },
      ],
    },
  ],
  generate,
  seoSections: [
    {
      heading: "ELSTER-Zertifikat beantragen: Was du wirklich beantragst",
      body: [
        "„ELSTER-Zertifikat beantragen“ heißt im Alltag: ein Benutzerkonto bei Mein ELSTER anlegen. Das Zertifikat entsteht am Ende der Registrierung und ersetzt deine Unterschrift unter Steuererklärungen, Voranmeldungen und dem Fragebogen zur steuerlichen Erfassung. Es gibt fünf Login-Optionen: die App ElsterSecure, die Zertifikatsdatei (.pfx), den Personalausweis mit Online-Ausweisfunktion, den Sicherheitsstick und die Signaturkarte. Mein ELSTER selbst kostet nichts; Kosten entstehen nur, wenn du einen Sicherheitsstick (laut Shop einmalig 61,42 € inkl. MwSt.) oder eine Signaturkarte kaufst.",
        "Der eigentliche Engpass ist nicht das Zertifikat, sondern die Identitätsprüfung. ELSTER prüft, dass du wirklich die Person oder das Unternehmen bist, die du angibst. Entweder per Brief (Aktivierungs-Code per Post, Aktivierungs-ID per E-Mail) oder online mit dem Personalausweis – dann steht das Konto noch am selben Tag. Unser Fahrplan sagt dir, welcher Weg bei deiner Rechtsform und Ausstattung offen ist und was du vorher bereitlegen musst.",
      ],
    },
    {
      heading: "Für eine Privatperson oder für eine Organisation? Die Entscheidung für Gründer",
      body: [
        "Die erste Frage von ELSTER lautet „Für wen möchten Sie ein Benutzerkonto erstellen?“. „Für eine Privatperson“ beruht auf deiner steuerlichen Identifikationsnummer (IdNr), „Für eine Organisation“ auf der Steuernummer, unter der das Unternehmen beim Finanzamt geführt wird. Für Einzelunternehmer und Solo-Selbständige ist die Antwort klar, die ELSTER-Hilfe schreibt: „Sofern es sich bei Ihrem Einzelunternehmen um keine Kapitalgesellschaft handelt und Sie keine Angestellten beschäftigen, empfehlen wir den Kontotyp ‚Für eine Privatperson‘.“ Ein Konto genügt dann für Einkommensteuer, Umsatzsteuer, Gewerbesteuer und den Fragebogen zur steuerlichen Erfassung.",
        "„Für eine Organisation“ ist der Weg für GbR, OHG, KG, UG, GmbH und Vereine – und für Arbeitgeber, weil ELSTER die Arbeitgeberfunktionen für ELStAM (Lohnsteuerabzugsmerkmale an-, ab-, ummelden) mit der Steuernummer der Organisation empfiehlt. Dafür brauchst du Bundesland, Steuernummer und einen Ansprechpartner; der Aktivierungsbrief geht an die beim Finanzamt gespeicherte Firmenadresse. Nachteil laut Klickanleitung des Landesamts Rheinland-Pfalz: Mit einem Organisationszertifikat ist der Bescheinigungsabruf für die eigene vorausgefüllte Einkommensteuererklärung nicht möglich. Viele Gründer fahren deshalb zweigleisig: ein privates Konto mit IdNr und ein Organisationskonto für die Firma.",
        "Noch keine Steuernummer, weil du gerade gründest? Dann gibt es die Registrierung „nur mit E-Mail-Adresse“. Sie ist auf den Fragebogen zur steuerlichen Erfassung beschränkt – andere Formulare werden nicht angeboten – und läuft komplett ohne Brief, weil Aktivierungs-ID und Aktivierungs-Code per E-Mail kommen. Sobald das Finanzamt die Steuernummer erteilt hat, schaltest du das Konto über die „Identifikation mit Steuernummer“ zum vollwertigen Organisationskonto frei. Einzelunternehmer brauchen diesen Umweg nicht: Sie registrieren sich sofort mit ihrer IdNr und geben den Fragebogen direkt ab.",
      ],
    },
    {
      heading: "ElsterSecure, Zertifikatsdatei oder Sicherheitsstick?",
      body: [
        "ElsterSecure ist die von ELSTER empfohlene Login-Option: Du scannst beim Login einen QR-Code mit der App und bestätigst mit Face ID, Fingerabdruck oder Geräte-PIN. Ein Zertifikat wird dabei laut ELSTER nicht mehr benötigt, also auch keine Verlängerung alle drei Jahre. Die App gibt es für Android und iOS. Geht das Gerät verloren und du hast keine zweite Login-Option hinterlegt, bleibt nur die Zugangserneuerung – deshalb empfehlen wir, zusätzlich eine Zertifikatsdatei als Reserve anzulegen.",
        "Die Zertifikatsdatei ist der Klassiker: eine .pfx-Datei plus Passwort (10 bis 128 Zeichen, Buchstaben und Ziffern). Sie ist kostenlos, braucht keine Hardware und funktioniert im Browser ohne Zusatzsoftware. Wichtig laut ELSTER: nur speichern, nicht öffnen oder in den PC importieren. Da die Datei kopiert werden könnte, ist das Passwort der einzige Sicherheitsanker – bei Verdacht sofort unter „Mein Benutzerkonto“ ändern, dann wird eine neue Datei ausgestellt und die alte ungültig. Zertifikatsdatei und Sicherheitsstick sind 3 Jahre gültig; ELSTER erinnert mehrere Wochen vor Ablauf per E-Mail, ein Login verlängert automatisch.",
        "Der Sicherheitsstick speichert das Zertifikat auf einem Kryptochip und ist für Unternehmer gedacht, die den Zugang nicht als Datei herumliegen haben wollen. Er kostet einmalig 61,42 € inkl. MwSt. (nur über sicherheitsstick.de), braucht den ElsterAuthenticator und muss vor der Registrierung vorliegen. Die Signaturkarte richtet sich an Steuerberater: Nur mit ihr ist die Steuerkontoabfrage möglich. Der Personalausweis schließlich ist weniger Login-Option als Turbo für die Identitätsprüfung – er erspart den Brief.",
      ],
    },
    {
      heading: "Zeitplan: Wie lange dauert der ELSTER-Zugang?",
      body: [
        "Mit Online-Identitätsprüfung steht dein Konto noch am selben Tag: Du nimmst mit der Nect Wallet-App Personalausweis und ein kurzes Selfie-Video auf, in dem du zwei Wörter vorliest, oder du nutzt die AusweisApp mit NFC-Handy oder Kartenleser und deiner 6-stelligen Ausweis-PIN. Laut ELSTER-FAQ entfällt der Postversand komplett und das Konto ist in wenigen Minuten da. Voraussetzung ist die Registrierung mit IdNr.",
        "Per Brief dauert es länger. ELSTER selbst nennt „einige Tage“ für die Zustellung des Aktivierungs-Codes; der Leitfaden zu Mein Unternehmenskonto spricht bei Organisationen von „in der Regel ca. 5 Werktage“. Rechne also mit einer Woche, bei Umzug oder nicht aktualisierter Meldeadresse länger – der Brief geht immer an die Adresse der Meldebehörde (IdNr) bzw. des Finanzamts (Steuernummer), Vollmachten werden nicht berücksichtigt. Die Aktivierungsdaten gelten nur für die in der E-Mail genannte Frist. Für Gründer heißt das: Den ELSTER-Zugang am Tag der Gewerbeanmeldung starten, denn der Fragebogen zur steuerlichen Erfassung muss innerhalb eines Monats elektronisch beim Finanzamt sein (§ 138 Abs. 1b und Abs. 4 AO).",
      ],
    },
    {
      heading: "Beispiel: Nebengewerbe nach Feierabend",
      body: [
        "Jonas meldet am 3. November ein Nebengewerbe für den Verkauf auf Online-Marktplätzen an, ohne Angestellte. Unser Fahrplan: Konto „Für eine Privatperson“ mit seiner IdNr – genau wie es die ELSTER-Hilfe für Einzelunternehmer ohne Angestellte empfiehlt. Weil die Frist für den Fragebogen läuft, nutzt er die Online-Identitätsprüfung mit Personalausweis und AusweisApp und hat das Konto am selben Abend. Als Login wählt er ElsterSecure und legt zur Sicherheit eine Zertifikatsdatei an. Am nächsten Tag füllt er den Fragebogen zur steuerlichen Erfassung aus, kreuzt die USt-IdNr an, und wartet nun nur noch auf die Steuernummer per Post. Hätte er sich für den Brief entschieden, wäre der Fragebogen etwa eine Woche später rausgegangen – noch innerhalb der Monatsfrist, aber ohne Puffer.",
      ],
    },
    {
      heading: "Zertifikat verloren, abgelaufen oder Passwort vergessen: die Zugangserneuerung",
      body: [
        "Ein verlorenes ELSTER-Zertifikat lässt sich nicht wiederherstellen, aber dein Konto bleibt erhalten. Über „Zugang erneuern“ prüft ELSTER deine Identität erneut – online oder per Brief – und gibt dir eine neue Login-Option. Während der Erneuerung kannst du das alte Zertifikat sperren; gesperrt bleibt es dauerhaft. Beim vergessenen Passwort läuft es genauso: neue Aktivierungs-ID per E-Mail, neuer Aktivierungs-Code per Post, am Ende ein neues Passwort. Du brauchst dafür Zugriff auf die im Konto hinterlegte E-Mail-Adresse; fehlt der, hilft der Ansprechpartner deines Bundeslands über den ELSTER-Kontaktfinder.",
        "Wichtig: Versuche nie eine zweite Registrierung mit derselben IdNr. ELSTER meldet dann den Fehlercode 080005207 („zu der angegebenen steuerlichen Identifikationsnummer existiert bereits ein Benutzerkonto“) – der richtige Weg ist die Zugangserneuerung. Und: Zertifikatsdatei und Sicherheitsstick laufen nach 3 Jahren ab. Wer die Erinnerungsmails ignoriert, muss nach dem Ablauf den Zugang erneuern und wieder auf den Brief warten. Ein einfacher Login vor dem Ablaufdatum reicht, um das Zertifikat automatisch zu verlängern.",
      ],
    },
    {
      heading: "Typische Fehler beim ELSTER-Zertifikat",
      body: [
        "1. Falsches Geburtsdatum: Weicht es von den Daten der Meldebehörde ab, kann ELSTER den Aktivierungsbrief nicht erzeugen – die Registrierung muss wiederholt werden. 2. Tippfehler in der E-Mail-Adresse oder Spamfilter: Ohne Aktivierungs-ID geht nichts; Absender portal@elster.de freischalten. 3. Browserfenster geschlossen, während der 6-stellige Verifizierungscode kommt: Dann beginnt die Registrierung von vorn. 4. Zertifikatsdatei per Doppelklick geöffnet oder importiert: ELSTER will sie nur gespeichert sehen; der Login läuft über Dateiauswahl und Passwort. 5. Kein Backup: Die .pfx liegt im Download-Ordner – verschieben und auf einen USB-Stick sichern. 6. Organisationskonto fürs Private: kein Bescheinigungsabruf für die eigene Einkommensteuer. 7. Benutzername mit sensiblen Daten: Er steht unverschlüsselt in den E-Mails von ELSTER.",
      ],
    },
    {
      heading: "Und im EU-Ausland? Die Gegenstücke zu ELSTER in Frankreich, Italien und Spanien",
      body: [
        "ELSTER gilt nur für deutsche Finanzämter. Wer in Frankreich steuerlich erfasst ist, nutzt den „espace professionnel“ auf impots.gouv.fr, in Italien die „area riservata“ der Agenzia delle Entrate (Zugang mit SPID, CIE oder CNS) und in Spanien die Sede Electrónica der Agencia Tributaria mit Cl@ve oder elektronischem Zertifikat. Ein ELSTER-Zertifikat hilft dort nicht weiter – wohl aber bei deutschen Pflichten aus EU-Geschäften, etwa der Zusammenfassenden Meldung oder dem OSS-Verfahren über das BZSt-Online-Portal, für das du dich mit deinem ELSTER-Zertifikat anmeldest.",
      ],
    },
  ],
  links: [
    { to: "/tools/fse-wizard", label: "Fragebogen zur steuerlichen Erfassung: Begleiter" },
    { to: "/guides/elster-fse-fillout", label: "ELSTER FsE ausfüllen: Klickanleitung" },
    { to: "/ratgeber/steuernummer-beantragen", label: "Steuernummer beantragen: Ablauf und Dauer" },
    { to: "/ust-id-beantragen", label: "USt-ID beantragen und prüfen" },
    { to: "/tools/ust-voranmeldung", label: "USt-Voranmeldung in ELSTER Schritt für Schritt" },
    { to: "/tools/gewerbeanmeldung-wizard", label: "Gewerbeanmeldung richtig ausfüllen" },
    { to: "/tools/steuerkalender", label: "Steuerkalender für Selbstständige 2026/27" },
    { to: "/tools/kleinunternehmer-waechter", label: "Kleinunternehmer-Grenze 2026 im Blick" },
    { to: "/ratgeber/kleingewerbe-anmelden", label: "Kleingewerbe anmelden: Ablauf, Kosten, Fristen" },
  ],
  quellen: [
    { label: "ELSTER-Hilfe: Registrierung (Kontotypen, Identitätsprüfung, Login-Optionen, Zugangserneuerung)", url: ELSTER_HILFE_REG },
    { label: "ELSTER-FAQ: Kosten, Gültigkeit 3 Jahre, Verlängerung, Privatperson/Organisation", url: ELSTER_FAQ },
    { label: "ELSTER: Infoseite ElsterSecure", url: ELSTER_SECURE },
    { label: "ELSTER: Benutzerkonto erstellen", url: ELSTER_REGISTRIERUNG },
    { label: "Landesamt für Steuern Rheinland-Pfalz: Klickanleitung Registrierung mit Zertifikatsdatei, Stand 09/2025 (PDF)", url: RLP_LEITFADEN },
    { label: "Mein Unternehmenskonto: Leitfaden ELSTER-Organisationszertifikate, Stand 12/2024 (PDF)", url: MUK_LEITFADEN },
    { label: "Steuerverwaltungen von Bund und Ländern: Flyer „Die Registrierung bei Mein ELSTER“ 2025 (PDF)", url: "https://www.steuern.sachsen.de/download/Flyer_Elster_Registrierung.pdf" },
    { label: "sicherheitsstick.de: Preis des ELSTER-Sicherheitssticks", url: STICK_SHOP },
    { label: "BZSt: Identifikationsnummer erneut anfordern", url: IDNR_ANFORDERN },
    { label: "§ 138 AO – Anzeigen über die Erwerbstätigkeit (Abs. 1b, Abs. 4: ein Monat)", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
    { label: "impots.gouv.fr: Espace professionnel (Frankreich)", url: "https://www.impots.gouv.fr/professionnel" },
    { label: "Agenzia delle Entrate: Area riservata (Italien)", url: "https://www.agenziaentrate.gov.it/portale/area-riservata" },
    { label: "Agencia Tributaria: Identificación digital (Spanien)", url: "https://sede.agenciatributaria.gob.es/Sede/identificacion-digital.html" },
  ],
  stand: ELSTER_STAND,
  seo: {
    title: "ELSTER-Zertifikat beantragen: Registrierung | GründerX",
    description:
      "ELSTER-Zertifikat beantragen 2026: Privatperson oder Organisation, ElsterSecure, Zertifikatsdatei oder Sicherheitsstick, Dauer des Aktivierungsbriefs, Checkliste und Zugangserneuerung – kostenlos.",
    keywords:
      "elster zertifikat beantragen, elster zugang beantragen, elster beantragen, elster registrierung, elster zertifikatsdatei, elstersecure, elster organisationszertifikat, elster zertifikat verloren, elster zertifikat abgelaufen, elster steuernummer beantragen",
    faqs: [
      {
        q: "Was kostet das ELSTER-Zertifikat?",
        a: "Nichts. Mein ELSTER ist kostenlos, auch die Zertifikatsdatei und ElsterSecure. Kosten entstehen nur, wenn du einen Sicherheitsstick (laut Shop 61,42 € inkl. MwSt.) oder eine Signaturkarte mit Kartenleser kaufst.",
      },
      {
        q: "Wie lange dauert es, bis ich mein ELSTER-Zertifikat habe?",
        a: "Mit Online-Identitätsprüfung per Personalausweis (Nect Wallet-App oder AusweisApp) noch am selben Tag. Per Brief kommt der Aktivierungs-Code laut ELSTER nach „einigen Tagen“, bei Organisationen laut Leitfaden Mein Unternehmenskonto in der Regel nach etwa 5 Werktagen. Die Aktivierungs-ID kommt sofort per E-Mail.",
      },
      {
        q: "Registriere ich mich als Einzelunternehmer für eine Privatperson oder eine Organisation?",
        a: "Laut ELSTER-Hilfe „Für eine Privatperson“, solange dein Einzelunternehmen keine Kapitalgesellschaft ist und du keine Angestellten beschäftigst. Das Konto beruht auf deiner IdNr und reicht für Einkommensteuer, Umsatzsteuer, Gewerbesteuer und den Fragebogen zur steuerlichen Erfassung. GbR, UG, GmbH, Vereine und Arbeitgeber nehmen „Für eine Organisation“ mit der Steuernummer.",
      },
      {
        q: "Kann ich mich bei ELSTER ohne Steuernummer registrieren?",
        a: "Ja. Einzelunternehmer registrieren sich mit ihrer steuerlichen Identifikationsnummer. Gesellschaften ohne Steuernummer nutzen die Registrierung „nur mit E-Mail-Adresse“, mit der ausschließlich der Fragebogen zur steuerlichen Erfassung möglich ist. Nach Erhalt der Steuernummer wird das Konto per „Identifikation mit Steuernummer“ zum vollwertigen Organisationskonto.",
      },
      {
        q: "Wie lange ist das ELSTER-Zertifikat gültig?",
        a: "Zertifikatsdatei und Sicherheitsstick sind 3 Jahre gültig. Mehrere Wochen vor Ablauf informiert ELSTER per E-Mail; ein Login verlängert das Zertifikat automatisch. Nach dem Ablauf hilft nur die Zugangserneuerung. Bei ElsterSecure wird kein Zertifikat mehr benötigt.",
      },
      {
        q: "Ich habe meine Zertifikatsdatei verloren – muss ich mich neu registrieren?",
        a: "Nein. Nutze „Zugang erneuern“: ELSTER prüft deine Identität erneut (online oder per Brief) und gibt dir eine neue Login-Option; Konto und Postfach bleiben erhalten. Eine zweite Registrierung mit derselben IdNr scheitert mit Fehlercode 080005207.",
      },
      {
        q: "Was ist der Unterschied zwischen Zertifikatsdatei und ElsterSecure?",
        a: "Die Zertifikatsdatei ist eine .pfx-Datei mit Passwort, die du beim Login im Browser auswählst; sie gilt 3 Jahre. ElsterSecure ist die von ELSTER empfohlene App: QR-Code scannen, mit Gerätesperre bestätigen, ohne Zertifikat und ohne Verlängerung. Beide sind kostenlos.",
      },
    ],
  },
};
