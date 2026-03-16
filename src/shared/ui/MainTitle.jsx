import { cn } from '@/shared/lib/clsx';

export const MainTitle = ({ children, className }) => (
  <h2 className={cn('h2', className)}>{children}</h2>
);
