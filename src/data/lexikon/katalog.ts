// Katalog des Lexikons: ein Eintrag je Begriff. Der Text liegt in inhalte/<slug>.ts.
//
// SO KOMMT EIN NEUER BEGRIFF DAZU
//  1. inhalte/<slug>.ts anlegen (Muster: inhalte/smoke-test.ts). 700–1.200 Wörter,
//     Definition in 1–2 Sätzen, H2 als Fragen, ein durchgerechnetes Beispiel,
//     jede Zahl/Frist/Norm mit live geprüfter Primärquelle in `quellen`.
//  2. Hier einen Eintrag ergänzen (slug = Dateiname, `verlinktVon` mit mind. zwei
//     vorhandenen Seiten /tools/…, /guides/… oder /ratgeber/…).
//  3. In mind. zwei anderen Begriffen den neuen Slug unter `verwandt` eintragen.
//  4. bun run lastmod   (Manifest für Sitemap-lastmod, mit einchecken)
//  5. bunx --bun vitest run src/data/lexikon   und danach die ganze Suite.
// Sitemap, Prerender, Hub /lexikon und die Kästen auf den Bestandsseiten
// entstehen aus diesem Katalog – sonst ist nichts einzutragen.
//
// Vor dem Anlegen prüfen, ob es das Thema schon als Ratgeber, Guide oder Tool
// gibt: dann abgrenzen (Begriff erklären) und dorthin verlinken, nicht doppeln.

import type { LexikonBegriff } from "./types";

export const LEXIKON: LexikonBegriff[] = [
  {
    slug: "smoke-test",
    begriff: "Smoke Test",
    kurz: "Test, ob Menschen ein Angebot wirklich wollen, bevor es das Produkt gibt: Angebotsseite, Besucher, gemessene Kaufabsicht.",
    thema: "idee-testen",
    seo: {
      title: "Smoke Test: Definition, Ablauf & Beispiel | GründerX",
      description:
        "Smoke Test erklärt: So prüfst du mit einer Angebotsseite und kleinem Budget die Nachfrage, bevor du baust. Mit Rechenbeispiel und rechtlichen Grenzen.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/tools/pitch-deck", "/guides/erste-webseite-seo", "/guides/crowdfunding-reward"],
    inhalt: () => import("./inhalte/smoke-test"),
  },
  {
    slug: "fake-door-test",
    begriff: "Fake-Door-Test",
    kurz: "Ein Knopf oder Menüpunkt für eine Funktion, die es noch nicht gibt. Gemessen wird, wie viele Nutzer darauf klicken.",
    thema: "idee-testen",
    seo: {
      title: "Fake-Door-Test: Definition, Ablauf & Beispiel | GründerX",
      description:
        "Fake-Door-Test erklärt: Wie du mit einem Knopf ohne Funktion misst, ob sich ein Feature lohnt, wie du die Klickrate bewertest und was du Nutzern sagen musst.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/guides/erste-webseite-seo", "/guides/eigene-app-launchen"],
    inhalt: () => import("./inhalte/fake-door-test"),
  },
  {
    slug: "burn-rate",
    begriff: "Burn Rate",
    kurz: "Betrag, um den der Kontostand eines jungen Unternehmens pro Monat sinkt. Brutto: alle Auszahlungen, netto: Auszahlungen minus Einzahlungen.",
    thema: "finanzen",
    seo: {
      title: "Burn Rate: Definition, Formel & Beispiel | GründerX",
      description:
        "Burn Rate erklärt: Unterschied zwischen Gross Burn und Net Burn, Formel, Rechenbeispiel für eine UG und was Geschäftsführer bei knapper Kasse beachten müssen.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/tools/runway-rechner", "/guides/cashflow-forecasting"],
    inhalt: () => import("./inhalte/burn-rate"),
  },
  {
    slug: "runway",
    begriff: "Runway",
    kurz: "Zahl der Monate, die das vorhandene Geld bei gleichbleibendem Verbrauch noch reicht: Kontostand geteilt durch Net Burn.",
    thema: "finanzen",
    seo: {
      title: "Runway: Definition, Formel & Beispiel | GründerX",
      description:
        "Runway erklärt: So berechnest du, wie viele Monate dein Geld reicht, warum die einfache Formel zu optimistisch ist und welche Pflichten dann greifen.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/tools/runway-rechner", "/guides/cashflow-forecasting", "/guides/vc-pitch-deck"],
    inhalt: () => import("./inhalte/runway"),
  },
  {
    slug: "mrr-arr",
    begriff: "MRR und ARR",
    kurz: "Monatlich und jährlich wiederkehrender Umsatz aus laufenden Abos, ohne Einmalzahlungen und ohne Umsatzsteuer.",
    thema: "kennzahlen",
    seo: {
      title: "MRR und ARR: Definition, Formel & Beispiel | GründerX",
      description:
        "MRR und ARR erklärt: Was zum wiederkehrenden Umsatz zählt, wie du Jahresabos, Rabatte und Kündigungen einrechnest und warum MRR kein Buchhaltungsumsatz ist.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/guides/b2b-saas-spezifika", "/tools/app-umsatz-rechner", "/guides/coach-membership"],
    inhalt: () => import("./inhalte/mrr-arr"),
  },
  {
    slug: "north-star-metric",
    begriff: "North Star Metric",
    kurz: "Die eine Kennzahl, die zeigt, ob Kunden den Kernnutzen eines Produkts bekommen, und an der ein Team seine Arbeit ausrichtet.",
    thema: "kennzahlen",
    seo: {
      title: "North Star Metric: Definition & Beispiele | GründerX",
      description:
        "North Star Metric erklärt: Woran du eine gute Leitkennzahl erkennst, wie du sie in Einflussgrößen zerlegst und welche Beispiele zu Shop, SaaS und App passen.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/guides/b2b-saas-spezifika", "/guides/eigene-app-launchen"],
    inhalt: () => import("./inhalte/north-star-metric"),
  },
  {
    slug: "warenkorbwert-aov",
    begriff: "Warenkorbwert (AOV)",
    kurz: "Durchschnittlicher Umsatz je Bestellung: Umsatz eines Zeitraums geteilt durch die Zahl der Bestellungen (Average Order Value).",
    thema: "kennzahlen",
    seo: {
      title: "Warenkorbwert (AOV): Formel, Beispiel & Hebel | GründerX",
      description:
        "Warenkorbwert (Average Order Value) erklärt: Formel, Rechenbeispiel mit Umsatzsteuer und Retouren und die Hebel, mit denen Online-Händler den AOV erhöhen.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/tools/shop-profit-rechner", "/tools/marge-tracker", "/guides/shopify-launch"],
    inhalt: () => import("./inhalte/warenkorbwert-aov"),
  },
  {
    slug: "unit-economics",
    begriff: "Unit Economics",
    kurz: "Rechnung, ob eine einzelne Einheit des Geschäfts (eine Bestellung, ein Kunde) nach allen direkten Kosten Geld übrig lässt.",
    thema: "kennzahlen",
    seo: {
      title: "Unit Economics: Definition, Formel & Beispiel | GründerX",
      description:
        "Unit Economics erklärt: So rechnest du den Deckungsbeitrag je Bestellung und je Kunde, mit Beispiel für einen Online-Shop und den häufigsten Rechenfehlern.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/tools/shop-profit-rechner", "/tools/marge-tracker", "/guides/vc-pitch-deck"],
    inhalt: () => import("./inhalte/unit-economics"),
  },
  {
    slug: "customer-acquisition-cost-cac",
    begriff: "Customer Acquisition Cost (CAC)",
    kurz: "Kosten, um einen neuen zahlenden Kunden zu gewinnen: Marketing- und Vertriebskosten eines Zeitraums geteilt durch die Neukunden.",
    thema: "kennzahlen",
    seo: {
      title: "Customer Acquisition Cost (CAC): Formel, Beispiel | GründerX",
      description:
        "Customer Acquisition Cost (CAC) erklärt: Formel, Rechenbeispiel, Unterschied zwischen Blended und Paid CAC, Payback-Zeit und das Verhältnis zum Kundenwert.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/guides/performance-marketing-stack", "/guides/meta-ads-setup", "/tools/shop-profit-rechner"],
    inhalt: () => import("./inhalte/customer-acquisition-cost-cac"),
  },
  {
    slug: "churn-rate",
    begriff: "Churn Rate",
    kurz: "Anteil der Kunden oder des wiederkehrenden Umsatzes, der in einem Zeitraum durch Kündigung verloren geht.",
    thema: "kennzahlen",
    seo: {
      title: "Churn Rate: Definition, Formel & Beispiel | GründerX",
      description:
        "Churn Rate erklärt: Kunden-Churn und Umsatz-Churn berechnen, Monats- in Jahreswerte umrechnen und was deutsches Recht zur Kündigung von Online-Abos vorgibt.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    verlinktVon: ["/guides/b2b-saas-spezifika", "/guides/coach-membership", "/guides/klaviyo-setup"],
    inhalt: () => import("./inhalte/churn-rate"),
  },
  {
    slug: "lucid-verpackungsregister",
    begriff: "LUCID (Verpackungsregister)",
    kurz: "Öffentliches Online-Register der Zentralen Stelle Verpackungsregister, in dem sich Hersteller vor dem ersten Verkauf verpackter Ware eintragen.",
    thema: "pflichten-handel",
    seo: {
      title: "LUCID (Verpackungsregister): Pflichten & Fristen | GründerX",
      description:
        "LUCID erklärt: Was das Verpackungsregister ist, wer sich seit dem 12.08.2026 nach PPWR und VerpackDG registrieren muss, welche Fristen gelten und was es kostet.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    rechtsthema: true,
    verlinktVon: ["/tools/lucid-wizard", "/tools/vergleich-lucid", "/ratgeber/lucid-verpackungsregister-anmelden"],
    inhalt: () => import("./inhalte/lucid-verpackungsregister"),
  },
  {
    slug: "dac7",
    begriff: "DAC7 / Plattformen-Steuertransparenzgesetz",
    kurz: "EU-Regel, nach der Plattformen wie Marktplätze die Umsätze ihrer Verkäufer jährlich an die Steuerbehörden melden. In Deutschland: PStTG.",
    thema: "pflichten-handel",
    seo: {
      title: "DAC7 (PStTG): Meldepflicht, Grenzen & Fristen | GründerX",
      description:
        "DAC7 und das Plattformen-Steuertransparenzgesetz erklärt: Wer gemeldet wird, welche Grenze für Warenverkäufe gilt, welche Daten ans BZSt gehen und bis wann.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    rechtsthema: true,
    verlinktVon: ["/guides/dac7", "/guides/reseller-marketplace-setup", "/guides/amazon-verkaeuferkonto-setup"],
    inhalt: () => import("./inhalte/dac7"),
  },
  {
    slug: "ce-kennzeichnung",
    begriff: "CE-Kennzeichnung",
    kurz: "Erklärung des Herstellers, dass ein Produkt die EU-Vorschriften erfüllt, die für diese Produktgruppe eine CE-Kennzeichnung vorschreiben.",
    thema: "pflichten-handel",
    seo: {
      title: "CE-Kennzeichnung: Bedeutung, Pflicht & Ablauf | GründerX",
      description:
        "CE-Kennzeichnung erklärt: Für welche Produkte sie Pflicht ist, wer als Hersteller gilt, wie die Konformitätsbewertung abläuft und was Importeure prüfen müssen.",
    },
    veroeffentlicht: "2026-11-12",
    stand: "2026-11-12",
    rechtsthema: true,
    verlinktVon: ["/tools/ce-rohs", "/tools/weee-check", "/guides/amazon-produkt-anlegen"],
    inhalt: () => import("./inhalte/ce-kennzeichnung"),
  },
];
