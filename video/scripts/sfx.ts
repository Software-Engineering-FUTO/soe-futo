// Generates the sound effects with ElevenLabs into public/sfx/ and lists them in src/sfx.json, so the
// video plays only the ones that exist.
//
//   ELEVENLABS_API_KEY=... in .env
//   bun run sfx [name ...]   (no names: every effect)

import { mkdirSync, writeFileSync } from "node:fs";
import { SFX } from "../src/sfx-list";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("Set ELEVENLABS_API_KEY in .env first.");
  process.exit(1);
}

const only = process.argv.slice(2);
mkdirSync("public/sfx", { recursive: true });

for (const [name, { prompt, seconds }] of Object.entries(SFX)) {
  if (only.length && !only.includes(name)) continue;
  const res = await fetch("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json" },
    body: JSON.stringify({ text: prompt, duration_seconds: seconds, prompt_influence: 0.6 }),
  });
  if (!res.ok) {
    console.error(`${name}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  writeFileSync(`public/sfx/${name}.mp3`, Buffer.from(await res.arrayBuffer()));
  console.log(`${name}: done`);
}

const made = Object.keys(SFX).filter((name) => Bun.file(`public/sfx/${name}.mp3`).size > 0);
writeFileSync("src/sfx.json", JSON.stringify(made, null, 2) + "\n");
console.log(`Wrote public/sfx/*.mp3 and src/sfx.json (${made.length} effects)`);
