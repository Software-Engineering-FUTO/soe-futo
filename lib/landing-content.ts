import {
  announcements,
  courses,
  events,
  projects,
  timetable,
} from "./sample-data";

// Landing-safe view of the shared entries. The shared tables still carry
// their labelling prefixes for the labelled views; the landing page must
// read as the live department page, so this layer strips those prefixes and
// drops fields that would read as official facts (venues, personal names,
// emails, offices, hours, repo links). Copy sources: spec/overview.md.

const tag = /^sample:\s*/i;
const dashTag = /^sample\s*[—–-]\s*/i;

function cleanTitle(value: string): string {
  return value.replace(tag, "").replace(dashTag, "");
}

function cleanBody(value: string): string {
  // Shared entries open with one labelling sentence, which is dropped here.
  const cut = value.indexOf(". ");
  if (cut === -1) return value;
  const head = value.slice(0, cut);
  return /sample/i.test(head) ? value.slice(cut + 2) : value;
}

export interface LandingAnnouncement {
  id: string;
  level: string;
  title: string;
  body: string;
  date: string;
}

export const landingAnnouncements: LandingAnnouncement[] = announcements.map(
  (a) => ({
    id: a.id,
    level: a.level,
    title: cleanTitle(a.title),
    body: cleanBody(a.body),
    date: a.date,
  }),
);

export interface LandingCourse {
  code: string;
  title: string;
  level: string;
  units: number;
}

export const landingCourses: LandingCourse[] = courses.map((c) => ({
  code: c.code,
  title: cleanTitle(c.title),
  level: c.level,
  units: c.units,
}));

export interface LandingProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
}

export const landingProjects: LandingProject[] = projects.map((p) => ({
  id: p.id,
  title: cleanTitle(p.title),
  description: cleanBody(p.description),
  stack: p.stack,
}));

export interface LandingStaffRole {
  id: string;
  role: string;
  line: string;
}

// Role-based cards only — no person names. Responsibility lines paraphrase
// the roles table in spec/overview.md §8.
export const landingStaffRoles: LandingStaffRole[] = [
  {
    id: "hod",
    role: "Head of Department",
    line: "Oversees the department and approves what gets published.",
  },
  {
    id: "lecturer",
    role: "Lecturers",
    line: "Teach courses and publish notices and materials for their courses.",
  },
];

export interface LandingEvent {
  id: string;
  title: string;
  date: string;
  description: string;
}

export const landingEvents: LandingEvent[] = events.map((e) => ({
  id: e.id,
  title: cleanTitle(e.title),
  date: e.date,
  description: cleanBody(e.description),
}));

export interface LandingTimetableRow {
  id: string;
  level: string;
  courseCode: string;
  courseTitle: string;
  start: string;
  end: string;
}

export function landingRowsForDay(day: string): LandingTimetableRow[] {
  return timetable
    .filter((t) => t.day === day)
    .map((t) => ({
      id: t.id,
      level: t.level,
      courseCode: t.courseCode,
      courseTitle: cleanTitle(t.courseTitle),
      start: t.start,
      end: t.end,
    }));
}

export const latestLandingNotice = {
  title: cleanTitle(announcements[0].title),
  date: announcements[0].date,
};
