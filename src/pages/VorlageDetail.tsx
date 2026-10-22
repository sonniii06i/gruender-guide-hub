import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  AlertTriangle, ArrowRight, CheckCircle2, ClipboardCopy, Download, FileText, FileType2, ListChecks, Lock, Sparkles, Unlock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PageHeader } from "@/components/landing/PageHeader";
import { FaqList } from "@/components/public/PublicBlocks";
import { VorlagenGateDialog } from "@/components/vorlagen/VorlagenGateDialog";
import { KATEGORIE_AKZENT, kategorieIcon } from "@/components/vorlagen/vorlagenIcons";
import { faqSchema, breadcrumbSchema } from "@/lib/freetools/schema";
import { useAuth } from "@/hooks/useAuth";
import { useAccess } from "@/hooks/useAccess";
import { KATEGORIE_BY_KEY, VORLAGEN_JE_KATEGORIE, VORLAGE_BY_SLUG } from "@/data/vorlagen";
import {
  freigabeAusUrl, freigabeLesen, freigabeMerken, freigabeParameterEntfernen, trackVorlagenFreigabe,
} from "@/lib/vorlagen/freigabe";
import { vorlageAlsPdf, vorlageAlsText, vorlageAlsWord, vorlageKopieren } from "@/lib/vorlagen/export";
import NotFound from "./NotFound";

const SITE = "https://gruenderx.de";

/** Wie viel vom Text vor der Freigabe sichtbar ist (Zeichen). */
const VORSCHAU_ZEICHEN = 1400;

export default function VorlageDetail() {
  const { slug = "" } = useParams();
  const vorlage = VORLAGE_BY_SLUG[slug];
  if (!vorlage) return <NotFound />;
  return <VorlageSeite key={slug} vorlage={vorlage} />;
}

function VorlageSeite({ vorlage }: { vorlage: (typeof VORLAGE_BY_SLUG)[string] }) {
  const location = useLocation();
  const { user } = useAuth();
  const { hasActiveSub, isAdmin } = useAccess();
  const abonnent = Boolean(user) && (hasActiveSub || isAdmin);

  const [frei, setFrei] = useState(() => Boolean(freigabeLesen()));
  const [gateOffen, setGateOffen] = useState(false);
  const [wordLaedt, setWordLaedt] = useState(false);
  const [gerade, setGerade] = useState(false);

  // Rückkehr aus der Bestätigungsmail: Freigabe merken, URL säubern.
  useEffect(() => {
    const f = freigabeAusUrl(location.search);
    if (!f) return;
    freigabeMerken(f.email, f.sig);
    setFrei(true);
    setGerade(true);
    setGateOffen(false);
    freigabeParameterEntfernen();
    trackVorlagenFreigabe(vorlage.slug);
    toast.success("E-Mail bestätigt – deine Vorlage ist frei.");
  }, [location.search, vorlage.slug]);

  const offen = frei || abonnent;
  const kategorie = KATEGORIE_BY_KEY[vorlage.kategorie];
  const Icon = kategorieIcon(kategorie?.icon ?? "");
  const verwandte = useMemo(
    () => VORLAGEN_JE_KATEGORIE[vorlage.kategorie].filter((v) => v.slug !== vorlage.slug).slice(0, 6),
    [vorlage],
  );

  const vorschau = useMemo(() => {
    if (offen) return vorlage.text;
    const schnitt = vorlage.text.slice(0, VORSCHAU_ZEICHEN);
    const letzteZeile = schnitt.lastIndexOf("\n");
    return letzteZeile > 400 ? schnitt.slice(0, letzteZeile) : schnitt;
  }, [offen, vorlage.text]);

  const standLesbar = useMemo(() => {
    const [j, m] = vorlage.stand.split("-");
    const monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    return `${monate[Number(m) - 1] ?? m} ${j}`;
  }, [vorlage.stand]);

  const mitFreigabe = (aktion: () => void | Promise<void>) => async () => {
    if (!offen) {
      setGateOffen(true);
      return;
    }
    await aktion();
  };

  const word = mitFreigabe(async () => {
    if (wordLaedt) return;
    setWordLaedt(true);
    try {
      await vorlageAlsWord(vorlage.text, vorlage.dateiname);
    } catch (err) {
      console.error("Word-Export:", err);
      toast.error("Die Word-Datei konnte nicht erstellt werden. Nimm bitte PDF oder Text.");
    } finally {
      setWordLaedt(false);
    }
  });
  const pdf = mitFreigabe(() => vorlageAlsPdf(vorlage.text, vorlage.dateiname));
  const txt = mitFreigabe(() => vorlageAlsText(vorlage.text, vorlage.dateiname));
  const kopieren = mitFreigabe(async () => {
    const ok = await vorlageKopieren(vorlage.text);
    if (ok) toast.success("Text in die Zwischenablage kopiert.");
    else toast.error("Kopieren hat nicht geklappt – lade stattdessen die Textdatei.");
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DigitalDocument",
      name: vorlage.titel,
      description: vorlage.kurz,
      url: `${SITE}/vorlagen/${vorlage.slug}`,
      inLanguage: "de",
      dateModified: `${vorlage.stand}-01`,
      isAccessibleForFree: true,
      encodingFormat: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf", "text/plain"],
      publisher: { "@type": "Organization", name: "GründerX", url: SITE },
      hasDigitalDocumentPermission: {
        "@type": "DigitalDocumentPermission",
        permissionType: "https://schema.org/ReadPermission",
        grantee: { "@type": "Audience", audienceType: "public" },
      },
    },
    faqSchema(vorlage.faqs),
    breadcrumbSchema([
      { name: "Start", url: `${SITE}/` },
      { name: "Vorlagen", url: `${SITE}/vorlagen` },
      { name: vorlage.titel, url: `${SITE}/vorlagen/${vorlage.slug}` },
    ]),
  ];

  const downloadKnoepfe = (
    <div className="flex flex-wrap gap-2">
      <Button size="lg" onClick={word} disabled={wordLaedt}>
        <FileType2 className="mr-2 h-4 w-4" aria-hidden="true" />
        {wordLaedt ? "Word wird erstellt …" : "Als Word (.docx)"}
      </Button>
      <Button size="lg" variant="outline" onClick={pdf}>
        <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Als PDF
      </Button>
      <Button size="lg" variant="outline" onClick={txt}>
        <FileText className="mr-2 h-4 w-4" aria-hidden="true" /> Als Text
      </Button>
      <Button size="lg" variant="ghost" onClick={kopieren}>
        <ClipboardCopy className="mr-2 h-4 w-4" aria-hidden="true" /> Kopieren
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={vorlage.seo.title}
        description={vorlage.seo.description}
        path={`/vorlagen/${vorlage.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="inhalt">
        <PageHeader
          width="max-w-4xl"
          crumbs={[
            { label: "Start", to: "/" },
            { label: "Vorlagen", to: "/vorlagen" },
            { label: kategorie?.titel ?? "Kategorie", to: `/vorlagen#${vorlage.kategorie}` },
            { label: vorlage.titel },
          ]}
          kicker={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/25 bg-brand-green-soft px-3 py-1 text-[13px] font-medium text-brand-green">
              {offen ? <Unlock className="h-3.5 w-3.5" aria-hidden="true" /> : <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
              {offen ? "Für dich freigeschaltet" : "Kostenlos gegen bestätigte E-Mail"}
            </span>
          }
          title={vorlage.titel}
          lead={<p>{vorlage.kurz}</p>}
        >
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-accent-blue" aria-hidden="true" /> {kategorie?.titel}
            </span>
            <span>Stand {standLesbar}</span>
            <span>Word · PDF · Text</span>
          </div>
          <div className="mt-6">{downloadKnoepfe}</div>
          {!offen && (
            <p className="mt-3 text-sm text-muted-foreground">
              Einmal die E-Mail-Adresse bestätigen – danach sind alle Vorlagen frei. Kein Konto, keine Zahlung.
            </p>
          )}
        </PageHeader>

        <section className="py-12">
          <div className="container grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr,320px]">
            <div className="min-w-0">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Vorschau</h2>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-words p-6 font-sans text-[14px] leading-relaxed text-foreground/90 sm:p-8">
                  {vorschau}
                </pre>
                {!offen && (
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-card via-card/95 to-card/0 px-6 pb-8 pt-24 text-center">
                    <Lock className="h-6 w-6 text-primary" aria-hidden="true" />
                    <p className="max-w-md text-sm text-muted-foreground">
                      Die vollständige Vorlage mit allen Abschnitten bekommst du nach Bestätigung deiner E-Mail-Adresse –
                      als Word, PDF oder Text.
                    </p>
                    <Button onClick={() => setGateOffen(true)}>
                      <Unlock className="mr-2 h-4 w-4" aria-hidden="true" /> Vorlage freischalten
                    </Button>
                  </div>
                )}
              </div>
              {offen && gerade && (
                <p className="mt-3 flex items-center gap-2 text-sm text-brand-green">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Bestätigt – jetzt oben Word, PDF oder Text wählen.
                </p>
              )}

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-brand-green" aria-hidden="true" /> Wofür die Vorlage passt
                  </h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {vorlage.wofuer.map((w) => (
                      <li key={w} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-blue" />{w}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <ListChecks className="h-5 w-5 text-accent-blue" aria-hidden="true" /> Das steht drin
                  </h2>
                  <ol className="space-y-1.5 text-sm text-muted-foreground">
                    {vorlage.enthaelt.map((e, i) => (
                      <li key={e} className="flex gap-2"><span className="w-5 flex-shrink-0 text-xs font-semibold text-foreground/60">{i + 1}.</span>{e}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" /> Das musst du wissen
                </h2>
                <ul className="space-y-2 text-sm text-foreground/85">
                  {vorlage.hinweise.map((h) => (
                    <li key={h} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />{h}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Stand {standLesbar}. Muster nach deutschem Recht; GründerX ist Software und leistet keine Rechts- oder Steuerberatung.
                </p>
              </div>

              <div className="mt-12">
                <h2 className="mb-5 text-xl font-semibold text-foreground">Häufige Fragen zu dieser Vorlage</h2>
                <FaqList items={vorlage.faqs} />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardContent className="p-5">
                  <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${KATEGORIE_AKZENT[vorlage.kategorie]}`}>
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="font-semibold text-foreground">Download</h2>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">
                    {offen
                      ? "Alle Formate frei. Platzhalter in eckigen Klammern ausfüllen, Unterschriften drunter – fertig."
                      : "E-Mail eingeben, Link klicken, Vorlage laden. Die Bestätigung gilt für alle Vorlagen."}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button onClick={word} disabled={wordLaedt}>
                      <FileType2 className="mr-2 h-4 w-4" aria-hidden="true" /> {wordLaedt ? "Word wird erstellt …" : "Word (.docx)"}
                    </Button>
                    <Button variant="outline" onClick={pdf}><Download className="mr-2 h-4 w-4" aria-hidden="true" /> PDF</Button>
                    <Button variant="outline" onClick={txt}><FileText className="mr-2 h-4 w-4" aria-hidden="true" /> Text (.txt)</Button>
                  </div>
                </CardContent>
              </Card>

              {verwandte.length > 0 && (
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Mehr aus {kategorie?.titel}</h2>
                  <ul className="space-y-1.5">
                    {verwandte.map((v) => (
                      <li key={v.slug}>
                        <Link to={`/vorlagen/${v.slug}`} className="group flex items-center gap-1.5 text-sm text-foreground/80 hover:text-accent-blue">
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          {v.titel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/vorlagen" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline">
                    Alle Vorlagen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              )}

              <Card className="border-accent-blue/20 bg-accent/40">
                <CardContent className="p-5">
                  <h2 className="font-semibold text-foreground">Vorlage mit Felix durchgehen</h2>
                  <p className="mb-3 mt-1 text-sm text-muted-foreground">
                    Der KI-Assistent von GründerX erklärt dir jede Klausel und hilft beim Anpassen – im Abo, zusammen mit allen Guides und Tools.
                  </p>
                  <Link to="/preise" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline">
                    Preise ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />

      <VorlagenGateDialog open={gateOffen} onOpenChange={setGateOffen} titel={vorlage.titel} slug={vorlage.slug} />
    </div>
  );
}
