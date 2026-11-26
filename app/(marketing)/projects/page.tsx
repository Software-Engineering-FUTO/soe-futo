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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState, SampleNote } from "@/components/site-blocks";
import { PROJECT_NEED, projects } from "@/lib/sample-data";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-16 md:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">Project showcase</h1>
        <p className="text-base text-muted-foreground">
          Student builds, stack first, then the builders. {PROJECT_NEED}
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
          placeholder="Search by title or stack"
          aria-label="Search projects"
          className="h-10 pl-9"
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          line="Sample: no projects match this search."
          actionLabel="Clear search"
          actionHref="/projects"
          onAction={() => setQuery("")}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="rounded-md font-mono"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <CardDescription>{p.builders}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-md">
                    {p.status}
                  </Badge>
                  <Link
                    href={p.repo}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-10",
                    )}
                  >
                    Repo link
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
