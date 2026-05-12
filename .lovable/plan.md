## Ziel

Den Guide-Katalog massiv erweitern, sodass **Gründer aus allen typischen Branchen** den passenden Schritt-für-Schritt-Guide finden — egal ob Freelancer, Restaurant, Handwerk, Online-Coach, SaaS oder Immobilien-GbR. Die Guides bleiben im bestehenden Stil (Lernplattform, AnwaltX-Look) und nutzen das vorhandene `Playbook`-Schema in `src/data/playbooks.ts` plus die existierenden Step-Widgets.

## Neue Guides (10 Stück)

Priorisiert nach Nachfrage in DACH (laut typischen Such-Volumina + IHK/HWK-Beratungsthemen):

1. **Freiberufler / Freelancer anmelden** 🧑‍💻
   *Zielgruppe: Entwickler, Designer, Berater, Texter, Coaches.*
   Schritte: Freiberuf vs. Gewerbe abgrenzen (Katalogberufe) · Finanzamt-Anmeldung via ELSTER (FsE) · Kleinunternehmer-Entscheidung · Künstlersozialkasse (KSK) prüfen · Berufshaftpflicht · erste Rechnung & Pflichtangaben.

2. **Einzelunternehmen / Gewerbe anmelden** 🏪
   *Klassischer Einstieg ohne Stammkapital.*
   Schritte: Tätigkeit definieren (erlaubnispflichtig?) · Gewerbeamt-Anmeldung · Finanzamt FsE · IHK/HWK-Pflicht · Kleinunternehmer · Buchhaltung-Setup (EÜR).

3. **GbR gründen (z. B. mit Mitgründer / Immobilien)** 🤝
   Schritte: Partner & Anteile klären · GbR-Vertrag (Vorlage + Klauseln Haftung/Gewinn/Ausstieg) · Gewerbeamt für alle Gesellschafter · Steuernummer & gesonderte Feststellung · Geschäftskonto · Haftungsrisiken & Wechsel zur OHG/GmbH.

4. **Restaurant / Gastronomie eröffnen** 🍽️
   *Sehr nachgefragt, viele Sondergenehmigungen.*
   Schritte: Konzept & Standort · Gaststättenkonzession (§ 2 GastG) · Hygiene-Schulung (IfSG § 43) · Bauamt-Nutzungsänderung · GEMA & Künstlersozialkasse · Schankerlaubnis · Kasse (TSE) · HACCP-Konzept · Personal anmelden.

5. **Handwerksbetrieb gründen (HWK)** 🔨
   Schritte: Anlage A vs. B prüfen (Meisterpflicht) · Handwerksrolle eintragen · Ausnahmebewilligung / Altgesellenregelung · HWK-Mitgliedschaft & Beitrag · Berufsgenossenschaft BG BAU · Versicherungen · Materialeinkauf-Konditionen.

6. **Online-Shop / E-Commerce starten (Shopify-Alternative WooCommerce/Shopware)** 🛒
   *Pendant zum bestehenden Shopify-Guide, breiter & rechtsformunabhängig.*
   Schritte: Rechtsform-Mini-Check · Impressum/AGB/Widerruf/Datenschutz (mit Generator-Links) · Verpackungsregister LUCID · OSS-Verfahren EU-USt · Zahlungsanbieter (Stripe/Klarna/PayPal) · Trusted Shops · Retouren-Logistik.

7. **Online-Coach / Info-Produkt / Digitale Dienstleistung** 🎓
   *Boom-Branche, hohe Nachfrage.*
   Schritte: Einzel- vs. UG · Digitale Leistungen & MOSS/OSS · Zahlungs-Tools (Digistore24, Copecart, Stripe) · Disclaimer für Coaching/Heilversprechen · Verträge & AGB · Steuer auf Online-Umsätze · Affiliate-Aufbau.

8. **Immobilien-GmbH / Vermögensverwaltende GmbH** 🏠
   *Stark gefragt: Steuer-Hebel über erweiterte Kürzung.*
   Schritte: Strategie (Bestandshalter vs. Trader) · Erweiterte gewerbesteuerliche Kürzung (§ 9 Nr. 1 S. 2 GewStG) · Holding-Struktur empfehlen · Notar & HR · Banken für Immo-Finanzierung · Buchhaltung mit AfA · Risiken (gewerblicher Grundstückshandel).

9. **AG (Aktiengesellschaft) gründen** 📈
   *Für ambitionierte Startups mit VC-Plänen.*
   Schritte: Sinnvoll? (Mindestkapital 50k, Aufsichtsrat-Pflicht) · Vorbereitung Gründungsdokumente · Notar & Sachgründungsprüfung · Aufsichtsrat bestellen · HR-Eintrag · Aktienregister · Erste HV.

10. **Verein / gemeinnützige UG (gUG)** 💚
    *Für Social-Impact-Projekte, Sportclubs, NGOs.*
    Schritte: e.V. vs. gUG entscheiden · 7 Gründungsmitglieder + Satzung (Mustersatzung Anlage 1 AO) · Gründungsversammlung & Protokoll · Notar (nur gUG) · Vereinsregister/HR · Gemeinnützigkeit beim Finanzamt beantragen · Spendenquittung-Berechtigung.

## Reihenfolge im Katalog

Eingefügt nach den bestehenden Top-Guides (GmbH, UG, Holding):

```text
1. GmbH-Gründung
2. UG-Gründung
3. Einzelunternehmen / Gewerbe          ← NEU
4. Freiberufler / Freelancer            ← NEU
5. GbR                                   ← NEU
6. Holding
7. Kleinunternehmer-Regelung
8. Restaurant / Gastronomie              ← NEU
9. Handwerksbetrieb (HWK)                ← NEU
10. Marke anmelden
11. Online-Shop / E-Commerce             ← NEU
12. Shopify-Launch (bestehend)
13. Amazon FBA
14. Online-Coach / Digital               ← NEU
15. Creator/Influencer
16. Immobilien-GmbH                      ← NEU
17. Verein / gUG                         ← NEU
18. AG                                   ← NEU
19. US LLC
20. Hongkong Limited
```

## Technische Umsetzung

**Eine zentrale Datei-Erweiterung:**
- `src/data/playbooks.ts` — 10 neue `Playbook`-Einträge mit jeweils 6–10 Steps (Mix aus `info`, `checklist`, `form`, `external`). Jeder Step bekommt **echte externe Links** (ELSTER, Handelsregister, IHK, HWK, LUCID, GEMA, BG BAU, EUIPO etc.) damit User direkt loslegen können.
- Stil & Schema bleiben identisch zu den bestehenden Guides — keine neuen Felder, keine UI-Änderungen nötig.
- `GuideCard`, `Playbooks.tsx`, `GlobalSearch` ziehen automatisch aus `PLAYBOOKS` → erscheinen sofort im Katalog & in der ⌘K-Suche.

**Optional (nur wenn gewünscht, sonst weglassen):**
- Filter-Chips in `Playbooks.tsx` um Branchen-Filter erweitern (Gastro · Handwerk · Digital · Immobilien · Klassisch). Aktuell filtert die Seite nur nach Schwierigkeit. Würde ein neues Feld `category` auf `Playbook` brauchen.

**Keine DB-Änderungen.** Keine neuen Edge-Functions. Keine neuen Komponenten.

## Was nicht in diesem Schritt

- Tiefe interaktive Widgets (à la `CompanyNameCheck` / `NotarFinder`) für die neuen Guides — die bestehenden Widgets greifen weiter nur in `gmbh-gruendung`. Falls du danach für z. B. „Restaurant" einen Konzessions-Helper willst, machen wir das in einem Folge-Schritt.
- Keine neuen Kategorien in der Sidebar — bleibt aufgeräumt.

## Ergebnis

Nach dieser Änderung deckt die Plattform die **20 häufigsten Gründungs-Pfade in DACH** ab. Egal ob jemand „Restaurant aufmachen", „freiberuflich starten" oder „Immobilien-GmbH" sucht — über ⌘K landet er sofort im richtigen Guide.
