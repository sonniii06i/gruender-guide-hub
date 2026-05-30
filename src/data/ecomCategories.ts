// E-Com Brand-Roadmap: Compliance + Standard-Setup pro Produkt-Kategorie.
// Stand 2026 — keine Rechtsberatung, nur Orientierung. Pflicht-Texte, Schwellen
// und Behörden-Links sollten vor Launch durch StB / Anwalt verifiziert werden.

export type ComplianceItem = {
  pflicht: string;
  details: string;
  behoerde?: string;
  link?: string;
  /** Geschätzte Setup-Kosten DE (€) */
  kostenDe?: string;
  /** Tool-Verlinkung im Hub. */
  tool?: { label: string; route: string };
};

export type CategoryRoadmap = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  /** Schwellen für Marktteilnahme. */
  marktEinstieg: string;
  /** Wettbewerbs-Niveau. */
  wettbewerb: "niedrig" | "mittel" | "hoch" | "extrem";
  /** Plattform-Beschränkungen (Amazon-Restricted etc.). */
  plattformen: string;
  // === DE-Compliance ===
  deCompliance: ComplianceItem[];
  // === EU-Compliance (zusätzlich zu DE) ===
  euCompliance: ComplianceItem[];
  // === US-Compliance (für Brand-Export) ===
  usCompliance: ComplianceItem[];
  // === Standard-Stack (Best-Practice-Setup) ===
  standardStack: { schritt: string; beschreibung: string; tool?: { label: string; route: string } }[];
  // === Stolperfallen ===
  stolperfallen: string[];
};

export const CATEGORIES_ROADMAP: CategoryRoadmap[] = [
  {
    slug: "beauty",
    name: "Beauty / Cosmetics",
    emoji: "💄",
    blurb:
      "Hautpflege, Make-up, Düfte, Haarpflege. Kosmetik-Recht ist in DE/EU streng formalisiert (CPNP, Sicherheits-Bewertung, GMP), aber komplett selbstständig machbar ohne Apotheken-Pflicht.",
    marktEinstieg: "5-15k € (Sample-Produktion + CPNP + Verpackung + Fotos)",
    wettbewerb: "extrem",
    plattformen: "Amazon-Restricted (Approval nötig), Shopify offen, TikTok-Shop für US-Brands offen",
    deCompliance: [
      {
        pflicht: "CPNP-Notifizierung (vor 1. Verkauf)",
        details:
          "Cosmetic Product Notification Portal — Pflicht für jedes Kosmetik-Produkt in der EU. Inhaltsstoff-Liste + verantwortliche Person + Adresse müssen hinterlegt sein. Kostenlos.",
        behoerde: "EU-Kommission",
        link: "https://ec.europa.eu/growth/sectors/cosmetics/cpnp_en",
        kostenDe: "0 € (Behörde) + 200-500 € Toxikologe für Sicherheits-Bewertung",
      },
      {
        pflicht: "Verantwortliche Person (RP) in der EU",
        details:
          "Bei Sitz innerhalb EU: Du selbst oder GF. Bei Sitz außerhalb: EU-RP nötig (Service-Anbieter ab 50 €/Monat).",
        kostenDe: "0 € (selbst) bis 600-1.200 €/Jahr (Service)",
      },
      {
        pflicht: "Sicherheits-Bewertung (Cosmetic Product Safety Report)",
        details:
          "Pflicht-Dokument von zugelassener qualifizierter Person (Toxikologe/Pharmazeut). Pro Produkt 200-500 €. Erstellt VOR CPNP.",
        kostenDe: "200-500 € pro Rezeptur",
      },
      {
        pflicht: "GMP-Konforme Produktion (ISO 22716)",
        details:
          "Pflicht für Hersteller. Bei Lohn-Abfüllung: Auftragnehmer muss GMP-zertifiziert sein.",
        kostenDe: "0 € (über Lohnabfüller) bis 10-30k € (eigene Anlage zertifizieren)",
      },
      {
        pflicht: "Kosmetik-Verordnung (EG) 1223/2009 — Etiketten-Pflichten",
        details:
          "Funktion, Liste der Inhaltsstoffe (INCI-Namen), Haltbarkeit (PAO-Symbol oder Datum), MHD, Chargennr, Hersteller-Adresse, Nettoinhalt.",
      },
      {
        pflicht: "LUCID-Verpackungsregister",
        details: "Wenn du Verpackung in den Verkehr bringst — Pflicht.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
        kostenDe: "ab 39 €/Jahr (Lizenzero)",
      },
    ],
    euCompliance: [
      {
        pflicht: "Anhang II/III Beschränkungen prüfen",
        details:
          "1.300+ verbotene Stoffe (Hydrochinon, Mercury), 256 eingeschränkte (Salicylsäure max 0,5%, Retinol max 0,3% in Body-Lotion). VOR Rezept-Entwicklung gegenchecken.",
      },
      {
        pflicht: "Allergen-Deklaration (26 Duftstoffe)",
        details: "Wenn über 0,001%/0,01% Schwellen — auf Etikett deklarieren.",
      },
    ],
    usCompliance: [
      {
        pflicht: "MoCRA-Registration (Modernization of Cosmetics Regulation Act)",
        details:
          "Seit 2024: FDA-Facility-Registration + Product-Listing + Adverse-Event-Reporting + Safety-Substantiation. Deadline für non-US-Brand: 1 Jahr nach erstem Verkauf in US.",
        behoerde: "FDA",
        link: "https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra",
        kostenDe: "$0 Registrierung + ~$2k US-Agent",
        tool: { label: "US-LLC-Wizard", route: "/cockpit/us-llc-wizard" },
      },
      {
        pflicht: "FDA-Facility-Registration",
        details: "Für Hersteller (auch ausländisch, wenn US-Verkauf). Pflicht alle 2 Jahre erneuern.",
      },
      {
        pflicht: "Color-Additive-Approval",
        details: "Bestimmte Farbstoffe brauchen explizite FDA-Listung (anders als EU).",
      },
      {
        pflicht: "California Prop 65",
        details: "Warnhinweis bei 900+ Stoffen. Strafe bis $2.500/Tag pro Verstoß.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Domain", beschreibung: "DPMA + EUIPO + Domain + Social-Handles in einem Klick.", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Marken-Anmeldung Klassen 3+5", beschreibung: "Klasse 3 (Kosmetik) + 5 (Hautpflege medizinisch, falls Claim).", tool: { label: "Marken-Wizard", route: "/cockpit/marken-wizard" } },
      { schritt: "Lohnabfüller wählen", beschreibung: "GMP-zertifiziert. DE: Cosmacon, Mibelle, Frike. PL: günstiger." },
      { schritt: "Toxikologe für Safety-Report", beschreibung: "Lohnabfüller hat oft Hausanwalt." },
      { schritt: "CPNP + LUCID anmelden", beschreibung: "Vor 1. Verkauf zwingend." },
      { schritt: "Listing + Bilder + AGB", beschreibung: "Shopify oder Amazon Beauty (Approval nötig)." },
    ],
    stolperfallen: [
      "Rezept klingt natürlich, enthält aber Anhang-II/III-Stoff → CPNP wird abgelehnt → Rezept-Reformulierung 2-3 Monate Verzögerung",
      "INCI-Namen statt Trivialnamen pflicht — viele Lohnabfüller liefern falsch beschriftete Etiketten",
      "PAO-Symbol fehlt (kleiner offener Tiegel mit Monaten-Angabe wie '6M'). Pflicht bei MHD <30 Monate",
      "Marketing-Claims wie 'heilt', 'behandelt' → Produkt rutscht in Arzneimittel-Recht (BfArM-Anzeige nötig). Halte Claims kosmetisch ('pflegt', 'glättet')",
      "FBA-Restricted: Kosmetik mit Liquid >= 100ml hat Sondergenehmigung",
    ],
  },

  {
    slug: "supplement",
    name: "Supplements / NEM",
    emoji: "💊",
    blurb:
      "Vitamine, Mineralien, Pflanzenextrakte. Boom-Markt mit niedrigem Margin-Druck nur bei Premium-Brand. Regulatorisch brutal: in DE Lebensmittel-Recht, in US Strukturen-Funktion-Claims-Limit, EU Health-Claims-Verordnung-Pflicht.",
    marktEinstieg: "10-30k € (MOQ-Lohn-Produktion + Rezept-Entwicklung + LMIV + Pflicht-Texte)",
    wettbewerb: "extrem",
    plattformen: "Amazon Restricted (Approval), Shopify offen, TikTok USA streng (FDA-Letter-Risk)",
    deCompliance: [
      {
        pflicht: "Lebensmittelunternehmer-Anzeige beim Lebensmittel-Überwachungsamt",
        details: "Wenn du Hersteller, Importeur oder Inverkehrbringer bist. Form: schriftlich an dein Landratsamt.",
        kostenDe: "Behördlich kostenlos",
      },
      {
        pflicht: "NEM-Anzeige BVL (NEM-Verordnung)",
        details:
          "Pro Produkt. Etikett + Kennzeichnung + Verbraucher-Information bevor Inverkehr-Bringen. Bearbeitung 2-6 Wochen.",
        behoerde: "BVL (Bundesamt für Verbraucherschutz und Lebensmittelsicherheit)",
        link: "https://www.bvl.bund.de",
      },
      {
        pflicht: "LMIV (EU 1169/2011) Etiketten-Pflichten",
        details:
          "Bezeichnung, Zutatenliste in absteigender Mengen-Reihenfolge, Allergene fett, Nährwerttabelle, Haltbarkeit, Hersteller-Adresse, Nettoinhalt, Verzehr-Empfehlung, Hinweis 'außerhalb Reichweite Kinder', Lagerung.",
      },
      {
        pflicht: "Höchstmengen-Vorgaben (BfR-Empfehlungen)",
        details: "BfR setzt Höchstmengen pro Tagesdosis (Vit D 20 µg, Magnesium 250 mg verteilt auf 2 Portionen etc.). Überschreitung → Produkt geht zurück.",
      },
      {
        pflicht: "Health-Claims-VO 1924/2006",
        details:
          "Nur EFSA-zugelassene Claims dürfen verwendet werden. Liste durchsuchbar in EU-Register. 'Magnesium trägt zur normalen Muskelfunktion bei' = OK. 'Magnesium gegen Schlaflosigkeit' = NICHT OK.",
      },
      {
        pflicht: "Health-Claims-Restriktion bei Botanicals (Pflanzenextrakte)",
        details: "On-hold-Liste: 1.500+ Pflanzen-Claims sind weder zugelassen noch verboten — Grauzone, hohes Risiko bei Verbraucherzentralen-Abmahnung.",
      },
      {
        pflicht: "LUCID-Verpackungsregister",
        details: "Wenn du Verpackung in den Verkehr bringst — Pflicht.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      },
    ],
    euCompliance: [
      {
        pflicht: "Notifizierungspflicht je EU-Land (kein einheitliches Verfahren)",
        details: "DE/IT/FR/BE haben Notifizierung, NL/UK nur Lebensmittelunternehmer-Anzeige. Pro Land separate Anzeige.",
      },
      {
        pflicht: "Novel-Food-Verordnung (EU 2015/2283)",
        details:
          "Stoffe ohne Verzehr-Geschichte vor 1997 (z.B. CBD, Curcumin-Phytosomen) sind Novel-Food → eigene Zulassung nötig (200k+ Kosten + 3+ Jahre).",
      },
    ],
    usCompliance: [
      {
        pflicht: "FDA Dietary-Supplement-Compliance",
        details:
          "DSHEA-Regeln: Structure-Function-Claims erlaubt ('supports immune health'), Disease-Claims verboten ('cures cancer'). Disclaimer pflicht.",
        behoerde: "FDA",
      },
      {
        pflicht: "GMP-21-CFR-111-Compliance",
        details: "Hersteller (auch ausländisch) muss Good Manufacturing Practices erfüllen.",
      },
      {
        pflicht: "Facility-Registration (FDA)",
        details: "Pflicht für Hersteller, Importeur, Lager. Renewal alle 2 Jahre.",
      },
      {
        pflicht: "Prior Notice an FDA",
        details: "Vor jedem Import. Über CBP-System (Customs).",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Domain", beschreibung: "Wichtig: Klasse 5 (NEM)+ 30 (Lebensmittel) anmelden.", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Lohnabfüller wählen", beschreibung: "DE: Sanostol, Heumann, Salus. NL: Bunge. Polen günstiger." },
      { schritt: "Rezept entwickeln + EFSA-Claims-Check", beschreibung: "Nur zugelassene Health-Claims verwenden." },
      { schritt: "BVL + Lebensmittel-Anzeige", beschreibung: "Pro Produkt Anzeige. 2-6 Wochen." },
      { schritt: "LUCID + Pflicht-Texte", beschreibung: "Etiketten-Layout durch Anwalt prüfen lassen (200-500 €)." },
      { schritt: "Listing", beschreibung: "Amazon NEM-Approval ist hart (mehrere Iterationen nötig). Shopify einfacher." },
    ],
    stolperfallen: [
      "DE-User: NEM ist nicht 'eigentlich' Pharma — kann komplett selbstständig vermarktet werden, wenn Health-Claims sauber",
      "Botanicals (CBD, Curcumin, Berberin) → Novel-Food-Risiko prüfen vor MOQ-Order",
      "Buyer-spezifische Claims wie 'abnehmen, glätten Falten' sind Disease-Claims → Abmahnung 4-stellig",
      "Bei Amazon: NEM-Approval-Prozess kann mehrere Iterationen brauchen (CoA, GMP-Zertifikat, Pflicht-Texte)",
      "Tagesdosen über BfR-Empfehlung → Lebensmittelüberwachung kann Produkt im Verkauf-Stop versetzen",
    ],
  },

  {
    slug: "electronics",
    name: "Electronics / Wearables",
    emoji: "🔌",
    blurb:
      "Audio, Wearables, Smart-Home, Beauty-Tech, AI-Hardware. Mittlere Eintritts-Hürde durch CE/RoHS/WEEE, aber weniger Klage-Risiko als Beauty/NEM. Geld liegt in der Technik-Marge (Razor-Blade-Modell) und Software-Subs.",
    marktEinstieg: "20-80k € (MOQ + Zertifizierung + ggf. Funk-Tests + WEEE)",
    wettbewerb: "hoch",
    plattformen: "Amazon offen (außer LiFePO4 / E-Bikes), Shopify offen, eBay offen",
    deCompliance: [
      {
        pflicht: "CE-Kennzeichnung",
        details:
          "Pflicht für alle in der EU. Konformitätserklärung mit relevanten EU-Richtlinien (LVD, EMV, RED, RoHS, ggf. EcoDesign).",
        tool: { label: "CE/RoHS-Generator", route: "/cockpit/ce-generator" },
      },
      {
        pflicht: "RoHS-Konformität (2011/65/EU)",
        details: "10 verbotene Stoffe (Blei, Cadmium, Chrom-VI, etc.). Lieferanten-Erklärung archivieren 10 Jahre.",
      },
      {
        pflicht: "WEEE-Registrierung (ElektroG)",
        details:
          "Pflicht für Hersteller / Importeure. EAR-Stiftung Registrierung pro Marke. Plus Garantie-Hinterlegung (ca. 0,5-2 €/kg).",
        behoerde: "Stiftung EAR",
        link: "https://www.stiftung-ear.de",
        kostenDe: "Erstregistrierung ~9,50 € netto je Geräteart-Kategorie + laufend 32,80 €/Quartal (131,20 €/Jahr) + Insolvenzsicherung (B2C)",
      },
      {
        pflicht: "Batterie-Registrierung (BatteriegesetzG / EU 2023/1542)",
        details:
          "Wenn Akku enthalten: Hersteller-Registrierung + Rücknahme-System (z.B. GRS Batterien).",
        kostenDe: "0 € Registrierung + Lizenzgebühr ca. 2-5 €/kg",
      },
      {
        pflicht: "BNetzA-Funkanlagen-Anzeige (RED 2014/53/EU)",
        details:
          "Bei Wifi/Bluetooth/2,4-GHz-Funk: technische Doku + EU-Konformitätserklärung. Anzeige nicht erforderlich, aber Marktüberwachung kann jederzeit prüfen.",
      },
      {
        pflicht: "LUCID-Verpackungsregister",
        details: "Wenn du Verpackung in den Verkehr bringst — Pflicht.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      },
    ],
    euCompliance: [
      {
        pflicht: "EcoDesign-Verordnung",
        details:
          "Bei Energie-relevanten Produkten (Netzteile, Lampen, Motoren). Effizienz-Klassen + Reparierbarkeits-Index.",
      },
      {
        pflicht: "USB-C-Pflicht (Common-Charger-Directive)",
        details:
          "Seit 28.12.2024: Smartphones, Tablets, Digitalkameras, Kopfhörer/Headsets, tragbare Lautsprecher, Handheld-Konsolen, E-Reader, Earbuds, Tastaturen, Mäuse, Navis und Powerbanks müssen USB-C haben (wenn kabelgebunden ladbar). Laptops ab 28.04.2026.",
      },
      {
        pflicht: "EUDR / Digital-Product-Passport (kommt 2027)",
        details: "QR-Code mit Material-Herkunft. Hardware vorbereiten.",
      },
    ],
    usCompliance: [
      {
        pflicht: "FCC-Authorization",
        details:
          "Bei Funk-Geräten (Wifi, BT, Sub-GHz). Verfahren je nach Funk-Modul: SDoC oder Certification (Test-Lab).",
        behoerde: "FCC",
        kostenDe: "$2-15k Test-Lab pro Gerät",
      },
      {
        pflicht: "FDA für 'medical devices light'",
        details:
          "Pulse-Oximeter, EKG-Wearables, Hörgeräte: 510(k)-Premarket-Notification. 'Wellness'-Geräte (z.B. Schlaf-Tracker ohne Medical-Claim) bleiben ausserhalb.",
      },
      {
        pflicht: "California Prop 65 (Warnhinweis)",
        details: "Bei Cadmium/Blei/Phthalaten in Kabel/Lötzinn — Warnhinweis pflicht.",
      },
      {
        pflicht: "DOE Energy-Labeling",
        details: "Bei Netzteil-Geräten (USB-Ladegeräte etc.) — Effizienz-Klasse Pflicht.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Domain", beschreibung: "Klasse 9 (Elektronik) Pflicht.", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Lieferanten finden (Alibaba/SourcingFactory)", beschreibung: "OEM oder ODM. CE/RoHS-Test-Reports einfordern. Pre-Shipment-Inspection (ITS, Bureau Veritas)." },
      { schritt: "Test-Lab buchen", beschreibung: "TÜV, SGS, Eurofins. EMV + LVD ca. 2-5k €." },
      { schritt: "EAR + LUCID + GRS-Batterie", beschreibung: "Vor 1. Verkauf erledigen." },
      { schritt: "CE-Konformitätserklärung erstellen", beschreibung: "PDF-Generator nutzen, technische Doku anlegen.", tool: { label: "CE/RoHS-Generator", route: "/cockpit/ce-generator" } },
      { schritt: "Listing + AGB + Garantie-Bedingungen", beschreibung: "Software-Update-Plicht für vernetzte Geräte (5 Jahre EU-Pflicht)." },
    ],
    stolperfallen: [
      "Lieferant CE-Kennzeichen ohne Test-Reports — du als Importeur haftest. Test-Reports IMMER selbst anfordern.",
      "Akku unter Versand-Klasse UN3481/UN3091 → spezielle Frachtbriefe + Versand-Beschränkungen (FBA verbietet manche Lithium-Versionen)",
      "USB-A-Kabel-only Produkt → seit 12/2024 Marktverbot bei vielen Kategorien",
      "Beat by Dre / Apple-Lookalike-Risiko → Designschutz-Klagen",
      "Bei nur OEM-Sticker → bei Garantie-Fall haftest DU für Reparatur",
    ],
  },

  {
    slug: "toys",
    name: "Toys / Spielzeug",
    emoji: "🧸",
    blurb:
      "Spielzeug für Kinder unter 14 Jahre. EN71-Norm-Pflicht macht den Markt für Hobby-Importeure schwer, aber regulierte Brand-Builds haben weniger Wettbewerb als Beauty.",
    marktEinstieg: "15-50k € (EN71-Tests + REACH + CE + ggf. Lab-Cert)",
    wettbewerb: "mittel",
    plattformen: "Amazon offen, eBay offen, Shopify offen",
    deCompliance: [
      {
        pflicht: "EN71-Tests (mehrteilig)",
        details:
          "EN71-1 mechanische Sicherheit, EN71-2 Brennbarkeit, EN71-3 Schwermetalle, EN71-9 organische Stoffe. Pro Variante 1-3k € im Test-Lab.",
        kostenDe: "500-3.000 € pro Variante",
      },
      {
        pflicht: "CE-Kennzeichnung (Spielzeug-Richtlinie 2009/48/EG)",
        details: "Konformitätserklärung + technische Doku 10 Jahre archivieren.",
        tool: { label: "CE/RoHS-Generator", route: "/cockpit/ce-generator" },
      },
      {
        pflicht: "REACH-Konformität (EG 1907/2006)",
        details: "SVHC-Kandidatenliste (240+ Stoffe) prüfen. Bei >0,1% in Erzeugnis: Mitteilungspflicht an Verbraucher.",
      },
      {
        pflicht: "LUCID + WEEE (falls elektronisch)",
        details: "LUCID immer. WEEE wenn Stromzufuhr.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      },
    ],
    euCompliance: [
      {
        pflicht: "EU-Richtlinie 2009/48/EG Anhang II (chemische Anforderungen)",
        details: "Strenge Schwellen für Allergene, CMR-Stoffe, Phthalate, BPA.",
      },
    ],
    usCompliance: [
      {
        pflicht: "CPSC-Children's Product Certificate (CPC)",
        details: "Pflicht für jedes Kind-Produkt. Test-Lab muss CPSC-akkreditiert sein.",
        behoerde: "CPSC",
      },
      {
        pflicht: "ASTM F963-23",
        details: "US-Pendant zu EN71. Tests durch akkreditiertes Lab.",
      },
      {
        pflicht: "California Prop 65 + Phthalates-Restriktionen",
        details: "DEHP, BBP, DBP, DIDP, DnHP < 0,1% in Spielzeug.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Klasse 28", beschreibung: "Klasse 28 für Spielwaren.", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "OEM-Fertigung", beschreibung: "China oder Türkei. Test-Reports ein fester Vertragspunkt." },
      { schritt: "EN71-Tests buchen", beschreibung: "TÜV Rheinland, SGS, Bureau Veritas." },
      { schritt: "CE + LUCID + WEEE", beschreibung: "Vor 1. Verkauf." },
      { schritt: "Listing", beschreibung: "Amazon Spielwaren-Approval bei manchen Kategorien." },
    ],
    stolperfallen: [
      "Kleinteile-Risiko (Kinder unter 3) → eigene Hinweise + Tests pflicht",
      "Magnetspielzeug ist seit 2024 in DE Sonder-reguliert (kleine starke Magneten)",
      "Phthalate-Plastifizierer in PVC-Teilen → SVHC-Verstoß möglich",
      "Plüsch + Naht-Stabilität: häufiger Test-Fail-Punkt",
    ],
  },

  {
    slug: "apparel",
    name: "Apparel / Fashion",
    emoji: "👕",
    blurb:
      "Bekleidung, Schuhe, Accessoires. Niedrige Eintritts-Hürde technisch (kein CE), aber Schwester-Margen-Druck durch Shein/Temu. Brand-Story + Community-Building > Compliance.",
    marktEinstieg: "5-25k € (MOQ-Sample + Fotos + Marketing)",
    wettbewerb: "extrem",
    plattformen: "Amazon offen, Shopify offen, TikTok-Shop wichtigster Channel",
    deCompliance: [
      {
        pflicht: "Textilkennzeichnungs-VO (EU 1007/2011)",
        details:
          "Pflicht-Etikett mit Faserbezeichnung + Anteil in %. Bei Mischfasern: Reihenfolge nach Anteil. Lederwaren extra.",
      },
      {
        pflicht: "Pflege-Kennzeichnung (GINETEX-Code)",
        details: "Empfohlen, aber nicht zwingend. Praktisch ist das Standard.",
      },
      {
        pflicht: "REACH-SVHC (Azofarbstoffe, Cadmium, etc.)",
        details: "Bei Färbungen + Lackierungen prüfen. Lieferanten-CoA archivieren.",
      },
      {
        pflicht: "LUCID-Verpackungsregister",
        details: "Wie bei allen physischen Produkten.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      },
    ],
    euCompliance: [
      {
        pflicht: "EUDR (Entwaldungs-Verordnung)",
        details:
          "Ab 2025/2026 Pflicht für Leder, Kautschuk-haltige Schuhe, Bauwolle (geplant). Sorgfaltspflichten + Geo-Daten.",
      },
      {
        pflicht: "Digital-Product-Passport ab 2027",
        details: "QR-Code mit Material-Herkunft, Recycling-Hinweisen, etc.",
      },
    ],
    usCompliance: [
      {
        pflicht: "TFPIA / Fur-Products-Labeling-Act",
        details: "Bei Fasern: Pflicht-Etikett mit Generic-Name + Country-of-Origin.",
      },
      {
        pflicht: "Care-Labeling-Rule (FTC)",
        details: "Pflege-Symbole + Anweisungen.",
      },
      {
        pflicht: "California Prop 65 (Lead in Fashion-Accessoires)",
        details: "Bei Metall-Beschlägen, Reißverschlüssen.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Klasse 25", beschreibung: "Klasse 25 für Kleidung.", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Sourcing", beschreibung: "Türkei, Portugal, Bangladesch, China. Premium-DACH: Polen, Slowenien." },
      { schritt: "MOQ-Sample", beschreibung: "100-300 Stück MOQ pro Größe in der Regel." },
      { schritt: "Etiketten + LUCID", beschreibung: "Faser-Etikett + Pflege-Symbole." },
      { schritt: "Fotos + Listing", beschreibung: "Lifestyle-Photo > Produkt-Photo bei Apparel." },
    ],
    stolperfallen: [
      "Marken-Verwechslungs-Gefahr in Klasse 25 — sehr volle Klasse",
      "EUDR ab 2025/2026 wird Sourcing aus AS verkomplizieren",
      "Bewerbung mit 'Made in Italy' / 'Bio' ohne Zertifikat → Wettbewerbsrechts-Klage durch Verbraucherzentrale",
      "Anti-Counterfeit-Risiko bei Lookalike-Brands",
    ],
  },

  {
    slug: "food",
    name: "Food / Lebensmittel",
    emoji: "🍫",
    blurb:
      "Schokoladen, Snacks, Getränke, Functional-Food. Streng reguliert, MHD limitiert, aber Cult-Brands (Oatly, RxBar) zeigen: Story-Driven Brands knacken alte Player.",
    marktEinstieg: "15-60k € (Lohnabfüllung + Lebensmittel-Recht + Pflicht-Texte + ggf. Bio-Zertifikat)",
    wettbewerb: "extrem",
    plattformen: "Amazon nur Trocken, Shopify offen, Kühl/Frisch nur eigener Versand",
    deCompliance: [
      {
        pflicht: "Lebensmittelunternehmer-Registrierung (Art 6 VO 852/2004)",
        details: "Beim örtlichen Veterinär-/Lebensmittelüberwachungsamt anzeigen.",
      },
      {
        pflicht: "LMIV (EU 1169/2011)",
        details:
          "Etiketten-Pflicht: Bezeichnung, Zutaten, Allergene fett, Nährwerttabelle pro 100g, MHD, Lagerung, Hersteller-Adresse, Nettoinhalt, Alkoholgehalt (falls).",
      },
      {
        pflicht: "Health-Claims-VO 1924/2006",
        details: "Identisch wie NEM — nur EFSA-Liste-Claims.",
      },
      {
        pflicht: "Bio-Zertifizierung (falls Bio-Claim)",
        details:
          "EG-Öko-VO 2018/848. Zertifizierung pro Sortiment durch Kontroll-Stelle (DE-ÖKO-001 etc.). 1-3k €/Jahr.",
      },
      {
        pflicht: "LUCID + ggf. Pfand-System (Einweg-Plastik-Getränke)",
        details: "Pfand 25 Cent pro Einweg-Plastik-Flasche / Dose.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      },
    ],
    euCompliance: [
      {
        pflicht: "Pestizid-Höchstmengen + Schwermetalle",
        details: "Pflanzlich: Cadmium, Blei (wichtig bei Kakao, Reis, Tee).",
      },
      {
        pflicht: "Novel-Food-VO bei neuartigen Zutaten",
        details: "Insekten, Algen, neue Süßstoffe.",
      },
    ],
    usCompliance: [
      {
        pflicht: "FDA-Food-Facility-Registration",
        details: "Pflicht alle 2 Jahre. Über FDA-Portal.",
      },
      {
        pflicht: "FSVP (Foreign Supplier Verification Program)",
        details: "US-Importeur muss Lieferanten verifizieren.",
      },
      {
        pflicht: "Nutrition-Facts-Panel (FDA-Format)",
        details: "Anders als EU-LMIV — Serving-Size + DV-% + Bold-Calories.",
      },
      {
        pflicht: "Country-of-Origin-Label (COOL)",
        details: "Bei Fleisch + bestimmten Produkten Pflicht.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Klassen 29/30/32", beschreibung: "29 (Trocken-Snacks), 30 (Süßwaren), 32 (Getränke).", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Lohnabfüller", beschreibung: "DE/AT für DACH; UK/PL günstiger." },
      { schritt: "Rezept + EFSA-Claim-Check", beschreibung: "Funktional-Food braucht spezielle Marken-Story." },
      { schritt: "LMIV-Etikett + LUCID", beschreibung: "Pflicht-Texte durch Anwalt prüfen lassen." },
      { schritt: "Listing", beschreibung: "Amazon nur Trocken erlaubt — Frisch/Kühl bedeutet eigener Versand." },
    ],
    stolperfallen: [
      "Marketing-Claim 'supports immune system' oder 'healthy' → Health-Claim-Prüfung notwendig",
      "Bio-Logo ohne Zertifikat → 5-stellige Strafe + Wettbewerbsklage",
      "Nährwert-Tabelle fehlt oder falsch → Verbraucherzentrale-Abmahnung kostet 1-2k €",
      "Pfand-Pflicht 25 Cent bei Einweg-Plastik",
      "MHD-Druck auf Etikett unleserlich → Marktrücknahme",
    ],
  },

  {
    slug: "pet",
    name: "Pet / Tierprodukte",
    emoji: "🐾",
    blurb:
      "Premium-Tierfutter, Supplements für Hunde/Katzen, Wearables (GPS-Tracker, Smart-Feeder). Wachsendes Segment, niedrigere Compliance-Hürde als Human-NEM aber dennoch reguliert.",
    marktEinstieg: "10-40k € (MOQ + Pflicht-Texte + ggf. Heimtier-Bedarf-Anzeige)",
    wettbewerb: "hoch",
    plattformen: "Amazon offen (Pet-Approval bei Futter), Shopify offen, eigener Pet-Store",
    deCompliance: [
      {
        pflicht: "Heimtier-Bedarf-Anzeige (Heimtier-Bedarf-VO)",
        details: "Bei Heimtierfutter: Anzeige beim örtlichen Veterinäramt.",
      },
      {
        pflicht: "Futtermittel-VO (EG 767/2009)",
        details: "Etiketten-Pflicht: Zutaten, Analytische Bestandteile, Zusatzstoffe, Gebrauchsanweisung.",
      },
      {
        pflicht: "LUCID",
        details: "Wie immer.",
        tool: { label: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      },
    ],
    euCompliance: [
      {
        pflicht: "Zugelassene Zusatzstoffe (EU 1831/2003)",
        details: "Nur EU-zugelassene Vitamine, Aminosäuren, Konservierer.",
      },
    ],
    usCompliance: [
      {
        pflicht: "AAFCO-Compliance",
        details: "Standard-Format für Pet-Food-Labels.",
      },
      {
        pflicht: "FDA-Center-for-Veterinary-Medicine-Registrierung",
        details: "Bei Pet-Food + Pet-Supplements.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Klasse 31", beschreibung: "Klasse 31 für Tierfutter.", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Lohnfertiger", beschreibung: "DE: Heristo, Saturn, Vitakraft. NL: Beaphar." },
      { schritt: "Etikett + Veterinäramt-Anzeige", beschreibung: "Pflicht vor 1. Verkauf." },
      { schritt: "Listing", beschreibung: "Amazon Pet-Approval, Zooplus-Marketplace, eigener Shop." },
    ],
    stolperfallen: [
      "Marketing-Claim 'heilt Arthrose' → rutscht in Tierarzneimittel-Recht",
      "Bei Single-Protein-Hypoallergen: Kreuzkontamination im Lohnbetrieb dokumentieren",
      "AGCM (Italien) ist sehr aggressiv bei 'Premium'/'Senior'-Claims ohne Substanz",
    ],
  },

  {
    slug: "hardware",
    name: "Hardware / Tools",
    emoji: "🔧",
    blurb:
      "Werkzeuge, Heimwerker-Tools, B2B-Equipment. Höhere Tickets (50-300 €), niedrigerer Wettbewerb als Beauty/Apparel. CE/EMV/Maschinen-Richtlinie wichtig.",
    marktEinstieg: "20-100k € (MOQ + Test-Lab + CE + Versand-Logistik)",
    wettbewerb: "mittel",
    plattformen: "Amazon offen, eBay stark, Shopify, B2B-Marketplaces (Mercateo, Hoffmann Group)",
    deCompliance: [
      {
        pflicht: "Maschinen-Richtlinie 2006/42/EG (bei Maschinen)",
        details:
          "EU-Konformitätserklärung + technische Doku 10 Jahre archivieren. Bei Anhang IV-Maschinen Baumusterprüfung pflicht.",
        tool: { label: "CE/RoHS-Generator", route: "/cockpit/ce-generator" },
      },
      {
        pflicht: "PSA-VO (EU 2016/425) bei Schutzkleidung/-handschuhen",
        details: "Kategorisierung I/II/III. Kategorie III braucht Baumusterprüfung.",
      },
      {
        pflicht: "EMV / LVD bei elektrischen Geräten",
        details: "Wie Electronics — siehe da.",
      },
      {
        pflicht: "WEEE bei elektrischer Hardware",
        details: "Wie Electronics — siehe da.",
      },
    ],
    euCompliance: [
      {
        pflicht: "Lärm-Außen-Verordnung",
        details: "Bei Bauwerkzeugen (Außenbereich) - dB-Pegel auf Etikett.",
      },
    ],
    usCompliance: [
      {
        pflicht: "OSHA + ANSI-Standards",
        details: "Beim B2B-Verkauf an US-Firmen entscheidend (z.B. ANSI-Z87 bei Schutzbrillen).",
      },
      {
        pflicht: "ULC / UL-Listing (bei Strom-Hardware)",
        details: "Quasi-Pflicht im Channel — meist mit FCC kombiniert.",
      },
    ],
    standardStack: [
      { schritt: "Marken-Check + Klasse 7/8", beschreibung: "7 (Maschinen), 8 (Handwerkzeuge).", tool: { label: "Brand-Check", route: "/cockpit/check" } },
      { schritt: "Sourcing", beschreibung: "China-Maschinen meist, DE/AT für Premium." },
      { schritt: "CE + Maschinen-Richtlinie + Test-Lab", beschreibung: "Richtlinie checken." },
      { schritt: "Listing + B2B-Channel", beschreibung: "Hoffmann Group + Mercateo + Würth-Marketplace im B2B." },
    ],
    stolperfallen: [
      "Maschinen-Richtlinie hat Anhang IV-Liste (z.B. Sägen, Pressen) → Baumusterprüfung pflicht (5-15k €)",
      "Manuelle Werkzeuge meist NICHT CE-pflichtig — Verwechslungs-Risiko",
      "Importeur haftet für Folgeschäden — Produkthaftpflicht-Versicherung pflicht",
    ],
  },
];
