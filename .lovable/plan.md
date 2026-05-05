## Ziel
1. Live-Test des Mailversands (IONOS SMTP via `send-ticket-email`)
2. Admin-Cockpit zeigt nur **echte, bezahlte** Daten – keine Schätzungen
3. **Echte Conversion** (alle Webseitenbesucher → registriert → bezahlt) inkl. cookieloser Visitor-Tracking-Pipeline

---

## 1) Mailversand testen
- Edge-Function `send-ticket-email` direkt aufrufen mit Test-Payload (Name/Mail/Subject/Message → Empfänger `impressum@gruenderx.de`)
- Logs prüfen, ob SMTP (smtp.ionos.de:587, User `impressum@gruenderx.de`, Secret `IONOS_SMTP_PASSWORD`) durchkommt
- Ergebnis im Chat zurückmelden (Erfolg/Fehler + Log-Auszug)
- Falls Fehler: Diagnose (Auth, TLS-Port 587 STARTTLS), ggf. Patch der Function

---

## 2) Admin: nur echte Daten

**MRR / Aktive Abos** – Quelle: Stripe statt geschätzter Preisliste
- Neue Edge-Function `admin-stripe-stats` (verify_jwt = false, prüft `has_role(admin)` per Service-Role)
  - Nutzt `STRIPE_SECRET_KEY`
  - Listet `subscriptions` mit `status=active` (+ `trialing` separat)
  - Summiert `items.price.unit_amount` × `quantity` (monatlich normalisiert: yearly → /12)
  - Liefert: `{ activeCount, trialingCount, mrrCents, arrCents, byPlan: [{name, count, mrrCents}] }`
- Admin.tsx ruft die Function statt lokal zu schätzen → echte EUR-Werte aus Stripe
- DB-`subscriptions`-Tabelle bleibt Anzeige der Statusübersicht, aber KPI-Karten = Stripe-Wahrheit

**Aktive Abos KPI**
- Nur `status='active'` (Trial getrennt ausweisen, nicht in „aktiv" mischen)

**Conversion**
- Bisher: aktive Abos / Profile (falsch – ignoriert anonyme Besucher)
- Neu: 3-stufiger Trichter
  - Visitors (unique) → Signups (profiles) → Paid (Stripe active)
  - Anzeige: `Visitor→Signup %`, `Signup→Paid %`, `Visitor→Paid %`

---

## 3) Visitor-Tracking (cookieless, DSGVO-freundlich)

**Kein Cookie nötig.** Wir nutzen einen **täglich rotierenden, gehashten Visitor-Hash** (kein personenbezogenes Datum, keine Zustimmung erforderlich – ähnlich Plausible/Fathom-Ansatz). Falls du klassisches Cookie-Tracking willst, sag Bescheid.

**Neue Tabelle** `page_views`
```
id uuid pk
visitor_hash text not null   -- sha256(ip + ua + date + salt)
path text not null
referrer text
country text                 -- aus CF/Vercel Header optional
utm_source/medium/campaign text
user_id uuid                 -- falls eingeloggt
created_at timestamptz default now()
```
- RLS: nur Admin SELECT; INSERT via Edge-Function (Service-Role) – kein direkter Client-Insert

**Neue Edge-Function** `track-pageview` (verify_jwt = false, public)
- Empfängt `{ path, referrer, utm_* }` vom Client
- Liest `x-forwarded-for`, `user-agent` aus Header
- Berechnet `visitor_hash = sha256(ip + ua + YYYY-MM-DD + SECRET_SALT)` (rotiert täglich → kein dauerhaftes Tracking → kein Cookie)
- Insert in `page_views`
- Neuer Secret: `TRACKING_SALT` (zufällig generiert beim Migration-Run, oder ich frag dich nach einem Wert)

**Client-Hook** `useTrackPageview`
- In `App.tsx` einbinden, lauscht auf Routenwechsel (`useLocation`)
- Sendet fire-and-forget `fetch` an `track-pageview`
- Filtert `/admin*` raus (sonst verfälscht)

**Admin-KPIs neu**
- „Besucher (30T)" = `count(distinct visitor_hash)` der letzten 30 Tage
- „Unique Visitors heute" = today
- Trichter-Visualisierung: Visitors → Signups → Paid mit % zwischen Stufen
- Top-Referrer + Top-UTM-Quellen Panels (echtes Marketing-Insight)
- 30-Tage-Visitor-Sparkline neben Signup-Sparkline

---

## Technische Details (nicht user-facing)

**Migrationen**
- `page_views` Tabelle + RLS (admin SELECT, kein public INSERT)
- Index auf `(created_at)`, `(visitor_hash, created_at)`

**Secrets**
- `TRACKING_SALT` (auto-gen zufällig, ich setze ihn)

**Edge Functions** (config.toml ergänzen, beide `verify_jwt = false`)
- `track-pageview`
- `admin-stripe-stats`

**Geänderte Dateien**
- `src/pages/Admin.tsx` – KPIs aus Stripe-Function + Visitor-Stats + echter Funnel
- `src/App.tsx` oder neuer `src/hooks/useTrackPageview.tsx`
- `supabase/functions/track-pageview/index.ts` (neu)
- `supabase/functions/admin-stripe-stats/index.ts` (neu)
- `supabase/config.toml`
- Migration: `page_views` + Policies

---

## Hinweise
- **Cookie?** Nein, mit dem täglich-rotierenden Hash brauchen wir keinen Consent-Banner. Falls du echtes Cross-Day-Tracking willst (z.B. Wiederkehrer über Wochen), brauchen wir einen Cookie + Consent – sag Bescheid.
- **Stripe MRR**: zeigt echte Beträge in EUR aus deinen Stripe-Subscriptions, nicht mehr aus hardcoded Preisliste.
- Mailtest-Ergebnis poste ich direkt nach Approval in den Chat.
