import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { openConsentSettings } from "@/utils/consent";
import { NewsletterOptin } from "@/components/NewsletterOptin";

const COLUMNS: { title: string; links: { to: string; label: string; native?: boolean }[] }[] = [
  {
    title: "Produkt",
    links: [
      { to: "/guides", label: "Alle Guides" },
      { to: "/quiz", label: "Quizze & Umfragen" },
      { to: "/listicles", label: "Listicles" },
      { to: "/tools", label: "Tools" },
      { to: "/gratis-tools", label: "Gratis-Tools" },
      { to: "/vorlagen", label: "Vertragsvorlagen" },
      { to: "/ki-assistent", label: "In ChatGPT & Claude (MCP)" },
      { to: "/preise", label: "Preise" },
      { to: "/partner", label: "Partnerprogramm" },
    ],
  },
  {
    title: "Für jede Zielgruppe (12–70)",
    links: [
      { to: "/u18-gruenden", label: "Unter 18 & Eltern (12–17)" },
      { to: "/studenten-azubis", label: "Studium & Ausbildung (18–25)" },
      { to: "/nebengewerbe", label: "Nebengewerbe neben dem Job" },
      { to: "/webseite-und-app", label: "Eigene Website & App" },
      { to: "/gruenden-ab-50", label: "Gründen ab 50 bis 70" },
      { to: "/us-setup", label: "US-LLC & Amex US" },
      { to: "/freelancer-agentur", label: "Freelancer & Agenturen" },
      { to: "/influencer", label: "Influencer & Creator" },
      { to: "/tiktok-shop", label: "TikTok Shop starten" },
      { to: "/amazon-haendler", label: "Amazon-Händler werden" },
    ],
  },
  {
    title: "Ressourcen",
    links: [
      { to: "/ratgeber", label: "Ratgeber" },
      { to: "/lexikon", label: "Gründer-Lexikon" },
      { to: "/buero", label: "Büro-Ausstattung" },
      { to: "/ratgeber/bestes-geschaeftskonto-gruender-vergleich-2026", label: "Geschäftskonto-Vergleich" },
      { to: "/gruender-events", label: "Gründer-Events" },
      { to: "/gruender-chancen", label: "Gründer-Chancen: Wettbewerbe & Preisgeld" },
      { to: "/hackathon-starter-kit", label: "Hackathon-Starter-Kit" },
      { to: "/startup-guthaben", label: "Startup-Guthaben & Credits" },
      { to: "/gruendungsberatung", label: "Gründungsberatung finden" },
      { to: "/e-rechnung-lesen", label: "E-Rechnung lesen" },
      { to: "/pdf-in-e-rechnung-umwandeln", label: "PDF in E-Rechnung umwandeln" },
      { to: "/gruendungspaket", label: "Gründungspaket 2026" },
      { to: "/vergleich/gruendung-selbst-steuerberater-gruenderx", label: "Selbst, Steuerberater oder GründerX?" },
      { to: "/ust-id-beantragen", label: "USt-ID beantragen" },
      { to: "/elster-zertifikat-beantragen", label: "ELSTER-Zertifikat beantragen" },
      { to: "/influencer-steuer-check", label: "Influencer-Steuer-Check" },
      { to: "/tiktok-shop-checkliste", label: "TikTok-Shop-Checkliste" },
      { to: "/pr-paket-rechner", label: "PR-Paket-Rechner" },
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
      { to: "/kuendigen", label: "Verträge hier kündigen", native: true },
      { to: "/vertrag-widerrufen", label: "Vertrag widerrufen", native: true },
      { to: "/kontakt", label: "Kontakt" },
    ],
  },
];

const linkCls = "text-white/70 transition-colors hover:text-white";

export const Footer = () => (
  <footer id="kontakt" className="border-t border-white/10 bg-[#081330] text-white/80">
    <div className="container max-w-6xl px-4 pb-12 pt-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr,1fr,1fr,1fr,1fr] md:gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" aria-label="Zur Startseite" className="mb-4 flex w-fit items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <Logo asImage className="h-6 w-6 brightness-0 invert" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">GründerX</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Das interaktive Lern-Studio für Gründung, Website, App, Steuern und US-Setup. In der richtigen Reihenfolge.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">{col.title}</h2>
            <ul className="space-y-1 text-sm md:space-y-2.5">
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

      <div className="mt-12 rounded-2xl border border-white/10 bg-card p-6 text-foreground shadow-lg">
        <NewsletterOptin kompakt quelle="footer" />
      </div>

      <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
        <span>© {new Date().getFullYear()} GründerX. Alle Rechte vorbehalten.</span>
        <span>Gebaut in Deutschland · Software, keine Steuer- oder Rechtsberatung</span>
      </div>
      <p className="mt-3 max-w-4xl text-[11px] leading-relaxed text-white/55">
        <strong className="font-semibold text-white/75">*Affiliate-Hinweis:</strong> Manche Links auf dieser Seite sind Partner-Links. Bei einem
        Vertragsabschluss über diese Links erhält GründerX ggf. eine Provision, für dich entstehen
        keine Mehrkosten. Empfehlungen erfolgen unabhängig von der Vergütung. Details in{" "}
        <a href="/agb" className="underline hover:text-white">§ 14 AGB</a>.
      </p>
    </div>
  </footer>
);
