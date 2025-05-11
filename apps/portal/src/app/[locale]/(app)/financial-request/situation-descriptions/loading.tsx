import { Skeleton } from '@dge/ui-core';

export default function Loading() {
  return (
    <div className="space-y-4">
      {/* Current Financial Situation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-9 w-28" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Employment Circumstances */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-9 w-28" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Reason For Applying */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-9 w-28" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
