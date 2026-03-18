import { cn } from '@/shared/lib/clsx';

export const Subtitle = ({ children, className }) => (
  <p className={cn('main-text', className)}>{children}</p>
);
