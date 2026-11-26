import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-72" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
