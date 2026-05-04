## GründerX – Landing Page

A German-language landing site for **GründerX**, a sister product to AnwaltX. Same overall structure and visual feel as anwaltx.de (clean, light blue gradient, rounded floating navbar, big bold hero), but original copy positioned around **company formation, taxes, and an AI co-pilot for founders & e-commerce operators**. Bundles combining GründerX + AnwaltX are highlighted as the upsell.

Note: I'll mirror the page's *structure and visual style*, but write fresh original copy rather than copying the text verbatim.

### Sections (top to bottom)

1. **Floating Navbar** – Logo "GründerX" with a stylized "G" mark, links: Leistungen, Über uns, FAQ, Blog, Kontakt, Registrieren, primary "Anmelden" button.
2. **Hero** – Headline "Unternehmen gründen? Sofort startklar." Subline about combining AI with steuerlicher & gründungsrechtlicher Expertise for founders, creators, and e-commerce sellers. Trust chips (DSGVO-konform, 24/7, KI-gestützt, Steuer-ready). CTAs: "Kostenlos starten" + "Leistungen ansehen". Early-bird banner.
3. **Intro band** – "Von Gründern, für Gründer" – short empathy paragraph about the chaos of starting a company.
4. **Comparison block** – "Andere Tools erklären nur – GründerX gründet mit dir." Two columns: ChatGPT/Generic vs GründerX (Rechtsformwahl, Finanzamt-Anmeldung, Buchhaltung-Setup, USt-Voranmeldung, E-Com-spezifisch: OSS, Amazon/Shopify Setup).
5. **AI Assistant card** – "Felix" (founder co-pilot), parallel to AnwaltX's "Juri". Explains he handles Gewerbeanmeldung, Fragebogen zur steuerlichen Erfassung, Rechnungen, USt, etc.
6. **Leistungen / Features grid** – 6 cards:
   - Gründung & Rechtsform (UG/GmbH/Einzelunternehmen)
   - Steuern & Buchhaltung
   - Verträge & AGB für Shops
   - Amazon / Shopify / TikTok Shop Setup
   - Förderungen & Banking
   - KI-Chat 24/7
7. **How it works** – 3 steps: Registrieren → Mit Felix chatten → Unternehmen läuft.
8. **Bundle section (key new piece)** – "GründerX + AnwaltX im Bundle" – three pricing cards:
   - GründerX Solo
   - AnwaltX Solo
   - **Founder Bundle** (highlighted) – beides kombiniert mit Rabatt
9. **Testimonials** – 3 cards from fictional founders/e-com sellers.
10. **FAQ** – Accordion: Welche Rechtsform passt? Wie funktioniert die KI? Ersetzt ihr meinen Steuerberater? Was kostet das Bundle? DSGVO?
11. **Final CTA** – "Bereit zu gründen?" + Anmelden button.
12. **Footer** – Logo, links, Impressum/Datenschutz placeholders, Hinweis auf Schwesterprodukt AnwaltX.

### Design system

- Light theme, soft blue/white gradient background like anwaltx.de.
- Primary brand: deep blue `hsl(222 80% 24%)`, accent action blue `hsl(220 90% 55%)`, success green for bundle highlight.
- Typography: large bold sans-serif headings, generous spacing, rounded-2xl cards with subtle shadows and 1px borders.
- All colors via HSL tokens in `index.css` and Tailwind config; no hardcoded colors in components.
- Reusable shadcn components: Button, Card, Accordion, Badge.

### Technical notes

- Single-page implementation in `src/pages/Index.tsx` composed of section components under `src/components/landing/` (Navbar, Hero, Comparison, Assistant, Features, HowItWorks, Bundles, Testimonials, FAQ, CTA, Footer).
- Update `index.css` tokens + `tailwind.config.ts` with brand palette and gradient utility.
- Update document `<title>` and meta description in `index.html` to GründerX.
- Static content only — no backend in this pass. CTAs link to `#` placeholders; we can wire auth/Cloud later.
- Fully responsive (mobile nav via Sheet).

After approval I'll build it out.