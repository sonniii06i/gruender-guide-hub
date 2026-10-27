-- 27.10.2026 (Security): Besitznachweis der Konto-Adresse, siehe supabase/functions/_shared/mailBesitz.ts.
-- claim-account legt Konten mit der im Checkout eingetippten Kauf-Mail als "bestaetigt" an
-- (email_confirm) -> email_confirmed_at beweist keinen Besitz. Massgeblich ist
-- app_metadata.mail_verifiziert (+ mail_verifiziert_email, an die Adresse gebunden).

-- 1) Trigger: echte Bestaetigung per Supabase-Mail setzt das Flag; Adressaenderung setzt es zurueck.
create or replace function public.mail_verifiziert_pflegen()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if lower(trim(coalesce(new.email, ''))) is distinct from lower(trim(coalesce(old.email, ''))) then
    new.raw_app_meta_data := coalesce(new.raw_app_meta_data, '{}'::jsonb)
      || jsonb_build_object('mail_verifiziert', false, 'mail_verifiziert_email', null,
                            'mail_verifiziert_quelle', 'adresse-geaendert');
  elsif old.email_confirmed_at is null and new.email_confirmed_at is not null
        and new.confirmation_sent_at is not null then
    new.raw_app_meta_data := coalesce(new.raw_app_meta_data, '{}'::jsonb)
      || jsonb_build_object('mail_verifiziert', true, 'mail_verifiziert_email', lower(trim(new.email)),
                            'mail_verifiziert_quelle', 'supabase-bestaetigung');
  end if;
  return new;
end $$;
drop trigger if exists on_auth_user_mail_verifiziert on auth.users;
create trigger on_auth_user_mail_verifiziert before update of email, email_confirmed_at on auth.users
  for each row execute function public.mail_verifiziert_pflegen();

-- 2) Altbestand: nur echte Nachweise (OAuth, Bestaetigung nach versandter Mail,
--    Stripe-Kunde mit metadata.supabase_user_id/userId == id, am 27.10.2026 ermittelt).
update auth.users u
set raw_app_meta_data = coalesce(u.raw_app_meta_data, '{}'::jsonb) || jsonb_build_object(
  'mail_verifiziert', x.ok,
  'mail_verifiziert_email', case when x.ok then lower(trim(u.email)) else null end,
  'mail_verifiziert_quelle', 'altbestand-2710')
from (
  select id,
    (coalesce(raw_app_meta_data->>'provider', 'email') <> 'email'
     or (confirmation_sent_at is not null and email_confirmed_at is not null
         and email_confirmed_at >= confirmation_sent_at)
     or id::text in ('6edf3b22-4cab-4680-8266-7c47e9934294','a31f909a-7cdc-4f70-93de-8011b188b44b','a979a59a-0a2f-42d4-ad0e-abed82ac8239','bc71841b-b1f5-48e8-8b1e-a855226bc6b3','e88e652a-183e-49e3-b01a-9fa764984db7','49fde73d-fc88-48c2-b1bb-11b4fc1df62c')) as ok
  from auth.users
) x
where x.id = u.id and u.email_confirmed_at is not null
  and coalesce(u.raw_app_meta_data->>'mail_verifiziert_quelle', '') <> 'link';
