// Startup-Guthaben & Perks: Credits, Gratis-Zeiträume und Rabatte, die Gründer
// bei Anbietern beantragen können. Jeder Eintrag ist auf der offiziellen
// Anbieterseite geprüft (Stand `geprueft`), nie aus Aggregator-Listen übernommen.
// `pruefWorte` stehen wörtlich auf der Seite; scripts/sync-perks.mjs prüft täglich,
// ob sie noch da sind – fehlen sie, hat der Anbieter das Programm vermutlich geändert.
// Verworfen (08.10.2026, mit Grund): OpenAI (Seite 403, nur Aggregatoren), Mistral,
// Supabase, Hugging Face, Pinecone, Twilio („no additional credits“), Segment, Brevo,
// Freshworks (nur PDF von 2023), 1Password, Figma, Airtable, Canva, eigenständiges
// Slack-Programm, Google-/Microsoft-/TikTok-/LinkedIn-/Meta-Ads-Neukundenguthaben
// (kein offizieller Betrag für DE), Qonto (Aktion abgelaufen), Kontist, finom, sevdesk,
// STRATO, Telekom Techboost, SAP.iO.

export type PerkKategorie = "ki" | "cloud" | "entwicklung" | "software" | "marketing" | "finanzen" | "ecommerce" | "hosting" | "netzwerk";

export interface StartupPerk {
  slug: string;
  name: string;
  anbieter: string;
  kategorie: PerkKategorie;
  /** Kurz und belegbar, so wie es der Anbieter nennt. */
  wert: string;
  /** Maximaler Nennwert in USD (EUR × 1,1) – nur wenn der Anbieter einen Betrag nennt. */
  wertUsd: number | null;
  leistungen: string[];
  voraussetzungen: string[];
  /** true = nur über VC/Accelerator-Partner, "teilweise" = höhere Stufen nur mit Partner. */
  vcNoetig: boolean | "teilweise" | null;
  gruendungMaxJahre: number | null;
  url: string;
  pruefWorte: string[];
  hinweis: string;
  geprueft: string;
  /** Seite sperrt automatische Abrufe oder rendert per Skript – nur im Browser prüfbar. */
  nurBrowser?: boolean;
}

export const PERK_KATEGORIEN: Record<PerkKategorie, { name: string; emoji: string }> = {
  ki: { name: "KI & Modelle", emoji: "🤖" },
  cloud: { name: "Cloud", emoji: "☁️" },
  hosting: { name: "Hosting (DE/EU)", emoji: "🖥️" },
  entwicklung: { name: "Entwicklung", emoji: "🛠️" },
  software: { name: "Software & Teamtools", emoji: "🧩" },
  marketing: { name: "Marketing & Vertrieb", emoji: "📣" },
  finanzen: { name: "Finanzen & Buchhaltung", emoji: "💶" },
  ecommerce: { name: "E-Commerce", emoji: "🛒" },
  netzwerk: { name: "Netzwerk", emoji: "🤝" },
};

export const STARTUP_PERKS: StartupPerk[] = [
  // ---------- KI ----------
  {
    slug: "claude-for-startups", name: "Claude for Startups", anbieter: "Anthropic", kategorie: "ki",
    wert: "1.000 $ Claude-API-Guthaben + 1 Jahr Claude Team (5 Plätze) + Partnerangebote bis 45.000 $", wertUsd: 1000,
    leistungen: ["1.000 $ API-Guthaben (verfällt 6 Monate nach Vergabe)", "1 Jahr Claude Team für bis zu 5 Premium-Plätze (nur Organisationen, die neu bei Team sind)", "Startup Stack: Partnerangebote bis 45.000 $ (z. B. ClickHouse, Hex)", "Höhere API-Rate-Limits", "Applied-AI-Sprechstunde (45 Min.) alle zwei Wochen, Startup-Events"],
    voraussetzungen: ["Gegründet in den letzten 5 Jahren oder finanziert in den letzten 2 Jahren", "Konto in der Claude Console", "Firmen-E-Mail, die zur Website-Domain passt (keine Gmail-Adresse)", "Kurze Beschreibung, was du mit Claude baust"],
    vcNoetig: false, gruendungMaxJahre: 5, url: "https://claude.com/programs/startups", pruefWorte: ["$1,000", "45K"],
    hinweis: "Guthaben gilt nur für die Claude-API direkt, nicht über AWS Bedrock oder Google Vertex. Mit einem VC aus dem Partnernetz bis zu 100.000 $ zusätzlich. Entscheidung meist in Minuten, sonst 2–3 Werktage. Freitexte im Formular: 50–500 Zeichen.",
    geprueft: "2026-10-08",
  },
  {
    slug: "elevenlabs-startup-grants", name: "ElevenLabs Startup Grants", anbieter: "ElevenLabs", kategorie: "ki",
    wert: "12 Monate ElevenLabs gratis mit 33 Mio. Zeichen", wertUsd: null,
    leistungen: ["12 Monate Zugang zur ganzen Plattform", "33.000.000 Zeichen (laut Anbieter über 680 Stunden Agents)"],
    voraussetzungen: ["Weniger als 25 Mitarbeitende", "Geschäftsmodell und Business-E-Mail", "Langfristiges Produkt, keine Agentur oder Beratung", "Eine Bewerbung pro Firma"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://elevenlabs.io/startup-grants", pruefWorte: ["33,000,000", "12 months"],
    hinweis: "Laufende Bewerbung, Entscheidung binnen einer Woche. Danach Wechsel in den Gratis-Tarif.", geprueft: "2026-10-08",
  },
  {
    slug: "nvidia-inception", name: "NVIDIA Inception", anbieter: "NVIDIA", kategorie: "ki",
    wert: "Kostenloses Programm: Kurse, Hardware-Rabatte, Cloud-Guthaben von NVIDIA und Partnern", wertUsd: null,
    leistungen: ["Kostenlose Kurse und vergünstigte Workshops", "Vorzugspreise auf ausgewählte NVIDIA-Hardware und -Software", "Cloud-Guthaben von Partnern", "Marketing-Unterstützung, Zugang zum VC-Netzwerk"],
    voraussetzungen: ["Mindestens ein Entwickler im Team", "Funktionierende Website", "Offiziell gegründet, jünger als 10 Jahre", "Pitchdeck und Finanzierungsstand einreichen"],
    vcNoetig: false, gruendungMaxJahre: 10, url: "https://www.nvidia.com/en-us/startups/", pruefWorte: ["10 years"],
    hinweis: "Keine Gebühren, keine Anteile. Ausgeschlossen: Beratungen, Krypto, Reseller, börsennotierte Firmen. Keine GPU-Garantie.", geprueft: "2026-10-08",
  },
  // ---------- Cloud ----------
  {
    slug: "google-for-startups-cloud", name: "Google for Startups Cloud Program", anbieter: "Google Cloud", kategorie: "cloud",
    wert: "2.000 $ für das MVP, bis 200.000 $ (Scale) bzw. 350.000 $ (KI-Startups)", wertUsd: 350000,
    leistungen: ["Start: 2.000 $ Guthaben für noch nicht finanzierte Startups", "Scale: bis 200.000 $ über 2 Jahre", "AI: bis 350.000 $ über 2 Jahre für KI-first-Startups", "Gilt auch für die Gemini-API"],
    voraussetzungen: ["Gegründet in den letzten 5 Jahren", "Höhere Stufen: Pre-Seed/Seed in den letzten 5 Jahren oder Series A in den letzten 12 Monaten", "Bisher höchstens 5.000 $ Google-Cloud-Guthaben", "E-Mail des Rechnungskonto-Admins muss zur Website-Domain passen"],
    vcNoetig: "teilweise", gruendungMaxJahre: 5, url: "https://cloud.google.com/startup/ai", pruefWorte: ["$350,000"],
    hinweis: "Die Firmendomain darf in den 31 Tagen vor dem Antrag kein bezahltes Google-Workspace-Abo gehabt haben. Häufigster Stolperstein: Admin des Rechnungskontos ist eine Gmail-Adresse.", geprueft: "2026-10-08",
  },
  {
    slug: "aws-activate-founders", name: "AWS Activate Founders", anbieter: "Amazon Web Services", kategorie: "cloud",
    wert: "1.000 $ AWS-Guthaben, ausgewählte Startups bis 5.000 $", wertUsd: 5000,
    leistungen: ["Start mit 1.000 $ Activate Credits", "Ausgewählte Teilnehmer bis 5.000 $", "Gilt auch für Amazon Bedrock (Claude, Llama u. a.)"],
    voraussetzungen: ["Selbst finanziert, noch keine Series B", "Gegründet in den letzten 10 Jahren", "Bezahltes AWS-Konto", "AWS Builder ID mit beruflicher E-Mail"],
    vcNoetig: false, gruendungMaxJahre: 10, url: "https://aws.amazon.com/startups/credits", pruefWorte: ["$1,000", "$5,000"],
    hinweis: "Antwort in 5–10 Werktagen.", geprueft: "2026-10-08",
  },
  {
    slug: "aws-activate-portfolio", name: "AWS Activate Portfolio", anbieter: "Amazon Web Services", kategorie: "cloud",
    wert: "Bis 200.000 $ AWS-Guthaben", wertUsd: 200000,
    leistungen: ["Bis 200.000 $ Activate Credits"],
    voraussetzungen: ["Org ID eines Activate Providers (Accelerator, Business Angel oder VC)", "Noch keine Series B, jünger als 10 Jahre", "Bezahltes AWS-Konto"],
    vcNoetig: "teilweise", gruendungMaxJahre: 10, url: "https://aws.amazon.com/startups/credits", pruefWorte: ["$200,000", "Org ID"],
    hinweis: "Ohne Org ID eines Activate Providers nicht beantragbar – viele Acceleratoren und Inkubatoren vergeben sie.", geprueft: "2026-10-08",
  },
  {
    slug: "microsoft-for-startups", name: "Microsoft for Startups", anbieter: "Microsoft", kategorie: "cloud",
    wert: "Bis 150.000 $ Azure-Guthaben", wertUsd: 150000,
    leistungen: ["Azure-Guthaben für berechtigte Azure-Dienste von Entwicklung bis Produktion"],
    voraussetzungen: ["Die volle Höhe nur mit Empfehlungscode eines Investors", "Weitere Kriterien nennt Microsoft erst im Antrag"],
    vcNoetig: "teilweise", gruendungMaxJahre: null, url: "https://www.microsoft.com/en-us/startups", pruefWorte: ["$150,000"],
    hinweis: "Stufen unter 150.000 $ nennt Microsoft nicht öffentlich – Zahlen aus Vergleichslisten sind nicht belegt.", geprueft: "2026-10-08", nurBrowser: true,
  },
  {
    slug: "cloudflare-for-startups", name: "Cloudflare for Startups", anbieter: "Cloudflare", kategorie: "cloud",
    wert: "10.000 $ (bootstrapped) bis 350.000 $ Guthaben", wertUsd: 350000,
    leistungen: ["10.000 $ für Startups mit unter 1 Mio. $ Kapital (auch bootstrapped)", "100.000 $ bzw. 350.000 $ mit Finanzierung über Partner", "Workers-AI-Anteil bis 2.500/10.000/50.000 $, R2-Speicher bis 10.000 $"],
    voraussetzungen: ["Höchstens 10 Jahre alt", "Bis Series B, Finanzierung in den letzten 12 Monaten", "Arbeitet an einem Tech-Produkt, öffentlich prüfbare Website + LinkedIn/X/GitHub", "Business-E-Mail passend zur Domain"],
    vcNoetig: "teilweise", gruendungMaxJahre: 10, url: "https://www.cloudflare.com/startups/", pruefWorte: ["$350k", "$10k"],
    hinweis: "Guthaben gilt 1 Jahr, einmalig pro Startup. AI Gateway und Domain-Registrar nicht abgedeckt. Freigabe meist in 48 Stunden.", geprueft: "2026-10-08",
  },
  {
    slug: "digitalocean-startups", name: "DigitalOcean Startups (Hatch)", anbieter: "DigitalOcean", kategorie: "cloud",
    wert: "12 Monate Guthaben (Höhe individuell, max. 10.000 $/Monat) + 15 Monate Support", wertUsd: null,
    leistungen: ["12 Monate Guthaben, Betrag kommt per Onboarding-Mail", "Standard-Support 15 Monate gratis"],
    voraussetzungen: ["Höchstens 10 Mio. $ Kapital eingesammelt", "Neues Team-Konto mit Firmen-E-Mail und Website", "Keine Agenturen oder Dienstleister"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://www.digitalocean.com/startups", pruefWorte: ["12 months"],
    hinweis: "Seit 13.05.2026 ausgeschlossen: GPU-Droplets, Inference und extern gehostete Modelle (Anthropic, OpenAI).", geprueft: "2026-10-08",
  },
  {
    slug: "vercel-for-startups", name: "Vercel for Startups", anbieter: "Vercel", kategorie: "cloud",
    wert: "Bis 30.000 $ Guthaben auf Enterprise", wertUsd: 30000,
    leistungen: ["Bis 30.000 $ „Flexible Commitment Amount“", "Enterprise-Zugang und Startup-Support"],
    voraussetzungen: ["Kriterien nennt Vercel nicht öffentlich – Anfrage über das Startup-Formular"],
    vcNoetig: null, gruendungMaxJahre: null, url: "https://vercel.com/startups", pruefWorte: ["$30,000"],
    hinweis: "Laufzeit und Bedingungen erst nach Kontakt mit dem Startup-Team.", geprueft: "2026-10-08",
  },
  {
    slug: "mongodb-for-startups", name: "MongoDB for Startups", anbieter: "MongoDB", kategorie: "cloud",
    wert: "Atlas-Guthaben + Voyage-AI-Tokens in vier Stufen (auch bootstrapped)", wertUsd: null,
    leistungen: ["Atlas-Guthaben, Stufen Inspire (bootstrapped) bis Scale", "Voyage-AI-Tokens", "Developer-Support 30 Tage gratis", "Eine Experten-Session"],
    voraussetzungen: ["Jünger als 7 Jahre, höchstens Series A", "Software-Produkt (keine Agentur)", "Aktive Website und LinkedIn-Profil"],
    vcNoetig: false, gruendungMaxJahre: 7, url: "https://www.mongodb.com/solutions/startups", pruefWorte: ["7 years", "Voyage AI"],
    hinweis: "Code innerhalb von 12 Monaten aktivieren, dann 12 Monate nutzbar. Beträge je Stufe nennt MongoDB nicht.", geprueft: "2026-10-08",
  },
  // ---------- Hosting DE/EU ----------
  {
    slug: "ionos-cloud-startup", name: "IONOS Cloud Startup Program", anbieter: "IONOS", kategorie: "hosting",
    wert: "Bis 5.000 $ (Spark) bzw. 100.000 $ (Accelerate) Cloud-Guthaben", wertUsd: 100000,
    leistungen: ["Spark: bis 5.000 $ für 12 Monate, danach 1 Jahr bis 10 % Rabatt", "Accelerate: bis 100.000 $ für bis 24 Monate", "Deutsche Cloud (Compute, S3)"],
    voraussetzungen: ["Eingetragenes Unternehmen, jünger als 5 Jahre", "Eigene Firmenwebsite", "Einmalige Teilnahme"],
    vcNoetig: false, gruendungMaxJahre: 5, url: "https://cloud.ionos.com/startup-program", pruefWorte: ["$5,000", "$100,000"],
    hinweis: "Welche Stufe du bekommst, entscheidet IONOS. Ungenutztes Guthaben verfällt.", geprueft: "2026-10-08",
  },
  {
    slug: "hetzner-startguthaben", name: "Hetzner Startguthaben", anbieter: "Hetzner Online", kategorie: "hosting",
    wert: "50 € Startguthaben für Neukunden", wertUsd: 55,
    leistungen: ["50 € für alle Hetzner-Produkte (Cloud, Dedicated, Storage)"],
    voraussetzungen: ["Neukunde ohne aktives Hetzner-Konto", "Code innerhalb von 14 Tagen nach Kontoerstellung einlösen"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://www.hetzner.com/de/promo-code/", pruefWorte: ["50 €", "14 Tage"],
    hinweis: "Kein Startup-Programm, sondern Neukundencode. Das Guthaben gilt nur im Monat der Einlösung – früh im Monat einlösen.", geprueft: "2026-10-08",
  },
  // ---------- Entwicklung ----------
  {
    slug: "github-for-startups", name: "GitHub for Startups", anbieter: "GitHub", kategorie: "entwicklung",
    wert: "10.000 $ GitHub-Guthaben für 12 Monate", wertUsd: 10000,
    leistungen: ["Guthaben für Enterprise Cloud, Copilot, Advanced Security, Actions", "50.000 Actions-Minuten inklusive"],
    voraussetzungen: ["Partner-Zugehörigkeit (Investor, Inkubator, Accelerator)", "Externe Finanzierung bis Series B", "Noch nie GitHub-Guthaben oder Enterprise-Lizenzen erhalten"],
    vcNoetig: true, gruendungMaxJahre: null, url: "https://github.com/enterprise/startups", pruefWorte: ["$10,000", "Series B"],
    hinweis: "Einmalig einlösbar. Ein Downgrade lässt Restguthaben verfallen.", geprueft: "2026-10-08",
  },
  {
    slug: "posthog-for-startups", name: "PostHog for Startups", anbieter: "PostHog", kategorie: "entwicklung",
    wert: "50.000 $ PostHog-Guthaben für 12 Monate + 12.000 $ Partnervorteile", wertUsd: 50000,
    leistungen: ["50.000 $ Guthaben (nicht für die KI-Funktionen)", "Partnervorteile im Wert von 12.000 $", "Merch"],
    voraussetzungen: ["PostHog-Konto", "Früh-Phase-Team (genaue Kriterien nennt PostHog nicht)"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://posthog.com/startups", pruefWorte: ["$50,000", "$12,000"],
    hinweis: "Analytics, Session Replay und Feature Flags in einem – für viele Gründer der wertvollste Software-Perk ohne Investor.", geprueft: "2026-10-08",
  },
  {
    slug: "sentry-for-startups", name: "Sentry for Startups", anbieter: "Sentry", kategorie: "entwicklung",
    wert: "Bis 5.000 $ Guthaben für 12 Monate + Priority Support", wertUsd: 5000,
    leistungen: ["Guthaben 12 Monate gültig", "Priority Support"],
    voraussetzungen: ["Gegründet in den letzten 2 Jahren", "Weniger als 5 Mio. $ Wagniskapital", "Bisher kein zahlender Sentry-Kunde"],
    vcNoetig: false, gruendungMaxJahre: 2, url: "https://sentry.io/for/startups/apply/", pruefWorte: ["$5,000", "$5M"],
    hinweis: "Antwort meist in 2–3 Tagen.", geprueft: "2026-10-08",
  },
  {
    slug: "retool-for-startups", name: "Retool for Startups", anbieter: "Retool", kategorie: "entwicklung",
    wert: "1 Jahr gratis (Wert bis 60.000 $), danach 25 % Rabatt", wertUsd: 60000,
    leistungen: ["100 % Rabatt für ein Jahr auf Team- oder Business-Monatsplan", "25 % Rabatt im Folgejahr"],
    voraussetzungen: ["Bootstrapped bis Series A, unter 10 Mio. $ Kapital", "Gegründet in den letzten 10 Jahren", "Neukunde im Monatsplan"],
    vcNoetig: false, gruendungMaxJahre: 10, url: "https://retool.com/startups", pruefWorte: ["$60K", "$10 million"],
    hinweis: "Erst auf den Monatsplan wechseln, dann bewerben – der Rabatt greift ab der ersten Rechnung nach dem ersten Abrechnungszeitraum.", geprueft: "2026-10-08",
  },
  {
    slug: "linear-startups", name: "Linear Startup Program", anbieter: "Linear", kategorie: "entwicklung",
    wert: "Linear Business gratis über Partner", wertUsd: null,
    leistungen: ["Business-Plan kostenlos, danach Gratis-Plan mit allen Daten"],
    voraussetzungen: ["Partnerlink oder -code (Investor/Accelerator)", "Weniger als 50 Mitarbeitende, noch nicht zahlend"],
    vcNoetig: true, gruendungMaxJahre: null, url: "https://linear.app/startups", pruefWorte: ["Business plan"],
    hinweis: "Dauer der Gratisphase nennt Linear nicht.", geprueft: "2026-10-08",
  },
  {
    slug: "webflow-for-startups", name: "Webflow for Startups", anbieter: "Webflow", kategorie: "entwicklung",
    wert: "Erstes Jahr Website-Plan gratis", wertUsd: null,
    leistungen: ["100 % Rabatt im ersten Jahr auf einen monatlichen Site-Plan"],
    voraussetzungen: ["Über einen Webflow-Startup-Partner", "Weniger als 50 Mitarbeitende, höchstens 15 Mio. $ Kapital", "Neukunde mit Firmen-E-Mail"],
    vcNoetig: true, gruendungMaxJahre: null, url: "https://webflow.com/startups/startups-application", pruefWorte: ["100%"],
    hinweis: "Nur bei monatlicher Abrechnung. Prüfung 3–4 Werktage.", geprueft: "2026-10-08", nurBrowser: true,
  },
  // ---------- Software ----------
  {
    slug: "notion-for-startups", name: "Notion for Startups", anbieter: "Notion", kategorie: "software",
    wert: "Bis 6 Monate Business-Tarif mit Notion AI gratis", wertUsd: 12000,
    leistungen: ["Business-Tarif inkl. Notion AI für 1, 3 oder 6 Monate", "Notion Perks (Software-Rabatte)", "Setup-Session mit zertifiziertem Berater"],
    voraussetzungen: ["3 Monate: Firmenwebsite + Firmen-E-Mail", "6 Monate: nur über einen Startup-Partner", "Weniger als 100 Mitarbeitende, noch kein zahlender Kunde"],
    vcNoetig: "teilweise", gruendungMaxJahre: null, url: "https://www.notion.com/startups", pruefWorte: ["6 months", "100 employees"],
    hinweis: "Agenturen und Beratungen bekommen nur 1 Monat. Gmail-Adressen werden abgelehnt.", geprueft: "2026-10-08",
  },
  {
    slug: "atlassian-for-startups", name: "Atlassian for Startups", anbieter: "Atlassian", kategorie: "software",
    wert: "Jira, Confluence, Loom, Bitbucket Premium 12 Monate für 0 $ (bis 50 Nutzer)", wertUsd: null,
    leistungen: ["Premium-Editionen bis 50 Plätze", "Jira Service Management bis 10 Plätze", "Customer-Success-Team"],
    voraussetzungen: ["VC-finanziert oder Partner-Accelerator/Inkubator", "Höchstens 10 Mio. $ externe Finanzierung", "Noch kein zahlender Atlassian-Kunde"],
    vcNoetig: "teilweise", gruendungMaxJahre: null, url: "https://www.atlassian.com/software/startups", pruefWorte: ["12 months", "50 users"],
    hinweis: "Einmalig 12 Monate pro Startup, Marketplace-Apps nicht enthalten.", geprueft: "2026-10-08",
  },
  {
    slug: "intercom-early-stage", name: "Intercom Early Stage", anbieter: "Intercom", kategorie: "software",
    wert: "93 % Rabatt im 1. Jahr + KI-Agent Fin inklusive", wertUsd: null,
    leistungen: ["93 % / 50 % / 25 % Rabatt in Jahr 1 / 2 / 3", "Fin AI Agent mit 300 Lösungen pro Monat im 1. Jahr", "Partnerangebote (Stripe, Notion, Linear …)"],
    voraussetzungen: ["Höchstens 10 Mio. $ Finanzierung", "Weniger als 15 Mitarbeitende", "Noch kein Intercom-Kunde"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://www.intercom.com/early-stage", pruefWorte: ["93%", "15"],
    hinweis: "Telefon, SMS, WhatsApp und zusätzliche Fin-Lösungen zum Listenpreis.", geprueft: "2026-10-08",
  },
  {
    slug: "zendesk-for-startups", name: "Zendesk for Startups", anbieter: "Zendesk", kategorie: "software",
    wert: "6 Monate gratis, über Partner bis 2 Jahre", wertUsd: null,
    leistungen: ["Professional Suite + Copilot für bis zu 50 Agents", "Partnerrabatte (AWS, Notion, GitHub)"],
    voraussetzungen: ["Angel bis Series B", "Neues Zendesk-Abo", "Höchstens 10 Jahre alt"],
    vcNoetig: "teilweise", gruendungMaxJahre: 10, url: "https://www.zendesk.de/business/startups/", pruefWorte: ["2 Jahre", "Series B"],
    hinweis: "Teamgrößen-Angaben auf der Seite uneinheitlich (50 bzw. 250) – vor dem Antrag beim Anbieter klären.", geprueft: "2026-10-08",
  },
  {
    slug: "mixpanel-for-startups", name: "Mixpanel for Startups", anbieter: "Mixpanel", kategorie: "software",
    wert: "1 Jahr Mixpanel gratis (laut Anbieter Wert bis 145.000 $)", wertUsd: 145000,
    leistungen: ["1 Mrd. Events pro Jahr, 500.000 Session Replays", "Alle Add-ons, Experimente, Feature Flags"],
    voraussetzungen: ["Jünger als 5 Jahre", "Höchstens 8 Mio. $ Finanzierung", "Nie zahlender Mixpanel-Kunde"],
    vcNoetig: false, gruendungMaxJahre: 5, url: "https://mixpanel.com/startups", pruefWorte: ["$145,000"],
    hinweis: "Innerhalb von 90 Tagen nach Aufnahme Daten senden, sonst Ausschluss ohne Wiederaufnahme.", geprueft: "2026-10-08",
  },
  {
    slug: "amplitude-scholarship", name: "Amplitude Startup Scholarship", anbieter: "Amplitude", kategorie: "software",
    wert: "1 Jahr Growth-Plan gratis, 2. Jahr 40 % Rabatt", wertUsd: null,
    leistungen: ["12 Monate Growth-Plan ohne Kreditkarte", "Jahr 2: Plus-Plan mit 40 % Rabatt"],
    voraussetzungen: ["Unter 20 Mitarbeitende", "Unter 10 Mio. $ Finanzierung"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://amplitude.com/startups", pruefWorte: ["20 employees", "$10M"],
    hinweis: "Bewerbung im Workspace nach Anlegen eines Gratiskontos, Zusage meist sofort.", geprueft: "2026-10-08",
  },
  {
    slug: "miro-startups", name: "Miro Startup Program", anbieter: "Miro", kategorie: "software",
    wert: "Miro-Guthaben für Startups (Höhe je nach Partner)", wertUsd: null,
    leistungen: ["Guthaben auf einen Miro-Tarif", "Startup-Vorlagen"],
    voraussetzungen: ["Gratis-Konto ohne bezahltes Abo", "Weniger als 30 Mitarbeitende, kein Dienstleister", "Ohne Partner: Finanzierung per Crunchbase belegt, eigene Domain"],
    vcNoetig: "teilweise", gruendungMaxJahre: null, url: "https://miro.com/startups/", pruefWorte: ["Miro credits"],
    hinweis: "Die Programmseite nennt keine Beträge. Guthaben innerhalb von 6 Monaten aktivieren.", geprueft: "2026-10-08",
  },
  // ---------- Marketing & Vertrieb ----------
  {
    slug: "hubspot-for-startups", name: "HubSpot for Startups", anbieter: "HubSpot", kategorie: "marketing",
    wert: "90 % Rabatt im 1. Jahr (mit Finanzierung) bzw. 30 % über Partner", wertUsd: null,
    leistungen: ["Rabatt auf Professional/Enterprise: 90 % / 50 % / 25 % in Jahr 1 / 2 / 3", "Über Partner: 30 % / 15 %", "Schulungen und Community"],
    voraussetzungen: ["Pre-Seed bis Series A mit belegter Finanzierung oder HubSpot-Partner", "Nur Neukauf, Jahresvertrag"],
    vcNoetig: "teilweise", gruendungMaxJahre: null, url: "https://www.hubspot.com/startups", pruefWorte: ["90%", "Series A"],
    hinweis: "Danach Listenpreis – Kosten ab Jahr 3 vorher durchrechnen.", geprueft: "2026-10-08",
  },
  {
    slug: "salesforce-launchpad", name: "Salesforce Launchpad for Startups", anbieter: "Salesforce (inkl. Slack)", kategorie: "marketing",
    wert: "Sonderpreise auf Salesforce, Agentforce und Slack", wertUsd: null,
    leistungen: ["Sonderpreise u. a. auf Starter/Pro Suite, Sales Cloud, Agentforce, Tableau, Slack", "Beratung, Community, Events"],
    voraussetzungen: ["Venture-finanziertes Startup (Prüfung in 5 Werktagen)"],
    vcNoetig: true, gruendungMaxJahre: null, url: "https://www.salesforce.com/launchpad/", pruefWorte: ["venture-backed"],
    hinweis: "Rabatt-Prozente nennt Salesforce nicht öffentlich. Ein eigenes Slack-Startup-Programm gibt es nicht.", geprueft: "2026-10-08",
  },
  // ---------- Finanzen ----------
  {
    slug: "lexware-gruenderedition", name: "Lexware Office Gründeredition", anbieter: "Lexware (ehemals lexoffice)", kategorie: "finanzen",
    wert: "6 Monate Buchhaltung XL + Geschäftskonto + Lohn für 2 Mitarbeitende gratis", wertUsd: null,
    leistungen: ["Lexware Office XL 6 Monate kostenlos", "Geschäftskonto mit Visa Business Debitkarte", "Lohn & Gehalt für bis zu 2 Mitarbeitende"],
    voraussetzungen: ["Gründung höchstens 6 Monate her oder höchstens 3 Monate in der Zukunft"],
    vcNoetig: false, gruendungMaxJahre: 0.5, url: "https://www.lexware.de/gruenderedition/", pruefWorte: ["Gründeredition", "6 Monate"],
    hinweis: "Wird nach 6 Monaten automatisch kostenpflichtig – vorher kündigen oder bewusst weiterlaufen lassen. Kurzes Zeitfenster nach der Gründung.", geprueft: "2026-10-08",
  },
  {
    slug: "stripe-atlas", name: "Stripe Atlas Perks", anbieter: "Stripe", kategorie: "finanzen",
    wert: "2.500 $ Stripe-Guthaben + Partnerrabatte über 50.000 $", wertUsd: 2500,
    leistungen: ["2.500 $ Stripe-Gutschriften im ersten Jahr", "Partnerrabatte (laut Stripe über 50.000 $)"],
    voraussetzungen: ["Gründung einer US-Gesellschaft über Stripe Atlas (500 $ einmalig, dann 100 $ pro Jahr)"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://stripe.com/de/atlas", pruefWorte: ["2.500", "500"],
    hinweis: "Nur sinnvoll, wenn du ohnehin eine US-Gesellschaft brauchst – sonst entstehen laufende US-Pflichten. Siehe Guide zur US-LLC.", geprueft: "2026-10-08",
  },
  // ---------- E-Commerce ----------
  {
    slug: "amazon-neue-verkaeufer", name: "Amazon Anreize für neue Verkäufer", anbieter: "Amazon", kategorie: "ecommerce",
    wert: "Anreize bis 47.250 €, u. a. 10 % auf die ersten 45.000 € Markenumsatz", wertUsd: 51975,
    leistungen: ["10 % zurück auf die ersten 45.000 € Markenverkäufe", "Guthaben für Sponsored Ads, FBA, Vine und Coupons", "Neues-Sortiment-Programm: Gebührenrabatt und kostenlose Lagerung"],
    voraussetzungen: ["Als neuer Verkäufer qualifizieren (Kriterien im Anmeldeprozess)", "Professional-Konto (39 € zzgl. USt./Monat)", "Markenbonus nur mit Marke in der Brand Registry"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://sell.amazon.de/starten", pruefWorte: ["47.250"],
    hinweis: "Maximalwert, kein Anspruch. Jeder Anreiz hat eigene Fristen – die Marke vor dem ersten Listing eintragen lassen.", geprueft: "2026-10-08",
  },
  {
    slug: "shopify-1-euro", name: "Shopify Startangebot", anbieter: "Shopify", kategorie: "ecommerce",
    wert: "3 Tage gratis, danach 1 €/Monat", wertUsd: null,
    leistungen: ["3 Tage Test ohne Kreditkarte", "Danach 1 €/Monat zum Weiterbauen"],
    voraussetzungen: ["Neuer Shop über die Aktionsseite"],
    vcNoetig: false, gruendungMaxJahre: null, url: "https://www.shopify.com/de/kostenloser-test", pruefWorte: ["1 €"],
    hinweis: "Wie lange der 1-€-Preis gilt, steht nicht auf der Seite – danach regulärer Tarif.", geprueft: "2026-10-08", nurBrowser: true,
  },
  // ---------- Netzwerk ----------
  {
    slug: "startup-verband", name: "Startup-Verband (Startup-Tarif)", anbieter: "Bundesverband Deutsche Startups", kategorie: "netzwerk",
    wert: "Mitgliedschaft ab 95 € im Gründungsjahr, Eventrabatte bis 35 %", wertUsd: null,
    leistungen: ["Netzwerk mit rund 1.200 Mitgliedern", "Bis 35 % Rabatt auf Partner-Events", "Academy, Musterverträge, politische Vertretung"],
    voraussetzungen: ["Startup bis zum 7. Jahr ab Handelsregistereintrag bzw. Projektstart"],
    vcNoetig: false, gruendungMaxJahre: 7, url: "https://startupverband.de/members/mitglied-werden/", pruefWorte: ["95", "1.200"],
    hinweis: "Kostenpflichtig; ab dem zweiten Jahr höherer Beitrag.", geprueft: "2026-10-08",
  },
];

/** Perks, die man ohne Investor/Accelerator bekommen kann. */
export const ohneInvestor = (p: StartupPerk) => p.vcNoetig === false || p.vcNoetig === "teilweise";
