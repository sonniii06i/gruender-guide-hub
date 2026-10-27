-- 27.10.2026 (Security-Review): Versand der Verifizierungsmail atomar begrenzen
-- (vorher TOCTOU: Zeitstempel erst nach dem Senden). Ein Slot je Nutzer:
-- hoechstens alle 10 Minuten und hoechstens 5 pro Kalendertag. Nur der Server
-- (service_role) darf die Funktion aufrufen.
create table if not exists public.mail_verify_log (
  user_id uuid primary key,
  gesendet_at timestamptz not null,
  tag date not null,
  anzahl integer not null default 0
);
alter table public.mail_verify_log enable row level security;

create or replace function public.mail_verify_slot(p_user uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare ok boolean;
begin
  insert into public.mail_verify_log as l (user_id, gesendet_at, tag, anzahl)
  values (p_user, now(), current_date, 1)
  on conflict (user_id) do update set
    anzahl = case when l.tag = current_date then l.anzahl + 1 else 1 end,
    tag = current_date,
    gesendet_at = now()
  where l.gesendet_at < now() - interval '10 minutes'
    and (l.tag <> current_date or l.anzahl < 5)
  returning true into ok;
  return coalesce(ok, false);
end $$;
revoke all on function public.mail_verify_slot(uuid) from public, anon, authenticated;
grant execute on function public.mail_verify_slot(uuid) to service_role;
