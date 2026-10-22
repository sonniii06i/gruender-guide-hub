// Inhalt der Vorlage „vollmacht-allgemein“ – wird von der Detailseite nachgeladen.
// Metadaten (Titel, FAQ, SEO) stehen in ../verwaltung.ts.
import { VORLAGEN_HINWEIS } from "../types";
import type { VorlagenInhalt } from "../types";

const inhalt: VorlagenInhalt = {
  ratgeber: [
      {
        titel: "Wann du eine geschäftliche Vollmacht brauchst",
        text: `Als Gründer bist du am Anfang Geschäftsführung, Einkauf, Buchhaltung und Postannahme in einer Person. Sobald du zwei Wochen im Urlaub bist, krank wirst oder länger beim Kunden sitzt, bleibt alles liegen: Das Einschreiben vom Finanzamt wird nicht abgeholt, die Lieferantenrechnung nicht freigegeben, der Vertrag mit dem neuen Kunden nicht unterschrieben. Eine schriftliche Vollmacht löst das Problem, ohne dass du gleich Prokura erteilen oder einen zweiten Geschäftsführer bestellen musst.

Typische Fälle: Ein Mitgründer soll dich gegenüber Bank, Gewerbeamt und IHK vertreten, eine Bürokraft soll Post und Zustellungen entgegennehmen, ein Angehöriger soll im Krankheitsfall den Betrieb am Laufen halten. Die Vorlage deckt all diese Situationen ab, weil du den Umfang selbst festlegst, von einer eng begrenzten Einzelvollmacht bis zur Generalvollmacht für das ganze Unternehmen.`,
      },
      {
        titel: "Was muss in eine Vollmacht? Pflichtangaben und Umfang",
        text: `Eine Vollmacht ist nur so gut, wie sie den Dritten erkennen lässt, wer wen wozu vertreten darf. Deshalb gehören in jede Vollmacht Vorlage, ob kostenlos oder vom Anwalt, mindestens diese Punkte:

- Vollmachtgeber mit vollständigem Namen oder Firma und Anschrift; bei einer GmbH oder UG auch der Geschäftsführer, der unterschreibt
- Bevollmächtigter mit Name, Geburtsdatum und Anschrift, damit er sich ausweisen kann
- Umfang der Vollmacht als Positivliste (Ziffer 2 Absatz 1) oder als Generalvollmacht, ergänzt um die Ausnahmen in Absatz 2
- Regelung zur Untervollmacht (Ziffer 3) und zur Befreiung von § 181 BGB (Ziffer 4)
- Beginn, Ende, Widerruf und die Frage, ob die Vollmacht über den Tod hinaus gilt (Ziffer 5)
- Ort, Datum und eigenhändige Unterschrift des Vollmachtgebers

Die Annahmeerklärung des Bevollmächtigten ist rechtlich nicht nötig, aber sinnvoll: Sie belegt, dass er die Grenzen kennt und die Urkunde erhalten hat. Betragsgrenzen gehören in den Text der Urkunde selbst, nicht in eine mündliche Nebenabrede, weil nur das Geschriebene nach außen wirkt.`,
      },
      {
        titel: "Vollmacht Vorlage ausfüllen: Schritt für Schritt",
        text: `Lade die Vorlage als Word- oder PDF-Datei herunter und arbeite die Platzhalter in eckigen Klammern von oben nach unten ab. Trage zuerst Vollmachtgeber und Bevollmächtigten ein. Entscheide dann in Ziffer 2, ob du die Positivliste a) bis e) nutzt oder die Alternative Generalvollmacht; lösche die Variante, die nicht gilt. Setze konkrete Beträge ein, etwa „Verträge bis 5.000 EUR im Einzelfall“, und ergänze die Ausnahmen, die dir wichtig sind.

In Ziffer 3 streichst du „berechtigt“ oder „nicht berechtigt“. In Ziffer 4 bleibt nur eine der beiden Varianten stehen; im Zweifel Variante B ohne Befreiung. In Ziffer 5 trägst du Beginn und gegebenenfalls Ende ein und entscheidest, ob die Vollmacht mit deinem Tod erlischt. Zum Schluss drucken, unterschreiben, Annahme unterschreiben lassen und beide Ausfertigungen datieren. Eine Kopie legst du in die Firmenakte.`,
      },
      {
        titel: "Typische Fehler bei Vollmachten und wie du sie vermeidest",
        text: `Der häufigste Fehler ist die zu weite Vollmacht: Wer „alle Angelegenheiten“ ankreuzt und keine Ausnahmen formuliert, erlaubt dem Bevollmächtigten auch Darlehensaufnahmen und die Kündigung von Mitarbeitern. Nutze deshalb die Ausnahmeliste in Ziffer 2 Absatz 2.

Zweiter Fehler: Die Vollmacht wird nur als Scan per E-Mail weitergegeben. Bei Kündigungen und anderen einseitigen Erklärungen darf der Empfänger die Erklärung zurückweisen, wenn kein Original vorliegt; gib die Originalurkunde deshalb mit. Dritter Fehler: fehlendes Datum oder fehlende Unterschrift, womit die Urkunde als Nachweis wertlos ist.

Vierter Fehler: Nach dem Widerruf bleibt die Urkunde beim Bevollmächtigten. Solange er sie vorzeigen kann, verpflichtet er dich gegenüber Gutgläubigen weiter. Fordere das Original zurück und informiere Bank, Steuerberater und wichtige Lieferanten schriftlich.`,
      },
      {
        titel: "Rechtliche Grundlagen: §§ 164 ff. BGB",
        text: `Die Stellvertretung ist in den §§ 164 bis 181 BGB geregelt. Nach § 164 BGB wirkt eine Erklärung, die der Bevollmächtigte in deinem Namen und im Rahmen seiner Vertretungsmacht abgibt, unmittelbar für und gegen dich. Die Vollmacht selbst erteilst du nach § 167 BGB durch Erklärung gegenüber dem Bevollmächtigten oder gegenüber dem Dritten; eine bestimmte Form ist nicht vorgeschrieben.

Nach § 168 BGB erlischt sie mit dem Grundverhältnis, etwa dem Arbeitsvertrag, und kann in der Regel jederzeit widerrufen werden. § 174 BGB erlaubt dem Empfänger, einseitige Rechtsgeschäfte ohne Originalurkunde zurückzuweisen; § 175 BGB verpflichtet den Bevollmächtigten zur Rückgabe der Urkunde nach dem Erlöschen. § 181 BGB verbietet Insichgeschäfte, soweit du sie nicht ausdrücklich gestattest. Die §§ 170 bis 173 BGB regeln den Rechtsschein einer weiter vorgezeigten Urkunde. Für Kaufleute gelten zusätzlich Handlungsvollmacht und Prokura nach dem HGB, die eigene Vorlagen haben.`,
      },
      {
        titel: "Wann die einfache Vollmacht nicht reicht",
        text: `Für Grundstückskäufe, Handelsregisteranmeldungen, die Gründung einer GmbH oder die Übertragung von Geschäftsanteilen verlangen Notar und Register eine notariell beglaubigte oder beurkundete Vollmacht; die hier erstellte Urkunde wird dort abgewiesen. Banken erkennen fremde Vollmachten meist nicht an und bestehen auf ihrem eigenen Kontovollmacht-Formular, das du direkt in der Filiale oder im Online-Banking einrichtest.

Soll ein Mitarbeiter dauerhaft und erkennbar für dein Handelsgewerbe auftreten, passt die Handlungsvollmacht nach § 54 HGB besser, soll er fast alles dürfen, die Prokura mit Registereintrag. Für die Vertretung gegenüber dem Finanzamt nutzt der Steuerberater das amtliche Vollmachtsformular der Finanzverwaltung, das in die Vollmachtsdatenbank eingetragen wird. GründerX ist Software und keine Rechtsberatung: Geht es um hohe Beträge oder eine Vorsorgevollmacht für den Fall deiner Geschäftsunfähigkeit, lass den Text von einem Anwalt oder Notar prüfen.`,
      },
    ],
  text: `Vollmacht

Vollmachtgeber:
[Vorname Nachname / Firma], [Straße, PLZ Ort], [ggf. vertreten durch den Geschäftsführer Vorname Nachname]
– nachfolgend „Vollmachtgeber“ –

Bevollmächtigter:
[Vorname Nachname], geboren am [Datum], wohnhaft [Straße, PLZ Ort]
– nachfolgend „Bevollmächtigter“ –

1. Erteilung der Vollmacht
Der Vollmachtgeber erteilt dem Bevollmächtigten hiermit Vollmacht (§ 167 BGB), ihn in den nachfolgend bezeichneten geschäftlichen Angelegenheiten gerichtlich und außergerichtlich zu vertreten. Erklärungen des Bevollmächtigten im Rahmen dieser Vollmacht wirken unmittelbar für und gegen den Vollmachtgeber (§ 164 BGB).

2. Umfang der Vollmacht
(1) Die Vollmacht umfasst folgende Angelegenheiten:
   a) [z. B. Abschluss, Änderung und Kündigung von Verträgen mit Lieferanten und Kunden bis zu einem Wert von [Betrag] EUR im Einzelfall],
   b) [z. B. Abgabe und Entgegennahme von Erklärungen gegenüber Behörden, insbesondere Gewerbeamt, Finanzamt und IHK],
   c) [z. B. Vertretung gegenüber der [Bank], Freigabe von Überweisungen bis [Betrag] EUR],
   d) [z. B. Entgegennahme von Post, Einschreiben und Zustellungen],
   e) [weitere Angelegenheiten].
[Alternative: (1) Die Vollmacht umfasst alle geschäftlichen Angelegenheiten des Vollmachtgebers im Zusammenhang mit dem Unternehmen [Firma] (Generalvollmacht).]
(2) Nicht von der Vollmacht umfasst sind:
   a) der Erwerb, die Veräußerung und die Belastung von Grundstücken,
   b) die Aufnahme von Darlehen und die Übernahme von Bürgschaften,
   c) der Abschluss und die Beendigung von Arbeitsverträgen,
   d) die Erteilung von Prokura und Registeranmeldungen,
   e) [weitere Ausnahmen].
(3) Der Bevollmächtigte beachtet die Weisungen des Vollmachtgebers und unterrichtet ihn unverzüglich über wesentliche Vorgänge. Im Innenverhältnis gilt ergänzend der [Arbeitsvertrag / Auftrag] vom [Datum].

3. Untervollmacht
Der Bevollmächtigte ist [berechtigt / nicht berechtigt], Untervollmacht zu erteilen. [Falls berechtigt: Die Untervollmacht darf nur im Umfang dieser Vollmacht erteilt werden, erlischt mit ihr und ist dem Vollmachtgeber unverzüglich mitzuteilen.]

4. Befreiung von § 181 BGB
[Variante A: Der Bevollmächtigte ist von den Beschränkungen des § 181 BGB befreit. Er darf also Rechtsgeschäfte im Namen des Vollmachtgebers mit sich selbst oder als Vertreter eines Dritten abschließen.]
[Variante B: Der Bevollmächtigte ist nicht von den Beschränkungen des § 181 BGB befreit. Rechtsgeschäfte mit sich selbst oder als Vertreter eines Dritten bedürfen der gesonderten Zustimmung des Vollmachtgebers.]

5. Dauer, Widerruf und Erlöschen
(1) Die Vollmacht gilt ab dem [Datum] [bis zum [Datum] / auf unbestimmte Zeit].
(2) Der Vollmachtgeber kann die Vollmacht jederzeit ohne Angabe von Gründen widerrufen (§ 168 Satz 2 BGB); der Widerruf wird mit Zugang wirksam. Danach gibt der Bevollmächtigte diese Urkunde unverzüglich im Original zurück (§ 175 BGB).
(3) Die Vollmacht erlischt außerdem mit Beendigung des ihr zugrunde liegenden Rechtsverhältnisses (§ 168 Satz 1 BGB), insbesondere mit dem Ende des [Arbeits- / Auftragsverhältnisses].
(4) Die Vollmacht [erlischt / erlischt nicht] mit dem Tod des Vollmachtgebers.

6. Vorlage der Vollmacht
Der Bevollmächtigte legt diese Vollmacht gegenüber Dritten auf Verlangen im Original vor. Einseitige Rechtsgeschäfte (z. B. Kündigungen) ohne Vorlage der Originalurkunde kann der Empfänger zurückweisen (§ 174 BGB).

7. Sonstiges
Diese Vollmacht ersetzt alle früher erteilten Vollmachten für die unter Ziffer 2 genannten Angelegenheiten. Sie wird in zwei Ausfertigungen erstellt; je eine erhalten Vollmachtgeber und Bevollmächtigter.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Vollmachtgeber
[ggf. Firma und Funktion]


Ich nehme die Vollmacht an.

[Ort], den [Datum]


______________________________
[Vorname Nachname], Bevollmächtigter

${VORLAGEN_HINWEIS}`,
};

export default inhalt;
