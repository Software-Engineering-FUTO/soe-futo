"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeekMark } from "@/components/week-mark";
import { saveSession } from "@/lib/demo-session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function signIn() {
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (phone.trim().length < 4) {
      setError("Enter your phone number.");
      return;
    }
    setError("");
    saveSession({
      name: "Sample student",
      email: email.trim(),
      phone: phone.trim(),
      level: "100L",
    });
    router.push("/portal");
  }

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center gap-6 px-4 py-16">
      <Link href="/" className="flex items-center gap-2" aria-label="Home">
        <WeekMark />
        <span className="font-display text-base font-medium">
          Software Engineering — FUTO
        </span>
      </Link>
      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit rounded-md">
            Demo only — no real accounts
          </Badge>
          <CardTitle className="text-xl">Student log in</CardTitle>
          <CardDescription>
            Any email and phone signs in a sample student. Nothing is stored
            anywhere except this browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0800 000 0000"
              autoComplete="tel"
              className="h-10"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button className="h-10" onClick={signIn}>
            Sign in with sample account
          </Button>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Pick your level inside the portal — notices and the timetable re-scope
        to it.
      </p>
    </div>
  );
}
