import { describe, expect, it } from "vitest";
import { mailVerifiziertClient } from "@/components/MailBestaetigenHinweis";
import { mailVerifiziert } from "../../supabase/functions/_shared/mailBesitz";

// Code-Wächter 20.11.2026: Der Hinweis „Bitte bestätige deine E-Mail-Adresse“ soll laut
// Kommentar dieselbe Regel nutzen wie der Server (_shared/mailBesitz.ts). Er wich in drei
// Punkten ab (Zweig „echte Supabase-Bestätigung“ vom 28.10., Pflicht email_confirmed_at,
// OAuth nur mit email_verified !== false). Dieser Test hält beide Regeln gleich.

const basis = { email: "a@b.de", email_confirmed_at: "2026-10-28T09:51:02Z", app_metadata: { provider: "email" }, identities: [] };

const faelle: [string, Record<string, unknown>][] = [
  ["echte Supabase-Bestätigung ohne Flag (28.10.)", { ...basis, confirmation_sent_at: "2026-10-27T21:59:28Z" }],
  ["Sofort-Konto ohne Bestätigungsmail", { ...basis, confirmation_sent_at: null }],
  ["Flag false schlägt Zeitstempel", { ...basis, app_metadata: { mail_verifiziert: false }, confirmation_sent_at: "2026-10-27T21:59:28Z" }],
  ["Flag true für genau diese Adresse", { ...basis, app_metadata: { mail_verifiziert: true, mail_verifiziert_email: "a@b.de" } }],
  ["Flag true für alte Adresse", { ...basis, app_metadata: { mail_verifiziert: true, mail_verifiziert_email: "alt@b.de" } }],
  ["Flag true ohne email_confirmed_at", { ...basis, email_confirmed_at: "", app_metadata: { mail_verifiziert: true, mail_verifiziert_email: "a@b.de" } }],
  ["OAuth bestätigt diese Adresse", { ...basis, app_metadata: { provider: "google" }, identities: [{ provider: "google", identity_data: { email: "A@b.de", email_verified: true } }] }],
  ["OAuth meldet Adresse unbestätigt", { ...basis, app_metadata: { provider: "google" }, identities: [{ provider: "google", identity_data: { email: "a@b.de", email_verified: false } }] }],
  ["OAuth mit anderer Adresse", { ...basis, app_metadata: { provider: "google" }, identities: [{ provider: "google", identity_data: { email: "alt@b.de" } }] }],
  ["nur E-Mail-Identität", { ...basis, identities: [{ provider: "email", identity_data: { email: "a@b.de" } }] }],
  ["ohne E-Mail", { ...basis, email: "" }],
];

describe("mailVerifiziertClient = mailVerifiziert (Server)", () => {
  it.each(faelle)("%s", (_name, user) => {
    expect(mailVerifiziertClient(user)).toBe(mailVerifiziert(user));
  });

  it("zeigt den Hinweis nicht nach echter Supabase-Bestätigung ohne Flag", () => {
    expect(mailVerifiziertClient(faelle[0][1])).toBe(true);
  });
});
