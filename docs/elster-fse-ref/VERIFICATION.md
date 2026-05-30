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
