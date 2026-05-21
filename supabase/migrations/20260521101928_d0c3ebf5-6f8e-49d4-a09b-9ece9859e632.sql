
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body_md TEXT NOT NULL,
  hero_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'gruendung',
  tags TEXT[] NOT NULL DEFAULT '{}',
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  related_playbooks TEXT[] NOT NULL DEFAULT '{}',
  related_providers TEXT[] NOT NULL DEFAULT '{}',
  author TEXT NOT NULL DEFAULT 'Felix von GründerX',
  reading_minutes INTEGER NOT NULL DEFAULT 6,
  view_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_published ON public.blog_posts (status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts (slug);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins see all posts" ON public.blog_posts FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage posts" ON public.blog_posts FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.blog_topic_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  keyword_primary TEXT NOT NULL,
  keyword_secondary TEXT[] NOT NULL DEFAULT '{}',
  briefing TEXT,
  category TEXT NOT NULL DEFAULT 'gruendung',
  priority INTEGER NOT NULL DEFAULT 5,
  scheduled_for TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_topic_queue_due ON public.blog_topic_queue (scheduled_for) WHERE consumed_at IS NULL;

ALTER TABLE public.blog_topic_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage topic queue" ON public.blog_topic_queue FOR ALL USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.blog_topic_queue (topic, keyword_primary, keyword_secondary, category, briefing, scheduled_for) VALUES
  ('GmbH gründen 2026: Kosten, Ablauf und Stolperfallen', 'gmbh gründen kosten 2026', ARRAY['gmbh gründung','notar gmbh','stammkapital 25000'], 'gruendung', 'Komplette Kostenübersicht (Notar, IHK, Handelsregister, Beratung), Stammkapital-Erklärung, Schritt-Reihenfolge, häufige Fehler.', now()),
  ('UG vs GmbH 2026: Welche Rechtsform passt zu dir?', 'ug oder gmbh', ARRAY['unternehmergesellschaft','mini-gmbh','rechtsform vergleich'], 'gruendung', 'Direktvergleich Kosten, Haftung, Außenwirkung, Steuern, Wachstumspfad. Klare Empfehlung je Use-Case.', now() + interval '3 days'),
  ('Kleinunternehmer-Regelung 2026: Neue Grenzen und Wahlrecht', 'kleinunternehmer 2026', ARRAY['kleinunternehmerregelung','umsatzsteuer befreiung','22000 euro grenze'], 'steuern', 'Aktuelle Schwellen (25.000 / 100.000 EUR), wann lohnt sich Verzicht, Wechselstrategien.', now() + interval '4 days'),
  ('OSS-Verfahren anmelden: Schritt für Schritt für E-Commerce', 'oss anmeldung', ARRAY['one stop shop','oss bzst','umsatzsteuer eu'], 'ecommerce', 'Wann OSS nötig, BZSt-Portal-Anleitung, Quartalsmeldungen, Stolpersteine bei Amazon FBA.', now() + interval '7 days'),
  ('IAB 2026: §7g EStG voll ausnutzen als Gründer', 'investitionsabzugsbetrag 2026', ARRAY['iab rechner','7g estg','steuern sparen gründer'], 'steuern', '40%-Abzug erklärt, Grenzen 2026, Auflösung, typische Fehler. Mit Rechenbeispielen.', now() + interval '10 days'),
  ('US-LLC für Deutsche: Setup, Steuer-Fallen, Banking', 'us llc gründen deutschland', ARRAY['llc steuer deutschland','wyoming llc','delaware llc'], 'international', 'LLC-States vergleichen, EIN, ITIN, Banking (Mercury/Wise), CFC-Regeln, Substanz.', now() + interval '11 days'),
  ('Holding aufbauen 2026: Wann es sich lohnt, wann nicht', 'holding gmbh gründen', ARRAY['holding struktur','beteiligungsgesellschaft','95 prozent regel'], 'gruendung', '§8b KStG, 95%-Regel, Setup-Kosten, ab wann sinnvoll, typische 2-Ebenen-Struktur.', now() + interval '14 days'),
  ('Geschäftskonto-Vergleich 2026: Qonto, Holvi, Finom, N26', 'bestes geschäftskonto gründer', ARRAY['qonto erfahrungen','holvi vs qonto','finom test'], 'banking', 'Side-by-side: Preise, Features, IBAN, DATEV-Export, Limits. Klare Empfehlung je Use-Case.', now() + interval '17 days'),
  ('Amazon FBA Launch Deutschland 2026: kompletter Fahrplan', 'amazon fba starten', ARRAY['fba launch','amazon seller account','fba deutschland'], 'ecommerce', 'Seller-Account, OSS, EORI, GS1, Brand Registry, erstes Listing. End-to-End.', now() + interval '18 days'),
  ('Marke anmelden DPMA: Kosten, Dauer, Strategie', 'marke anmelden dpma', ARRAY['markenanmeldung','dpma kosten','nizza klassen'], 'recht', 'DPMA-Online-Anmeldung, Nizza-Klassen wählen, Kosten 290 EUR, Widerspruchsfrist.', now() + interval '21 days'),
  ('GPSR ab Dezember 2024: Was Online-Händler jetzt brauchen', 'gpsr verordnung händler', ARRAY['gpsr compliance','produktsicherheit eu','responsible person'], 'ecommerce', 'Pflichten, Responsible Person in EU, technische Doku, Strafen.', now() + interval '24 days'),
  ('LUCID-Registrierung: Verpackungslizenz richtig anmelden', 'lucid verpackungsregister', ARRAY['lucid anmeldung','verpackungslizenz','verpackungsgesetz'], 'ecommerce', 'ZSVR-LUCID-Konto, Mengenmeldung, Systembeteiligung, Bußgelder.', now() + interval '25 days'),
  ('Einzelunternehmen anmelden: Gewerbe oder freiberuflich?', 'einzelunternehmen gründen', ARRAY['gewerbe anmelden','freiberufler werden','katalogberuf'], 'gruendung', 'Gewerbe vs Freiberufler-Entscheidung, Anmelde-Reihenfolge, Steuer-Konsequenzen.', now() + interval '28 days'),
  ('Crypto-Steuer 2026: Was Trader und Founder wissen müssen', 'crypto steuer deutschland 2026', ARRAY['krypto steuer','bitcoin gewinne versteuern','staking steuer'], 'steuern', '1-Jahres-Spekulationsfrist, Staking/Lending, FIFO vs LIFO, Tools, BMF-Schreiben 2022.', now() + interval '31 days'),
  ('Förderung für Gründer 2026: Top-Programme im Überblick', 'förderung gründer 2026', ARRAY['kfw förderung gründer','exist gründerstipendium','gründungszuschuss'], 'foerderung', 'KfW, EXIST, Gründungszuschuss, Landesprogramme. Voraussetzungen und Antragsstrategie.', now() + interval '32 days'),
  ('HK Limited gründen: Hong-Kong-Setup für deutsche Founder', 'hk limited gründen', ARRAY['hong kong unternehmen','offshore gmbh','territorial taxation'], 'international', 'Setup, Director-Anforderungen, Substanz, Banking, deutsche CFC-Regeln.', now() + interval '35 days'),
  ('Brutto-Netto als Solo-Selbstständiger 2026', 'brutto netto selbstständig', ARRAY['gewinn nach steuern','selbstständige steuerlast','was bleibt übrig'], 'steuern', 'Vom Umsatz zum verfügbaren Einkommen: ESt, KV, RV, Soli. Mit Beispielrechnungen.', now() + interval '38 days'),
  ('DATEV-Export aus Lexware, sevDesk & Co. richtig nutzen', 'datev export buchhaltung', ARRAY['datev mapper','sevdesk datev','lexware export'], 'buchhaltung', 'Welcher Export-Standard, Kontenrahmen SKR03/04, häufige Mapping-Fehler.', now() + interval '39 days'),
  ('Rechnungs-Pflichtangaben 2026 & E-Rechnung B2B', 'e-rechnung pflicht b2b 2026', ARRAY['rechnung pflichtangaben','x-rechnung','zugferd'], 'buchhaltung', 'E-Rechnungspflicht ab 01.01.2025, XRechnung/ZUGFeRD, Übergangsfristen.', now() + interval '42 days'),
  ('Versicherungen für Selbstständige: Was wirklich nötig ist', 'versicherung selbstständige', ARRAY['berufshaftpflicht','rechtsschutz selbstständig','krankenversicherung freiberufler'], 'versicherung', 'BHV, RS, KV, BU. Was Pflicht, was sinnvoll, was unnötig — je Berufsgruppe.', now() + interval '45 days')
;
