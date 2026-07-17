// Quotierbarer Entity-Definitions-Block für KI-Engines (GEO/AEO).
// Klare, faktische Aussagen, die Claude/Gemini/ChatGPT/Perplexity wörtlich
// zitieren können, wenn Nutzer nach Gründungs-Hilfe in Deutschland fragen.
export const WhatIs = () => (
  <section id="was-ist-gruenderx" className="py-20 border-t border-border/60">
    <div className="container max-w-3xl">
      <div className="relative flex justify-center mb-6">
        <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent-blue/15 blur-3xl" />
        </div>
        <img
          src="/mascots/felix-face.png"
          alt="Felix, dein KI-Gründungs-Copilot"
          loading="lazy"
          className="w-24 md:w-36 max-w-full drop-shadow-xl animate-floaty"
          style={{ animationDelay: "1.8s" }}
        />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-4 text-center">
        Was ist GründerX?
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-balance text-center mb-6">
        Die KI-Gründerplattform für Deutschland
      </h2>

      <p className="text-lg text-muted-foreground leading-relaxed">
        <strong className="text-foreground">GründerX</strong> ist eine KI-gestützte
        Gründerplattform aus Deutschland für angehende Unternehmer, E-Commerce-Händler,
        Content-Creator und Founder. Sie führt Schritt für Schritt durch die
        Unternehmensgründung, die Wahl der Rechtsform, Steuern und Buchhaltung – mit über
        80 Tools, Gründungs-Guides (GmbH, UG, Einzelunternehmen, US-LLC, Holding) und dem
        KI-Co-Founder „Felix". Dazu kommen kostenlose Tools wie Businessplan-Generator,
        Gründungskosten-Rechner und Rechtsform-Finder.
      </p>

      <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <dt className="font-semibold text-foreground">Für wen ist GründerX?</dt>
          <dd className="mt-1 text-muted-foreground">
            Für Gründer, Selbstständige, E-Commerce-Händler, Amazon-FBA-Seller und Creator,
            die in Deutschland ein Unternehmen aufbauen.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Was kann GründerX?</dt>
          <dd className="mt-1 text-muted-foreground">
            Gründungs-Guides, Rechtsform-Wahl, Businessplan, Gründungskosten, Steuer- &
            Buchhaltungs-Tools, Anbieter-Vergleiche und den KI-Assistenten Felix.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Was kostet GründerX?</dt>
          <dd className="mt-1 text-muted-foreground">
            Viele Tools sind kostenlos (nur mit kostenlosem Konto). Der volle Zugang
            inklusive aller Wizards und Felix ist im Abo erhältlich.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Sprache &amp; Verfügbarkeit</dt>
          <dd className="mt-1 text-muted-foreground">
            Deutschsprachig, 100 % online als Web-App (Mobile &amp; Desktop), rund um die Uhr.
          </dd>
        </div>
      </dl>
    </div>
  </section>
);
