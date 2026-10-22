import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, FileText, MailCheck, Search, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HubNav } from "@/components/landing/HubNav";
import { PageHeader } from "@/components/landing/PageHeader";
import { FaqList } from "@/components/public/PublicBlocks";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/freetools/schema";
import { VORLAGEN, VORLAGEN_JE_KATEGORIE, VORLAGEN_KATEGORIEN } from "@/data/vorlagen";
import { freigabeAusUrl, freigabeLesen, freigabeMerken, freigabeParameterEntfernen } from "@/lib/vorlagen/freigabe";
import { KATEGORIE_AKZENT, kategorieIcon } from "@/components/vorlagen/vorlagenIcons";

const SITE = "https://gruenderx.de";

const faqs = [
  {
    q: "Sind die Vorlagen wirklich kostenlos?",
    a: "Ja, alle. Du gibst einmal deine E-Mail-Adresse an und bestätigst sie über den Link in der Mail. Danach kannst du jede Vorlage als Word, PDF oder Text herunterladen – ohne Konto, ohne Zahlung, so oft du willst.",
  },
  {
    q: "Warum muss ich die E-Mail-Adresse bestätigen?",
    a: "Damit niemand fremde Adressen eintragen kann und wir sicher wissen, dass die Vorlage bei dir ankommt. Die Bestätigung ist ein Klick; sie gilt für alle Vorlagen und nur für den Download – du bekommst dadurch keinen Newsletter.",
  },
  {
    q: "Darf ich die Vorlagen so verwenden?",
    a: "Die Vorlagen sind Muster nach deutschem Recht (Stand Oktober 2026), geschrieben für typische Gründer-Situationen. Passe sie an deinen Fall an und lass Verträge mit großem Volumen oder Sonderfällen prüfen. GründerX ersetzt keine Rechts- oder Steuerberatung.",
  },
  {
    q: "In welchem Format bekomme ich die Vorlage?",
    a: "Als Word-Datei (.docx) zum Bearbeiten, als PDF zum Ausdrucken und als reinen Text zum Einfügen – alle drei aus demselben Text. Zusätzlich kannst du den Text direkt in die Zwischenablage kopieren.",
  },
];

const schritte = [
  { icon: Search, title: "Vorlage auswählen", desc: `${VORLAGEN.length} Verträge, Schreiben und Formulare in ${VORLAGEN_KATEGORIEN.length} Kategorien, jede mit Hinweisen und FAQ.` },
  { icon: MailCheck, title: "E-Mail bestätigen", desc: "Adresse eingeben, Link in der Mail klicken – einmal für alle Vorlagen. Kein Konto, keine Werbung." },
  { icon: FileText, title: "Word, PDF oder Text", desc: "Download in drei Formaten, Platzhalter in eckigen Klammern selbst ausfüllen." },
];

export default function Vorlagen() {
  const location = useLocation();
  const [suche, setSuche] = useState("");
  const [frei, setFrei] = useState(() => Boolean(freigabeLesen()));

  // Weiterleitung von vorlage-bestaetigen ohne gültigen Slug landet hier.
  useEffect(() => {
    const f = freigabeAusUrl(location.search);
    if (!f) return;
    freigabeMerken(f.email, f.sig);
    setFrei(true);
    freigabeParameterEntfernen();
    toast.success("E-Mail bestätigt – alle Vorlagen sind für dich frei.");
  }, [location.search]);

  const treffer = useMemo(() => {
    const q = suche.trim().toLowerCase();
    if (!q) return null;
    return VORLAGEN.filter((v) =>
      [v.titel, v.kurz, v.slug, ...v.wofuer].join(" ").toLowerCase().includes(q),
    );
  }, [suche]);

  const jsonLd = [
    serviceSchema(
      "Kostenlose Vertragsvorlagen für Gründer",
      `${VORLAGEN.length} Vorlagen: GbR-Vertrag, Kaufverträge, Arbeitsverträge, NDA, AGB, Vollmachten und mehr. Kostenlos als Word, PDF und Text gegen bestätigte E-Mail-Adresse.`,
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Vorlagen", url: `${SITE}/vorlagen` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Vertragsvorlagen für Gründer",
      numberOfItems: VORLAGEN.length,
      itemListElement: VORLAGEN.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: v.titel,
        url: `${SITE}/vorlagen/${v.slug}`,
      })),
    },
  ];

  const karte = (v: (typeof VORLAGEN)[number]) => {
    const Icon = kategorieIcon(VORLAGEN_KATEGORIEN.find((k) => k.key === v.kategorie)?.icon ?? "");
    return (
      <Link key={v.slug} to={`/vorlagen/${v.slug}`} className="group block">
        <Card className="h-full transition-[border-color,box-shadow] group-hover:border-accent-blue/35 group-hover:shadow-soft">
          <CardContent className="flex h-full gap-4 p-5">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${KATEGORIE_AKZENT[v.kategorie]}`}>
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-blue">{v.titel}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{v.kurz}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue">
                Word · PDF · Text
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${VORLAGEN.length} kostenlose Vertragsvorlagen für Gründer (Word & PDF) | GründerX`}
        description={`GbR-Vertrag, Kaufvertrag, Arbeitsvertrag, NDA, AGB, Vollmacht: ${VORLAGEN.length} Vorlagen nach deutschem Recht, kostenlos als Word, PDF und Text. Nur E-Mail bestätigen, kein Konto.`}
        path="/vorlagen"
        type="website"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt">
        <PageHeader
          width="max-w-5xl"
          crumbs={[{ label: "Start", to: "/" }, { label: "Vorlagen" }]}
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {frei ? "Deine E-Mail ist bestätigt – alles frei" : `${VORLAGEN.length} Vorlagen, kostenlos gegen bestätigte E-Mail`}
            </span>
          }
          title="Vertragsvorlagen für Gründer"
          lead={
            <p>
              GbR-Vertrag, Kaufverträge, Arbeitsverträge, NDA, AGB, Vollmachten und Schreiben ans Finanzamt – nach
              deutschem Recht, mit Platzhaltern zum Ausfüllen. Einmal die E-Mail-Adresse bestätigen, dann jede Vorlage als
              Word, PDF oder Text herunterladen. Kein Konto, keine Zahlung.
            </p>
          }
        >
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              placeholder="Vorlage suchen, z. B. „GbR“, „Kündigung“, „NDA“ …"
              className="h-11 pl-9"
              aria-label="Vorlagen durchsuchen"
            />
          </div>
        </PageHeader>

        {treffer ? (
          <section className="py-12">
            <div className="container max-w-5xl px-4">
              <h2 className="mb-5 text-xl font-semibold text-foreground">
                {treffer.length === 0 ? "Keine Vorlage gefunden" : `${treffer.length} ${treffer.length === 1 ? "Treffer" : "Treffer"} für „${suche.trim()}“`}
              </h2>
              {treffer.length === 0 ? (
                <p className="text-muted-foreground">
                  Versuch ein anderes Wort – oder schreib uns über die{" "}
                  <Link to="/kontakt" className="text-primary hover:underline">Kontaktseite</Link>, welche Vorlage dir fehlt.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{treffer.map(karte)}</div>
              )}
            </div>
          </section>
        ) : (
          <>
            <section className="border-b border-border/70 bg-card py-8">
              <div className="container max-w-5xl px-4">
                <nav aria-label="Kategorien" className="flex flex-wrap gap-2">
                  {VORLAGEN_KATEGORIEN.map((k) => (
                    <a
                      key={k.key}
                      href={`#${k.key}`}
                      className="press inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground/80 hover:border-accent-blue/40 hover:text-foreground"
                    >
                      {k.titel}
                      <span className="text-xs text-muted-foreground">{VORLAGEN_JE_KATEGORIE[k.key].length}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </section>

            {VORLAGEN_KATEGORIEN.map((k) => {
              const liste = VORLAGEN_JE_KATEGORIE[k.key];
              if (liste.length === 0) return null;
              const Icon = kategorieIcon(k.icon);
              return (
                <section key={k.key} id={k.key} className="scroll-mt-24 py-12 odd:bg-background even:bg-secondary/40">
                  <div className="container max-w-5xl px-4">
                    <div className="mb-6 flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${KATEGORIE_AKZENT[k.key]}`}>
                        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">{k.titel}</h2>
                        <p className="text-sm text-muted-foreground">{k.kurz}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{liste.map(karte)}</div>
                  </div>
                </section>
              );
            })}
          </>
        )}

        <section className="border-y border-border/70 bg-card py-16">
          <div className="container max-w-4xl px-4">
            <h2 className="mb-10 text-center text-2xl font-semibold text-foreground md:text-3xl">So funktioniert's</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {schritte.map((st, i) => (
                <div key={st.title} className="text-center">
                  <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <st.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">{st.title}</h3>
                  <p className="text-sm text-muted-foreground">{st.desc}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 flex max-w-2xl items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" aria-hidden="true" />
              Jede Vorlage nennt Stand und Rechtsgrundlagen und endet mit dem Hinweis, dass sie ein Muster ist. Für
              Sonderfälle oder große Summen: prüfen lassen – GründerX ist Software, keine Rechtsberatung.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-3xl px-4">
            <h2 className="mb-8 text-center text-2xl font-semibold text-foreground md:text-3xl">Häufige Fragen</h2>
            <FaqList items={faqs} />
          </div>
        </section>

        <section className="border-t border-border/70 bg-secondary/50 py-16">
          <div className="container max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">Vorlage ausgefüllt – und jetzt?</h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Mit GründerX bekommst du die Schritt-für-Schritt-Guides zur Gründung, die Steuer- und Rechner-Tools und den
              KI-Assistenten Felix, der deine Vorlage mit dir durchgeht. Die Vorlagen sind dein Einstieg.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/preise">
                <Button size="lg">
                  Preise &amp; Leistungen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/gratis-tools">
                <Button size="lg" variant="outline">Gratis-Tools ansehen</Button>
              </Link>
            </div>
            <div className="mx-auto max-w-5xl px-0 text-left">
              <HubNav show={["tools", "guides", "ratgeber"]} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
