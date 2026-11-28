import { Link } from "react-router-dom";
import { ArrowRight, FileDown } from "lucide-react";
import { SectionHead } from "@/components/marketing/Marketing";
import type { ToolTiefe as ToolTiefeDaten } from "@/data/toolTiefe";

/**
 * Textteil einer Tool-Landing (siehe data/toolTiefe.ts). Steht direkt unter dem Hero, alles im rohen HTML.
 * Aufbau nach Indexierungs-Standard C8: Frage als H2, eigenständige Antwort, Stand und Autor, dann Tabelle und Quellen.
 */
export const ToolTiefe = ({ t }: { t: ToolTiefeDaten }) => {
  const inhalt = [
    { id: "felder", label: t.tabelle.titel },
    { id: "danach", label: t.danach.titel },
    { id: "kosten", label: t.kosten.titel },
    { id: "einwaende", label: t.einwaende.titel },
    { id: "quellen", label: "Quellen" },
  ];
  return (
    <div className="space-y-14 md:space-y-20">
      <section aria-labelledby="kurzantwort" className="max-w-3xl">
        <h2 id="kurzantwort" className="text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary md:text-[2rem]">
          {t.antwort.frage}
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/85">{t.antwort.text}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Stand: <time dateTime={t.stand.iso}>{t.stand.text}</time> · Autor:{" "}
          <Link to="/impressum" className="font-medium text-foreground hover:underline">Sonni Buttke</Link>, Gründer von GründerX
        </p>
        <nav aria-label="Auf dieser Seite" className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-sm font-semibold text-primary">Auf dieser Seite</p>
          <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
            {inhalt.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`} className="inline-flex min-h-11 items-center text-[15px] text-accent-blue hover:underline">
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section aria-labelledby="felder" className="scroll-mt-28">
        <SectionHead eyebrow="Vordruck GewA 1" title={<span id="felder">{t.tabelle.titel}</span>} lead={t.tabelle.lead} />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">{t.tabelle.titel}, Stand {t.stand.text}</caption>
            <thead className="hidden bg-secondary/60 text-sm text-muted-foreground md:table-header-group">
              <tr>
                {t.tabelle.kopf.map((k) => (
                  <th key={k} scope="col" className="px-4 py-3.5 font-medium">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.tabelle.zeilen.map((r) => (
                <tr key={r.feld} className="block border-t border-border px-5 py-4 first:border-t-0 md:table-row md:px-0 md:py-0 md:first:border-t">
                  <th scope="row" className="block pb-1.5 font-semibold leading-snug md:table-cell md:w-[18%] md:px-4 md:py-4 md:align-top">{r.feld}</th>
                  <td className="block py-0.5 text-muted-foreground md:table-cell md:px-4 md:py-4 md:align-top">
                    <span className="font-medium text-foreground md:hidden">{t.tabelle.kopf[1]}: </span>{r.gefragt}
                  </td>
                  <td className="block py-0.5 text-foreground/85 md:table-cell md:px-4 md:py-4 md:align-top">
                    <span className="font-medium text-foreground md:hidden">{t.tabelle.kopf[2]}: </span>{r.achten}
                  </td>
                  <td className="block py-0.5 text-muted-foreground md:table-cell md:w-[22%] md:px-4 md:py-4 md:align-top">
                    <span className="font-medium text-foreground md:hidden">{t.tabelle.kopf[3]}: </span>{r.wizard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Stand: {t.stand.text}. {t.tabelle.fuss}
        </p>
      </section>

      <section aria-labelledby="danach" className="scroll-mt-28">
        <SectionHead eyebrow="Nach dem Amt" title={<span id="danach">{t.danach.titel}</span>} lead={t.danach.lead} />
        <ol className="space-y-3">
          {t.danach.punkte.map((p, i) => (
            <li key={p.titel} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold tabular-nums text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug">{p.titel}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="kosten" className="scroll-mt-28 max-w-3xl">
        <h2 id="kosten" className="text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary">{t.kosten.titel}</h2>
        {t.kosten.text.map((x) => (
          <p key={x} className="mt-3 text-pretty text-[15px] leading-relaxed text-foreground/85 md:text-base">{x}</p>
        ))}
        {t.vordruck && (
          <div className="mt-6 rounded-2xl border border-brand-green/25 bg-brand-green-soft p-5">
            <h3 className="font-semibold">{t.vordruck.titel}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.vordruck.text}</p>
            <a
              href={t.vordruck.href}
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-accent-blue hover:underline"
            >
              <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.vordruck.label}
            </a>
          </div>
        )}
      </section>

      <section aria-labelledby="einwaende" className="scroll-mt-28 max-w-3xl">
        <h2 id="einwaende" className="text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary">{t.einwaende.titel}</h2>
        <dl className="mt-5 divide-y divide-border border-y border-border">
          {t.einwaende.punkte.map((e) => (
            <div key={e.q} className="py-4">
              <dt className="font-semibold">{e.q}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{e.a}</dd>
            </div>
          ))}
        </dl>
        <Link to="/preise" className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent-blue hover:underline">
          Preise und Leistungen ansehen <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </section>

      <section aria-labelledby="quellen" className="scroll-mt-28 max-w-3xl">
        <h2 id="quellen" className="text-xl font-semibold tracking-tight text-primary">Quellen</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {t.quellen.map((q) => (
            <li key={q.href}>
              <a href={q.href} rel="noopener" className="text-accent-blue hover:underline">{q.label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          So entsteht diese Seite: Wir lesen jede Angabe an der verlinkten Quelle nach und schreiben das Datum dazu. GründerX ist eine Software
          und ersetzt keine Steuer- oder Rechtsberatung im Einzelfall.
        </p>
      </section>
    </div>
  );
};

export default ToolTiefe;
