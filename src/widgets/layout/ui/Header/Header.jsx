import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { Logo } from '@/shared/ui/Logo.jsx';
import { Nav } from '@/widgets/layout/ui/Header/components/Nav.jsx';
import { AuthBar } from '@/widgets/layout/ui/Header/components/AuthBar.jsx';
import { UserBar } from '@/widgets/layout/ui/Header/components/UserBar.jsx';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const Header = ({ className = "" }) => {
  const { isAuth, user } = useUserStore();
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <header className={clsx("mx-auto sticky top-0 z-50 backdrop-blur-md rounded-t-2xl )", isHome ? "bg-[var(--color-main)]" : "bg-white/80",className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo href="/" className={clsx(isHome ? "text-(--color-white)" : "text-[--color-main]")} />
        </div>

        <Nav className="mobile:hidden tablet:flex" />

        <div className="flex items-center gap-4">
          {isAuth ? <UserBar user={user} path={isHome} /> : <AuthBar />}
        </div>
      </div>
    </header>
  );
};
