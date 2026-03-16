import { Skeleton } from '@/shared/ui/Skeleton';

export const RecipeCardSkeleton = () => {
  return (
    <article className="flex h-full w-full flex-col gap-4">
      <Skeleton variant="round" className="tablet:min-h-68.75 min-h-57.5 w-full" />

      <div className="tablet:gap-3.5 flex h-full flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7.5 w-3/4" />
          <Skeleton className="h-4.25 w-full" />
          <Skeleton className="h-4.25 w-5/6" />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" className="tablet:h-10 tablet:w-10 h-8 w-8" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="flex gap-1">
            <Skeleton variant="circle" className="tablet:h-10.5 tablet:w-10.5 h-9 w-9" />
            <Skeleton variant="circle" className="tablet:h-10.5 tablet:w-10.5 h-9 w-9" />
          </div>
        </div>
      </div>
    </article>
  );
};
