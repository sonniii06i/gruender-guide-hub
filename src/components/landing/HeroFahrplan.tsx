import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Hero-Szene: ein Gruendungs-Fahrplan, wie Felix ihn aus einer kurzen
 * Beschreibung baut. Beispiel: UG, die Elektronik auf Amazon verkauft.
 * Fristen und Paragrafen sind die gesetzlichen; die Hinweise sind
 * allgemeine Informationen, keine Steuer- oder Rechtsberatung.
 */

type Status = "erledigt" | "jetzt" | "offen";
type Schritt = { titel: string; frist: string; norm: string; status: Status; hinweis: string };

const SCHRITTE: Schritt[] = [
  {
    titel: "Rechtsform: UG (haftungsbeschränkt)",
    frist: "vor dem Start",
    norm: "§ 5a GmbHG",
    status: "erledigt",
    hinweis: "Haftung auf das Gesellschaftsvermögen begrenzt. Ein Viertel des Jahresüberschusses geht in die Rücklage, bis die UG auf 25.000 € Stammkapital aufgestockt ist.",
  },
  {
    titel: "Gewerbe anmelden",
    frist: "vor dem Start",
    norm: "§ 14 GewO",
    status: "erledigt",
    hinweis: "Online beim Gewerbeamt deiner Stadt. Das Amt gibt die Anmeldung danach an das Finanzamt weiter.",
  },
  {
    titel: "Fragebogen zur steuerlichen Erfassung",
    frist: "1 Monat nach Gründung",
    norm: "§ 138 AO",
    status: "jetzt",
    hinweis: "Beantrage die USt-IdNr. gleich im Fragebogen mit. Amazon fragt bei der Verkäuferregistrierung danach.",
  },
  {
    titel: "Verpackungsregister LUCID",
    frist: "vor dem ersten Verkauf",
    norm: "§ 6 VerpackDG",
    status: "offen",
    hinweis: "Gilt auch für Versandkartons. Dazu kommt ein Vertrag mit einem dualen System.",
  },
  {
    titel: "WEEE-Registrierung bei der stiftung ear",
    frist: "vor dem ersten Angebot",
    norm: "§ 6 ElektroG",
    status: "offen",
    hinweis: "Amazon muss die WEEE-Nummer prüfen, bevor Elektronik von dir online gehen darf.",
  },
  {
    titel: "OSS-Verfahren beim BZSt",
    frist: "vor Quartalsbeginn",
    norm: "§ 18j UStG",
    status: "offen",
    hinweis: "Nötig, sobald du an Privatkunden in anderen EU-Ländern mehr als 10.000 € im Jahr verkaufst.",
  },
];

const ERLEDIGT = SCHRITTE.filter((s) => s.status === "erledigt").length;
const START = SCHRITTE.findIndex((s) => s.status === "jetzt");

export const HeroFahrplan = () => {
  const [offen, setOffen] = useState(START);

  return (
    <figure className="gx-plan">
      <div className="gx-plan-fenster">
        <div className="gx-plan-kopf">
          <img src="/mascots/felix-face-64.webp" alt="" width={36} height={36} className="gx-plan-felix" decoding="async" />
          <div className="min-w-0">
            <p className="gx-plan-titel">Dein Fahrplan</p>
            <p className="gx-plan-fall">UG, verkauft Elektronik auf Amazon</p>
          </div>
          <p className="gx-plan-stand" aria-label={`${ERLEDIGT} von ${SCHRITTE.length} Schritten erledigt`}>
            <span className="tabular">{ERLEDIGT}/{SCHRITTE.length}</span>
            <span className="gx-plan-balken" aria-hidden="true">
              <span style={{ width: `${(ERLEDIGT / SCHRITTE.length) * 100}%` }} />
            </span>
          </p>
        </div>

        <ol className="gx-plan-liste">
          {SCHRITTE.map((s, i) => {
            const auf = i === offen;
            return (
              <li key={s.titel} className="gx-plan-schritt" data-status={s.status} data-offen={auf || undefined}>
                <span className="gx-plan-knoten" aria-hidden="true">
                  {s.status === "erledigt" ? <Check strokeWidth={3} /> : i + 1}
                </span>
                <button
                  type="button"
                  className="gx-plan-zeile"
                  aria-expanded={auf}
                  aria-controls={`plan-hinweis-${i}`}
                  onClick={() => setOffen(auf ? -1 : i)}
                >
                  <span className="gx-plan-name">
                    {s.titel}
                    {s.status === "erledigt" && <span className="sr-only"> (erledigt)</span>}
                    {s.status === "jetzt" && <span className="gx-plan-jetzt">ist dran</span>}
                  </span>
                  <span className="gx-plan-frist">
                    <span>{s.frist}</span>
                    <span className="gx-plan-norm">{s.norm}</span>
                  </span>
                </button>
                <div id={`plan-hinweis-${i}`} className="gx-plan-hinweis" hidden={!auf}>
                  <p>{s.hinweis}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <figcaption className="gx-plan-caption">
        Beispiel-Fahrplan. Fristen nach Gesetz; GründerX ist Software und ersetzt keine Steuer- oder Rechtsberatung.
      </figcaption>
    </figure>
  );
};
