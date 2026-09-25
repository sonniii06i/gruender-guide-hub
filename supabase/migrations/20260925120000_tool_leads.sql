-- ===================================================================
-- tool_leads — E-Mail-Adressen aus der kostenlosen Nutzung der Tools.
-- Schwester von 20260924120000_tool_leads.sql in AnwaltX.
--
-- NOCH NICHT EINGESPIELT (Stand 25.09.2026). Der Betreiber spielt sie
-- selbst ein. Bis die Tabelle existiert, schlägt der Insert aus
-- src/lib/freetools/leads.ts fehl; das Ergebnis wird trotzdem
-- freigeschaltet, der Lead geht dann aber verloren.
--
-- Wer schreibt hierher:
--   - Probier-Seiten /tools/:slug/gratis (WEEE-Check, Brand-Check,
--     LUCID-Wizard): je EINE kostenlose Nutzung ohne Konto
--   - Gründungskosten-Rechner (eine kostenlose Nutzung) und die übrigen
--     Generatoren unter /gratis-tools (dauerhaft frei nach E-Mail-Angabe)
--   Herkunft immer `gx-tool:<slug>`.
--
-- KEINE Werbeeinwilligung. GründerX hat keinen Newsletter mit
-- Double-Opt-in; das Tor im Browser fragt deshalb auch keinen ab.
-- ===================================================================

create table if not exists public.tool_leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  email       text not null,
  -- Herkunft, z. B. 'gx-tool:weee-check'.
  source      text not null,
  tool_slug   text,

  constraint tool_leads_email_form
    check (length(email) between 6 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  constraint tool_leads_source_form
    check (source ~ '^gx-tool:[a-z0-9-]{1,80}$'),
  constraint tool_leads_slug_form
    check (tool_slug is null or tool_slug ~ '^[a-z0-9-]{1,80}$')
);

create index if not exists tool_leads_email  on public.tool_leads (lower(email));
create index if not exists tool_leads_source on public.tool_leads (source, created_at desc);

alter table public.tool_leads enable row level security;

-- Browser darf nur EINFÜGEN, nie lesen, ändern oder löschen: Die Tabelle
-- enthält Adressen von Menschen ohne Konto. Lesen nur mit Service-Rolle.
drop policy if exists "tool_leads insert anon" on public.tool_leads;
create policy "tool_leads insert anon"
  on public.tool_leads for insert to anon, authenticated
  with check (true);

revoke select, update, delete on public.tool_leads from anon, authenticated;
grant insert on public.tool_leads to anon, authenticated;

comment on table public.tool_leads is
  'Adressen aus der kostenlosen Nutzung der Tools (Ergebnis gegen E-Mail). Keine Werbeeinwilligung. Löschung nach 12 Monaten per pg_cron.';

-- Aufbewahrung 12 Monate: täglicher Aufräumlauf per pg_cron.
create or replace function public.tool_leads_aufraeumen()
returns void language sql security definer set search_path = public as $$
  delete from public.tool_leads where created_at < now() - interval '12 months';
$$;
revoke all on function public.tool_leads_aufraeumen() from public, anon, authenticated;

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'tool_leads_aufraeumen';
  perform cron.schedule('tool_leads_aufraeumen', '17 3 * * *', 'select public.tool_leads_aufraeumen()');
end $$;
