import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TOPICS = [
  "Fragebogen zur steuerlichen Erfassung",
  "USt-Voranmeldung",
  "Rechnungs- & Buchhaltungs-Setup",
  "OSS, LUCID, WEEE",
  "Rechtsform & Anbieterwahl",
];

export const Assistant = () => (
  <section className="pb-20 md:pb-28">
    <div className="container max-w-6xl">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink text-primary-foreground shadow-soft">
        <div className="pointer-events-none absolute inset-0 bg-dots-light" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-blue/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-8 p-8 md:grid-cols-[1fr,auto] md:p-14">
          <div>
            <p className="mb-4 text-sm font-medium text-brand-green-glow">KI-Assistent</p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
              Lerne Felix kennen, deinen persönlichen Gründungs-Co-Pilot.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
              Felix sagt dir, welche Rechtsform, welche Tools und welche Anbieter zu dir passen. Gebaut für
              E-Commerce und Creator-Business, gestützt auf die Guides und Tools von GründerX.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Themen, bei denen Felix begleitet">
              {TOPICS.map((t) => (
                <li
                  key={t}
                  className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-primary-foreground/85"
                >
                  {t}
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-9 h-12 rounded-xl bg-card px-6 font-semibold text-primary shadow-none hover:bg-card/90"
            >
              <Link to="/auth?mode=signup">
                Kostenlos starten <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="relative mx-auto flex items-center justify-center md:mx-0">
            <img
              src="/mascots/felix-present.webp"
              srcSet="/mascots/felix-present.webp 1x, /mascots/felix-present@2x.webp 2x"
              alt="Felix, dein KI-Gründungs-Copilot, erklärt den nächsten Schritt"
              loading="lazy"
              decoding="async"
              width={288}
              height={288}
              className="relative h-56 w-56 object-contain drop-shadow-2xl md:h-72 md:w-72"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
