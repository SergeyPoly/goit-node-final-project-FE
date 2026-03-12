import { cn } from '@/shared/lib/clsx';

export const MainTitle = ({ children, className }) => (
  <h2
    className={cn(
      'tablet:text-[2.5rem] tablet:leading-[1.1] text-main text-[1.75rem] leading-[1.142857] font-extrabold uppercase',
      className
    )}
  >
    {children}
  </h2>
);
