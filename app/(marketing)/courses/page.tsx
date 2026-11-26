"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState, SampleNote } from "@/components/site-blocks";
import {
  COURSE_NEED,
  LEVELS,
  courses,
  type Level,
} from "@/lib/sample-data";

type Filter = Level | "All levels";

export default function CoursesPage() {
  const [level, setLevel] = useState<Filter>("All levels");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter(
      (c) =>
        (level === "All levels" || c.level === level) &&
        (!q ||
          c.code.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q)),
    );
  }, [level, query]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-16 md:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">Courses</h1>
        <p className="text-base text-muted-foreground">
          Outlines and sample resources by level. {COURSE_NEED}
        </p>
        <SampleNote />
      </div>

      <Tabs
        value={level}
        onValueChange={(v) => setLevel(v as Filter)}
        className="w-full"
      >
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="All levels">All levels</TabsTrigger>
          {LEVELS.map((l) => (
            <TabsTrigger key={l} value={l}>
              {l}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative max-w-[640px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by course code or title"
          aria-label="Search courses"
          className="h-10 pl-9"
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          line="Sample: no courses match this filter."
          actionLabel="Clear search"
          actionHref="/courses"
          onAction={() => {
            setQuery("");
            setLevel("All levels");
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((c) => (
            <Card key={c.code}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit rounded-md">
                  {c.level}
                </Badge>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <CardDescription>
                  <span className="font-mono">{c.code}</span> · {c.units}{" "}
                  units · {c.lecturer}
                </CardDescription>
                <div>
                  <Link
                    href={`/courses/${c.code}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-10",
                    )}
                  >
                    View outline
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
