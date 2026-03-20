import { Skeleton } from '@/shared/ui/Skeleton';

export const RecipePreviewSkeleton = () => (
  <div className="tablet:gap-4 flex w-full flex-row gap-2.5">
    <Skeleton variant="round" className="tablet:size-25 size-18.75 flex-none rounded-[15px]" />

    <div className="tablet:gap-8 flex flex-1 flex-row gap-4">
      <div className="tablet:w-117 tablet:gap-2.5 desktop:w-152.5 flex w-41.5 flex-col gap-2">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4.5 w-full" />
        <Skeleton className="h-4.5 w-5/6" />
      </div>

      <div className="flex flex-row gap-1">
        <Skeleton variant="circle" className="size-10" />
        <Skeleton variant="circle" className="size-10" />
      </div>
    </div>
  </div>
);
