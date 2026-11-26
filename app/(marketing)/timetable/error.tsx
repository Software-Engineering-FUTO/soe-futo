"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-16 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Sample: this timetable failed to load
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            Something went wrong showing these sample rows.
          </p>
          <Button className="h-10" onClick={() => reset()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
