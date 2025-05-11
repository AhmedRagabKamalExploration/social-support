import { Skeleton } from '@dge/ui-core';

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      {/* Headline skeleton */}
      <Skeleton className="h-10 w-80" />

      {/* Paragraph skeleton */}
      <Skeleton className="h-5 w-96 max-w-full" />

      {/* Buttons skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  );
}
