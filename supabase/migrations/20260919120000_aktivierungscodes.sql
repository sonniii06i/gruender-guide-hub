-- Aktivierungscodes: Zugang aus einer gedruckten Karte.
--
-- Warum ueberhaupt
-- ----------------
-- Amazon laesst Drittanbieter in Deutschland kein Abo digital ausliefern. Der
-- Weg, den Adobe dort geht, ist eine physische Karte mit EAN ("12 Monate
-- Subscription Karte ... Download"): Der Kaeufer bekommt Pappe, auf der ein
-- Code steht, und loest ihn bei uns ein. Dieselben Codes taugen als Beilage,
-- Gutschein oder Messegeschenk.
--
-- Warum keine eigene Zugangslogik
-- -------------------------------
-- Ein eingeloester Code erzeugt eine Zeile in `external_entitlements` mit
-- provider='code'. check-subscription liest diese Tabelle anbieterneutral --
-- der Code braucht deshalb KEINE Sonderbehandlung an der Paywall, und der
-- Stripe-Sync raeumt ihn nicht ab (siehe 20260828120000_external_billing.sql).
--
-- Warum nur der Hash gespeichert wird
-- -----------------------------------
-- Ein Code ist ein Inhaberpapier: Wer ihn kennt, hat Zugang. In dieser Tabelle
-- liegen tausende noch nicht verkaufte Codes gleichzeitig. Im Klartext waere
-- ein Datenbankleck gleichbedeutend mit dem Totalverlust der ganzen Auflage.
-- Gespeichert wird deshalb SHA-256; der Klartext existiert einmal beim
-- Erzeugen (fuer die Druckerei) und danach nur noch auf der Karte.
-- `code_tail` sind die letzten vier Zeichen im Klartext, damit der Support
-- einen Fall zuordnen kann, ohne den Code zu kennen.
CREATE TABLE IF NOT EXISTS public.redemption_codes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_hash     TEXT NOT NULL UNIQUE,          -- sha256(Code in Grossbuchstaben, ohne Bindestriche)
  code_tail     TEXT NOT NULL,                 -- letzte 4 Zeichen, nur zur Zuordnung im Support
  batch         TEXT NOT NULL,                 -- Druckauflage, z. B. 'amazon-karte-2026-10'
  plan          TEXT NOT NULL,                 -- derselbe Planname wie in external_entitlements
  days          INTEGER NOT NULL DEFAULT 30,   -- Laufzeit ab Einloesung
  status        TEXT NOT NULL DEFAULT 'unused',-- unused | redeemed | revoked
  redeemed_email TEXT,
  redeemed_user_id UUID,
  redeemed_at   TIMESTAMPTZ,
  note          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_redemption_codes_batch  ON public.redemption_codes (batch, status);
CREATE INDEX IF NOT EXISTS idx_redemption_codes_email  ON public.redemption_codes (lower(redeemed_email));

ALTER TABLE public.redemption_codes ENABLE ROW LEVEL SECURITY;

-- Kein SELECT fuer normale Nutzer. Auch nicht fuer den eigenen Code: Die
-- Einloesung laeuft ueber die Edge Function mit Service-Role, und ein lesbares
-- Verzeichnis waere genau das Leck, gegen das der Hash oben schuetzt.
CREATE POLICY "Admins view redemption codes"
  ON public.redemption_codes FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER redemption_codes_updated_at
  BEFORE UPDATE ON public.redemption_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Einloesung als Transaktion.
--
-- Warum eine Datenbankfunktion und nicht zwei Aufrufe aus der Edge Function:
-- Zwischen "Code pruefen" und "Code als benutzt markieren" passt ein zweiter
-- Aufruf mit demselben Code. Bei einer Karte, die durch mehrere Haende geht,
-- ist das kein Randfall. Das UPDATE ... WHERE status='unused' entscheidet den
-- Wettlauf in der Datenbank: Genau einer bekommt eine Zeile zurueck.
CREATE OR REPLACE FUNCTION public.redeem_code(
  p_code_hash TEXT,
  p_email     TEXT,
  p_user_id   UUID
)
RETURNS TABLE (code_id UUID, plan TEXT, days INTEGER, code_tail TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row public.redemption_codes%ROWTYPE;
BEGIN
  UPDATE public.redemption_codes c
     SET status = 'redeemed',
         redeemed_email = p_email,
         redeemed_user_id = p_user_id,
         redeemed_at = now(),
         updated_at = now()
   WHERE c.code_hash = p_code_hash
     AND c.status = 'unused'
  RETURNING c.* INTO v_row;

  IF NOT FOUND THEN
    RETURN;  -- leeres Ergebnis: unbekannt, schon benutzt oder gesperrt
  END IF;

  -- Zurueck kommt die Laufzeit, nicht das Enddatum: Ob ab heute oder ab dem
  -- Ende eines schon laufenden Code-Zugangs gerechnet wird, entscheidet die
  -- Edge Function. Sie kennt den bestehenden Zugang, diese Funktion nicht.
  RETURN QUERY SELECT v_row.id, v_row.plan, v_row.days, v_row.code_tail;
END;
$$;

REVOKE ALL ON FUNCTION public.redeem_code(TEXT, TEXT, UUID) FROM PUBLIC, anon, authenticated;
