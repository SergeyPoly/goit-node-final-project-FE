import { cn } from '@/shared/lib/clsx';

export const Subtitle = ({ children, className }) => (
  <h2
    className={cn(
      'tablet:text-base tablet:leading-normal text-main text-sm leading-[1.428571] font-medium',
      className
    )}
  >
    {children}
  </h2>
);
