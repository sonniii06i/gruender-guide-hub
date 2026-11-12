import { Fragment } from "react";
import { Link } from "react-router-dom";
import { LEXIKON_LINK_RE } from "@/data/lexikon/types";

/** Fließtext des Lexikons: reiner Text, interne Links als [[/pfad|Anker]]. */
export function LexikonText({ text }: { text: string }) {
  const teile: (string | { pfad: string; anker: string })[] = [];
  let pos = 0;
  for (const m of text.matchAll(LEXIKON_LINK_RE)) {
    const start = m.index ?? 0;
    if (start > pos) teile.push(text.slice(pos, start));
    teile.push({ pfad: m[1], anker: m[2] });
    pos = start + m[0].length;
  }
  if (pos < text.length) teile.push(text.slice(pos));
  return (
    <>
      {teile.map((t, i) =>
        typeof t === "string" ? (
          <Fragment key={i}>{t}</Fragment>
        ) : (
          <Link key={i} to={t.pfad} className="font-medium text-accent-blue hover:underline">
            {t.anker}
          </Link>
        ),
      )}
    </>
  );
}

export default LexikonText;
