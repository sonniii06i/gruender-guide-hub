import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Star, Tag, ExternalLink, MessageSquare, Clock, AlertCircle } from "lucide-react";

/**
 * Verifizierte Legal-URLs pro Anbieter (Stand: 2026-05-05).
 * Bulk-verifiziert via Footer-Scrape + manuelle Korrekturen.
 * Wird vom monatlichen Audit-Agent aktualisiert wenn URLs ändern.
 */
export const LEGAL_URLS: Record<string, { impressum?: string; terms?: string; privacy?: string }> = {
  // ============ BANKING DE ============
  "qonto": { impressum: "https://qonto.com/de/imprint", terms: "https://legal.qonto.com/de", privacy: "https://legal.qonto.com/de" },
  "holvi": { impressum: "https://www.holvi.com/de/impressum/", terms: "https://www.holvi.com/de/terms/", privacy: "https://www.holvi.com/de/privacy/" },
  "finom": { impressum: "https://finom.co/de-de/impressum/", terms: "https://finom.co/de-de/agb/", privacy: "https://finom.co/de-de/datenschutz/" },
  "kontist": { impressum: "https://kontist.com/imprint/", terms: "https://kontist.com/terms/", privacy: "https://kontist.com/privacy/" },
  "deutsche-bank-business": { impressum: "https://www.deutsche-bank.de/pk/impressum.html", terms: "https://www.deutsche-bank.de/pk/agb.html", privacy: "https://www.deutsche-bank.de/pk/lp/datenschutz.html" },
  "commerzbank-business": { impressum: "https://www.commerzbank.de/firmenkunden/impressum/", terms: "https://www.commerzbank.de/firmenkunden/agb/", privacy: "https://www.commerzbank.de/firmenkunden/datenschutz/" },
  "sparkasse": { impressum: "https://www.sparkasse.de/impressum.html", terms: "https://www.sparkasse.de/agb.html", privacy: "https://www.sparkasse.de/datenschutz.html" },
  "volksbank": { impressum: "https://www.vr.de/impressum.html", privacy: "https://www.vr.de/datenschutz.html" },
  "postbank-business": { impressum: "https://www.postbank.de/unternehmen/ueber-uns/impressum.html", terms: "https://www.postbank.de/privatkunden/services/kundenservice/agb.html", privacy: "https://www.postbank.de/unternehmen/ueber-uns/sicherheit-und-datenschutz/datenschutz.html" },
  "hvb-business": { impressum: "https://www.hypovereinsbank.de/hvb/footer-navigation/impressum", privacy: "https://www.hypovereinsbank.de/hvb/footer-navigation/datenschutz" },
  "targobank": { impressum: "https://www.targobank.de/de/service/impressum.html", privacy: "https://www.targobank.de/de/service/datenschutz.html" },
  "dkb-business": { impressum: "https://www.dkb.de/ueber-uns/impressum", privacy: "https://www.dkb.de/ueber-uns/datenschutz" },
  "fyrst": { impressum: "https://www.fyrst.de/impressum.html", privacy: "https://www.fyrst.de/datenschutz.html" },
  "n26-business": { impressum: "https://n26.com/de-de/legal-information", terms: "https://n26.com/de-de/terms-of-use", privacy: "https://n26.com/de-de/privacy" },
  "revolut-business": { impressum: "https://www.revolut.com/de-DE/legal-de", terms: "https://www.revolut.com/de-DE/legal/business-terms", privacy: "https://www.revolut.com/de-DE/legal/privacy" },
  "vivid-business": { impressum: "https://vivid.money/de-de/impressum/", terms: "https://vivid.money/de-de/agb/", privacy: "https://vivid.money/de-de/datenschutz/" },
  "bunq-business": { impressum: "https://www.bunq.com/de/imprint", terms: "https://www.bunq.com/de/terms", privacy: "https://www.bunq.com/de/privacy" },

  // ============ BANKING US ============
  "mercury": { terms: "https://mercury.com/legal", privacy: "https://mercury.com/legal/privacy" },
  "wise-business": { impressum: "https://wise.com/p/imprint/", terms: "https://wise.com/eu/legal/terms-and-conditions/eea", privacy: "https://wise.com/gb/legal/privacy-notices" },
  "relay": { terms: "https://relayfi.com/terms/", privacy: "https://relayfi.com/privacy/" },
  "brex": { terms: "https://www.brex.com/legal", privacy: "https://privacy.brex.com/" },
  "novo": { terms: "https://www.novo.co/legal/terms", privacy: "https://www.novo.co/legal/privacy" },
  "bluevine": { terms: "https://www.bluevine.com/terms-use", privacy: "https://www.bluevine.com/privacy-policy" },
  "found": { terms: "https://found.com/legal/tos-lead", privacy: "https://found.com/legal/privacy" },

  // ============ VERSAND DACH ============
  "sendcloud": { impressum: "https://www.sendcloud.de/impressum/", terms: "https://www.sendcloud.de/agb/", privacy: "https://www.sendcloud.de/datenschutz/" },
  "dhl-geschaeftskunden": { impressum: "https://www.dhl.de/de/toolbar/footer/impressum/dhlpaket.html", terms: "https://www.dhl.de/dhl/de/geschaeftskunden/paket/rund-um-den-versand/agb.html", privacy: "https://www.dhl.de/de/toolbar/footer/datenschutz.html" },
  "dpd": { impressum: "https://www.dpd.com/de/de/impressum/", terms: "https://www.dpd.com/de/de/agb/", privacy: "https://www.dpd.com/de/de/datenschutz/" },
  "gls": { impressum: "https://gls-group.com/DE/de/impressum/", privacy: "https://gls-group.com/DE/de/datenschutz/" },
  "hermes": { impressum: "https://www.hermesworld.com/de/impressum/", privacy: "https://www.hermesworld.com/de/datenschutz/" },
  "ups-deutschland": { terms: "https://www.ups.com/de/de/help-center/legal-terms-conditions.page", privacy: "https://www.ups.com/de/de/help-center/site-tools/privacy-notice.page" },

  // ============ BUCHHALTUNG ============
  "lexoffice": { impressum: "https://www.lexoffice.de/impressum/", terms: "https://www.lexoffice.de/agb/", privacy: "https://www.lexoffice.de/datenschutz/" },
  "sevdesk": { impressum: "https://sevdesk.de/impressum/", terms: "https://sevdesk.de/agb/", privacy: "https://sevdesk.de/datenschutz/" },
  "candis": { impressum: "https://candis.io/impressum", terms: "https://candis.io/agb", privacy: "https://candis.io/datenschutz" },
  "buchhaltungsbutler": { impressum: "https://www.buchhaltungsbutler.de/impressum/", terms: "https://www.buchhaltungsbutler.de/agb/", privacy: "https://www.buchhaltungsbutler.de/datenschutzbestimmungen/" },
  "accountable": { impressum: "https://www.accountable.de/impressum/", terms: "https://www.accountable.de/agb/", privacy: "https://www.accountable.de/datenschutzerklaerung/" },
  "smartsteuer": { impressum: "https://www.smartsteuer.de/online/impressum/", terms: "https://www.smartsteuer.de/online/agb/", privacy: "https://www.smartsteuer.de/online/datenschutzbedingungen/" },

  // ============ 3PL / FULFILLMENT ============
  "byrd": { impressum: "https://getbyrd.com/impressum", terms: "https://getbyrd.com/agbs", privacy: "https://getbyrd.com/privacy" },
  "shipbob": { terms: "https://shipbob.com/terms-of-service/", privacy: "https://shipbob.com/privacy-policy/" },
  "fromspace": { impressum: "https://fromspace.io/impressum", privacy: "https://fromspace.io/datenschutz" },

  // ============ LUCID ============
  "lizenzero": { impressum: "https://www.lizenzero.de/impressum/", terms: "https://www.lizenzero.de/agb/", privacy: "https://www.lizenzero.de/datenschutz/" },
  "reclay": { impressum: "https://www.reclay.de/impressum/", privacy: "https://www.reclay.de/datenschutz/" },

  // ============ EMAIL / MARKETING ============
  "klaviyo": { impressum: "https://www.klaviyo.com/de/legal/Impressum", terms: "https://www.klaviyo.com/legal/terms-of-service", privacy: "https://www.klaviyo.com/legal/privacy" },
  "brevo": { impressum: "https://www.brevo.com/de/legal/impressum/", terms: "https://www.brevo.com/legal/termsofuse/", privacy: "https://www.brevo.com/legal/privacypolicy/" },
  "mailchimp": { terms: "https://mailchimp.com/de/legal/terms/", privacy: "https://mailchimp.com/de/legal/privacy/" },
  "mailerlite": { terms: "https://www.mailerlite.com/legal/terms-of-service", privacy: "https://www.mailerlite.com/legal/privacy-policy" },
  "omnisend": { terms: "https://www.omnisend.com/terms/", privacy: "https://www.omnisend.com/privacy/" },
  "postmark": { terms: "https://postmarkapp.com/terms-of-service", privacy: "https://postmarkapp.com/privacy-policy" },
  "activecampaign": { terms: "https://www.activecampaign.com/legal/terms-of-service", privacy: "https://www.activecampaign.com/legal/privacy-policy" },

  // ============ TRACKING ============
  "triple-whale": { terms: "https://www.triplewhale.com/terms-of-service", privacy: "https://www.triplewhale.com/privacy-policy" },
  "hyros": { terms: "https://hyros.com/terms-of-service/", privacy: "https://hyros.com/privacy-policy/" },
  "northbeam": { terms: "https://www.northbeam.io/terms-conditions", privacy: "https://www.northbeam.io/privacy" },
  "polar-analytics": { terms: "https://www.polaranalytics.com/legal/terms-of-service", privacy: "https://www.polaranalytics.com/legal/privacy-policy" },
  "rockerbox": { terms: "https://www.rockerbox.com/terms-of-service", privacy: "https://www.rockerbox.com/privacy" },

  // ============ SHOP-SYSTEM ============
  "shopify": { terms: "https://www.shopify.com/legal/terms", privacy: "https://www.shopify.com/legal/privacy" },
  "shopware": { impressum: "https://www.shopware.com/de/impressum/", privacy: "https://www.shopware.com/en/privacy/" },
  "woocommerce": { terms: "https://woocommerce.com/terms-conditions/", privacy: "https://automattic.com/privacy/" },
  "bigcommerce": { terms: "https://www.bigcommerce.com/terms/", privacy: "https://www.bigcommerce.com/privacy/" },
  "lightspeed": { impressum: "https://www.lightspeedhq.de/impressum/", terms: "https://www.lightspeedhq.de/legal/agb/", privacy: "https://www.lightspeedhq.de/legal/datenschutzerklarung/" },

  // ============ DOMAINS ============
  "cloudflare-registrar": { terms: "https://www.cloudflare.com/website-terms/", privacy: "https://www.cloudflare.com/privacypolicy/" },
  "namecheap": { terms: "https://www.namecheap.com/legal/general/terms-of-service-agreement/", privacy: "https://www.namecheap.com/legal/general/privacy-policy/" },
  "ionos": { impressum: "https://www.ionos.de/impressum", terms: "https://www.ionos.de/agb", privacy: "https://www.ionos.de/datenschutzerklaerung" },
  "all-inkl": { impressum: "https://all-inkl.com/impressum/", terms: "https://all-inkl.com/agb/", privacy: "https://all-inkl.com/datenschutzinformationen/" },
  "inwx": { impressum: "https://www.inwx.de/de/aboutus/imprint", terms: "https://www.inwx.de/de/aboutus/terms", privacy: "https://www.inwx.de/de/aboutus/privacy" },
  "porkbun": { terms: "https://porkbun.com/legal/agreement/registration_agreement", privacy: "https://porkbun.com/legal/agreement/privacy_policy" },

  // ============ WORKSPACE / EMAIL-DOMAIN ============
  "google-workspace": { terms: "https://workspace.google.com/terms/premier_terms/", privacy: "https://policies.google.com/privacy" },
  "microsoft-365-business": { terms: "https://www.microsoft.com/de-de/servicesagreement/", privacy: "https://privacy.microsoft.com/de-de/privacystatement" },
  "mailbox-org": { impressum: "https://mailbox.org/de/impressum", terms: "https://mailbox.org/de/agb", privacy: "https://mailbox.org/de/datenschutz" },
  "proton-business": { terms: "https://proton.me/legal/terms", privacy: "https://proton.me/legal/privacy" },
  "fastmail": { terms: "https://www.fastmail.com/policies/terms-of-service/", privacy: "https://www.fastmail.com/policies/privacy/" },

  // ============ FULFILLMENT ============
  "bezahlt-fulfillment": { impressum: "https://www.bezahlt-fulfillment.de/impressum/", privacy: "https://www.bezahlt-fulfillment.de/datenschutz/" },
  "warehousing1": { impressum: "https://www.warehousing1.com/impressum", terms: "https://www.warehousing1.com/agb", privacy: "https://www.warehousing1.com/datenschutz" },
  "logward": { impressum: "https://logward.com/imprint/", privacy: "https://logward.com/privacy-policy/" },
};

export interface Provider {
  slug: string;
  name: string;
  category: string;
  region: string;
  starting: string;
  /** Monatliche Mindestgebühr (für DHL etc.) */
  monthlyMin?: string;
  rating: number;
  /** Kurz-Tagline für die Card */
  tagline: string;
  /** Längerer Brand-Beschrieb für die Detail-Seite (2–4 Sätze) */
  fullDescription?: string;
  pros: string[];
  cons: string[];
  /** Forum-Erfahrungen aus Reddit / E-Com-Foren / D2C-Communities */
  forumNotes?: string;
  /** Geschätzte Signup-/Approval-Dauer (auch für "auf Anfrage"-Anbieter) */
  signupTime?: string;
  /** Echter aktiver Coop-Deal mit GründerX (nur die wirklich verhandelten) */
  coop?: { text: string; code?: string; expires?: string };
  url: string;
  /** Direkt-Links zu Impressum / AGB / Datenschutz */
  legal?: { impressum?: string; terms?: string; privacy?: string };
  /** Weitere Quick-Links (Pricing, Demo, Vergleich) */
  links?: { label: string; url: string }[];
}

export const PROVIDERS: Provider[] = [
  // ============ BANKING DE ============
  {
    slug: "qonto",
    name: "Qonto",
    category: "Banking DE",
    region: "DE/EU",
    starting: "9 €/Mon",
    rating: 4.5,
    tagline: "Beste App, Multi-User, DATEV-Export",
    pros: ["Schnelles Onboarding (1–3 Tage)", "Top Lexoffice/DATEV-Anbindung", "Klar führend bei DE-GmbH-Gründungen", "DE-IBAN, GmbH i.G. akzeptiert"],
    cons: ["Limit auf SEPA-Buchungen (30/Mon Basic, danach 0,30 €)", "Kein Bargeld-Service"],
    forumNotes: "r/Selbststaendig + r/Finanzen: meistgenannte Empfehlung für GmbH-Solo-Gründer. Onboarding wird durchweg gelobt.",
    signupTime: "1–3 Tage komplett digital",
    url: "https://qonto.com/de",
  },
  {
    slug: "holvi",
    name: "Holvi",
    category: "Banking DE",
    region: "DE",
    starting: "9 €/Mon",
    rating: 4.2,
    tagline: "Buchhaltung integriert, Solo-Selbstständige",
    pros: ["Eingebaute Rechnungs-/Buchhaltungs-Tools", "Solo-/Klein-GmbH-Fokus", "DE-IBAN"],
    cons: ["Reviews wegen Account-Sperren gemischt", "Weniger Buchungs-Inklusivvolumen als Qonto"],
    forumNotes: "Gründerszene-Foren: gut für Freelancer mit Rechnungs-Bedarf, aber auf r/Finanzen Berichte über willkürliche Account-Schließungen.",
    signupTime: "1–5 Tage",
    url: "https://www.holvi.com/de/",
  },
  {
    slug: "finom",
    name: "Finom",
    category: "Banking DE",
    region: "DE/EU",
    starting: "0 €/Mon",
    rating: 4.3,
    tagline: "Kostenloser Tarif, Rechnungstool",
    pros: ["Free-Tier wirklich nutzbar", "Cashback auf Karten-Umsätze", "Schnelles Onboarding", "DE-IBAN"],
    cons: ["Junges Brand in DE", "Support gelegentlich langsam"],
    forumNotes: "Trustpilot ~4,4. r/Selbststaendig: 'preissensible Alternative zu Qonto, hat sich 2024–25 stark verbessert.'",
    signupTime: "1–2 Tage",
    url: "https://finom.co/de-de/",
  },
  {
    slug: "kontist",
    name: "Kontist",
    category: "Banking DE",
    region: "DE",
    starting: "9 €/Mon",
    rating: 4.0,
    tagline: "Steuer-Tool für Freelancer",
    pros: ["Steuer-Schätzung in Echtzeit", "Mit DATEV-Anbindung (Premium)"],
    cons: ["Klar Solo-/Freelancer-Fokus, GmbH eingeschränkt", "Nicht mehr aktiv weiterentwickelt seit Solaris-Schwierigkeiten"],
    forumNotes: "r/Finanzen 2024+: 'Vorsicht – Solaris-Backend instabil, viele User sind zu Qonto migriert.'",
    signupTime: "2–4 Tage",
    url: "https://kontist.com",
  },
  {
    slug: "deutsche-bank-business",
    name: "Deutsche Bank Business",
    category: "Banking DE",
    region: "DE",
    starting: "ab 12,90 €/Mon",
    rating: 4.0,
    tagline: "Hausbank für GmbHs mit Kreditbedarf",
    pros: ["100 % online eröffenbar", "Größtes Filialnetz DE", "Solides Kredit-Geschäft, KfW-Partner", "Internationale Reichweite"],
    cons: ["Reine Buchungspakete günstiger bei Neos (Qonto, Revolut)"],
    forumNotes: "Mittelstand-Communities: klare Empfehlung wenn später Kreditlinien für Inventory/Ad-Spend nötig.",
    signupTime: "Online-Eröffnung in wenigen Tagen",
    url: "https://www.deutsche-bank.de/gk.html",
  },
  {
    slug: "commerzbank-business",
    name: "Commerzbank Business",
    category: "Banking DE",
    region: "DE",
    starting: "ab 12,90 €/Mon",
    rating: 3.5,
    tagline: "Mittelstands-DNA, KfW-Partner",
    pros: ["Filialnetz DE-weit", "Solide Beratung für Wachstumskredite"],
    cons: ["Hohe Buchungsgebühr ab 11. (0,15 €)", "App eher altbacken"],
    forumNotes: "Mittelstands-Foren: solide Wahl für KMU mit Kreditlinien-Bedarf, App-UX wird oft kritisiert.",
    signupTime: "1–2 Wochen",
    url: "https://www.commerzbank.de/firmenkunden/",
  },
  {
    slug: "sparkasse",
    name: "Sparkasse (regional)",
    category: "Banking DE",
    region: "DE (regional)",
    starting: "5–15 €/Mon",
    rating: 3.5,
    tagline: "Lokale Kreditkultur, Bargeld am Schalter",
    pros: ["Lokale Verankerung & Kreditkultur", "Cash-Einzahlung am Schalter", "Top-Hausbank für KMU"],
    cons: ["Konditionen variieren stark je Sparkasse", "Online-Banking je nach Region veraltet"],
    forumNotes: "r/Selbststaendig: 'Hängt extrem von der lokalen Sparkasse ab — Berliner und Hamburger Sparkasse top, andere Regionen schlechter.'",
    signupTime: "1–3 Wochen (Filialtermin)",
    url: "https://www.sparkasse.de/firmenkunden",
  },
  {
    slug: "volksbank",
    name: "Volksbank / Raiffeisenbank",
    category: "Banking DE",
    region: "DE (regional)",
    starting: "8–14 €/Mon",
    rating: 3.5,
    tagline: "Genossenschaftlich, persönlich",
    pros: ["Starkes Mittelstandsgeschäft", "Förderkredite oft fair", "Lokal verankert"],
    cons: ["Digitalisierung uneinheitlich", "Konditionen je Bank stark unterschiedlich"],
    signupTime: "1–3 Wochen",
    url: "https://www.vr.de/firmenkunden",
  },
  {
    slug: "postbank-business",
    name: "Postbank Business",
    category: "Banking DE",
    region: "DE",
    starting: "ab 11,90 €/Mon",
    rating: 3.0,
    tagline: "Cash via Postfilialen",
    pros: ["Cash-Einzahlung in Postfilialen DE-weit", "Deutsche-Bank-Tochter (stabile Hausbank)"],
    cons: ["Wenig digital", "Service-Erfahrung gemischt"],
    signupTime: "1–2 Wochen",
    url: "https://www.postbank.de/firmenkunden/",
  },
  {
    slug: "hvb-business",
    name: "HypoVereinsbank (UniCredit)",
    category: "Banking DE",
    region: "DE / EU",
    starting: "ab 9,90 €/Mon",
    rating: 3.5,
    tagline: "Italienisch-deutscher Konzern",
    pros: ["EU-stark, ideal bei Italien/Südeuropa-Bezug", "Solide für mittelständische GmbHs"],
    cons: ["Weniger Filialen außerhalb Bayern/NRW"],
    signupTime: "2–3 Wochen",
    url: "https://www.hypovereinsbank.de/hvb/firmenkunden",
  },
  {
    slug: "dkb-business",
    name: "DKB Business",
    category: "Banking DE",
    region: "DE",
    starting: "0–9,75 €/Mon",
    rating: 4.0,
    tagline: "Günstige Direktbank, beleglos kostenlos",
    pros: ["Sehr günstig", "Sauberes Online-Banking", "Beleglose Buchungen kostenlos im Tarif"],
    cons: ["Keine Filiale", "Onboarding manchmal hakelig (Postident)"],
    forumNotes: "r/Finanzen: 'Geheimtipp für digitale GmbHs ohne Cash-Geschäft. Antrag-Prozess kann nerven.'",
    signupTime: "1–2 Wochen",
    url: "https://www.dkb.de/business/",
  },
  {
    slug: "fyrst",
    name: "Fyrst",
    category: "Banking DE",
    region: "DE",
    starting: "0 € (Base) / 10 € (Complete)",
    rating: 4.0,
    tagline: "Postbank-Tochter mit DE-IBAN, Free-Tier",
    pros: ["Free-Tier okay für Solo-GmbH", "Postbank/Deutsche-Bank-Tochter", "Cash via Postbank-Filialen"],
    cons: ["App weniger feature-reich als Neos", "Limit auf Buchungen"],
    signupTime: "1–2 Wochen",
    url: "https://www.fyrst.de/",
  },
  {
    slug: "n26-business",
    name: "N26 Business",
    category: "Banking DE",
    region: "DE/EU",
    starting: "0 € (Standard) / 4,90 € (Smart)",
    rating: 3.5,
    tagline: "App-First, sehr günstig",
    pros: ["Sehr günstig & schnell", "App-UX top", "SEPA-Out unbegrenzt frei"],
    cons: ["GmbH-Konto-Eröffnung historisch oft eingeschränkt", "Account-Sperren-Stories in Reviews"],
    forumNotes: "r/Finanzen: 'Für Freelancer top, für GmbH lieber Qonto/Finom — N26 schließt manchmal grundlos.'",
    signupTime: "1–3 Tage",
    url: "https://n26.com/de-de/business",
  },
  {
    slug: "revolut-business",
    name: "Revolut Business",
    category: "Banking DE",
    region: "EU",
    starting: "0 € (Basic) / ab 19 €/Mon",
    rating: 4.0,
    tagline: "Multi-Currency für USD/GBP-Spend",
    pros: ["DE-IBAN seit 2024", "Multi-Currency (USD/GBP) für Ads & Imports", "Schnelle Karten-Issuance"],
    cons: ["Stammkapital-Einzahlung GmbH je nach Konstellation noch zickig", "Tarifstruktur teils komplex"],
    forumNotes: "r/dropship + Meta-Ads-Foren: meistempfohlen für USD-Karten-Spend (Meta/TikTok-Ads), günstiger als FX bei Hausbank.",
    signupTime: "1–2 Tage",
    url: "https://www.revolut.com/de-DE/business/",
  },
  {
    slug: "vivid-business",
    name: "Vivid Business",
    category: "Banking DE",
    region: "DE/EU",
    starting: "ab 9,90 €/Mon",
    rating: 4.0,
    tagline: "Schickes UI, Sub-Accounts",
    pros: ["100 SEPA-Buchungen inkl.", "Sub-Accounts für Budgetierung", "Investment-Features"],
    cons: ["Etwas jünger im Markt", "Tarifstruktur komplex"],
    signupTime: "1–3 Tage",
    url: "https://vivid.money/de-de/business/",
  },
  {
    slug: "bunq-business",
    name: "Bunq Business",
    category: "Banking DE",
    region: "EU",
    starting: "ab 9,99 €/Mon",
    rating: 4.0,
    tagline: "Multi-IBAN, EU-fokussiert",
    pros: ["Multi-Banking & Mehr-IBAN", "EU-weit gut nutzbar"],
    cons: ["Support manchmal träge", "DE-Markt kleiner als bei Qonto"],
    signupTime: "1–3 Tage",
    url: "https://www.bunq.com/de/business",
  },

  // ============ BANKING US ============
  {
    slug: "mercury",
    name: "Mercury",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.7,
    tagline: "Top für US-LLC Founder, free",
    pros: ["Beste US-Banking-App für Tech-Startups", "Kostenfrei, Treasury-Yield optional", "API + Stripe-Integration top"],
    cons: ["Approval kann tricky sein für Non-US-Founder", "ITIN/SSN-Hürden ohne US-Adresse", "Manche Branchen werden gerejectet (HighRisk, Crypto)"],
    forumNotes: "r/Entrepreneur + Indie Hackers: 'Mercury-Approval ist nicht trivial — saubere Website + LLC-Docs Pflicht. Bei Reject lieber Relay versuchen.'",
    signupTime: "3–14 Tage (Approval-abhängig, viele Initial-Rejects)",
    url: "https://mercury.com",
  },
  {
    slug: "wise-business",
    name: "Wise Business",
    category: "Banking US",
    region: "global",
    starting: "0 €",
    rating: 4.5,
    tagline: "Multi-Currency, beste FX-Raten",
    pros: ["Multi-Currency (40+) ohne FX-Spread", "Sehr schnelles Onboarding", "Globale IBANs (US, UK, EU)"],
    cons: ["Kein Sperrkonto für DE-GmbH-Stammkapital", "Limit auf monatliches Volumen ohne Verifikation"],
    forumNotes: "r/digitalnomad + r/expats: 'Setup in 30 Minuten, kein Vergleich zu Mercury-Approval-Pain. Best als Zweitkonto für FX.'",
    signupTime: "30 min – 1 Tag (komplett digital)",
    url: "https://wise.com/de/business/",
  },
  {
    slug: "relay",
    name: "Relay",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.3,
    tagline: "20 Konten, Rollen & Rechte",
    pros: ["Bis zu 20 Sub-Konten für Profit-First/EBO", "Rollen-Management", "Free-Tier solide"],
    cons: ["Nur USD, kein FX", "Card-Funktionen schwächer als Mercury"],
    forumNotes: "Profit-First-Communities: 'Mercury-Alternative wenn Multi-Konten-Setup wichtig — Mercury hat das nur in Pro-Tier.'",
    signupTime: "3–7 Tage",
    url: "https://relayfi.com",
  },
  {
    slug: "brex",
    name: "Brex",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.2,
    tagline: "Kreditkarte für VC-funded Startups",
    pros: ["Hohe Limits ohne PG (für funded Startups)", "Top Expense-Management", "Rewards"],
    cons: ["Eher für VC-funded (>$100k Bank-Balance)", "Bootstrap-Founder oft abgelehnt"],
    forumNotes: "Indie Hackers: 'Brex hat Bootstrap-Sparte 2022 gekillt — nur noch für funded Startups sinnvoll.'",
    signupTime: "2–5 Tage",
    url: "https://brex.com",
  },

  // ============ VERSAND DACH ============
  {
    slug: "sendcloud",
    name: "Sendcloud",
    category: "Versand DACH",
    region: "DACH/EU",
    starting: "ab 23 €/Mon",
    rating: 4.6,
    tagline: "Multi-Carrier, Retouren-Portal",
    pros: ["Multi-Carrier (DHL, DPD, GLS, UPS, Hermes) in einer Plattform", "Top Retouren-Portal", "Shopify/Shopware/WooCommerce-Plugins"],
    cons: ["Aufpreis ggü. direkten Carrier-Tarifen bei hohem Volumen", "Bindung an Sendcloud-Labels"],
    forumNotes: "r/ecommerce_de + Shopify-DE-Foren: 'Standard für 50–500 Pakete/Monat. Ab 500+ direkter Carrier-Vertrag günstiger.'",
    signupTime: "1 Tag (sofort startklar)",
    url: "https://sendcloud.de",
  },
  {
    slug: "dhl-geschaeftskunden",
    name: "DHL Geschäftskunden",
    category: "Versand DACH",
    region: "DE",
    starting: "auf Anfrage",
    monthlyMin: "Mindestumsatz ~250 €/Mon (regional unterschiedlich)",
    rating: 4.0,
    tagline: "Standard für DE-Versand",
    pros: ["Größtes DE-Netz", "Express-Optionen + Auslandsversand", "API + Integration solide"],
    cons: ["Mindestumsatz pro Monat (regional)", "Paketpreis-Verhandlung erst ab ~500 Stück/Mon spürbar günstiger"],
    forumNotes: "r/ecommerce_de: 'Estimate aus Foren: 1–3 kg Paket DACH ~3,50–4,50 € netto bei mittlerem Volumen. Verhandlungsspielraum ab 1000 Stück/Mon.'",
    signupTime: "2–4 Wochen (Vertragsverhandlung)",
    url: "https://www.dhl.de/de/geschaeftskunden.html",
  },
  {
    slug: "dpd",
    name: "DPD",
    category: "Versand DACH",
    region: "DACH",
    starting: "auf Anfrage",
    rating: 3.8,
    tagline: "Günstig ab 100 Pakete/Monat",
    pros: ["Oft günstiger als DHL bei mittlerem Volumen", "Gute API"],
    cons: ["Zustellqualität regional schwankend", "Kundenservice gemischt"],
    forumNotes: "Shopify-DE-Slack: 'DPD-Schäden/Verluste ~2–3x häufiger als DHL — bei zerbrechlicher Ware Vorsicht.'",
    signupTime: "1–2 Wochen",
    url: "https://www.dpd.com/de/de/",
  },
  {
    slug: "gls",
    name: "GLS",
    category: "Versand DACH",
    region: "DACH/EU",
    starting: "auf Anfrage",
    rating: 3.9,
    tagline: "EU-stark, B2B-Fokus",
    pros: ["EU-Versand stark", "Pünktlich bei B2B"],
    cons: ["B2C-Zustellung bei Privathaushalten oft mehrere Versuche"],
    forumNotes: "Estimate: ~3,80–4,80 € pro 1–5 kg DACH-Paket im Vertrag.",
    signupTime: "1–2 Wochen",
    url: "https://gls-group.com/DE/de/home",
  },
  {
    slug: "hermes",
    name: "Hermes (Evri)",
    category: "Versand DACH",
    region: "DE",
    starting: "auf Anfrage",
    rating: 3.0,
    tagline: "Günstig, aber polarisierend",
    pros: ["Günstigster DE-Carrier bei niedrigem Volumen", "B2C-Zustellung an Paketshops"],
    cons: ["Verluste/Verzögerungen häufiger als bei DHL", "Reklamations-Prozess langsam"],
    forumNotes: "r/ecommerce_de: 'Nur für non-fragile + low-value-Ware. Trustpilot-Drift seit 2023 negativ.'",
    signupTime: "1 Woche",
    url: "https://www.hermesworld.com/de/",
  },
  {
    slug: "ups-deutschland",
    name: "UPS",
    category: "Versand DACH",
    region: "DE/EU/global",
    starting: "auf Anfrage",
    rating: 4.1,
    tagline: "Premium für Express + International",
    pros: ["Schnellste Express-Option", "Internationaler Versand top", "Stabile Tracking-Updates"],
    cons: ["Teurer als DHL/DPD bei Standard-Sendungen"],
    signupTime: "1–2 Wochen",
    url: "https://www.ups.com/de/de/business/",
  },

  // ============ BUCHHALTUNG ============
  {
    slug: "lexoffice",
    name: "Lexoffice",
    category: "Buchhaltung",
    region: "DE",
    starting: "11 €/Mon",
    rating: 4.4,
    tagline: "Marktführer, DATEV-Export",
    pros: ["Marktführer in DE für Solo+Klein-GmbH", "DATEV-Export (StB-freundlich)", "Beste Bank-Schnittstellen"],
    cons: ["Komplexere Buchungen erfordern Premium", "Mobile-App schwächer als sevDesk"],
    forumNotes: "r/Selbststaendig: 'Wenn dein StB lexoffice mag, nimm lexoffice. Sonst sevDesk meist günstiger.'",
    signupTime: "Sofort",
    url: "https://lexoffice.de",
  },
  {
    slug: "sevdesk",
    name: "sevDesk",
    category: "Buchhaltung",
    region: "DE",
    starting: "9 €/Mon",
    rating: 4.3,
    tagline: "Günstig, gute Mobile-App",
    pros: ["Günstigster ernsthafter DE-Anbieter", "Top Mobile-App", "Belege-Scan via OCR"],
    cons: ["DATEV-Export schwächer als lexoffice", "Größere Teams werden teurer"],
    signupTime: "Sofort",
    url: "https://sevdesk.de",
  },
  {
    slug: "candis",
    name: "Candis",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 99 €/Mon",
    rating: 4.5,
    tagline: "Rechnungs-Workflow für Teams",
    pros: ["Bester Rechnungs-Approval-Workflow", "Team-Rollen + Freigabe-Ketten", "Top KI-OCR"],
    cons: ["Erst ab Mid-Size sinnvoll (Team ≥ 5)", "Teurer Einstieg"],
    forumNotes: "Mittelstand-Communities: 'Wenn jemand AP-Workflow macht — Candis. Solo-Founder: overkill.'",
    signupTime: "1 Woche",
    url: "https://candis.io",
  },
  {
    slug: "buchhaltungsbutler",
    name: "BuchhaltungsButler",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 19 €/Mon",
    rating: 4.2,
    tagline: "Automatik-Buchungen",
    pros: ["Hohe Automatisierungs-Quote", "DATEV-konform"],
    cons: ["UX altbacken im Vergleich zu lexoffice"],
    signupTime: "Sofort",
    url: "https://buchhaltungsbutler.de",
  },
  {
    slug: "accountable",
    name: "Accountable",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 9,50 €/Mon",
    rating: 4.4,
    tagline: "Solo-Selbstständige + Steuerberatung",
    pros: ["Eingebauter Steuerberater-Service (kostenpflichtig)", "Mobile-First", "Übersichtliche UI für Solo"],
    cons: ["Für GmbH eingeschränkt geeignet", "Tax-Service nur als Add-on"],
    forumNotes: "Freelancer-Foren: 'Accountable für Solos top — Steuer-Hilfe ist die killer-Feature. GmbH lieber lexoffice.'",
    signupTime: "Sofort",
    url: "https://www.accountable.de",
  },
  {
    slug: "smartsteuer",
    name: "smartsteuer",
    category: "Buchhaltung",
    region: "DE",
    starting: "ab 39,99 €/Steuerjahr",
    rating: 4.3,
    tagline: "Steuererklärung-Tool (NICHT Buchhaltung) – Add-on",
    pros: ["Geführte Steuererklärung für Selbstständige", "Auch GmbH KSt-Erklärung möglich", "Direkt-ELSTER-Übermittlung"],
    cons: ["Ersetzt KEINE Buchhaltungs-Software – nur Steuererklärung", "Pro Jahr neu kaufen", "Bei komplexen GmbHs StB nötig"],
    forumNotes: "Wichtig: smartsteuer ist Steuer-Tool, nicht Buchhaltung. Stack: lexoffice/sevDesk (laufende Buchhaltung) + smartsteuer (Jahres-Erklärung) + ggf. StB.",
    signupTime: "Sofort",
    url: "https://www.smartsteuer.de",
  },

  // ============ 3PL / FULFILLMENT ============
  {
    slug: "byrd",
    name: "Byrd",
    category: "3PL",
    region: "EU",
    starting: "auf Anfrage",
    rating: 4.4,
    tagline: "EU-weite Lager, Shopify-Integration",
    pros: ["EU-Lager-Netzwerk (DE, AT, NL, FR, ES, IT)", "Shopify/Shopware/WooCommerce-Integration", "Self-Service-Dashboard"],
    cons: ["Storage-Kosten höher als kleine 3PLs", "Ab ~200 Bestellungen/Monat sinnvoll"],
    forumNotes: "r/ecommerce_de + DTC-Slack: 'Estimate ~1,80–2,50 €/Pick + Storage/m³. Onboarding 2–4 Wochen für SKU-Setup.'",
    signupTime: "2–4 Wochen Setup nach Vertrag",
    url: "https://getbyrd.com",
  },
  {
    slug: "shipbob",
    name: "ShipBob",
    category: "3PL",
    region: "global",
    starting: "auf Anfrage",
    rating: 4.3,
    tagline: "US + EU + UK Lager",
    pros: ["Globales Lager-Netzwerk", "Top für US-Markt-Eintritt von DE aus"],
    cons: ["Min-Volume relativ hoch", "Pricing erst nach Demo"],
    forumNotes: "Estimate r/dropship: '~3,00–4,50 $/Order Pick&Pack US, +Storage. Lohnt ab 500+ Orders/Monat US.'",
    signupTime: "3–6 Wochen Setup",
    url: "https://shipbob.com",
  },
  {
    slug: "fromspace",
    name: "FromSpace",
    category: "3PL",
    region: "DE",
    starting: "auf Anfrage",
    rating: 4.2,
    tagline: "DE-3PL für Mid-Volume D2C",
    pros: ["DE-fokussiert", "Persönlicher Account-Manager"],
    cons: ["Kein globales Netzwerk"],
    signupTime: "2–4 Wochen",
    url: "https://fromspace.io",
  },

  // ============ LUCID / VERPACKUNG ============
  {
    slug: "lizenzero",
    name: "Lizenzero",
    category: "LUCID",
    region: "DE",
    starting: "ab 39 €/Jahr",
    rating: 4.5,
    tagline: "Für kleine Mengen ideal",
    pros: ["Niedrigster Einstiegspreis", "Einfache Anmeldung", "Auch für Marktplatz-Verkäufer"],
    cons: ["Bei hohen Mengen teurer als Reclay"],
    signupTime: "1 Tag",
    url: "https://lizenzero.de",
  },
  {
    slug: "reclay",
    name: "Reclay",
    category: "LUCID",
    region: "DE",
    starting: "auf Anfrage",
    rating: 4.0,
    tagline: "Für hohe Mengen",
    pros: ["Skalierbar bei großem Volumen", "Persönliche Betreuung"],
    cons: ["Min-Volume", "Erst ab größerem Versand-Volumen lohnend"],
    signupTime: "1–2 Wochen",
    url: "https://www.reclay.de",
  },

  // ============ EMAIL / MARKETING ============
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "Email",
    region: "global",
    starting: "ab 20 $/Mon",
    rating: 4.7,
    tagline: "Beste E-Com Email-Plattform",
    pros: ["Standard für DTC-Email", "Flow-Builder unschlagbar", "Beste Shopify-Integration"],
    cons: ["Wird teuer ab 20k Subscribers", "Nicht DSGVO-out-of-the-box (Server US)"],
    forumNotes: "DTC-Twitter consensus: 'Klaviyo ist nicht-verhandelbar für E-Com. Alle anderen Tools sind Workarounds.'",
    signupTime: "Sofort",
    url: "https://klaviyo.com",
  },
  {
    slug: "brevo",
    name: "Brevo (ex Sendinblue)",
    category: "Email",
    region: "EU",
    starting: "0 €/Mon",
    rating: 4.2,
    tagline: "Günstig, DSGVO-konform",
    pros: ["EU-Server (DSGVO)", "Free-Tier 300 Mails/Tag", "Pricing transparent"],
    cons: ["Flow-Builder schwächer als Klaviyo", "Templates altbacken"],
    signupTime: "Sofort",
    url: "https://www.brevo.com",
  },

  // ============ TRACKING ============
  {
    slug: "triple-whale",
    name: "Triple Whale",
    category: "Tracking",
    region: "global",
    starting: "ab 129 $/Mon",
    rating: 4.6,
    tagline: "Top Shopify Attribution",
    pros: ["Beste Shopify-First-Party-Attribution", "Klare Dashboards für Founder"],
    cons: ["Teuer für kleine Brands", "Lock-in (Datenexport begrenzt)"],
    forumNotes: "DTC-Slack: 'Ab 50k MRR Pflicht. Drunter zu teuer.'",
    signupTime: "Sofort",
    url: "https://triplewhale.com",
  },
  {
    slug: "hyros",
    name: "Hyros",
    category: "Tracking",
    region: "global",
    starting: "ab 99 $/Mon",
    rating: 4.5,
    tagline: "Server-Side Tracking, Coaching/Info-Ads",
    pros: ["Server-Side-Tracking robust", "Stark bei High-Ticket / Coaching / Info-Products"],
    cons: ["UI komplex", "E-Com weniger Fokus als Triple Whale"],
    signupTime: "Sofort",
    url: "https://hyros.com",
  },

  // ============ SHOP-SYSTEM ============
  {
    slug: "shopify",
    name: "Shopify",
    category: "Shop-System",
    region: "global",
    starting: "39 $/Mon",
    rating: 4.7,
    tagline: "Standard für DTC-Brands",
    pros: ["Größtes App-Ökosystem", "Schnellster Setup", "Skaliert von 0 → Mio Umsatz"],
    cons: ["Transaktionsgebühren ohne Shopify Payments", "Lock-in"],
    signupTime: "Sofort",
    url: "https://shopify.com",
  },
  {
    slug: "shopware",
    name: "Shopware",
    category: "Shop-System",
    region: "DE",
    starting: "0 € (Open Source)",
    rating: 4.3,
    tagline: "DE-Standard, B2B-stark",
    pros: ["DE-Hosting möglich (DSGVO)", "Stark für B2B", "Open Source verfügbar"],
    cons: ["Hosting + Wartung selbst nötig (CE)", "Kleineres App-Ökosystem"],
    signupTime: "Sofort (CE) / 2–4 Wochen (Cloud-Setup)",
    url: "https://www.shopware.com",
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "Shop-System",
    region: "global",
    starting: "0 € + Hosting",
    rating: 4.2,
    tagline: "WordPress-Plugin, maximal flexibel",
    pros: ["Komplett kostenlos (Core)", "Größtes WordPress-Ökosystem", "Volle Code-Kontrolle"],
    cons: ["Hosting + Maintenance selbst", "Performance bei wachsendem Katalog tricky"],
    forumNotes: "r/woocommerce: 'Top für SEO-Lastige Brands mit Content-Marketing. Skaliert bis ~5–10k Bestellungen/Mon, danach Shopify einfacher.'",
    signupTime: "1–3 Tage Setup",
    url: "https://woocommerce.com",
  },
  {
    slug: "bigcommerce",
    name: "BigCommerce",
    category: "Shop-System",
    region: "global",
    starting: "ab 39 $/Mon",
    rating: 4.1,
    tagline: "Headless + B2B-Features",
    pros: ["Keine Transaktionsgebühren", "Starke B2B-Module", "Headless-fähig"],
    cons: ["Kleineres App-Ökosystem als Shopify", "Sales-Caps pro Tier"],
    signupTime: "Sofort",
    url: "https://www.bigcommerce.com",
  },
  {
    slug: "lightspeed",
    name: "Lightspeed eCom",
    category: "Shop-System",
    region: "EU/global",
    starting: "ab 89 €/Mon",
    rating: 4.0,
    tagline: "Retail + Online verbunden",
    pros: ["POS + Online aus einer Hand", "EU-Standort, DSGVO-freundlich"],
    cons: ["Teurer Einstieg", "App-Ökosystem klein"],
    signupTime: "1 Woche",
    url: "https://www.lightspeedhq.de",
  },

  // ============ BANKING US (Erweitert) ============
  {
    slug: "novo",
    name: "Novo",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.3,
    tagline: "Free Banking für Solo-LLC",
    pros: ["Komplett kostenlos", "Solide Integrationen (Stripe, QuickBooks)", "Schneller Setup"],
    cons: ["Keine Cashback-Karte", "Approval kann zickig sein"],
    forumNotes: "Indie Hackers: 'Mercury-Alternative für Solos die zu klein für Mercury-Approval sind. Setup einfacher.'",
    signupTime: "1–3 Tage",
    url: "https://www.novo.co",
  },
  {
    slug: "bluevine",
    name: "Bluevine",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.2,
    tagline: "Hohe Zinsen auf Balance",
    pros: ["Bis zu 2,0 % APY auf Checking-Balance", "Free", "Line of Credit verfügbar"],
    cons: ["Approval Non-US tricky", "Kein Multi-Sub-Konto"],
    signupTime: "2–5 Tage",
    url: "https://www.bluevine.com",
  },
  {
    slug: "found",
    name: "Found",
    category: "Banking US",
    region: "US",
    starting: "0 $",
    rating: 4.1,
    tagline: "Banking + Steuer für Self-Employed",
    pros: ["Eingebaute Tax-Schätzung", "Free-Tier", "Solo-Fokus"],
    cons: ["Nur 1099/Schedule-C-Personen ideal", "Limited Features"],
    signupTime: "1–2 Tage",
    url: "https://found.com",
  },

  // ============ EMAIL / MARKETING (Erweitert) ============
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "Email",
    region: "global",
    starting: "0 €/Mon (bis 500 Kontakte)",
    rating: 3.8,
    tagline: "Klassiker, aber nicht mehr first-choice",
    pros: ["Free-Tier", "Bekannte Marke", "Templates-Library groß"],
    cons: ["Wird teuer ab 5k Kontakte", "Flow-Builder schwächer als Klaviyo", "DTC-Founder migrieren oft weg"],
    signupTime: "Sofort",
    url: "https://mailchimp.com",
  },
  {
    slug: "mailerlite",
    name: "MailerLite",
    category: "Email",
    region: "EU",
    starting: "0 €/Mon (bis 1k Kontakte)",
    rating: 4.4,
    tagline: "Günstigster ernsthafter Klaviyo-Wettbewerber",
    pros: ["Sehr günstig", "EU-Server (DSGVO)", "Solider Editor"],
    cons: ["E-Com-Features schwächer als Klaviyo", "Kleineres App-Ökosystem"],
    forumNotes: "r/Entrepreneur: 'MailerLite für Bootstrap-Brands unter 50k MRR.'",
    signupTime: "Sofort",
    url: "https://www.mailerlite.com",
  },
  {
    slug: "omnisend",
    name: "Omnisend",
    category: "Email",
    region: "global",
    starting: "0 €/Mon (bis 250 Kontakte)",
    rating: 4.5,
    tagline: "Klaviyo-Alternative für E-Com",
    pros: ["E-Com-First wie Klaviyo, günstiger", "SMS + Email aus einer Hand", "Free-Tier"],
    cons: ["Reporting weniger tief als Klaviyo"],
    forumNotes: "r/shopify: 'Wenn Klaviyo zu teuer, Omnisend probieren — fast gleiches Feature-Set.'",
    signupTime: "Sofort",
    url: "https://www.omnisend.com",
  },
  {
    slug: "postmark",
    name: "Postmark",
    category: "Email",
    region: "global",
    starting: "ab 15 $/Mon",
    rating: 4.7,
    tagline: "Transactional Email, beste Deliverability",
    pros: ["Höchste Deliverability für Transaktions-Mails", "Saubere API", "Stabile Logs"],
    cons: ["Nur Transaktional, kein Marketing", "Kein Visual-Editor"],
    signupTime: "Sofort",
    url: "https://postmarkapp.com",
  },
  {
    slug: "activecampaign",
    name: "ActiveCampaign",
    category: "Email",
    region: "global",
    starting: "ab 19 $/Mon",
    rating: 4.4,
    tagline: "Automation-Heavy für B2B + Coaching",
    pros: ["Automations sehr mächtig", "CRM eingebaut", "Auch B2B-tauglich"],
    cons: ["Lernkurve", "Wird ab 2.5k Kontakte teurer"],
    signupTime: "Sofort",
    url: "https://www.activecampaign.com",
  },

  // ============ TRACKING (Erweitert) ============
  {
    slug: "northbeam",
    name: "Northbeam",
    category: "Tracking",
    region: "global",
    starting: "ab 1.000 $/Mon",
    rating: 4.6,
    tagline: "Enterprise-Attribution für 7-figure-Brands",
    pros: ["Tiefste Attribution-Daten am Markt", "MMM (Media-Mix-Modeling)"],
    cons: ["Sehr teuer", "Erst ab ~500k MRR sinnvoll"],
    signupTime: "Demo + 2 Wochen Setup",
    url: "https://www.northbeam.io",
  },
  {
    slug: "polar-analytics",
    name: "Polar Analytics",
    category: "Tracking",
    region: "global",
    starting: "ab 250 $/Mon",
    rating: 4.4,
    tagline: "Shopify-Analytics für 6-7-figure DTC",
    pros: ["Multi-Channel-Reporting", "Zwischen Triple Whale und Northbeam preislich"],
    cons: ["Tracking-Tiefe geringer als Northbeam"],
    signupTime: "1 Woche",
    url: "https://www.polaranalytics.com",
  },
  {
    slug: "rockerbox",
    name: "RockerBox",
    category: "Tracking",
    region: "US",
    starting: "auf Anfrage",
    rating: 4.3,
    tagline: "Server-Side + MMM für US-Brands",
    pros: ["Cross-Channel-Attribution", "Strong B2B/Enterprise"],
    cons: ["Eher US-fokussiert", "Pricing intransparent"],
    forumNotes: "DTC-Slack: 'Estimate ~3–6k $/Mon je nach Volumen.'",
    signupTime: "2–4 Wochen Setup",
    url: "https://www.rockerbox.com",
  },

  // ============ DOMAINS (NEU) ============
  {
    slug: "cloudflare-registrar",
    name: "Cloudflare Registrar",
    category: "Domains",
    region: "global",
    starting: "Wholesale-Preis (~10 $/Jahr)",
    rating: 4.8,
    tagline: "Günstigster Registrar — at-cost",
    pros: ["At-cost Pricing (kein Markup)", "Eingebaute Cloudflare-DNS + Security", "Kein WHOIS-Privacy-Aufpreis"],
    cons: ["Domain muss zu Cloudflare migriert werden (kann dauern)", "Keine .de-Endung"],
    forumNotes: "r/webdev: 'Wer schon Cloudflare nutzt: zwingend Domain dorthin transferieren — spart pro Domain 5–15 €/Jahr.'",
    signupTime: "Transfer 5–7 Tage, neue Domain sofort",
    url: "https://www.cloudflare.com/products/registrar/",
  },
  {
    slug: "namecheap",
    name: "Namecheap",
    category: "Domains",
    region: "global",
    starting: "ab 7 €/Jahr",
    rating: 4.4,
    tagline: "Günstig, stabil, .com-Standard",
    pros: ["Faire Preise", "WHOIS-Privacy gratis", "Solider Support"],
    cons: ["Keine .de-TLD"],
    signupTime: "Sofort",
    url: "https://www.namecheap.com",
  },
  {
    slug: "ionos",
    name: "IONOS (1&1)",
    category: "Domains",
    region: "DE",
    starting: "ab 1 €/Jahr (Sonderaktion) / 9,90 € regulär",
    rating: 3.5,
    tagline: ".de-Standard, DE-Hosting",
    pros: ["DE-IBAN, DE-Support", "Bundle aus Domain + Hosting + Email", "Top für .de-Endungen"],
    cons: ["Auto-Renewal-Preise teuer", "Up-Sell-Aggressiv beim Checkout"],
    forumNotes: "r/webdev_de: 'Erste Domain günstig, Verlängerung schmerzhaft. Domains lieber zu Cloudflare/INWX migrieren.'",
    signupTime: "Sofort",
    url: "https://www.ionos.de",
  },
  {
    slug: "all-inkl",
    name: "ALL-INKL.COM",
    category: "Domains",
    region: "DE",
    starting: "ab 4,95 €/Mon (Domain im Hosting)",
    rating: 4.5,
    tagline: "DE-Hosting + Domain Bundle, Geheimtipp",
    pros: ["Top DE-Support", "Faire Preise ohne Versteck-Aufschläge", ".de + .com inklusive"],
    cons: ["Eher Hosting-Fokus, nicht Domain-pur"],
    forumNotes: "r/webdev_de Top-Empfehlung: 'Wenn DE-Hosting + Domain — ALL-INKL nehmen, nicht IONOS.'",
    signupTime: "Sofort",
    url: "https://all-inkl.com",
  },
  {
    slug: "inwx",
    name: "INWX",
    category: "Domains",
    region: "DE",
    starting: "ab 8 €/Jahr",
    rating: 4.6,
    tagline: "Pro-Registrar für Power-User",
    pros: ["Faire Preise auch bei Renewal", "Top API für Bulk-Management", "DE-Anbieter mit Server in EU"],
    cons: ["UI etwas trocken", "Eher für Tech-affine User"],
    signupTime: "Sofort",
    url: "https://www.inwx.de",
  },
  {
    slug: "porkbun",
    name: "Porkbun",
    category: "Domains",
    region: "global",
    starting: "ab 6 $/Jahr",
    rating: 4.7,
    tagline: "Günstig + entwicklerfreundlich",
    pros: ["Konstante Preise (auch bei Renewal)", "WHOIS-Privacy gratis", "Saubere UI"],
    cons: ["Keine .de"],
    signupTime: "Sofort",
    url: "https://porkbun.com",
  },

  // ============ WORKSPACE / EMAIL-DOMAIN (NEU) ============
  {
    slug: "google-workspace",
    name: "Google Workspace",
    category: "Workspace",
    region: "global",
    starting: "ab 5,75 €/User/Mon",
    rating: 4.6,
    tagline: "Email + Drive + Meet, Standard für DTC",
    pros: ["Beste Email-Deliverability für Custom-Domain", "Tight Integration mit allen SaaS-Tools", "Skaliert von 1 → 1000 User"],
    cons: ["DSGVO-Risiko für sensible Daten (US-CLOUD-Act)", "Pro-User-Preis summiert sich"],
    forumNotes: "DTC-Twitter: 'Workspace ist nicht-verhandelbar. Microsoft 365 nur für Corporate-Kontexte.'",
    signupTime: "Sofort (DNS-Setup 1–24h)",
    url: "https://workspace.google.com",
  },
  {
    slug: "microsoft-365-business",
    name: "Microsoft 365 Business",
    category: "Workspace",
    region: "global",
    starting: "ab 5,60 €/User/Mon",
    rating: 4.3,
    tagline: "Office + Teams + OneDrive",
    pros: ["Beste Office-Apps", "Teams für Corp-Kommunikation", "EU-Datacenter-Option"],
    cons: ["Email-Spam-Filter aggressiv (Mails landen oft im Junk)", "Komplexere Admin-UI"],
    signupTime: "Sofort",
    url: "https://www.microsoft.com/de-de/microsoft-365/business",
  },
  {
    slug: "mailbox-org",
    name: "mailbox.org",
    category: "Workspace",
    region: "DE",
    starting: "ab 1 €/Mon (Custom Domain)",
    rating: 4.6,
    tagline: "DSGVO + Privacy-First, DE-Server",
    pros: ["100 % DE-Server (Berlin)", "Strikt DSGVO + ePrivacy", "Sehr günstig"],
    cons: ["Kein Office-Suite", "UI weniger glatt als Google"],
    forumNotes: "r/datenschutz: 'Top-Empfehlung für DE-Brands mit DSGVO-Sensibilität.'",
    signupTime: "Sofort (DNS-Setup 1–24h)",
    url: "https://mailbox.org",
  },
  {
    slug: "proton-business",
    name: "Proton Business",
    category: "Workspace",
    region: "EU (Schweiz)",
    starting: "ab 6,99 €/User/Mon",
    rating: 4.5,
    tagline: "End-to-End-Encryption für Privacy-Brands",
    pros: ["E2E-Encryption Standard", "EU/CH-Server", "VPN/Drive/Calendar inklusive"],
    cons: ["E2E nur unter Proton-Usern", "API limitiert"],
    signupTime: "Sofort",
    url: "https://proton.me/business",
  },
  {
    slug: "fastmail",
    name: "Fastmail",
    category: "Workspace",
    region: "global",
    starting: "ab 5 $/User/Mon",
    rating: 4.5,
    tagline: "Premium-Email für Nerds & Indie-Founder",
    pros: ["Beste Email-UX", "Sehr gute Deliverability", "Mehrere Custom-Domains"],
    cons: ["Kein Office", "AU-Anbieter (Datenschutz: gut, aber außerhalb EU)"],
    signupTime: "Sofort",
    url: "https://www.fastmail.com",
  },

  // ============ FULFILLMENT-CENTER (NEU – D2C-Spezialisten, on top zu generischen 3PL) ============
  {
    slug: "bezahlt-fulfillment",
    name: "BEZAHLT FULFILLMENT",
    category: "Fulfillment",
    region: "DE",
    starting: "auf Anfrage",
    rating: 4.3,
    tagline: "DE-3PL spezialisiert auf D2C / E-Com",
    pros: ["DE-Lager", "D2C-Verständnis", "Persönlicher Account-Manager"],
    cons: ["Min-Volume", "Pricing-Verhandlung"],
    forumNotes: "Estimate Foren: ~1,80–2,80 €/Pick + Storage. Onboarding 3–4 Wochen.",
    signupTime: "2–4 Wochen Setup",
    url: "https://www.bezahlt-fulfillment.de",
  },
  {
    slug: "warehousing1",
    name: "Warehousing1",
    category: "Fulfillment",
    region: "DE/EU",
    starting: "auf Anfrage",
    rating: 4.4,
    tagline: "Marketplace für 3PL-Lager DE/EU",
    pros: ["Vergleicht mehrere 3PLs auf einer Plattform", "Schnelle Match-Time"],
    cons: ["Du wählst nicht direkt das Lager"],
    signupTime: "1–2 Wochen Match",
    url: "https://www.warehousing1.com",
  },
  {
    slug: "logward",
    name: "Logward",
    category: "Fulfillment",
    region: "EU",
    starting: "auf Anfrage",
    rating: 4.2,
    tagline: "Mid-Volume D2C 3PL EU",
    pros: ["EU-Multi-Lager", "Flexible Verträge"],
    cons: ["Eher gehobenes Volumen"],
    signupTime: "2–3 Wochen",
    url: "https://www.logward.com",
  },
];

const CATS = ["Alle", ...Array.from(new Set(PROVIDERS.map((p) => p.category)))];

const Anbieter = () => {
  const [cat, setCat] = useState("Alle");
  const [q, setQ] = useState("");

  const list = useMemo(() => PROVIDERS.filter((p) =>
    (cat === "Alle" || p.category === cat) &&
    (q === "" || (p.name + " " + p.tagline + " " + p.pros.join(" ") + " " + p.cons.join(" ")).toLowerCase().includes(q.toLowerCase()))
  ), [cat, q]);

  return (
    <CockpitShell
      eyebrow="🏆 Anbieter-Vergleichs-Engine"
      title="Die besten Tools – mit verhandelten Coop-Deals"
      subtitle="Top-Anbieter pro Kategorie – mit echten Stärken/Schwächen aus Reddit & E-Com-Foren. Coop-Deals sind echt verhandelt."
    >
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input placeholder="Anbieter, Stärke oder Schwäche suchen..." value={q} onChange={(e) => setQ(e.target.value)} className="md:max-w-xs" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p) => <ProviderCard key={p.slug} p={p} />)}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Keine Anbieter gefunden.</div>
      )}
    </CockpitShell>
  );
};

const ProviderCard = ({ p }: { p: Provider }) => (
  <Link to={`/anbieter/${p.slug}`} className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft hover:border-accent-blue/40 transition-all flex flex-col">
    <div className="flex items-start justify-between mb-2 gap-3">
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue">{p.category}</div>
        <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        {p.rating.toFixed(1)}
      </div>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.tagline}</p>

    {/* Pros / Cons */}
    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
      <div>
        <div className="font-semibold text-success mb-1">+ Stärken</div>
        <ul className="space-y-0.5 text-muted-foreground">
          {p.pros.slice(0, 4).map((s, i) => <li key={i} className="leading-snug">· {s}</li>)}
        </ul>
      </div>
      <div>
        <div className="font-semibold text-destructive mb-1">– Schwächen</div>
        <ul className="space-y-0.5 text-muted-foreground">
          {p.cons.slice(0, 3).map((s, i) => <li key={i} className="leading-snug">· {s}</li>)}
        </ul>
      </div>
    </div>

    {p.forumNotes && (
      <div className="rounded-lg bg-secondary/40 border border-border p-2.5 text-[11px] text-muted-foreground leading-snug mb-3 flex gap-1.5">
        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 text-accent-blue" />
        <span><em>{p.forumNotes}</em></span>
      </div>
    )}

    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 gap-2">
      <span>{p.region}</span>
      <span className="font-semibold text-foreground text-right">{p.starting}</span>
    </div>

    {(p.signupTime || p.monthlyMin) && (
      <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground mb-3">
        {p.signupTime && (
          <span className="rounded-full bg-secondary px-2 py-0.5 inline-flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" />{p.signupTime}
          </span>
        )}
        {p.monthlyMin && (
          <span className="rounded-full bg-warning/10 text-warning-foreground border border-warning/30 px-2 py-0.5 inline-flex items-center gap-1">
            <AlertCircle className="h-2.5 w-2.5" />{p.monthlyMin}
          </span>
        )}
      </div>
    )}

    {p.coop && (
      <div className="rounded-xl bg-accent text-accent-foreground p-2.5 text-xs font-semibold mb-3">
        <div className="flex items-start gap-1.5">
          <Tag className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <div>
            Coop-Deal: {p.coop.text}
            {p.coop.code && <div className="text-[10px] mt-0.5 font-mono opacity-80">Code: {p.coop.code}</div>}
            {p.coop.expires && <div className="text-[10px] mt-0.5 opacity-80">gültig bis {p.coop.expires}</div>}
          </div>
        </div>
      </div>
    )}

    <div className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-blue">
      Details ansehen <ExternalLink className="h-3 w-3" />
    </div>
  </Link>
);

export default Anbieter;
