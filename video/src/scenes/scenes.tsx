import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { between, enter, pop, rise } from "../motion";
import { Glitchy, Pill, Shine, Sfx, SlotWord, Slam, Stage, Tilt, TypeLine } from "../kit";
import { at, s } from "../script";
import { brand, displayFamily, mono } from "../theme";

// Every scene pushes the camera slowly in (1 → 1.05) over its own duration.
function Zoom({ children }: { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const zoom = between(frame, 0, durationInFrames, 1, 1.05);
  return <AbsoluteFill style={{ transform: `scale(${zoom})` }}>{children}</AbsoluteFill>;
}

function SampleBadge() {
  return (
    <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: brand.muted, border: `2px solid ${brand.line}`, borderRadius: 999, padding: "8px 20px", background: "#fff" }}>
      Sample data
    </span>
  );
}

// 1. intro — "Introducing" types, the timetable-grid mark lands, the name spins in on slot reels.
export function IntroScene() {
  const frame = useCurrentFrame();
  const word = at("intro", "Introducing");
  const land = at("intro", "Software") - 6;
  const logo = rise(frame, land, true);
  const ring = between(frame, land, land + s(0.9), 0, 1);
  return (
    <Stage>
      <Zoom>
        <Sfx name="typing" at={word} length={s(0.5)} volume={0.35} />
        <Sfx name="reveal" at={land} volume={0.4} />
        <Sfx name="slot" at={land + 2} volume={0.5} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 28 }}>
          <TypeLine text="Introducing" at={word} cps={26} size={44} cursor={frame < land} style={{ color: brand.muted }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 34, height: 200 }}>
            <span style={{ position: "absolute", left: -80, top: -60, width: 320, height: 320, borderRadius: 999, border: `5px solid ${brand.accent}`, transform: `scale(${0.4 + ring * 2})`, opacity: frame >= land ? 1 - ring : 0 }} />
            <Img src={staticFile(brand.logo)} style={{ width: 150, transform: `scale(${logo}) rotate(${(1 - logo) * -50}deg)`, opacity: Math.min(1, logo * 2) }} />
            {frame >= land && <span style={{ display: "flex", gap: 28 }}><SlotWord text="Software" at={land + 4} size={104} /><SlotWord text="Engineering" at={land + 4} size={104} /></span>}
          </div>
          {frame >= land + 10 && <SlotWord text="FUTO" at={land + 10} size={104} />}
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}

// 2. problem — generic chat windows fill with conflicting timetable messages. Never a real app's UI.
const THREADS = [
  { title: "Level group chat", messages: ["SEN201 moved to Hall B tomorrow", "No — still Hall A, rep said so"] },
  { title: "Class chat", messages: ["timetable changed again??", "which one is current pls"] },
  { title: "DMs", messages: ["did you see the new notice?", "which notice 😅"] },
];
export function ProblemScene() {
  const frame = useCurrentFrame();
  let k = 0;
  return (
    <Stage>
      <Zoom>
        <Sfx name="swipe" at={0} volume={0.25} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40 }}>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: displayFamily, ...enter(frame, 2) }}>
            Right now, news lives in chats like this.
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 40, perspective: 2400 }}>
            {THREADS.map((thread, i) => {
              const open = s(0.5) + i * 10;
              const in_ = enter(frame, open);
              return (
                <div key={thread.title} style={{ width: 520, borderRadius: 16, background: "#fff", border: `1px solid ${brand.line}`, overflow: "hidden", ...in_, transform: `rotateY(${(i - 1) * 7}deg) ${in_.transform}` }}>
                  <div style={{ padding: "18px 26px", borderBottom: `1px solid ${brand.line}`, fontSize: 26, fontWeight: 700 }}>{thread.title}</div>
                  <div style={{ display: "grid", gap: 14, padding: 24 }}>
                    {thread.messages.map((text, j) => {
                      const t = open + s(0.3) + k++ * 10;
                      const mine = j % 2 === 1;
                      return (
                        <div key={j} style={{ justifySelf: mine ? "end" : "start", maxWidth: 400, padding: "14px 20px", borderRadius: 16, fontSize: 25, lineHeight: 1.3, background: mine ? brand.accent : brand.surface, color: mine ? "#fff" : brand.ink, ...pop(frame, t) }}>
                          <Sfx name="message" at={t} volume={0.25} />
                          {text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}

// 3. sting — three huge words slam in one by one.
export function StingScene() {
  const words = ["Copied.", "Pasted.", "Forgotten."];
  const starts = [4, 58, 112];
  const span = 58;
  return (
    <Stage>
      <Zoom>
        <Sfx name="swipe" at={0} volume={0.3} />
        {words.map((w, i) => (
          <Slam key={w} word={w} from={starts[i]} to={starts[i] + span} size={200} />
        ))}
        {starts.map((t, i) => (
          <Sfx key={i} name={i === 2 ? "glitch" : "swoosh"} at={t} volume={0.35} />
        ))}
      </Zoom>
    </Stage>
  );
}

// 4. fix — a notice card rises with the "Posted here first" pill in brand blue.
export function FixScene() {
  const frame = useCurrentFrame();
  const cardAt = s(0.25);
  const pillAt = Math.max(cardAt + 10, at("fix", "Posted") - 4);
  return (
    <Stage>
      <Zoom>
        <Sfx name="shimmer" at={0} volume={0.3} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 44 }}>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: displayFamily, ...enter(frame, 2) }}>
            This site fixes that.
          </div>
          <div style={{ width: 1040, borderRadius: 16, background: "#fff", border: `1px solid ${brand.line}`, padding: "48px 52px", display: "grid", gap: 22, ...enter(frame, cardAt, 40) }}>
            <Sfx name="pop" at={cardAt + 6} volume={0.3} />
            <div style={{ ...pop(frame, pillAt) }}>
              <Pill filled>Posted here first</Pill>
              <Sfx name="pop" at={pillAt} volume={0.3} />
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: displayFamily }}>
              Sample: 200L data structures test venue changed
            </div>
            <div style={{ fontFamily: mono, fontSize: 30, color: brand.ink }}>
              10:00–12:00 · SEN201 · Sample Hall A
            </div>
            <div style={{ fontSize: 28, color: brand.muted }}>
              Sample notice. Posted here first, then shared to the 200L WhatsApp group.
            </div>
          </div>
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}

// 5. today — the "Today in the department" panel rebuilt from sample data: timetable rows,
// the latest notice, and level pills. Light card, hairline border, 16px radius, mono times.
const TODAY_ROWS = [
  { time: "08:00", code: "SEN101", title: "Sample: Introduction to Software Engineering" },
  { time: "10:00", code: "SEN201", title: "Sample: Data Structures" },
  { time: "13:00", code: "SEN202", title: "Sample: Object-Oriented Programming" },
];
const LEVELS = ["100L", "200L", "300L", "400L", "500L"];
export function TodayScene() {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <Zoom>
        <Sfx name="whoosh" at={0} volume={0.3} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 36 }}>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: displayFamily, ...enter(frame, 2) }}>
            Notices, timetables and courses for your level.
          </div>
          <Tilt at={s(0.2)}>
            <Shine at={s(0.9)} radius={16}>
              <div style={{ width: 1300, borderRadius: 16, background: "#fff", border: `1px solid ${brand.line}`, padding: "36px 40px", display: "grid", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <Img src={staticFile(brand.logo)} style={{ width: 52 }} />
                  <span style={{ fontSize: 34, fontWeight: 700, fontFamily: displayFamily }}>Today in the department</span>
                  <span style={{ marginLeft: "auto" }}><SampleBadge /></span>
                </div>
                {TODAY_ROWS.map((row, i) => (
                  <div key={row.code} style={{ display: "flex", alignItems: "center", gap: 22, background: brand.surface, border: `1px solid ${brand.line}`, borderRadius: 8, padding: "16px 22px", ...enter(frame, s(0.5) + i * 5, 14) }}>
                    <Sfx name="tick" at={s(0.5) + i * 5} volume={0.2} />
                    <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 500 }}>{row.time}</span>
                    <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 700 }}>{row.code}</span>
                    <span style={{ fontSize: 27, color: brand.muted }}>{row.title}</span>
                  </div>
                ))}
                <div style={{ fontSize: 27, ...enter(frame, s(0.5) + 3 * 5, 14) }}>
                  <span style={{ fontWeight: 700 }}>Latest notice: </span>
                  Sample: Harmattan semester lectures begin Monday
                </div>
                <div style={{ display: "flex", gap: 14, ...enter(frame, s(0.5) + 4 * 5, 14) }}>
                  {LEVELS.map((lv, i) => (
                    <span key={lv} style={{ fontFamily: mono, fontSize: 26, padding: "10px 24px", borderRadius: 999, background: i === 0 ? brand.accent : "#fff", color: i === 0 ? "#fff" : brand.ink, border: `1px solid ${i === 0 ? brand.accent : brand.line}` }}>
                      {lv}
                    </span>
                  ))}
                </div>
              </div>
            </Shine>
          </Tilt>
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}

// 6. verbs — giant rolling words Courses / Projects / Staff, plus a project card that leads
// with the stack dots and repo link, then the student builders.
const VERBS: [string, string][] = [["Courses.", "SEN201 · Data Structures"], ["Projects.", "TypeScript · Next.js"], ["Staff.", "Tue 10:00–12:00 · office hours"]];
export function VerbsScene() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const times = [s(0.3), s(1.5), s(2.7)];
  const current = Math.max(0, times.filter((t) => frame >= t - 4).length - 1);
  const start = times[current];
  const next = times[current + 1] ?? durationInFrames + 20;
  const p = rise(frame, start - 4, true);
  const out = between(frame, next - 11, next - 4, 0, 1);
  return (
    <Stage>
      <Zoom>
        {times.map((t, i) => <Sfx key={i} name="slot" at={Math.max(0, t - 6)} length={s(0.5)} volume={0.35} />)}
        <Sfx name="blip" at={times[1]} volume={0.3} />
        <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 160, paddingRight: 160, gap: 30 }}>
          <div style={{ fontFamily: displayFamily, fontSize: 52, fontWeight: 700, ...enter(frame, 2) }}>
            Built by students.
          </div>
          <div style={{ height: 250, width: 1600, overflow: "hidden" }}>
            <div style={{ fontFamily: displayFamily, fontSize: 200, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: "240px", transform: `translateY(${(1 - p) * 100 - out * 100}%)`, filter: `blur(${out * 10}px)` }}>{VERBS[current][0]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div key={current} style={{ width: 900, borderRadius: 16, background: "#fff", border: `1px solid ${brand.line}`, padding: "26px 32px", display: "grid", gap: 10, opacity: rise(frame, start) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: "#3178c6" }} />
                <span style={{ width: 18, height: 18, borderRadius: 999, background: "#000000" }} />
                <span style={{ fontFamily: mono, fontSize: 26 }}>sample-timetable-viewer</span>
              </div>
              <div style={{ fontSize: 30, fontWeight: 700 }}>Sample: Level timetable viewer</div>
              <div style={{ fontSize: 25, color: brand.muted }}>Sample student team A · example.com/sample-timetable-viewer</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 32, opacity: rise(frame, start) }}>
              <span style={{ background: brand.accent, color: "#fff", padding: "4px 12px", borderRadius: 8, marginRight: 14 }}>❯</span>{VERBS[current][1]}
            </div>
          </div>
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}

// 7. demo — portal + admin cards fall in with 3D tilt; glitch on "sample".
export function DemoScene() {
  const frame = useCurrentFrame();
  const glitchAt = at("demo", "Everything");
  const glitchOn = frame >= glitchAt && frame < glitchAt + s(0.6);
  const cards = [
    { title: "Student portal", rows: ["Notices by level", "Weekly timetable", "Courses + resources"] },
    { title: "Admin", rows: ["Post a notice", "Edit timetable", "Review projects"] },
  ];
  return (
    <Stage>
      <Zoom>
        <Sfx name="glitch" at={glitchAt} volume={0.35} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, ...enter(frame, 2) }}>
            <span style={{ fontFamily: displayFamily, fontSize: 56, fontWeight: 700 }}>
              A demo for the HOD. Everything here is <Glitchy on={glitchOn}>sample data</Glitchy>.
            </span>
          </div>
          <div style={{ ...enter(frame, 4) }}><SampleBadge /></div>
          <div style={{ display: "flex", gap: 44, perspective: 2000 }}>
            {cards.map((card, i) => {
              const t = s(0.3) + i * 8;
              const p = rise(frame, t, true);
              return (
                <div key={card.title} style={{ width: 560, borderRadius: 16, background: "#fff", border: `1px solid ${brand.line}`, padding: "40px 44px", display: "grid", gap: 16, transform: `translateY(${(1 - p) * -420}px) rotateX(${(1 - p) * 55}deg) rotateZ(${(1 - p) * (i - 0.5) * 8}deg)`, opacity: Math.min(1, rise(frame, t) * 2) }}>
                  <Sfx name="pop" at={t + 6} volume={0.25} />
                  <div style={{ fontFamily: displayFamily, fontSize: 40, fontWeight: 700 }}>{card.title}</div>
                  {card.rows.map((row, j) => (
                    <div key={row} style={{ fontSize: 28, background: brand.surface, border: `1px solid ${brand.line}`, borderRadius: 8, padding: "14px 20px", ...enter(frame, t + 8 + j * 5, 12) }}>{row}</div>
                  ))}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 26, color: brand.muted, ...enter(frame, s(1.2)) }}>
            <Sfx name="success" at={s(1.2)} volume={0.3} />
            Sample portal · Sample admin · nothing here is final
          </div>
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}

// 8. logo — the grid mark, the wordmark, and the end pill. No invented URL.
export function LogoScene() {
  const frame = useCurrentFrame();
  const mark = rise(frame, s(0.15), true);
  const pillAt = Math.max(s(0.6), at("logo", "One") + 6);
  return (
    <Stage>
      <Zoom>
        <Sfx name="impact" at={s(0.15)} volume={0.45} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 44 }}>
          <Img src={staticFile(brand.logo)} style={{ width: 170, transform: `scale(${mark}) rotate(${(1 - mark) * -40}deg)`, opacity: Math.min(1, mark * 2) }} />
          <div style={{ fontFamily: displayFamily, fontSize: 96, fontWeight: 700, letterSpacing: "-0.03em", ...enter(frame, s(0.3)) }}>
            Software Engineering — FUTO
          </div>
          <TypeLine text="One place for the department." at={at("logo", "One")} cps={30} size={52} cursor={false} style={{ color: brand.muted }} />
          <div style={{ ...pop(frame, pillAt) }}>
            <Sfx name="shimmer" at={pillAt} volume={0.35} />
            <Pill filled>Software Engineering — FUTO</Pill>
          </div>
        </AbsoluteFill>
      </Zoom>
    </Stage>
  );
}
