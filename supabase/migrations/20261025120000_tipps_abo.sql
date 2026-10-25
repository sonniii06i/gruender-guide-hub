-- ===================================================================
-- tipps_abo — Einwilligung in die Tipps-Strecke nach einem Gratis-Tool
-- (25.10.2026). Double-Opt-in über tipps-anfordern / tipps-bestaetigen,
-- Versand über send-tipps-strecke (pg_cron, erst nach Freigabe der Texte
-- durch den Betreiber eingeschaltet – siehe tipps-aktivieren.sql).
--
-- Unterschied zu tool_leads: tool_leads ist KEINE Werbeeinwilligung. Hier
-- landet nur, wer im E-Mail-Tor das freiwillige Häkchen gesetzt hat; der
-- Einwilligungstext steht als Version in der Zeile (Nachweis), wirksam
-- wird die Einwilligung erst mit dem Klick (bestaetigt_am).
--
-- Eingespielt über die Management-API (database/query), nie db push.
-- ===================================================================

create table if not exists public.tipps_abo (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),

  email                 text not null unique,
  tool_slug             text not null,
  strecke               text not null check (strecke in ('creator', 'tiktok', 'gruendung', 'ecommerce')),

  -- Nachweis der Einwilligung: Textversion und Zeitpunkt der Anforderung.
  einwilligung_version  text not null,
  angefordert_am        timestamptz not null default now(),
  bestaetigt_am         timestamptz,

  -- Versandbremse für die Bestätigungsmail (wie vorlagen_leads).
  mails_heute           integer not null default 0,
  mails_tag             date,
  letzte_mail_am        timestamptz,

  -- Stufen der Strecke: Merker erst nach bestätigtem Versand.
  variant               text not null default 'a',
  stufe1_at             timestamptz,
  stufe2_at             timestamptz,
  stufe3_at             timestamptz,
  stufe4_at             timestamptz,
  -- Gesetzt, wenn die Strecke endet (alle Stufen raus, abgemeldet, Kunde geworden, abgelaufen).
  beendet_am            timestamptz,
  beendet_grund         text,

  constraint tipps_abo_email_form
    check (length(email) between 6 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' and email = lower(email)),
  constraint tipps_abo_slug_form check (tool_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index if not exists tipps_abo_offen on public.tipps_abo (bestaetigt_am) where beendet_am is null and bestaetigt_am is not null;

alter table public.tipps_abo enable row level security;
-- Kein Zugriff für Browser: nur Edge Functions mit Service-Rolle.
revoke all on public.tipps_abo from anon, authenticated;

comment on table public.tipps_abo is
  'Double-Opt-in für die Tipps-Strecke nach Gratis-Tools. Unbestätigt nach 30 Tagen gelöscht, bestätigt 24 Monate nach Anforderung (Nachweis der Einwilligung).';

create or replace function public.tipps_abo_aufraeumen()
returns void language sql security definer set search_path = public as $$
  delete from public.tipps_abo
   where (bestaetigt_am is null and created_at < now() - interval '30 days')
      or (bestaetigt_am is not null and angefordert_am < now() - interval '24 months');
$$;
revoke all on function public.tipps_abo_aufraeumen() from public, anon, authenticated;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(jobid) from cron.job where jobname = 'tipps_abo_aufraeumen';
    perform cron.schedule('tipps_abo_aufraeumen', '23 3 * * *', 'select public.tipps_abo_aufraeumen()');
  end if;
end $$;
