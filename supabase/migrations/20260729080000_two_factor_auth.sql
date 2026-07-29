-- Zwei-Faktor-Authentifizierung (TOTP)
--
-- Bewusst NICHT in auth.users.user_metadata abgelegt: user_metadata wird bei
-- jedem getUser()/getSession() an den Client ausgeliefert. Ein dort
-- gespeichertes TOTP-Secret koennte jeder mit gueltigem Access-Token auslesen
-- und daraus selbst gueltige Codes erzeugen — 2FA waere damit wirkungslos.
--
-- Diese Tabelle hat deshalb RLS aktiv und KEINE Policy fuer authenticated.
-- Zugriff ausschliesslich ueber Edge Functions mit Service-Role-Key.

create table if not exists public.user_two_factor (
  user_id           uuid primary key references auth.users(id) on delete cascade,

  -- TOTP-Secret (Base32). Verlaesst die Datenbank nur einmal beim Einrichten.
  secret            text        not null,

  -- Erst true, wenn der Nutzer einen gueltigen Code bestaetigt hat.
  enabled           boolean     not null default false,

  -- Backup-Codes als SHA-256-Hex, nie im Klartext.
  backup_codes      text[]      not null default '{}',

  -- Replay-Schutz: jeder TOTP-Zeitschritt darf nur einmal gelten.
  last_counter      bigint,

  -- Brute-Force-Schutz. 6 Stellen sind sonst in Minuten durchprobiert.
  failed_attempts   integer     not null default 0,
  locked_until      timestamptz,

  created_at        timestamptz not null default now(),
  confirmed_at      timestamptz,
  updated_at        timestamptz not null default now()
);

comment on table public.user_two_factor is
  'TOTP-Zweitfaktor. Nur ueber Service-Role erreichbar, nie direkt vom Client.';
comment on column public.user_two_factor.backup_codes is
  'SHA-256-Hashes der Backup-Codes. Ein verbrauchter Code wird entfernt.';
comment on column public.user_two_factor.last_counter is
  'Zuletzt akzeptierter TOTP-Zeitschritt, verhindert Wiederverwendung.';

alter table public.user_two_factor enable row level security;

-- Absichtlich keine Policy: ohne Policy sieht "authenticated" nichts.
-- Service-Role umgeht RLS und ist der einzige Zugriffsweg.

create index if not exists user_two_factor_enabled_idx
  on public.user_two_factor (user_id) where enabled;

-- updated_at automatisch pflegen
create or replace function public.tg_user_two_factor_touch()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists user_two_factor_touch on public.user_two_factor;
create trigger user_two_factor_touch
  before update on public.user_two_factor
  for each row execute function public.tg_user_two_factor_touch();
