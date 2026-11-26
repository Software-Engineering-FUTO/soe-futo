import { notFound } from "next/navigation";
import { SampleNote } from "@/components/site-blocks";
import { courses } from "@/lib/sample-data";
import { CourseDetail } from "./course-detail";

export function generateStaticParams() {
  return courses.map((c) => ({ code: c.code }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const course = courses.find((c) => c.code === code);
  if (!course) notFound();
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-16 md:px-8">
      <CourseDetail course={course} />
      <SampleNote />
    </div>
  );
}
