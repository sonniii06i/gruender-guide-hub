import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";

/**
 * Eigenständige Widerrufsbelehrung.
 *
 * Inhaltlich identisch mit § 7 der AGB — bewusst als eigene Seite, weil die
 * Verkaufsplattformen (CopeCart, Digistore24, elopage/ablefy) bei der
 * Produktfreigabe eine direkt verlinkbare Widerrufsseite verlangen und einen
 * Paragraphen innerhalb der AGB nicht als solche akzeptieren. Änderungen hier
 * und in AGB.tsx § 7 gehören zusammen.
 */
const Widerruf = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Widerrufsbelehrung | GründerX"
      description="Widerrufsbelehrung und Muster-Widerrufsformular für GründerX — 14 Tage Widerrufsrecht für Verbraucher:innen."
      path="/widerruf"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Widerrufsbelehrung",
        description:
          "Widerrufsbelehrung und Muster-Widerrufsformular für GründerX — 14 Tage Widerrufsrecht für Verbraucher:innen.",
        url: "https://gruenderx.de/widerruf",
        inLanguage: "de-DE",
        isPartOf: { "@type": "WebSite", name: "GründerX", url: "https://gruenderx.de" },
      }}
    />
    <Navbar />
    <main className="container max-w-3xl pt-32 pb-24 prose prose-slate prose-headings:scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2 not-prose">Rechtliches</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Widerrufsbelehrung</h1>
      <p className="text-sm text-muted-foreground">Stand: August 2026</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Widerrufsrecht für Verbraucher</h2>
      <p>
        Verbraucher:innen haben gemäß § 312g BGB ein 14-tägiges Widerrufsrecht. Verbraucher ist
        gemäß § 13 BGB jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die
        überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit
        zugerechnet werden können.
      </p>

      <div className="rounded-xl border border-border bg-secondary/40 p-4 my-3 text-sm [overflow-wrap:anywhere]">
        <strong>Widerrufsbelehrung</strong><br /><br />
        Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses (Eingang der Bestätigungs-E-Mail).<br /><br />
        Um dein Widerrufsrecht auszuüben, musst du uns (Sonni Buttke, Pinguinweg 18, 22527 Hamburg,
        <a href="mailto:support@gründerx.de"> support@gründerx.de</a>) mittels einer eindeutigen Erklärung
        (z. B. per Post versandter Brief oder E-Mail) über deinen Entschluss informieren. Du kannst dafür
        das nachstehende Muster-Widerrufsformular verwenden, was jedoch nicht vorgeschrieben ist. Zur Wahrung
        der Widerrufsfrist reicht es, dass du die Mitteilung vor Ablauf der Widerrufsfrist absendest.<br /><br />
        <strong>Folgen des Widerrufs:</strong> Wir erstatten alle Zahlungen unverzüglich, spätestens binnen 14 Tagen
        nach Eingang deiner Widerrufserklärung. Hast du verlangt, dass die Dienstleistungen während der Widerrufsfrist
        beginnen, hast du uns einen Betrag zu zahlen, der dem Anteil der bis zum Widerruf bereits erbrachten Dienstleistungen
        im Vergleich zum Gesamtumfang der vertraglich vorgesehenen Dienstleistungen entspricht (§ 357a Abs. 2 BGB).
        Wir holen dafür vor Vertragsschluss deine ausdrückliche Zustimmung ein und bestätigen sie dir per E-Mail
        (dauerhafter Datenträger).
      </div>

      <div className="rounded-xl border border-border bg-secondary/40 p-4 my-3 text-sm [overflow-wrap:anywhere]">
        <strong>Muster-Widerrufsformular</strong> (gem. Anlage 2 zu Art. 246a § 1 EGBGB)<br /><br />
        Wenn du den Vertrag widerrufen möchtest, dann fülle bitte dieses Formular aus und sende es zurück.<br /><br />
        An: Sonni Buttke, Pinguinweg 18, 22527 Hamburg, E-Mail: <a href="mailto:support@gründerx.de">support@gründerx.de</a><br /><br />
        Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*):<br /><br />
        ____________________________________________________________<br /><br />
        Bestellt am (*) / erhalten am (*): ___________<br />
        Name des/der Verbraucher(s): ___________<br />
        Anschrift des/der Verbraucher(s): ___________<br />
        Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ___________<br />
        Datum: ___________<br /><br />
        (*) Unzutreffendes streichen.
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-3">Vorzeitiges Erlöschen des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht erlischt vorzeitig, wenn du ausdrücklich zugestimmt hast, dass wir mit der
        Leistungserbringung vor Ablauf der Widerrufsfrist beginnen, und du gleichzeitig deine Kenntnis
        davon bestätigt hast, dass du durch deine Zustimmung mit Beginn der Vertragsausführung dein
        Widerrufsrecht verlierst (§ 356 Abs. 4 BGB).
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">Käufe über externe Verkaufsplattformen</h2>
      <p>
        Wird GründerX über eine externe Verkaufsplattform (z. B. CopeCart, Digistore24 oder
        elopage/ablefy) gekauft, kommt der Kaufvertrag mit der jeweiligen Plattform als
        Wiederverkäuferin zustande — nicht mit uns. In diesem Fall gelten die Widerrufsbelehrung und
        die Allgemeinen Geschäftsbedingungen der jeweiligen Plattform, und der Widerruf ist an sie zu
        richten. Die hier beschriebene Belehrung gilt für Bestellungen, die direkt über gruenderx.de
        abgeschlossen werden.
      </p>

      <p className="text-sm text-muted-foreground">
        Siehe auch <a href="/agb" className="underline">§ 7 unserer AGB</a>.
      </p>
    </main>
    <Footer />
  </div>
);

export default Widerruf;
