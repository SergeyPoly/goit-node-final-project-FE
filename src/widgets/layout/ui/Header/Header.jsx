import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { Logo } from '@/shared/ui/Logo.jsx';
import { Nav } from '@/widgets/layout/ui/Header/components/Nav.jsx';
import { AuthBar } from '@/widgets/layout/ui/Header/components/AuthBar.jsx';
import { UserBar } from '@/widgets/layout/ui/Header/components/UserBar.jsx';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const Header = () => {
  const { isAuth, user } = useUserStore();
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const isDark = pathname === '/' || pathname.startsWith('/recipes');

  return (
    <header
      className="container px-2 pt-2 tablet:px-4 tablet:pt-4 desktop:px-5 desktop:pt-5"
    >
      <div className={clsx(
        'rounded-t-[20px] tablet:rounded-t-[30px] flex items-center justify-between p-4 tablet:px-8 tablet:py-5 desktop:px-15',
        isDark ? 'bg-main' : 'bg-white/80',
      )}>
        <Logo isDarkType={!isDark} />

        <Nav isDarkType={isDark} />

        {isAuth ? <UserBar user={user} path={isHome} /> : <AuthBar />}
      </div>
    </header>
  );
};
