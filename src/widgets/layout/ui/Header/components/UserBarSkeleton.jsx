import { cn } from '@/shared/lib/clsx';
import { classNames } from './UserBar/classNames';

export const UserBarSkeleton = () => {
  return (
    <div className={classNames.container}>
      <div className={classNames.avatarWrapper} />
      <span className={cn(classNames.name, 'opacity-60')}>Loading...</span>
    </div>
  );
};
