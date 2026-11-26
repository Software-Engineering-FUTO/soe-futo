import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-16 md:px-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-72" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    </div>
  );
}
