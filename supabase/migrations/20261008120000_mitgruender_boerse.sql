-- Mitgründer-Börse: Profile + Kontaktanfragen.
-- Sichtbar nur für eingeloggte Nutzer mit aktivem Zugang (Abo oder Freizugang),
-- Profile nur, wenn der Inhaber sie selbst veröffentlicht. Kontaktdaten werden
-- NICHT angezeigt – Kontakt läuft über Anfragen; erst die Antwort enthält, was
-- der Empfänger teilen möchte.
-- Ausführen: Supabase-Dashboard → SQL Editor → einfügen → Run. Idempotent.

create or replace function public.hat_aktiven_zugang(_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = _uid and (s.status in ('active', 'trialing') or s.comp_access = true)
  ) or public.has_role(_uid, 'admin');
$$;

create table if not exists public.mitgruender_profile (
  user_id uuid primary key references auth.users (id) on delete cascade,
  anzeigename text not null check (char_length(anzeigename) between 2 and 60),
  ich_bin text not null check (ich_bin in ('tech', 'business', 'design', 'vertrieb', 'produkt', 'andere')),
  ich_suche text[] not null default '{}',
  region text,              -- Bundesland-Code oder 'remote'
  branche text check (char_length(branche) <= 60),
  phase text check (phase in ('idee', 'prototyp', 'erste-kunden', 'umsatz')),
  zeit text check (zeit in ('vollzeit', 'teilzeit', 'nebenbei')),
  pitch text not null check (char_length(pitch) between 20 and 600),
  skills text[] not null default '{}',
  sichtbar boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mitgruender_anfragen (
  id uuid primary key default gen_random_uuid(),
  von uuid not null references auth.users (id) on delete cascade,
  an uuid not null references auth.users (id) on delete cascade,
  nachricht text not null check (char_length(nachricht) between 20 and 1000),
  antwort text check (char_length(antwort) <= 1000),
  status text not null default 'offen' check (status in ('offen', 'angenommen', 'abgelehnt')),
  created_at timestamptz not null default now(),
  check (von <> an)
);
create index if not exists mitgruender_anfragen_an_idx on public.mitgruender_anfragen (an, created_at desc);

alter table public.mitgruender_profile enable row level security;
alter table public.mitgruender_anfragen enable row level security;

-- Profile: eigenes immer, fremde nur veröffentlichte und nur mit aktivem Zugang.
drop policy if exists "profil lesen" on public.mitgruender_profile;
create policy "profil lesen" on public.mitgruender_profile for select to authenticated
  using (user_id = auth.uid() or (sichtbar and public.hat_aktiven_zugang(auth.uid())));
drop policy if exists "profil anlegen" on public.mitgruender_profile;
create policy "profil anlegen" on public.mitgruender_profile for insert to authenticated
  with check (user_id = auth.uid() and public.hat_aktiven_zugang(auth.uid()));
drop policy if exists "profil aendern" on public.mitgruender_profile;
create policy "profil aendern" on public.mitgruender_profile for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "profil loeschen" on public.mitgruender_profile;
create policy "profil loeschen" on public.mitgruender_profile for delete to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- Anfragen: senden nur an veröffentlichte Profile, max. 10 pro Tag (Spam-Bremse);
-- lesen nur Absender/Empfänger; beantworten nur der Empfänger.
drop policy if exists "anfrage senden" on public.mitgruender_anfragen;
create policy "anfrage senden" on public.mitgruender_anfragen for insert to authenticated
  with check (
    von = auth.uid()
    and public.hat_aktiven_zugang(auth.uid())
    and exists (select 1 from public.mitgruender_profile p where p.user_id = an and p.sichtbar)
    and (select count(*) from public.mitgruender_anfragen a where a.von = auth.uid() and a.created_at > now() - interval '1 day') < 10
  );
drop policy if exists "anfrage lesen" on public.mitgruender_anfragen;
create policy "anfrage lesen" on public.mitgruender_anfragen for select to authenticated
  using (von = auth.uid() or an = auth.uid() or public.has_role(auth.uid(), 'admin'));
drop policy if exists "anfrage beantworten" on public.mitgruender_anfragen;
create policy "anfrage beantworten" on public.mitgruender_anfragen for update to authenticated
  using (an = auth.uid()) with check (an = auth.uid());

drop trigger if exists mitgruender_profile_updated on public.mitgruender_profile;
create trigger mitgruender_profile_updated before update on public.mitgruender_profile
  for each row execute function public.update_updated_at_column();
