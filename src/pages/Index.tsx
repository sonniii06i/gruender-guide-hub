import { DISCORD_INVITE_URL } from "@/config/links";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { GuidesRoadmap } from "@/components/landing/GuidesRoadmap";
import { WhatIs } from "@/components/landing/WhatIs";
import { Comparison } from "@/components/landing/Comparison";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Bundles } from "@/components/landing/Bundles";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FeatureRows } from "@/components/landing/FeatureRows";
import { Footer } from "@/components/landing/Footer";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { Seo } from "@/components/Seo";
import { PLANS, formatEurCents } from "@/config/pricing";
import { TOOL_COUNT } from "@/data/kennzahlen";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="GründerX: Lernsystem für Gründung, Website, App & Steuern"
      description="Für alle von 12 bis 70: Interaktive Guides mit Arbeitsfenstern, Quizzen, Listicles, Gratis-Tools und KI-Co-Pilot Felix. Von Gewerbe und ELSTER bis App und Amex US."
      path="/"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GründerX",
          url: "https://gruenderx.de",
          logo: "https://gruenderx.de/favicon.png",
          sameAs: [DISCORD_INVITE_URL],
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
                text: `GründerX ist eine Lern- und Werkzeug-Plattform aus Deutschland für alle von 12 bis 70. Wir zeigen Schritt für Schritt, was bei Gründung, Website, App, Steuern, E-Commerce und US-Setup zuerst kommt: mit ${TOOL_COUNT} Tools, interaktiven Guides, Quizzen, Listicles und KI-Co-Pilot Felix.`,
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
                text: `Der volle Zugang mit allen Tools, Guides und KI-Co-Pilot Felix kostet ${formatEurCents(PLANS.gruenderx.grossCents)} im Monat oder ${formatEurCents(PLANS["gruenderx-year"].grossCents)} im Jahr (Endpreise inkl. 19 % USt., monatlich kündbar). Ohne Konto kostenlos: Quizze, Listicles, LUCID-Wizard sowie je eine Prüfung im WEEE-Check, Brand-Check und den Gratis-Tools.`,
              },
            },
            {
              "@type": "Question",
              name: "Ist GründerX deutschsprachig und auf dem Handy nutzbar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ja. GründerX ist deutschsprachig und mobile-first für Handy und Desktop gebaut, mit interaktiven Guides, Quizzen, Listicles und direkten Arbeitsfenstern.",
              },
            },
          ],
        },
      ]}
    />
    <Navbar />
    <main>
      {/* Aufbau nach profitpath.com (25.10.2026): Hero → Für wen → Laufband → Fahrplan →
          Leistungen → Cockpit-Zeilen → Ablauf → Guides → Vergleich → Preise → Gründer → FAQ → CTA.
          ProblemBand, SellerBand, StartHere, UseCasesShowcase, KiAssistentBand, ProductPreview und
          Assistant wiederholten Hero/„Für wen“ und sind hier bewusst nicht mehr eingebunden. */}
      <Hero />
      <Features />
      <FeatureRows />
      <HowItWorks />
      <GuidesRoadmap />
      <Comparison />
      <Bundles />
      <Testimonials />
      <WhatIs />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <MobileCtaBar />
  </div>
);

export default Index;

