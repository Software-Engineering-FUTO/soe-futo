"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState, SampleNote } from "@/components/site-blocks";
import { STAFF_NEED, staff } from "@/lib/sample-data";

function initials(name: string) {
  return name
    .replace(/^Sample — /, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function StaffPage() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff.filter(
      (s) =>
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.focus.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-16 md:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">Staff contacts</h1>
        <p className="text-base text-muted-foreground">
          Roles, contacts and consultation hours. {STAFF_NEED}
        </p>
        <SampleNote />
      </div>

      <div className="relative max-w-[640px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, role or focus"
          aria-label="Search staff"
          className="h-10 pl-9"
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          line="Sample: no staff match this search."
          actionLabel="Clear search"
          actionHref="/staff"
          onAction={() => setQuery("")}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((s) => (
            <Card key={s.id}>
              <CardHeader className="flex-row items-center gap-3">
                <Avatar className="bg-surface-2">
                  <AvatarFallback>{initials(s.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{s.name}</CardTitle>
                  <CardDescription>
                    {s.role} · {s.focus}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 text-sm">
                <p>{s.email}</p>
                <p className="text-muted-foreground">{s.office}</p>
                <p className="text-muted-foreground">{s.hours}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
