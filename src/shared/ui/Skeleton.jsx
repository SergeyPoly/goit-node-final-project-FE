import { cn } from '@/shared/lib/clsx';

export const Skeleton = ({ className = '', variant = 'rect', as = 'div', ...props }) => {
  const Component = as;

  const radius =
    variant === 'circle'
      ? 'rounded-full'
      : variant === 'round'
        ? 'rounded-[1.25rem]'
        : 'rounded-md';

  return (
    <Component
      className={cn(
        'bg-grey/40 relative overflow-hidden',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-linear-to-r before:from-transparent before:via-white/25 before:to-transparent',
        'before:animate-[shimmer_1.2s_infinite]',
        radius,
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
};
