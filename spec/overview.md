# Software Engineering Department Website: Project Overview

Department of Software Engineering, Federal University of Technology Owerri (FUTO)
Prepared 26 November 2026 · Lead: Excel (Maxwell-Ugiagbe Excel)

Status: planning. The next step is a demo for the HOD. Figures marked "proposed" are targets to agree, not measurements.

---

## 1. Summary

A website and student portal for the Software Engineering department. It puts announcements, timetables, course information, student projects and staff contacts in one place, and gives the department an online identity as a software engineering department.

Plan: build a demo with a few coursemates, present it to the HOD, pilot it with 100L to 300L students, then build the full system once there is funding. The goal is to make it the official channel for department information for 100L to 300L.

Working site name and domain from the notes: **Ases.com** (to confirm, see section 14).

## 2. Problem

- The department has nothing online that shows its identity as software engineers.
- Notices, timetable changes and deadlines move through WhatsApp groups and class reps, so students miss them or get conflicting versions.
- Course outlines, past questions and notes sit on personal phones and drives.
- Project topics, supervisor allocation and SIWES reports are handled on paper or by chat, with no record or status tracking.

## 3. Objectives and proposed targets

| Objective | Measure | Proposed target (pilot) |
| --- | --- | --- |
| One source of truth for notices | Official announcements posted on the site first | 100% |
| Students use it | Registered students among 100L to 300L / weekly active | 70% / 50% |
| Easier access to materials | Courses with an outline and at least one resource | 80% of courses |
| Department identity | Student projects in the showcase | 20 projects |
| Less admin load | Staff and class reps can post without a developer | Yes |

## 4. Users

| User | Main needs |
| --- | --- |
| Students (100L to 500L) | Notices, level timetable, course materials, project showcase, profile, SIWES and final-year project steps |
| Lecturers and staff | Post notices and materials, see assigned supervisees, publish contacts and consultation hours |
| HOD and admin | Manage accounts, roles and content; approve showcase entries; see usage |
| Class reps | Post notices and timetable changes for their own level |
| Alumni and visitors | Department profile, staff, student projects, contact information |

## 5. Features

Everything from the planning notes and the proposal, in one list.

### Public side
- **Landing page:** hero with name, tagline and "Student portal" / "Explore projects" buttons; latest announcements; about the department; what we build and learn; project showcase; staff and leadership; quick links; events and achievements; contact and footer.
- **Meet the software engineers:** profiles of students and staff, with skills and project links.
- **Project showcase:** cards with title, description, tech stack and GitHub link.
- **Staff contacts:** name, role, area of focus, email, office, consultation hours.
- **Events:** hackathons, seminars, achievements, with RSVP later.

### Student portal (login required)
- **Login:** email and phone number (from the notes). The proposal assumed email and matric number; see section 14.
- **Level-specific content:** after login, each student sees notices, timetable and materials for their own level.
- **Profile:** name, level, contact details, skills and links.
- **Announcements:** department and level notices, with email alerts.
- **Timetable and calendar:** lectures, exams and deadlines, filtered by level.
- **Course outlines and pages:** outline, lecturer, materials, past questions.
- **Result calculator:** CGPA and result estimator, clearly labelled unofficial. This was Phase 3 in the proposal; the notes list it with the main features, so its priority is open.
- **Plug for Ases hub:** a link or integration to the Ases hub (meaning to confirm, see section 14).
- **Project and SIWES submissions with status:** Phase 2.

### Admin
- **Admin dashboard:** manage accounts, roles, courses, announcements, timetable and showcase entries; audit log; basic usage numbers.

## 6. Phases

| Phase | Features |
| --- | --- |
| 1. Demo | Landing page, announcements, timetable and calendar, course outlines, project showcase, staff contacts, student login with level-specific content, basic admin dashboard |
| 2. Pilot (100L to 300L) | Past questions library, email notifications (push later), class rep posting, profiles, Meet the software engineers, project and SIWES submissions with status, events |
| 3. Full system | Final-year project tracking with supervisors, request forms (letters, add/drop), alumni directory, result calculator (if not earlier), per-course discussion, admin analytics |

Suggested build order inside the demo:
1. Landing page (identity, staff, project showcase with sample data)
2. Announcements and timetable
3. Login, profile and course pages
4. Admin dashboard

## 7. What we are not building

- Official results, transcripts or fee payments. These stay with the university portal.
- A replacement for the university's student records system.
- A social network or general chat app.
- Anything that stores data the department has no authority to hold.

## 8. System design

One web app and one API in front of a database and file storage. A single codebase serves the public site, student portal and admin dashboard.

```
Browsers -> Web app -> API service -> Database
                          |        -> File storage
                          v
                      Notifier (email, push later)
```

Roles (one per account, checked by the API on every request):

| Role | Can do |
| --- | --- |
| Visitor | Read public pages |
| Student | Visitor access plus their level's timetable, materials, notifications, submissions |
| Class rep | Student access plus post notices and timetable changes for their level |
| Lecturer | Post notices and materials for their courses, view assigned supervisees |
| Admin (HOD or delegate) | Manage accounts, roles, courses and all content; approve showcase entries |

Core data: users, courses, notices, timetable entries, resources, projects, and (Phase 2) submissions with a status.

## 9. Tech stack and hosting

| Layer | Choice | Why |
| --- | --- | --- |
| Web app | Next.js with TypeScript | Fast public pages, one codebase for site, portal and admin |
| API | Bun with TypeScript | One language across web app and API |
| Database | PostgreSQL | Relational data for users, courses and submissions |
| File storage | S3-compatible bucket (for example Cloudflare R2) | Cheap storage for materials and reports |
| Auth | Email and phone number (see section 14), hashed passwords, short-lived sessions | Ties accounts to real students |
| Notifications | Email first, web push later | Works on every phone without an app |
| Hosting (demo) | Free tiers for web and database | No cost while proving the idea |
| Hosting (full) | One small VPS with backups to the bucket | Predictable monthly cost |

Domain: request a department address under the university's domain; otherwise use a low-cost domain of our own (the notes suggest Ases.com). Running costs are approximate: demo near zero; full system is a small VPS, a domain and storage. Replace with real quotes before any funding request.

## 10. Security and privacy

- Passwords hashed with a modern algorithm, rate-limited login, email verification at signup.
- Role checks on every API request, never only in the interface.
- Store only what is needed: name, level, email, phone number. No grades, fees or ID numbers.
- HTTPS everywhere, private file buckets with signed links, encrypted backups.
- Follow the Nigeria Data Protection Act 2023 principles: consent, purpose limitation, right to delete an account.
- Audit log of who posted, edited or deleted content, with a recovery path for deleted items.
- Terms-of-use page and admin moderation of uploads.

## 11. UX and identity

- Mobile first: works on small screens and slow connections, light pages, compressed images.
- Two entrances: public side for visitors, student portal behind login that opens on today's notices and timetable.
- Search across courses, notices and resources, with filters by level.
- Department logo, colour palette and tagline; homepage leads with student projects and the tools the department teaches.
- Readable type, strong contrast, plain language.
- Visual design agreed with the HOD at the demo stage; student designers can contribute.

## 12. Delivery plan

| Phase | Proposed duration | Output | Gate to move on |
| --- | --- | --- | --- |
| Plan | 1 to 2 weeks | Agreed features, non-features, hosting and security approach | Team agrees the plan |
| Demo | 4 to 6 weeks | Working demo with sample data | HOD approves |
| Pilot | One semester | Live for 100L to 300L with real content | Usage targets met and funding secured |
| Full system | After funding | Phase 3 features on production infrastructure | Handover to the department |

Team (names to add once coursemates are confirmed):

| Role | Responsibility |
| --- | --- |
| Project lead | Scope, timeline, HOD presentation, backend and API |
| Backend developer | Database, authentication, content endpoints |
| Frontend developer | Public site, student portal, admin dashboard |
| Designer | Identity, layout, mobile experience |
| Content and testing | Sample data, user testing, student feedback |

## 13. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| HOD or staff do not approve | Present a working demo, narrow scope, and a clear non-features list |
| Students keep using WhatsApp | Make the site the first place for notices, send email alerts, work with class reps |
| Content goes stale | Give class reps and lecturers posting access, assign an owner per section |
| Security or data-protection incident | Collect minimal data, enforce roles on the API, keep backups, review before launch |
| Team members drop out or exams interrupt work | Keep scope small, document the code, share ownership |
| Poor network or data costs | Light pages, mobile first, email alerts instead of an app |
| No funding for the full system | Pilot on free tiers and low-cost hosting, make the code easy to self-host |

## 14. Adoption, funding and the ask

- Adoption: launch the pilot with a short walkthrough per level; post every official notice on the site first, then share the link; train class reps and lecturers to post; collect feedback monthly. Aim to make the site compulsory for 100L to 300L once the pilot works.
- Funding: the demo and pilot need almost no money. The full system needs production hosting, a domain, backups and maintenance. Bring a costed budget with real quotes after the pilot.

The ask:
1. HOD approval to build and present the demo.
2. The department's endorsement when announcing it to students.
3. A decision after the pilot on making the site the official channel for 100L to 300L.
4. Support in finding funding for the full system.

## 15. Open questions

1. What is **Ases.com**: the site's name and domain, or something else? Is it available, and is it the department's or a student body's?
2. What is the **Ases hub**, and what should the "plug" do (link, embed, shared login)?
3. **Login identifier:** the notes say email and phone number; the proposal said email and matric number. Which one is the account key, and do we also collect the matric number to verify real students?
4. **Result calculator:** keep in Phase 3, or move it into the demo or pilot?
5. Who are the coursemates joining the demo, and who owns each role?
6. Which real details can go on the landing page now (levels offered, staff count, student count, department history)?