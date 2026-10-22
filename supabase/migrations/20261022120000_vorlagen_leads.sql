-- ===================================================================
-- vorlagen_leads — bestätigte E-Mail-Adressen der Vorlagen-Bibliothek
-- (/vorlagen, Double-Opt-in über vorlage-anfordern / vorlage-bestaetigen).
--
-- Eingespielt am 22.10.2026 über die Management-API (database/query) per
-- ~/gruenderx-skripte/vorlagen-deployen.sh; supabase db push ist für dieses
-- Projekt unbrauchbar (siehe Gedächtnis gruenderx-edge-functions-deployen).
--
-- Unterschied zu tool_leads: Dort steht, was jemand eingetippt hat. Hier
-- steht zusätzlich, ob der Inhaber der Adresse den Link geklickt hat
-- (bestaetigt_am). Nur bestätigte Zeilen sind etwas wert.
--
-- KEINE Werbeeinwilligung. Die Bestätigung gilt nur dem Download; ein
-- Newsletter bräuchte eine eigene, ausdrückliche Einwilligung.
-- ===================================================================

create table if not exists public.vorlagen_leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  email             text not null unique,
  -- Slug der zuerst bzw. zuletzt angeforderten Vorlage (nur zur Auswertung).
  erste_vorlage     text,
  letzte_vorlage    text,
  anfragen          integer not null default 1,
  letzte_anfrage_am timestamptz,

  -- Versandbremse: höchstens eine Mail alle 2 Minuten und 5 am Tag je Adresse.
  mails_heute       integer not null default 0,
  mails_tag         date,
  letzte_mail_am    timestamptz,

  -- Gesetzt, sobald der signierte Link geklickt wurde. Bleibt danach stehen.
  bestaetigt_am     timestamptz,

  constraint vorlagen_leads_email_form
    check (length(email) between 6 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' and email = lower(email)),
  constraint vorlagen_leads_slug_form
    check ((erste_vorlage is null or erste_vorlage ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
       and (letzte_vorlage is null or letzte_vorlage ~ '^[a-z0-9]+(-[a-z0-9]+)*$'))
);

create index if not exists vorlagen_leads_bestaetigt on public.vorlagen_leads (bestaetigt_am desc nulls last);
create index if not exists vorlagen_leads_created   on public.vorlagen_leads (created_at desc);

alter table public.vorlagen_leads enable row level security;

-- Der Browser hat hier NICHTS zu suchen: Schreiben und Lesen nur über die
-- Edge Functions mit Service-Rolle. Keine Policy = kein Zugriff für anon.
revoke all on public.vorlagen_leads from anon, authenticated;

comment on table public.vorlagen_leads is
  'Adressen aus der Vorlagen-Bibliothek (/vorlagen). bestaetigt_am = Double-Opt-in-Klick. Keine Werbeeinwilligung. Unbestätigte Zeilen nach 30 Tagen, bestätigte 24 Monate nach der letzten Anfrage per pg_cron gelöscht.';

-- Aufbewahrung: unbestätigt 30 Tage, bestätigt 24 Monate nach letzter Anfrage.
create or replace function public.vorlagen_leads_aufraeumen()
returns void language sql security definer set search_path = public as $$
  delete from public.vorlagen_leads
   where (bestaetigt_am is null and created_at < now() - interval '30 days')
      or (bestaetigt_am is not null
          and coalesce(letzte_anfrage_am, created_at) < now() - interval '24 months');
$$;
revoke all on function public.vorlagen_leads_aufraeumen() from public, anon, authenticated;

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'vorlagen_leads_aufraeumen';
  perform cron.schedule('vorlagen_leads_aufraeumen', '23 3 * * *', 'select public.vorlagen_leads_aufraeumen()');
end $$;
