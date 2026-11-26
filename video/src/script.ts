import voice from "./voice.json";

// Script: one line per storyboard row. Silent cut (no voice files): scene lengths come from `min`.
// Voice lines stay as `say` for a later narrated render; estimated ~2.6 words/s.
export type Line = { id: string; text: string; say?: string; tempo?: number; min: number };

export const SCRIPT: Line[] = [
  { id: "intro", text: "Introducing Software Engineering FUTO.", say: "Introducing Software Engineering FUTO.", min: 3.2 },
  { id: "problem", text: "Right now department news lives in WhatsApp chats like this.", say: "[playful] Right now department news lives in WhatsApp chats like this.", min: 3.8 },
  { id: "sting", text: "Copied. Pasted. Forgotten.", say: "[fast] Copied. Pasted. Forgotten.", min: 2.7 },
  { id: "fix", text: "This site fixes that. Posted here first.", say: "[confident] This site fixes that. Posted here first.", min: 3.2 },
  { id: "today", text: "Notices, timetables and courses for your level.", say: "Notices, timetables and courses for your level.", min: 4.3 },
  { id: "verbs", text: "Courses, projects and staff. Built by students.", say: "[warm] Courses, projects and staff. Built by students.", min: 3.8 },
  { id: "demo", text: "A demo for the HOD. Everything here is sample data.", say: "[serious] A demo for the HOD. Everything here is sample data.", min: 3.3 },
  { id: "logo", text: "Software Engineering FUTO. One place for the department.", say: "[warm] Software Engineering FUTO. One place for the department.", min: 3.0 },
];

export const FPS = 60;
export const TRANSITION = 20; // frames each scene overlaps the next
const LEAD = 0.2; // seconds before a line starts in its scene
const TAIL = 0.3; // seconds after it ends
const WORDS_PER_SECOND = 2.6;

type Word = { text: string; start: number; end: number };
const VOICE = voice as Record<string, { seconds: number; words: Word[] }>;

export const s = (seconds: number) => Math.round(seconds * FPS);
export const LEAD_FRAMES = s(LEAD);
export const hasVoice = (id: string) => Boolean(VOICE[id]);

const line = (id: string) => {
  const l = SCRIPT.find((x) => x.id === id);
  if (!l) throw new Error(`no script line "${id}"`);
  return l;
};
const spoken = (id: string) => VOICE[id]?.seconds ?? line(id).text.split(/\s+/).length / WORDS_PER_SECOND;

// Silent cut (no voice files yet): each scene lasts exactly its storyboard `min`. Once voice is
// generated, scenes stretch to fit their lines; `at()` cues already estimate from the words.
export const sceneFrames = (id: string) => VOICE[id]
  ? Math.round(Math.max(line(id).min, LEAD + spoken(id) + TAIL) * FPS)
  : s(line(id).min);
export const TOTAL_FRAMES = SCRIPT.reduce((sum, l) => sum + sceneFrames(l.id), 0) - TRANSITION * (SCRIPT.length - 1);

const normalise = (w: string) => w.toLowerCase().replace(/[^a-z0-9.]/g, "").replace(/^\.+|\.+$/g, "");

// at is the frame, within its scene, when `word` is said (its nth occurrence), so motion lands on it.
export function at(id: string, word: string, nth = 0): number {
  const want = normalise(word);
  const hits = VOICE[id]?.words.filter((w) => normalise(w.text) === want);
  if (hits?.[nth]) return Math.round((LEAD + hits[nth].start) * FPS);
  const words = line(id).text.split(/\s+/).map(normalise);
  const index = words.reduce<number[]>((acc, w, i) => (w === want ? [...acc, i] : acc), [])[nth];
  if (index === undefined) throw new Error(`"${word}" is not in the ${id} line`);
  return Math.round((LEAD + (index / words.length) * spoken(id)) * FPS);
}
