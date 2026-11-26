# Hyperframes Composition Brief: Software Engineering — FUTO

## Objective
Create a polished 20-second launch-style brag video for the FUTO Software Engineering department prototype (HOD demo).

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20.19 seconds

## Source Material
- Project root: /Users/shellhaki/soe-futo
- Primary files read: app/(marketing)/page.tsx (hero copy), app/(portal)/portal/page.tsx, lib/sample-data.ts (notices, timetable, projects), .hstack/ui/DESIGN.md (tokens), spec/overview.md (Phase 1 scope)
- Product name: Software Engineering — FUTO
- Tagline / strongest claim: "One place for notices, timetables, courses and student builds." / "Every notice is posted here first, then shared to class chats."
- Key UI moment to recreate: the student portal "Today for 100L" view (notices + timetable + courses) — use the REAL screenshot assets/portal.png; plus the real timetable grid asset asset/timetable.png
- Copy that must appear verbatim:
  - "Software Engineering — FUTO"
  - "One place for notices, timetables, courses and student builds."
  - "Posted here first"
  - "Demo for the HOD · sample data"

## Creative Direction
- Tone preset: polished
- Creative direction: quiet institutional launch film for a department demo
- Interpretation: 4 scenes, long confident holds, soft crossfades (0.5s), fast-in-then-hold entrances, generous white space, nothing aggressive
- Angle: the single source of truth that ends WhatsApp-version chaos — every notice "posted here first"
- Hook: full-screen "Software Engineering — FUTO" on white with dot grid (first 2s)
- Outro / punchline: name + "Demo for the HOD · sample data", music fading beneath
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign (stay in white / #111 / #1a4be0 / Red Hat)

## Visual Identity
- Background: #ffffff (dot grid in #e2e2e2 behind hero scenes only)
- Text: #111111
- Accent: #1a4be0 (week-grid mark, one highlight per scene max)
- Display font: Red Hat Display (Google Fonts, system sans fallback)
- Body font: Red Hat Text (Google Fonts, system sans fallback)
- Visual references: hero "Today in the department" panel, timetable weekly grid, portal cards with 16px radius + hairline borders, dot-pattern engineering paper

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 3.82s — title + sub-line on dot grid; title at 0.05s, sub-line at 0.8s, hold
2. Portal reveal — 4.92s (3.82–8.74) — real portal screenshot in browser frame + caption; // beat-locked out at 8.74s
3. Three proofs — 6.55s (8.74–15.29) — 3 cards one by one beside real timetable crop; // beat-grid 9.29 / 10.37 / 11.46, hold full set
4. Outro — 4.90s (15.29–20.19) — name + demo line, music fade-out; // beat-locked settle near 17.47s

## Audio
- Audio role: warm bed
- Audio arc: steady bed throughout, soft reveal accent, three card drops, final bell under fade-out
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3 (volume 0.32, fade-out last ~1.7s)
- Music treatment: full bed 0–18.5s, linear fade to silence by 20.19s
- Music cue guidance: bundled preset assets/music/cues/vol-12 stem json; strong cues 8.74 (S2→S3), 13.11 (card-3 emphasis), 17.47 (outro settle); beat-grid windows 9.29/10.37/11.46 for cards
- Audio-reactive treatment: subtle; dot-grid warmth and portal-card presence breathe with RMS. No waveform/equalizer visuals.
- Audio-coupled moments:
  - Scene 2 frame landing — soft drop accent
  - Scene 3 cards — one drop_001-family sound per card at the same timestamp as the visual
  - Scene 4 name settle — single bong_001, music fading beneath
- SFX selection guidance: polished restraint — interface/drop_001 for reveals, interface/bong_001 once for the outro; low high-frequency-risk files only
- SFX analysis guidance: <skill-dir>/assets/sfx/sfx-analysis.md (prefer low/medium HF risk)
- Exact SFX choice: Hyperframes (this composition) chooses filenames, timestamps, density, volume per implemented animation
- Audio files: copied into brag-output/composition/assets/ (music + selected SFX + screenshots)

## Hyperframes Instructions
Single-file composition (index.html, GSAP via CDN, Red Hat via Google Fonts). One root composition id "main", 20.19s. Four full-frame .clip scenes with data-start/data-duration; one paused GSAP timeline registered as window.__timelines["main"] using absolute position params; entrances 0.3–0.6s fast-in then HOLD for reading floor (short label ≥0.8s settled; sentences ≥0.3s/word). Scenes crossfade via opacity. Screenshots as <img> with relative paths assets/img/*.png. Audio <audio> elements: music track-index 10, SFX ascending from 11.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (portal + timetable screenshots — required).
- Keep all text readable in the final render (no text pulled before its hold floor).
- Keep the video within 15-25 seconds (20.19s).
- Include the planned music/SFX layer.
- Major reveals near strong cues within ±0.15s (marked // beat-locked); card entrances on beat grid within ±0.10s (marked // beat-grid).
- SFX support motion/interaction; planned fade-out honored.
- Local assets for audio and screenshots (relative paths only).
- `hyperframes check` passes with zero errors before render.
