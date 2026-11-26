"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WeekMark } from "./week-mark";
import {
  clearSession,
  getSession,
  saveSession,
  type DemoSession,
} from "@/lib/demo-session";
import { LEVELS, type Level } from "@/lib/sample-data";

interface PortalState {
  session: DemoSession | null;
  level: Level;
  setLevel: (level: Level) => void;
}

const PortalContext = createContext<PortalState>({
  session: null,
  level: "100L",
  setLevel: () => {},
});

export function usePortal() {
  return useContext(PortalContext);
}

const NAV = [
  { href: "#today", label: "Today" },
  { href: "#courses", label: "Courses" },
  { href: "#profile", label: "Profile" },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [stored] = useState(() => {
    const s = getSession();
    return { session: s, level: s?.level ?? ("100L" as Level) };
  });
  const [session, setSession] = useState<DemoSession | null>(stored.session);
  const [level, setLevelState] = useState<Level>(stored.level);
  const [open, setOpen] = useState(false);

  function setLevel(next: Level) {
    setLevelState(next);
    if (session) {
      const updated = { ...session, level: next };
      setSession(updated);
      saveSession(updated);
    }
  }

  function signOut() {
    clearSession();
    router.push("/login");
  }

  return (
    <PortalContext.Provider value={{ session, level, setLevel }}>
      <div className="flex min-h-full flex-1">
        <aside className="hidden w-[240px] shrink-0 flex-col gap-1 border-r border-border p-4 md:flex">
          <p className="flex items-center gap-2 px-2 py-2 font-display text-sm font-medium">
            <WeekMark />
            SE — FUTO portal
          </p>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={`/portal${item.href}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-2 px-2 pt-4">
            <p className="text-sm text-muted-foreground">
              {session ? `Signed in as ${session.name}` : "Sample viewer"}
            </p>
            {session ? (
              <Button variant="outline" className="h-10" onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <Link href="/login" className={cn(buttonVariants(), "h-10")}>
                Log in
              </Link>
            )}
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center gap-3 border-b border-border px-4 md:px-8">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "md:hidden",
                )}
                aria-label="Open portal menu"
              >
                <Menu size={20} />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Portal menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-4" aria-label="Portal">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={`/portal${item.href}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "justify-start",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <p className="font-display text-base font-medium">Student portal</p>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Level
              </span>
              <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
                <SelectTrigger aria-label="Study level" className="h-10 w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </header>
          <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
        </div>
      </div>
    </PortalContext.Provider>
  );
}
