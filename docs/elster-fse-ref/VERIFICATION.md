# FsE-Wizard — Verifikation gegen echtes ELSTER (2026-05-30)

Quelle: 25 Screencaptures des echten ELSTER-Formulars **„Fragebogen zur steuerlichen
Erfassung für Einzelunternehmen"** (fseeun-202401), durchgeklickt am 2026-05-28.
Die PDFs liegen lokal unter `docs/elster-fse-ref/seite-01..25.pdf` (nicht im Git —
enthalten Account-Daten).

## Ergebnis: Wizard ist korrekt ✅

Alle **24 Teilseiten** des `FseWizard` stimmen mit dem echten Formular überein —
Reihenfolge, Überschriften und ELSTER-Zeilennummern. Verifizierte Teilseiten + Zeilen:

| TS | Titel | Zeilen (echt) | Wizard |
|----|-------|---------------|--------|
| 1 | Allgemeine Angaben | 2–21 | ✅ (inkl. Telefon 19, Web 20, Art der Tätigkeit 21) |
| 2 | Ehegatte / Lebenspartner(in) | 12–18 | ✅ |
| 3 | Bankverbindung / SEPA-Lastschriftverfahren | — | ✅ |
| 4 | Steuerliche Beratung | 32–38 | ✅ |
| 5 | Empfangsbevollmächtigte(r) | 39–46 | ✅ |
| 6 | Bisherige persönliche Verhältnisse | 47–54 | ✅ |
| 7 | Angaben zum Unternehmen | 55–69 | ✅ |
| 8 | Abweichender Ort der Geschäftsleitung | 63–68 | ✅ |
| 9 | Angaben zu Betriebstätten | — | ✅ |
| 10 | Handelsregistereintragung | 80–84 | ✅ |
| 11 | Gründungsform | 85–92 | ✅ |
| 12 | Bisherige betriebliche Verhältnisse | 93–98 | ✅ |
| 13 | Konzernzugehörigkeit | 99–104 | ✅ |
| 14 | Vorauszahlungen (ESt, GewSt) | 105–113 | ✅ |
| 15 | Gewinnermittlung | 114–116 | ✅ |
| 16 | Freistellungsbescheinigung § 48b EStG | 117 | ✅ |
| 17 | Lohnsteuer | 118–126 | ✅ |
| 18 | Umsatzsteuer | 127–162 | ✅ |
| 19 | Organschaft (§ 2 Abs. 2 Nr. 2 UStG) | — | ✅ |
| 20 | Besonderes Besteuerungsverfahren „One-Stop-Shop" | 163–174 | ✅ |
| 21 | Handel mit Waren über das Internet | 175–178 | ✅ |
| 22 | Umsätze im Bereich der Sozialen Medien | 183–184 | ✅ |
| 23 | Beigefügte Unterlagen | 189–194 | ✅ |
| 24 | Anhänge | — | ✅ |

Die 3 zuvor roten FseWizard-Tests waren veraltet (prüften fiktive Inhalte wie
„Angaben zur Person Zeilen 1-12") — auf die verifizierte Struktur umgeschrieben,
Suite wieder grün (323 Tests).

## Weitere ELSTER-Formulare für Gründer (aus „Alle Formulare")

Kandidaten für eigene Walkthroughs/Guides, nach Relevanz für GründerX-Zielgruppe.
Gap = noch kein Tool; Link = bestehendes Tool könnte verlinken/ergänzen.

**Hohe Relevanz (Gap):**
- **FsE Personengesellschaft / -gemeinschaft** (GbR/OHG/KG) — Co-Founder-Standardfall, aktuell nur Einzelunternehmen abgedeckt
- **FsE Kapitalgesellschaft / Genossenschaft** (fsekapg) — Wizard verlinkt nur, kein Walkthrough
- **Anlage EÜR** — die jährliche Gewinnermittlung, die jede(r) Solo abgibt (FsE ist nur die Anmeldung)
- **USt-Voranmeldung** — monatlich/vierteljährlich, direkt nach Gründung
- **Dauerfristverlängerung** (USt) — häufige Gründer-Aktion

**Mittlere Relevanz:**
- **Zusammenfassende Meldung (ZM)** — für EU-B2B/IGL (ergänzt USt-/OSS-Tools)
- **Antrag auf Anpassung von Vorauszahlungen** — ergänzt Quartals-Steuer-Tool
- **Antrag auf Forschungszulage** — F&E-Steuergutschrift, ergänzt Förderung-DB
- **KSt-Option § 1a KStG** (PersGes optiert zur KSt) — ergänzt Rechtsform/Holding-Tools
- **Einspruch gegen Steuerbescheid** (einreichen/ergänzen/zurücknehmen)
- **Lohnsteuer-Anmeldung** — sobald Mitarbeiter eingestellt werden
- **Anmeldung Steuerabzug Bauleistungen § 48a** — für Bau-/Handwerk-Gründer
- **Mitteilung Sachverhalt mit Auslandsbezug § 138 AO** — ergänzt International-Tools

---

## FsE Kapitalgesellschaft / Genossenschaft (fsekapg-202401)

Verifiziert am 2026-05-30 gegen 24 echte ELSTER-Screencaptures (durchgeklickt, PNG,
lokal unter `docs/elster-fse-ref/kapitalgesellschaft/`, nicht im Git).
Umgesetzt in `src/pages/FseKapgWizard.tsx` (Route `/cockpit/fse-kapitalgesellschaft`).

23 Teilseiten, in ELSTER-Reihenfolge bestätigt: 1 Allgemeine Angaben (Firma Z2,
Adresse Z4–6, Tätigkeit Z13) · 2 Ort der Geschäftsleitung · 3 Betriebstätten ·
4 Gesetzlicher Vertreter · 5 Steuerliche Beratung · 6 Empfangsbevollmächtigte(r) ·
7 Bankverbindung/SEPA (IBAN Z49) · 8 Gesellschaftsvertrag + Register (Notarvertrag Z54,
Register/HRB Z57, Rechtsform Z63) · 9 Beginn/Kapital (Stammkapital Z66, eingezahlt Z67) ·
10 Anteilseigner (Summe % Z67a, Treuhand Z90) · 11 Gründung Bar/Sach · 12 Betriebsaufspaltung ·
13 Komplementärin/atyp. still · 14 Organschaft · 15 Vorauszahlungen KSt/GewSt (Z165–168) ·
16 Lohnsteuer (Z169–177) · 17 Umsatzsteuer (KU §19, Soll/Ist) · 18 USt-IdNr. (Z197–202) ·
19 OSS · 20 Internet-Handel §25e (Z215–218) · 21 Freistellung §48b (Z223) ·
22 Beigefügte Unterlagen (Z224–236) · 23 Anhänge.
Sach-/Umwandlungsgründung (TS 11) und Organschaft (TS 14) nur als Block mit StB-Warnung.

---

## FsE Personengesellschaft / -gemeinschaft (fsepersg-202401)

Verifiziert am 2026-05-30 gegen 25 echte ELSTER-Screencaptures (durchgeklickt, PNG,
lokal unter `docs/elster-fse-ref/personengesellschaft/`, nicht im Git).
Umgesetzt in `src/pages/FsePersgWizard.tsx` (Route `/cockpit/fse-personengesellschaft`).
Für GbR/OHG/KG/PartG/GmbH & Co. KG. Anlagenauswahl davor: Hauptvordruck + optional Anlage ARGE.

22 Teilseiten, in ELSTER-Reihenfolge bestätigt (Reihenfolge wich vom ersten Entwurf ab,
gegen die echten Screenshots korrigiert): 1 Angaben zum Unternehmen (Name Z2, Adresse Z3–5,
Tätigkeit Z12) · 2 Ort der Geschäftsleitung (Z7–9) · 3 Betriebstätten · 4 Gründungsangaben
(Z25–29) · 5 Rechtsform + Beginn (Z31–34) · 6 Handels-/Gesellschaftsregister (Z35–39) ·
7 Bankverbindung/SEPA (Z40–44) · 8 Vertretung der Gesellschaft · 9 Steuerliche Beratung
(Z55–61) · 10 Empfangsbevollmächtigte(r) (§183 AO) · 11 Konzernzugehörigkeit (Z71–76) ·
12 Voraussichtl. Gewinn + Gewinnermittlung (Gewinn Z77, Art Z78, WJ Z79) ·
13 Beteiligte + Gewinnanteil (gesonderte+einheitliche Feststellung) · 14 Freistellung §48b (Z118) ·
15 Lohnsteuer (Z104 ff.) · 16 Umsatzsteuer (KU §19, Soll/Ist) · 17 USt-Organschaft §2 Abs.2 Nr.2 ·
18 USt-IdNr. + §13b · 19 OSS · 20 Internet-Handel §25e (Z175–178) · 21 Beigefügte Unterlagen ·
22 Anhänge.
Kern-Besonderheit ggü. Einzel/KapG: TS 8/11/13 (Vertretung, Konzern, Beteiligte+Gewinnanteil) —
die PersG zahlt selbst keine ESt/KSt, der Gewinn wird auf die Gesellschafter verteilt.

---

## .gitignore-Hinweis

`docs/elster-fse-ref/*` ist komplett ignoriert ausser `*.md`. Alle Screenshot-Ordner
(`screenshots/`, `kapitalgesellschaft/`, `personengesellschaft/`) und PDFs enthalten
persönliche Account-/Steuerdaten und bleiben nur lokal. Nur diese VERIFICATION.md wird getrackt.
