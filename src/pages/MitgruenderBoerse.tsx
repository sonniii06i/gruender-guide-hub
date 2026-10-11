import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Clock, Inbox, MapPin, Search, Send, UserPlus, Users } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Callout, EmptyState, Field, ToneBadge, ToolSection, selectCls, type Tone } from "@/components/cockpit/kit";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BUNDESLAND_NAMES } from "@/data/foerderprogramme";

// Mitgründer-Börse. Tabellen: supabase/migrations/20261008120000_mitgruender_boerse.sql
// (noch nicht in den generierten Supabase-Typen, daher ein schmaler, untypisierter Zugriff).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as unknown as { from: (t: string) => any };

type Profil = {
  user_id: string;
  anzeigename: string;
  ich_bin: string;
  ich_suche: string[];
  region: string | null;
  branche: string | null;
  phase: string | null;
  zeit: string | null;
  pitch: string;
  skills: string[];
  sichtbar: boolean;
  updated_at?: string;
};
type Anfrage = { id: string; von: string; an: string; nachricht: string; antwort: string | null; status: string; created_at: string };

const ROLLEN: Record<string, string> = { tech: "Tech / Entwicklung", business: "Business / Finanzen", design: "Design / UX", vertrieb: "Vertrieb / Marketing", produkt: "Produkt", andere: "Andere" };
const PHASEN: Record<string, string> = { idee: "Idee", prototyp: "Prototyp", "erste-kunden": "Erste Kunden", umsatz: "Umsatz" };
const ZEIT: Record<string, string> = { vollzeit: "Vollzeit", teilzeit: "Teilzeit", nebenbei: "Nebenbei" };
const LEER: Profil = { user_id: "", anzeigename: "", ich_bin: "business", ich_suche: ["tech"], region: null, branche: "", phase: "idee", zeit: "teilzeit", pitch: "", skills: [], sichtbar: false };

const MitgruenderBoerse = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"entdecken" | "profil" | "anfragen">("entdecken");
  const [verfuegbar, setVerfuegbar] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<Profil[]>([]);
  const [meins, setMeins] = useState<Profil>(LEER);
  const [anfragen, setAnfragen] = useState<Anfrage[]>([]);
  const [filter, setFilter] = useState({ rolle: "", region: "", suche: "" });
  const [nachricht, setNachricht] = useState<Record<string, string>>({});
  const [meldung, setMeldung] = useState("");

  const laden = useCallback(async () => {
    if (!user) return;
    const p = await db.from("mitgruender_profile").select("*").order("updated_at", { ascending: false }).limit(200);
    if (p.error) {
      // Tabelle fehlt (Migration noch nicht ausgeführt) → „bald verfügbar“.
      setVerfuegbar(false);
      return;
    }
    setVerfuegbar(true);
    const alle = (p.data ?? []) as Profil[];
    setProfile(alle.filter((x) => x.user_id !== user.id && x.sichtbar));
    setMeins(alle.find((x) => x.user_id === user.id) ?? { ...LEER, user_id: user.id });
    const a = await db.from("mitgruender_anfragen").select("*").order("created_at", { ascending: false }).limit(100);
    setAnfragen((a.data ?? []) as Anfrage[]);
  }, [user]);
  useEffect(() => {
    laden();
  }, [laden]);

  const gefiltert = useMemo(() => {
    const q = filter.suche.trim().toLowerCase();
    return profile.filter(
      (p) =>
        (!filter.rolle || p.ich_bin === filter.rolle) &&
        (!filter.region || p.region === filter.region || p.region === "remote") &&
        (!q || [p.pitch, p.branche ?? "", p.skills.join(" "), p.anzeigename].some((s) => s.toLowerCase().includes(q))),
    );
  }, [profile, filter]);

  const name = (uid: string) => profile.find((p) => p.user_id === uid)?.anzeigename ?? (uid === user?.id ? "Du" : "Mitglied");

  const speichern = async () => {
    const { user_id: _u, updated_at: _t, ...rest } = meins;
    const r = await db.from("mitgruender_profile").upsert({ user_id: user!.id, ...rest, skills: rest.skills.filter(Boolean) });
    setMeldung(r.error ? `Speichern fehlgeschlagen: ${r.error.message}` : meins.sichtbar ? "Profil gespeichert und veröffentlicht." : "Profil gespeichert (noch nicht sichtbar).");
    laden();
  };
  const loeschen = async () => {
    await db.from("mitgruender_profile").delete().eq("user_id", user!.id);
    setMeldung("Profil gelöscht.");
    laden();
  };
  const senden = async (an: string) => {
    const r = await db.from("mitgruender_anfragen").insert({ von: user!.id, an, nachricht: (nachricht[an] ?? "").trim() });
    setMeldung(r.error ? `Nicht gesendet: ${r.error.message.includes("row-level") ? "Limit erreicht oder Profil nicht mehr sichtbar." : r.error.message}` : "Anfrage gesendet.");
    if (!r.error) setNachricht((x) => ({ ...x, [an]: "" }));
    laden();
  };
  const beantworten = async (id: string, status: "angenommen" | "abgelehnt", antwort: string) => {
    await db.from("mitgruender_anfragen").update({ status, antwort: antwort.trim() || null }).eq("id", id);
    laden();
  };

  if (verfuegbar === false)
    return (
      <CockpitShell eyebrow="Community" title="Mitgründer-Börse" subtitle="Finde Mitgründer mit den Fähigkeiten, die dir fehlen.">
        <EmptyState
          icon={Clock}
          title="Bald verfügbar"
          description="Die Mitgründer-Börse wird gerade eingerichtet. Schau in Kürze wieder vorbei."
        />
      </CockpitShell>
    );

  const eingang = anfragen.filter((a) => a.an === user?.id);
  const ausgang = anfragen.filter((a) => a.von === user?.id);
  const neu = eingang.filter((a) => a.status === "offen").length;

  return (
    <CockpitShell
      eyebrow="Community · Mitgründer-Börse"
      title="Finde deinen Mitgründer"
      subtitle="Profile anderer GründerX-Mitglieder nach Rolle, Region und Branche. Kontakt läuft über Anfragen: Deine Kontaktdaten gibst du erst weiter, wenn du eine Anfrage annimmst."
    >
      <div role="tablist" aria-label="Bereiche" className="mb-6 inline-flex flex-wrap gap-1 rounded-xl border border-border bg-secondary/60 p-1">
        {(
          [
            ["entdecken", Search, "Entdecken", profile.length ? String(profile.length) : ""],
            ["profil", UserPlus, "Mein Profil", meins.sichtbar ? "sichtbar" : ""],
            ["anfragen", Inbox, "Anfragen", neu ? `${neu} neu` : ""],
          ] as const
        ).map(([id, Icon, label, zusatz]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              tab === id ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" /> {label}
            {zusatz && <span className="rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-semibold tabular text-accent-blue">{zusatz}</span>}
          </button>
        ))}
      </div>
      {meldung && (
        <Callout tone={/fehlgeschlagen|Nicht gesendet/.test(meldung) ? "danger" : "success"} className="mb-5">
          <span aria-live="polite">{meldung}</span>
        </Callout>
      )}

      {tab === "entdecken" && (
        <div className="space-y-5">
          <ToolSection bodyClassName="p-4 md:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_1.4fr]">
              <select value={filter.rolle} onChange={(e) => setFilter((f) => ({ ...f, rolle: e.target.value }))} className={selectCls} aria-label="Rolle">
                <option value="">Alle Rollen</option>
                {Object.entries(ROLLEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select value={filter.region} onChange={(e) => setFilter((f) => ({ ...f, region: e.target.value }))} className={selectCls} aria-label="Region">
                <option value="">Alle Regionen</option>
                {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input aria-label="Profile durchsuchen" value={filter.suche} onChange={(e) => setFilter((f) => ({ ...f, suche: e.target.value }))} placeholder="Suche: SaaS, Python, E-Commerce …" className="pl-9" />
              </div>
            </div>
          </ToolSection>
          {verfuegbar === null ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-busy="true">
              <p className="sr-only">Lade Profile …</p>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 rounded-2xl border border-border bg-card p-5" aria-hidden="true">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
                  <div className="h-12 w-full animate-pulse rounded bg-secondary" />
                </div>
              ))}
            </div>
          ) : gefiltert.length ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {gefiltert.map((p) => {
                const gesendet = ausgang.some((a) => a.an === p.user_id);
                return (
                  <article key={p.user_id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-primary">
                          {p.anzeigename.slice(0, 2).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <h2 className="truncate font-semibold">{p.anzeigename}</h2>
                          <p className="text-xs text-muted-foreground">
                            {ROLLEN[p.ich_bin]}, sucht {p.ich_suche.map((x) => ROLLEN[x] ?? x).join(", ")}
                          </p>
                        </div>
                      </div>
                      <ToneBadge className="shrink-0">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {p.region === "remote" ? "Remote" : p.region ? BUNDESLAND_NAMES[p.region] : "ohne Region"}
                      </ToneBadge>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">{p.pitch}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.branche && <ToneBadge tone="accent">{p.branche}</ToneBadge>}
                      {p.phase && <ToneBadge>{PHASEN[p.phase]}</ToneBadge>}
                      {p.zeit && <ToneBadge>{ZEIT[p.zeit]}</ToneBadge>}
                      {p.skills.map((x) => <ToneBadge key={x}>{x}</ToneBadge>)}
                    </div>
                    <div className="mt-auto pt-4">
                      {gesendet ? (
                        <p className="flex items-center gap-1.5 text-sm text-success"><Check className="h-4 w-4" aria-hidden="true" /> Anfrage gesendet.</p>
                      ) : (
                        <div className="flex gap-2 border-t border-border/70 pt-4">
                          <Input
                            aria-label={`Nachricht an ${p.anzeigename}`}
                            value={nachricht[p.user_id] ?? ""}
                            onChange={(e) => setNachricht((x) => ({ ...x, [p.user_id]: e.target.value }))}
                            placeholder="Kurz: wer du bist, was du vorhast (min. 20 Zeichen)"
                            className="h-9 text-sm"
                          />
                          <Button
                            size="sm"
                            aria-label="Anfrage senden"
                            disabled={(nachricht[p.user_id] ?? "").trim().length < 20 || !meins.anzeigename}
                            onClick={() => senden(p.user_id)}
                            title={!meins.anzeigename ? "Lege zuerst dein Profil an" : undefined}
                          >
                            <Send />
                          </Button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title={profile.length ? "Kein Profil passt zu deinen Filtern." : "Noch keine veröffentlichten Profile."}
              description={profile.length ? "Nimm einen Filter heraus oder such nach einem anderen Stichwort." : "Leg dein Profil an und sei der Erste, den andere finden."}
              action={
                !profile.length && (
                  <Button onClick={() => setTab("profil")}>
                    <UserPlus /> Profil anlegen
                  </Button>
                )
              }
            />
          )}
        </div>
      )}

      {tab === "profil" && (
        <ToolSection title="Mein Profil" description="Sichtbar sind nur diese Angaben, keine E-Mail und kein Nachname." icon={UserPlus} className="max-w-3xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Anzeigename (Vorname oder Spitzname)" htmlFor="mg-name">
              <Input id="mg-name" value={meins.anzeigename} onChange={(e) => setMeins((m) => ({ ...m, anzeigename: e.target.value }))} />
            </Field>
            <Field label="Ich bin" htmlFor="mg-rolle">
              <select id="mg-rolle" value={meins.ich_bin} onChange={(e) => setMeins((m) => ({ ...m, ich_bin: e.target.value }))} className={selectCls}>
                {Object.entries(ROLLEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <fieldset className="md:col-span-2">
              <legend className="mb-1.5 text-sm font-medium">Ich suche</legend>
              <div className="flex flex-wrap gap-2">
                {Object.entries(ROLLEN).map(([k, v]) => {
                  const an = meins.ich_suche.includes(k);
                  return (
                    <label
                      key={k}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        an ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/25"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={an}
                        onChange={(e) => setMeins((m) => ({ ...m, ich_suche: e.target.checked ? [...m.ich_suche, k] : m.ich_suche.filter((x) => x !== k) }))}
                      />
                      {an && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                      {v}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <Field label="Region" htmlFor="mg-region">
              <select id="mg-region" value={meins.region ?? ""} onChange={(e) => setMeins((m) => ({ ...m, region: e.target.value || null }))} className={selectCls}>
                <option value="">bitte wählen</option>
                <option value="remote">Remote / egal</option>
                {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field label="Branche" htmlFor="mg-branche">
              <Input id="mg-branche" value={meins.branche ?? ""} onChange={(e) => setMeins((m) => ({ ...m, branche: e.target.value }))} placeholder="z. B. SaaS, E-Commerce, Handwerk" />
            </Field>
            <Field label="Phase" htmlFor="mg-phase">
              <select id="mg-phase" value={meins.phase ?? ""} onChange={(e) => setMeins((m) => ({ ...m, phase: e.target.value }))} className={selectCls}>
                {Object.entries(PHASEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field label="Zeit" htmlFor="mg-zeit">
              <select id="mg-zeit" value={meins.zeit ?? ""} onChange={(e) => setMeins((m) => ({ ...m, zeit: e.target.value }))} className={selectCls}>
                {Object.entries(ZEIT).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field label="Pitch: Was hast du vor, wen suchst du?" hint={`20 bis 600 Zeichen, aktuell ${meins.pitch.length}.`} htmlFor="mg-pitch" className="md:col-span-2">
              <Textarea id="mg-pitch" rows={4} maxLength={600} value={meins.pitch} onChange={(e) => setMeins((m) => ({ ...m, pitch: e.target.value }))} />
            </Field>
            <Field label="Skills" hint="Mit Komma getrennt, bis zu 12." htmlFor="mg-skills" className="md:col-span-2">
              <Input id="mg-skills" value={meins.skills.join(", ")} onChange={(e) => setMeins((m) => ({ ...m, skills: e.target.value.split(",").map((x) => x.trim()).slice(0, 12) }))} />
            </Field>
            <label className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed md:col-span-2">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" checked={meins.sichtbar} onChange={(e) => setMeins((m) => ({ ...m, sichtbar: e.target.checked }))} />
              <span>Profil für andere GründerX-Mitglieder sichtbar machen. Sichtbar sind nur die Angaben oben, keine E-Mail, kein Nachname. Du kannst das Profil jederzeit verstecken oder löschen.</span>
            </label>
            <div className="flex flex-wrap gap-2 md:col-span-2">
              <Button onClick={speichern} disabled={meins.anzeigename.trim().length < 2 || meins.pitch.trim().length < 20 || !meins.ich_suche.length}>Profil speichern</Button>
              {meins.updated_at && <Button variant="outline" onClick={loeschen}>Profil löschen</Button>}
            </div>
          </div>
        </ToolSection>
      )}

      {tab === "anfragen" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ToolSection title="Eingang" icon={Inbox}>
            {eingang.length ? (
              <div className="space-y-3">{eingang.map((a) => <AnfrageKarte key={a.id} a={a} wer={name(a.von)} eingang beantworten={beantworten} />)}</div>
            ) : (
              <p className="text-sm text-muted-foreground">Noch keine Anfragen.</p>
            )}
          </ToolSection>
          <ToolSection title="Gesendet" icon={Send}>
            {ausgang.length ? (
              <div className="space-y-3">{ausgang.map((a) => <AnfrageKarte key={a.id} a={a} wer={name(a.an)} beantworten={beantworten} />)}</div>
            ) : (
              <p className="text-sm text-muted-foreground">Du hast noch niemanden angefragt.</p>
            )}
          </ToolSection>
        </div>
      )}
    </CockpitShell>
  );
};

const STATUS_TON: Record<string, Tone> = { offen: "info", angenommen: "success", abgelehnt: "neutral" };

const AnfrageKarte = ({ a, wer, eingang, beantworten }: { a: Anfrage; wer: string; eingang?: boolean; beantworten: (id: string, s: "angenommen" | "abgelehnt", antwort: string) => void }) => {
  const [antwort, setAntwort] = useState("");
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{eingang ? `von ${wer}` : `an ${wer}`}</span>
        <span className="flex items-center gap-2">
          {new Date(a.created_at).toLocaleDateString("de-DE")}
          <ToneBadge tone={STATUS_TON[a.status] ?? "neutral"}>{a.status}</ToneBadge>
        </span>
      </div>
      <p className="mt-2 leading-relaxed">{a.nachricht}</p>
      {a.antwort && (
        <p className="mt-3 rounded-lg border border-success/25 bg-success-soft p-3 text-sm">
          <strong className="font-semibold">Antwort:</strong> {a.antwort}
        </p>
      )}
      {eingang && a.status === "offen" && (
        <div className="mt-3 space-y-2">
          <Textarea rows={2} aria-label="Antwort" value={antwort} onChange={(e) => setAntwort(e.target.value)} placeholder="Antwort, bei Annahme z. B. deine E-Mail oder dein LinkedIn" className="text-sm" />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => beantworten(a.id, "angenommen", antwort)}>Annehmen</Button>
            <Button size="sm" variant="outline" onClick={() => beantworten(a.id, "abgelehnt", antwort)}>Ablehnen</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MitgruenderBoerse;
