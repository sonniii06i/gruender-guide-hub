import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { IntroBand } from "@/components/landing/IntroBand";
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

const Index = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="GründerX – Unternehmen gründen, Steuern & Buchhaltung mit KI"
      description="GmbH, UG, Einzelunternehmen, US-LLC – Schritt-für-Schritt Guides, Steuer-Tools, Anbieter-Vergleiche & KI-Co-Pilot für E-Commerce, Creator & Founder."
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
                text: "GründerX ist eine KI-gestützte Gründerplattform aus Deutschland für angehende Unternehmer, E-Commerce-Händler, Content-Creator und Founder. Sie führt Schritt für Schritt durch Unternehmensgründung, Rechtsform-Wahl, Steuern und Buchhaltung – mit über 80 Tools, Gründungs-Guides (GmbH, UG, Einzelunternehmen, US-LLC, Holding), dem KI-Co-Founder Felix sowie kostenlosen Tools wie Businessplan-Generator, Gründungskosten-Rechner und Rechtsform-Finder.",
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
                text: "Viele Tools sind kostenlos und nur mit einem kostenlosen Konto nutzbar. Der volle Zugang inklusive aller Wizards und des KI-Assistenten Felix ist im Abo erhältlich.",
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
      <IntroBand />
      <WhatIs />
      <Comparison />
      <Assistant />
      <Features />
      <HowItWorks />
      <Bundles />
      <Testimonials />
      <UseCasesShowcase />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <MobileCtaBar />
  </div>
);

export default Index;

