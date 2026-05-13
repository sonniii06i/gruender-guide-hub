## Ausgangslage

- `index.html` hat nur **eine** sitewide Meta-Sektion → jede Unterseite zeigt aktuell denselben Title/Description.
- Kein `react-helmet-async`, kein Per-Route-SEO.
- Keine `sitemap.xml`, kein Sitemap-Eintrag in `robots.txt`, keine `llms.txt`.
- Die wertvollsten Long-Tail-Inhalte (53 Guides, ~280 Anbieter-Seiten) liegen hinter `PaywallGate` und sind **für Google unsichtbar**.
- Kein strukturiertes Daten-Markup (JSON-LD) außer Default.
- OG-Image zeigt eine Lovable-Preview-URL.

## Zielgruppen / Long-Tail-Cluster

1. **Gründung** – „gmbh gründen kosten", „ug gründen schritt für schritt", „einzelunternehmen anmelden", „us llc für deutsche", „hk limited gründen", „holding aufbauen"
2. **Steuern E-Commerce** – „amazon fba steuer", „oss anmeldung", „vat ecommerce eu", „crypto steuer rechner", „sales tax nexus usa"
3. **Marken & Recht** – „marke anmelden dpma", „brand check", „gpsr compliance", „lucid verpackung"
4. **Förderung & Finanzen** – „förderung gründer 2026", „bwa generator", „iab rechner"
5. **Anbieter-Vergleiche** – „bestes geschäftskonto gründer", „n26 vs holvi", „qonto erfahrungen", „brex deutschland alternative" (~280 Anbieter-Seiten)

## Plan

### 1. Per-Route-Head mit `react-helmet-async`
- `react-helmet-async` installieren, `<HelmetProvider>` in `src/main.tsx` außerhalb von `BrowserRouter`.
- Wiederverwendbare `<Seo>`-Komponente (`src/components/Seo.tsx`) mit Props `title`, `description`, `path`, `image?`, `type?`, `jsonLd?`.
- Auf folgenden Seiten einbinden mit individuellem Title/Description/Canonical:
  - Landing (`/`), `/playbooks`, `/playbook/preview/:slug` (alle 53), `/anbieter`, `/anbieter/:slug` (alle Provider), `/cockpit/...` Tool-Seiten, `/faq`, `/kontakt`, `/impressum`, `/datenschutz`, `/agb`, `/auth`.
- `index.html` bekommt nur noch **sitewide Defaults** (Brand, Fallback-OG, Charset, Viewport) – Canonical wird entfernt (gehört auf Route-Ebene).

### 2. Pflicht-Inhalte aus Paywall ziehen (kritisch fürs Ranking)
- `/playbook/preview/:slug` und `/anbieter/:slug` aus `<PaywallGate>` herausnehmen → öffentlich und indexierbar.
- Die Guides bleiben inhaltlich Marketing-Preview (Schritte, Kosten, Aufwand, Doku-Liste), das **Ausführen** (`/playbook/:runId`) bleibt paywalled. Genau wie heute geplant – nur ohne Login-Wand davor.
- Anbieter-Detail bleibt voll lesbar; CTA „Konto eröffnen / Vergleichen im Cockpit" verlinkt in den paywalled Bereich.

### 3. Strukturierte Daten (JSON-LD)
- **Landing** (`/`) – `Organization` + `WebSite` mit `SearchAction` (Sitelinks-Searchbox).
- **Playbook-Preview** – `HowTo` mit allen Steps (`name`, `text`, `estMinutes`, `estCost`).
- **Anbieter-Detail** – `Product` + `AggregateRating` falls Daten vorhanden, sonst `Organization`/`Service`.
- **FAQ** – `FAQPage` aus dem bestehenden FAQ-Component.
- **Breadcrumbs** – `BreadcrumbList` auf allen Sub-Routes.

### 4. Sitemap-Generator
- `scripts/generate-sitemap.ts` mit `BASE_URL = "https://gruenderx.de"`.
- Statische Routen + alle Guide-Slugs aus `src/data/playbooks.ts` + alle Anbieter-Slugs aus `src/data/...` (auto-extrahiert beim Build).
- `predev` & `prebuild` Scripts in `package.json` ergänzen.
- Schreibt `public/sitemap.xml`.

### 5. robots.txt + llms.txt
- `Sitemap: https://gruenderx.de/sitemap.xml` ergänzen.
- `public/llms.txt` mit Site-Beschreibung + Top-Routen für AI-Crawler (ChatGPT, Perplexity, Claude).

### 6. On-Page-SEO Hardening
- Sicherstellen: **eine** `<h1>` pro Seite, semantische Sektionen, beschreibende `alt`-Texte auf Landing-Bildern.
- Interne Verlinkung: Auf jeder Guide-Preview Block „Verwandte Guides" + „Passende Anbieter"; auf Anbieter-Detail Block „Verwandte Anbieter" (existiert) + „Relevante Guides".
- 404-Seite (`NotFound`) bekommt sinnvolle Links zurück in die Guide-Übersicht.
- OG-Default-Image durch ein on-brand Bild aus `src/assets` ersetzen (oder generieren) statt Lovable-Preview-URL.

### 7. Tracking-Hygiene
- Aktueller `useTrackPageview` läuft serverless ohne Auth-Check für Landing-Routen → ok, beibehalten. Sicherstellen, dass keine PII in URLs landet.

## Was du kriegst

- **53 öffentliche Guide-Landingpages** mit eigenem Title/Description/JSON-LD/HowTo-Schema → Long-Tail-Treffer für jeden Gründungs-Use-Case.
- **~280 öffentliche Anbieter-Seiten** mit eigenem Markup → riesige Long-Tail-Fläche („[Anbieter] Erfahrungen", „[Anbieter] vs [Anbieter]").
- Sitemap automatisch bei jedem Build aktualisiert.
- Saubere Per-Page Social-Previews (LinkedIn/X/Facebook).
- AI-Crawler-Ready via `llms.txt`.

## Technische Notizen

- `react-helmet-async` mutiert `document.head` clientseitig. Googlebot rendert JS und sieht alles korrekt; klassische Social-Crawler (LinkedIn, Slack) sehen nur den Static-Head – darum bleibt in `index.html` ein sinnvoller Fallback-OG.
- Für SSR-Qualität (z.B. perfekte Social-Previews je Guide ohne Fallback) wäre langfristig ein Wechsel auf eine SSR-Lösung nötig – aktuell außerhalb des Scopes, kein Lovable-Standard.
- Das Entkoppeln von Preview ↔ Run hinter Paywall ist die größte Hebelwirkung – ohne diesen Schritt bleiben 90 % des Contents für Google unsichtbar.
- Sitemap-Generator listet Anbieter-Slugs durch Parsen der Anbieter-Datendatei beim Build (kein Runtime-DB-Call nötig).

## Was NICHT Teil dieses Plans ist

- Programmatic-SEO-Cluster wie „Steuerberater [Stadt]" (kann später als eigener Schritt kommen, braucht Datenpflege).
- Blog/Ratgeber-System mit MDX – falls gewünscht, separat planen.
- Backlink-Aufbau / Off-Page-SEO.
