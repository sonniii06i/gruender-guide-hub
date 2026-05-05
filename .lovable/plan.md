**Sichtbarkeit:** Der Admin-Tab ist bereits nur für dich sichtbar (Sidebar prüft `useRole().isAdmin` über die `user_roles`-Tabelle, du bist als einziger Admin eingetragen). Direkter Aufruf von `/admin` schickt Nicht-Admins zurück aufs Dashboard. Daran ändert sich nichts.

## 1. RLS-Migration: Admins dürfen alle Kundendaten lesen

Aktuell sieht Admin-UI nur **deine eigenen** Daten, weil `profiles` / `subscriptions` / `chat_messages` / `playbook_runs` per RLS auf den jeweiligen Owner beschränkt sind. Neue Policies via `has_role(auth.uid(),'admin')`:

- `profiles` → SELECT für Admins
- `subscriptions` → SELECT für Admins
- `chat_messages` → SELECT für Admins (Felix-Konversationen einsehen)
- `playbook_runs` → SELECT für Admins
- `playbook_step_progress` → SELECT für Admins

Schreibrechte bleiben für Nutzer auf eigene Zeilen beschränkt.

## 2. Admin-Cockpit komplett ausbauen (`src/pages/Admin.tsx`)

Neuer Aufbau mit 4 Tabs + KPI-Header:

**KPI-Leiste (immer sichtbar)**
- Nutzer gesamt + Neuregistrierungen (7T / 30T)
- Aktive Abos + Conversion-Rate (Abo / Nutzer)
- MRR (geschätzt aus Plan-Mix · 99,99 € / 179,99 €) + ARR
- Onboarding-Rate, offene Tickets, Felix-Nachrichten gesamt, Playbook-Runs gesamt

**Tab „Übersicht" (neu)** – Marketing-Cockpit
- Signup-Sparkline letzte 30 Tage (täglich)
- Plan-Mix der aktiven Abos (Balken)
- Top-Geschäftsmodelle (Amazon FBA, Shopify, Creator, Agentur, SaaS, Anderes)
- Rechtsform-Mix
- Top-Länder
- Engagement-Block (Felix-Messages, Playbook-Runs, Tickets)

**Tab „Kunden"**
- Volltext-Suche (Name, E-Mail, Firma, Land)
- Spalten: Name, E-Mail (Mailto-Link), Firma, Geschäftsmodell, Rechtsform, Stadt/Land, aktueller Plan, Abo-Status, Erstellt
- CSV-Export der gefilterten Liste (für Marketing-/Mail-Tools)

**Tab „Abos"**
- Tabelle mit Kunde + E-Mail (gejoint), Plan, Status, Period End, letztes Update
- CSV-Export

**Tab „Tickets"** (bestehende Funktionalität bleibt)
- Liste links, Detail + Antwort rechts, Status-Buttons

## 3. Sidebar

Keine Änderung nötig – Admin-Tab wird weiterhin nur dir gezeigt (`isAdmin && Item /admin`).

## Technische Details

- Eine SQL-Migration mit den fünf Admin-SELECT-Policies oben.
- `Admin.tsx` wird neu geschrieben, lädt einmalig `profiles`, `subscriptions`, `contact_tickets` (volle Datensätze, bis 1000) plus `count` von `chat_messages` und `playbook_runs`. Alle KPIs werden client-seitig per `useMemo` berechnet → keine zusätzlichen Funktionen nötig.
- CSV-Export rein im Browser (Blob-Download), keine zusätzlichen Libraries.
- Keine neuen Dependencies.

Betroffene Dateien:
- `supabase/migrations/<timestamp>_admin_select.sql` (neu)
- `src/pages/Admin.tsx` (komplett überarbeitet)