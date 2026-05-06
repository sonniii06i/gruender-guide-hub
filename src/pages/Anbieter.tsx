import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Star, Tag, ExternalLink, Clock, AlertCircle } from "lucide-react";

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

/**
 * Brand-Beschreibungen pro Anbieter (3–5 Sätze).
 * Wird von der monatlichen Audit-Routine ergänzt/aktualisiert.
 */
export const FULL_DESCRIPTIONS: Record<string, string> = {
  // ============ BANKING DE ============
  "qonto": "Qonto wurde 2017 in Frankreich gegründet und ist seit 2020 in Deutschland aktiv. Das Geschäftskonto richtet sich primär an Solo-Selbstständige, GmbHs und Teams – mit DE-IBAN, kompletter Online-Eröffnung in 1–3 Tagen und sehr guter DATEV/Lexoffice-Anbindung. Über 500.000 Geschäftskunden EU-weit, in Deutschland klare Nummer eins unter den Neobanks für Gründer. Penta wurde 2022 von Qonto übernommen und vollständig integriert.",
  "holvi": "Holvi ist ein finnischer Anbieter, der seit 2018 zu BBVA gehörte und aktuell unter eigener Lizenz operiert. Der Fokus liegt auf Einzelunternehmer:innen und Klein-GmbHs in Deutschland – integrierte Rechnungs- und Buchhaltungs-Tools sind das Alleinstellungsmerkmal. DE-IBAN, einfache UI. Reviews wegen vereinzelter Account-Schließungen gemischt.",
  "finom": "Finom wurde 2019 in den Niederlanden gegründet und expandiert seit 2022 stark in Deutschland. Das Konto bietet einen echten Free-Tier (Solo) sowie kostenpflichtige Pakete mit Cashback auf Karten-Umsätze und integriertem Rechnungstool. DE-IBAN, schnelles Onboarding in 1–2 Tagen. Stetig wachsendes Brand mit klarem Pricing.",
  "kontist": "Kontist startete 2017 als deutsches Fintech mit Fokus auf Freelancer und Steuer-Schätzung in Echtzeit. Die Solaris-Bank-Probleme 2023–24 haben dem Anbieter zugesetzt – viele User sind zu Qonto migriert. Für Solo-Freelancer mit Tax-Bedarf weiterhin nutzbar, für GmbHs nur eingeschränkt empfohlen.",
  "deutsche-bank-business": "Die Deutsche Bank ist die größte deutsche Privatbank und langjährige Hausbank vieler Mittelständler. Geschäftskonten lassen sich seit 2023 vollständig online eröffnen. Die Stärke liegt in der Kreditbeziehung – Working-Capital, Investitionskredite und KfW-Finanzierungen sind Kernprodukte für wachsende GmbHs. Internationales Korrespondenzbank-Netzwerk umfasst über 70 Länder.",
  "commerzbank-business": "Die Commerzbank ist mit über 30.000 Firmenkunden eine der wichtigsten Mittelstandsbanken Deutschlands. KfW-Hausbankprogramme und Förderkredite gehören zum Kerngeschäft. Das Geschäftskonto Plus deckt Standardanforderungen ab, mit klassischer Filialberatung. App und Online-Banking sind funktional, aber weniger modern als bei Neobanks.",
  "sparkasse": "Die Sparkassen-Finanzgruppe besteht aus knapp 350 lokalen Sparkassen und ist mit Abstand das größte Filialbank-Netz Deutschlands. Konditionen, Online-Banking-Qualität und Kreditkultur variieren stark je Region. Stärke: lokale Verankerung, Bargeld-Service am Schalter und enge Verbindung zu IHK/Handwerkskammern – ideal für GmbHs mit physischem Geschäft vor Ort.",
  "volksbank": "Die Volks- und Raiffeisenbanken (BVR-Verbund) bestehen aus über 700 genossenschaftlichen Banken in Deutschland. Mitglieder-orientierte Beratung, faire Förderkredit-Vermittlung und persönlicher Service sind die Stärken. Wie bei Sparkassen variieren Digitalisierungsgrad und Konditionen je Region erheblich.",
  "postbank-business": "Die Postbank ist seit 2010 Tochter der Deutschen Bank und über das DHL/Post-Filialnetz präsent. Das Business-Konto ist für GmbHs mit hohem Bargeldgeschäft attraktiv – Cash-Einzahlung und Geldabholung in über 13.000 Postfilialen DE-weit. Online-Banking funktional, App weniger modern.",
  "hvb-business": "Die HypoVereinsbank gehört zur italienischen UniCredit-Gruppe und ist eine der vier deutschen Großbanken. Stärke ist das EU-Netzwerk – besonders Italien, Österreich und Südosteuropa. Filialdichte außerhalb Bayern/NRW geringer als bei Deutsche Bank/Commerzbank.",
  "targobank": "Die Targobank gehört zum französischen Crédit-Mutuel-Konzern und betreibt rund 350 Filialen in Deutschland. Die Stärke liegt in einfachen Konditionen und persönlicher Beratung. Online-Banking funktional, aber UI-mäßig nicht auf Neobank-Niveau.",
  "dkb-business": "Die DKB ist eine der größten Direktbanken Deutschlands (Tochter der BayernLB) und seit 2022 mit DKB Business im Geschäftskunden-Markt aktiv. Beleglose Buchungen sind im Tarif kostenlos, das Online-Banking gilt als das beste der etablierten Banken. Keine Filialen – Onboarding läuft komplett digital, manchmal mit Postident-Hürden.",
  "fyrst": "Fyrst ist eine 2020 gestartete Tochter von Postbank und Deutscher Bank, speziell für Solo-Selbstständige und Klein-GmbHs. Free-Tier (Base) und 10-€-Tarif (Complete) decken die meisten Anwendungsfälle ab. Mit DE-IBAN und Cash-Service über Postbank-Filialen. Eine pragmatische Alternative zwischen Hausbank und Neobank.",
  "n26-business": "N26 ist eine deutsche Direktbank mit Sitz in Berlin und einer der bekanntesten europäischen Neobanks. Das Business-Konto richtet sich primär an Solo-Selbstständige – der Standard-Tarif ist gratis, der Smart-Tarif kostet 4,90 €/Mon. Für GmbH-Gründungen historisch eingeschränkt akzeptiert; Trustpilot-Reviews wegen Account-Sperren gemischt.",
  "revolut-business": "Revolut wurde 2015 in London gegründet und ist heute mit eigener Banklizenz (Revolut Bank UAB, Litauen) in der EU aktiv. Seit 2024 mit deutschen IBANs für Geschäftskunden. Die Stärke liegt in Multi-Currency – über 25 Währungen mit interbank-nahen FX-Raten, ideal für GmbHs mit US-/UK-Bezug oder Meta/TikTok-Ad-Spend.",
  "vivid-business": "Vivid ist ein 2020 in Berlin gegründetes Fintech mit Solaris-Backend. Vivid Business bietet 100 SEPA-Buchungen inklusive, Sub-Accounts für Budgetierung und Investment-Features (ETF, Crypto). Die UX ist modern und auf jüngere Founder zugeschnitten.",
  "bunq-business": "Bunq ist eine niederländische Neobank mit eigener Banklizenz (DNB), gegründet 2012. Das Business-Konto bietet Multi-IBAN, Sub-Accounts und EU-weite Akzeptanz. Stark in Benelux/Frankreich, in Deutschland Nische. Karten-Issuance schnell, Support gemischt.",

  // ============ BANKING US ============
  "mercury": "Mercury ist eine US-Bank-as-a-Service-Plattform speziell für Tech-Startups und LLCs (gegründet 2017). Das Konto ist kostenfrei, mit optionalem Treasury-Yield und sehr guter Stripe/QuickBooks-Integration. Bekannt für strikte Approval-Prozesse – Non-US-Founder ohne ITIN/SSN haben es schwer, manche Branchen werden komplett gerejectet. Bei Approval: bestes US-Banking für Software/SaaS.",
  "wise-business": "Wise (ehemals TransferWise) wurde 2011 gegründet und ist heute der weltweit größte Multi-Currency-Anbieter für KMU. Über 13 Mio Kunden, Kontoeröffnung in unter 30 Minuten möglich. Stärke sind interbank-nahe FX-Raten und IBANs in 10 Währungsräumen (US, UK, EU, AUS, CAD, etc.). Kein klassisches Sperrkonto für DE-GmbH-Stammkapital – ideal als Zweitkonto.",
  "relay": "Relay ist eine US-Banking-Plattform speziell für Profit-First/Envelope-Methodik (gegründet 2018). Bis zu 20 Sub-Konten und Rollen-Management ohne Aufpreis – Mercury bietet das nur in Pro-Tier. Free, nur USD, kein FX. Top-Wahl für Multi-Konten-Setups.",
  "brex": "Brex startete 2017 als Kreditkartenanbieter für VC-funded Startups. Bietet hohe Limits ohne Personal Guarantee, top Expense-Management und attraktive Rewards. Bootstrap-Founder werden seit 2022 nicht mehr akzeptiert – Brex hat sich klar auf funded Startups (>$100k Bank-Balance) fokussiert.",
  "novo": "Novo ist eine 2018 gestartete US-Neobank für Solo-Founder und Klein-LLCs. Komplett kostenfrei, mit Stripe/QuickBooks-Integrationen und schnellem Onboarding. Die Approval ist weniger strikt als bei Mercury – ideal für Founder die zu klein für Mercury-Standards sind.",
  "bluevine": "Bluevine bietet seit 2013 US-Geschäftskonten mit überdurchschnittlicher Verzinsung auf Checking-Balance (bis zu 2,0 % APY) und Line-of-Credit-Optionen. Free, US-Only. Approval für Non-US-Founder kompliziert.",
  "found": "Found ist eine US-Banking-App speziell für Self-Employed/1099-Worker (gegründet 2019). Eingebaute Tax-Schätzung, Expense-Tracking und Schedule-C-Vorbereitung. Free-Tier, primär für Solo-Founder optimiert.",

  // ============ VERSAND DACH ============
  "sendcloud": "Sendcloud ist eine 2012 in Eindhoven gegründete Multi-Carrier-Versandplattform und in DACH Marktführer für Online-Shops. Über 25.000 Kunden integrieren DHL, DPD, GLS, UPS, Hermes und 50+ weitere Carrier in einer Oberfläche – inklusive Retouren-Portal und Tracking-Mails. Sweet Spot bei 50–500 Paketen/Monat; ab 500+ wird ein direkter Carrier-Vertrag oft günstiger.",
  "dhl-geschaeftskunden": "DHL Paket Deutschland ist Teil der Deutsche Post DHL Group und größter Paketdienst in Deutschland mit über 1,8 Mrd Paketen pro Jahr. Geschäftskundenverträge erfordern in der Regel einen Mindestumsatz (regional unterschiedlich, meist ab ~250 €/Mon). Spürbare Rabatte gibt es ab ~500 Paketen/Monat. Stärken: dichtestes Netz, Express- und Auslandsversand, stabile API.",
  "dpd": "DPD Deutschland ist Teil der internationalen Geopost-Gruppe (La Poste) und mit über 800 Mio Sendungen jährlich der zweitgrößte DACH-Carrier. Bei mittlerem Volumen (100+ Pakete/Mon) oft günstiger als DHL. Schwächere B2C-Zustellung als DHL – Foren-Berichte über Verluste/Verzögerungen sind häufiger.",
  "gls": "GLS (General Logistics Systems) gehört zum britischen Royal-Mail-Konzern und ist EU-weit besonders stark. In Deutschland zweitwichtigster B2B-Carrier nach DHL. Die B2C-Zustellung an Privathaushalte erfordert oft mehrere Versuche.",
  "hermes": "Hermes Germany (international Evri) ist mit 405 Mio Paketen/Jahr der drittgrößte deutsche Carrier. Günstigster Anbieter bei kleinem Volumen, mit dichtem ParcelShop-Netz. Trustpilot-Bewertungen seit 2023 deutlich negativer – viele Berichte über Verluste und schwierigen Reklamations-Prozess.",
  "ups-deutschland": "UPS ist der weltgrößte Paketdienst und in DACH besonders stark im Express- und International-Geschäft. Premium-Preise, dafür beste Tracking-Updates, robuste API und globale Reichweite (220+ Länder). Für Standard-DACH-Sendungen oft teurer als DHL/DPD.",

  // ============ BUCHHALTUNG ============
  "lexoffice": "lexoffice (Haufe-Lexware) ist seit 2014 Marktführer für Cloud-Buchhaltung in Deutschland mit über 250.000 Kunden. Stärken: DATEV-Export, große Auswahl an Bank-Schnittstellen und ein riesiges Steuerberater-Ökosystem. Die meisten DE-Steuerberater arbeiten direkt in oder mit lexoffice. Mobile App und komplexere Buchungen verlangen Premium-Tarif.",
  "sevdesk": "sevDesk ist ein Offenburger Buchhaltungs-Tool, gegründet 2013, mit mehr als 100.000 Kunden in DACH. Günstigster ernsthafter DE-Anbieter, sehr gute Mobile-App und automatische Belegerkennung via OCR. DATEV-Export schwächer als bei lexoffice; bei größeren Teams summiert sich der Pro-Nutzer-Preis.",
  "candis": "Candis ist ein 2015 in Berlin gegründetes Tool für Rechnungs-Workflow und AP-Automation. KI-OCR liest Rechnungen ein, mehrstufige Genehmigungs-Ketten und Team-Rollen sind das Alleinstellungsmerkmal. Erst ab Mid-Size sinnvoll (Team ≥ 5, viele Eingangsrechnungen) – für Solo overkill.",
  "buchhaltungsbutler": "BuchhaltungsButler ist ein deutsches Tool mit Fokus auf hohe Automatisierungs-Quote bei wiederkehrenden Buchungen. DATEV-konform, fair gepreist (ab 19 €/Mon). Die UI wirkt im Vergleich zu lexoffice altbacken, aber die Buchungs-Engine ist stark.",
  "accountable": "Accountable ist ein Berliner Mobile-First-Anbieter speziell für Solo-Selbstständige und Freelancer. Stärke: integrierter Steuerberater-Service als kostenpflichtiges Add-on. Für GmbHs eingeschränkt geeignet – das Tool ist primär auf §13b/§19 UStG-Selbstständige zugeschnitten.",
  "smartsteuer": "smartsteuer (Haufe-Lexware) ist eine Steuererklärungs-Software, KEINE laufende Buchhaltung. Geführte Erstellung von Einkommensteuer-, Umsatzsteuer- und Körperschaftsteuer-Erklärungen mit Direkt-ELSTER-Übermittlung. Sinnvoller Stack: lexoffice/sevDesk (laufende Buchhaltung) + smartsteuer (Jahres-Erklärung) + ggf. Steuerberater.",

  // ============ 3PL / FULFILLMENT ============
  "byrd": "byrd ist ein 2016 in Wien gegründetes 3PL-Unternehmen mit Lagerstandorten in DE, AT, NL, FR, ES und IT. Vollintegration mit Shopify, Shopware, WooCommerce und Klaviyo. Self-Service-Dashboard für Bestände und Sendungen. Pricing-Estimate aus Foren: ~1,80–2,50 €/Pick + Storage. Wirtschaftlich ab ~200 Bestellungen/Monat.",
  "shipbob": "ShipBob ist ein US-3PL mit globalem Lager-Netzwerk (USA, Kanada, UK, EU, Australien). Top-Wahl für DE-Brands, die in den US-Markt expandieren. Ab 500+ Orders/Monat US wirtschaftlich. Setup-Zeit für SKU-Onboarding 3–6 Wochen.",
  "fromspace": "FromSpace ist ein deutsches 3PL mit Fokus auf D2C-Brands im Mid-Volume-Bereich. Persönlicher Account-Manager, kein internationales Lager-Netzwerk. Setup-Zeit 2–4 Wochen.",

  // ============ LUCID ============
  "lizenzero": "Lizenzero ist eine Tochter der Reclay Group und das günstigste DE-Lizenzierungs-Tool für die Verpackungsregistrierung (LUCID). Ideal für kleine bis mittlere Mengen ab 39 €/Jahr. Auch für Marktplatz-Verkäufer (Amazon, eBay) geeignet.",
  "reclay": "Die Reclay Group ist einer der etablierten dualen Systeme in Deutschland (seit 1990). Lizenzierung erfolgt direkt über Reclay – sinnvoller bei größeren Verpackungs-Mengen, wo individuelle Tarife besser werden als bei Lizenzero.",

  // ============ EMAIL / MARKETING ============
  "klaviyo": "Klaviyo ist die führende E-Commerce-E-Mail-Marketing-Plattform (Boston, 2012 gegründet, 2023 IPO). Beste Shopify-Integration am Markt, mit Flow-Builder, Segmentierung und Predictive-Analytics. DSGVO-konform mit EU-Pricing-Center, aber Server in den USA. Wird ab ~20.000 Subscribern teuer – darunter Standard für DTC.",
  "brevo": "Brevo (ehemals Sendinblue) ist ein französischer E-Mail-Marketing-Anbieter, gegründet 2012. EU-Server (DSGVO-konform), Free-Tier mit 300 Mails/Tag, transparente Preisstruktur. Flow-Builder schwächer als Klaviyo, dafür günstigster ernsthafter Anbieter mit deutschem Support.",
  "mailchimp": "Mailchimp ist eine 2001 gegründete US-Plattform und einer der bekanntesten E-Mail-Tools weltweit. Free-Tier bis 500 Kontakte, große Templates-Library. Für E-Commerce-Founder seit 2019 weniger attraktiv – viele migrieren zu Klaviyo (Shopify-Integration) oder Omnisend (Pricing).",
  "mailerlite": "MailerLite ist ein litauischer Anbieter (gegründet 2010) und der günstigste ernsthafte Klaviyo-Wettbewerber. Free-Tier bis 1.000 Kontakte, EU-Server (DSGVO), solider Editor. E-Commerce-Features sind schwächer ausgebaut – ideal für Bootstrap-Brands unter 50k MRR.",
  "omnisend": "Omnisend ist ein 2014 gegründeter litauischer Anbieter mit klarem E-Commerce-Fokus. SMS und E-Mail kombiniert in einer Plattform, Shopify-Integration auf Klaviyo-Niveau, aber spürbar günstiger. Reporting weniger tief als Klaviyo, dafür einfachere UX.",
  "postmark": "Postmark (ActiveCampaign-Tochter) ist auf Transaktions-E-Mails spezialisiert (Quittungen, Passwort-Resets, Notifications) – kein Marketing-Tool. Höchste Deliverability am Markt, saubere API, transparente Logs. Stack: Postmark für Transaktional + Klaviyo/Omnisend für Marketing.",
  "activecampaign": "ActiveCampaign ist ein 2003 gegründeter US-Anbieter mit Fokus auf mächtige Automation-Workflows. Eingebautes CRM, B2B-tauglich, für Coaching- und Info-Product-Brands oft erste Wahl. Lernkurve und Pricing-Sprünge bei steigender Kontaktzahl sind die Schwächen.",

  // ============ TRACKING ============
  "triple-whale": "Triple Whale wurde 2021 von DTC-Founder Maxx Blank gegründet und ist heute Standard für Shopify-Attribution bei mittelgroßen DTC-Brands. First-Party-Data-Pixel, klare Founder-Dashboards (Pixel, Sonar, Lighthouse). Pflicht ab ~50k MRR, darunter zu teuer und overkill.",
  "hyros": "Hyros ist eine 2020 gestartete Server-Side-Tracking-Plattform mit Fokus auf High-Ticket Coaching, Info-Products und Funnels. Robuster gegen Tracking-Verluste durch iOS 14+. UI-Lernkurve hoch, E-Com-Features weniger ausgebaut als Triple Whale.",
  "northbeam": "Northbeam ist ein US-Anbieter für Enterprise-Attribution mit Media-Mix-Modeling (MMM). Tiefste Daten am Markt, aber Pricing ab 1.000 $/Mon – sinnvoll erst ab ~500k MRR. Standard bei 7-figure-DTC-Brands.",
  "polar-analytics": "Polar Analytics ist ein 2020 gegründetes französisches Tool, preislich und feature-mäßig zwischen Triple Whale und Northbeam positioniert. Multi-Channel-Reporting, Shopify-First, sweet spot bei 6–7-figure DTC-Brands.",
  "rockerbox": "RockerBox ist ein US-Enterprise-Attribution-Tool mit Server-Side-Tracking und MMM. Stärke ist Cross-Channel-Attribution für B2B/Enterprise-Setups. Pricing intransparent (Demo erforderlich), Estimate ~3–6k $/Mon.",

  // ============ SHOP-SYSTEM ============
  "shopify": "Shopify ist die weltweit führende E-Commerce-Plattform (2006 gegründet, Kanada) mit über 4 Mio Shops. Größtes App-Ökosystem (8.000+ Apps), schnellster Setup, skaliert von 0 bis Mio Umsatz. Standard für DTC-Brands. Transaktionsgebühren fallen weg bei Nutzung von Shopify Payments – Lock-in beim Plattformwechsel ist real.",
  "shopware": "Shopware ist ein Schöppinger Shop-System (gegründet 2000), Open-Source-Variante (Community Edition) kostenfrei. Stärken: DE-Hosting möglich (DSGVO), starke B2B-Module, deutscher Support. App-Ökosystem kleiner als Shopify, Hosting + Wartung muss bei CE selbst gehostet werden.",
  "woocommerce": "WooCommerce ist ein WordPress-Plugin (2011 gestartet, seit 2015 Automattic) und mit 28 % weltweiter Marktanteil das größte E-Commerce-Plugin. Komplett kostenfrei (Core), maximal flexibel, größtes WordPress-Ökosystem. Performance bei wachsendem Katalog tricky – ab ~5–10k Bestellungen/Mon ist Shopify oft einfacher.",
  "bigcommerce": "BigCommerce wurde 2009 in Sydney gegründet und ist heute eine der großen Shopify-Alternativen. Keine Transaktionsgebühren, starke B2B-Module und Headless-Architektur sind die Hauptargumente. App-Ökosystem deutlich kleiner als Shopify, Sales-Caps pro Tier können beim Wachstum nerven.",
  "lightspeed": "Lightspeed (Kanada, 2005) verbindet POS und Online-Shop in einer Plattform – primär für Retailer mit Filialen plus Online-Verkauf. EU-Standort (Niederlande), DSGVO-freundlich. Teurer Einstieg, App-Ökosystem klein, dafür stark integriert wenn POS-Bedarf besteht.",

  // ============ DOMAINS ============
  "cloudflare-registrar": "Cloudflare Registrar ist seit 2018 verfügbar und verkauft Domains zum Wholesale-Preis (at-cost) ohne Markup. Eingebaut: Cloudflare-DNS und Security-Layer. Voraussetzung: Domain muss zu Cloudflare migriert werden. Keine .de-TLD verfügbar – für .com/.io/.app der mit Abstand günstigste seriöse Registrar.",
  "namecheap": "Namecheap ist ein 2000 gegründeter US-Registrar und einer der größten weltweit. Faire Preise, kostenlose WHOIS-Privacy, solider Support. Standard-Wahl für .com-Domains. Keine .de-TLD verfügbar.",
  "ionos": "IONOS (vormals 1&1) ist Marktführer in Deutschland für Domain + Hosting Bundles. Erste-Domain-Promos sind günstig, Auto-Renewal-Preise sind dann deutlich teurer als beim Registrar. Up-Sell beim Checkout aggressiv. Sinnvoll wenn man Hosting + .de-Domain in einem Paket will.",
  "all-inkl": "ALL-INKL.COM ist ein Webhosting-Anbieter aus Friedersdorf (gegründet 2001) und in DE-Web-Foren ein Geheimtipp. Top-Support, faire Preise ohne Versteck-Aufschläge, .de und .com im Hosting-Paket. Eher Hosting-fokussiert (nicht Domain-pur).",
  "inwx": "INWX ist ein Berliner Domain-Registrar (gegründet 2007) mit Fokus auf Profis und Tech-affine User. Faire Preise auch bei Renewal, sehr gute API für Bulk-Management. Server in der EU. UI minimalistisch – nicht für Anfänger optimiert.",
  "porkbun": "Porkbun ist ein 2014 gegründeter US-Registrar mit konstanten Preisen (auch bei Renewal), kostenloser WHOIS-Privacy und sauberer UI. Keine .de-TLD verfügbar. Beliebt bei Indie-Devs für seine einfache Tech-affine UX.",

  // ============ WORKSPACE / EMAIL-DOMAIN ============
  "google-workspace": "Google Workspace (ehemals G Suite) ist seit 2006 verfügbar und Standard für Email + Drive + Meet bei DTC-Brands weltweit. Beste Email-Deliverability für Custom-Domain, tight Integration mit allen großen SaaS-Tools, skaliert von 1 bis 1.000+ User. CLOUD-Act-Risiko bei sensiblen Daten ist die einzige relevante DSGVO-Schwäche.",
  "microsoft-365-business": "Microsoft 365 Business ist die Office + Email + Teams-Suite und Standard im Corporate-Kontext. EU-Datacenter-Option für DSGVO-Compliance verfügbar. Email-Spam-Filter aggressiv (Mails landen oft im Junk). UX-mäßig komplexer als Google Workspace, dafür beste Office-Apps.",
  "mailbox-org": "mailbox.org ist ein deutscher Email-Anbieter aus Berlin (gegründet 2014) mit strikter DSGVO/ePrivacy-Compliance und 100 % DE-Servern. Custom-Domain ab 1 €/Mon. Kein Office-Suite eingebaut. Ideal für DE-Brands mit hoher Datenschutz-Sensibilität.",
  "proton-business": "Proton Business ist die Geschäftsversion des Schweizer Privacy-Anbieters Proton (2014, gegründet von CERN-Forschern). End-to-End-Encryption Standard, EU/CH-Server, eingebauter VPN/Drive/Calendar. E2E nur unter Proton-Usern, API limitiert. Top für Privacy-Brands.",
  "fastmail": "Fastmail ist ein australischer Email-Anbieter (gegründet 1999) mit Premium-UX und sehr guter Deliverability. Mehrere Custom-Domains pro Account. Kein Office-Suite. Datenschutz solide, aber AU außerhalb der EU.",

  // ============ HAFTPFLICHTVERSICHERUNG ============
  "hiscox": "Hiscox ist ein 1901 in London gegründeter Spezialversicherer, der seit 1996 in Deutschland aktiv ist. Fokus auf KMU, Selbstständige und Tech/IT-Branchen. Bekannt für die schnellste Schadenregulierung am Markt und Cyber-Module. Premium-Positionierung, dafür Top-Service und sehr hohe Deckungssummen möglich (bis 10 Mio €).",
  "exali": "exali ist ein 2001 in Augsburg gegründeter Online-Versicherer-Marktplatz und der wahrscheinlich bekannteste Anbieter für Berufshaftpflicht für Freelancer in Deutschland. Komplett online, modulare Tarife, faire Preise. Standard-Empfehlung für IT-Freiberufler, Berater, Coaches und Kreative.",
  "mailo": "mailo ist ein 2018 als Joint Venture mehrerer Versicherer (R+V, BGV, GVO) gegründeter Online-KMU-Spezialist. Fokus auf Klein- und Mittelständler 1–250 Mitarbeiter. Bietet Bündel-Tarife (Haftpflicht + Inhalt + Cyber) zu fairen Online-Preisen.",
  "andsafe": "Andsafe ist die Online-Marke der LVM Versicherung (gegründet 2017) und einer der günstigsten Berufshaftpflicht-Anbieter in Deutschland. Einfache Online-Antragsstrecke, schnelle Police. Ideal für simple Solo-Selbstständigkeit ohne komplexe Risiken.",
  "adam-riese": "Adam Riese ist die digitale Versicherungs-Marke der Württembergische Versicherung (W&W Gruppe, gegründet 2017). Bietet vollständig digitale Versicherungen für Selbstständige und KMU mit fairen Tarifen und sauberer UX. Solider Newcomer-Brand mit etabliertem Großversicherer im Hintergrund.",
  "allianz-business": "Die Allianz SE ist mit über 156 Mio Kunden weltweit der größte Versicherungskonzern Europas (gegründet 1890). Als deutscher Marktführer bietet sie über ein dichtes Vertretungs-Netz alle Sparten gewerblicher Versicherungen. Klassische Wahl für KMU mit Wunsch nach lokalem Ansprechpartner.",
  "axa-business": "Die AXA Konzern AG ist die deutsche Tochter des französischen AXA-Konzerns (1817 gegründet). Bietet alle Sparten gewerblicher Versicherung inkl. Cyber-Versicherung, mit Maklernetz und Direkt-Vertrieb.",
  "hdi-business": "Die HDI Versicherung AG ist die Industrieversicherer-Tochter der Talanx-Gruppe (Hannover, gegründet 1903). Spezialisiert auf KMU und Industriekunden mit branchenspezifischen Tarifen. Stark im klassischen Mittelstand und für freie Berufe.",
  "thinksurance": "thinksurance ist eine 2014 in Frankfurt gegründete digitale Vergleichsplattform für gewerbliche Versicherungen und kostenlose Maklerdienste. Vergleicht in einer einzigen Anfrage Angebote aller großen DE-Versicherer. Stark bei komplexeren Risiken wie Cyber, D&O und Vermögensschaden, wo direkter Vergleich schwierig ist.",
  "vov": "Die VOV Versicherung ist ein Spezialversicherer für Vermögensschadenhaftpflicht, gegründet 1942 als Versicherungsverein des Verbands Beratender Architekten. Pflicht-Police für Steuerberater, Anwälte, Architekten, Ingenieure und ähnliche freiberufliche Tätigkeiten. Tiefe Branchen-Expertise, faire Konditionen für Solo-Berater.",

  // ============ RECHTSSCHUTZ ============
  "roland-rechtsschutz": "Die Roland Rechtsschutz-Versicherungs-AG ist ein 1962 gegründeter Spezialversicherer und einer der größten Anbieter für Geschäftskunden in Deutschland. Bietet sehr breite Tarifauswahl mit gewerblichem Rechtsschutz, Online-Rechtsberatung und Forderungsmanagement.",
  "arag": "Die ARAG SE ist mit über 4 Mio Versicherten der größte spezialisierte Rechtsschutzversicherer in Deutschland (gegründet 1935 in Düsseldorf). Bekannt für sehr breites Tarif-Portfolio inkl. Spezial-Bausteinen wie Cyber-Rechtsschutz und Online-Reputations-Schutz. Premium-positioniert.",
  "das-rechtsschutz": "Die D.A.S. Deutscher Automobil Schutz Allgemeine Rechtsschutz-Versicherungs-AG (1928 gegründet) ist Tochter der ERGO Group. Bietet alle gängigen gewerblichen Rechtsschutz-Tarife mit ERGO-Konzern-Stärke im Hintergrund.",
  "advocard": "Die Advocard Rechtsschutzversicherung AG ist Teil der R+V Versicherung (genossenschaftliches Versicherungswesen). Faire Tarife im Mittelfeld, mit JurOnline-Beratung inklusive. Solide Wahl mit transparenter Konditions-Struktur.",
  "deurag": "Die DEURAG Deutsche Rechtsschutz-Versicherung AG (1959 gegründet) ist ein mittelständischer Spezialversicherer aus Wiesbaden. Faire Tarife besonders für Solo-Selbstständige und Klein-GmbHs, mit Schwerpunkt auf Berufs- und Verkehrs-Rechtsschutz.",
  "hdi-rechtsschutz": "HDI bietet als Talanx-Tochter auch Rechtsschutz-Versicherungen, die sich besonders dann lohnen, wenn man bereits andere HDI-Sparten (z. B. Haftpflicht oder Berufshaftpflicht) abgeschlossen hat – durch Bundle-Discount.",

  // ============ GESCHÄFTSFAHRZEUG ============
  "sixt-leasing": "Sixt Leasing wurde 1988 als Tochter der Sixt SE gegründet und ist heute einer der größten markenübergreifenden Leasing-Anbieter in Deutschland. Über 200.000 Fahrzeuge im Bestand, alle gängigen Hersteller verfügbar. Besonders stark im KMU-Markt mit Online-Konfigurator und schnellen Angeboten.",
  "ald-automotive": "ALD Automotive (seit 2023 unter dem Namen Ayvens, gehört zur Société Générale) ist der größte Flottenanbieter Europas mit ~1,7 Mio Fahrzeugen weltweit. Full-Service-Leasing inkl. Wartung, Versicherung und Reifen ist Standard. Optimal ab 3+ Fahrzeugen, weniger Self-Service-Optionen.",
  "vw-financial-services": "Die Volkswagen Financial Services AG ist die Finanzdienstleistungs-Tochter des VW-Konzerns und finanziert/least Fahrzeuge der Marken VW, Audi, Skoda, Seat und Cupra. Beste Konditionen für Konzernfahrzeuge direkt vom Hersteller, mit häufigen Aktionsraten. Marken-Lock-in beachten.",
  "mercedes-benz-bank": "Die Mercedes-Benz Bank ist die Finanzdienstleistungs-Tochter der Mercedes-Benz Group und bietet Leasing/Finanzierung exklusiv für Mercedes-Benz und smart. Premium-positioniert, mit soliden Restwert-Garantien und stabilen B2B-Konditionen.",
  "bmw-financial-services": "BMW Financial Services ist die Finanzdienstleistungs-Tochter der BMW Group und vermarktet Leasing für BMW und MINI. Beste Konditionen für die BMW-Konzern-Marken direkt vom Hersteller, regelmäßige Aktionsangebote für B2B-Kunden.",
  "vehiculum": "Vehiculum ist ein 2015 in Berlin gegründeter Online-Marktplatz für Auto-Leasing. Vergleicht Tausende Leasing-Angebote markenübergreifend und ist der schnellste Weg zu einem Online-Leasing-Vertrag. Aktionsraten oft günstiger als beim Direkt-Hersteller, dafür weniger persönliche Beratung.",
  "leaseplan": "LeasePlan wurde 1963 in den Niederlanden gegründet und ist 2023 mit ALD Automotive zu Ayvens fusioniert. Flotten-Anbieter mit globalem Netzwerk in 40+ Ländern. Stark bei Großflotten und international agierenden Mittelständlern.",
  "finn": "FINN wurde 2019 in München gegründet und ist Marktführer für Auto-Abos in Deutschland. Modell: 1–24 Monate Laufzeit, alles inklusive (Versicherung, Steuer, Wartung). Effektiv teurer als klassisches Leasing bei langfristiger Nutzung, dafür maximale Flexibilität ohne Restwert-Risiko.",

  // ============ FULFILLMENT ============
  "bezahlt-fulfillment": "BEZAHLT FULFILLMENT ist ein DE-3PL mit klarem Fokus auf D2C/E-Commerce-Brands. Persönlicher Account-Manager, mittelgroße SKU-Volumina. Pricing-Estimate aus Foren: ~1,80–2,80 €/Pick + Storage. Onboarding 3–4 Wochen für SKU-Setup.",
  "warehousing1": "Warehousing1 ist ein 2019 in Berlin gegründeter Marketplace, der mehrere 3PL-Lager in DE/EU vergleicht und passende Anbieter zu Brands matched. Schnelle Match-Time, aber Brand wählt das konkrete Lager nicht selbst – Trade-off zwischen Bequemlichkeit und Kontrolle.",
  "logward": "Logward ist ein EU-3PL mit flexiblen Verträgen und Multi-Lager-Setup. Eher gehobenes Volumen, weniger Self-Service als byrd. Setup 2–3 Wochen.",
};

/** Coop-Deal nur anzeigen wenn nicht abgelaufen (expires ≥ heute). */
export const isCoopActive = (coop: Provider["coop"]): boolean => {
  if (!coop) return false;
  if (!coop.expires) return false; // Pflicht: ohne Ablaufdatum nicht zeigen
  return new Date(coop.expires) >= new Date(new Date().toISOString().slice(0, 10));
};

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
    forumNotes: "r/Finanzen + Mittelstand-Foren 2026: 'Postbank ist die Bargeld-Bank schlechthin. Aktion bis Ende 2026 mit 0 € Grundpreis macht den Einstieg attraktiv, aber pro-Buchung-Modell wird bei Active Bookern teuer.'",
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
    forumNotes: "r/Selbststaendig 2026: 'Fyrst ist die unterschätzte Bridge zwischen Hausbank-Stabilität und Online-Komfort. Trustpilot ~2,8/5 leidet unter Postbank-Privatkunden-Reviews, aber das Business-Konto funktioniert solide.'",
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

  // ============ HAFTPFLICHTVERSICHERUNG (Berufs- / Betriebs- / Vermögensschaden) ============
  {
    slug: "hiscox",
    name: "Hiscox",
    category: "Haftpflichtversicherung",
    region: "DE/EU",
    starting: "ab ~190 €/Jahr (IT-Solo)",
    rating: 4.5,
    tagline: "Premium für IT/Tech-Freelancer & Agenturen",
    pros: ["Tech-/IT-Spezialist (Code, Beratung, Datenpannen)", "Schnelle Online-Antragsstrecke + sofortige Police", "Cyber-Module integrierbar", "Top-Schadenregulierung"],
    cons: ["Nicht der günstigste Anbieter", "Eher Premium-Positionierung"],
    forumNotes: "r/Selbststaendig + DTC-Slack: 'Standard für IT-Freelancer und Online-Agenturen. Schadenregulierung gilt als beste am Markt.'",
    signupTime: "1 Tag (Online-Abschluss möglich)",
    url: "https://www.hiscox.de",
  },
  {
    slug: "exali",
    name: "exali",
    category: "Haftpflichtversicherung",
    region: "DE",
    starting: "ab ~150 €/Jahr (Solo-Freelancer)",
    rating: 4.4,
    tagline: "Online-Klassiker für Freelancer & Selbstständige",
    pros: ["Komplett online, modulare Tarife", "Ruhigster Online-Antrag in DE", "IT/Beratung/Coaching/Marketing-Spezialist", "Faire Preise"],
    cons: ["Nicht für sehr individuelle Risiken", "Weniger persönliche Beratung als bei Maklern"],
    forumNotes: "r/Selbststaendig: 'Wer als Freelancer eine Berufshaftpflicht braucht: exali ist Standard – schnell, online, verständlich.'",
    signupTime: "Sofort (Online-Police)",
    url: "https://www.exali.de",
  },
  {
    slug: "mailo",
    name: "mailo",
    category: "Haftpflichtversicherung",
    region: "DE",
    starting: "ab ~199 €/Jahr (Solo-Selbstständig)",
    rating: 4.2,
    tagline: "Online-Spezialist für KMU & Selbstständige",
    pros: ["KMU-fokussiert (1–250 Mitarbeiter)", "Bündel-Tarife (Haftpflicht + Inhalt + Cyber)", "Online-Police, schnelle Bearbeitung"],
    cons: ["Jüngere Marke, weniger Schadens-History online", "Branchen-Portfolio kleiner als Hiscox"],
    forumNotes: "Mittelstand-Foren: 'Junges Insurtech mit fairen Tarifen. Bei klassischem Mittelstand funktioniert's gut.'",
    signupTime: "Sofort online",
    url: "https://www.mailo.de",
  },
  {
    slug: "andsafe",
    name: "Andsafe (LVM)",
    category: "Haftpflichtversicherung",
    region: "DE",
    starting: "ab ~99 €/Jahr (Solo Basic)",
    rating: 4.3,
    tagline: "Günstigste Online-Berufshaftpflicht",
    pros: ["Sehr günstig (oft günstigster Anbieter)", "Einfache Antragsstrecke", "Hinter LVM-Versicherung (solide Bilanz)"],
    cons: ["Begrenztes Branchen-Portfolio", "Nicht für komplexe Risiken / Hochrisiko-Branchen"],
    forumNotes: "r/Finanzen + r/Selbststaendig: 'Wer einfach nur eine günstige Pflicht-Police braucht: Andsafe nehmen, fertig.'",
    signupTime: "Sofort online",
    url: "https://www.andsafe.de",
  },
  {
    slug: "adam-riese",
    name: "Adam Riese",
    category: "Haftpflichtversicherung",
    region: "DE",
    starting: "ab ~140 €/Jahr",
    rating: 4.1,
    tagline: "Online-Versicherer der W&W Gruppe",
    pros: ["W&W Gruppe (solide Großversicherung im Hintergrund)", "Saubere Online-UX", "Faire Tarife"],
    cons: ["Newcomer-Brand, weniger bekannt"],
    signupTime: "Sofort online",
    url: "https://www.adam-riese.de",
  },
  {
    slug: "allianz-business",
    name: "Allianz Geschäftskunden",
    category: "Haftpflichtversicherung",
    region: "DE/EU/global",
    starting: "auf Anfrage",
    rating: 3.9,
    tagline: "Größter Versicherer DE, klassische Maklerschiene",
    pros: ["Größter Versicherer DE / weltweit", "Persönliche Beratung über Vertretungen", "Sehr breite Branchen-Abdeckung", "Integrierte Bündel mit anderen Sparten"],
    cons: ["Pricing nur auf Anfrage", "Nicht Online-First, langsamer Abschluss", "Tendenziell teurer als Direktversicherer"],
    forumNotes: "r/Versicherungen: 'Klassische Wahl wenn man einen lokalen Vertreter will. Online-User wechseln meist zu Hiscox/exali.'",
    signupTime: "1–3 Wochen (Vertretung-Termin)",
    url: "https://www.allianz.de/firmen/",
  },
  {
    slug: "axa-business",
    name: "AXA Geschäftskunden",
    category: "Haftpflichtversicherung",
    region: "DE/EU",
    starting: "auf Anfrage",
    rating: 3.8,
    tagline: "Großversicherer mit Cyber- und Bündel-Tarifen",
    pros: ["Breit aufgestellt (Haftpflicht, Sach, Cyber, Rechtsschutz)", "Cyber-Versicherung integriert", "Maklernetz"],
    cons: ["Pricing nur auf Anfrage", "Service-Erfahrungen gemischt"],
    signupTime: "1–3 Wochen",
    url: "https://www.axa.de/unternehmen",
  },
  {
    slug: "hdi-business",
    name: "HDI Geschäftskunden",
    category: "Haftpflichtversicherung",
    region: "DE/EU",
    starting: "auf Anfrage",
    rating: 4.0,
    tagline: "Talanx-Tochter, KMU-Spezialist",
    pros: ["Solide für klassischen Mittelstand", "Branchenspezifische Tarife (Handel, Produktion, Beratung)", "Gute Berufshaftpflicht für freie Berufe"],
    cons: ["Pricing-Verhandlung erforderlich", "Online-Abschluss nur eingeschränkt"],
    signupTime: "1–2 Wochen",
    url: "https://www.hdi.de/firmen",
  },
  {
    slug: "thinksurance",
    name: "thinksurance",
    category: "Haftpflichtversicherung",
    region: "DE",
    starting: "kostenlos (Vermittlung)",
    rating: 4.5,
    tagline: "Vergleichsplattform für gewerbliche Versicherungen",
    pros: ["Vergleicht alle großen DE-B2B-Versicherer in einer Anfrage", "Kostenlose Makler-Beratung", "Stark bei komplexen Risiken (Cyber, D&O, Vermögensschaden)"],
    cons: ["Vermittlung, kein direkter Versicherer", "Best für mittelgroße Risiken (>500 €/Jahr Police)"],
    forumNotes: "B2B-Founder-Slack: 'Bei komplizierten Risiken (Tech, SaaS, Beratung) immer thinksurance einbinden – die haben Zugang zu allen Tarifen.'",
    signupTime: "Beratung 1–3 Tage, Police 1–2 Wochen",
    url: "https://www.thinksurance.de",
  },
  {
    slug: "vov",
    name: "VOV Versicherung",
    category: "Haftpflichtversicherung",
    region: "DE",
    starting: "auf Anfrage (~600 €+/Jahr)",
    rating: 4.2,
    tagline: "Spezialist für Vermögensschadenhaftpflicht (StB, Anwälte, Architekten)",
    pros: ["VSH-Spezialist mit tiefer Branchenexpertise", "Pflichtpolice für StB/RAe/Architekten/Ingenieure", "Faire Konditionen für Solo-Berater"],
    cons: ["Nur VSH (nicht Betriebshaftpflicht)", "Nicht für nicht-regulierte Branchen"],
    signupTime: "1–2 Wochen",
    url: "https://www.vov.de",
  },

  // ============ RECHTSSCHUTZVERSICHERUNG (gewerblich) ============
  {
    slug: "roland-rechtsschutz",
    name: "Roland Rechtsschutz",
    category: "Rechtsschutz",
    region: "DE",
    starting: "ab ~280 €/Jahr (Solo)",
    rating: 4.2,
    tagline: "Klassiker für Geschäfts-Rechtsschutz",
    pros: ["Sehr breite Tarifauswahl (gewerblich + privat kombinierbar)", "Online-Rechtsberatung inklusive", "Stark bei Vertragsstreitigkeiten + Forderungsmanagement"],
    cons: ["Wartezeit 3 Monate bei Vertragsbeginn (für Aktivverfahren)", "Pricing für KMU teils intransparent"],
    forumNotes: "r/Selbststaendig: 'Roland ist Standard. Wartezeit beachten – nicht erst dann abschließen, wenn du den Streit schon hast.'",
    signupTime: "1 Woche, danach 3 Monate Wartezeit",
    url: "https://www.roland-rechtsschutz.de",
  },
  {
    slug: "arag",
    name: "ARAG Rechtsschutz",
    category: "Rechtsschutz",
    region: "DE",
    starting: "ab ~310 €/Jahr",
    rating: 4.3,
    tagline: "Größter Rechtsschutz-Spezialversicherer DE",
    pros: ["Größter spezialisierter Rechtsschutz-Versicherer DE", "ARAG-Anwaltshotline + JuraPortal", "Zusatzbausteine wie Cyber-Rechtsschutz, Online-Reputations-Schutz"],
    cons: ["Premium-Pricing", "Wartezeit bei Vertragsbeginn üblich"],
    forumNotes: "r/Versicherungen: 'ARAG hat den besten Service, ist aber 10–20 % teurer als Roland/Advocard.'",
    signupTime: "1 Woche + 3 Monate Wartezeit",
    url: "https://www.arag.de/gewerbe-rechtsschutz/",
  },
  {
    slug: "das-rechtsschutz",
    name: "DAS Rechtsschutz (ERGO)",
    category: "Rechtsschutz",
    region: "DE",
    starting: "ab ~290 €/Jahr",
    rating: 4.0,
    tagline: "ERGO-Tochter, breit aufgestellt",
    pros: ["ERGO-Konzern (finanziell stark)", "Gute Tarifauswahl", "Auch Bündel mit anderen ERGO-Versicherungen"],
    cons: ["Online-Abschluss eingeschränkt", "Service-Erfahrungen gemischt"],
    signupTime: "1–2 Wochen",
    url: "https://www.das.de/de/gewerbekunden/",
  },
  {
    slug: "advocard",
    name: "Advocard (R+V)",
    category: "Rechtsschutz",
    region: "DE",
    starting: "ab ~270 €/Jahr",
    rating: 4.0,
    tagline: "R+V-Tochter, gute Preis-Leistung",
    pros: ["Genossenschaftlich (R+V Versicherung)", "Faire Tarife im Mittelfeld", "JurOnline-Beratung inklusive"],
    cons: ["UI/Online-UX altbacken"],
    signupTime: "1–2 Wochen",
    url: "https://www.advocard.de",
  },
  {
    slug: "deurag",
    name: "DEURAG",
    category: "Rechtsschutz",
    region: "DE",
    starting: "ab ~250 €/Jahr",
    rating: 3.9,
    tagline: "Mittelständischer Rechtsschutz-Spezialist",
    pros: ["Ruhrgebiets-traditionell, faire Konditionen", "Gute Tarife für Solo-Selbstständige"],
    cons: ["Kleiner als Roland/ARAG", "Online-First fehlt"],
    signupTime: "1–2 Wochen",
    url: "https://www.deurag.de",
  },
  {
    slug: "hdi-rechtsschutz",
    name: "HDI Rechtsschutz",
    category: "Rechtsschutz",
    region: "DE",
    starting: "auf Anfrage",
    rating: 3.8,
    tagline: "Talanx-Tochter, Bundle mit HDI-Haftpflicht möglich",
    pros: ["Bundle-Discount mit anderen HDI-Sparten", "Stark wenn HDI eh schon dein Versicherer ist"],
    cons: ["Pricing-Verhandlung erforderlich", "Online-Abschluss limitiert"],
    signupTime: "1–2 Wochen",
    url: "https://www.hdi.de/privat/produkte/rechtsschutz",
  },

  // ============ GESCHÄFTSFAHRZEUG (Leasing / Auto-Abo) ============
  {
    slug: "sixt-leasing",
    name: "Sixt Leasing",
    category: "Geschäftsfahrzeug",
    region: "DE/EU",
    starting: "ab ~290 €/Mon (netto)",
    rating: 4.3,
    tagline: "Flexibles Leasing für KMU, alle Marken",
    pros: ["Marken-übergreifend (VW, BMW, Audi, Mercedes, Volvo, ...)", "Online-Konfigurator + schnelle Angebote", "Bekannte Marke, hohe Zuverlässigkeit"],
    cons: ["Vertragsbindung 24–48 Monate", "Kilometerlimit überschritten = Aufpreis"],
    forumNotes: "r/Steuern + Mittelstands-Foren: 'Solider Standard. Bei Verhandlung mit Sixt-AccountManager oft 5–10 % Discount drin.'",
    signupTime: "1–2 Wochen Vertrag + 4–8 Wochen Lieferzeit",
    url: "https://www.sixtleasing.de",
  },
  {
    slug: "ald-automotive",
    name: "ALD Automotive (Ayvens)",
    category: "Geschäftsfahrzeug",
    region: "DE/EU",
    starting: "auf Anfrage",
    rating: 4.1,
    tagline: "Société-Générale-Tochter, Flotten-Standard",
    pros: ["Größter Flottenanbieter EU-weit", "Full-Service-Leasing (Wartung, Versicherung, Reifen inkl.)", "Solide Business-Konditionen"],
    cons: ["Pricing nur auf Anfrage", "Eher für ≥3 Fahrzeuge optimiert"],
    forumNotes: "Estimate Foren: ähnliche Raten wie Sixt, ALD bei Full-Service oft günstiger.",
    signupTime: "2–3 Wochen Vertrag + 4–10 Wochen Lieferzeit",
    url: "https://www.aldautomotive.de",
  },
  {
    slug: "vw-financial-services",
    name: "Volkswagen Financial Services",
    category: "Geschäftsfahrzeug",
    region: "DE/EU",
    starting: "ab ~250 €/Mon (netto, je Modell)",
    rating: 4.2,
    tagline: "VW-Konzern-Leasing für VW/Audi/Skoda/Seat",
    pros: ["Beste Konditionen für VW-Konzern-Marken", "Direkt beim Hersteller", "Häufige Aktionsraten"],
    cons: ["Nur VW-Konzern (keine Mercedes/BMW/Volvo)", "Marken-Lock-in"],
    signupTime: "1–2 Wochen Vertrag + 4–12 Wochen Lieferzeit",
    url: "https://www.vwfs.de",
  },
  {
    slug: "mercedes-benz-bank",
    name: "Mercedes-Benz Bank",
    category: "Geschäftsfahrzeug",
    region: "DE/EU",
    starting: "auf Anfrage",
    rating: 4.0,
    tagline: "Premium-Leasing für Mercedes & smart",
    pros: ["Direkt beim Hersteller", "Solide Restwert-Garantien"],
    cons: ["Nur Mercedes/smart", "Pricing eher Premium"],
    signupTime: "1–2 Wochen + Lieferzeit",
    url: "https://www.mercedes-benz-bank.de",
  },
  {
    slug: "bmw-financial-services",
    name: "BMW Financial Services",
    category: "Geschäftsfahrzeug",
    region: "DE/EU",
    starting: "auf Anfrage",
    rating: 4.0,
    tagline: "BMW & MINI Leasing direkt vom Hersteller",
    pros: ["Beste Konditionen für BMW/MINI", "Premium-Beratung"],
    cons: ["Nur BMW/MINI", "Aktionsangebote zeitlich begrenzt"],
    signupTime: "1–2 Wochen + 8–14 Wochen Lieferzeit",
    url: "https://www.bmw.de/de/topics/services/business-driver.html",
  },
  {
    slug: "vehiculum",
    name: "Vehiculum",
    category: "Geschäftsfahrzeug",
    region: "DE",
    starting: "ab ~199 €/Mon (netto, je Modell)",
    rating: 4.4,
    tagline: "Online-Leasing-Marktplatz, alle Marken",
    pros: ["Größter Online-Vergleich für Leasing-Angebote DE", "Marken-übergreifend", "Schneller Vertragsabschluss"],
    cons: ["Vermittlung, kein direkter Anbieter", "Verhandlung schwieriger"],
    forumNotes: "Geheimtipp in DTC-Slack: 'Schnellster Weg zu einem Leasing-Angebot. Aktionen oft günstiger als Direkt-Hersteller.'",
    signupTime: "1 Woche Vertrag + 4–12 Wochen Lieferzeit",
    url: "https://www.vehiculum.de",
  },
  {
    slug: "leaseplan",
    name: "LeasePlan (jetzt Ayvens)",
    category: "Geschäftsfahrzeug",
    region: "DE/EU/global",
    starting: "auf Anfrage",
    rating: 3.9,
    tagline: "Internationaler Flotten-Anbieter",
    pros: ["Globales Netzwerk (40+ Länder)", "Stark bei Großflotten"],
    cons: ["Pricing intransparent", "2023 mit ALD zu Ayvens fusioniert"],
    signupTime: "2–3 Wochen + Lieferzeit",
    url: "https://www.leaseplan.com/de-de/",
  },
  {
    slug: "finn",
    name: "FINN (Auto-Abo)",
    category: "Geschäftsfahrzeug",
    region: "DE",
    starting: "ab ~399 €/Mon (netto, alles inkl.)",
    rating: 4.5,
    tagline: "Auto-Abo statt Leasing – flexibler",
    pros: ["1–24 Monate Laufzeit, monatlich kündbar (24-Mon-Tarif)", "Versicherung + Steuer + Wartung inkl.", "Online-Bestellung in 5 Minuten"],
    cons: ["Effektiv teurer als Leasing bei langer Nutzung", "Auswahl begrenzter als bei klassischem Leasing"],
    forumNotes: "Junge GmbHs auf Twitter: 'Perfekt für die ersten 12 Monate – kein Commitment, keine Restwert-Diskussion.'",
    signupTime: "Sofort online + 1–4 Wochen Lieferzeit",
    url: "https://www.finn.com/de-DE",
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
      title="Die besten Tools für deine Gründung"
      subtitle="Top-Anbieter pro Kategorie – mit Stärken/Schwächen aus Reddit & E-Com-Foren. Aktive Aktionen werden wöchentlich aktualisiert."
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
    {/* Header: Kategorie · Name · Rating */}
    <div className="flex items-start justify-between mb-2 gap-3">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-accent-blue truncate">{p.category}</div>
        <h3 className="font-bold text-lg leading-tight truncate">{p.name}</h3>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold shrink-0 rounded-md bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 px-2 py-0.5">
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        {p.rating.toFixed(1)}
      </div>
    </div>

    {/* Tagline – fixed 2 lines */}
    <p className="text-sm text-muted-foreground leading-snug mb-4 line-clamp-2 min-h-[2.5rem]">{p.tagline}</p>

    {/* Pros / Cons als eigene Boxen mit fixer Höhe */}
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="rounded-lg border border-success/20 bg-success/5 p-2.5 min-h-[6.5rem]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-success mb-1.5">Stärken</div>
        <ul className="space-y-1 text-[11px] leading-snug text-foreground/80">
          {p.pros.slice(0, 3).map((s, i) => (
            <li key={i} className="line-clamp-2">+ {s}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-2.5 min-h-[6.5rem]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1.5">Schwächen</div>
        <ul className="space-y-1 text-[11px] leading-snug text-foreground/80">
          {p.cons.slice(0, 3).map((s, i) => (
            <li key={i} className="line-clamp-2">– {s}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* Footer-Zeile: Region · Preis · Setup */}
    <div className="flex items-center justify-between gap-2 text-xs mb-3 border-t border-border pt-3">
      <span className="text-muted-foreground truncate">{p.region}</span>
      <span className="font-semibold text-foreground shrink-0">{p.starting}</span>
    </div>

    {/* Tags – nur wenn vorhanden, einheitlich */}
    {(p.signupTime || p.monthlyMin) && (
      <div className="flex flex-wrap gap-1.5 text-[10px] mb-3">
        {p.signupTime && (
          <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 inline-flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" />{p.signupTime}
          </span>
        )}
        {p.monthlyMin && (
          <span className="rounded-full bg-warning/10 text-warning-foreground border border-warning/30 px-2 py-0.5 inline-flex items-center gap-1">
            <AlertCircle className="h-2.5 w-2.5" />Min-Umsatz
          </span>
        )}
      </div>
    )}

    {/* Aktiver Deal (kompakt) */}
    {isCoopActive(p.coop) && p.coop && (
      <div className="rounded-lg bg-accent-blue/10 border border-accent-blue/30 text-foreground p-2 text-[11px] font-medium mb-3 flex items-start gap-1.5">
        <Tag className="h-3 w-3 mt-0.5 shrink-0 text-accent-blue" />
        <span className="line-clamp-2">{p.coop.text}{p.coop.code ? ` · ${p.coop.code}` : ""}</span>
      </div>
    )}

    {/* CTA */}
    <div className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-blue">
      Details ansehen <ExternalLink className="h-3 w-3" />
    </div>
  </Link>
);

export default Anbieter;
