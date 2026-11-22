import { describe, expect, it } from "vitest";
import { CATEGORIES } from "@/data/features";
import { PLAYBOOKS } from "@/data/playbooks";
import { PROVIDERS } from "@/data/anbieter";
import {
  GRUENDUNGS_GUIDE, MODELL_LABEL, PHASE_LABEL, RECHTSFORM_LABEL,
  empfohleneToolSlugs, empfohleneVergleiche, fahrplan, felixFragen, istAutomatisch, istErledigt,
  modelleVon, phaseVon, profilMerkmale, rechtsformVon, vergleichRoute,
  type PlanProfil, type PlanSignale,
} from "@/lib/startplan";
import { empfohleneGuides } from "@/lib/guideEmpfehlung";
import { istToolPfad } from "@/lib/zuletztGenutzt";

const FEATURES = new Map(CATEGORIES.flatMap((c) => c.features).map((f) => [f.slug, f]));
const GUIDES = new Set(PLAYBOOKS.map((p) => p.slug));
const KATEGORIEN = new Set(PROVIDERS.map((p) => p.category));

const PHASEN = [null, ...Object.keys(PHASE_LABEL)];
const FORMEN = [null, "unsure", ...Object.keys(RECHTSFORM_LABEL)];
const MODELLE = [null, ...Object.keys(MODELL_LABEL), "amazon_fba,shopify", "creator,agency,saas"];

const ALLE: PlanProfil[] = PHASEN.flatMap((founder_stage) =>
  FORMEN.flatMap((legal_form) => MODELLE.map((business_model) => ({ founder_stage, legal_form, business_model }))),
);

const LEER: PlanSignale = { rechtsformGewaehlt: false, steuerkalenderEingerichtet: false, guidesFertig: [], abgehakt: [] };

describe("Fahrplan", () => {
  it("jede Kombination aus Phase, Rechtsform und Modell ergibt einen Plan ohne Dubletten", () => {
    for (const profil of ALLE) {
      const plan = fahrplan(profil);
      const ids = plan.map((s) => s.id);
      expect(plan.length, JSON.stringify(profil)).toBeGreaterThanOrEqual(4);
      expect(plan.length, JSON.stringify(profil)).toBeLessThanOrEqual(8);
      expect(new Set(ids).size, JSON.stringify(profil)).toBe(ids.length);
    }
  });

  it("jeder Schritt führt zu einem Tool, Guide oder Vergleich, den es gibt", () => {
    for (const profil of ALLE) {
      for (const s of fahrplan(profil)) {
        expect(s.titel.length).toBeGreaterThan(3);
        expect(s.warum.length).toBeGreaterThan(20);
        if (s.featureSlug) {
          const f = FEATURES.get(s.featureSlug);
          expect(f, `Tool ${s.featureSlug}`).toBeTruthy();
          expect(s.ziel, `Route von ${s.featureSlug}`).toBe(f!.route);
        }
        if (s.guideSlug) {
          expect(GUIDES.has(s.guideSlug), `Guide ${s.guideSlug}`).toBe(true);
          expect(s.ziel).toBe(`/playbook/preview/${s.guideSlug}`);
        }
        if (s.art === "vergleich") expect(s.ziel.startsWith("/anbieter")).toBe(true);
        expect(s.featureSlug || s.guideSlug || s.art === "vergleich", s.id).toBeTruthy();
      }
    }
  });

  it("jeder Gründungs-Guide existiert", () => {
    for (const slug of Object.values(GRUENDUNGS_GUIDE)) expect(GUIDES.has(slug), slug).toBe(true);
  });

  it("die Phase bestimmt den ersten Schritt", () => {
    expect(fahrplan({ founder_stage: "idea" })[0].id).toBe("gewerbe-check");
    expect(fahrplan({ founder_stage: "planning" })[0].id).toBe("rechtsform");
    expect(fahrplan({ founder_stage: "running", legal_form: "ug" })[0].id).toBe("steuerkalender");
  });

  it("mit gewählter Rechtsform kommt in der Startphase der passende Gründungs-Guide", () => {
    const ids = fahrplan({ founder_stage: "ready", legal_form: "gmbh" }).map((s) => s.id);
    expect(ids).toContain("guide-gmbh-gruendung");
    expect(ids).not.toContain("rechtsform");
  });

  it("Freiberufler bekommen keine Gewerbeanmeldung", () => {
    const ids = fahrplan({ founder_stage: "ready", legal_form: "Freiberufler" }).map((s) => s.id);
    expect(ids).not.toContain("gewerbeanmeldung");
  });

  it("erledigt: von Hand abgehakt oder automatisch erkannt", () => {
    const plan = fahrplan({ founder_stage: "planning" });
    const rechtsform = plan.find((s) => s.id === "rechtsform")!;
    expect(istErledigt(rechtsform, LEER)).toBe(false);
    expect(istErledigt(rechtsform, { ...LEER, abgehakt: ["rechtsform"] })).toBe(true);
    expect(istAutomatisch(rechtsform, { ...LEER, abgehakt: ["rechtsform"] })).toBe(false);
    expect(istErledigt(rechtsform, { ...LEER, rechtsformGewaehlt: true })).toBe(true);
    expect(istAutomatisch(rechtsform, { ...LEER, rechtsformGewaehlt: true })).toBe(true);

    const guide = fahrplan({ founder_stage: "ready", legal_form: "ug" }).find((s) => s.guideSlug)!;
    expect(istErledigt(guide, { ...LEER, guidesFertig: [guide.guideSlug!] })).toBe(true);
  });
});

describe("Profil lesen", () => {
  it("Rechtsform: Onboarding-Kennung und freier Text aus dem Profil", () => {
    expect(rechtsformVon("ug")).toBe("ug");
    expect(rechtsformVon("UG (haftungsbeschränkt)")).toBe("ug");
    expect(rechtsformVon("GmbH")).toBe("gmbh");
    expect(rechtsformVon("Einzelunternehmen")).toBe("einzelunternehmen");
    expect(rechtsformVon("us_llc")).toBe("us_llc");
    expect(rechtsformVon("unsure")).toBeNull();
    expect(rechtsformVon("")).toBeNull();
    expect(rechtsformVon(null)).toBeNull();
  });

  it("Phase und Modelle: Unbekanntes fällt weg", () => {
    expect(phaseVon("running")).toBe("running");
    expect(phaseVon("quatsch")).toBeNull();
    expect(modelleVon("amazon_fba, shopify,ecommerce")).toEqual(["amazon_fba", "shopify"]);
    expect(modelleVon(null)).toEqual([]);
  });

  it("Merkmale nur aus bekannten Angaben", () => {
    expect(profilMerkmale({})).toEqual([]);
    expect(profilMerkmale({ founder_stage: "planning", legal_form: "ug", business_model: "saas" }).length).toBe(3);
  });
});

describe("Empfehlungen", () => {
  it("Tools: es gibt sie, sie haben eine Route, keine Dubletten", () => {
    for (const profil of ALLE) {
      const slugs = empfohleneToolSlugs(profil, 6);
      expect(slugs, JSON.stringify(profil)).toHaveLength(6);
      expect(new Set(slugs).size).toBe(6);
      for (const s of slugs) expect(FEATURES.get(s)?.route, `Tool ${s}`).toBeTruthy();
    }
  });

  it("Tools wiederholen nicht, was schon im Fahrplan steht", () => {
    for (const profil of ALLE) {
      const imPlan = new Set(fahrplan(profil).map((s) => s.featureSlug).filter(Boolean));
      for (const s of empfohleneToolSlugs(profil, 6)) expect(imPlan.has(s), `${s} bei ${JSON.stringify(profil)}`).toBe(false);
    }
  });

  it("Vergleiche zeigen auf Kategorien, die es im Anbieter-Vergleich gibt", () => {
    for (const profil of ALLE) {
      const tipps = empfohleneVergleiche(profil);
      expect(tipps.length).toBeGreaterThanOrEqual(3);
      expect(new Set(tipps.map((t) => t.kategorie)).size).toBe(tipps.length);
      for (const t of tipps) expect(KATEGORIEN.has(t.kategorie), t.kategorie).toBe(true);
    }
    expect(vergleichRoute("Banking DE")).toBe("/anbieter?cat=Banking+DE");
  });

  it("Felix-Fragen: drei bis vier, ohne Dubletten", () => {
    for (const profil of ALLE) {
      const fragen = felixFragen(profil);
      expect(fragen.length).toBeGreaterThanOrEqual(3);
      expect(fragen.length).toBeLessThanOrEqual(4);
      expect(new Set(fragen).size).toBe(fragen.length);
    }
  });

  it("Guides: Gründungs-Guide zuerst, dann nach Modell, ohne Dubletten", () => {
    const s = empfohleneGuides("saas", 5, GRUENDUNGS_GUIDE.ug).map((p) => p.slug);
    expect(s[0]).toBe("ug-gruendung");
    expect(s).toContain("b2b-saas-spezifika");
    expect(s).toHaveLength(5);
    expect(new Set(s).size).toBe(5);
  });
});

describe("Zuletzt geöffnet", () => {
  it("zählt nur Tool-Seiten", () => {
    expect(istToolPfad("/cockpit/steuerkalender")).toBe(true);
    expect(istToolPfad("/wizard/rechtsform")).toBe(true);
    expect(istToolPfad("/dashboard")).toBe(false);
    expect(istToolPfad("/cockpit/steuer/extra")).toBe(false);
    expect(istToolPfad("/profile")).toBe(false);
  });
});

describe("Tools nach Phase", () => {
  it("vor dem Start stehen Auswertungen laufender Umsätze hinten", () => {
    const planung = empfohleneToolSlugs({ business_model: "amazon_fba,shopify", founder_stage: "planning" }, 6);
    expect(planung).not.toContain("amazon-parser");
    expect(planung).not.toContain("stripe-parser");
    const laufend = empfohleneToolSlugs({ business_model: "amazon_fba,shopify", founder_stage: "running" }, 6);
    expect(laufend).toContain("amazon-parser");
  });
});
