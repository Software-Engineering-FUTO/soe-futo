"use client";

import { SegmentError } from "@/components/segment-error";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SegmentError
      title="Sample: these projects failed to load"
      reset={reset}
    />
  );
}