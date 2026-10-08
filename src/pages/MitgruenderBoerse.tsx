import { useCallback, useEffect, useMemo, useState } from "react";
import { Inbox, Search, Send, UserPlus, Users } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-sm">
          <div className="font-bold mb-1">Bald verfügbar</div>
          Die Mitgründer-Börse wird gerade eingerichtet. Schau in Kürze wieder vorbei.
        </div>
      </CockpitShell>
    );

  const eingang = anfragen.filter((a) => a.an === user?.id);
  const ausgang = anfragen.filter((a) => a.von === user?.id);

  return (
    <CockpitShell
      eyebrow="Community · Mitgründer-Börse"
      title="Finde deinen Mitgründer"
      subtitle="Profile anderer GründerX-Mitglieder nach Rolle, Region und Branche. Kontakt läuft über Anfragen – deine Kontaktdaten gibst du erst weiter, wenn du eine Anfrage annimmst."
    >
      <div className="flex gap-2 mb-5 flex-wrap">
        {(
          [
            ["entdecken", Search, `Entdecken (${profile.length})`],
            ["profil", UserPlus, meins.sichtbar ? "Mein Profil (sichtbar)" : "Mein Profil"],
            ["anfragen", Inbox, `Anfragen${eingang.filter((a) => a.status === "offen").length ? ` (${eingang.filter((a) => a.status === "offen").length} neu)` : ""}`],
          ] as const
        ).map(([id, Icon, label]) => (
          <button key={id} type="button" onClick={() => setTab(id)} className={`rounded-full px-4 py-2 text-sm font-semibold inline-flex items-center gap-1.5 ${tab === id ? "bg-accent-blue text-primary-foreground" : "border border-border bg-card"}`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>
      {meldung && <div className="rounded-xl border border-border bg-secondary/40 p-3 text-sm mb-4">{meldung}</div>}

      {tab === "entdecken" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <select value={filter.rolle} onChange={(e) => setFilter((f) => ({ ...f, rolle: e.target.value }))} className="h-10 rounded-md border border-input bg-background px-3 text-sm" aria-label="Rolle">
              <option value="">Alle Rollen</option>
              {Object.entries(ROLLEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select value={filter.region} onChange={(e) => setFilter((f) => ({ ...f, region: e.target.value }))} className="h-10 rounded-md border border-input bg-background px-3 text-sm" aria-label="Region">
              <option value="">Alle Regionen</option>
              {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <Input value={filter.suche} onChange={(e) => setFilter((f) => ({ ...f, suche: e.target.value }))} placeholder="Suche: SaaS, Python, E-Commerce …" />
          </div>
          {gefiltert.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gefiltert.map((p) => {
                const gesendet = ausgang.some((a) => a.an === p.user_id);
                return (
                  <div key={p.user_id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold">{p.anzeigename}</div>
                        <div className="text-xs text-muted-foreground">{ROLLEN[p.ich_bin]} · sucht {p.ich_suche.map((s) => ROLLEN[s] ?? s).join(", ")}</div>
                      </div>
                      <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5">{p.region === "remote" ? "Remote" : p.region ? BUNDESLAND_NAMES[p.region] : "–"}</span>
                    </div>
                    <p className="text-sm mt-2">{p.pitch}</p>
                    <div className="flex flex-wrap gap-1 mt-2 text-[10px]">
                      {p.branche && <span className="rounded-full bg-accent-blue/10 text-accent-blue px-2 py-0.5">{p.branche}</span>}
                      {p.phase && <span className="rounded-full bg-secondary px-2 py-0.5">{PHASEN[p.phase]}</span>}
                      {p.zeit && <span className="rounded-full bg-secondary px-2 py-0.5">{ZEIT[p.zeit]}</span>}
                      {p.skills.map((s) => <span key={s} className="rounded-full bg-secondary px-2 py-0.5">{s}</span>)}
                    </div>
                    {gesendet ? (
                      <p className="text-xs text-muted-foreground mt-3">Anfrage gesendet.</p>
                    ) : (
                      <div className="mt-3 flex gap-2">
                        <Input value={nachricht[p.user_id] ?? ""} onChange={(e) => setNachricht((x) => ({ ...x, [p.user_id]: e.target.value }))} placeholder="Kurz: wer du bist, was du vorhast (min. 20 Zeichen)" className="h-9 text-sm" />
                        <Button size="sm" disabled={(nachricht[p.user_id] ?? "").trim().length < 20 || !meins.anzeigename} onClick={() => senden(p.user_id)} title={!meins.anzeigename ? "Lege zuerst dein Profil an" : undefined}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              <Users className="h-6 w-6 mx-auto mb-2" />
              {profile.length ? "Kein Profil passt zu deinen Filtern." : "Noch keine veröffentlichten Profile – leg deins an und sei der Erste."}
            </div>
          )}
        </>
      )}

      {tab === "profil" && (
        <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <div><Label className="text-xs">Anzeigename (Vorname oder Spitzname)</Label><Input value={meins.anzeigename} onChange={(e) => setMeins((m) => ({ ...m, anzeigename: e.target.value }))} className="mt-1" /></div>
          <div>
            <Label className="text-xs">Ich bin</Label>
            <select value={meins.ich_bin} onChange={(e) => setMeins((m) => ({ ...m, ich_bin: e.target.value }))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {Object.entries(ROLLEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label className="text-xs">Ich suche</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.entries(ROLLEN).map(([k, v]) => (
                <label key={k} className={`rounded-full border px-3 py-1 text-xs cursor-pointer ${meins.ich_suche.includes(k) ? "border-accent-blue bg-accent-blue/5" : "border-border"}`}>
                  <input type="checkbox" className="mr-1 align-middle" checked={meins.ich_suche.includes(k)} onChange={(e) => setMeins((m) => ({ ...m, ich_suche: e.target.checked ? [...m.ich_suche, k] : m.ich_suche.filter((x) => x !== k) }))} />
                  {v}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs">Region</Label>
            <select value={meins.region ?? ""} onChange={(e) => setMeins((m) => ({ ...m, region: e.target.value || null }))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">bitte wählen</option>
              <option value="remote">Remote / egal</option>
              {Object.entries(BUNDESLAND_NAMES).filter(([k]) => k !== "bund").map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div><Label className="text-xs">Branche</Label><Input value={meins.branche ?? ""} onChange={(e) => setMeins((m) => ({ ...m, branche: e.target.value }))} placeholder="z. B. SaaS, E-Commerce, Handwerk" className="mt-1" /></div>
          <div>
            <Label className="text-xs">Phase</Label>
            <select value={meins.phase ?? ""} onChange={(e) => setMeins((m) => ({ ...m, phase: e.target.value }))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {Object.entries(PHASEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-xs">Zeit</Label>
            <select value={meins.zeit ?? ""} onChange={(e) => setMeins((m) => ({ ...m, zeit: e.target.value }))} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {Object.entries(ZEIT).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div className="md:col-span-2"><Label className="text-xs">Pitch: Was hast du vor, wen suchst du? (20–600 Zeichen)</Label><Textarea rows={4} maxLength={600} value={meins.pitch} onChange={(e) => setMeins((m) => ({ ...m, pitch: e.target.value }))} className="mt-1" /></div>
          <div className="md:col-span-2"><Label className="text-xs">Skills (mit Komma getrennt)</Label><Input value={meins.skills.join(", ")} onChange={(e) => setMeins((m) => ({ ...m, skills: e.target.value.split(",").map((s) => s.trim()).slice(0, 12) }))} className="mt-1" /></div>
          <label className="md:col-span-2 flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" checked={meins.sichtbar} onChange={(e) => setMeins((m) => ({ ...m, sichtbar: e.target.checked }))} />
            <span>Profil für andere GründerX-Mitglieder sichtbar machen. Sichtbar sind nur die Angaben oben – keine E-Mail, kein Nachname. Du kannst das Profil jederzeit verstecken oder löschen.</span>
          </label>
          <div className="md:col-span-2 flex gap-2">
            <Button onClick={speichern} disabled={meins.anzeigename.trim().length < 2 || meins.pitch.trim().length < 20 || !meins.ich_suche.length}>Profil speichern</Button>
            {meins.updated_at && <Button variant="outline" onClick={loeschen}>Profil löschen</Button>}
          </div>
        </div>
      )}

      {tab === "anfragen" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="font-bold mb-2">Eingang</h2>
            {eingang.length ? eingang.map((a) => <AnfrageKarte key={a.id} a={a} wer={name(a.von)} eingang beantworten={beantworten} />) : <p className="text-sm text-muted-foreground">Noch keine Anfragen.</p>}
          </div>
          <div>
            <h2 className="font-bold mb-2">Gesendet</h2>
            {ausgang.length ? ausgang.map((a) => <AnfrageKarte key={a.id} a={a} wer={name(a.an)} beantworten={beantworten} />) : <p className="text-sm text-muted-foreground">Du hast noch niemanden angefragt.</p>}
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

const AnfrageKarte = ({ a, wer, eingang, beantworten }: { a: Anfrage; wer: string; eingang?: boolean; beantworten: (id: string, s: "angenommen" | "abgelehnt", antwort: string) => void }) => {
  const [antwort, setAntwort] = useState("");
  return (
    <div className="rounded-xl border border-border bg-card p-3 mb-2 text-sm">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{eingang ? `von ${wer}` : `an ${wer}`}</span>
        <span>{new Date(a.created_at).toLocaleDateString("de-DE")} · {a.status}</span>
      </div>
      <p className="mt-1">{a.nachricht}</p>
      {a.antwort && <p className="mt-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2 text-xs"><strong>Antwort:</strong> {a.antwort}</p>}
      {eingang && a.status === "offen" && (
        <div className="mt-2 space-y-2">
          <Textarea rows={2} value={antwort} onChange={(e) => setAntwort(e.target.value)} placeholder="Antwort – bei Annahme z. B. deine E-Mail oder dein LinkedIn" className="text-sm" />
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
