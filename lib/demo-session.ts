"use client";

import type { Level } from "./sample-data";
import { LEVELS } from "./sample-data";

export interface DemoSession {
  name: string;
  email: string;
  phone: string;
  level: Level;
}

const KEY = "soe-demo-session";

export function getSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoSession;
    if (!parsed.email || !LEVELS.includes(parsed.level)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: DemoSession) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
}
