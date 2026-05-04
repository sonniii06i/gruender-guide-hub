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

const Index = () => (
  <div className="min-h-screen bg-background">
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
