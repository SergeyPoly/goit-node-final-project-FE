import { useLocation } from 'react-router-dom';
import { Logo } from '@/shared/ui/Logo';
import { Nav } from '@/widgets/layout/ui/Header/components/Nav';
import { AuthBar } from '@/widgets/layout/ui/Header/components/AuthBar';
import { UserBar } from '@/widgets/layout/ui/Header/components/UserBar';
import { cn } from '@/shared/lib/clsx';
import { useCurrentUser } from '@/queries/user';
import { UserBarSkeleton } from './components/UserBarSkeleton';

export const Header = () => {
  const { user, isLoading } = useCurrentUser();
  const { pathname } = useLocation();

  const isDark = pathname === '/' || pathname.startsWith('/recipes');

  const renderUserBar = () => {
    if (isLoading) {
      return <UserBarSkeleton />;
    }
    if (user) {
      return <UserBar user={user} isDark={isDark} />;
    }

    return <AuthBar />;
  };

  return (
    <header
      className={cn(
        'tablet:pt-4 desktop:pt-5 container pt-2',
        isDark && 'tablet:px-4 desktop:px-5 px-2'
      )}
    >
      <div
        className={cn(
          'tablet:rounded-t-[30px] tablet:py-5 flex items-center justify-between rounded-t-[20px] py-4',
          isDark ? 'bg-main tablet:px-8 desktop:px-15 px-4' : 'bg-white/80'
        )}
      >
        <Logo isDarkType={!isDark} />

        <Nav isDarkType={isDark} />

        {renderUserBar()}
      </div>
    </header>
  );
};
