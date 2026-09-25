import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemBand } from "@/components/landing/ProblemBand";
import { GuidesRoadmap } from "@/components/landing/GuidesRoadmap";
import { SellerBand } from "@/components/landing/SellerBand";
import { WhatIs } from "@/components/landing/WhatIs";
import { Comparison } from "@/components/landing/Comparison";
import { Assistant } from "@/components/landing/Assistant";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Bundles } from "@/components/landing/Bundles";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { UseCasesShowcase } from "@/components/landing/UseCasesShowcase";
import { Footer } from "@/components/landing/Footer";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { Seo } from "@/components/Seo";
import { StartHere } from "@/components/landing/StartHere";
import { PLANS, formatEurCents } from "@/config/pricing";
import { LANDING_TOOLS } from "@/data/features";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="GründerX – Gründung, Steuer & Marketplace-Setup für Händler"
      description="Für E-Commerce-Händler und Creator in Deutschland: Rechtsform, Fragebogen zur steuerlichen Erfassung, LUCID, WEEE, OSS sowie Amazon- und TikTok-Shop-Setup – Schritt für Schritt mit KI-Co-Pilot Felix."
      path="/"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GründerX",
          url: "https://gruenderx.de",
          logo: "https://gruenderx.de/favicon.png",
          sameAs: ["https://discord.gg/vh84QBxAHq"],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "impressum@gruenderx.de",
            areaServed: "DE",
            availableLanguage: ["de"],
          },
          description:
            "KI-gestützte Plattform für Unternehmensgründung, Steuern und Buchhaltung in Deutschland.",
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "GründerX",
          url: "https://gruenderx.de",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://gruenderx.de/playbooks?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Was ist GründerX?",
              acceptedAnswer: {
                "@type": "Answer",
                text: `GründerX ist eine KI-gestützte Gründerplattform aus Deutschland für angehende Unternehmer, E-Commerce-Händler, Content-Creator und Founder. Sie führt Schritt für Schritt durch Unternehmensgründung, Rechtsform-Wahl, Steuern und Buchhaltung – mit ${LANDING_TOOLS.length} Tools, Gründungs-Guides (GmbH, UG, Einzelunternehmen, US-LLC, Holding), dem KI-Co-Founder Felix sowie kostenlosen Tools wie Businessplan-Generator, Gründungskosten-Rechner und Rechtsform-Finder.`,
              },
            },
            {
              "@type": "Question",
              name: "Für wen ist GründerX?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Für Gründer, Selbstständige, E-Commerce-Händler, Amazon-FBA-Seller und Creator, die in Deutschland ein Unternehmen aufbauen.",
              },
            },
            {
              "@type": "Question",
              name: "Was kostet GründerX?",
              acceptedAnswer: {
                "@type": "Answer",
                text: `Der volle Zugang mit allen Tools, Wizards, Guides und dem KI-Assistenten Felix kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr, das Founder-Set mit AnwaltX ${formatEurCents(PLANS.bundle.grossCents)} im Monat – alle Preise inkl. 19 % USt. Ohne Konto kostenlos: je eine Prüfung im WEEE-Check, Brand-Check und LUCID-Wizard sowie je eine Nutzung der Generatoren unter Gratis-Tools (Businessplan, Gründungskosten, Rechtsform, Amazon-Widersprüche), jeweils gegen die E-Mail-Adresse; unbegrenzt im Abo.`,
              },
            },
            {
              "@type": "Question",
              name: "Ist GründerX deutschsprachig und online verfügbar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ja. GründerX ist deutschsprachig und zu 100 % online als Web-App für Mobile und Desktop rund um die Uhr verfügbar.",
              },
            },
          ],
        },
      ]}
    />
    <Navbar />
    <main>
      <Hero />
      <ProblemBand />
      <Assistant />
      <WhatIs />
      <Comparison />
      <GuidesRoadmap />
      <SellerBand />
      <Features />
      <HowItWorks />
      <StartHere />
      <Bundles />
      <UseCasesShowcase />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <MobileCtaBar />
  </div>
);

export default Index;

