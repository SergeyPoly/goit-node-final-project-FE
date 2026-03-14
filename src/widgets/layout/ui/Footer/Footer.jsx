import { Logo } from '@/shared/ui/Logo.jsx';
import { NetworkLinks } from '@/shared/ui/NetworkLinks.jsx';
import { Copyright } from '@/shared/ui/Copyright.jsx';

export const Footer = () => {
  return (
    <footer className="py-12">
      <div className=" border-be border-b-grey">
        <div className="container flex items-center justify-between pb-[40px] md:pb-[46px]">
          <Logo />
          <NetworkLinks />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
