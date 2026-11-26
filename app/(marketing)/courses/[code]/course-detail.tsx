"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "@/lib/sample-data";

export function CourseDetail({ course }: { course: Course }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit rounded-md">
          {course.level}
        </Badge>
        <h1 className="font-display text-2xl font-medium">{course.title}</h1>
        <p className="text-base text-muted-foreground">
          <span className="font-mono">{course.code}</span> · {course.units}{" "}
          units · {course.lecturer}
        </p>
      </div>
      <Tabs defaultValue="outline" className="w-full">
        <TabsList>
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="outline">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample outline</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-base">
                {course.outline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-base">
                {course.resources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
