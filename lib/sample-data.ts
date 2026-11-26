export type Level = "100L" | "200L" | "300L" | "400L" | "500L";

export const LEVELS: Level[] = ["100L", "200L", "300L", "400L", "500L"];

export interface Announcement {
  id: string;
  level: Level | "All levels";
  title: string;
  body: string;
  date: string;
  channel: string;
}

export interface TimetableEntry {
  id: string;
  level: Level;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  start: string;
  end: string;
  courseCode: string;
  courseTitle: string;
  venue: string;
}

export interface Course {
  code: string;
  title: string;
  level: Level;
  units: number;
  outline: string[];
  lecturer: string;
  resources: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  builders: string;
  repo: string;
  status: "Approved sample" | "Pending sample review";
}

export interface StaffContact {
  id: string;
  name: string;
  role: string;
  focus: string;
  email: string;
  office: string;
  hours: string;
}

export interface DeptEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
}

const SAMPLE = "Sample";

export const announcements: Announcement[] = [
  {
    id: "a1",
    level: "All levels",
    title: `${SAMPLE}: Harmattan semester lectures begin Monday`,
    body: "Sample notice. Lectures for the harmattan semester begin on Monday. Check your level timetable for venues and confirm with your class rep.",
    date: "2026-11-23",
    channel: "Posted here first, then shared to the level WhatsApp groups",
  },
  {
    id: "a2",
    level: "100L",
    title: `${SAMPLE}: 100L orientation and lab onboarding`,
    body: "Sample notice. New 100L students meet at the demo lab for account setup and a tour of the department tools.",
    date: "2026-11-22",
    channel: "Posted here first, then shared to the 100L WhatsApp group",
  },
  {
    id: "a3",
    level: "200L",
    title: `${SAMPLE}: 200L data structures test venue changed`,
    body: "Sample notice. The data structures continuous assessment moved to a new hall. Arrive with your sample ID card.",
    date: "2026-11-21",
    channel: "Posted here first, then shared to the 200L WhatsApp group",
  },
  {
    id: "a4",
    level: "300L",
    title: `${SAMPLE}: 300L SIWES briefing slides ready`,
    body: "Sample notice. The SIWES briefing slides are now on the 300L course page. Placement letters follow next week.",
    date: "2026-11-20",
    channel: "Posted here first, then shared to the 300L WhatsApp group",
  },
  {
    id: "a5",
    level: "400L",
    title: `${SAMPLE}: 400L final-year project topics list`,
    body: "Sample notice. A sample list of project topic areas is open for discussion with supervisors. Nothing here is final.",
    date: "2026-11-19",
    channel: "Posted here first, then shared to the 400L WhatsApp group",
  },
  {
    id: "a6",
    level: "500L",
    title: `${SAMPLE}: 500L project defence schedule draft`,
    body: "Sample notice. A draft defence timetable is out for comments. Confirm your slot with your supervisor.",
    date: "2026-11-18",
    channel: "Posted here first, then shared to the 500L WhatsApp group",
  },
];

export const timetable: TimetableEntry[] = [
  { id: "t1", level: "100L", day: "Monday", start: "08:00", end: "10:00", courseCode: "SEN101", courseTitle: "Sample: Introduction to Software Engineering", venue: "Sample Hall A" },
  { id: "t2", level: "100L", day: "Tuesday", start: "10:00", end: "12:00", courseCode: "SEN102", courseTitle: "Sample: Programming Fundamentals", venue: "Sample Lab 1" },
  { id: "t3", level: "100L", day: "Wednesday", start: "13:00", end: "15:00", courseCode: "MTH101", courseTitle: "Sample: General Mathematics", venue: "Sample Hall B" },
  { id: "t4", level: "200L", day: "Monday", start: "10:00", end: "12:00", courseCode: "SEN201", courseTitle: "Sample: Data Structures", venue: "Sample Hall A" },
  { id: "t5", level: "200L", day: "Thursday", start: "08:00", end: "10:00", courseCode: "SEN202", courseTitle: "Sample: Object-Oriented Programming", venue: "Sample Lab 2" },
  { id: "t6", level: "200L", day: "Friday", start: "13:00", end: "15:00", courseCode: "SEN203", courseTitle: "Sample: Web Development Basics", venue: "Sample Lab 1" },
  { id: "t7", level: "300L", day: "Tuesday", start: "08:00", end: "10:00", courseCode: "SEN301", courseTitle: "Sample: Database Systems", venue: "Sample Lab 2" },
  { id: "t8", level: "300L", day: "Wednesday", start: "10:00", end: "12:00", courseCode: "SEN302", courseTitle: "Sample: Operating Systems", venue: "Sample Hall A" },
  { id: "t9", level: "300L", day: "Thursday", start: "13:00", end: "15:00", courseCode: "SEN303", courseTitle: "Sample: Software Requirements", venue: "Sample Hall B" },
  { id: "t10", level: "400L", day: "Monday", start: "13:00", end: "15:00", courseCode: "SEN401", courseTitle: "Sample: Software Architecture", venue: "Sample Hall B" },
  { id: "t11", level: "400L", day: "Wednesday", start: "08:00", end: "10:00", courseCode: "SEN402", courseTitle: "Sample: Mobile App Development", venue: "Sample Lab 1" },
  { id: "t12", level: "500L", day: "Tuesday", start: "13:00", end: "15:00", courseCode: "SEN501", courseTitle: "Sample: Final-Year Project Studio", venue: "Sample Project Lab" },
  { id: "t13", level: "500L", day: "Friday", start: "08:00", end: "10:00", courseCode: "SEN502", courseTitle: "Sample: Software Project Management", venue: "Sample Hall A" },
];

export const courses: Course[] = [
  {
    code: "SEN101",
    title: "Sample: Introduction to Software Engineering",
    level: "100L",
    units: 3,
    outline: ["What software engineering is", "The software lifecycle", "Teams and roles", "Sample mini project"],
    lecturer: "Sample lecturer",
    resources: ["Sample course handout", "Sample reading list"],
  },
  {
    code: "SEN201",
    title: "Sample: Data Structures",
    level: "200L",
    units: 3,
    outline: ["Arrays and lists", "Stacks and queues", "Trees", "Sample coding exercises"],
    lecturer: "Sample lecturer",
    resources: ["Sample problem set"],
  },
  {
    code: "SEN202",
    title: "Sample: Object-Oriented Programming",
    level: "200L",
    units: 3,
    outline: ["Classes and objects", "Inheritance", "Polymorphism", "Sample class project"],
    lecturer: "Sample lecturer",
    resources: ["Sample lab guide"],
  },
  {
    code: "SEN301",
    title: "Sample: Database Systems",
    level: "300L",
    units: 3,
    outline: ["Relational model", "SQL basics", "Normalization", "Sample schema design"],
    lecturer: "Sample lecturer",
    resources: ["Sample SQL exercises"],
  },
  {
    code: "SEN401",
    title: "Sample: Software Architecture",
    level: "400L",
    units: 3,
    outline: ["Architectural styles", "APIs and contracts", "Trade-offs", "Sample design review"],
    lecturer: "Sample lecturer",
    resources: ["Sample case study"],
  },
  {
    code: "SEN501",
    title: "Sample: Final-Year Project Studio",
    level: "500L",
    units: 6,
    outline: ["Proposal", "Build milestones", "Testing", "Defence"],
    lecturer: "Sample lecturer",
    resources: ["Sample proposal template"],
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Sample: Level timetable viewer",
    description: "Sample project. A phone-first viewer for weekly lecture timetables by level.",
    stack: ["TypeScript", "Next.js"],
    builders: "Sample student team A",
    repo: "https://example.com/sample-timetable-viewer",
    status: "Approved sample",
  },
  {
    id: "p2",
    title: "Sample: Notice board bot",
    description: "Sample project. Forwards department notices from this site to class chats with a source link.",
    stack: ["Python"],
    builders: "Sample student team B",
    repo: "https://example.com/sample-notice-bot",
    status: "Approved sample",
  },
  {
    id: "p3",
    title: "Sample: Past questions archive",
    description: "Sample project. A searchable archive of sample past questions by course code.",
    stack: ["TypeScript", "SQLite"],
    builders: "Sample student team C",
    repo: "https://example.com/sample-past-questions",
    status: "Pending sample review",
  },
];

export const staff: StaffContact[] = [
  {
    id: "s1",
    name: "Sample — Head of Department",
    role: "Head of Department",
    focus: "Sample research focus",
    email: "sample.hod@example.com",
    office: "Sample office, SE building",
    hours: "Sample: Tue 10:00–12:00",
  },
  {
    id: "s2",
    name: "Sample — Lecturer",
    role: "Lecturer",
    focus: "Sample: databases",
    email: "sample.lecturer@example.com",
    office: "Sample office, SE building",
    hours: "Sample: Wed 13:00–15:00",
  },
  {
    id: "s3",
    name: "Sample — Lab technologist",
    role: "Laboratory staff",
    focus: "Sample: teaching labs",
    email: "sample.lab@example.com",
    office: "Sample lab office",
    hours: "Sample: Mon–Fri 09:00–16:00",
  },
];

export const events: DeptEvent[] = [
  {
    id: "e1",
    title: "Sample: Build weekend hackathon",
    date: "2026-12-05",
    venue: "Sample lab block",
    description: "Sample event. Student teams ship a small tool for the department in one weekend.",
  },
  {
    id: "e2",
    title: "Sample: Final-year project demo day",
    date: "2026-12-12",
    venue: "Sample hall",
    description: "Sample event. Final-year students demo their projects to staff and visitors.",
  },
];

export const STAFF_NEED =
  "[NEED: HOD name and staff list for contacts page]";
export const COURSE_NEED =
  "[NEED: real course outlines for 2–3 sample courses]";
export const PROJECT_NEED =
  "[NEED: 3–5 real student projects for showcase seed]";
