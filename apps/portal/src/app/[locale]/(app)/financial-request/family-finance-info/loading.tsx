import { Progress } from '@dge/ui-core';

import { SelectSkeleton } from '@/components/select-skeleton/select-skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Skeleton for form */}
      <div className="grid grid-cols-2 gap-4">
        {/* Marital Status */}
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <SelectSkeleton />
        </div>

        {/* Number of Dependents */}
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        </div>

        {/* Employment Status */}
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <SelectSkeleton />
        </div>

        {/* Monthly Income */}
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        </div>

        {/* Housing Status */}
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <SelectSkeleton />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <div className="h-10 w-28 animate-pulse rounded-md bg-gray-200" />
        <div className="h-10 w-28 animate-pulse rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
