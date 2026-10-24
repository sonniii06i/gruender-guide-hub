// Meldet die Vorlagen-URLs per IndexNow (Bing, Yandex, Seznam, Naver – Google
// nimmt nicht teil) an. Schlüssel liegt als public/<key>.txt auf der Domain.
//
//   node scripts/indexnow-vorlagen.mjs            # alle /vorlagen-URLs aus public/sitemap.xml
//   node scripts/indexnow-vorlagen.mjs /vorlagen/gbr-gesellschaftsvertrag …   # nur diese Pfade
//
// Erst nach dem Deploy laufen lassen: IndexNow prüft die Schlüsseldatei live.
import { readFileSync, readdirSync } from "node:fs";

const HOST = "gruenderx.de";
const keyDatei = readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyDatei) {
  console.error("Keine IndexNow-Schlüsseldatei public/<32 hex>.txt gefunden.");
  process.exit(1);
}
const key = readFileSync(`public/${keyDatei}`, "utf8").trim();

const pfade = process.argv.slice(2);
const urls = pfade.length
  ? pfade.map((p) => `https://${HOST}${p}`)
  : [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((u) => /\/vorlagen(\/|$)/.test(u));

const live = await fetch(`https://${HOST}/${keyDatei}`);
if (!live.ok || (await live.text()).trim() !== key) {
  console.error(`Schlüsseldatei https://${HOST}/${keyDatei} ist noch nicht live (HTTP ${live.status}).`);
  process.exit(1);
}

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyDatei}`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs gemeldet, HTTP ${r.status} ${r.statusText}`);
if (!r.ok && r.status !== 202) {
  console.error(await r.text());
  process.exit(1);
}
