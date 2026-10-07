// Gründungszuschuss nach §§ 93, 94 SGB III – Prüfung und Rechner.
// Rechtsstand 07.10.2026: Gesetzestext (gesetze-im-internet.de, zuletzt geändert
// 24.07.2026) und Fachliche Weisungen GZ der BA (Stand 13.09.2023, dok_ba024940).
// Die 2024 geplante Senkung auf 90 Tage / eine Förderphase ist NICHT Gesetz geworden.

export const GZ = {
  zuschlag: 300, // € pro Monat, Phase 1 und 2 (§ 94 Abs. 1, 2)
  monatePhase1: 6,
  monatePhase2: 9,
  mindestRestanspruch: 150, // Tage am Tag der Aufnahme (§ 93 Abs. 2 Nr. 1)
  mindestStunden: 15, // Std./Woche für „hauptberuflich“ (FW 93.32)
  sperrMonate: 24, // nach früherer Gründungsförderung (§ 93 Abs. 4)
  tageVerbrauchPhase1: 180, // Restanspruch sinkt um die Tage der Phase 1 (§ 148 Abs. 1 Nr. 8)
} as const;

export type GzAntworten = {
  /** Bezieht ALG I oder hat einen konkreten Zahlungsanspruch. */
  algAnspruch: boolean | null;
  /** Restanspruch in Tagen am geplanten Gründungstag. */
  restTage: number | null;
  /** Wochenstunden in der Selbstständigkeit. */
  stunden: number | null;
  /** Ruht der ALG-Anspruch gerade (z. B. Sperrzeit nach Eigenkündigung)? */
  sperrzeit: boolean | null;
  /** Schon gestartet oder Vorbereitung mit Außenwirkung (Miete, Wareneinkauf, Kundenaufträge)? */
  schonGestartet: boolean | null;
  /** Gründungsförderung (GZ, Einstiegsgeld …) in den letzten 24 Monaten beendet? */
  foerderungLetzte24: boolean | null;
  /** Regelaltersgrenze erreicht? */
  rentenalter: boolean | null;
  /** Anerkannte Behinderung (§ 19 SGB III) – 150-Tage-Grenze entfällt (§ 116 Abs. 7). */
  behinderung: boolean | null;
  /** Kündigung/Aufhebungsvertrag selbst veranlasst, um zu gründen? */
  eigenkuendigung: boolean | null;
};

export type GzBefund = { stufe: "ok" | "warnung" | "ausschluss"; text: string; quelle: string };

export type GzErgebnis = {
  ampel: "gruen" | "gelb" | "rot" | "offen";
  befunde: GzBefund[];
};

export function pruefeGruendungszuschuss(a: GzAntworten): GzErgebnis {
  const b: GzBefund[] = [];

  if (a.algAnspruch === false)
    b.push({
      stufe: "ausschluss",
      text: "Ohne Anspruch auf Arbeitslosengeld I gibt es keinen Gründungszuschuss. Beziehst du Grundsicherungsgeld (früher Bürgergeld), ist das Einstiegsgeld der passende Weg.",
      quelle: "§ 93 Abs. 2 Nr. 1 SGB III",
    });
  else if (a.algAnspruch) b.push({ stufe: "ok", text: "Anspruch auf Arbeitslosengeld I vorhanden.", quelle: "§ 93 Abs. 2 Nr. 1 SGB III" });

  if (a.restTage !== null && !a.behinderung) {
    if (a.restTage < GZ.mindestRestanspruch)
      b.push({
        stufe: "ausschluss",
        text: `Am Gründungstag brauchst du noch mindestens ${GZ.mindestRestanspruch} Tage Restanspruch – du hast ${a.restTage}. Wer früher gründet, rettet die Tage.`,
        quelle: "§ 93 Abs. 2 Nr. 1 SGB III",
      });
    else
      b.push({
        stufe: "ok",
        text: `${a.restTage} Tage Restanspruch am Gründungstag – mindestens ${GZ.mindestRestanspruch} sind nötig.`,
        quelle: "§ 93 Abs. 2 Nr. 1 SGB III",
      });
  }
  if (a.behinderung)
    b.push({
      stufe: "ok",
      text: "Mit anerkannter Behinderung entfällt die 150-Tage-Grenze; eine Förderung ist auch mit weniger Resttagen möglich.",
      quelle: "§ 116 Abs. 7 SGB III",
    });

  if (a.stunden !== null) {
    if (a.stunden < GZ.mindestStunden)
      b.push({
        stufe: "ausschluss",
        text: `Gefördert wird nur eine hauptberufliche Selbstständigkeit mit mindestens ${GZ.mindestStunden} Stunden pro Woche. Darunter bleibst du arbeitslos und kannst nebenbei gründen (165 € Freibetrag).`,
        quelle: "§ 93 Abs. 1 SGB III, FW 93.32",
      });
    else b.push({ stufe: "ok", text: `${a.stunden} Std./Woche – hauptberuflich.`, quelle: "FW 93.32" });
  }

  if (a.sperrzeit)
    b.push({
      stufe: "ausschluss",
      text: "Solange dein Anspruch ruht (z. B. Sperrzeit), besteht kein Zahlungsanspruch – ein Antrag in dieser Zeit wird ohne Ermessen abgelehnt. Gründe erst nach Ablauf der Sperrzeit.",
      quelle: "§ 93 Abs. 3 SGB III, FW 93.39",
    });

  if (a.schonGestartet)
    b.push({
      stufe: "ausschluss",
      text: "Der Antrag muss vor dem Start gestellt sein – schon vor Vorbereitungen mit Außenwirkung wie Räume mieten oder Ware einkaufen. Rückwirkend gibt es nur in Härtefällen etwas.",
      quelle: "§ 324 Abs. 1 SGB III, FW 93.34",
    });
  else if (a.schonGestartet === false)
    b.push({ stufe: "ok", text: "Noch nicht gestartet – Antrag rechtzeitig möglich.", quelle: "§ 324 Abs. 1 SGB III" });

  if (a.foerderungLetzte24)
    b.push({
      stufe: "ausschluss",
      text: `Eine frühere Gründungsförderung muss mindestens ${GZ.sperrMonate} Monate zurückliegen. Ausnahmen gibt es nur aus persönlichen Gründen wie Krankheit.`,
      quelle: "§ 93 Abs. 4 SGB III, FW 93.55",
    });

  if (a.rentenalter)
    b.push({ stufe: "ausschluss", text: "Ab Erreichen der Regelaltersgrenze gibt es keinen Gründungszuschuss.", quelle: "§ 93 Abs. 5 SGB III" });

  if (a.eigenkuendigung)
    b.push({
      stufe: "warnung",
      text: "Wer nur für die Gründung selbst kündigt, bekommt den Zuschuss „regelmäßig nicht“ – und riskiert eine Sperrzeit. Sprich vorher mit deiner Vermittlungsfachkraft.",
      quelle: "FW 93.03, 93.37–93.39",
    });

  b.push({
    stufe: "warnung",
    text: "Der Gründungszuschuss ist eine Ermessensleistung: Auch wenn alles passt, gibt es keinen Rechtsanspruch – nur auf eine fehlerfreie Ermessensentscheidung.",
    quelle: "FW 93.02",
  });

  const unbeantwortet = [a.algAnspruch, a.restTage, a.stunden, a.sperrzeit, a.schonGestartet, a.foerderungLetzte24, a.rentenalter].some(
    (x) => x === null,
  );
  const ampel = b.some((x) => x.stufe === "ausschluss")
    ? "rot"
    : unbeantwortet
      ? "offen"
      : a.eigenkuendigung
        ? "gelb"
        : "gruen";
  return { ampel, befunde: b };
}

export type GzRechnung = {
  phase1Monat: number;
  phase1Summe: number;
  phase2Summe: number;
  gesamt: number;
  /** Restanspruch auf ALG I nach Phase 1 (Tage), falls bekannt. */
  restNachPhase1: number | null;
};

/** Höhe nach § 94 SGB III: 6 × (ALG I + 300 €), danach optional 9 × 300 €. */
export function rechneGruendungszuschuss(algMonat: number, restTage: number | null, mitPhase2 = true): GzRechnung {
  const alg = Math.max(0, algMonat || 0);
  const phase1Monat = alg + GZ.zuschlag;
  const phase1Summe = phase1Monat * GZ.monatePhase1;
  const phase2Summe = mitPhase2 ? GZ.zuschlag * GZ.monatePhase2 : 0;
  return {
    phase1Monat,
    phase1Summe,
    phase2Summe,
    gesamt: phase1Summe + phase2Summe,
    restNachPhase1: restTage === null ? null : Math.max(0, restTage - GZ.tageVerbrauchPhase1),
  };
}
