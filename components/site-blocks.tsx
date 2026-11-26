import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { WeekMark } from "./week-mark";

export function EmptyState({
  line,
  actionLabel,
  actionHref,
  onAction,
}: {
  line: string;
  actionLabel: string;
  actionHref: string;
  onAction?: () => void;
}) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <span
          aria-hidden="true"
          className="grid grid-cols-5 gap-1 border border-border p-3"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="h-2 w-6 bg-surface-2" />
          ))}
        </span>
        <p className="text-sm text-muted-foreground">{line}</p>
        {onAction ? (
          <Button className="h-10" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : (
          <Link href={actionHref} className={cn(buttonVariants(), "h-10")}>
            {actionLabel}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export function SectionHeading({
  title,
  explanation,
}: {
  title: string;
  explanation: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-end">
      <h2 className="font-display text-2xl font-medium text-[#016e21]">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-2.5 w-2.5 rounded-[2px] bg-gold"
        />
        {title}
      </h2>
      <p className="text-base text-muted-foreground md:text-right">
        {explanation}
      </p>
    </div>
  );
}

export function SampleNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <WeekMark />
      {children ?? "Demo content shown with sample data."}
    </p>
  );
}
