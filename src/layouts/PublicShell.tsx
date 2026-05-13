import { ReactNode } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

/**
 * Public, SEO-friendly layout (no auth required, no sidebar).
 * Used for crawlable content pages like /playbooks, /playbook/preview/:slug,
 * /anbieter, /anbieter/:slug, /faq.
 */
export const PublicShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default PublicShell;
