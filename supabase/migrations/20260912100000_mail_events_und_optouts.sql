-- ===================================================================
-- Mailprotokoll und Abmeldeliste.
--
-- WOZU. Ohne diese Tabelle ist jede Aussage ueber Mailmarketing eine
-- Vermutung. Resend kennt zwar Zustellung, Oeffnung und Klick, aber je
-- Konto getrennt (es sind drei) und ohne Bezug zu Variante oder Umsatz.
-- Hier laufen alle Ereignisse aller Marken in derselben Form zusammen.
--
-- ZUR OEFFNUNGSRATE, bevor jemand daraus Schluesse zieht: Apple Mail
-- laedt seit 2021 die Zaehlpixel aller Mails vorab, auch ungelesener.
-- Die gemessene Oeffnungsrate liegt dadurch 15 bis 20 Punkte zu hoch,
-- und zwar ungleich verteilt — Empfaenger auf iPhones zaehlen fast
-- immer als "geoeffnet". Eine A/B-Entscheidung auf Basis der
-- Oeffnungsrate misst deshalb den Geraetemix und nicht den Betreff.
-- Die Sicht unten weist Oeffnungen aus, aber die Spalte, auf die es
-- ankommt, ist der Klick.
-- ===================================================================

create table if not exists public.mail_events (
  id           bigint generated always as identity primary key,
  occurred_at  timestamptz not null default now(),
  email_id     text,                      -- Resend-ID, verbindet sent mit opened/clicked
  brand        text        not null,
  campaign     text        not null,
  variant      text        not null default 'a',
  recipient    text        not null,
  event        text        not null,      -- sent | delivered | opened | clicked | bounced | complained | unsubscribed
  subject      text,
  link         text
);

comment on table public.mail_events is
  'Ein Ereignis je Zeile. "sent" schreibt mailSend.ts, alles andere der Resend-Webhook.';

create index if not exists mail_events_lookup
  on public.mail_events (brand, campaign, variant, event);
create index if not exists mail_events_email_id
  on public.mail_events (email_id) where email_id is not null;
create index if not exists mail_events_time
  on public.mail_events (occurred_at desc);

-- Ein Ereignis darf nur einmal zaehlen. Resend liefert Webhooks bei
-- Stoerungen erneut aus, und Apple laedt das Zaehlpixel mehrfach --
-- ohne diesen Schutz haette eine einzige Mail zwoelf "Oeffnungen".
create unique index if not exists mail_events_einmalig
  on public.mail_events (email_id, event)
  where email_id is not null and event <> 'clicked';

alter table public.mail_events enable row level security;

-- Kein Zugriff fuer angemeldete Nutzer: Die Tabelle enthaelt
-- Empfaengeradressen. Geschrieben und gelesen wird ausschliesslich mit
-- dem Service-Schluessel, also aus Edge Functions.
drop policy if exists "mail_events kein direktzugriff" on public.mail_events;
create policy "mail_events kein direktzugriff"
  on public.mail_events for all to authenticated, anon
  using (false) with check (false);

-- -------------------------------------------------------------------
-- Abmeldeliste. Schluessel ist die Adresse, nicht die Nutzer-ID: Wer
-- den Checkout abbricht, hat pay-first bedingt noch gar kein Konto.
-- -------------------------------------------------------------------
create table if not exists public.mail_optouts (
  email      text primary key,
  reason     text,
  created_at timestamptz not null default now()
);

alter table public.mail_optouts enable row level security;
drop policy if exists "optouts kein direktzugriff" on public.mail_optouts;
create policy "optouts kein direktzugriff"
  on public.mail_optouts for all to authenticated, anon
  using (false) with check (false);

-- -------------------------------------------------------------------
-- Auswertung je Kampagne und Variante.
--
-- Klickrate wird auf ZUGESTELLTE bezogen, nicht auf gesendete: Eine
-- Variante mit vielen Unzustellbaren saehe sonst schlechter aus, obwohl
-- der Unterschied in der Liste liegt und nicht in der Mail.
-- -------------------------------------------------------------------
create or replace view public.mail_auswertung as
with e as (
  select brand, campaign, variant, event, email_id, recipient
    from public.mail_events
)
select
  brand,
  campaign,
  variant,
  count(*) filter (where event = 'sent')                        as gesendet,
  count(*) filter (where event = 'delivered')                   as zugestellt,
  count(*) filter (where event = 'opened')                      as geoeffnet,
  count(distinct recipient) filter (where event = 'clicked')    as klicker,
  count(*) filter (where event = 'bounced')                     as unzustellbar,
  count(*) filter (where event = 'complained')                  as beschwerden,
  count(*) filter (where event = 'unsubscribed')                as abmeldungen,
  round(100.0 * count(distinct recipient) filter (where event = 'clicked')
        / nullif(count(*) filter (where event = 'delivered'), 0), 2) as klickrate,
  round(100.0 * count(*) filter (where event = 'opened')
        / nullif(count(*) filter (where event = 'delivered'), 0), 2) as oeffnungsrate_mit_apple_verzerrung
from e
group by brand, campaign, variant
order by brand, campaign, variant;

comment on view public.mail_auswertung is
  'Klickrate ist die belastbare Spalte. Die Oeffnungsrate ist durch Apples Vorabladen nach oben verzerrt und taugt nicht zur A/B-Entscheidung.';
