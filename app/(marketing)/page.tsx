import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { TodayPanel } from "@/components/today-panel";
import { SectionHeading } from "@/components/site-blocks";
import {
  landingAnnouncements,
  landingCourses,
  landingEvents,
  landingProjects,
  landingStaffRoles,
} from "@/lib/landing-content";

export default function LandingPage() {
  const showcase = landingProjects.slice(0, 2);
  const leaders = landingStaffRoles.slice(0, 2);

  return (
    <>
      {/* Hero: deep logo-green band, dot grid behind, live "today" panel */}
      <section className="relative overflow-hidden bg-[#016e21]">
        <DotPattern
          width={16}
          height={16}
          cr={1}
          className="absolute inset-0 text-white/25"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-16 text-center md:px-8 md:py-24">
          <Avatar className="size-20">
            <AvatarImage
              src="/logo.png"
              alt="Department of Software Engineering logo"
              loading="eager"
              fetchPriority="high"
            />
          </Avatar>
          <h1 className="max-w-[640px] font-display text-[36px] font-medium leading-[1.05] text-white md:text-display">
            Software Engineering — FUTO
          </h1>
          <p className="max-w-[640px] text-lg text-white/85">
            One place for department notices, level timetables, courses and
            student builds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/projects" className={cn(buttonVariants(), "h-10 border-gold bg-gold text-gold-foreground hover:bg-gold/90")}>Explore projects</Link>
            <Link href="/courses" className={cn(buttonVariants({ variant: "outline" }), "h-10 border-gold bg-transparent text-white hover:bg-gold/15 hover:text-white")}>View courses</Link>
          </div>
          <TodayPanel />
        </div>
      </section>

      {/* Latest announcements */}
      <section className="reveal mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title="Latest announcements"
            explanation="Official notices for all levels, in one place."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {landingAnnouncements.slice(0, 3).map((a) => (
              <Card key={a.id}>
                <CardHeader>
                  <Badge className="w-fit rounded-md border-gold bg-gold text-gold-foreground">
                    {a.level}
                  </Badge>
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                  <CardDescription>{a.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{a.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Link href="/announcements" className={cn(buttonVariants({ variant: "outline" }), "h-10")}>
                All announcements <ArrowRight size={16} />
              </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="reveal bg-[#faf3e3]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-col gap-8">
            <SectionHeading
              title="About the department"
              explanation="An online identity for software engineers at FUTO."
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-primary/25">
                <CardHeader>
                  <CardTitle className="text-lg">What this site is</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base">
                    The department website and student portal. Notices,
                    timetables, course outlines, project builds and staff
                    contacts live here instead of scattered chat messages.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/25">
                <CardHeader>
                  <CardTitle className="text-lg">Who it serves</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base">
                    Students from 100L to 500L checking notices and timetables,
                    staff publishing them, and visitors seeing what the
                    department builds.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What we build and learn */}
      <section className="reveal bg-[#e8f5ec]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title="What we build and learn"
            explanation="Courses below, student builds further down the page."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {landingCourses.slice(0, 3).map((c) => (
              <Card key={c.code} className="border-primary/25">
                <CardHeader>
                  <Badge className="w-fit rounded-md border-gold bg-gold text-gold-foreground">
                    {c.level}
                  </Badge>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                  <CardDescription>
                    <span className="font-mono">{c.code}</span> · {c.units}{" "}
                    units
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div>
            <Link href="/courses" className={cn(buttonVariants({ variant: "outline" }), "h-10")}>
                All courses <ArrowRight size={16} />
              </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Project showcase */}
      <section className="reveal mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title="Project showcase"
            explanation="Student builds, stack first."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {showcase.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="rounded-md font-mono"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-gold"
                        />
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <CardDescription>
                    Built by department students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }), "h-10")}>
                All projects <ArrowRight size={16} />
              </Link>
          </div>
        </div>
      </section>

      {/* Staff preview */}
      <section className="reveal bg-[#faf3e3]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-col gap-8">
            <SectionHeading
              title="Staff and leadership"
              explanation="The people who run the department and teach its courses."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {leaders.map((s) => (
                <Card key={s.id} className="border-primary/25">
                  <CardHeader>
                    <CardTitle className="text-lg">{s.role}</CardTitle>
                    <CardDescription>{s.line}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div>
              <Link href="/staff" className={cn(buttonVariants({ variant: "outline" }), "h-10")}>
                  All staff contacts <ArrowRight size={16} />
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="reveal bg-[#e8f5ec]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-col gap-8">
            <SectionHeading
              title="Events"
              explanation="Hackathons, demos and seminars. RSVP arrives in the pilot."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {landingEvents.map((e) => (
                <Card key={e.id} className="border-primary/25">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit rounded-md">
                      {e.date}
                    </Badge>
                    <CardTitle className="text-lg">{e.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {e.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
