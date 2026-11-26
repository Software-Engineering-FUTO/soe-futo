import { interpolate, spring, type SpringConfig } from "remotion";
import { FPS } from "./script";

// The few ways things move. Everything in a scene is built from these.

const soft: Partial<SpringConfig> = { damping: 200, mass: 1 };
const lively: Partial<SpringConfig> = { damping: 16, mass: 0.8, stiffness: 120 };

// rise is 0 before `delay` (frames), then springs to 1. bouncy overshoots and settles.
export function rise(frame: number, delay = 0, bouncy = false) {
  return spring({ frame: frame - delay, fps: FPS, config: bouncy ? lively : soft });
}

// enter is the default entrance: out of a slight blur, rising and scaling up with a small bounce.
export function enter(frame: number, delay = 0, distance = 28) {
  const p = rise(frame, delay);
  const b = rise(frame, delay, true);
  return { opacity: p, transform: `translateY(${(1 - b) * distance}px) scale(${0.94 + b * 0.06})`, filter: p < 0.99 ? `blur(${(1 - p) * 8}px)` : undefined };
}

// pop is a bigger bounce from small, with a slight turn: for badges, icons and chips.
export function pop(frame: number, delay = 0) {
  const b = rise(frame, delay, true);
  return { opacity: Math.min(1, rise(frame, delay) * 1.5), transform: `scale(${0.4 + b * 0.6}) rotate(${(1 - b) * -6}deg)` };
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// between maps frame onto [from, to] with easing at both ends and no overshoot: camera moves, bars, lines.
export function between(frame: number, start: number, end: number, from: number, to: number) {
  return interpolate(frame, [start, end], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut });
}
