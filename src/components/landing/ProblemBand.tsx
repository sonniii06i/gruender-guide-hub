import { Mascot } from "./Mascot";

const PAINS = [
  {
    title: "Welche Rechtsform denn jetzt?",
    body: "Einzelunternehmen, UG, GmbH, Holding. Jede Quelle sagt etwas anderes, und die Entscheidung kostet dich später fünfstellig.",
  },
  {
    title: "Der Fragebogen zur steuerlichen Erfassung",
    body: "Sieben Seiten Behördendeutsch, bei denen ein falsches Kreuz die Kleinunternehmerregelung für zwei Jahre festnagelt.",
  },
  {
    title: "LUCID, WEEE, GPSR, OSS",
    body: "Pflichten, von denen du erst erfährst, wenn die Abmahnung da ist – oder Amazon das Listing sperrt.",
  },
];

/**
 * Problem-Section: der Papierberg als Vorher-Bild.
 * Ersetzt das alte IntroBand, das nur eine Zeile Empathie hatte.
 */
export const ProblemBand = () => (
  <section className="py-20 md:py-24 bg-secondary/40 border-y border-border">
    <div className="container max-w-6xl">
      <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-center">
        <div className="flex justify-center">
          <Mascot
            name="felix-paperstack"
            alt="Felix steht ratlos vor einem meterhohen Stapel Formulare und Behördenpost"
            className="w-56 md:w-72"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-green mb-3">
            Das Problem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
            Gründen scheitert selten an der Idee.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Es scheitert an Formularen, Fristen und Pflichten, von denen dir
            vorher niemand erzählt hat.
          </p>

          <div className="mt-8 space-y-5">
            {PAINS.map((pain) => (
              <div key={pain.title} className="border-l-2 border-brand-green/40 pl-5">
                <h3 className="font-semibold text-foreground">{pain.title}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  {pain.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
