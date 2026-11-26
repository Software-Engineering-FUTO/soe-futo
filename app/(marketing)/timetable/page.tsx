"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EmptyState, SampleNote } from "@/components/site-blocks";
import {
  LEVELS,
  timetable,
  type Level,
  type TimetableEntry,
} from "@/lib/sample-data";

export default function TimetablePage() {
  const [level, setLevel] = useState<Level>("100L");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<TimetableEntry | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return timetable.filter(
      (t) =>
        t.level === level &&
        (!q ||
          t.courseCode.toLowerCase().includes(q) ||
          t.courseTitle.toLowerCase().includes(q)),
    );
  }, [level, query]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-16 md:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">Timetable</h1>
        <p className="text-base text-muted-foreground">
          Weekly lectures by level, from sample data.
        </p>
        <SampleNote />
      </div>

      <Tabs
        value={level}
        onValueChange={(v) => setLevel(v as Level)}
        className="w-full"
      >
        <TabsList className="flex h-auto flex-wrap justify-start">
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
          aria-label="Search timetable"
          className="h-10 pl-9"
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          line="Sample: no lectures match this filter."
          actionLabel="Clear search"
          actionHref="/timetable"
          onAction={() => {
            setQuery("");
            setLevel("100L");
          }}
        />
      ) : (
        <div className="overflow-x-auto border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="hidden md:table-cell">Venue</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
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
                    <span className="font-mono text-sm">{row.courseCode}</span>{" "}
                    {row.courseTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {row.venue}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => setSelected(row)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent>
          {selected && (
            <>
              <SheetHeader>
                <Badge variant="secondary" className="w-fit rounded-md">
                  {selected.level}
                </Badge>
                <SheetTitle>
                  <span className="font-mono">{selected.courseCode}</span>{" "}
                  {selected.courseTitle}
                </SheetTitle>
                <SheetDescription>
                  {selected.day} · {selected.start}–{selected.end}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-base">Venue: {selected.venue}</p>
                <p className="text-sm text-muted-foreground">
                  Sample row. Confirm changes with your class rep.
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
