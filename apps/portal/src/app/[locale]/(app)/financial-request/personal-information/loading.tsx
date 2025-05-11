import { Skeleton } from '@dge/ui-core';

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6">
        <Skeleton className="mb-2 h-2 w-3/4" />
        <Skeleton className="h-1 w-1/2" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full name */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* National ID */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Gender */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Address */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Country */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* State */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* City */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Phone */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}
