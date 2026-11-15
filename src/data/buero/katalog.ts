// Katalog der Büro-Kaufberatung: ein Eintrag je Seite /buero/<slug>.
// Auswahl, Produktdaten und Text liegen in inhalte/<slug>.ts, Preise in preise.json.
//
// SO KOMMT EINE NEUE SEITE DAZU
//  1. inhalte/<slug>.ts anlegen (Regeln im Kopf von types.ts): 4–6 Geräte mit EAN, jede
//     Angabe aus dem Datenblatt des Herstellers, kein Test behauptet, keine Preise im Text.
//  2. Hier einen Eintrag ergänzen (slug = Dateiname).
//  3. preise.json aus den Händler-Feeds neu erzeugen (jede EAN braucht ein lieferbares Angebot).
//  4. bun run lastmod   (Manifest für Sitemap-lastmod, mit einchecken)
//  5. bunx --bun vitest run src/data/buero   und danach die ganze Suite.
// Sitemap, Prerender und der Hub /buero entstehen aus diesem Katalog.

import type { BueroSeite } from "./types";

export const BUERO: BueroSeite[] = [
  {
    slug: "drucker",
    name: "Drucker",
    titel: "Drucker fürs Büro: Welches Gerät Selbstständigen reicht",
    kurz: "Laser, Tinte oder Tintentank: fünf Multifunktionsgeräte für kleine Büros im Datenblatt-Vergleich, mit Druckvolumen, Einzug und Reichweite.",
    seo: {
      title: "Drucker fürs Büro: Vergleich für Selbstständige | GründerX",
      description:
        "Welcher Drucker reicht für Selbstständige? Laser, Tinte und Tintentank im Datenblatt-Vergleich: Tempo, Duplex, Vorlageneinzug und Reichweite je Gerät.",
    },
    veroeffentlicht: "2026-11-15",
    stand: "2026-11-15",
    inhalt: () => import("./inhalte/drucker"),
  },
  {
    slug: "monitor",
    name: "Monitor",
    titel: "Monitor fürs Büro: Welche Größe und Auflösung du wirklich brauchst",
    kurz: "24 bis 34 Zoll, Full HD bis 4K, mit oder ohne USB-C: Büro-Monitore im Datenblatt-Vergleich für Laptop- und Desktop-Arbeitsplätze.",
    seo: {
      title: "Monitor fürs Büro: Größe, Auflösung, USB-C | GründerX",
      description:
        "Welcher Monitor passt ins Büro? Größe, Auflösung, USB-C mit Stromversorgung und Höhenverstellung erklärt, dazu fünf Geräte im Datenblatt-Vergleich.",
    },
    veroeffentlicht: "2026-11-15",
    stand: "2026-11-15",
    inhalt: () => import("./inhalte/monitor"),
  },
  {
    slug: "dockingstation",
    name: "Dockingstation",
    titel: "Dockingstation für den Laptop: Welche zu deinem Arbeitsplatz passt",
    kurz: "Hub, USB-C-Dock oder Thunderbolt: Ladeleistung, Monitoranschlüsse und Ports von fünf Geräten im Datenblatt-Vergleich.",
    seo: {
      title: "Dockingstation für den Laptop: Vergleich | GründerX",
      description:
        "USB-C-Hub, Dock oder Thunderbolt? Ladeleistung, Zahl der Monitore und Anschlüsse erklärt, dazu fünf Dockingstations im Datenblatt-Vergleich.",
    },
    veroeffentlicht: "2026-11-15",
    stand: "2026-11-15",
    inhalt: () => import("./inhalte/dockingstation"),
  },
  {
    slug: "headset",
    name: "Headset",
    titel: "Headset fürs Büro: Was für Videocalls und Kundentelefonate reicht",
    kurz: "Kabel oder kabellos, mit oder ohne Geräuschunterdrückung: Office-Headsets im Datenblatt-Vergleich nach Verbindung, Akku und Mikrofon.",
    seo: {
      title: "Headset fürs Büro: Vergleich für Videocalls | GründerX",
      description:
        "Welches Headset reicht für Videocalls und Kundentelefonate? Kabel oder kabellos, Mikrofon, Akku und Zertifizierungen im Datenblatt-Vergleich.",
    },
    veroeffentlicht: "2026-11-15",
    stand: "2026-11-15",
    inhalt: () => import("./inhalte/headset"),
  },
  {
    slug: "webcam",
    name: "Webcam",
    titel: "Webcam fürs Büro: Welche Auflösung für Videocalls reicht",
    kurz: "Full HD, 2K oder 4K, Sichtfeld und Abdeckung: Webcams für Kundengespräche und Aufnahmen im Datenblatt-Vergleich.",
    seo: {
      title: "Webcam fürs Büro: Full HD oder 4K? Vergleich | GründerX",
      description:
        "Welche Webcam reicht für Videocalls? Auflösung, Sichtfeld, Autofokus und Abdeckung erklärt, dazu fünf Geräte im Datenblatt-Vergleich.",
    },
    veroeffentlicht: "2026-11-15",
    stand: "2026-11-15",
    inhalt: () => import("./inhalte/webcam"),
  },
  {
    slug: "aktenvernichter",
    name: "Aktenvernichter",
    titel: "Aktenvernichter fürs Büro: Welche Sicherheitsstufe du brauchst",
    kurz: "Sicherheitsstufen nach DIN 66399, Blattleistung und Auffangvolumen: Aktenvernichter für kleine Büros im Datenblatt-Vergleich.",
    seo: {
      title: "Aktenvernichter fürs Büro: Sicherheitsstufen | GründerX",
      description:
        "P-2, P-4 oder P-5? Die Sicherheitsstufen nach DIN 66399 erklärt, dazu Aktenvernichter für kleine Büros im Datenblatt-Vergleich nach Schnitt und Leistung.",
    },
    veroeffentlicht: "2026-11-15",
    stand: "2026-11-15",
    inhalt: () => import("./inhalte/aktenvernichter"),
  },
];
