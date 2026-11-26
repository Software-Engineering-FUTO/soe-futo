"use client";

import { useSyncExternalStore } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeekMark } from "./week-mark";
import {
  landingRowsForDay,
  latestLandingNotice,
} from "@/lib/landing-content";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

const DAY_NAMES: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Monday",
  "Monday",
];

function subscribe() {
  return () => {};
}

function getClientDay(): Day {
  return DAY_NAMES[new Date().getDay()];
}

function getServerDay(): Day {
  return "Monday";
}

export function TodayPanel() {
  const today = useSyncExternalStore(subscribe, getClientDay, getServerDay);
  const todaysRows = landingRowsForDay(today).slice(0, 4);

  return (
    <Card className="w-full max-w-[640px] text-left">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <WeekMark />
          Today in the department
          <span className="rounded-md border-gold bg-gold px-2 py-0.5 font-mono text-sm font-normal text-gold-foreground">
            {today}
          </span>
        </CardTitle>
        <CardDescription>
          Today&apos;s lectures and the latest notice, from the department
          timetable.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {todaysRows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No lectures scheduled today.
          </p>
        ) : (
          todaysRows.map((row) => (
            <div
              key={row.id}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium">
                  {row.courseCode} · {row.courseTitle}
                </p>
                <p className="text-sm text-muted-foreground">{row.level}</p>
              </div>
              <p className="shrink-0 font-mono text-sm">
                {row.start}–{row.end}
              </p>
            </div>
          ))
        )}
        <div className="border-t border-border pt-3">
          <p className="text-sm font-medium">
            <span className="text-accent">Latest: </span>
            {latestLandingNotice.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {latestLandingNotice.date}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
