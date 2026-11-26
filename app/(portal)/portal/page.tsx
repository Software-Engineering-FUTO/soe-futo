"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SampleNote } from "@/components/site-blocks";
import { usePortal } from "@/components/portal-shell";
import { announcements, courses, timetable } from "@/lib/sample-data";

export default function PortalPage() {
  const { session, level } = usePortal();

  const notices = announcements.filter(
    (a) => a.level === "All levels" || a.level === level,
  );
  const rows = timetable.filter((t) => t.level === level);
  const levelCourses = courses.filter((c) => c.level === level);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">
          {session ? `Hello, ${session.name}` : "Sample portal view"}
        </h1>
        <p className="text-base text-muted-foreground">
          Level {level} notices, timetable and courses from sample data.
        </p>
        {!session && (
          <p className="text-sm text-muted-foreground">
            Demo viewer —{" "}
            <Link href="/login" className="text-accent underline">
              log in
            </Link>{" "}
            for the sample account.
          </p>
        )}
        <SampleNote />
      </div>

      <section id="today" className="flex scroll-mt-20 flex-col gap-4">
        <h2 className="font-display text-xl font-medium">
          Today for {level}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notices</CardTitle>
              <CardDescription>
                Department and {level} notices.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {notices.map((a) => (
                <div
                  key={a.id}
                  className="border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.date} · {a.channel}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timetable</CardTitle>
              <CardDescription>Weekly lectures for {level}.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Course</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.day}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {row.start}–{row.end}
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">
                          {row.courseCode}
                        </span>{" "}
                        {row.courseTitle}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="courses" className="flex scroll-mt-20 flex-col gap-4">
        <h2 className="font-display text-xl font-medium">
          Courses for {level}
        </h2>
        {levelCourses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Sample: no courses listed for {level} yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {levelCourses.map((c) => (
              <Card key={c.code}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit rounded-md">
                    {c.units} units
                  </Badge>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                  <CardDescription>
                    <span className="font-mono">{c.code}</span> · {c.lecturer}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/courses/${c.code}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-10",
                    )}
                  >
                    View outline
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section id="profile" className="flex scroll-mt-20 flex-col gap-4">
        <h2 className="font-display text-xl font-medium">Profile</h2>
        <Card className="max-w-[640px]">
          <CardHeader className="flex-row items-center gap-3">
            <Avatar className="bg-surface-2">
              <AvatarFallback>
                {(session?.name ?? "SV")
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {session?.name ?? "Sample viewer"}
              </CardTitle>
              <CardDescription>Level {level}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-sm">
            <p>{session?.email ?? "Not signed in"}</p>
            <p className="text-muted-foreground">
              {session?.phone ?? "Log in to attach a sample phone number."}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
