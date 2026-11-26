"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SampleNote } from "@/components/site-blocks";
import { isDemoAdmin } from "@/lib/demo-admin";
import {
  announcements,
  courses,
  projects,
  type Project,
} from "@/lib/sample-data";

const AUDIT_STUB = [
  "Sample: showcase item approved by sample admin",
  "Sample: notice posted to 200L by sample class rep",
  "Sample: timetable row edited for 300L",
];

export default function AdminPage() {
  const [items, setItems] = useState<Project[]>(projects);
  const [confirming, setConfirming] = useState<Project | null>(null);
  const pending = items.filter((p) => p.status !== "Approved sample");

  function approve(project: Project) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, status: "Approved sample" } : p,
      ),
    );
    setConfirming(null);
    toast.success("Sample showcase entry approved.");
  }

  if (!isDemoAdmin()) return null;

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-medium">Admin dashboard</h1>
        <p className="text-base text-muted-foreground">
          Demo guard: everyone can view this page in the prototype — no real
          access control.
        </p>
        <SampleNote>Sample counts below, not real measurements.</SampleNote>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Sample notices</CardDescription>
            <CardTitle className="text-2xl">{announcements.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Sample courses</CardDescription>
            <CardTitle className="text-2xl">{courses.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Sample projects</CardDescription>
            <CardTitle className="text-2xl">{items.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending sample reviews</CardDescription>
            <CardTitle className="text-2xl">{pending.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="projects">Showcase</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="audit">Audit stub</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Showcase entries</CardTitle>
              <CardDescription>
                Approve a pending sample entry. A toast confirms it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Builders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Action</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.title}</TableCell>
                      <TableCell>{p.builders}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-md">
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {p.status !== "Approved sample" && (
                          <Button
                            size="sm"
                            className="h-8"
                            onClick={() => setConfirming(p)}
                          >
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notices">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.title}</TableCell>
                      <TableCell>{a.level}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {a.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((c) => (
                    <TableRow key={c.code}>
                      <TableCell className="font-mono text-sm">
                        {c.code}
                      </TableCell>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>{c.level}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audit stub</CardTitle>
              <CardDescription>
                Sample entries. A real log arrives after the pilot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-sm">
                {AUDIT_STUB.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={confirming !== null}
        onOpenChange={(o) => !o && setConfirming(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve this showcase entry?</DialogTitle>
            <DialogDescription>
              {confirming?.title} by {confirming?.builders}. Sample action only.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirming(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => confirming && approve(confirming)}
            >
              Approve sample
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
