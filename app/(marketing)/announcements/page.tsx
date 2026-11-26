"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  announcements,
  type Announcement,
  type Level,
} from "@/lib/sample-data";

type Filter = Level | "All levels";

export default function AnnouncementsPage() {
  const [level, setLevel] = useState<Filter>("All levels");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Announcement | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return announcements.filter(
      (a) =>
        (level === "All levels" || a.level === level || a.level === "All levels") &&
        (!q ||
          a.title.toLowerCase().includes(q) ||
          a.body.toLowerCase().includes(q)),
    );
  }, [level, query]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-16 md:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">Announcements</h1>
        <p className="text-base text-muted-foreground">
          Posted here first, then shared to class chats. Filter by your level.
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
          placeholder="Search sample notices"
          aria-label="Search notices"
          className="h-10 pl-9"
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          line="Sample: no notices match this filter."
          actionLabel="Clear search"
          actionHref="/announcements"
          onAction={() => {
            setQuery("");
            setLevel("All levels");
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit rounded-md">
                  {a.level}
                </Badge>
                <CardTitle className="text-lg">{a.title}</CardTitle>
                <CardDescription>{a.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">{a.channel}</p>
                <div>
                  <Button
                    variant="outline"
                    className="h-10"
                    onClick={() => setSelected(a)}
                  >
                    Read notice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
                <SheetTitle>{selected.title}</SheetTitle>
                <SheetDescription>{selected.date}</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-base">{selected.body}</p>
                <p className="text-sm text-muted-foreground">
                  {selected.channel}
                </p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
