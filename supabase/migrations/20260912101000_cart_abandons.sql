-- ===================================================================
-- cart_abandons — angefangene, nicht abgeschlossene Kaeufe.
--
-- WOZU EINE EIGENE TABELLE. Ausloeser war bisher allein Stripes
-- checkout.session.expired. Das Ereignis kommt aber erst, wenn Stripe
-- die Session verfallen laesst — rund 24 Stunden nach dem Abbruch.
-- Die wirksamste Erinnerung ist die in der ersten Stunde; sie war mit
-- diesem Ausloeser gar nicht baubar.
--
-- Hier wird der Abbruch deshalb dort festgehalten, wo er entsteht: beim
-- Erzeugen der Checkout-Session. Ab da laeuft die Uhr, und ein Cron
-- entscheidet anhand der Zeitstempel, welche Stufe faellig ist.
--
-- WICHTIG: Eine Zeile hier ist noch kein Abbruch, sondern ein
-- angefangener Kauf. Zum Abbruch wird sie erst dadurch, dass
-- `gekauft_at` leer bleibt. Der Erfolgs-Webhook setzt das Feld, und die
-- Strecke bricht dann ab — sonst bekommt jemand eine
-- "Du hast etwas vergessen"-Mail, obwohl er bezahlt hat. Das ist der
-- teuerste Fehler, den eine Warenkorbstrecke machen kann.
-- ===================================================================

create table if not exists public.cart_abandons (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  email       text not null,
  name        text,
  session_id  text unique,              -- Stripe-Session, gegen Doppelzeilen

  produkt     text,                     -- z. B. "gruenderx" | "bundle"
  intervall   text,                     -- "month" | "year"
  weiter_url  text,                     -- wohin die Mail zurueckfuehrt

  /** Gesetzt vom Erfolgs-Webhook. Ist es gesetzt, ruht die Strecke. */
  gekauft_at  timestamptz,

  /** Wann welche Stufe rausging. Merker NACH bestaetigtem Versand setzen. */
  stufe1_at   timestamptz,
  stufe2_at   timestamptz,
  stufe3_at   timestamptz,

  /** A/B-Variante, einmal gezogen und ueber alle drei Stufen gehalten. */
  variant     text not null default 'a'
);

comment on table public.cart_abandons is
  'Angefangene Kaeufe. gekauft_at gesetzt = erledigt, Strecke ruht.';

-- Der Index, auf dem der Cron laeuft: offene Vorgaenge nach Alter.
create index if not exists cart_abandons_offen
  on public.cart_abandons (created_at)
  where gekauft_at is null;

create index if not exists cart_abandons_email
  on public.cart_abandons (email);

alter table public.cart_abandons enable row level security;

-- Enthaelt Mailadressen von Menschen ohne Konto. Nur Service-Rolle.
drop policy if exists "cart_abandons kein direktzugriff" on public.cart_abandons;
create policy "cart_abandons kein direktzugriff"
  on public.cart_abandons for all to authenticated, anon
  using (false) with check (false);

-- -------------------------------------------------------------------
-- Aufraeumen. Ein angefangener Kauf ist nach einer Woche entweder
-- bezahlt oder vergessen; die Adresse laenger zu behalten hat weder
-- einen Zweck noch eine Rechtfertigung.
-- -------------------------------------------------------------------
create or replace function public.cart_abandons_aufraeumen()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.cart_abandons
   where created_at < now() - interval '7 days';
$$;

revoke all on function public.cart_abandons_aufraeumen() from public, anon, authenticated;
