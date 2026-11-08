-- ANGEWENDET 08.11.2026 per db query (Betreiber-Freigabe „alle Lücken lösen“).
-- send-ticket-email zaehlt Kundenmails je IP (Hash aus cf-connecting-ip, keine Klar-IP). Bis die Spalte existiert,
-- gilt nur ein In-Memory-Teilschutz je Function-Instanz; Adress- und Globallimit wirken schon jetzt.
ALTER TABLE public.contact_tickets ADD COLUMN IF NOT EXISTS ip_hash text;
CREATE INDEX IF NOT EXISTS contact_tickets_ip_hash_idx
  ON public.contact_tickets (ip_hash, mail_sent_at DESC) WHERE ip_hash IS NOT NULL;
