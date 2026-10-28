-- 28.10.2026: Mail-Nachweis robust gegen GoTrue-Ueberschreiben.
-- Gemessen: Der alte Trigger setzte mail_verifiziert beim Bestaetigungs-UPDATE korrekt
-- (Test in zurueckgerollter Transaktion), GoTrue schreibt raw_app_meta_data danach aber
-- in einem weiteren UPDATE mit seinem In-Memory-Stand zurueck -> Flag weg.
-- Neu: Trigger auf JEDES Update. Server-Schluessel, die im alten Stand stehen und im neuen
-- fehlen, werden uebernommen (sonst loescht GoTrue sie); Adressaenderung setzt den Nachweis
-- zurueck; echte Supabase-Bestaetigung (confirmation_sent_at gesetzt, bestaetigt danach) setzt ihn.
create or replace function public.mail_nachweis_pflegen()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
declare
  k text;
  alt jsonb := coalesce(old.raw_app_meta_data, '{}'::jsonb);
begin
  new.raw_app_meta_data := coalesce(new.raw_app_meta_data, '{}'::jsonb);
  if lower(trim(coalesce(new.email, ''))) is distinct from lower(trim(coalesce(old.email, ''))) then
    new.raw_app_meta_data := new.raw_app_meta_data
      || jsonb_build_object('mail_verifiziert', false, 'mail_verifiziert_email', null,
                            'mail_verifiziert_quelle', 'adresse-geaendert');
    return new;
  end if;
  foreach k in array array['mail_verifiziert','mail_verifiziert_email','mail_verifiziert_quelle',
                           'mail_verifiziert_at','kauf_session','kauf_order','kauf_mail'] loop
    if alt ? k and not (new.raw_app_meta_data ? k) then
      new.raw_app_meta_data := new.raw_app_meta_data || jsonb_build_object(k, alt -> k);
    end if;
  end loop;
  if old.email_confirmed_at is null and new.email_confirmed_at is not null
     and new.confirmation_sent_at is not null and new.email_confirmed_at >= new.confirmation_sent_at then
    new.raw_app_meta_data := new.raw_app_meta_data
      || jsonb_build_object('mail_verifiziert', true, 'mail_verifiziert_email', lower(trim(new.email)),
                            'mail_verifiziert_quelle', 'supabase-bestaetigung');
  end if;
  return new;
end $function$;

drop trigger if exists on_auth_user_mail_verifiziert on auth.users;
drop trigger if exists on_auth_user_email_changed on auth.users;
drop trigger if exists on_auth_user_mail_nachweis on auth.users;
create trigger on_auth_user_mail_nachweis before update on auth.users
  for each row execute function public.mail_nachweis_pflegen();

-- Nachtrag: echte Supabase-Bestaetigungen, deren Flag GoTrue bereits ueberschrieben hat.
update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
     || jsonb_build_object('mail_verifiziert', true, 'mail_verifiziert_email', lower(trim(email)),
                           'mail_verifiziert_quelle', 'supabase-bestaetigung-nachtrag')
 where email is not null and email_confirmed_at is not null and confirmation_sent_at is not null
   and email_confirmed_at >= confirmation_sent_at
   and not (coalesce(raw_app_meta_data, '{}'::jsonb) ? 'mail_verifiziert');
