import { Link } from "react-router-dom";
import { PRO_MONTH_GROSS_CENTS, formatEurCents } from "@/config/pricing";
import { TOOL_COUNT } from "@/data/features";

// Quotierbarer Entity-Definitions-Block für KI-Engines (GEO/AEO).
// Klare, faktische Aussagen, die Claude/Gemini/ChatGPT/Perplexity wörtlich
// zitieren können, wenn Nutzer nach Gründungs-Hilfe in Deutschland fragen.
export const WhatIs = () => (
  <section id="was-ist-gruenderx" className="border-t border-border/70 bg-card py-20 md:py-28">
    <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1fr,1.1fr] lg:gap-20">
     <div>
      <img
        src="/mascots/felix-face.png"
        alt="Felix, dein KI-Gründungs-Copilot"
        loading="lazy"
        width={96}
        height={96}
        className="mb-6 h-20 w-20 object-contain drop-shadow-lg"
      />
      <h2 className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
        Was ist GründerX? Die KI-Gründerplattform für Deutschland.
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        <strong className="text-foreground">GründerX</strong> ist eine KI-gestützte
        Gründerplattform aus Deutschland für angehende Unternehmer, E-Commerce-Händler,
        Content-Creator und Founder. Sie führt Schritt für Schritt durch die
        Unternehmensgründung, die Wahl der Rechtsform, Steuern und Buchhaltung – mit{" "}
        {TOOL_COUNT} Tools, Gründungs-Guides (GmbH, UG, Einzelunternehmen, US-LLC, Holding) und dem
        KI-Co-Founder „Felix". Dazu kommen kostenlose Tools wie Businessplan-Generator,
        Gründungskosten-Rechner und Rechtsform-Finder.
      </p>
     </div>

      <dl className="grid grid-cols-1 content-start gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Für wen ist GründerX?</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Für Gründer, Selbstständige, E-Commerce-Händler, Amazon-FBA-Seller und Creator,
            die in Deutschland ein Unternehmen aufbauen.
          </dd>
        </div>
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Was kann GründerX?</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Gründungs-Guides, Rechtsform-Wahl, Businessplan, Gründungskosten, Steuer- &
            Buchhaltungs-Tools, Anbieter-Vergleiche und den KI-Assistenten Felix.
          </dd>
        </div>
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Was kostet GründerX?</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Der volle Zugang mit allen Tools, Wizards, Guides und Felix kostet ab{" "}
            {formatEurCents(PRO_MONTH_GROSS_CENTS)} im Monat inkl. USt. (
            <Link to="/preise" className="underline hover:text-foreground">alle Preise</Link>). Ohne Konto
            kostenlos: je eine Prüfung im WEEE-Check, Brand-Check und LUCID-Wizard sowie je eine Nutzung der
            Generatoren unter <Link to="/gratis-tools" className="underline hover:text-foreground">Gratis-Tools</Link> –
            nur gegen deine E-Mail-Adresse; unbegrenzt im Abo.
          </dd>
        </div>
        <div className="bg-card p-6">
          <dt className="font-semibold text-foreground">Sprache &amp; Verfügbarkeit</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Deutschsprachig, 100 % online als Web-App (Mobile &amp; Desktop), rund um die Uhr.
          </dd>
        </div>
      </dl>
    </div>
  </section>
);
