// Generates the voiceover with ElevenLabs v3: one MP3 per script line in public/voice/, and the time of
// every word in src/voice.json, which the video uses for scene lengths and to land motion on words.
//
//   ELEVENLABS_API_KEY=...   in .env (required)
//   ELEVENLABS_VOICE_ID=...  the voice (default: Jessica, a warm female voice)
//   bun run voice [id ...]   (no ids: every line)

import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { SCRIPT } from "../src/script";

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "cgSgspJ2msm6clMCkdW9";
const API = "https://api.elevenlabs.io/v1";

if (!KEY) {
  console.error("Set ELEVENLABS_API_KEY in .env first (check the name: no typo, no bare key).");
  process.exit(1);
}

const only = process.argv.slice(2);
const timings: Record<string, unknown> = JSON.parse(readFileSync("src/voice.json", "utf8"));
mkdirSync("public/voice", { recursive: true });

for (const line of SCRIPT) {
  if (only.length && !only.includes(line.id)) continue;
  // 128 kbps works on every plan; 192 needs Creator.
  const res = await fetch(`${API}/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json" },
    body: JSON.stringify({
      text: line.say || line.text,
      model_id: "eleven_v3",
      voice_settings: { stability: 0.0, similarity_boost: 0.8, use_speaker_boost: true },
    }),
  });
  if (!res.ok) {
    console.error(`${line.id}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const body = await res.json() as {
    audio_base64: string;
    alignment: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
  };
  const file = `public/voice/${line.id}.mp3`;
  writeFileSync(file, Buffer.from(body.audio_base64, "base64"));

  // Speed a slow line up afterwards, keeping its pitch, and scale its word timings to match.
  const tempo = line.tempo ?? 1;
  if (tempo !== 1) {
    const sped = Bun.spawnSync(["ffmpeg", "-v", "error", "-y", "-i", file, "-filter:a", `atempo=${tempo}`, "-q:a", "2", `${file}.tmp.mp3`]);
    if (sped.exitCode !== 0) throw new Error(`ffmpeg failed on ${file}: ${sped.stderr}`);
    renameSync(`${file}.tmp.mp3`, file);
  }

  const { characters, character_start_times_seconds: starts, character_end_times_seconds: ends } = body.alignment;
  const words: { text: string; start: number; end: number }[] = [];
  let current: { text: string; start: number; end: number } | null = null;
  characters.forEach((ch, k) => {
    if (/\s/.test(ch)) {
      if (current) words.push(current);
      current = null;
      return;
    }
    if (!current) current = { text: "", start: starts[k] / tempo, end: ends[k] / tempo };
    current.text += ch;
    current.end = ends[k] / tempo;
  });
  if (current) words.push(current);

  const seconds = (ends[ends.length - 1] ?? 0) / tempo;
  timings[line.id] = { seconds, words };
  console.log(`${line.id}: ${seconds.toFixed(2)}s, ${words.length} words`);
}

writeFileSync("src/voice.json", JSON.stringify(timings, null, 2) + "\n");
console.log("Wrote public/voice/*.mp3 and src/voice.json");
