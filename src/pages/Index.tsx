import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { IntroBand } from "@/components/landing/IntroBand";
import { Comparison } from "@/components/landing/Comparison";
import { Assistant } from "@/components/landing/Assistant";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Bundles } from "@/components/landing/Bundles";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
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
      ]}
    />
    <Navbar />
    <main>
      <Hero />
      <IntroBand />
      <Comparison />
      <Assistant />
      <Features />
      <HowItWorks />
      <Bundles />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default Index;

