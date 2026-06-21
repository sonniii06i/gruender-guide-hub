# guide-detail — server-gegateter Guide-Inhalt

Liefert die **bezahlten** Guide-Step-Details nur an authentifizierte Nutzer mit
aktivem Abo (oder Admins / comp_access). Server-seitiger Entitlement-Check →
diese Inhalte liegen **nicht** im Client-Bundle und sind nicht aus dem Browser
extrahierbar.

## Was ist gegated (in `secure-data.ts`)

Pro Guide-Step:
- `checklist`, `fields`, `externalLinks`, `warning`, `extendedNotes`
- `description` **ab Schritt 4** (die ersten 3 Beschreibungen bleiben als
  öffentliches SEO-Sample in `src/data/playbooks.ts`)

## Was bleibt öffentlich (`src/data/playbooks.ts`, im Client-Bundle)

Pro Step: `slug`, `title`, `kind`, `estMinutes`, `estCost` + die ersten 3
`description`. Plus alle Guide-Meta (title, tagline, outcome, duration,
difficulty, Kosten). Das ist die crawlbare Outline für die /guides-Landings.

## Inhalt pflegen

`secure-data.ts` ist **generiert** (Einmal-Migration aus playbooks.ts). Beim
Bearbeiten von Guide-Inhalten gilt seither der Split:
- **Öffentliche** Felder (Titel, Zeit/Kosten, erste-3-Beschreibung) → in
  `src/data/playbooks.ts`.
- **Bezahlte** Felder (Checklisten, Formularfelder, Ämter-Links, Warnungen,
  Tipps, Beschreibungen ab Schritt 4) → in `secure-data.ts`.

Der Client lädt die bezahlten Felder zur Laufzeit über den Hook
`src/hooks/useGuideDetail.ts` und mischt sie per `mergeStepDetail` in die Steps
(in `PlaybookRun` und `PlaybookPreview`).

## Request

`POST /functions/v1/guide-detail` mit `Authorization: Bearer <user-jwt>` und
Body `{ "slug": "<playbook-slug>" }`.

- `401` ohne/ungültigen Token
- `403` ohne aktives Abo
- `200` → `{ slug, steps: { [stepSlug]: { …secure fields } } }`
