import { loadFont as loadDisplay } from "@remotion/google-fonts/RedHatDisplay";
import { loadFont as loadText } from "@remotion/google-fonts/RedHatText";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";

// Brand tokens from .hstack/ui/DESIGN.md (white-link-blue). Accent is fills only, never text on white.
export const brand = {
  name: "Software Engineering — FUTO",
  url: "Software Engineering — FUTO", // end pill text; real domain is [NEED] per storyboard
  logo: "logo.svg", // timetable-grid mark in public/
  accent: "#1a4be0",
  ink: "#111111",
  paper: "#ffffff",
  surface: "#f4f4f4",
  surface2: "#ececec",
  night: "#141416",
  muted: "#6b6b6b",
  line: "#e2e2e2",
};

export const sans = loadText("normal", { weights: ["400", "500", "700"], subsets: ["latin"] }).fontFamily;
export const display = loadDisplay("normal", { weights: ["400", "500", "700"], subsets: ["latin"] }).fontFamily;
export const mono = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;
export const displayFamily = display;
