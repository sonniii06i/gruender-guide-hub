import { Link } from "react-router-dom";
import { PRO_MONTH_GROSS_CENTS, formatEurCents } from "@/config/pricing";
import { TOOL_COUNT } from "@/data/kennzahlen";

// Quotierbarer Entity-Definitions-Block für KI-Engines (GEO/AEO).
// Klare, faktische Aussagen, die Claude/Gemini/ChatGPT/Perplexity wörtlich
// zitieren können, wenn Nutzer nach Gründungs-Hilfe in Deutschland fragen.
export const WhatIs = () => (
  <section id="was-ist-gruenderx" className="border-t border-border/70 bg-card py-14 md:py-20">
    <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1fr,1.1fr] lg:gap-20">
     <div>
      <img
        src="/mascots/felix-face-192.webp"
        alt="Felix, dein KI-Gründungs-Copilot"
        loading="lazy"
        width={96}
        height={96}
        className="mb-6 h-20 w-20 object-contain"
      />
      <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-primary md:text-[2rem]">
        Was ist GründerX? Die KI-Gründerplattform für Deutschland.
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        <strong className="text-foreground">GründerX</strong> ist eine Lern- und Werkzeug-Plattform aus
        Deutschland für alle von 12 bis 70, die eine Website, eine App, ein Nebengewerbe, einen Shop, eine GmbH
        oder ein US-Setup aufbauen. Wir zeigen mit Stand und Quelle, was zuerst kommt und was warten kann: mit{" "}
        {TOOL_COUNT} Tools, Schritt-für-Schritt-Guides, interaktiven Quizzen und dem KI-Co-Piloten Felix.
      </p>
     </div>

      <dl className="grid grid-cols-1 content-start gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Für wen ist GründerX?</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Für Jugendliche ab 12 (mit Eltern-Infos), Studierende, Angestellte im Nebengewerbe,
            Händler, Creator, Freelancer und Neustarter bis 70.
          </dd>
        </div>
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Was kann GründerX?</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Interaktive Guides mit Arbeitsfenstern, Rechtsform-, Steuer- und Buchhaltungs-Tools,
            US-Amex- & US-LLC-Wissen, Quizze, Listicles und KI-Co-Pilot Felix.
          </dd>
        </div>
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Was kostet GründerX?</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Der volle Zugang kostet ab {formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat inkl. 19 % USt. (
            <Link to="/preise" className="underline hover:text-foreground">alle Preise</Link>). Ohne Konto
            kostenlos: LUCID-Wizard, Quizze, Listicles, je eine Prüfung im WEEE-Check und Brand-Check sowie die
            Generatoren unter <Link to="/gratis-tools" className="underline hover:text-foreground">Gratis-Tools</Link>.
          </dd>
        </div>
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Sprache &amp; App</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Deutschsprachig, mobile-first als Web-App und Handy-App. Software, keine Steuer- oder Rechtsberatung.
          </dd>
        </div>
      </dl>
    </div>
  </section>
);
