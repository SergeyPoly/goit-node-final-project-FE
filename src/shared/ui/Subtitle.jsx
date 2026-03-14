import { cn } from '@/shared/lib/clsx';

export const Subtitle = ({ children, className }) => (
  <h2
    className={cn(
      'main-text',
      className
    )}
  >
    {children}
  </h2>
);
