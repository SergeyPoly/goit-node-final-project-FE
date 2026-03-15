import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { Logo } from '@/shared/ui/Logo.jsx';
import { Nav } from '@/widgets/layout/ui/Header/components/Nav.jsx';
import { AuthBar } from '@/widgets/layout/ui/Header/components/AuthBar.jsx';
import { UserBar } from '@/widgets/layout/ui/Header/components/UserBar.jsx';
import { useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx/index.js';

export const Header = () => {
  const { isAuth, user } = useUserStore();
  const { pathname } = useLocation();

  const isDark = pathname === '/' || pathname.startsWith('/recipes');

  return (
    <header
      className={cn(
        "container pt-2 tablet:pt-4 desktop:pt-5",
        isDark && "px-2 tablet:px-4 desktop:px-5 "
      )}
    >
      <div className={cn(
        'rounded-t-[20px] tablet:rounded-t-[30px] flex items-center justify-between py-4 tablet:py-5',
        isDark ? 'bg-main px-4 tablet:px-8 desktop:px-15' : 'bg-white/80',
      )}>
        <Logo isDarkType={!isDark} />

        <Nav isDarkType={isDark} />

        {isAuth ? <UserBar user={user} path={isDark} /> : <AuthBar />}
      </div>
    </header>
  );
};
