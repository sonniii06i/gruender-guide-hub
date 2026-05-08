import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
export const Footer = () => (
  <footer id="kontakt" className="border-t border-border bg-card">
    <div className="container max-w-6xl py-14">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" aria-label="Zur Startseite" className="flex items-center gap-2 mb-4 w-fit">
            <Logo asImage className="h-8 w-8" />
            <span className="font-bold text-lg">GründerX</span>
          </Link>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Der KI-Co-Pilot für Gründer, Creator und E-Commerce-Operator.
            Schwesterprodukt von{" "}
            <a href="https://anwaltx.de" className="text-accent-blue hover:underline">
              AnwaltX
            </a>
            .
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Produkt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#leistungen" className="hover:text-foreground">Leistungen</a></li>
            <li><a href="#bundles" className="hover:text-foreground">Bundles</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Rechtliches</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/impressum" className="hover:text-foreground">Impressum</a></li>
            <li><a href="/datenschutz" className="hover:text-foreground">Datenschutz</a></li>
            <li><a href="/agb" className="hover:text-foreground">AGB</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} GründerX. Alle Rechte vorbehalten.</span>
        <span>Made with ♥ in Deutschland</span>
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground/80 leading-relaxed">
        <strong>*Affiliate-Hinweis:</strong> Manche Links auf dieser Seite sind Partner-Links. Bei einem
        Vertragsabschluss über diese Links erhält GründerX ggf. eine Provision — für dich entstehen
        keine Mehrkosten. Empfehlungen erfolgen unabhängig von der Vergütung. Details in{" "}
        <a href="/agb" className="underline hover:text-foreground">§ 14 AGB</a>.
      </div>
    </div>
  </footer>
);
