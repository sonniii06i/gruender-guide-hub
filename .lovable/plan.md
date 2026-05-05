## Ziel

Das Cockpit fühlt sich aktuell wie eine Tool-Liste an. Wir bauen es um zu einer **Lernplattform / Kurs-Plattform** im AnwaltX-Stil: alle Themen (US-LLC gründen, Holding aufbauen, Marke anmelden, FBA launchen…) sind als **Guides / Kurse** auffindbar, durchsuchbar und sofort startbar – auch ohne Company / ohne Onboarding.

---

## 1. Globale Suche im Header (Command Palette)

Neue Komponente `GlobalSearch` (im Header neben Bell + Avatar), getriggert per Klick **oder** Shortcut **⌘K / Strg+K**.

- Input: "z. B. US LLC gründen, Holding, Marke anmelden, IAB…"
- Suche-Index zieht aus **3 Quellen**:
  1. **Guides** (`PLAYBOOKS` aus `src/data/playbooks.ts`) – primär
  2. **Tools / Features** (`CATEGORIES` aus `src/data/features.ts`)
  3. **Quick-Aktionen** ("Felix fragen zu …", "Alle Guides anzeigen")
- Treffer-Karten zeigen: Emoji, Titel, Kategorie-Tag, Dauer, Difficulty, Status (Live/Beta/Bald)
- Klick auf einen Guide → startet `/playbooks` Run direkt **oder** öffnet die Guide-Detail-Seite (siehe 3.)
- Klick auf ein Tool → springt zur Route
- "Kein Treffer" → CTA "Felix fragen zu '...'" → öffnet Felix-Chat mit vorausgefüllter Frage

Implementierung: `cmdk` (bereits in shadcn `command.tsx` enthalten) in einem `Dialog`.

## 2. Sidebar verschlanken (Lernplattform-Stil)

Aktuell ist die Sidebar überladen mit allen 8 Kategorien + Sub-Items. Neu:

```text
[Logo] GründerX · Lernplattform

– Übersicht
– Felix-Chat
– Chat-Übersicht
————
LERNEN
– Alle Guides           (/playbooks)
– Meine Guides          (laufende Runs)
– Tools & Rechner       (/dashboard?view=tools)
————
RESSOURCEN
– Anbieter-Vergleich
– Steuer-Cockpit
– Rechtsform-Wizard
————
[Footer: Community, Support, FAQ]
```

Die langen Kategorie-Bäume verschwinden aus der Sidebar – stattdessen sind sie auf der Übersicht / im Guide-Katalog navigierbar. Das fühlt sich kursartig an, nicht wie ein Admin-Panel.

## 3. Übersicht (`/dashboard`) als Kurs-Katalog

Komplett neu, im AnwaltX-Stil (helle Cards, klare Typo, blaue Akzente, viel Whitespace). Sektionen von oben nach unten:

1. **Hero** – "Hi {Name}. Wo willst du heute weitermachen?" + großer Such-Trigger ("⌘K Suchen…")
2. **Weitermachen** – Karten der laufenden `playbook_runs` mit Fortschrittsbalken (X/Y Schritte, "Weiter" Button). Wenn keine Runs: leerer State mit CTA.
3. **Beliebte Guides** – Grid mit Top-Playbooks: US-LLC, GmbH, Holding, Marke, FBA-Launch (aus `PLAYBOOKS`). Jede Card: Emoji, Titel, Tagline, Dauer, Difficulty, Schritt-Anzahl, "Guide starten" Button → erstellt einen Run.
4. **Themen entdecken** – Kategorien-Strip (Internationale Setups · DE-Steuer · Rechtsform · Marken · Buchhaltung · Compliance · Anbieter · Premium) – horizontal scrollbar, klick filtert die Tool-Liste darunter.
5. **Tools & Rechner** – die bestehenden `CATEGORIES.features` als kompaktes Grid (das was heute im Dashboard ist), gefiltert nach gewählter Kategorie. Cards bleiben mit Live/Beta/Bald-Status.
6. **Felix-CTA** – wie bisher, etwas dezenter.

Visueller Stil: `rounded-2xl`, dünne Borders, große Headlines (Plus Jakarta), kleine kicker-Labels in `accent-blue`, dezente Schatten – passt zur AnwaltX-Linie.

## 4. Random reinstarten ohne Company / Onboarding

Aktuell zwingt `AppLayout` jeden Nicht-Admin **erst durch Onboarding, dann durch Paywall**. Das blockt explorierendes Verhalten.

Änderungen in `src/layouts/AppLayout.tsx`:

- **Onboarding** wird **optional**. Statt Redirect zeigen wir auf der Übersicht ein dismissable Banner "Profil vervollständigen → bessere Empfehlungen" mit Link auf `/onboarding`.
- **Paywall** bleibt für gated Tools, aber: Übersicht, alle Guide-Detail-Seiten (Vorschau), Felix-Chat-Vorschau und die Suche sind **frei** zugänglich. Erst beim **Start eines Guides** oder **Öffnen eines Live-Tools** wird die Paywall gezeigt (wie heute, aber kontextuell).
- Konkret: Redirect-Logik in AppLayout entfernt → ersetzt durch Lock-Overlays auf den jeweiligen Routen (Steuer-Cockpit, Wizard, Anbieter, Playbook-Run). Existierende `useAccess`-Checks dort beibehalten.

## 5. Guide-Start-Flow

`Playbooks.tsx` bekommt:
- Filter-Chips oben (Alle · International · Rechtsform · Marken · Launch · Steuer)
- Suchfeld (lokal, zusätzlich zur globalen)
- Card-Layout wie auf der Übersicht, konsistent

`PlaybookRun.tsx` bleibt funktional, bekommt aber ein konsistenteres Header-Design mit Fortschritts-Pill und "Zurück zur Übersicht".

## 6. Inhalte / Use-Cases erweitern

`src/data/playbooks.ts` erhält 3–4 zusätzliche Guides für mehr Breite:
- **UG (haftungsbeschränkt) gründen** (Einsteiger-Variante GmbH)
- **Kleinunternehmer-Regelung nutzen & wechseln** (DE-Steuer)
- **Shopify-Brand launchen (DACH)** (Pendant zu FBA)
- **Influencer / Creator: Erstes Setup** (Steuern, Rechtsform, Verträge)

Die 7 bestehenden bleiben.

---

## Technische Details

**Neue Dateien**
- `src/components/GlobalSearch.tsx` – ⌘K Command-Dialog
- `src/components/dashboard/ContinueLearning.tsx` – laufende Runs
- `src/components/dashboard/GuideCard.tsx` – wiederverwendbare Guide-Card
- `src/hooks/useGuideStart.ts` – startet/sucht Run, navigiert (extrahiert aus `Playbooks.tsx`)

**Geänderte Dateien**
- `src/layouts/AppLayout.tsx` – Onboarding-Redirect entfernen, Paywall-Redirect entfernen
- `src/components/AppSidebar.tsx` – neue Struktur (siehe oben)
- `src/components/HeaderActions.tsx` – `GlobalSearch`-Trigger einbauen (links neben Bell)
- `src/pages/Dashboard.tsx` – komplett neu im Kurs-Katalog-Stil
- `src/pages/Playbooks.tsx` – Filter + Suche
- `src/pages/SteuerCockpit.tsx`, `RechtsformWizard.tsx`, `Anbieter.tsx`, `PlaybookRun.tsx` – Lock-Overlay für nicht-zahlende User (kleiner Wrapper) statt Redirect
- `src/data/playbooks.ts` – 3–4 neue Guides
- `src/data/features.ts` – Status-Anpassung wo passend (z. B. `gmbh-gruendung` als Live verlinken auf Playbook)

**Keine Datenbank-Änderungen.** `playbook_runs`-Tabelle wird bereits genutzt; "Weitermachen" liest einfach `status != 'completed'` für den User.

**Stil:** bleibt strikt im bestehenden Token-System (`accent-blue`, `card`, `border`, `gradient-primary`, `shadow-soft/card/glow`) – keine neuen Farben.
