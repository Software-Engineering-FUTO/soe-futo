import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-16 md:px-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-5 w-72" />
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
