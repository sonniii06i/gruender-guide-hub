import { Mascot } from "./Mascot";

const PAINS = [
  {
    title: "Welche Rechtsform denn jetzt?",
    body: "Einzelunternehmen, UG, GmbH, Holding. Jede Quelle sagt etwas anderes, und die Entscheidung kostet dich später fünfstellig.",
  },
  {
    title: "Der Fragebogen zur steuerlichen Erfassung",
    body: "Sieben Seiten Behördendeutsch, bei denen ein falsches Kreuz beim Verzicht auf die Kleinunternehmerregelung dich mindestens fünf Jahre bindet.",
  },
  {
    title: "LUCID, WEEE, GPSR, OSS",
    body: "Pflichten, von denen du erst erfährst, wenn die Abmahnung da ist oder Amazon das Listing sperrt.",
  },
];

/**
 * Problem-Section: der Papierberg als Vorher-Bild.
 * Ersetzt das alte IntroBand, das nur eine Zeile Empathie hatte.
 */
export const ProblemBand = () => (
  <section className="py-20 md:py-28">
    <div className="container max-w-6xl">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
        <div className="relative flex justify-center">
          <div className="absolute inset-x-6 bottom-0 top-10 -z-10 rounded-[2rem] bg-secondary" aria-hidden="true" />
          <Mascot
            name="felix-paperstack"
            alt="Felix steht ratlos vor einem meterhohen Stapel Formulare und Behördenpost"
            className="w-60 md:w-80"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
            Gründen scheitert selten an der Idee.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Es scheitert an Formularen, Fristen und Pflichten, von denen dir
            vorher niemand erzählt hat.
          </p>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {PAINS.map((pain) => (
              <li key={pain.title} className="grid gap-1 py-5 sm:grid-cols-[14rem,1fr] sm:gap-6">
                <h3 className="font-semibold text-foreground">{pain.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{pain.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
