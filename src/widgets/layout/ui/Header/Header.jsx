import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { Logo } from '@/shared/ui/Logo.jsx';
import { Nav } from '@/widgets/layout/ui/Header/components/Nav.jsx';
import { AuthBar } from '@/widgets/layout/ui/Header/components/AuthBar.jsx';
import { UserBar } from '@/widgets/layout/ui/Header/components/UserBar.jsx';

export const Header = () => {
  const { isAuth, user } = useUserStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo />
        </div>

        <Nav />

        <div className="flex items-center gap-4">
          {isAuth ? <UserBar user={user} /> : <AuthBar />}
        </div>
      </div>
    </header>
  );
};
