-- ===================================================================
-- chancen_abo — Chancen-Alarm auf /gruender-chancen (25.10.2026).
-- Wöchentliche Mail (Montag) mit neuen Gründer-Chancen zur Auswahl:
-- Wettbewerbe/Programme, Hackathons, Pitch, Marketing, Netzwerk.
-- Double-Opt-in über chancen-anfordern / chancen-bestaetigen, Versand über
-- send-chancen-alarm (pg_cron, Einschalten: supabase/sql/chancen-alarm-aktivieren.sql).
--
-- Einwilligungstext steht als Version in der Zeile (Nachweis), wirksam erst
-- mit dem Klick (bestaetigt_am). Abmeldung: mail-unsubscribe (mail_optouts)
-- – sendCampaign prüft die Liste vor jedem Versand.
--
-- Eingespielt über die Management-API (database/query), nie db push.
-- ===================================================================

create table if not exists public.chancen_abo (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),

  email                 text not null unique,
  arten                 text[] not null,
  region                text not null default 'alle',
  ohne_nur_frauen       boolean not null default false,

  einwilligung_version  text not null,
  angefordert_am        timestamptz not null default now(),
  bestaetigt_am         timestamptz,

  -- Versandbremse für die Bestätigungsmail (wie tipps_abo).
  mails_heute           integer not null default 0,
  mails_tag             date,
  letzte_mail_am        timestamptz,

  -- Wochenmail: was schon drin war, kommt nicht noch einmal (außer „letzte Chance“).
  letzter_alarm_am      timestamptz,
  gesendet              text[] not null default '{}',
  beendet_am            timestamptz,
  beendet_grund         text,

  constraint chancen_abo_email_form
    check (length(email) between 6 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' and email = lower(email)),
  constraint chancen_abo_arten_form
    check (cardinality(arten) between 1 and 5 and arten <@ array['wettbewerb', 'hackathon', 'pitch', 'marketing', 'netzwerk']),
  constraint chancen_abo_region_form check (region ~ '^(alle|online|[A-Z]{2})$')
);

create index if not exists chancen_abo_aktiv on public.chancen_abo (bestaetigt_am) where beendet_am is null and bestaetigt_am is not null;

alter table public.chancen_abo enable row level security;
-- Kein Zugriff für Browser: nur Edge Functions mit Service-Rolle.
revoke all on public.chancen_abo from anon, authenticated;

comment on table public.chancen_abo is
  'Double-Opt-in für den Chancen-Alarm (/gruender-chancen). Unbestätigt nach 30 Tagen gelöscht, beendete Zeilen 24 Monate nach Anforderung (Nachweis der Einwilligung).';

create or replace function public.chancen_abo_aufraeumen()
returns void language sql security definer set search_path = public as $$
  delete from public.chancen_abo
   where (bestaetigt_am is null and created_at < now() - interval '30 days')
      or (beendet_am is not null and angefordert_am < now() - interval '24 months');
$$;
revoke all on function public.chancen_abo_aufraeumen() from public, anon, authenticated;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(jobid) from cron.job where jobname = 'chancen_abo_aufraeumen';
    perform cron.schedule('chancen_abo_aufraeumen', '27 3 * * *', 'select public.chancen_abo_aufraeumen()');
  end if;
end $$;
