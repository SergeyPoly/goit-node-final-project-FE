import { Logo } from '@/shared/ui/Logo.jsx';
import { NetworkLinks } from '@/shared/ui/NetworkLinks.jsx';
import { Copyright } from '@/shared/ui/Copyright.jsx';

export const Footer = () => {
  return (
    <footer className="pb-12 mt-20 tablet:mt-25 desktop:mt-30">
      <div className=" border-be border-b-grey">
        <div className="container flex items-center justify-between pb-10 md:pb-11.5">
          <Logo />
          <NetworkLinks />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
