import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WeekMark } from "./week-mark";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="flex h-16 items-center gap-3 border-b border-border px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <WeekMark />
          <span className="font-display text-base font-medium">
            SE — FUTO admin
          </span>
        </Link>
        <div className="ml-auto">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            View site
          </Link>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
