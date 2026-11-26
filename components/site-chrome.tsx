"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const NAV = [
  { href: "/announcements", label: "Announcements" },
  { href: "/timetable", label: "Timetable" },
  { href: "/courses", label: "Courses" },
  { href: "/projects", label: "Projects" },
  { href: "/staff", label: "Staff" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 h-16 border-b-2 border-primary bg-background">
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-4 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Avatar className="size-8">
            <AvatarImage
              src="/logo.png"
              alt="Department of Software Engineering logo"
              loading="eager"
              fetchPriority="high"
            />
          </Avatar>
          <span className="font-display text-base font-medium">
            Software Engineering — FUTO
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Site">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "text-accent"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "lg:hidden",
              )}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4" aria-label="Site">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
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
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#016e21] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 font-display text-base font-medium text-white">
            <Avatar className="size-7">
              <AvatarImage
                src="/logo.png"
                alt="Department of Software Engineering logo"
              />
            </Avatar>
            Dept. of Software Engineering, FUTO
          </p>
          <p className="text-sm text-white/85">
            Notices, timetables, courses, projects and staff contacts in one
            place.
          </p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Footer">
          <p className="text-sm font-medium text-white">Pages</p>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/85 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-white">Contact</p>
          <p className="text-sm text-white/85">
            Department of Software Engineering, Federal University of
            Technology Owerri.
          </p>
          <Link href="/staff" className="text-sm text-white/85 hover:text-gold">
            Staff contacts and consultation hours
          </Link>
        </div>
      </div>
    </footer>
  );
}
