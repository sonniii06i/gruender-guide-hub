import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const AGB = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container max-w-3xl pt-32 pb-24 prose prose-slate prose-headings:scroll-mt-24">
      <h1 className="text-4xl font-extrabold mb-2">Allgemeine Geschäftsbedingungen</h1>
      <p className="text-sm text-muted-foreground">Stand: Mai 2026 · Version 2.0</p>

      <div className="rounded-xl border-2 border-warning/40 bg-warning/5 p-4 my-6 text-sm">
        <strong>Wichtiger Hinweis:</strong> GründerX ist <em>keine Rechts- oder Steuerberatung</em>.
        Die Plattform liefert Orientierung, Strukturhilfe und KI-gestützte Erstanalysen –
        verbindliche Beratung übernehmen weiter Steuerberater:innen und Rechtsanwält:innen.
        Beachte das insbesondere bei den Funktionen Felix-Chat, Steuer-Cockpit und Rechtsform-Wizard.
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 1 Geltungsbereich, Vertragspartner, Begriffe</h2>
      <p>(1) Diese AGB regeln die Nutzung der unter <strong>gründerx.de</strong> bzw. <strong>gruenderx.de</strong> erreichbaren Plattform („GründerX"), inkl. aller Subdomains und mobilen Versionen.</p>
      <p>
        (2) Anbieter und Vertragspartner ist:<br />
        Sonni Buttke, Pinguinweg 18, 22527 Hamburg<br />
        E-Mail: <a href="mailto:support@gründerx.de">support@gründerx.de</a> · Telefon: +49 175 4220573
      </p>
      <p>(3) Vertragssprache ist Deutsch. AGB des/der Kund:in werden nur Bestandteil, wenn ausdrücklich bestätigt.</p>
      <p>(4) <strong>Verbraucher</strong> ist gem. § 13 BGB jede natürliche Person, die nicht überwiegend für gewerbliche oder selbstständige Zwecke handelt; <strong>Unternehmer</strong> sind alle, die in Ausübung gewerblicher oder selbstständiger Tätigkeit handeln (§ 14 BGB) – inkl. Gründer:innen vor HR-Eintrag.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 2 Leistungen von GründerX</h2>
      <p>(1) GründerX umfasst – je nach gebuchtem Tarif – die folgenden Funktionen:</p>
      <ul>
        <li><strong>Playbooks</strong> für GmbH-, UG-, Holding-, Einzelunternehmen-, Kleinunternehmer- und internationale Gründungen (US-LLC etc.)</li>
        <li><strong>Felix-Chat</strong> (KI-Assistent auf Basis von Google Gemini via Lovable AI Gateway)</li>
        <li><strong>Steuer-Cockpit</strong> (Frist-Kalender, IAB-Rechner, Quartals-Schätzung, Brutto/Netto)</li>
        <li><strong>Rechtsform-Wizard</strong></li>
        <li><strong>Anbieter-Vergleich</strong> mit Stärken/Schwächen-Analyse aus Reddit + DTC-Communities (90+ Anbieter, monatliches Audit)</li>
        <li><strong>Notar-Finder</strong> (OpenStreetMap) inkl. Notar-Vorbereitungs-Fragebogen</li>
        <li><strong>Firmenname-Verfügbarkeitsprüfung</strong> (NorthData + GLEIF)</li>
      </ul>
      <p>(2) Inhalte werden laufend aktualisiert. Wir behalten uns vor, Funktionen zu ergänzen, anzupassen oder einzustellen, sofern der Kernumfang erhalten bleibt.</p>
      <p>
        (3) <strong>Keine Rechts- oder Steuerberatung:</strong> Felix-Chat, Wizard, Cockpit und alle weiteren Funktionen erbringen keine Rechtsdienstleistung
        i. S. d. RDG und keine geschäftsmäßige Hilfeleistung in Steuersachen i. S. d. StBerG. Konkrete Beratung übernehmen
        zugelassene Steuerberater:innen und Rechtsanwält:innen.
      </p>
      <p>
        (4) <strong>Felix-Chat (KI):</strong> Antworten werden durch ein KI-Modell generiert und können fehlerhaft, unvollständig oder veraltet sein.
        Du musst Antworten kritisch prüfen, insbesondere bei Steuer-, Rechts- und Compliance-Fragen. Die Verarbeitung erfolgt teilweise auf
        Servern in den USA (siehe Datenschutzerklärung).
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 3 Vertragsschluss & Konto</h2>
      <p>(1) Die Darstellung der Leistungen auf gründerx.de stellt kein verbindliches Angebot dar.</p>
      <p>(2) Mit Klick auf „Registrieren" und Bestätigen der Bestellung gibst du ein verbindliches Angebot ab. Die Annahme erfolgt durch Bestätigungs-E-Mail oder Aktivierung des Zugangs.</p>
      <p>(3) Pro natürlicher Person/Unternehmen ist nur ein Konto zulässig. Login-Daten sind vertraulich zu behandeln; eine Weitergabe an Dritte ist untersagt.</p>
      <p>(4) Du musst mindestens 18 Jahre alt und voll geschäftsfähig sein.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 4 Tarife & Preise</h2>
      <p>(1) GründerX richtet sich überwiegend an Unternehmer:innen i. S. d. § 14 BGB. Tarife werden daher als Netto-Preise zzgl. der gesetzlichen Umsatzsteuer ausgewiesen:</p>
      <ul>
        <li><strong>GründerX Solo</strong>: 84,03 € netto / Monat (99,99 € brutto inkl. 19 % USt). Voller Zugriff auf alle GründerX-Funktionen.</li>
        <li><strong>Founder Bundle</strong> (GründerX + AnwaltX): 151,25 € netto / Monat (179,99 € brutto inkl. 19 % USt). Zusätzlich: AnwaltX-Vertragsprüfung, Abmahn-Schutz, Streitfall-Hilfe.</li>
      </ul>
      <p>(2) Verbraucher:innen i. S. d. § 13 BGB sehen den Brutto-Endpreis im Checkout entsprechend § 1 Abs. 1 PAngV.</p>
      <p>(3) AnwaltX-Leistungen sind ausschließlich im Bundle erhältlich und werden durch eine separate Partner-Kanzlei erbracht (Details siehe AnwaltX-Bedingungen).</p>
      <p>(4) Bei Unternehmer:innen mit gültiger ausländischer USt-ID innerhalb der EU erfolgt die Rechnung steuerfrei nach § 3a Abs. 2 UStG (Reverse-Charge).</p>
      <p>(5) Sondertarife, Coupons oder Coop-Deals werden – sofern auf der Plattform ausgewiesen – mit konkretem Ablaufdatum angegeben.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 5 Zahlung, Verzug, Rechnungen</h2>
      <p>(1) Die Zahlung erfolgt monatlich im Voraus über <strong>Stripe Payments Europe Ltd.</strong> per Kreditkarte oder SEPA-Lastschrift. Für die Bezahlung gelten ergänzend die Stripe-AGB.</p>
      <p>(2) Rechnungen erhältst du elektronisch per E-Mail (im Konto unter „Rechnungen" abrufbar). Eine separate Papier-Rechnung erfolgt nicht.</p>
      <p>(3) Bei Zahlungsverzug von Unternehmer:innen schulden diese Verzugszinsen i. H. v. 9 Prozentpunkten über dem Basiszinssatz, bei Verbraucher:innen 5 Prozentpunkten. Die Geltendmachung weiterer Schäden bleibt vorbehalten.</p>
      <p>(4) Bei wiederholt fehlgeschlagener Lastschrift/Kreditkarten-Belastung sind wir berechtigt, den Zugang zu sperren bis zur Begleichung des Rückstands.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 6 Vertragslaufzeit & Kündigung</h2>
      <p>(1) Das Abo läuft monatlich und verlängert sich automatisch, sofern es nicht bis zum letzten Tag des laufenden Abrechnungszeitraums gekündigt wird.</p>
      <p>(2) Kündigung erfolgt komfortabel über den „Abo kündigen"-Button im Konto-Bereich. Alternativ per E-Mail an <a href="mailto:support@gründerx.de">support@gründerx.de</a> oder Brief.</p>
      <p>(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt für beide Seiten unberührt.</p>
      <p>(4) Bereits bezahlte Beträge werden bei monatlicher Kündigung nicht anteilig erstattet – der Zugang besteht bis zum Ende des Abrechnungszeitraums.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 7 Widerrufsrecht für Verbraucher</h2>
      <p>Verbraucher:innen haben gemäß § 312g BGB ein 14-tägiges Widerrufsrecht.</p>
      <div className="rounded-xl border border-border bg-secondary/40 p-4 my-3 text-sm">
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

      <div className="rounded-xl border border-border bg-secondary/40 p-4 my-3 text-sm">
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
      <p>Das Widerrufsrecht erlischt vorzeitig, wenn du ausdrücklich zugestimmt hast, dass wir mit der Leistungserbringung vor Ablauf der Widerrufsfrist beginnen, und du gleichzeitig deine Kenntnis davon bestätigt hast, dass du durch deine Zustimmung mit Beginn der Vertragsausführung dein Widerrufsrecht verlierst (§ 356 Abs. 4 BGB).</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 8 Pflichten & Verbote bei der Nutzung</h2>
      <p>(1) Du verpflichtest dich, GründerX nur für legale Zwecke zu nutzen. Insbesondere ist untersagt:</p>
      <ul>
        <li>automatisierte Abfragen, Scraping oder Reverse-Engineering der Plattform und Edge Functions</li>
        <li>Weitergabe von Login-Daten oder gleichzeitige Nutzung durch mehrere Personen</li>
        <li>Eingabe rechtswidriger Inhalte in Felix-Chat oder Notiz-Felder (z. B. Beleidigungen, Urheberrechts-Verletzungen, Hassrede)</li>
        <li>missbräuchliche Nutzung der KI für Zwecke außerhalb des Gründungs-/Steuer-/E-Commerce-Kontexts</li>
        <li>Weiterverkauf, Vermietung oder kommerzielle Wiederverwertung der Inhalte ohne unsere ausdrückliche Zustimmung</li>
      </ul>
      <p>(2) Bei Verstößen sind wir berechtigt, das Konto vorübergehend zu sperren oder fristlos zu kündigen.</p>
      <p>
        (3) <strong>Garantie für Daten Dritter:</strong> Bei Eingabe personenbezogener Daten Dritter
        (insb. Mit-Gesellschafter:innen, Geschäftsführer:innen, Familienangehörige im Notar-Vorbereitungs-Modul)
        garantierst du, deren informierte Einwilligung nach Art. 6 Abs. 1 lit. a / Art. 13 DSGVO eingeholt
        zu haben oder über eine andere Rechtsgrundlage zu verfügen. Du stellst uns von allen Ansprüchen Dritter,
        Bußgeldern, Verfahrenskosten und angemessenen Anwaltskosten frei, die aus einem Verstoß gegen diese
        Garantie resultieren.
      </p>
      <p>
        (4) Bei schuldhaftem Verstoß gegen Pflichten aus Abs. 1 bist du zum Ersatz des hieraus entstehenden
        Schadens (einschließlich entgangener Lizenzgebühren bei Mehrfach-Nutzung) verpflichtet.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 9 Inhalte, Nutzungsrechte, KI-Antworten</h2>
      <p>(1) Alle Texte, Playbooks, Anbieter-Analysen, UI-Designs und Markenzeichen sind urheberrechtlich geschützt. Eine Vervielfältigung oder Veröffentlichung – auch in Auszügen – ist nur mit unserer Zustimmung gestattet.</p>
      <p>(2) Du erhältst während der Vertragslaufzeit ein einfaches, nicht übertragbares Nutzungsrecht an den Inhalten zur eigenen, nicht-öffentlichen Nutzung im Rahmen deiner Gründungs-Vorbereitung.</p>
      <p>(3) <strong>KI-generierte Felix-Antworten:</strong> Diese stehen dir frei zur Verfügung, du nutzt sie auf eigene Verantwortung. Eine Garantie für Richtigkeit, Aktualität oder Vollständigkeit übernehmen wir nicht.</p>
      <p>(4) Inhalte, die du selbst in die Plattform einfügst (z. B. Notiz-Felder, Notar-Daten), bleiben in deinem Eigentum. Wir verarbeiten sie nur zur Vertragserfüllung (siehe Datenschutzerklärung).</p>
      <p>
        (5) <strong>AI-Act-Transparenz (VO (EU) 2024/1689):</strong> Felix-Chat ist ein KI-System i. S. d. Art. 3 Nr. 1 AI Act.
        Du wirst beim Start jeder Konversation darauf hingewiesen, dass du mit einer KI interagierst; KI-Outputs sind im
        Interface mit „Felix (KI)" gekennzeichnet. Felix ist <em>kein</em> Hochrisiko-System i. S. d. Anhang III, da er keine
        bindenden Entscheidungen über Beschäftigung, Kreditwürdigkeit, Bildung oder Strafverfolgung trifft. Wir nutzen das
        Modell als <em>Deployer</em> i. S. d. Art. 3 Nr. 4; Modell-Anbieter ist Google LLC (über das Lovable AI Gateway).
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 10 Verfügbarkeit & Wartung</h2>
      <p>(1) Wir bemühen uns um eine möglichst hohe Verfügbarkeit. Eine Verfügbarkeit von 99,5 % im Jahresmittel wird angestrebt, jedoch nicht garantiert.</p>
      <p>(2) Wartungsfenster werden – soweit möglich – außerhalb der Hauptnutzungszeiten gelegt und im Voraus angekündigt.</p>
      <p>(3) Externe Abhängigkeiten (NorthData, GLEIF, OpenStreetMap, Lovable AI Gateway, Stripe) sind außerhalb unseres Einflussbereichs. Bei deren Ausfall können einzelne Funktionen vorübergehend eingeschränkt sein.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 11 Haftung</h2>
      <p>(1) Wir haften unbegrenzt für Schäden aus Verletzung von Leben, Körper oder Gesundheit sowie bei Vorsatz oder grober Fahrlässigkeit.</p>
      <p>
        (2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) ist unsere Haftung
        auf den vorhersehbaren, vertragstypischen Schaden begrenzt – <strong>höchstens jedoch auf das Zwölffache der zum
        Schadenszeitpunkt geltenden monatlichen Vergütung pro Schadensfall und insgesamt 5.000 € pro Kalenderjahr</strong>.
      </p>
      <p>(3) Eine Haftung für leicht fahrlässige Verletzung nicht-wesentlicher Pflichten ist ausgeschlossen, soweit gesetzlich zulässig.</p>
      <p>
        (4) <strong>Spezifische Anwendung auf KI- und Datenfunktionen:</strong> Die Haftungsbeschränkungen aus Abs. 2–3 gelten
        entsprechend für Schäden aus
      </p>
      <ul>
        <li>fehlerhaften, unvollständigen oder veralteten KI-Antworten von Felix</li>
        <li>Steuer- oder Rechtsentscheidungen, die du auf Basis von Cockpit, Wizard, Playbooks oder Felix-Chat triffst</li>
        <li>Daten im Anbieter-Vergleich (Preise, Konditionen, Rabatt-Codes) – diese stammen teilweise aus automatisierten Audit-Routinen und sind vor verbindlichem Abschluss selbst zu prüfen</li>
      </ul>
      <p>
        – soweit nicht Vorsatz, grobe Fahrlässigkeit, Garantieübernahme, Personenschäden oder zwingende Haftung
        nach ProdHaftG bzw. Art. 82 DSGVO betroffen sind. Daten-Eingabefehler des/der Nutzer:in sind kein
        von uns zu vertretender Schaden.
      </p>
      <p>(5) Die Haftungsbeschränkungen gelten nicht im Anwendungsbereich des Produkthaftungsgesetzes, bei Übernahme einer ausdrücklichen Garantie oder im Rahmen zwingender DSGVO-Haftung.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 12 Datenschutz</h2>
      <p>Hinweise zur Datenverarbeitung findest du in unserer separaten <a href="/datenschutz">Datenschutzerklärung</a>.</p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 13 Änderungen dieser AGB</h2>
      <p>(1) Wir behalten uns vor, diese AGB anzupassen, soweit dies aus rechtlichen oder funktionalen Gründen erforderlich ist und keine Kernpflichten zum Nachteil der Kund:innen geändert werden.</p>
      <p>(2) Wir benachrichtigen dich mindestens 6 Wochen vor Inkrafttreten per E-Mail über geplante Änderungen.</p>
      <p>
        (3) <strong>Gegenüber Verbraucher:innen</strong> werden Änderungen nur wirksam, wenn du ihnen
        aktiv zustimmst (z. B. per Klick im Konto-Bereich oder per E-Mail-Antwort). Stimmst du nicht zu,
        gilt der bisherige Vertrag bis zur ordentlichen Kündigung weiter; wir behalten uns ein eigenes
        Sonderkündigungsrecht zum Inkrafttretens-Datum vor (gem. BGH-Urteil vom 27.04.2021, XI ZR 26/20).
      </p>
      <p>
        (4) Bei reinen Anpassungen, die kein Äquivalenzverhältnis berühren (z. B. neue Funktionen, redaktionelle
        Klarstellungen, gesetzlich erforderliche Anpassungen), gilt eine Zustimmungsfiktion mit 6-Wochen-Vorankündigung
        und 6-Wochen-Widerspruchsfrist; auf das Widerspruchs- und Sonderkündigungsrecht weisen wir gesondert hin.
      </p>
      <p>
        (5) Gegenüber Unternehmer:innen i. S. d. § 14 BGB bleibt die Zustimmungsfiktion nach Abs. 4 auch für
        sonstige AGB-Anpassungen anwendbar.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 14 Affiliate-Links / Werbe-Hinweise</h2>
      <p>
        (1) GründerX verlinkt im Rahmen der Anbieter-Vergleiche, Playbooks/Guides und Tools auf
        externe Anbieter (z. B. Banking, Buchhaltung, Versand, Shop-Systeme, Domains). Ein Teil
        dieser Links sind <strong>Partner-Links / Affiliate-Links</strong> (z. B. über Impact, AWIN,
        TradeTribe oder direkte Partnerprogramme der Anbieter).
      </p>
      <p>
        (2) Wenn du über einen solchen Affiliate-Link einen Vertrag mit dem verlinkten Anbieter
        abschließt, kann GründerX hierfür eine <strong>Vergütung (Provision oder Pauschale)</strong>
        erhalten. Für dich entstehen dadurch <strong>keinerlei Mehrkosten</strong> – die Konditionen
        sind identisch zu einem Direkt-Aufruf der Anbieter-Seite.
      </p>
      <p>
        (3) Affiliate-Vergütungen beeinflussen <strong>nicht</strong> unsere redaktionelle Bewertung,
        die Reihenfolge im Vergleich oder die Pro-/Contra-Listen. Bewertungen entstehen aus
        Foren-Auswertung (Reddit, DTC-Slack, E-Commerce-Communities), öffentlichen Datenquellen und
        eigenen Recherchen.
      </p>
      <p>
        (4) Anbieter, die in Tools/Playbooks bevorzugt empfohlen werden (z. B. IONOS bei Domains,
        Shopify bei Shop-Systemen), können in einer kommerziellen Partner-Beziehung zu GründerX
        stehen. Die Eignung des Anbieters für deinen Use-Case prüfst du immer eigenverantwortlich –
        Empfehlungen von GründerX ersetzen keine individuelle Beratung.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-3">§ 15 Schlussbestimmungen</h2>
      <p>(1) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Verbraucher:innen mit gewöhnlichem Aufenthalt in der EU genießen den Schutz zwingender Vorschriften ihres Heimatstaats.</p>
      <p>(2) Erfüllungsort und – soweit zulässig – ausschließlicher Gerichtsstand ist Hamburg, sofern der/die Kund:in Kaufmann/-frau, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.</p>
      <p>(3) Online-Streitbeilegung: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>. An einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nehmen wir nicht teil.</p>
      <p>(4) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.</p>

      <p className="mt-8 text-sm text-muted-foreground">Stand: Mai 2026 · Version 2.0</p>
    </main>
    <Footer />
  </div>
);

export default AGB;
