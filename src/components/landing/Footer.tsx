import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { openConsentSettings } from "@/utils/consent";

/* Alle Links bleiben erhalten (interne Verlinkung): /faq und /partner waren
   früher von keiner Seite aus verlinkt und standen nur in der Sitemap. Die
   Footer-Links sind deshalb Pflicht, nicht Deko. Nur neu gruppiert. */
const COLUMNS: { title: string; links: { to: string; label: string; native?: boolean }[] }[] = [
  {
    title: "Produkt",
    links: [
      { to: "/#leistungen", label: "Leistungen" },
      { to: "/tools", label: "Tools" },
      { to: "/gratis-tools", label: "Gratis-Tools" },
      { to: "/vorlagen", label: "Vertragsvorlagen" },
      { to: "/ki-assistent", label: "In ChatGPT & Claude (MCP)" },
      { to: "/preise", label: "Preise" },
      { to: "/partner", label: "Partnerprogramm" },
    ],
  },
  {
    title: "Für Creator & TikTok Shop",
    links: [
      { to: "/influencer", label: "Influencer & Creator" },
      { to: "/tiktok-shop", label: "TikTok Shop starten" },
      { to: "/influencer-steuer-check", label: "Influencer-Steuer-Check" },
      { to: "/tiktok-shop-checkliste", label: "TikTok-Shop-Checkliste" },
      { to: "/pr-paket-rechner", label: "PR-Paket-Rechner" },
    ],
  },
  {
    title: "Ressourcen",
    links: [
      { to: "/ratgeber", label: "Ratgeber" },
      // Ratgeber mit den meisten Impressionen bei guten Positionen (GSC 30 T:
      // 430 Impr., Ø Platz 11,4), war aber nur vom /ratgeber-Hub verlinkt.
      { to: "/ratgeber/bestes-geschaeftskonto-gruender-vergleich-2026", label: "Geschäftskonto-Vergleich" },
      { to: "/gruender-events", label: "Gründer-Events" },
      { to: "/gruender-chancen", label: "Gründer-Chancen: Wettbewerbe & Preisgeld" },
      { to: "/hackathon-starter-kit", label: "Hackathon-Starter-Kit" },
      { to: "/startup-guthaben", label: "Startup-Guthaben & Credits" },
      { to: "/gruendungsberatung", label: "Gründungsberatung finden" },
      { to: "/e-rechnung-lesen", label: "E-Rechnung lesen" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { to: "/impressum", label: "Impressum", native: true },
      { to: "/datenschutz", label: "Datenschutz", native: true },
      { to: "/agb", label: "AGB", native: true },
      { to: "/widerruf", label: "Widerruf", native: true },
      { to: "/kontakt", label: "Kontakt" },
    ],
  },
];

const linkCls = "text-muted-foreground transition-colors hover:text-foreground";

export const Footer = () => (
  <footer id="kontakt" className="border-t border-border bg-card">
    <div className="container max-w-6xl pb-10 pt-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr,1fr,1fr,1fr,1fr] md:gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" aria-label="Zur Startseite" className="mb-4 flex w-fit items-center gap-2">
            <Logo asImage className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight">GründerX</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Der KI-Co-Pilot für Gründer, Creator und E-Commerce-Operator. Schwesterprodukt von{" "}
            <a href="https://anwaltx.de" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
              AnwaltX
            </a>
            .
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h2>
            <ul className="space-y-0.5 text-sm md:space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  {l.native ? (
                    <a href={l.to} className={linkCls}>
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className={linkCls}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
              {col.title === "Rechtliches" && (
                <li>
                  <button type="button" onClick={openConsentSettings} className={linkCls}>
                    Cookie-Einstellungen
                  </button>
                </li>
              )}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-14 flex flex-col justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} GründerX. Alle Rechte vorbehalten.</span>
        <span>Gebaut in Deutschland</span>
      </div>
      <p className="mt-3 max-w-4xl text-[11px] leading-relaxed text-muted-foreground">
        <strong className="font-semibold">*Affiliate-Hinweis:</strong> Manche Links auf dieser Seite sind Partner-Links. Bei einem
        Vertragsabschluss über diese Links erhält GründerX ggf. eine Provision — für dich entstehen
        keine Mehrkosten. Empfehlungen erfolgen unabhängig von der Vergütung. Details in{" "}
        <a href="/agb" className="underline hover:text-foreground">§ 14 AGB</a>.
      </p>
    </div>
  </footer>
);
