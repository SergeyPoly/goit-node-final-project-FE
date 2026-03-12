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

  return (
    <header
      className="container px-2 pt-2 tablet:px-4 tablet:pt-4 desktop:px-5 desktop:pt-5"
    >
      <div className={clsx(
        'rounded-t-2xl flex items-center justify-between p-4 tablet:px-8 tablet:py-5 desktop:px-[60px]',
        isHome ? 'bg-main' : 'bg-white/80',
      )}>
        <Logo isDarkType={!isHome} />

        <Nav isDarkType={isHome} />

        {isAuth ? <UserBar user={user} path={isHome} /> : <AuthBar />}
      </div>
    </header>
  );
};
