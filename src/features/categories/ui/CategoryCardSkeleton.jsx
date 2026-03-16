import { cn } from '@/shared/lib/clsx';
import { Skeleton } from '@/shared/ui/Skeleton';

export const CategoryCardSkeleton = ({ isAllCategories = false, className = '' }) => {
  if (isAllCategories) {
    return (
      <Skeleton className={cn('tablet:h-92.25 h-62.5 w-full rounded-[1.875rem]', className)} />
    );
  }

  return (
    <div
      className={cn(
        'tablet:h-92.25 relative flex h-62.5 w-full items-end overflow-hidden rounded-[1.875rem]',
        className
      )}
    >
      <Skeleton className="absolute inset-0 rounded-[1.875rem]" />
      <div className="tablet:p-6 relative z-3 flex gap-1 p-4">
        <Skeleton className="tablet:h-11 h-10 w-28 rounded-[1.875rem]" />
        <Skeleton variant="circle" className="tablet:h-11 tablet:w-11 h-10 w-10" />
      </div>
    </div>
  );
};
