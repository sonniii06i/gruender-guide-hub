-- Cockpit-Zustand je Konto (22.11.2026): von Hand abgehakte Fahrplan-Schritte und
-- der Zeitpunkt, zu dem der Rundgang gesehen wurde. Bisher lag beides nur im
-- localStorage des jeweiligen Geräts.
-- Ausführung über die Management-API bzw. den SQL-Editor, nie per `supabase db push`
-- (Migrationshistorie des Lovable-Projekts ist nicht deckungsgleich).

create table if not exists public.cockpit_zustand (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan_abgehakt text[] not null default '{}',
  rundgang_gesehen_am timestamptz,
  updated_at timestamptz not null default now(),
  constraint cockpit_zustand_plan_groesse check (coalesce(array_length(plan_abgehakt, 1), 0) <= 200)
);

alter table public.cockpit_zustand enable row level security;

drop policy if exists "cockpit_zustand_eigene_lesen" on public.cockpit_zustand;
create policy "cockpit_zustand_eigene_lesen" on public.cockpit_zustand
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "cockpit_zustand_eigene_anlegen" on public.cockpit_zustand;
create policy "cockpit_zustand_eigene_anlegen" on public.cockpit_zustand
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "cockpit_zustand_eigene_aendern" on public.cockpit_zustand;
create policy "cockpit_zustand_eigene_aendern" on public.cockpit_zustand
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Kein DELETE für Nutzer: die Zeile verschwindet mit dem Konto (on delete cascade).
revoke all on public.cockpit_zustand from anon;
grant select, insert, update on public.cockpit_zustand to authenticated;

create or replace function public.cockpit_zustand_stempel()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists cockpit_zustand_stempel on public.cockpit_zustand;
create trigger cockpit_zustand_stempel
  before update on public.cockpit_zustand
  for each row execute function public.cockpit_zustand_stempel();
