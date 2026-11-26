# Brag Plan: Software Engineering — FUTO

## What is this app?
A department website + student portal for FUTO's Software Engineering department: one place for official notices, level timetables (100L–500L), course outlines, staff contacts, and a student project showcase. The prototype runs on labelled sample data.

## The angle
The department's own anti-confusion promise: every notice is "Posted here first, then shared to the class chats." The video frames the prototype as the single source of truth that ends WhatsApp-version chaos — earnest, institutional, demo-for-the-HOD energy.

## Hook (first 2-3 seconds)
Full-screen white. One line slams in: "Software Engineering — FUTO." Sub-line: "One place for notices, timetables, courses and student builds." No preamble, the name IS the hook.

## Key moments (the middle)
- The real student portal on screen: notices + timetable + courses for 100L, exactly as built.
- Three proof cards arriving one by one: "Posted here first" (notices beat chat chaos) → "100L–500L timetables" (real weekly grid) → "Student builds, stack first" (project showcase).
- The timetable-grid motif (5-column week mark) echoes as the visual thread.

## Outro / punchline
"Software Engineering — FUTO." / "Demo for the HOD · sample data." Quiet confidence, music fades under the name.

## User flow worth showing
Login → level-specific portal (notices + timetable + courses for your level) → explore projects. Centerpiece scenes show the portal doing this, not the landing page describing it.

## Tone
- Preset: polished
- Creative direction: quiet institutional launch film for a department demo
- Interpretation: 4 scenes, long holds, soft crossfades; restraint as confidence; nothing aggressive, nothing winking.

## Format: landscape — 1920x1080
## Duration: 20.2s

## Visual identity (from the project)
- Background: #ffffff
- Accent: #1a4be0
- Text: #111111
- Display font: Red Hat Display
- Body font: Red Hat Text
- Strongest visual element: the "Today in the department" panel + timetable grid; dot-grid engineering-paper background behind the hero only.

## Share copy (draft)
Software Engineering — FUTO finally has one home: notices posted here first, level timetables, courses and student builds. Demo for the HOD, running on sample data.

## Audio direction
- Role: warm bed
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3 (steady and clean, best for polished; 109.96 BPM)
- Music treatment: full bed at 0.32 from 0s; fade-out over the outro, out by 20.2s
- Music cue guidance: bundled preset happy-beats-business-moves-vol-12 (cues/...vol-12.music-cues.json); strong cues at 8.74s (scene 2→3 transition, beat-locked), 13.11s (third highlight card emphasis, beat-locked), 17.47s/18.56s (outro settle, beat-locked); beat-grid windows for sequential cards: 9.29 / 10.37 / 11.46 (every other beat for readability, then hold the full set)
- Audio-reactive treatment: subtle; hero dot-grid warmth and portal-card presence breathe with RMS. No waveform visuals.
- SFX posture: sparse, motion-matched, professional restraint
- Audio-coupled moments:
  - Scene 2 — portal reveal lands → soft impactBell or drop accent
  - Scene 3 — three cards arrive one by one → drop_001 per card on the beat grid
  - Scene 4 — final name settles → single bong_001, music fades beneath
- Restraint rule: no SFX on body copy or transitions; never stack cues; music never above 0.35.

## Storyboard

### Scene 1 — Hook — 3.82s
White screen, faint dot grid. "Software Engineering — FUTO" scales/fades in fast, holds. Sub-line fades up: "One place for notices, timetables, courses and student builds." Accent-blue week-grid mark above the title.
Sequential/interaction: none (three stacked reveals: mark at 0s, title at 0.05s, sub-line at 0.8s, then hold)
Audio intent: music bed starts; quiet confidence
Audio-coupled idea: none — let the title land clean
Music: vol-12 bed, full from 0s
Transition mood: soft crossfade → Scene 2

### Scene 2 — Reveal (real UI) — 4.92s (3.82–8.74)
The actual student portal screenshot in a rounded browser frame on white: "Today for 100L" notices + timetable + courses visible. Caption left: "The student portal." / "Your level's notices, timetable and courses." // beat-locked: portal frame lands at 3.27s (near beat 3.27); transition out at 8.74s locked to strong cue 8.74s
Sequential/interaction: caption lines arrive with the frame, then hold — the screenshot IS the content
Audio intent: bed continues; one soft reveal accent as the frame lands
Audio-coupled idea: single drop/soft-impact at frame landing
Music: bed continues
Transition mood: soft crossfade → Scene 3 (beat-locked 8.74s)

### Scene 3 — Three proofs — 6.55s (8.74–15.29)
Three cards arrive one by one beside a cropped real timetable screenshot: 1) "Posted here first — every notice beats the chat chaos." 2) "Timetables by level — 100L to 500L, weekly grid." 3) "Student builds — stack first, then the builders." // beat-grid: card 1 at 9.29s, card 2 at 10.37s, card 3 at 11.46s (every other beat, then full set holds to 15.29s); card 3 emphasis near strong cue 13.11s
Sequential/interaction: yes — 3 cards slide/fade in one by one
Audio intent: gentle momentum, one accent per card
Audio-coupled idea: card-place/drop sound per card, same family, first and last accented
Music: bed continues
Transition mood: soft crossfade → Scene 4

### Scene 4 — Outro — 4.90s (15.29–20.19)
Centered: week-grid mark, "Software Engineering — FUTO", "Demo for the HOD · sample data." Music fades out beneath the name. // beat-locked: name settle near 17.47s strong cue
Sequential/interaction: none — single settle, long hold
Audio intent: resolution; single soft bell as the name settles, then bed fades
Audio-coupled idea: final bong_001 with the name, music fade-out to 20.19s
Music: fade-out from ~18.5s, silent by end
Transition mood: none (end; hold last frame 1s+)

**Music mood for this video:** steady, clean, institutional warm
**Audio summary:** One continuous vol-12 bed with a soft reveal accent, three card drops, and a final bell under the fade-out — restraint throughout.

## Rubric answers (step-1 inspect, from real code/screens)
1. Dept website + student portal for FUTO Software Engineering; notices, timetables, courses, projects, staff contacts in one place; demo on sample data.
2. Most telling claim: "Every notice is posted here first, then shared to class chats." (anti-WhatsApp-confusion promise, verbatim from the site.)
3. Visual hook: white engineering-paper hero with dot grid + live "Today in the department" panel; timetable-grid motif; near-black primary buttons, one blue accent.
4. Show the portal (Today for 100L: notices + timetable + courses) and the timetable grid — the product in use. Screenshots: .hstack/ui/screens/portal/1440.png, timetable/1440.png.
5. 20 seconds: hook + portal reveal + 3 proofs + outro, every line held to the reading floor.
6. Tone: polished / quiet institutional launch film.
7. Audio: warm steady bed (vol-12) + 4–5 sparse motion-matched SFX; no voice.
8. Share caption: see draft above.
9. User flow: login → level portal (notices/timetable/courses) → explore projects. No result calculator, no real auth — never shown or claimed.
