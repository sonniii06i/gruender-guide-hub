import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

/**
 * Rahmen für Funnel-Seiten (08.11.2026, Betreiber: Offer-Page + Advertorials wie AG1/Cocunat/Kinobody).
 * Kopf nur mit Logo (kein Menü, kein Absprung), Fuß nur Pflichtlinks. `anzeige` blendet die
 * Kennzeichnung „Anzeige“ ein (Advertorials/Listicles, § 5a Abs. 4 UWG).
 */
export const FunnelShell = ({ children, anzeige = false, kopfRechts }: { children: ReactNode; anzeige?: boolean; kopfRechts?: ReactNode }) => (
  <div className="relative min-h-screen bg-background">
    <header className="border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="container flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="GründerX Startseite">
          <Logo asImage className="h-7 w-7" />
          <span className="text-base font-semibold tracking-tight text-foreground">GründerX</span>
        </Link>
        <div className="flex items-center gap-3">
          {anzeige && (
            <span className="rounded border border-border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Anzeige
            </span>
          )}
          {kopfRechts}
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t border-border/70 py-8 pb-28 md:pb-8">
      <div className="container flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-sm text-muted-foreground">
        <a href="/impressum" className="hover:text-foreground">Impressum</a>
        <a href="/datenschutz" className="hover:text-foreground">Datenschutz</a>
        <a href="/agb" className="hover:text-foreground">AGB</a>
        <a href="/widerruf" className="hover:text-foreground">Widerruf</a>
        <a href="/kuendigen" className="hover:text-foreground">Vertrag kündigen</a>
      </div>
      <p className="container mt-4 max-w-3xl px-4 text-center text-xs leading-relaxed text-muted-foreground">
        GründerX ist eine Software und weder Steuerberatung noch Rechtsdienstleistung.
      </p>
    </footer>
  </div>
);

/** Quellenliste unter Funnel-Texten: jede Zahl auf der Seite steht hier mit Fundstelle. */
export const Quellen = ({ eintraege }: { eintraege: { text: string; url: string }[] }) => (
  <section className="mt-12 border-t border-border/70 pt-6">
    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quellen</h2>
    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
      {eintraege.map((q) => (
        <li key={q.url}>
          {q.text}:{" "}
          <a href={q.url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2 hover:text-foreground">
            {q.url.replace(/^https?:\/\//, "")}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

/** Gemeinsame, live geprüfte Quellen (08.11.2026). */
export const QUELLEN = {
  kfw: { text: "KfW-Gründungsmonitor 2026 (Pressemitteilung): 690.000 Gründungen 2025, Anteil Nebenerwerb 70 %", url: "https://www.kfw.de/%C3%9Cber-die-KfW/Newsroom/Aktuelles/Pressemitteilungen-Details_888064.html" },
  ao138: { text: "§ 138 AO: Anzeige der Erwerbstätigkeit, Frist ein Monat", url: "https://www.gesetze-im-internet.de/ao_1977/__138.html" },
  ustg19: { text: "§ 19 UStG: Kleinunternehmer-Grenzen 25.000 € / 100.000 €, Verzicht bindet mindestens fünf Kalenderjahre", url: "https://www.gesetze-im-internet.de/ustg_1980/__19.html" },
  gewstg11: { text: "§ 11 GewStG: Freibetrag 24.500 € beim Gewerbeertrag (natürliche Personen)", url: "https://www.gesetze-im-internet.de/gewstg/__11.html" },
  elsterForum: { text: "ELSTER-Anwenderforum, Beitrag vom 18.03.2024 zum Fragebogen für Einzelunternehmen", url: "https://forum.elster.de/anwenderforum/forum/elster-webanwendungen/mein-elster/440742-fragebogen-zur-steuerlichen-erfassung-f%C3%BCr-einzelunternehmen" },
  pstg: { text: "§ 4 PStTG (DAC7): nicht gemeldet wird nur, wer unter 30 Verkäufen und unter 2.000 € je Plattform bleibt", url: "https://www.gesetze-im-internet.de/psttg/__4.html" },
};
