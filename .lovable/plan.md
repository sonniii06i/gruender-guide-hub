## Ausgangslage

Stand SEO nach letzter Runde (bereits live):
- 193 indexierbare URLs (Landing, 53 Guide-Previews, 132 Anbieter, FAQ).
- `react-helmet-async` + `<Seo>`-Komponente, JSON-LD für `Organization`, `WebSite`, `HowTo`, `Product`, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` automatisch beim Build, `robots.txt` + `llms.txt`.

Was fehlt für „flawless"-Ranking auf Long-Tail:
- **Kein frischer Content.** Google ranked News-Themen („Steuer 2026", „Mindestlohn 2026", „§7g Reform") nicht ohne aktuelle Artikel.
- **Keine Hub-Seiten** für Vergleichs-Cluster („Geschäftskonto Vergleich", „GmbH gründen Kosten 2026", „N26 vs Qonto").
- Sichtbare H1/H2-Struktur auf Guide-/Anbieter-Seiten ist OK, aber **wenig Lese-Text** unter den Datenblöcken → Google sieht primär Listen/Tabellen, kaum semantischen Korpus.
- **Keine interne Verlinkung** zwischen Themen-Clustern.

## Plan

### 1. Ratgeber-/Blog-System (Kernstück)

**Schema (Supabase)**
- Tabelle `blog_posts`: `id`, `slug`, `title`, `excerpt`, `body_md` (Markdown), `hero_image_url`, `category`, `tags[]`, `meta_title`, `meta_description`, `keywords[]`, `related_playbooks[]`, `related_providers[]`, `published_at`, `updated_at`, `status` (`draft`/`published`), `author` (Default „Felix"), `reading_minutes`, `view_count`.
- Tabelle `blog_topic_queue`: `id`, `topic`, `keyword_primary`, `keyword_secondary[]`, `briefing`, `priority`, `scheduled_for`, `consumed_at`, `post_id`.
- RLS: `SELECT` für alle (öffentlich), `INSERT/UPDATE/DELETE` nur Service-Role (Edge-Functions / Admins).

**Frontend-Routen (öffentlich, `PublicShell`)**
- `/ratgeber` — Hub mit Filter (Kategorie, Tags), Suche, Pagination.
- `/ratgeber/:slug` — Artikel mit Hero, Lesezeit, Inhaltsverzeichnis (Auto-TOC aus H2), Artikel-Body, „Verwandte Guides" + „Passende Anbieter"-Block, Author-Box, JSON-LD `Article` + `BreadcrumbList`, Open-Graph mit Hero-Bild.
- Stark interne Verlinkung: Artikel verlinkt automatisch in den ersten Erwähnungen Guide-Slugs (`/playbook/preview/...`) und Anbieter-Slugs (`/anbieter/...`).

### 2. Automatisierte Content-Generierung (2× pro Woche)

**Topic-Backlog**
- Seed mit ~80 vor-recherchierten Long-Tail-Themen aus den 5 Clustern (Gründung, Steuern, E-Commerce, Marken, Anbieter-Deepdives) — Slug + Keyword + Briefing-Hint, gestaffelte `scheduled_for`-Termine über die nächsten 10 Monate (Di + Fr).
- Beispiele: „GmbH Gründungskosten 2026 – komplette Übersicht", „§7g IAB: So sparst du 2026 Steuern als Gründer", „N26 vs Qonto vs Holvi – Geschäftskonto-Vergleich 2026", „Amazon FBA OSS-Anmeldung Schritt für Schritt", „Kleinunternehmer ab 2026 – neue Grenzen erklärt".

**Edge-Function `generate-blog-post`**
- Aufruf via `pg_cron` jeden Di + Fr 06:00 (Europe/Berlin).
- Liest nächsten fälligen Topic aus `blog_topic_queue`.
- Recherche-Schritt: Tavily / DuckDuckGo Search API (oder Lovable AI „search"-fähiges Modell) → 5–8 aktuelle Quellen.
- Generierungs-Schritt via Lovable AI Gateway (Gemini 2.5 Pro / GPT-5-mini): strukturierter Prompt mit:
  - Pflicht-Sektionen (Einleitung, „Worum geht's", H2-Hauptteil mit 4–6 Unterpunkten, „Was du jetzt tun solltest", FAQ-Block, Quellen).
  - Pflicht-interne-Links (mind. 3 Guides + 2 Anbieter aus Datenbank).
  - Tonalität: GründerX-Stil (klar, konkret, gründer-zentriert, kein Marketing-Bullshit).
  - 1.200–1.800 Wörter, deutscher Markt, Stand 2026.
- Erzeugt zusätzlich `meta_title`, `meta_description`, `keywords[]`, `excerpt`, `reading_minutes`.
- Hero-Image via Lovable AI Image-Gen (1280×720, on-brand).
- `INSERT` mit `status='published'` (oder `draft` falls Admin-Review aktiviert) und triggert Sitemap-Refresh-Signal.

**Qualitätsgate**
- Min-Wörter-Check, Keyword-Dichte-Check, Pflicht-Link-Check. Bei Fail → `status='draft'` + Notification an Admin.

### 3. Hub-Seiten (programmatisches SEO, hand-kuratiert)

Öffentliche Vergleichs-/Übersichtsseiten unter `PublicShell`:
- `/vergleich/geschaeftskonto` — Top-10-Tabelle aus `PROVIDERS` (Kategorie: Geschäftskonto), Kriterien-Filter, Detail-Block je Anbieter mit Link.
- `/vergleich/buchhaltung`, `/vergleich/notar`, `/vergleich/hosting` analog.
- `/rechtsform/gmbh`, `/rechtsform/ug`, `/rechtsform/einzelunternehmen`, `/rechtsform/holding`, `/rechtsform/ug-vs-gmbh` — Long-Read-Pages mit Kosten/Vorteile/Steuern/Vergleich, intern verlinkt mit dem entsprechenden Guide und 2–3 passenden Blog-Artikeln.

Jede Hub-Seite mit eigener `<Seo>`, Breadcrumb-JSON-LD und `ItemList`-/`Article`-Schema.

### 4. On-Page-Hardening (bestehende Seiten)

- **PlaybookPreview**: Unter dem Step-Block ein 3–5-Absätze-Lese-Block hinzufügen, der die wichtigsten Schritte semantisch beschreibt (statt nur Listen). Auto-generiert aus `step.description` + Übersichtstext.
- **AnbieterDetail**: „Ähnliche Anbieter"-Block bekommt vollwertige Karten mit Beschreibung statt nur Links + „Relevante Guides" mit 3 passenden Guides (Match nach Kategorie).
- **Landing**: H1 enthält bereits Keyword, aber `IntroBand` H2 ist zu generisch — durch keyword-reichere Variante ersetzen („Unternehmen gründen in Deutschland – komplette Schritt-für-Schritt-Anleitung").
- Alle Hub-Seiten + neue Routen in Sitemap aufnehmen.

### 5. Google-Indexierung beschleunigen

- **IndexNow**: Edge-Function `notify-indexnow`, getriggert beim Publish eines Blog-Posts / Sitemap-Build. Pings Bing/Yandex (IndexNow-Protokoll).
- **Google Search Console Sitemap-Ping**: Manuell einmalig (Setup-Anleitung im Admin).
- **Letzte 50 Posts als RSS** unter `/rss.xml` (statisch generiert beim Build / via Edge-Function).

### 6. Admin-Steuerung

- Neue Seite `/admin/blog` (hinter `useRole` Admin-Check):
  - Topic-Queue ansehen + neue Topics hinzufügen.
  - Generierte Posts reviewen (Approve / Reject / Edit).
  - „Jetzt generieren"-Button (manueller Trigger).
  - Stats: Views, Top-Posts.

### 7. Sitemap & llms.txt

- `scripts/generate-sitemap.ts` erweitern: Blog-Slugs werden via Supabase-Client am Build geladen (statt nur Static-Parsing).
- `llms.txt`: Sektion `## Ratgeber` mit Link auf `/ratgeber`.

## Was du am Ende bekommst

- **Wachsende Long-Tail-Fläche**: 8 Posts/Monat × 12 Monate = ~100 Artikel/Jahr — jeder targetet ein konkretes Keyword.
- **Hub-Pages** für Top-Suchanfragen, die kein Guide alleine abdeckt.
- **Frischesignal** für Google (jeden Di/Fr neuer publizierter Content + Sitemap-Update).
- **Admin-Kontrolle**: kein Auto-Müll, du kannst alles vor Veröffentlichung kontrollieren wenn du willst.
- **Indexierungs-Signale** (IndexNow, RSS).

## Was NICHT automatisch passieren kann

- **Backlinks**: SEO besteht zu ~50 % aus Off-Page. Content schafft die Voraussetzung, Backlinks musst du manuell aufbauen (Partner, Foren, PR) — kann ich nicht automatisieren.
- **Garantie auf Top-10-Ranking**: niemand kann das garantieren — wir geben Google maximale Munition.
- **Vollständig autonome Qualität**: KI-Posts brauchen anfangs Stichprobenkontrolle (deshalb der Admin-Review-Toggle).

## Technische Notizen

- Cron via `pg_cron` + `pg_net` ruft die Edge-Function. Pattern aus dem Lovable-Cloud-Standard.
- Lovable AI Gateway (kein eigener OpenAI-Key nötig) — Model `google/gemini-2.5-pro` für Generierung, `google/gemini-2.5-flash-image-preview` für Hero-Bild.
- Web-Research: Edge-Function nutzt entweder Tavily API (separater Key nötig) ODER reine LLM-Generierung mit explizitem „Stand 2026"-Disclaimer in den Posts. Default: ich frage dich vor Implementierung welche von beiden.
- Markdown-Render via bereits installiertes `react-markdown`.

## Offene Fragen (1 Antwort genügt)

1. **Web-Research für die Posts**: Mit echter Live-Suche (Tavily, ca. ~10 $/Monat, externer API-Key nötig) ODER nur LLM-Wissen mit Stand-2026-Disclaimer (gratis, etwas weniger aktuell)?
2. **Auto-Publish vs. Review**: Sollen neue Posts direkt live gehen oder warten sie auf deinen „Approve"-Klick im Admin-Bereich?
