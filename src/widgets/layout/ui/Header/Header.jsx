import { Logo } from '@/shared/ui/Logo.jsx';
import { Nav } from '@/widgets/layout/ui/Header/components/Nav.jsx';
import { AuthBar } from '@/widgets/layout/ui/Header/components/AuthBar.jsx';
import { UserBar } from '@/widgets/layout/ui/Header/components/UserBar.jsx';
import { useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx/index.js';
import { useCurrentUser } from '@/queries/user';

export const Header = () => {
  const { user, isLoading } = useCurrentUser();
  const { pathname } = useLocation();

  const isDark = pathname === '/' || pathname.startsWith('/recipes');

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

        {user || isLoading ? (
          <UserBar loading={isLoading} user={user} isDark={isDark} />
        ) : (
          <AuthBar />
        )}
      </div>
    </header>
  );
};
