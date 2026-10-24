// Inhalt der Vorlage „muster-widerrufsformular“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../ecommerce.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du das Muster-Widerrufsformular brauchst",
        text: `Das Muster-Widerrufsformular ist der kleine Bruder der Widerrufsbelehrung und wird genauso oft vergessen. Sobald du als Händler oder Dienstleister Verträge mit Verbrauchern im Fernabsatz schließt, musst du dem Kunden ein Formular an die Hand geben, mit dem er den Widerruf erklären kann. Das gilt für den eigenen Online-Shop, für den Verkauf per E-Mail oder Telefon und für Anbieter digitaler Inhalte oder Dienstleistungen gleichermaßen.

Du brauchst dieses Formular also parallel zur Widerrufsbelehrung, nie als Ersatz. In der Belehrung heißt es, der Kunde könne „das beigefügte Muster-Widerrufsformular“ verwenden; dieser Satz ist nur richtig, wenn das Formular tatsächlich beiliegt. Die Vorlage liefert dir den Wortlaut als eigenes Dokument, das du als PDF an die Bestellbestätigung anhängst, auf der Widerrufsseite zum Download anbietest oder der Ware beilegst.`,
      },
      {
        titel: "Was im Muster-Widerrufsformular stehen muss",
        text: `Der Inhalt ist gesetzlich vorgegeben und kurz. Das Formular enthält:

- den einleitenden Satz, dass der Kunde es bei Widerruf ausfüllen und zurücksenden soll
- deinen Adressblock mit Firma oder Name, Anschrift und E-Mail-Adresse
- die Erklärung „Hiermit widerrufe(n) ich/wir den abgeschlossenen Vertrag über den Kauf der folgenden Waren / die Erbringung der folgenden Dienstleistung“
- Felder für das Bestelldatum und das Erhaltdatum
- Felder für Name und Anschrift des Verbrauchers
- ein Unterschriftsfeld, das nur bei Mitteilung auf Papier ausgefüllt wird
- das Datum und den Hinweis „Unzutreffendes streichen“

Mehr darf als Pflicht nicht hinein. Die Vorlage ergänzt am Ende Hinweise zur Einbindung, zur Bearbeitung im Betrieb und zu freiwilligen Zusatzfeldern. Diese Hinweise sind für dich gedacht und werden vor der Veröffentlichung gelöscht, damit der Kunde nur das eigentliche Formular bekommt.`,
      },
      {
        titel: "Widerrufsformular ausfüllen und im Shop einbinden",
        text: `Das Ausfüllen beschränkt sich auf deinen Adressblock: Firma oder Vor- und Nachname, Straße, Postleitzahl, Ort und die E-Mail-Adresse, an die Widerrufe gehen sollen. Die Anschrift sollte mit der in Widerrufsbelehrung und Impressum übereinstimmen, damit der Kunde nicht an drei verschiedene Adressen schreibt. Eine Faxnummer sieht das amtliche Muster nicht vor, deshalb enthält die Vorlage keine Faxzeile.

Danach entfernst du den Abschnitt „Hinweise zur Einbindung“ und speicherst das Dokument als PDF. Dieses PDF hängst du an die Bestellbestätigung an, die dein Shopsystem automatisch verschickt, und verlinkst es zusätzlich auf deiner Widerrufsseite neben der Belehrung. Bietest du ein Online-Formular zum Widerruf an, muss dein System den Eingang unverzüglich bestätigen, zum Beispiel per automatischer E-Mail; die Widerrufsbelehrung braucht dann den entsprechenden Zusatz.

Die Felder für Ware, Datum, Name und Anschrift bleiben leer; sie füllt der Kunde aus. Gestalterisch darfst du Logo, Schrift und Layout anpassen, am Text änderst du nichts.`,
      },
      {
        titel: "Typische Fehler beim Widerrufsformular",
        text: `Der häufigste Fehler ist, das Formular gar nicht zu übermitteln. Viele Shops verlinken es nur im Footer und glauben, damit sei die Pflicht erfüllt. Das Gesetz verlangt aber die Zurverfügungstellung auf einem dauerhaften Datenträger, also per E-Mail, PDF oder Papier. Der zweite Fehler ist das Umschreiben: Wer eigene Formulierungen wählt, verliert die Vermutung, dass er korrekt informiert hat, und trägt das volle Abmahnrisiko.

Ebenfalls problematisch sind Pflichtfelder, die das Gesetz nicht kennt. Bestellnummer, Kundennummer oder Rückgabegrund darfst du abfragen, aber nur erkennbar freiwillig. Der Widerruf darf nicht davon abhängen, dass der Kunde das Formular benutzt, die Originalverpackung verwendet oder einen Grund nennt. Ein Widerruf per formloser E-Mail oder Anruf ist genauso wirksam. Prüfe außerdem, ob die E-Mail-Adresse im Formular wirklich betreut wird: Ein Widerruf, der in einem ungelesenen Postfach landet, läuft trotzdem gegen dich.`,
      },
      {
        titel: "Rechtliche Grundlagen des Muster-Widerrufsformulars",
        text: `Die Pflicht, ein Widerrufsformular bereitzustellen, steht in Art. 246a EGBGB, der die Informationspflichten bei Fernabsatzverträgen regelt. Das Formular selbst ist als Anlage 2 zu Art. 246a EGBGB veröffentlicht. Der Verbraucher kann den Widerruf nach § 355 Abs. 1 BGB durch jede eindeutige Erklärung ausüben; das Formular ist eine Hilfe, keine Voraussetzung. Die Übermittlung auf einem dauerhaften Datenträger spätestens bei Lieferung ergibt sich aus § 312f Abs. 2 BGB.

Die Folgen des Widerrufs, also die Rückzahlung innerhalb von 14 Tagen, das Zurückbehaltungsrecht bis zum Rückerhalt der Ware und die Rücksendung durch den Kunden, stehen in den §§ 355 und 357 BGB. Prüfe vor dem Einsatz den aktuellen amtlichen Wortlaut der Anlage 2 zu Art. 246a EGBGB; die Vorlage gibt den Text nach bestem Wissen wieder, aber verbindlich ist allein der Gesetzestext in seiner jeweils geltenden Fassung.`,
      },
      {
        titel: "Wann du mehr brauchst als das Formular",
        text: `Das Formular ist ein Baustein von mehreren. Es nützt nichts ohne korrekte Widerrufsbelehrung, ohne die Pflichtinformationen vor der Bestellung und ohne einen Bestellbutton, der auf die Zahlungspflicht hinweist. Wer das Widerrufsrecht für bestimmte Produkte ausschließen will, etwa bei personalisierter Ware oder geöffneten Hygieneartikeln, regelt das in der Belehrung, nicht im Formular.

Bei Verträgen mit Kunden im EU-Ausland brauchst du das Formular in der jeweiligen Vertragssprache, und bei Abos, digitalen Inhalten oder Finanzdienstleistungen gelten zusätzliche Informationspflichten. In diesen Fällen oder bei hohem Bestellvolumen lohnt sich die Prüfung durch einen Anwalt oder ein Abmahnschutz-Paket, das die Texte bei Gesetzesänderungen aktuell hält. GründerX liefert die Vorlage als Software-Hilfe, keine Rechtsberatung; die Entscheidung, ob das Formular in deinen Bestellablauf passt, triffst du.`,
      },
    ],
  text: `Muster-Widerrufsformular

(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

An
[Firma / Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]
E-Mail: [E-Mail-Adresse]

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*):

______________________________________________________________

______________________________________________________________

Bestellt am (*) / erhalten am (*):

______________________________________________________________

Name des/der Verbraucher(s):

______________________________________________________________

Anschrift des/der Verbraucher(s):

______________________________________________________________

______________________________________________________________

Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):

______________________________________________________________

Datum:

______________________________________________________________

(*) Unzutreffendes streichen.

Ende des Muster-Widerrufsformulars


Hinweise zur Einbindung (nicht Teil des Formulars, vor Veröffentlichung entfernen):

1. Pflicht und Form
Das Muster-Widerrufsformular entspricht Anlage 2 zu Art. 246a § 1 Abs. 2 Satz 1 Nr. 1 EGBGB. Der Händler muss es dem Verbraucher vor Vertragsschluss zur Verfügung stellen und spätestens mit der Ware bzw. der Bestellbestätigung auf einem dauerhaften Datenträger übermitteln (§ 312f Abs. 2 BGB). Üblich ist ein PDF-Anhang in der Bestellbestätigungs-E-Mail und ein Download unter [www.domain.de/widerruf].

2. Verhältnis zur Widerrufsbelehrung
Das Formular ergänzt die Widerrufsbelehrung, ersetzt sie aber nicht. In der Belehrung heißt es: „Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.“ Deshalb muss das Formular tatsächlich beigefügt sein.

3. Online-Widerruf
Bietet der Shop ein Webformular zum Widerruf an, muss der Eingang unverzüglich bestätigt werden, z. B. per automatischer E-Mail. Die Widerrufsbelehrung ist dann um den entsprechenden Satz aus dem gesetzlichen Muster zu ergänzen. Wird der Vertrag über eine Online-Benutzeroberfläche geschlossen, ist zusätzlich die Widerrufsfunktion nach § 356a BGB Pflicht (Schaltflächen „Vertrag widerrufen“ und „Widerruf bestätigen“, Eingangsbestätigung mit Datum und Uhrzeit auf einem dauerhaften Datenträger).

4. Bearbeitung im Betrieb
Eingang des Widerrufs mit Datum dokumentieren. Rückzahlung spätestens 14 Tage nach Eingang des Widerrufs, wobei die Rückzahlung bis zum Rückerhalt der Ware oder bis zum Nachweis der Rücksendung verweigert werden darf. Dasselbe Zahlungsmittel verwenden, das der Kunde eingesetzt hat.

5. Keine Zusatzpflichten
Zusätzliche Felder (Bestellnummer, Grund der Rückgabe, Kundennummer) sind erlaubt, wenn sie eindeutig als freiwillig gekennzeichnet sind. Der Widerruf darf nicht davon abhängig gemacht werden, dass der Kunde das Formular benutzt, einen Grund nennt oder die Originalverpackung verwendet.

Stand: [Datum]
[Firma], [Ort]

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
